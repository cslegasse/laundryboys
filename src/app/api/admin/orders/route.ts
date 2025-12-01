import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

const supabaseAdmin = createSupabaseAdmin();

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: customer, error: customerError } = await supabaseAdmin
    .from("customers")
    .select("role, company_id") 
    .eq("id", userId)
    .single();

  if (customerError || !customer) {
    console.error("Customer not found:", customerError);
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  if (customer.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("company_id", customer.company_id); 

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  return NextResponse.json({ orders });
}