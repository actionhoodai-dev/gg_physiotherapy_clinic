"use client";

import React from "react";
import { defaultHomepageCMS } from "@/lib/defaultData";
import { CheckCircle, Footprints } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSection({
  process: _processData = defaultHomepageCMS.treatmentProcess,
}: {
  process?: typeof defaultHomepageCMS.treatmentProcess;
}) {
  const steps = [
    {
      step: 1,
      title: "Clinical Assessment",
      subtitle: "Full Movement Evaluation",
      description: "In-depth functional movement evaluation examining posture, joint angles, muscle firing patterns, and nerve conduction.",
    },
    {
      step: 2,
      title: "Root-Cause Diagnosis",
      subtitle: "Biomechanical Clarity",
      description: "Identification of the primary root cause rather than treating superficial symptoms, explained clearly to you.",
    },
    {
      step: 3,
      title: "Targeted Therapy",
      subtitle: "Decompression & Manual Care",
      description: "Hands-on joint mobilization, non-surgical traction, and advanced modalities to immediately relieve acute spasm and inflammation.",
    },
    {
      step: 4,
      title: "Progressive Rehabilitation",
      subtitle: "Strength & Neuromuscular Re-ed",
      description: "Supervised exercise therapy strengthening stabilizing muscles to protect vulnerable joints and rebuild mobility.",
    },
    {
      step: 5,
      title: "Return to Movement",
      subtitle: "Ergonomics & Relapse Prevention",
      description: "Workplace ergonomic advice, custom home exercises, and lifelong postural habits so you stay pain-free permanently.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-100/80 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
              <Footprints className="w-3.5 h-3.5 text-teal-700" />
              <span>The Recovery Journey</span>
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
              Your 5-Stage Path to Pain-Free Movement
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              We never take shortcuts. Our clinically validated five-phase protocol bridges immediate relief with permanent functional recovery.
            </p>
          </Reveal>
        </div>

        {/* Visual Timeline Cards (5 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4 relative">
          {steps.map((item, idx) => (
            <Reveal key={item.step} delay={idx * 120} direction="up">
              <div className="h-full bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative">
                {/* Step Connector Line on Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2.5 w-5 h-0.5 bg-slate-200 z-10" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-teal-50 text-[#0A363D] font-black text-sm flex items-center justify-center border border-teal-200 group-hover:bg-[#0A363D] group-hover:text-white transition-colors duration-300">
                      0{item.step}
                    </span>
                    <span className="text-[10px] font-extrabold text-teal-700 uppercase tracking-widest">
                      Stage {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[11px] font-semibold text-teal-700 mt-0.5">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Milestone</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
