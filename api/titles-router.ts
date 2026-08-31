import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getTitleBySlug, listTitles } from "./queries/titles";

export const titlesRouter = createRouter({
  list: publicQuery.query(() => listTitles()),
  bySlug: publicQuery
    .input(z.object({ slug: z.string().min(1) }))
    .query(({ input }) => getTitleBySlug(input.slug)),
});
