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
      try {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const company_name = session.metadata?.company || null;

        console.log("Webhook received checkout.session.completed:", {
          userId,
          company: company_name,
          sessionId: session.id
        });

        if (!userId) {
          console.error("Missing userId in session metadata");
          return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 });
        }

        // Retrieve line items to get order details
        console.log("Fetching line items for session:", session.id);
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ['data.price.product'] });
        
        console.log("Retrieved line items:", { count: lineItems.data.length });
        const supabaseAdmin = createSupabaseAdmin();

        // Get customer name
        console.log("Fetching customer name for userId:", userId);
        const { data: customer, error: customerError } = await supabaseAdmin
          .from("customers")
          .select("name")
          .eq("id", userId)
          .single();

        if (customerError) {
          console.error("Error fetching customer:", customerError);
        }

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

      const created: Array<Record<string, unknown>> = [];
      
      // Create one order per line item
      for (const lineItem of lineItems.data) {
        const product = lineItem.price?.product;
        const productMetadata = typeof product === 'object' && product !== null ? (product as Stripe.Product).metadata : {};
        
        const estimatedDays = parseInt(productMetadata.estimatedDays || "5");
        const itemsJson = productMetadata.itemsJson || "[]";
        const items = JSON.parse(itemsJson);
        const total = (lineItem.amount_total || 0) / 100; // Convert from cents

        console.log("Creating order from line item:", {
          user_id: userId,
          company_name,
          company_id,
          total,
          items_count: items.length,
          estimated_days: estimatedDays
        });

        // Remove items and estimated_days due to schema cache issue
        // These columns exist but aren't in PostgREST cache yet
        const { data, error } = await supabaseAdmin.from("orders").insert([
          {
            user_id: userId,
            company_id,
            company_name,
            customer_name: customer?.name || "Unknown Customer",
            status: "in_progress",
            total,
          },
        ]).select();

        if (error) {
          console.error("❌ Error creating order from webhook:", error);
          return NextResponse.json({ error: "Failed to create orders" }, { status: 500 });
        }

        console.log("✅ Order created successfully! Order ID:", data?.[0]?.id, "Total:", data?.[0]?.total);
        created.push((data?.[0] ?? {}) as Record<string, unknown>);
      }

      console.log(`🎉 Successfully created ${created.length} orders for user ${userId}`);
      } catch (webhookError) {
        console.error("❌ Fatal error in checkout.session.completed handler:", webhookError);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}