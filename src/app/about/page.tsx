"use client";

import { motion, Variants } from "framer-motion";
import { LucideIcon, Sparkles, Target, Heart } from "lucide-react";
import FAQ from "@/app/components/FAQ";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import Timeline from "@/app/components/Timeline"

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

// Section Layout
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gradient-multi animate-gradient-shift">{children}</span>
);

// Enhanced TeamMemberCard with modern styling
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
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative p-8 glass-card rounded-2xl shadow-sm hover:glass-card-hover hover:glow-purple transition-all duration-300 text-center card-hover-lift"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        {/* Avatar placeholder with gradient */}
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-modern rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{role}</p>
      </div>
    </motion.div>
  );
}

// Value Card Component
function ValueCard({
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative p-8 glass-card rounded-2xl hover:glass-card-hover hover:glow-multi transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-modern text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { userId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    async function syncUser() {
      if (!userId || !user) return;

      const token = await getToken({ template: "supabase" });

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="flex-grow pt-12">
        <Section className="relative text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          
          <div className="absolute -top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          <div className="relative z-10 container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-6 py-2 glass-card rounded-full"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-blue-400" />
                About Our Mission
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl font-black text-white leading-tight"
            >
              About <GradientText>Kleanr</GradientText>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Our mission is simple: to help dry cleaning businesses thrive by simplifying and streamlining operations 
              with innovative, easy-to-use tools that save time, reduce costs, and enhance customer service.
            </motion.p>
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
              Our <span className="text-gradient-blue">Story</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-300 leading-relaxed text-lg sm:text-xl"
            >
              Kleanr was born out of the need for small businesses, especially dry cleaners, to adapt to the digital age. 
              We know that running a local business is challenging, so we designed Kleanr to take care of the operational burdens, 
              allowing you to focus on what matters most: delivering exceptional customer service. From tracking orders to 
              managing customer profiles, Kleanr simplifies it all, helping businesses save time, reduce errors, and stay ahead.
            </motion.p>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>
          
          <div className="relative container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-black text-white mb-4"
              >
                Our <span className="text-gradient-purple">Journey</span>
              </motion.h2>
              <p className="text-gray-300 text-lg">How we got from an idea to your all-in-one tool.</p>
            </div>
            
            <div className="relative">
              <Timeline
                year="2022"
                title="Aha!"
                description="Our founder, visiting his local laundromat, saw the owner managing orders with a paper notebook and a calculator. He knew there had to be a better way."
              />
              <Timeline
                year="2023"
                title="Building the Core"
                description="We partnered with 5 local laundry owners to build and refine the first version of Kleanr, focusing on order tracking and customer notifications."
              />
              <Timeline
                year="2024"
                title="Kleanr Launches"
                description="After a year of testing and feedback, we launched Kleanr to the public, helping shops across the city save time and reduce errors."
              />
              <Timeline
                year="Now"
                title="Growing With You"
                description="Were continuously adding new features like payment processing and delivery management, all based on feedback from owners just like you."
                isLast
              />
            </div>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative container mx-auto px-6">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                className="text-4xl sm:text-5xl font-black text-white mb-6"
              >
                Our Core <span className="text-gradient-multi">Values</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={1}
                className="text-gray-300 text-lg sm:text-xl leading-relaxed"
              >
                Kleanr was born from a simple idea: local laundry shops deserve the same powerful, easy-to-use tools as big chains.
              </motion.p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <ValueCard
                icon={Target}
                title="Innovation First"
                description="We constantly push boundaries to deliver cutting-edge solutions that transform how small businesses operate."
              />
              <ValueCard
                icon={Heart}
                title="Customer-Centric"
                description="Every feature we build is designed with real business owners in mind, solving actual problems they face daily."
              />
              <ValueCard
                icon={Sparkles}
                title="Simplicity Matters"
                description="Complex doesnt mean better. We create powerful tools that are intuitive and easy to use from day one."
              />
            </div>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
          
          <div className="relative container mx-auto px-6 text-center max-w-5xl">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="text-4xl sm:text-5xl font-black text-white mb-6"
            >
              Meet the <span className="text-gradient-modern">Team</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={1}
              className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-12"
            >
              Our team is united by one goal: to streamline dry cleaning operations. With diverse skills and a passion for 
              innovation, we work together to make every aspect of your business more efficient.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={2}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
          </div>
        </Section>

        {/* CTA Section */}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
                >
                  Ready to Transform Your Business?
                </motion.h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Join hundreds of dry cleaners already modernized their operations with Kleanr.
                </p>
                <button className="btn-modern px-10 py-4 bg-gradient-modern text-white rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl">
                  Get Started Today
                </button>
              </div>
            </motion.div>
          </div>
        </Section>

        <FAQ />
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
            {new Date().getFullYear()} Kleanr. Smarter local laundry.
          </p>
        </div>
      </footer>
    </div>
  );
}