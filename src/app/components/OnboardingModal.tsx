import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, User, MapPin, Mail, Sparkles } from "lucide-react";

type OnboardingModalProps = {
  user: {
    id: string;
    emailAddresses: Array<{ emailAddress: string }>;
    firstName?: string | null;
    lastName?: string | null;
  };
};

export default function OnboardingModal({ user }: OnboardingModalProps) {
  const [step, setStep] = useState<"choose" | "customer" | "company">("choose");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "",
    email: user.emailAddresses[0]?.emailAddress || "",
    location: "",
    companyName: "",
    companyEmail: "",
    companyLocation: "",
  });

  const handleSubmit = async (role: "customer" | "admin") => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        location: formData.location || null,
        role,
        ...(role === "admin" && {
          companyName: formData.companyName,
          companyEmail: formData.companyEmail || formData.email,
          companyLocation: formData.companyLocation || formData.location,
        }),
      };

      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Refresh the page to update the UI after a small delay to ensure data is saved
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Failed to register");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          
          {/* Glowing Orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />

          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                  Welcome to Kleanr
                </span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                {step === "choose" ? "Get Started" : step === "customer" ? "Customer Details" : "Company Setup"}
              </h2>
              <p className="text-gray-300">
                {step === "choose" 
                  ? "How would you like to use Kleanr?" 
                  : "Tell us a bit about yourself"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Choose Role Step */}
            {step === "choose" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep("customer")}
                  className="group relative p-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">I&apos;m a Customer</h3>
                    <p className="text-gray-300 text-sm">
                      I want to find laundry services and place orders
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep("company")}
                  className="group relative p-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                      <Building2 className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">I Own a Laundry Business</h3>
                    <p className="text-gray-300 text-sm">
                      I want to manage orders and run my business
                    </p>
                  </div>
                </motion.button>
              </div>
            )}

            {/* Customer Form */}
            {step === "customer" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Location (Optional)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep("choose")}
                    className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold hover:bg-white/15 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleSubmit("customer")}
                    disabled={loading || !formData.name || !formData.email}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating Account..." : "Complete Setup"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Company Form */}
            {step === "company" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Your Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Company Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Sparkle Laundry Co."
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Company Email (Optional)</label>
                    <input
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="info@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Location (Optional)</label>
                    <input
                      type="text"
                      value={formData.companyLocation}
                      onChange={(e) => setFormData({ ...formData, companyLocation: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep("choose")}
                    className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold hover:bg-white/15 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleSubmit("admin")}
                    disabled={loading || !formData.name || !formData.email || !formData.companyName}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating Company..." : "Complete Setup"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}