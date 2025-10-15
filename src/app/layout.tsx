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
import Navbar from "@/components/NavBar";
import MarqueeBar from "@/components/MarqueeBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kleanr | Effortless Cleaning, Redefined.",
  description: "The modern solution for all your cleaning needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${inter.className} antialiased bg-white text-gray-900`}
        >
          <header className="flex justify-between items-center p-6 shadow-sm border-b border-gray-100">
            <h1 className="text-2xl font-bold text-[#1E90FF]">Kleanr</h1>
            <Navbar />
            <div className="flex gap-3">
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
          </header>

          <MarqueeBar />

         <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
