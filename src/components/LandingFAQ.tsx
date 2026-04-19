"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQItem } from "@/lib/faq-schema";

type Props = {
  heading?: string;
  intro?: string;
  items: FAQItem[];
};

export default function LandingFAQ({ heading = "Veelgestelde vragen", intro, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
            {heading}
          </h2>
          {intro && (
            <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {intro}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "border-[#C4A4A0] bg-[#F5F0EB]"
                    : "border-[#EDE6DD] bg-white hover:border-[#E8D5D2]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[#6B6866] text-base md:text-lg">
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#946B66] mt-0.5">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-[#5E524F] text-sm md:text-base leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

