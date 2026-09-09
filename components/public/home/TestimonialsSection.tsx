"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ExternalLink, Quote, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { TestimonialItem } from "@/types";
import { defaultTestimonials, defaultSettings } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialsSection({
  testimonials = defaultTestimonials,
}: {
  testimonials?: TestimonialItem[];
}) {
  const spotlightList = testimonials.filter((t) => t.featured).slice(0, 10);
  const displayList = spotlightList.length > 0 ? spotlightList : testimonials.slice(0, 10);
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = displayList[activeIdx] || displayList[0];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? displayList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === displayList.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/80 text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.9 / 5.0 Rating • 312+ Google Reviews</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
                Real Patient Recoveries
              </h2>
            </Reveal>

            <Reveal direction="up" delay={150}>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-2xl leading-relaxed">
                Authentic testimonials from patients treated for spine disorders, severe knee osteoarthritis, and sports trauma at our Perungudi clinic.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={200}>
            <a
              href={defaultSettings.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0A363D] hover:border-slate-300 transition-all shadow-xs"
            >
              <span>View 312+ Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            </a>
          </Reveal>
        </div>

        {/* Featured Editorial Review Spotlight */}
        {featured && (
          <Reveal direction="up">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 lg:p-14 shadow-lg relative overflow-hidden mb-12">
              <div className="absolute top-6 right-8 text-teal-100/50 pointer-events-none">
                <Quote className="w-28 h-28" />
              </div>

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {[...Array(featured.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Google Review</span>
                  </span>
                </div>

                <p className="text-lg sm:text-2xl lg:text-3xl font-medium text-slate-900 leading-relaxed italic">
                  &ldquo;{featured.review}&rdquo;
                </p>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#0A363D] text-white font-extrabold text-base flex items-center justify-center">
                      {featured.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {featured.patientName}
                      </h4>
                      <p className="text-xs text-teal-700 font-semibold">
                        Treated for: {featured.treatment} {featured.location && `• ${featured.location}`}
                      </p>
                    </div>
                  </div>

                  {/* Review switcher navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-bold text-slate-400 px-2">
                      {activeIdx + 1} / {displayList.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      aria-label="Next Review"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Supporting Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.slice(0, 3).map((t, idx) => (
            <Reveal key={t.id} delay={idx * 100} direction="up">
              <div
                onClick={() => setActiveIdx(idx)}
                className="cursor-pointer h-full p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 line-clamp-4 leading-relaxed italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 block">
                    {t.patientName}
                  </span>
                  <span className="text-[11px] text-teal-700 font-medium block">
                    {t.treatment}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-teal-500 text-slate-800 font-bold text-sm hover:bg-teal-50/50 shadow-xs transition-all active:scale-[0.98]"
          >
            <span>Read All 312+ Patient Reviews</span>
            <ArrowRight className="w-4 h-4 text-teal-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
