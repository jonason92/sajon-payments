import { desc, eq } from "drizzle-orm";
import { titles } from "@db/schema";
import { getDb } from "./connection";

export type Title = typeof titles.$inferSelect;

export async function listTitles(): Promise<Title[]> {
  return getDb()
    .select()
    .from(titles)
    .orderBy(desc(titles.publishedAt), desc(titles.createdAt));
}

export async function getTitleBySlug(slug: string): Promise<Title | undefined> {
  return getDb().query.titles.findFirst({
    where: eq(titles.slug, slug),
  });
}
