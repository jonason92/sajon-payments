import { desc, eq } from "drizzle-orm";
import { getDb } from "./connection";
import { purchases, users, titles, entitlements } from "../../db/schema";

export function listMyPurchases(userId: number) {
  return getDb()
    .select()
    .from(purchases)
    .where(eq(purchases.userId, userId))
    .orderBy(desc(purchases.createdAt));
}

export async function recordPurchase(data: {
  email?: string | null;
  tier: "einmal" | "monat" | "jahr";
  stripeSessionId?: string | null;
  amount?: number | null;
  currency?: string | null;
}) {
  const db = getDb();
  // Käufer per E-Mail einem Konto zuordnen (falls registriert)
  let userId: number | null = null;
  if (data.email) {
    const [u] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);
    userId = u?.id ?? null;
  }
  await db.insert(purchases).values({
    userId,
    email: data.email ?? null,
    tier: data.tier,
    stripeSessionId: data.stripeSessionId ?? null,
    amount: data.amount ?? null,
    currency: data.currency ?? "chf",
  });
  // Abos schalten alle Premium-Titel frei
  if (userId && (data.tier === "monat" || data.tier === "jahr")) {
    const premiumTitles = await db
      .select()
      .from(titles)
      .where(eq(titles.premium, true));
    for (const t of premiumTitles) {
      await db
        .insert(entitlements)
        .values({ userId, titleId: t.id, source: "abo" })
        .onDuplicateKeyUpdate({ set: { source: "abo" } });
    }
  }
  return { userId };
}
