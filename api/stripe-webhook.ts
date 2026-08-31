import crypto from "node:crypto";
import { recordPurchase } from "./queries/purchases";

const PRICE_TO_TIER: Record<string, "einmal" | "monat" | "jahr"> = {
  price_1UARNvQH3mC3G93Ag0HfKdCV: "einmal",
  price_1UARNvQH3mC3G93A8TQ1rslZ: "monat",
  price_1UARNvQH3mC3G93AFN8WRuRw: "jahr",
};

function verifySignature(rawBody: string, header: string, secret: string) {
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=", 2) as [string, string]),
  );
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${parts.t}.${rawBody}`)
    .digest("hex");
  return (
    !!parts.v1 &&
    crypto.timingSafeEqual(Buffer.from(parts.v1), Buffer.from(expected))
  );
}

export async function handleStripeWebhook(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return Response.json(
      { error: "Stripe-Schlüssel nicht konfiguriert (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET fehlen in .env)" },
      { status: 503 },
    );
  }
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";
  try {
    if (!verifySignature(rawBody, sig, webhookSecret)) {
      return Response.json({ error: "Ungültige Signatur" }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Ungültige Signatur" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email: string | null =
      session.customer_details?.email ?? session.customer_email ?? null;
    // Line Items abrufen, um den Tier zu bestimmen
    let tier: "einmal" | "monat" | "jahr" | null = null;
    try {
      const res = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items`,
        { headers: { Authorization: `Bearer ${secretKey}` } },
      );
      const items = await res.json();
      for (const item of items.data ?? []) {
        const t = PRICE_TO_TIER[item.price?.id];
        if (t) { tier = t; break; }
      }
    } catch {
      /* Tier bleibt null */
    }
    if (tier) {
      await recordPurchase({
        email,
        tier,
        stripeSessionId: session.id,
        amount: session.amount_total ?? null,
        currency: session.currency ?? "chf",
      });
    }
  }
  return Response.json({ received: true });
}
