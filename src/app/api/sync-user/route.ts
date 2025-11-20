import { jwtVerify, createRemoteJWKSet } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase, createSupabaseAdmin } from "../supabase-server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.CLERK_JWKS_URL) {
    return NextResponse.json({ error: "CLERK_JWKS_URL not set" }, { status: 500 });
  }

  try {
    const JWKS = createRemoteJWKSet(new URL(process.env.CLERK_JWKS_URL));

    const { payload } = await jwtVerify(token, JWKS, { algorithms: ["RS256"] });

    const userId = payload.sub as string;
    const role = (payload.role as string) || "customer";
    const { email } = await request.json();

    if (role === "admin") {
      const supabaseAdmin = createSupabaseAdmin();
      const { error } = await supabaseAdmin.from("profiles").upsert({
        id: userId,
        email,
        role,
      });
      if (error) throw error;
    } else {
      const supabase = createServerSupabase();
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        email,
        role,
      });
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
