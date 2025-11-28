import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get cart data from metadata
      const userId = session.metadata?.userId;
      const cartDataStr = session.metadata?.cartData;

      if (!userId || !cartDataStr) {
        console.error("Missing userId or cartData in session metadata");
        return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 });
      }

      const cart = JSON.parse(cartDataStr);
      const supabaseAdmin = createSupabaseAdmin();

  // Create orders in database
  const created: Array<Record<string, unknown>> = [];
      for (const ci of cart) {
        const items = ci.items || [];
        const total = ci.total || 0;
        const estimated_minutes = ci.estimated_minutes || 0;
        const company = ci.company ?? null;

        const { data, error } = await supabaseAdmin.from("orders").insert([
          {
            user_id: userId,
            items,
            total,
            estimated_minutes,
            company,
            status: "paid",
            stripe_payment_intent: session.payment_intent,
            stripe_session_id: session.id,
          },
        ]);

        if (error) {
          console.error("Error creating order from webhook:", error);
          return NextResponse.json({ error: "Failed to create orders" }, { status: 500 });
        }

        created.push((data?.[0] ?? {}) as Record<string, unknown>);
      }

      console.log(`Successfully created ${created.length} orders for user ${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
