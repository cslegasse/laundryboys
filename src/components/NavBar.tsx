"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Solutions", href: "#solution" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold">
            K
          </div>
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">Kleanr</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Added Auth Buttons */}
          <div className="flex gap-3 ml-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="border border-[#1E90FF] text-[#1E90FF] rounded-full px-4 py-2 hover:bg-[#1E90FF] hover:text-white transition">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-[#1E90FF] text-white rounded-full px-4 py-2 hover:opacity-90 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
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
              className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 flex flex-col md:hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 border-b border-gray-100 text-gray-700 hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Added Mobile Auth Buttons */}
              <div className="p-4 bg-gray-50">
                <SignedOut>
                  <div className="flex gap-3">
                    <SignInButton mode="modal">
                      <button className="flex-1 border border-[#1E90FF] text-[#1E90FF] rounded-full px-4 py-2 hover:bg-[#1E90FF] hover:text-white transition">
                        Login
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="flex-1 bg-[#1E90FF] text-white rounded-full px-4 py-2 hover:opacity-90 transition">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
