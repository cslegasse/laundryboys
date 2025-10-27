import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { supabase } from "@/app/lib/supabase/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      console.log("❌ Unauthorized: no user ID");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const email =
      user.emailAddresses && user.emailAddresses.length > 0
        ? user.emailAddresses[0].emailAddress
        : null;

    if (!email) {
      console.log("❌ No email found for user:", userId);
      return res.status(400).json({ error: "Missing email" });
    }

    const { data, error } = await supabase
      .from("users")
      .upsert([{ id: userId, email, role: req.body.role || "customer" }])
      .select();

    if (error) {
      console.error("🚨 Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Synced user:", email);
    return res.status(200).json({ success: true, user: data });
  } catch (err) {
    console.error("🔥 Sync error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
