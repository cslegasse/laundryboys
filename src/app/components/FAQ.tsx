"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    q: "Is Kleanr free to use?",
    a: "Start with a 14-Day Free Trial — No Payment Required! Enjoy full access to all our features for 14 days with absolutely no commitment. After the trial, simply choose the plan that best suits your shop's needs and continue with a flexible subscription.",
  },
  {
    q: "Can I access Kleanr on my phone?",
    a: "Absolutely! Kleanr is fully mobile-friendly and works seamlessly on all modern smartphones and tablets. Both customers and admins can manage everything directly from their mobile browsers — no app download required.",
  },
  {
    q: "Is my business data safe?",
    a: "Yes — your data security is our top priority. All information is encrypted both in transit and at rest, using industry-standard security protocols to keep your business and customer data safe.",
  },
  {
    q: "Can I manage multiple shops?",
    a: "You can! Our Pro plan is designed for businesses with multiple locations. Manage all your shops from one easy-to-use dashboard without any hassle.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
      <div className="absolute inset-0 bg-dots-pattern opacity-20" />
      
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="relative container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-6 py-2 glass-card rounded-full"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold flex items-center gap-2 justify-center">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            Frequently Asked <span className="text-gradient-multi">Questions</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Everything you need to know about getting started with Kleanr
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Accordion.Root type="single" collapsible className="text-left space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Accordion.Item
                  value={`item-${i}`}
                  className="group relative glass-card rounded-2xl overflow-hidden hover:glass-card-hover transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Accordion.Header>
                    <Accordion.Trigger className="relative w-full flex justify-between items-center px-6 py-5 font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 group/trigger">
                      <span className="text-left pr-4">{faq.q}</span>
                      <ChevronDown className="w-5 h-5 text-purple-400 group-hover/trigger:text-blue-400 transition-all duration-300 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  
                  <Accordion.Content className="relative px-6 pb-5 text-gray-300 leading-relaxed data-[state=open]:animate-slideInDown">
                    {faq.a}
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 mb-4">Still have questions?</p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-gradient-modern text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg">
              Contact Our Team
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}