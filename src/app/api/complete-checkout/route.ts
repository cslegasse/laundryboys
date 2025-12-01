import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";
import { getSession, clearSession, CartItem } from "@/app/api/checkout-stub/route";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as unknown as NextRequest);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as { session_id?: string };
    const session_id = body.session_id;
    if (!session_id) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

    const session = getSession(session_id);
    if (!session) return NextResponse.json({ error: "Invalid session" }, { status: 404 });

    const cart: CartItem[] = session.cart || [];
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
      const estimated_minutes = ci.estimated_minutes || 0;
      const company_name = ci.company ?? null;
      
      // Look up company_id by company name if provided
      let company_id = null;
      if (company_name) {
        const { data: company } = await supabaseAdmin
          .from("companies")
          .select("id")
          .ilike("name", company_name)
          .single();
        
        company_id = company?.id || null;
      }

      const { data, error } = await supabaseAdmin.from('orders').insert([{
        user_id: userId,
        customer_name: customer?.name || "Unknown Customer",
        items,
        total,
        estimated_minutes,
        company_name,
        company_id,
        status: 'paid'
      }]).select();

      if (error) {
        console.error('Error creating order during checkout completion:', error);
        return NextResponse.json({ error: 'Failed to create orders' }, { status: 500 });
      }
      created.push((data?.[0] ?? {}) as Record<string, unknown>);
    }

    clearSession(session_id);
    return NextResponse.json({ success: true, orders: created });
  } catch (err) {
    console.error('/api/complete-checkout POST error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}