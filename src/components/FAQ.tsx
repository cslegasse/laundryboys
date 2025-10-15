"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Kleanr free to use?",
    a: "We offer a 14-day free trial with no credit card required. After that, choose a plan that fits your shop size.",
  },
  {
    q: "Can I access Kleanr on my phone?",
    a: "Yes! Kleanr is fully responsive and works perfectly on mobile browsers.",
  },
  {
    q: "Is my business data safe?",
    a: "Absolutely. All data is encrypted in transit and at rest using industry-grade security standards.",
  },
  {
    q: "Can I manage multiple shops?",
    a: "Yes. Our Pro plan supports multiple locations under one dashboard.",
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
