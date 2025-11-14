import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../server";
import { getAllTools, executeTool, toolsToFunctions } from "@/lib/tools/registry";

// Import all tools to register them
import "@/lib/tools/code-execution";
import "@/lib/tools/web-search";

export const toolsRouter = router({
  /**
   * List all available tools
   */
  list: publicProcedure.query(async () => {
    return getAllTools();
  }),

  /**
   * Get tools in OpenAI function calling format
   */
  getFunctions: publicProcedure.query(async () => {
    return toolsToFunctions();
  }),

  /**
   * Execute a tool
   */
  execute: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        params: z.record(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const result = await executeTool(input.name, input.params);
      return result;
    }),
});
