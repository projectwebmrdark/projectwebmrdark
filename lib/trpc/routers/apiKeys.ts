import { z } from "zod";
import { protectedProcedure, router } from "../server";
import { createClient } from "@/lib/supabase/server";

export const apiKeysRouter = router({
  /**
   * List all API keys for current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("user_id", ctx.user.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    
    // Don't return the actual key value for security
    return data.map((key) => ({
      ...key,
      key: `${key.key.substring(0, 8)}...`,
    }));
  }),

  /**
   * Create a new API key
   */
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        service: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const supabase = await createClient();

      // Generate a random API key
      const key = `sk_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;

      const { data, error } = await supabase
        .from("api_keys")
        .insert({
          user_id: ctx.user.id,
          name: input.name,
          service: input.service,
          key: key, // In production, encrypt this
        })
        .select()
        .single();

      if (error) throw new Error(error.message);

      return { ...data, key }; // Return full key only on creation
    }),

  /**
   * Delete an API key
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const supabase = await createClient();

      const { error } = await supabase
        .from("api_keys")
        .delete()
        .eq("id", input.id)
        .eq("user_id", ctx.user.id);

      if (error) throw new Error(error.message);

      return { success: true };
    }),
});
