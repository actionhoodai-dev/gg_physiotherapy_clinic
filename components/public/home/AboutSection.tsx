"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Quote, Award } from "lucide-react";
import { defaultHomepageCMS } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection({
  about = defaultHomepageCMS.aboutClinic,
}: {
  about?: typeof defaultHomepageCMS.aboutClinic;
}) {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle architectural background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Storytelling Column with Overlapping Elements */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <Reveal direction="right">
              <div className="relative">
                {/* Main Large Portrait Frame */}
                <div className="relative h-[440px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <Image
                    src={about.image || "/images/doctor-portrait.jpg"}
                    alt="Dr. Sundaravalli Jayakumar, Chief Physiotherapist at GG Physiotherapy Clinic Perungudi Chennai"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A363D]/80 via-transparent to-transparent" />

                  {/* Internal Photo Legend */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-teal-300 block">
                      Lead Clinical Director
                    </span>
                    <h3 className="text-lg font-bold">
                      {about.doctorName}
                    </h3>
                    <p className="text-xs text-slate-200">
                      {about.doctorQualifications}
                    </p>
                  </div>
                </div>

                {/* Overlapping Floating Credential Card */}
                <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-xl max-w-xs space-y-2 hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">
                        20+ Years Experience
                      </span>
                      <span className="text-[11px] text-teal-700 font-semibold block">
                        FOMT (AUS), MSC Osteopathy &amp; DNT
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug pt-1 border-t border-slate-100">
                    Trusted by doctors and IT professionals across the OMR Chennai corridor.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Editorial Text Storytelling Column */}
          <div className="lg:col-span-7 space-y-7 order-1 lg:order-2">
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0A363D] text-xs font-bold uppercase tracking-wider border border-teal-200">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>{about.badge}</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Compassionate, Science-Driven{" "}
                <span className="text-[#0A363D] block sm:inline">
                  Physical Rehabilitation.
                </span>
              </h2>
            </Reveal>

            {/* Editorial Pull Quote */}
            <Reveal direction="up" delay={150}>
              <div className="p-5 rounded-2xl bg-[#FBF9F5] border-l-4 border-[#0A363D] relative space-y-2">
                <Quote className="w-6 h-6 text-teal-600/40 absolute top-4 right-4" />
                <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
                  &ldquo;{about.subtitle}&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                <p>{about.paragraph1}</p>
                <p>{about.paragraph2}</p>
              </div>
            </Reveal>

            {/* Clinical Highlights Checklist */}
            <Reveal direction="up" delay={250}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {about.bulletPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Navigation & Booking Action */}
            <Reveal direction="up" delay={300}>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A363D] text-white text-xs sm:text-sm font-bold hover:bg-[#13545E] shadow-sm transition-all"
                >
                  <span>Book Consultation with Dr. Jayakumar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0A363D] transition-colors py-2 px-3"
                >
                  <span>Read Full Clinic Background</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
