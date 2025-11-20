"use server";

import { createSupabaseAdmin } from "@/app/api/supabase-server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

type OnboardingData = {
  name: string;
  location: string;
  role: "customer" | "admin"; 
  companyName?: string;
};

export async function completeOnboarding(data: OnboardingData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return { error: "Unauthorized: User not found." };
  }

  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    return { error: "Unauthorized: User email not found." };
  }

  const { name, location, role, companyName } = data;

  if (!name || !location || !role) {
    return { error: "Missing required fields." };
  }

  const supabaseAdmin = createSupabaseAdmin();

  if (role === "customer") {
    const { error } = await supabaseAdmin.from("customers").upsert({
      id: userId,
      name,
      email,
      location,
      role: "customer",
    });

    if (error) {
      console.error("Error creating customer:", error);
      return { error: error.message };
    }
    return { success: true };
  }

  if (role === "admin") {
    if (!companyName) {
      return { error: "Company name is required." };
    }

    const { error: customerError } = await supabaseAdmin
      .from("customers")
      .upsert({
        id: userId,
        name,
        email,
        location,
        role: "admin",
      });

    if (customerError) {
      console.error("Error creating company owner profile:", customerError);
      return { error: customerError.message };
    }

    const companyId = randomUUID();
    const { error: companyError } = await supabaseAdmin
      .from("companies")
      .insert({
        id: companyId,
        name: companyName,
        location,
        email: email,
        owner_id: userId,
      });

    if (companyError) {
      console.error("Error creating company:", companyError);
      return { error: companyError.message };
    }

    const { error: updateError } = await supabaseAdmin
      .from("customers")
      .update({ company_id: companyId })
      .eq("id", userId);

    if (updateError) {
      console.error("Error linking company to user:", updateError);
      return { error: updateError.message };
    }

    return { success: true };
  }

  return { error: "Invalid role selected." };
}