import { router } from "../server";
import { authRouter } from "./auth";
import { sessionsRouter } from "./sessions";
import { messagesRouter } from "./messages";
import { filesRouter } from "./files";
import { toolsRouter } from "./tools";
import { apiKeysRouter } from "./apiKeys";

export const appRouter = router({
  auth: authRouter,
  sessions: sessionsRouter,
  messages: messagesRouter,
  files: filesRouter,
  tools: toolsRouter,
  apiKeys: apiKeysRouter,
});

export type AppRouter = typeof appRouter;
