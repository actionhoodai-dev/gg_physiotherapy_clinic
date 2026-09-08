"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Check, Sparkles, Activity } from "lucide-react";
import { ServiceItem } from "@/types";
import { defaultServices } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesSection({
  services = defaultServices,
}: {
  services?: ServiceItem[];
}) {
  const displayServices = services.slice(0, 6);
  const featured = displayServices[0];
  const others = displayServices.slice(1);

  // Intentional accent color accents for categories
  const categoryAccents = [
    { bg: "bg-teal-50", text: "text-teal-800", border: "border-teal-200", badge: "Orthopedics" },
    { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", badge: "Spine & Disc" },
    { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", badge: "Sports Rehab" },
    { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200", badge: "Neurology" },
    { bg: "bg-rose-50", text: "text-rose-800", border: "border-rose-200", badge: "Post-Surgical" },
    { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-200", badge: "Senior Care" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <Reveal direction="up">
              <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                <span>Clinical Specializations</span>
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
                Evidence-Based Physical Therapies
              </h2>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-2xl leading-relaxed">
                Personalized protocols designed by our Chief Orthopedic Physiotherapist to eliminate pain, re-align joint mechanics, and restore lifelong functional mobility.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={200}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-[#0A363D] hover:bg-[#0A363D] hover:text-white transition-all shadow-xs hover:shadow whitespace-nowrap group"
            >
              <span>View All 6 Specializations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Featured Service Card + Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Large Card (Col 1-7) */}
          {featured && (
            <div className="lg:col-span-7">
              <Reveal direction="up">
                <div className="h-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={featured.thumbnail || featured.heroImage || "/images/hero-cinematic.jpg"}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 650px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#0A363D] text-white shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Core Specialization</span>
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-semibold text-teal-300 uppercase tracking-widest block">
                        Featured Protocol
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {featured.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {featured.shortDescription}
                    </p>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                        Clinical Benefits:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {featured.benefits.slice(0, 4).map((b) => (
                          <div key={b} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>45–60 mins per session</span>
                      </div>
                      <Link
                        href={`/services/${featured.slug}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A363D] group-hover:text-[#E85D45] transition-colors"
                      >
                        <span>Explore Treatment Protocol</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          )}

          {/* Supporting Asymmetrical Grid (Col 8-12) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {others.slice(0, 2).map((service, idx) => {
              const accent = categoryAccents[(idx + 1) % categoryAccents.length];
              return (
                <Reveal key={service.id} delay={idx * 150} direction="up">
                  <div className="h-full bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${accent.bg} ${accent.text} ${accent.border}`}>
                          {accent.badge}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          In-Clinic &amp; Home
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        Custom Roadmap
                      </span>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0A363D] group-hover:text-[#E85D45] transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bottom 3 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {others.slice(2).map((service, idx) => {
            const accent = categoryAccents[(idx + 3) % categoryAccents.length];
            return (
              <Reveal key={service.id} delay={(idx + 3) * 100} direction="up">
                <div className="h-full bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${accent.bg} ${accent.text} ${accent.border}`}>
                        {accent.badge}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        Evidence-Based
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Personalized 1-on-1
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A363D] group-hover:text-[#E85D45] transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
