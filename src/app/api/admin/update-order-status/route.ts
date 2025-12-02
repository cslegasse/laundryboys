import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = createSupabaseAdmin();

  // Verify user is admin
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

  const { orderId, status } = await request.json();

  if (!orderId || !status) {
    return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
  }

  console.log("Update order request:", { orderId, status, adminCompanyId: profile.company_id });

  // Verify the order belongs to admin's company
  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("company_id")
    .eq("id", orderId)
    .single();

  console.log("Order lookup:", { found: !!order, orderCompanyId: order?.company_id });

  if (!order || order.company_id !== profile.company_id) {
    console.error("Authorization failed:", { 
      orderExists: !!order, 
      orderCompanyId: order?.company_id, 
      adminCompanyId: profile.company_id,
      match: order?.company_id === profile.company_id
    });
    return NextResponse.json({ error: "Order not found or unauthorized" }, { status: 404 });
  }

  // If status is cancelled, delete the order instead of updating
  if (status === "cancelled") {
    const { error: deleteError } = await supabaseAdmin
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (deleteError) {
      console.error("Error deleting order:", deleteError);
      return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }

    return NextResponse.json({ deleted: true });
  }

  // Update the order status
  const { data, error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}
