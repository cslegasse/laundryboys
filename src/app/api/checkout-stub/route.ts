import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Types for cart/session
export type OrderItem = { service: string; qty: number; label: string };
export type CartItem = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  estimated_days?: number;
  estimated_minutes?: number;
  status: "unpaid" | "paid";
  company?: string | null;
};

type CartSession = { cart: CartItem[]; createdAt: number };

// Simple in-memory map to store stub sessions. Not persistent — fine for dev.
const SESSIONS = new Map<string, CartSession>();

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { cart?: CartItem[] };
    const cart = body.cart ?? [];
    const id = `stub_${randomUUID()}`;
    // store cart server-side for completion step
    SESSIONS.set(id, { cart, createdAt: Date.now() });

    // return a URL where the client will be redirected to simulate checkout
    const url = `/customer/checkout-success?session_id=${encodeURIComponent(id)}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("/api/checkout-stub POST error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// export helper for the completion endpoint to access stored session
export function getSession(id: string): CartSession | undefined {
  return SESSIONS.get(id);
}

export function clearSession(id: string) {
  return SESSIONS.delete(id);
}
