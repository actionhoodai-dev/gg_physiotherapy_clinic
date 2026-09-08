"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { FAQItem } from "@/types";
import { defaultFAQs } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function FAQSection({ faqs = defaultFAQs }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const displayFaqs = faqs.slice(0, 5);

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal direction="up">
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
              <span>Frequently Asked Questions</span>
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
              Clear Answers About Your Care
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
              Transparent guidance on clinic timings, consultation formats, insurance, home visits, and treatment expectations.
            </p>
          </Reveal>
        </div>

        {/* Minimalist Editorial Accordion List */}
        <div className="space-y-4">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={faq.id} delay={idx * 80} direction="up">
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white border-teal-300/80 shadow-md ring-1 ring-teal-200/50"
                      : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0A363D] pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "bg-[#0A363D] text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal direction="up" delay={250}>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A363D] hover:text-[#E85D45] transition-colors"
            >
              <span>Explore All Common Questions &amp; Insurance Guidelines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
