"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle, Sparkles } from "lucide-react";

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string, id?: string }) => (
  <section id={id} className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", businessName: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2aDRWMTBoLTR2Nk0yMCAzNmg0djZoLTR2LTZNMzYgMzZoNHY2aC00di02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-6 py-2 glass-card rounded-full"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold flex items-center gap-2 justify-center">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Lets Start a
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Conversation
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions? Want a personalized demo? Our team is here to help you transform your business.
          </motion.p>
        </div>
      </div>

      <Section id="contact" className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="glass-card rounded-3xl p-10 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-modern rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">Contact Information</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Fill out the form, and our team will get back to you within 24 hours. Wesre excited to help you modernize your business!
                  </p>
                  
                  <div className="space-y-6">
                    <a 
                      href="tel:+1234567890" 
                      className="flex items-center gap-4 group/item p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Call us</p>
                        <span className="text-white font-semibold text-lg">+1 (123) 567-890</span>
                      </div>
                    </a>
                    
                    <a 
                      href="mailto:demo@kleanr.com" 
                      className="flex items-center gap-4 group/item p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email us</p>
                        <span className="text-white font-semibold text-lg">demo@kleanr.com</span>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-4 p-4 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Visit us</p>
                        <span className="text-white font-semibold text-lg">123 Clean St, Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-10 border-t border-white/10">
                    <p className="text-gray-400 text-sm italic">
                      "Kleanr transformed how we manage our business. Setup was easy and support was amazing!" 
                      <span className="block mt-2 text-purple-400 font-semibold">— Claudia A, S&S Dry Cleaners</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="glass-card rounded-3xl p-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-bold text-white mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      id="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="Clean Co."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm resize-none"
                      placeholder="Tell us about your business and how we can help..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-modern text-white rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-gray-400 text-sm text-center">
                    We typically respond within 24 hours
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      <div className="border-t border-white/10 py-12 text-center">
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
    </div>
  );
}