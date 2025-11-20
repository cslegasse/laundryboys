"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type GlassCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function GlassCard({ icon: Icon, title, description }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      className="p-6 bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}