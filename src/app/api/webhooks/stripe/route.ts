import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

function getStripeAndSecrets() {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret || !webhookSecret) {
    throw new Error("Missing Stripe configuration");
  }
  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-11-17.clover" });
  return { stripe, webhookSecret };
}

export async function POST(req: Request) {
  try {
    const { stripe, webhookSecret } = getStripeAndSecrets();
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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const cartDataStr = session.metadata?.cartData;

      console.log("Webhook received checkout.session.completed:", {
        userId,
        hasCartData: !!cartDataStr,
        sessionId: session.id
      });

      if (!userId || !cartDataStr) {
        console.error("Missing userId or cartData in session metadata");
        return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 });
      }

      const cart = JSON.parse(cartDataStr);
      console.log("Parsed cart data:", { cartItemCount: cart.length });
      const supabaseAdmin = createSupabaseAdmin();

      // Get customer name
      const { data: customer } = await supabaseAdmin
        .from("customers")
        .select("name")
        .eq("id", userId)
        .single();

      const created: Array<Record<string, unknown>> = [];
      for (const ci of cart) {
        const items = ci.items || [];
        const total = ci.total || 0;
        const estimated_days = ci.estimated_days || 0;
        const company_name = ci.company ?? null;

        // Look up company_id by company name
        let company_id = null;
        if (company_name) {
          const { data: company } = await supabaseAdmin
            .from("companies")
            .select("id")
            .ilike("name", company_name)
            .single();
          
          company_id = company?.id || null;
          console.log("Company lookup:", { company_name, company_id });
        }

        console.log("Creating order:", {
          user_id: userId,
          company_name,
          company_id,
          total,
          items_count: items.length
        });

        const { data, error } = await supabaseAdmin.from("orders").insert([
          {
            user_id: userId,
            company_id,
            company_name,
            customer_name: customer?.name || "Unknown Customer",
            status: "in_progress",
            total,
            items,
            estimated_days,
          },
        ]).select();

        if (error) {
          console.error("Error creating order from webhook:", error);
          return NextResponse.json({ error: "Failed to create orders" }, { status: 500 });
        }

        console.log("Order created successfully:", data?.[0]);

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