"use client";

import { motion, Variants } from "framer-motion";
import { LucideIcon, Users, ShieldCheck, BarChart, CheckCircle, Database, Zap, Cloud } from "lucide-react";
import FAQ from "@/components/FAQ";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

// GlassCard Component
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

// Section Layout
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">{children}</span>
);

function TeamMemberCard({
  name,
  role,
}: {
  name: string;
  role: string;
  image?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      className="p-6 bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-center"
    >
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-600 text-sm">{role}</p>
    </motion.div>
  );
}

export default function About() {
  const { userId, getToken } = useAuth();
  const { user } = useUser();

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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow pt-12">
        {/* Hero Section */}
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
              About <GradientText>Kleanr</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Our mission is simple: to help dry cleaning businesses thrive by simplifying and streamlining operations 
              with innovative, easy-to-use tools that save time, reduce costs, and enhance customer service.
            </motion.p>
          </div>
        </Section>

        {/* Our Story Section */}
        <Section className="bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5"
            >
              Our Story
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-600 leading-relaxed text-base sm:text-lg"
            >
              Kleanr was born out of the need for small businesses, especially dry cleaners, to adapt to the digital age. 
              We know that running a local business is challenging, so we designed Kleanr to take care of the operational burdens, 
              allowing you to focus on what matters most: delivering exceptional customer service. From tracking orders to 
              managing customer profiles, Kleanr simplifies it all, helping businesses save time, reduce errors, and stay ahead.
            </motion.p>
          </div>
        </Section>

        {/* Our Values Section */}
        <Section className="bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed"
            >
              At Kleanr, we are driven by values that put both our users and our community at the heart of everything we do. 
              Transparency, security, innovation, and a relentless pursuit of simplicity are key pillars that guide us in 
              developing products that matter. We aim to empower businesses to operate smarter and more efficiently, while 
              providing an intuitive, user-friendly experience for all.
            </motion.p>
          </div>
        </Section>

        {/* Team Section */}
        <Section>
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5"
            >
              Meet the Team
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-600 text-lg sm:text-xl leading-relaxed"
            >
              Our team is united by one goal: to streamline dry cleaning operations. With diverse skills and a passion for 
              innovation, we work together to make every aspect of your business more efficient.
            </motion.p>
            {
              <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={2}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10"
              >
                <TeamMemberCard
                name="Legasse Remon"
                role="Scrum Master (Full Stack) and Back-End Developer"
                />
                <TeamMemberCard
                name="David-Benjamin Ogilvie"
                role="Product Owner and Front-End Developer"
                />
                <TeamMemberCard
                name="Daniel Lipszyc"
                role="Lead Front-End Developer"
                />
                <TeamMemberCard
                name="Hong Ouyang"
                role="Front-End Developer"
                />
              </motion.div>

          }
          </div>
        </Section>

        {/* FAQ Section */}
        <FAQ />
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
