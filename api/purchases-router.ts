import { createRouter, authedQuery } from "./middleware";
import { listMyPurchases } from "./queries/purchases";

export const purchasesRouter = createRouter({
  mine: authedQuery.query(({ ctx }) => listMyPurchases(ctx.user.id)),
});
