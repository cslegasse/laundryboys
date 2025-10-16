"use client";

import { motion, Variants } from "framer-motion";
import { LucideIcon, Zap, ShieldCheck, BarChart, Cloud, Database, Users, ArrowRight } from "lucide-react";
import FAQ from "@/components/FAQ"
import { useEffect } from "react";
import { useAuth, useUser} from "@clerk/nextjs";
import axios from "axios";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

function GlassCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      className="p-6 bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">{children}</span>
);

export default function Home() {
  const { userId, getToken } = useAuth();
  const { user } = useUser(); // gives access to Clerk user object

  useEffect(() => {
    async function syncUser() {
      if (!userId || !user) return;

      const token = await getToken({ template: "supabase-sync" });

      try {
        await axios.post(
          "/api/sync-user",
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
  
  return(
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow pt-12">
        <Section className="relative text-center">
          <div className="absolute -top-10 left-10 w-56 h-56 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl font-extrabold text-gray-900"
            >
              Smarter Laundry Management <br />
              <GradientText>Made Simple for Small Businesses</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Kleanr helps laundry owners run their business effortlessly — track orders, accept payments, and update customers, all from one place.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-8 flex justify-center gap-4"
            >
              <button className="px-7 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition">
                Get a Demo
              </button>
              <button className="px-7 py-3 border border-blue-500 text-blue-600 rounded-full text-base font-semibold hover:bg-blue-50 transition">
                See How It Works
              </button>
            </motion.div>
          </div>
        </Section>

        <Section className="bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5"
            >
              The Smarter Way to Manage Your Laundry Shop
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-600 leading-relaxed text-base sm:text-lg"
            >
              No more misplaced tickets or long spreadsheets. Kleanr gives you a clear overview of your business — from customer drop-off to payment — all in one easy dashboard.
            </motion.p>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What You Can Do With Kleanr</h2>
              <p className="text-gray-600 text-base">Simple tools to make running your laundry business easier than ever.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <GlassCard icon={Database} title="Track Every Order" description="See all your orders in one place — sorted by status, completion date, or customer name." />
              <GlassCard icon={BarChart} title="Understand Your Business" description="View key insights like busiest days, top customers, and total revenue in clean charts." />
              <GlassCard icon={Zap} title="Instant Notifications" description="Keep customers updated with ready-for-pickup alerts or delivery reminders automatically." />
              <GlassCard icon={Cloud} title="Accessible Anywhere" description="Log in from your phone, tablet, or laptop — your data stays synced across all devices." />
              <GlassCard icon={Users} title="Customer Profiles" description="Save preferences and order history so you can serve returning customers faster." />
              <GlassCard icon={ShieldCheck} title="Safe & Secure" description="Your data is protected with enterprise-level encryption and secure payment options." />
            </div>
          </div>
        </Section>

        <Section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-t-[3rem] shadow-inner">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Ready to Modernize Your Laundry Business?
            </motion.h2>
            <p className="text-blue-100 mb-6 text-base sm:text-lg">
              Try a free demo and see how Kleanr can save time, reduce errors, and keep your customers happier.
            </p>
            <button className="px-8 py-3 bg-white text-blue-700 rounded-full text-base font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </Section>
        <FAQ/>
      </main>

      <footer className="bg-gray-900 text-white py-8">
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
