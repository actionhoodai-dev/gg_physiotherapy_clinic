"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Activity, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { ConditionItem } from "@/types";
import { defaultConditions } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function ConditionsSection({
  conditions = defaultConditions,
}: {
  conditions?: ConditionItem[];
}) {
  const [selectedCondition, setSelectedCondition] = useState(conditions[0] || defaultConditions[0]);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span>Conditions We Treat</span>
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
              Targeted Relief for Acute &amp; Chronic Pain
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Don&apos;t let pain dictate your freedom. Discover our specialized orthopedic protocols designed to pinpoint root biomechanical dysfunctions rather than simply masking pain.
            </p>
          </Reveal>
        </div>

        {/* Featured Condition + Interactive Exploration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Featured Condition Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <Reveal direction="right">
              <div className="bg-[#0A363D] text-white rounded-3xl p-7 sm:p-9 shadow-xl border border-teal-900/40 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-teal-200 border border-white/10 uppercase tracking-wider">
                    In-Focus Treatment
                  </span>
                  <Activity className="w-5 h-5 text-teal-300" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {selectedCondition?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 mt-3 leading-relaxed">
                    {selectedCondition?.shortDescription}
                  </p>
                </div>

                {/* Common Symptoms List */}
                {selectedCondition?.symptoms && (
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                      Common Warning Signs:
                    </span>
                    <div className="space-y-1.5">
                      {selectedCondition.symptoms.slice(0, 4).map((symptom) => (
                        <div key={symptom} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                          <span>{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/conditions/${selectedCondition?.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 hover:text-white transition-colors"
                  >
                    <span>Read Clinical Protocol</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/appointment"
                    className="px-4 py-2 rounded-xl bg-[#E85D45] text-white text-xs font-bold hover:bg-[#D44E36] shadow-sm transition-all"
                  >
                    Book for this
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Conditions Directory List / Cards (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {conditions.map((item, idx) => {
              const isSelected = item.id === selectedCondition?.id;
              return (
                <Reveal key={item.id} delay={idx * 80} direction="up">
                  <div
                    onClick={() => setSelectedCondition(item)}
                    className={`cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group ${
                      isSelected
                        ? "bg-teal-50/60 border-teal-400 shadow-md ring-1 ring-teal-400"
                        : "bg-[#FBF9F5] border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#0A363D] text-white"
                            : "bg-white text-slate-700 group-hover:bg-[#0A363D] group-hover:text-white border border-slate-200/80"
                        }`}>
                          <Activity className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-semibold text-teal-700">
                        Select to preview
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-teal-700 translate-x-1" : "text-slate-400 group-hover:translate-x-1"}`} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Assessment Banner */}
        <Reveal direction="up" delay={200}>
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0A363D] to-[#13545E] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex items-start sm:items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300 flex-shrink-0 border border-white/10">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Unsure which condition is causing your discomfort?
                </h4>
                <p className="text-xs sm:text-sm text-slate-200/90 mt-1 max-w-xl">
                  Schedule a 1-on-1 functional diagnosis with Dr. Sundaravalli Jayakumar. We conduct orthopedic tests to diagnose the exact root cause.
                </p>
              </div>
            </div>

            <Link
              href="/appointment"
              className="px-6 py-3.5 rounded-xl bg-[#E85D45] text-white text-xs sm:text-sm font-bold hover:bg-[#D44E36] transition-all whitespace-nowrap shadow-md active:scale-95 flex-shrink-0"
            >
              Book Clinical Assessment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
