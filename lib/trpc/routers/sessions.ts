import { router, protectedProcedure } from "../server";
import { z } from "zod";

export const sessionsRouter = router({
  /**
   * Create a new chat session
   */
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        model: z.string().default("gpt-4"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("sessions")
        .insert({
          user_id: ctx.user.id,
          title: input.title || "New Chat",
          model: input.model,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),

  /**
   * List user's sessions
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("sessions")
      .select("*")
      .eq("user_id", ctx.user.id)
      .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }),

  /**
   * Get a specific session
   */
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from("sessions")
        .select("*")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),

  /**
   * Update session
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        model: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      const { data, error } = await ctx.supabase
        .from("sessions")
        .update(updates)
        .eq("id", id)
        .eq("user_id", ctx.user.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),

  /**
   * Delete session
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from("sessions")
        .delete()
        .eq("id", input.id)
        .eq("user_id", ctx.user.id);

      if (error) throw new Error(error.message);
      return { success: true };
    }),
});
