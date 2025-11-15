"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function SyncUser() {
  const { userId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    async function syncUser() {
      if (!userId || !user) return;

      const token = await getToken({ template: "supabase" });

      try {
        await axios.post(
          "api/sync-user",
          {
            email: user.primaryEmailAddress?.emailAddress,
            role: "customer",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User synced successfully");
      } catch (err) {
        console.error("Error syncing user:", err);
      }
    }

    syncUser();
  }, [userId, user, getToken]);

  return null;
}