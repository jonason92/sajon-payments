import { authRouter } from "./auth-router";
import { titlesRouter } from "./titles-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  titles: titlesRouter,
});

export type AppRouter = typeof appRouter;
