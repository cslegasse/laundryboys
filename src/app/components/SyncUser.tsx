"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { checkUserProfile } from "@/app/actions/checkUser";
import RoleSelectionModal from "./RoleSelection";

export default function UserOnboarding() {
  const { user, isLoaded } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only run if Clerk is loaded and we have a user
    if (!isLoaded || !user) return;

    const checkRegistration = async () => {
      try {
        const res = await checkUserProfile();
        
        if (res.error) {
          console.error("Error checking user profile:", res.error);
        } else if (res.registered === false) {
          // User exists in Clerk but not in our 'customers' table
          console.log("User not registered. Showing onboarding modal.");
          setShowModal(true);
        } else {
          // User is already registered, do nothing.
          console.log("User already registered.");
        }
      } catch (err) {
        console.error("Unexpected error during user check:", err);
      }
    };

    checkRegistration();
  }, [user, isLoaded]); // Depend on user and isLoaded

  // Render the modal if showModal is true
  if (showModal) {
    return <RoleSelectionModal onComplete={() => setShowModal(false)} />;
  }

  // Otherwise, render nothing
  return null;
}