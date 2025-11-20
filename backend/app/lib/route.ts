import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase, supabaseAdmin } from "../supabase-server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const JWKS = new URL(process.env.CLERK_JWKS_URL!);
  const { payload } = await jwtVerify(token, await fetch(JWKS).then(r => r.json()));

  const userId = payload.sub as string;
  const role = (payload.role as string) || "customer";

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = await request.json();

  try {
    if (role === "admin") {
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}