"use client";

import React from "react";
import {
  ClipboardList,
  Activity,
  Zap,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const FIRST_VISIT_STAGES = [
  {
    step: "Step 01",
    time: "15 Mins",
    title: "Clinical History & Lifestyle Review",
    description:
      "Detailed conversation with Dr. Sundaravalli about the onset of pain, daily ergonomic posture, work demands, and previous treatments or scans.",
    icon: ClipboardList,
  },
  {
    step: "Step 02",
    time: "15 Mins",
    title: "Orthopedic & Neurological Examination",
    description:
      "Testing joint range of motion, nerve root tension (SLR / Spurling tests), muscular strength imbalances, and gait mechanics.",
    icon: Activity,
  },
  {
    step: "Step 03",
    time: "15 Mins",
    title: "Immediate Symptom Relief Session",
    description:
      "Gentle manual mobilization and targeted electro-modalities (IFT / Ultrasound / Traction) to soothe acute nerve irritation and reduce inflammation.",
    icon: Zap,
  },
  {
    step: "Step 04",
    time: "15 Mins",
    title: "Tailored Recovery Plan & Ergonomics",
    description:
      "You receive a clear treatment timeline, expected number of sessions, posture corrections, and a curated set of home exercises.",
    icon: CalendarCheck,
  },
];

const PREPARATION_TIPS = [
  "Bring recent MRI, CT scans, or X-ray reports if available",
  "Wear comfortable, loose clothing suitable for joint evaluation",
  "Arrive 5–10 minutes early to complete initial registration",
  "Note specific activities or postures that trigger your pain",
];

export function FirstVisitSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Reveal direction="up">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Patient Guidance
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              What to Expect on Your First Clinic Visit
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We know visiting a clinic in pain can feel daunting. Here is our transparent 60-minute initial consultation process with Dr. Sundaravalli Jayakumar.
            </p>
          </Reveal>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FIRST_VISIT_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <Reveal key={stage.title} direction="up" delay={idx * 100}>
                <div className="p-7 rounded-3xl bg-[#FBF9F5] border border-slate-200/80 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded-md">
                        {stage.step}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {stage.time}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-[#0A363D] text-white flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-300" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {stage.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Preparation Banner */}
        <Reveal direction="up" delay={200}>
          <div className="p-8 sm:p-10 rounded-3xl bg-[#072025] text-white shadow-xl border border-[#0A363D]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Prior Appointment Recommended</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  How to Prepare for Your Assessment
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  To ensure dedicated 1-on-1 evaluation time without rushed transitions, we schedule appointments in advance.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PREPARATION_TIPS.map((tip) => (
                  <div
                    key={tip}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
