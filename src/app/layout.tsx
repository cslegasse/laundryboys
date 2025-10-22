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
          <Navbar />
          <MarqueeBar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
