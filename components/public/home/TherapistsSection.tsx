"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, ShieldCheck, Calendar } from "lucide-react";
import { TherapistItem } from "@/types";
import { defaultTherapists } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function TherapistsSection({
  therapists = defaultTherapists,
}: {
  therapists?: TherapistItem[];
}) {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>Medical Leadership</span>
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
              Meet Our Chief Physiotherapist
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Over 20 years of specialized clinical practice in orthopedic manual therapy, osteopathy, dry needling, and advanced spinal rehabilitation in Chennai.
            </p>
          </Reveal>
        </div>

        {/* Lead Doctor Showcase Profile Card */}
        <div className="max-w-5xl mx-auto">
          {therapists.map((doc, idx) => (
            <Reveal key={doc.id} delay={idx * 150} direction="up">
              <div className="bg-[#FBF9F5] rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch group">
                {/* Large Portrait Image Column (5 Cols) */}
                <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[440px] bg-slate-100 overflow-hidden">
                  <Image
                    src={doc.profileImage || "/images/doctor-portrait.jpg"}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 block">
                      Lead Consultant
                    </span>
                    <h3 className="text-xl font-extrabold">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-200">
                      {doc.qualification}
                    </p>
                  </div>
                </div>

                {/* Details & Biography Column (7 Cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 bg-teal-100/70 border border-teal-200 px-3 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                        <span>{doc.yearsOfExperience}+ Years Clinical Excellence</span>
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        12,500+ Patients Recovered
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {doc.name}
                    </h3>

                    <p className="text-xs font-bold text-[#0A363D] uppercase tracking-wider">
                      {doc.designation}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {doc.biography}
                    </p>

                    {/* Specializations Tags */}
                    <div className="pt-3 border-t border-slate-200/80">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                        Specialized Clinical Focus:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {doc.specialization.slice(0, 4).map((spec) => (
                          <div
                            key={spec}
                            className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking & Profile Actions */}
                  <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      Languages: <strong className="text-slate-800">{doc.languages.join(", ")}</strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/therapists/${doc.id}`}
                        className="text-xs font-bold text-slate-600 hover:text-[#0A363D] transition-colors"
                      >
                        Full Credentials
                      </Link>

                      <Link
                        href="/appointment"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A363D] text-white text-xs font-bold hover:bg-[#13545E] shadow-sm transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5 text-teal-300" />
                        <span>Book with Dr. Sundaravalli</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
