import { router, protectedProcedure } from "../server";
import { z } from "zod";

export const filesRouter = router({
  /**
   * List user's files
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from("files")
      .select("*")
      .eq("user_id", ctx.user.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }),

  /**
   * Delete a file
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Get file info
      const { data: file } = await ctx.supabase
        .from("files")
        .select("*")
        .eq("id", input.id)
        .eq("user_id", ctx.user.id)
        .single();

      if (!file) {
        throw new Error("File not found");
      }

      // Delete from storage
      if (file.storage_path) {
        await ctx.supabase.storage
          .from("files")
          .remove([file.storage_path]);
      }

      // Delete from database
      const { error } = await ctx.supabase
        .from("files")
        .delete()
        .eq("id", input.id)
        .eq("user_id", ctx.user.id);

      if (error) throw new Error(error.message);
      return { success: true };
    }),
});
