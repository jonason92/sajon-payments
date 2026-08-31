import { createRouter, authedQuery } from "./middleware";
import { countMyEntitlements, listMyTitles } from "./queries/entitlements";

export const accountRouter = createRouter({
  myTitles: authedQuery.query(({ ctx }) => listMyTitles(ctx.user.id)),
  myOverview: authedQuery.query(async ({ ctx }) => ({
    entitlementsCount: await countMyEntitlements(ctx.user.id),
    hasAbo: false,
    note: "Stripe-Verknüpfung folgt in einem nächsten Schritt.",
  })),
});
