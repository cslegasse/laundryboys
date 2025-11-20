"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUser } from "@/app/actions/syncUser";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    const userId = user.id;
    if (!email || !userId) return;

    syncUser(email, "customer")
      .then((res) => {
        if (res?.error) {
          console.error("Error syncing user:", res.error);
        } else {
          console.log("User synced successfully");
        }
      })
      .catch((err) => console.error("Unexpected error:", err));
  }, [user]);

  return null;
}
