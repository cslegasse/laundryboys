import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req as unknown as NextRequest);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const supabaseAdmin = createSupabaseAdmin();
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("role, organization_id")
      .eq("id", userId)
      .single();

    if (error || !profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    return NextResponse.json({ role: profile.role, organization_id: profile.organization_id });
  } catch (err) {
    console.error("/api/profile error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
