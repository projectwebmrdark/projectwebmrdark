import OpenAI from "openai";

// Initialize OpenAI client
export function createAIClient() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.VC_API_KEY;
  const baseURL = process.env.VC_API_URL;

  if (!apiKey) {
    throw new Error("Missing AI API key. Please set OPENAI_API_KEY or VC_API_KEY in environment variables.");
  }

  return new OpenAI({
    apiKey,
    baseURL,
  });
}

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
}

export interface ChatOptions {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

/**
 * Generate chat completion
 */
export async function generateChatCompletion(options: ChatOptions) {
  const client = createAIClient();
  
  const response = await client.chat.completions.create({
    model: options.model || "gpt-4",
    messages: options.messages,
    temperature: options.temperature ? options.temperature / 100 : 0.7,
    max_tokens: options.max_tokens || 2000,
    stream: options.stream || false,
  });

  return response;
}

/**
 * Generate streaming chat completion
 */
export async function* generateStreamingChatCompletion(options: ChatOptions) {
  const client = createAIClient();
  
  const stream = await client.chat.completions.create({
    model: options.model || "gpt-4",
    messages: options.messages,
    temperature: options.temperature ? options.temperature / 100 : 0.7,
    max_tokens: options.max_tokens || 2000,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}
