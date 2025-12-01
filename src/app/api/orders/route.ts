import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

type OrderItem = { service: string; qty: number; label: string };

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req as unknown as NextRequest);
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
    const { userId } = getAuth(req as unknown as NextRequest);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as { 
      items?: OrderItem[]; 
      total?: number; 
      estimated_minutes?: number; 
      company_name?: string; 
    };
    
    const items = body.items ?? [];
    const total = body.total ?? 0;
    const estimated_minutes = body.estimated_minutes ?? 0;
    const company_name = body.company_name ?? null;

    const supabaseAdmin = createSupabaseAdmin();
    
    // Look up company_id by company name if provided
    let company_id = null;
    if (company_name) {
      const { data: company } = await supabaseAdmin
        .from("companies")
        .select("id")
        .ilike("name", company_name) // Case-insensitive search
        .single();
      
      company_id = company?.id || null;
    }

    // Get customer name for the order
    const { data: customer } = await supabaseAdmin
      .from("customers")
      .select("name")
      .eq("id", userId)
      .single();

    const { data, error } = await supabaseAdmin.from("orders").insert([
      {
        user_id: userId,
        customer_name: customer?.name || "Unknown Customer",
        items,
        total,
        estimated_minutes,
        company_name,
        company_id,
        status: "pending",
      },
    ]).select();

    if (error) {
      console.error("Error creating order:", error);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json({ order: (data?.[0] ?? null) as Record<string, unknown> | null });
  } catch (err) {
    console.error("/api/orders POST error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}