"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import PricingTier from "@/app/components/PricingTier"; 
import FAQ from "@/app/components/FAQ"; 
import { Sparkles, Zap, TrendingUp } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  // const price = 14.99; // kept for future use

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="flex-grow pt-12">
        <Section className="relative text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          
          
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />

          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-6 py-2 glass-card rounded-full"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Flexible Plans for Every Business
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight"
            >
              Simple, Transparent
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Choose the plan thats right for your business. No hidden fees, no contracts, and you can cancel anytime.
            </motion.p>
          </div>
        </Section>
        
        {/* Pricing Cards Section */}
        <Section className="relative">
          <div className="absolute inset-0 bg-dots-pattern opacity-20" />
          
          <div className="relative container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <PricingTier
                  planName="Starter"
                  price="$49"
                  pricePeriod="/ month"
                  description="For new shops getting started."
                  features={[
                    "Up to 100 orders / month",
                    "Order tracking",
                    "Customer profiles",
                    "SMS notifications",
                  ]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PricingTier
                  planName="Pro"
                  price="$99"
                  pricePeriod="/ month"
                  description="For growing businesses."
                  features={[
                    "Unlimited orders",
                    "Order tracking & history",
                    "Customer profiles & preferences",
                    "SMS & Email notifications",
                    "Basic analytics dashboard",
                    "Online payments",
                  ]}
                  isFeatured={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PricingTier
                  planName="Enterprise"
                  price="Custom"
                  pricePeriod=""
                  description="For multi-location shops."
                  features={[
                    "Everything in Pro",
                    "Multi-location management",
                    "Advanced analytics",
                    "Delivery & route planning",
                    "Dedicated account manager",
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-4">
                Why Choose <span className="text-gradient-multi">Kleanr</span>?
              </h2>
              <p className="text-xl text-gray-300">Everything you need to modernize your business</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-8 text-center hover:glass-card-hover hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Quick Setup</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get started in under 10 minutes. No technical expertise required.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover:glass-card-hover hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Scale With Ease</h3>
                <p className="text-gray-300 leading-relaxed">
                  Upgrade or downgrade anytime as your business grows. No commitments.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-8 text-center hover:glass-card-hover hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">24/7 Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our team is always here to help you succeed. Real humans, fast responses.
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        <Section className="relative">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative glass-card rounded-3xl p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-2000" />
              
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join hundreds of dry cleaners whove already transformed their operations
                </p>
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="px-10 py-4 bg-gradient-modern text-white rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50"
                >
                  {loading ? "Starting..." : "Start Free Trial"}
                </button>
                <p className="text-gray-400 mt-4 text-sm">
                  No credit card required • Cancel anytime • Free 14-day trial
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-dots-pattern opacity-10" />
          <div className="relative">
            <FAQ />
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-modern rounded-xl flex items-center justify-center text-white font-black text-xl">
              K
            </div>
            <span className="text-2xl font-black text-white">Kleanr</span>
          </div>
          <p className="text-gray-400">
            © 2025 Kleanr. Built for laundry.
          </p>
        </div>
      </footer>
    </div>
  );
}