import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";
import { getSession, clearSession } from "@/app/api/checkout-stub/route";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const session_id = body.session_id;
    if (!session_id) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

    const session = getSession(session_id);
    if (!session) return NextResponse.json({ error: "Invalid session" }, { status: 404 });

    const cart: any[] = session.cart || [];
    const supabaseAdmin = createSupabaseAdmin();

    // Insert one order per cart item (could be merged if desired)
    const created: any[] = [];
    for (const ci of cart) {
      const items = ci.items || [];
      const total = ci.total || 0;
      const estimated_minutes = ci.estimated_minutes || 0;
      const { data, error } = await supabaseAdmin.from('orders').insert([{
        user_id: userId,
        items,
        total,
        estimated_minutes,
        status: 'paid'
      }]);
      if (error) {
        console.error('Error creating order during checkout completion:', error);
        return NextResponse.json({ error: 'Failed to create orders' }, { status: 500 });
      }
      created.push(data?.[0]);
    }

    // clear stub session
    clearSession(session_id);

    return NextResponse.json({ success: true, orders: created });
  } catch (err) {
    console.error('/api/complete-checkout POST error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
