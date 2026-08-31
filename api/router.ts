import { accountRouter } from "./account-router";
import { authRouter } from "./auth-router";
import { titlesRouter } from "./titles-router";
import { purchasesRouter } from "./purchases-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  account: accountRouter,
  auth: authRouter,
  titles: titlesRouter,
  purchases: purchasesRouter,
});

export type AppRouter = typeof appRouter;
