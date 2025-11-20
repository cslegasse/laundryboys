import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabaseAdmin = createSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }

    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error("/api/orders GET error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as any);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const items = body.items || [];
    const total = body.total || 0;
    const estimated_minutes = body.estimated_minutes || 0;
    const company = body.company ?? null;

    const supabaseAdmin = createSupabaseAdmin();
    const { data, error } = await supabaseAdmin.from("orders").insert([
      {
        user_id: userId,
        items,
        total,
        estimated_minutes,
        company,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Error creating order:", error);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json({ order: data?.[0] });
  } catch (err) {
    console.error("/api/orders POST error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
