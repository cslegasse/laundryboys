import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createSupabaseAdmin } from "@/app/api/supabase-server";

export async function POST(req: Request) {
  try {
    const { userId } = getAuth(req as unknown as NextRequest);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, location, role, companyName, companyEmail, companyLocation } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!['customer', 'admin'].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseAdmin();

    let companyId = null;
    if (role === 'admin') {
      if (!companyName) {
        return NextResponse.json({ error: "Company name required for admin role" }, { status: 400 });
      }

      const { data: company, error: companyError } = await supabaseAdmin
        .from("companies")
        .insert([{
          id: `company_${userId}`,
          name: companyName,
          email: companyEmail || email,
          location: companyLocation || location,
          owner_id: userId
        }])
        .select()
        .single();

      if (companyError) {
        console.error("Error creating company:", companyError);
        return NextResponse.json({ error: "Failed to create company" }, { status: 500 });
      }

      companyId = company.id;
    }

    const { data: customer, error: customerError } = await supabaseAdmin
      .from("customers")
      .insert([{
        id: userId,
        name,
        email,
        location: location || null,
        role,
        company_id: companyId
      }])
      .select()
      .single();

    if (customerError) {
      console.error("Error creating customer:", customerError);
      return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
    }

    return NextResponse.json({ success: true, customer });
  } catch (err) {
    console.error("/api/user/register error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}