import React from 'react';
import { Database, BarChart, Zap, Cloud, Users, ShieldCheck, DollarSign, Bell, Clock, Smartphone, TrendingUp, Package } from 'lucide-react';

type GlassCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ icon: Icon, title, description }) => (
  <div className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

type FeatureSectionProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  gradient: string;
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, subtitle, children, gradient }) => (
  <div className="mb-20">
    <div className="text-center mb-12">
      <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {title}
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

export default function LaundryBoysFeatures() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
              Modern POS for Dry Cleaning
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Say Goodbye to
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pen & Paper
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform your dry-cleaning business with intelligent order management, real-time tracking, and seamless online payments
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-2xl">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <FeatureSection
          title="For Your Customers"
          subtitle="Give your customers the convenience they expect in 2025"
          gradient="from-blue-400 to-cyan-400"
        >
          <GlassCard 
            icon={Smartphone} 
            title="Track Orders Anytime" 
            description="Customers can check their order status 24/7 from any device — no more phone calls asking 'Is it ready yet?'" 
          />
          <GlassCard 
            icon={Bell} 
            title="Smart Notifications" 
            description="Automatic text or email alerts when orders are ready for pickup or out for delivery. Set it and forget it." 
          />
          <GlassCard 
            icon={DollarSign} 
            title="Pay Online Securely" 
            description="Integrated Stripe payments let customers pay when they place orders or pick up — cutting checkout time in half." 
          />
          <GlassCard 
            icon={Clock} 
            title="Real-Time Updates" 
            description="See exactly where orders are in the process: received, in-progress, ready, or delivered. Full transparency." 
          />
          <GlassCard 
            icon={Users} 
            title="Personal Profiles" 
            description="Saved preferences, order history, and favorite services make repeat orders lightning fast for loyal customers." 
          />
          <GlassCard 
            icon={Package} 
            title="Digital Receipts" 
            description="No more lost paper tickets. Every order is stored digitally with full pickup details and payment history." 
          />
        </FeatureSection>

        <FeatureSection
          title="For Your Business"
          subtitle="Run your operations like a modern enterprise, not a corner shop"
          gradient="from-purple-400 to-pink-400"
        >
          <GlassCard 
            icon={Database} 
            title="Track Every Order" 
            description="See all your orders in one place. Sorted by status, completion date, or customer name. No more digging through paper slips." 
          />
          <GlassCard 
            icon={BarChart} 
            title="Understand Your Business" 
            description="View key insights like busiest days, top customers, and total revenue in clean charts. Make data-driven decisions." 
          />
          <GlassCard 
            icon={Zap} 
            title="Instant Notifications" 
            description="Keep customers updated with ready-for-pickup alerts or delivery reminders automatically. Save hours on phone calls." 
          />
          <GlassCard 
            icon={Cloud} 
            title="Accessible Anywhere" 
            description="Log in from your phone, tablet, or laptop — your data stays synced across all devices in real-time." 
          />
          <GlassCard 
            icon={Users} 
            title="Customer Profiles" 
            description="Save preferences and order history so you can serve returning customers faster. Build loyalty with personalized service." 
          />
          <GlassCard 
            icon={ShieldCheck} 
            title="Safe & Secure" 
            description="Your data is protected with enterprise-level encryption and secure payment options. Bank-grade security for peace of mind." 
          />
          <GlassCard 
            icon={TrendingUp} 
            title="Growth Analytics" 
            description="Track revenue trends, customer retention, and service popularity. Know what's working and what needs improvement." 
          />
          <GlassCard 
            icon={Database} 
            title="Automated Backups" 
            description="Never lose an order or customer detail again. Everything is backed up automatically to the cloud daily." 
          />
          <GlassCard 
            icon={Clock} 
            title="Save 10+ Hours Weekly" 
            description="Eliminate manual tracking, reduce phone calls, and speed up checkout. Your team can focus on quality service, not paperwork." 
          />
        </FeatureSection>

        <div className="relative mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Ready to Modernize?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join forward-thinking dry cleaners who've already ditched the paper and doubled their efficiency
            </p>
            <button className="px-10 py-5 bg-white text-purple-600 font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-2xl text-lg">
              Start Your Free Trial
            </button>
            <p className="text-white/80 mt-4 text-sm">
              No credit card required • Setup in under 10 minutes • Cancel anytime
            </p>
          </div>
        </div>

      </div>

      <div className="text-center py-12 text-gray-400">
        <p>© 2025 Kleanr. Built for laundry.</p>
      </div>
    </div>
  );
}