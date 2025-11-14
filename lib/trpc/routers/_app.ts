import { router } from "../server";
import { authRouter } from "./auth";
import { sessionsRouter } from "./sessions";
import { messagesRouter } from "./messages";
import { filesRouter } from "./files";

export const appRouter = router({
  auth: authRouter,
  sessions: sessionsRouter,
  messages: messagesRouter,
  files: filesRouter,
});

export type AppRouter = typeof appRouter;
