"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const price = 14.99;

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || data?.error || "Something went wrong");
      window.location.href = data.url;
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
          >
            One affordable plan to access everything you need to manage your laundry business — no hidden fees.
          </motion.p>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-glow border border-blue-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h2>
            <p className="text-gray-500 mb-6">Perfect for small and growing laundry shops</p>

            <div className="flex justify-center items-end mb-6">
              <span className="text-5xl font-extrabold text-gray-900">${price}</span>
              <span className="text-gray-500 mb-2">/month</span>
            </div>

            <ul className="text-left text-gray-700 space-y-2 mb-8 mx-auto max-w-xs">
              <li>✔ Unlimited orders and customers</li>
              <li>✔ Full analytics dashboard</li>
              <li>✔ Priority support</li>
              <li>✔ Secure payments via Stripe</li>
            </ul>

            <SignedIn>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full rounded-full px-6 py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Redirecting…" : "Subscribe Now"}
              </button>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full rounded-full px-6 py-3 font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                  Sign in to Subscribe
                </button>
              </SignInButton>
            </SignedOut>

            <p className="mt-3 text-xs text-gray-400">
              Powered by Stripe • Cancel anytime
            </p>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="text-xl font-bold">Kleanr</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Kleanr. Helping local laundry shops work smarter every day.
          </p>
        </div>
      </footer>
    </div>
  );
}
