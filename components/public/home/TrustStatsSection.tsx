"use client";

import React from "react";
import { defaultHomepageCMS } from "@/lib/defaultData";
import { Star, Award, Users, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStatsSection({
  stats = defaultHomepageCMS.trustStats,
}: {
  stats?: typeof defaultHomepageCMS.trustStats;
}) {
  const icons = [Star, Award, Users, ShieldCheck];

  return (
    <section id="trust-stats" className="bg-[#FBF9F5] py-12 lg:py-16 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <Reveal key={stat.label} delay={idx * 120} direction="up">
                <div className="h-full p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_12px_-2px_rgba(10,54,61,0.04)] hover:shadow-md hover:border-teal-300 transition-all group flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0A363D] flex items-center justify-center group-hover:bg-[#0A363D] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-5 h-5 text-teal-700 group-hover:text-teal-300 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A363D] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {stat.description}
                    </p>
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
