"use client";

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FAQItem } from "@/types";
import { defaultSettings } from "@/lib/defaultData";

export function FAQClient({
  faqs,
  phone = defaultSettings.phone,
}: {
  faqs: FAQItem[];
  phone?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const categories = ["all", "General", "Appointments", "Services", "Doctor", "Treatment"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" ||
      faq.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symptoms, fees, timings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0A363D] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="p-10 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-xs">
            No questions match your query. Please call us at {phone} directly!
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-white border-teal-400/80 shadow-md ring-1 ring-teal-200/50"
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0A363D] pr-4 leading-snug">
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
            );
          })
        )}
      </div>
    </div>
  );
}
