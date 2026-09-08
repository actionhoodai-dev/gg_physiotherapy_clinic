"use client";

import React from "react";
import Link from "next/link";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const GOOGLE_REVIEW_DIRECT_LINK = "https://g.page/r/CWiCmDW9GjQXEBM/review";

export function GoogleReviewBanner() {
  return (
    <section className="py-16 bg-[#FBF9F5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="bg-gradient-to-r from-[#0A363D] via-[#0E4953] to-[#13545E] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-teal-700/50">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-300/30">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0 Rating • 312+ Verified Google Reviews</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Are You a Patient at GG Physiotherapy Clinic?
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Your review helps someone in severe back pain, knee arthritis, or sciatica in Perungudi and Chennai find trusted, non-surgical physical therapy. Share your recovery journey with us on Google!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
              <a
                href={GOOGLE_REVIEW_DIRECT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 shadow-md hover:shadow-lg transition-all active:scale-[0.98] border border-slate-200"
              >
                {/* Google G SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Leave a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <Link
                href="/testimonials"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
              >
                <span>Read Patient Stories</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
