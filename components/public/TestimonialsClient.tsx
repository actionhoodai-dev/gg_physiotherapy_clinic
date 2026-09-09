"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  CheckCircle2,
  Quote,
  Search,
  SlidersHorizontal,
  Award,
  Calendar,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { TestimonialItem } from "@/types";

interface TestimonialsClientProps {
  testimonials: TestimonialItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Reviews" },
  { id: "spine", label: "Spine & Sciatica", keywords: ["back", "spine", "sciatica", "lumbar", "disc", "traction"] },
  { id: "neck", label: "Neck & Cervical", keywords: ["neck", "cervical", "stiff neck", "spondylosis"] },
  { id: "knee", label: "Knee & Leg", keywords: ["knee", "leg", "osteoarthritis", "hip", "ankle", "foot"] },
  { id: "shoulder", label: "Shoulder & Arm", keywords: ["shoulder", "frozen shoulder", "arm", "hand", "thumb"] },
  { id: "advanced", label: "PEMF & Advanced Tech", keywords: ["pemf", "shockwave", "ultrasound", "ift", "needling", "needle"] },
  { id: "neuro", label: "Neuro & Recovery", keywords: ["stroke", "nerve", "neuro"] },
];

export function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(18);

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      // 1. Category filter
      if (selectedCategory !== "all") {
        const cat = CATEGORIES.find((c) => c.id === selectedCategory);
        if (cat && cat.keywords) {
          const content = `${t.treatment} ${t.review}`.toLowerCase();
          const matchesCategory = cat.keywords.some((kw) => content.includes(kw));
          if (!matchesCategory) return false;
        }
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const content = `${t.patientName} ${t.treatment} ${t.review} ${t.location || ""}`.toLowerCase();
        if (!content.includes(q)) return false;
      }

      return true;
    });
  }, [testimonials, selectedCategory, searchQuery]);

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTestimonials.length;

  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(18);
              }}
              placeholder="Search by condition, treatment, doctor name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Rating overview summary badge */}
          <div className="flex items-center gap-3 self-start sm:self-auto bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span>4.9 / 5.0 (312+ Google Reviews)</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(18);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#0A363D] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900">{visibleTestimonials.length}</strong> of{" "}
          <strong className="text-slate-900">{filteredTestimonials.length}</strong> patient reviews
        </span>
        {filteredTestimonials.length < testimonials.length && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-teal-700 hover:underline font-semibold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Reviews Grid */}
      {visibleTestimonials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <p className="text-base font-semibold text-slate-700">
            No patient reviews match your search query.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try searching for words like &ldquo;sciatica&rdquo;, &ldquo;neck&rdquo;, &ldquo;knee&rdquo;, &ldquo;traction&rdquo;, or &ldquo;PEMF&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 group"
            >
              <div>
                {/* Header with stars, verified badge & local guide */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {t.isLocalGuide && (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>Local Guide</span>
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Google</span>
                    </span>
                  </div>
                </div>

                {/* Treatment / Condition Tag */}
                {t.treatment && (
                  <span className="inline-block text-xs font-semibold text-teal-800 mb-3 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-md">
                    {t.treatment}
                  </span>
                )}

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A363D] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {t.patientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {t.patientName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      {t.location && <span>{t.location}</span>}
                      {t.location && t.reviewDate && <span>•</span>}
                      {t.reviewDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{t.reviewDate}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-slate-200 group-hover:text-teal-200 transition-colors shrink-0" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 18)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 hover:border-teal-400 transition-all shadow-xs"
          >
            <span>Load More Reviews ({filteredTestimonials.length - visibleCount} remaining)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
