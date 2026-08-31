import { desc, eq } from "drizzle-orm";
import { entitlements, titles } from "@db/schema";
import { getDb } from "./connection";

export type Title = typeof titles.$inferSelect;

export async function listMyTitles(userId: number): Promise<Title[]> {
  return getDb()
    .select({
      id: titles.id,
      slug: titles.slug,
      title: titles.title,
      subtitle: titles.subtitle,
      type: titles.type,
      premium: titles.premium,
      excerpt: titles.excerpt,
      author: titles.author,
      route: titles.route,
      coverImage: titles.coverImage,
      publishedAt: titles.publishedAt,
      createdAt: titles.createdAt,
    })
    .from(entitlements)
    .innerJoin(titles, eq(entitlements.titleId, titles.id))
    .where(eq(entitlements.userId, userId))
    .orderBy(desc(entitlements.createdAt));
}

export async function countMyEntitlements(userId: number): Promise<number> {
  const rows = await getDb()
    .select({ id: entitlements.id })
    .from(entitlements)
    .where(eq(entitlements.userId, userId));
  return rows.length;
}
