import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

const supabaseAdmin = createSupabaseAdmin();

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("customers")
    .select("role, company_id") 
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    console.error("Profile not found:", profileError);
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  if (profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  console.log("Admin fetching orders:", {
    userId,
    adminCompanyId: profile.company_id
  });

  const { data: orders, error: ordersError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("company_id", profile.company_id); 

  if (ordersError) {
    console.error("Error fetching orders:", ordersError);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  console.log("Admin orders found:", orders?.length || 0);

  return NextResponse.json({ orders });
}