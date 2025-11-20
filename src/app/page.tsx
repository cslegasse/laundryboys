"use client";

import { motion, Variants } from "framer-motion";
import { LucideIcon, Zap, ShieldCheck, BarChart, Cloud, Database, Users, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import FAQ from "@/app/components/FAQ"
import Link from "next/link"

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
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative p-6 glass-card rounded-2xl shadow-sm hover:glass-card-hover hover:glow-blue transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-blue-purple text-white rounded-xl mb-4 group-hover:rotate-6 transition-transform duration-300">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">{children}</span>
);

export default function Home() {
  
  return(
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="flex-grow pt-12">
        <Section className="relative text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          
          <div className="absolute -top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-5xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-6 py-2 glass-card rounded-full"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-blue-400" />
                The Future of Laundry Management
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl font-black text-white leading-tight"
            >
              Laundry POS System <br />
              <GradientText>Kleanr</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Kleanr helps laundry owners run their business effortlessly with modern tools that save time and increase revenue.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/demo?from=landing" className="px-8 py-4 bg-gradient-modern text-white rounded-xl text-lg font-bold shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2">
                Get a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/features" className="px-8 py-4 glass-card border-2 border-white/20 text-white rounded-xl text-lg font-bold hover:glass-card-hover hover:scale-105 transition-all duration-300 inline-flex items-center justify-center">
                See How It Works
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-12 flex flex-wrap justify-center gap-8 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Setup in 10 minutes</span>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
          
          <div className="relative container mx-auto px-6 text-center max-w-4xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-4xl sm:text-5xl font-black text-white mb-6"
            >
              The Smarter Way to Manage Your <span className="text-gradient-multi">Laundry Shop</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-300 leading-relaxed text-lg sm:text-xl"
            >
              No misplaced tickets or spreadsheets. Use Kleanr dashboard for everything in one place.
            </motion.p>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
          
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="inline-block mb-6 px-6 py-2 glass-card rounded-full"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                  Powerful Features
                </span>
              </motion.div>

              <h2 className="text-4xl font-black text-white mb-4">Why <span className="text-gradient-purple">Kleanr</span>?</h2>
              <p className="text-gray-300 text-lg">Simple tools to make running your laundry business easier than ever.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard icon={Database} title="Track Every Order" description="See all your orders in one place. Sorted by status, completion date, or customer name." />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard icon={BarChart} title="Understand Your Business" description="View key insights like busiest days, top customers, and total revenue in clean charts." />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard icon={Zap} title="Instant Notifications" description="Keep customers updated with ready-for-pickup alerts or delivery reminders automatically." />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard icon={Cloud} title="Accessible Anywhere" description="Log in from your phone, tablet, or laptop — your data stays synced across all devices." />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard icon={Users} title="Customer Profiles" description="Save preferences and order history so you can serve returning customers faster." />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard icon={ShieldCheck} title="Safe & Secure" description="Your data is protected with enterprise-level encryption and secure payment options." />
              </motion.div>
            </div>
          </div>
        </Section>

        <Section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>

          <div className="relative container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-12 text-center shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
              
              <div className="relative">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight"
                >
                  Modernize Your Laundry Business Today.
                </motion.h2>
                <p className="text-gray-300 mb-8 text-lg sm:text-xl">
                  Try a free demo and see how Kleanr can save time, reduce errors, and keep your customers happier.
                </p>
                <Link href="/demo?from=landing">
                  <button className="px-10 py-4 bg-gradient-modern text-white rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center gap-3">
                    Get Started Now 
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <p className="text-gray-400 mt-4 text-sm">
                  No credit card required • Setup in under 10 minutes • Cancel anytime
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        <FAQ/>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-modern rounded-xl flex items-center justify-center text-white font-black text-xl">
              K
            </div>
            <span className="text-2xl font-black text-white">Kleanr</span>
          </div>
          <p className="text-gray-400 text-base">
            © {new Date().getFullYear()} Kleanr. Built for laundry.
          </p>
        </div>
      </footer>
    </div>
  );
}