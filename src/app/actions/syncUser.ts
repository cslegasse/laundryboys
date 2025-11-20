"use server";

import { createSupabaseAdmin } from "@/app/api/supabase-server";
import { auth } from "@clerk/nextjs/server";

export async function syncUser(email: string, role: string = "customer") {
  const session = await auth(); 

  const userId = session.userId;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const supabaseAdmin = createSupabaseAdmin();

  const { error } = await supabaseAdmin
    .from("profiles")
    .upsert({ id: userId, email, role });

  if (error) return { error: error.message };
  return { success: true };
}
