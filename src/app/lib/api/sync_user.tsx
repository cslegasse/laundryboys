import type { NextApiRequest, NextApiResponse } from "next";
import { createClerkClient } from "@clerk/backend";
import { supabase } from "../supabase/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const usersResponse = await clerkClient.users.getUserList({ limit: 100 });
    const allUsers = usersResponse.data;

    for (const user of allUsers) {
      const email =
        Array.isArray(user.emailAddresses) && user.emailAddresses.length > 0
          ? user.emailAddresses[0].emailAddress
          : null;

      if (!email) continue;

      const { error } = await supabase
        .from("users")
        .upsert([{ id: user.id, email, role: "customer" }]);

      if (error) console.error("Supabase Error:", error.message);
    }

    return res.status(200).json({ success: true, synced: allUsers.length });
    } catch (err: unknown) {
    if (err instanceof Error) {
        console.error("Sync error:", err.message);
      } else {
        console.error("Sync error:", err);
      }
      return res.status(500).json({ error: "Internal server error" });
    }
}
