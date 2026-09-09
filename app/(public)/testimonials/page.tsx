import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  ExternalLink,
  Quote,
  Calendar,
  CheckCircle2,
  ArrowRight,
  MessageSquarePlus,
  ShieldCheck,
  Heart,
  Award,
} from "lucide-react";
import { getTestimonials } from "@/lib/firestore";
import { defaultSettings } from "@/lib/defaultData";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { TestimonialsClient } from "@/components/public/TestimonialsClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Patient Reviews & Testimonials | 4.9★ Google Rating | GG Physio Chennai",
  description:
    "Read verified patient reviews for GG Physiotherapy Clinic in Perungudi, Chennai. 4.9 out of 5 stars based on 312+ Google reviews for spine care, knee pain, and neuro rehab.",
};

const GOOGLE_REVIEW_DIRECT_LINK = "https://g.page/r/CWiCmDW9GjQXEBM/review";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials(true);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-xs font-extrabold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Rating • 312+ Verified Google Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Patient Recovery Stories &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Verified Google Reviews.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Real feedback from patients across Perungudi, OMR, Velachery, and Chennai who regained active, pain-free mobility under Dr. Sundaravalli Jayakumar (B.P.T, M.P.T Ortho, DNT, MIAP).
          </p>

          {/* Primary Review Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={GOOGLE_REVIEW_DIRECT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 shadow-md hover:shadow-lg transition-all active:scale-[0.98] border border-slate-200"
            >
              {/* Google Multicolored G SVG */}
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
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href={defaultSettings.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>View Business Profile on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Patient Reviews" }]} />
      </div>

      {/* Callout Card: Invite Patients to Share Experience */}
      <section className="pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0A363D] to-[#13545E] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-800">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/60 text-teal-200 text-xs font-bold border border-teal-700">
                <MessageSquarePlus className="w-3.5 h-3.5 text-teal-300" />
                <span>Your Voice Matters</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Treated at GG Physiotherapy Clinic?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Your recovery story helps others in Perungudi and Chennai overcome debilitating joint, spine, and nerve pain. Share your experience directly on our Google profile.
              </p>
            </div>

            <a
              href={GOOGLE_REVIEW_DIRECT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-xs sm:text-sm hover:bg-[#D44E36] transition-all shadow-md flex items-center gap-2 whitespace-nowrap active:scale-[0.98]"
            >
              <span>Leave Your Google Review</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Verified Reviews Grid with Search, Filters & Pagination */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Verified Patient Experiences
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing authentic reviews verified from Google Business Profile
            </p>
          </div>

          <TestimonialsClient testimonials={testimonials} />
        </div>
      </section>

      {/* Why Google Reviews Matter / Transparency Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                100% Unedited Patient Feedback
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All reviews are submitted by real patients through Google’s independent verification mechanism, ensuring unbiased feedback on our clinical effectiveness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Dedicated 1-on-1 Patient Care
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Patients consistently praise Dr. Sundaravalli’s compassionate listening, thorough diagnosis, and refusal to rush therapy sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Verifiable Orthopedic Results
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From elderly post-operative knee replacements to corporate IT professionals with cervical radiculopathy, our treatment plans have a proven track record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-16 text-center bg-[#FBF9F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to Start Your Recovery Journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Join hundreds of satisfied patients who chose evidence-based physical therapy in Perungudi, Chennai.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm hover:bg-[#D44E36] shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={GOOGLE_REVIEW_DIRECT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>Add Your Review on Google</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
