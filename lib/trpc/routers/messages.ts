import { router, protectedProcedure } from "../server";
import { z } from "zod";

export const messagesRouter = router({
  /**
   * Create a new message
   */
  create: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify session ownership
      const { data: session } = await ctx.supabase
        .from("sessions")
        .select("id")
        .eq("id", input.sessionId)
        .eq("user_id", ctx.user.id)
        .single();

      if (!session) {
        throw new Error("Session not found");
      }

      const { data, error } = await ctx.supabase
        .from("messages")
        .insert({
          session_id: input.sessionId,
          role: input.role,
          content: input.content,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);

      // Update session's updated_at
      await ctx.supabase
        .from("sessions")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", input.sessionId);

      return data;
    }),

  /**
   * List messages for a session
   */
  list: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Verify session ownership
      const { data: session } = await ctx.supabase
        .from("sessions")
        .select("id")
        .eq("id", input.sessionId)
        .eq("user_id", ctx.user.id)
        .single();

      if (!session) {
        throw new Error("Session not found");
      }

      const { data, error } = await ctx.supabase
        .from("messages")
        .select("*")
        .eq("session_id", input.sessionId)
        .order("created_at", { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    }),
});
