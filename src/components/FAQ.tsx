"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Kleanr free to use?",
    a: "Start with a 14-Day Free Trial — No Payment Required! Enjoy full access to all our features for 14 days with absolutely no commitment. After the trial, simply choose the plan that best suits your shop’s needs and continue with a flexible subscription.",
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
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Frequently Asked Questions</h2>
        <Accordion.Root type="single" collapsible className="text-left space-y-4">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="border border-blue-100 bg-white rounded-xl overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex justify-between items-center px-5 py-4 font-semibold text-gray-800 hover:bg-blue-100 transition">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                {faq.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
