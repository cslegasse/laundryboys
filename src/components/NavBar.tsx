"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "/about" },         
    { label: "Features", href: "/features" }, 
    { label: "Pricing", href: "/pricing" },  
    { label: "Contact", href: "/contact" } 
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full glass-card border-b border-white/20 z-50 shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      <div className="relative container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-modern rounded-xl flex items-center justify-center text-white font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
              K
            </div>
            <div className="absolute inset-0 bg-gradient-modern rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
            Kleanr
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-semibold group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          
          <div className="flex gap-3 ml-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="border-2 border-purple-500 text-purple-600 rounded-full px-6 py-2 hover:bg-purple-500 hover:text-white transition-all duration-300 font-semibold hover:scale-105">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-modern text-white rounded-full px-6 py-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>

        <button
          className="md:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors rounded-lg hover:bg-white/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full glass-card border-t border-white/20 shadow-2xl flex flex-col md:hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 pointer-events-none" />
              
              <div className="relative">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 border-b border-white/10 text-gray-700 hover:text-purple-600 hover:bg-white/30 transition-all font-semibold"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="p-6 bg-gradient-to-br from-white/50 to-purple-50/50">
                  <SignedOut>
                    <div className="flex flex-col gap-3">
                      <SignInButton mode="modal">
                        <button className="w-full border-2 border-purple-500 text-purple-600 rounded-full px-6 py-3 hover:bg-purple-500 hover:text-white transition-all duration-300 font-semibold">
                          Login
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="w-full bg-gradient-modern text-white rounded-full px-6 py-3 hover:scale-105 transition-all duration-300 shadow-lg font-semibold">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex justify-center py-2">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}