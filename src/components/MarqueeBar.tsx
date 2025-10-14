"use client";
import Marquee from "react-fast-marquee";
import { Cloud, ShieldCheck, Zap, Users } from "lucide-react";

export default function MarqueeBar() {
  const items = [
    { icon: Cloud, text: "Cloud-Based" },
    { icon: Zap, text: "Real-Time Updates" },
    { icon: ShieldCheck, text: "Secure Payments" },
    { icon: Users, text: "Customer Management" },
  ];

  return (
    <div className="py-6 bg-blue-50 border-y border-blue-100 overflow-hidden">
      <Marquee gradient={false} speed={50}>
        {items.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex items-center mx-10 text-blue-700 font-semibold text-lg"
          >
            <Icon className="w-6 h-6 mr-2 text-blue-500" />
            {text}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
