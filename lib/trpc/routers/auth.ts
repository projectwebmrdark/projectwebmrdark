import { router, publicProcedure, protectedProcedure } from "../server";
import { z } from "zod";

export const authRouter = router({
  /**
   * Get current user
   */
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return null;
    }

    return {
      id: ctx.user.id,
      email: ctx.user.email,
      name: ctx.user.user_metadata?.name || ctx.user.email,
      avatar: ctx.user.user_metadata?.avatar_url,
    };
  }),

  /**
   * Sign out
   */
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.supabase.auth.signOut();
    return { success: true };
  }),
});
