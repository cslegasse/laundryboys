// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kleanr | Effortless Cleaning, Redefined.",
  description: "The modern solution for all your cleaning needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${inter.className} antialiased bg-white text-gray-900`}>
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform">
                  K
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Kleanr
                </span>
              </a>
              <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
                <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              </nav>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-5 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      Login
                    </button>
                  </SignInButton>
                  <button className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:shadow-lg hover:scale-105 transition-all">
                    Get Started
                  </button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          {/* Main content */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}