import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/app/components/NavBar";
import MarqueeBar from "@/app/components/MarqueeBar";
import UserOnboarding from "@/app/components/SyncUser";

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
          <UserOnboarding /> {/* CHANGED */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}