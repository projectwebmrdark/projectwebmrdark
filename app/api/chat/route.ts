import { createClient } from "@/lib/supabase/server";
import { generateStreamingChatCompletion } from "@/lib/ai/client";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Verify session ownership
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (sessionError || !session) {
      return new Response("Session not found", { status: 404 });
    }

    // Get conversation history
    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(20);

    // Build messages array for AI
    const aiMessages = [
      {
        role: "system" as const,
        content: "You are Mr.Dark AI Agent, a helpful assistant that can execute code, browse the web, analyze data, and more. Be concise and helpful.",
      },
      ...(messages || []).map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ];

    // Save user message
    await supabase.from("messages").insert({
      session_id: sessionId,
      role: "user",
      content: message,
    });

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          for await (const chunk of generateStreamingChatCompletion({
            messages: aiMessages,
            model: session.model,
            temperature: session.temperature,
            max_tokens: session.max_tokens,
            stream: true,
          })) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          }

          // Save assistant message
          await supabase.from("messages").insert({
            session_id: sessionId,
            role: "assistant",
            content: fullResponse,
            model: session.model,
          });

          // Update session timestamp
          await supabase
            .from("sessions")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", sessionId);

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error: any) {
          console.error("Streaming error:", error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
