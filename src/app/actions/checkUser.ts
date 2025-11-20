"use server";

import { createSupabaseAdmin } from "@/app/api/supabase-server";
import { auth } from "@clerk/nextjs/server";

export async function checkUserProfile() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const supabaseAdmin = createSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("customers")
    .select("id")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking user profile:", error);
    return { error: error.message };
  }

  if (data) {
    return { registered: true };
  }

  return { registered: false };
}