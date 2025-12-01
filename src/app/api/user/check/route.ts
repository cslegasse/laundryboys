import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req as unknown as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createSupabaseAdmin();
    const { data: customer, error } = await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("id", userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Error checking customer:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ 
      registered: !!customer,
      customer: customer || null 
    });
  } catch (err) {
    console.error("/api/user/check error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}