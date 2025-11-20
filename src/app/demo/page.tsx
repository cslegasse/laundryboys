"use client";

import { useEffect, useState } from "react";
import { /*useSearchParams,*/ useRouter } from "next/navigation";
import { useAuth, /*useUser,*/ SignInButton } from "@clerk/nextjs";

export default function DemoLanding() {
  // const searchParams = useSearchParams();
  // const from = searchParams?.get("from");
  const router = useRouter();

  const { isSignedIn, userId, getToken } = useAuth();
  // const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function check() {
      try {
        // if user is not signed in, we show the sign-in UI below
        if (!isSignedIn) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/profile");
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Failed to fetch profile");
          setLoading(false);
          return;
        }
        setRole(data.role || null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    check();
  }, [isSignedIn, userId, getToken]);

  if (loading) return <div className="p-8">Loading…</div>;

  if (error)
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );

  if (!isSignedIn)
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Sign in to continue</h2>
        <p className="text-gray-400 mb-4">You must be signed in to access the demo.</p>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
        </SignInButton>
      </div>
    );

  if (role !== "customer")
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Access Forbidden</h2>
        <p className="text-gray-400 mb-4">You do not have permission to view this page.</p>
      </div>
    );

  // Customer landing page (plain, with styling options laid out)
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-4">Welcome to your Demo</h1>
        <p className="text-gray-300 mb-8">This is the initial customer landing page. Below are the styling options you can choose for your demo environment.</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">Theme</h3>
            <p className="text-sm text-gray-300">Light / Dark / Custom colors</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">Primary Accent</h3>
            <p className="text-sm text-gray-300">Pick primary brand color for buttons and accents</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">Typography</h3>
            <p className="text-sm text-gray-300">Choose heading and body font preferences</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="font-semibold mb-2">Logo & Colors</h3>
            <p className="text-sm text-gray-300">Upload logo and set primary/secondary colors</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-400">Next steps: connect your data, configure notifications, and invite team members.</p>
        </div>
      </div>
    </div>
  );
}
