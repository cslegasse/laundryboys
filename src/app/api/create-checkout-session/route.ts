import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { CartItem } from "@/app/api/checkout-stub/route";

let stripe: Stripe | undefined;
function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    stripe = new Stripe(key, { apiVersion: "2025-11-17.clover" });
  }
  return stripe;
}

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as unknown as NextRequest);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as { cart?: CartItem[] };
    const cart = body.cart ?? [];

    if (cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate total and create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.map((item, idx) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Laundry Order - ${new Date(item.date).toLocaleDateString()}`,
          description: item.items.map((it) => `${it.qty}x ${it.label}`).join(", "),
          metadata: {
            cartIndex: idx.toString(),
            company: item.company || "",
            estimatedDays: (item.estimated_days || 5).toString(),
            itemsJson: JSON.stringify(item.items).substring(0, 400), // Truncate if needed
          },
        },
        unit_amount: Math.round(item.total * 100), // Stripe uses cents
      },
      quantity: 1,
    }));

    // Store only essential metadata (within 500 char limit)
    const companyName = cart[0]?.company || "";
    const orderCount = cart.length;
    const totalAmount = cart.reduce((sum, c) => sum + c.total, 0);

    // Create Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/customer/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/customer?canceled=true`,
      metadata: {
        userId,
        company: companyName.substring(0, 100),
        orderCount: orderCount.toString(),
        totalAmount: totalAmount.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("/api/create-checkout-session POST error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
