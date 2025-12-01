"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { completeOnboarding } from "@/app/actions/onboarding";
import { ArrowRight, Building, Loader2, User } from "lucide-react";

type Role = "customer" | "admin";

export default function RoleSelectionModal({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { user } = useUser();
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState(user?.fullName || "");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role.");
      return;
    }
    if (!name || !location) {
      setError("Please fill in your name and location.");
      return;
    }
    if (role === "admin" && !companyName) {
        setError("Please provide a company name.");
        return;
    }
    
    setIsLoading(true);
    setError(null);

    const result = await completeOnboarding({
      name,
      location,
      role,
      companyName: role === "admin" ? companyName : undefined,
    });

    setIsLoading(false);

    if (result.error) {
      setError(`Error: ${result.error}`);
    } else if (result.success) {
      console.log("Onboarding successful!");
      onComplete(); // This will close the modal
      // Give the modal a moment to close, then reload so server-side UI updates
      setTimeout(() => {
        if (typeof window !== "undefined") window.location.reload();
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Content */}
      <div className="relative glass-card p-8 md:p-12 rounded-2xl w-full max-w-2xl mx-4 glow-multi animate-fadeInUp">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Welcome to <span className="text-gradient-multi">Kleanr</span>!
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8">
          One last step. Please tell us about yourself.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              I am a...
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-300 ${
                  role === "customer"
                    ? "border-blue-400 bg-blue-500/20 glow-blue"
                    : "border-white/20 glass-card-hover"
                }`}
              >
                <User className="w-8 h-8 text-blue-300 mb-2" />
                <span className="text-white font-semibold">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-300 ${
                  role === "admin"
                    ? "border-purple-400 bg-purple-500/20 glow-purple"
                    : "border-white/20 glass-card-hover"
                }`}
              >
                <Building className="w-8 h-8 text-purple-300 mb-2" />
                <span className="text-white font-semibold">Company Owner</span>
              </button>
            </div>
          </div>

          {/* Form Fields - Appear after role is selected */}
          {role && (
            <div className="space-y-4 animate-fadeIn">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Jane Doe"
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Location Field */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Location (City, State)
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., New York, NY"
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Company Name Field (Conditional) */}
              {role === "admin" && (
                <div className="animate-fadeIn">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Kleanr Laundry Services"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-400 text-center animate-fadeIn">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !role || !name || !location}
            className="w-full btn-modern px-8 py-4 bg-gradient-modern text-white rounded-xl text-lg font-bold shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Complete Setup <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}