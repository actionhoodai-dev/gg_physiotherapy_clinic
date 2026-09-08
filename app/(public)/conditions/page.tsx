import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Zap,
  HelpCircle,
  AlertTriangle,
  Stethoscope,
  HeartHandshake,
} from "lucide-react";
import { getConditions } from "@/lib/firestore";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Conditions We Treat | GG Physiotherapy Clinic Perungudi Chennai",
  description:
    "Expert non-surgical physiotherapy treatments for back pain, sciatica, knee osteoarthritis, cervical spondylosis, frozen shoulder, and sports injuries in Chennai.",
};

const RED_FLAGS = [
  {
    title: "Radiating Nerve Pain (Sciatica / Radiculopathy)",
    description:
      "Sharp electric, tingling, or shooting pain traveling from the lower back down the buttock into the leg or foot, or from the neck into the arm and fingers.",
    severity: "Requires Prompt Evaluation",
  },
  {
    title: "Severe Morning Joint Stiffness (>30 Mins)",
    description:
      "Persistent stiffness in the knees, hips, or spine upon waking that makes taking the first few steps agonizing, indicative of inflammatory or degenerative arthritis.",
    severity: "Orthopedic Care Recommended",
  },
  {
    title: "Joint Catching, Locking, or Instability",
    description:
      "The knee, shoulder, or ankle suddenly 'giving way' during normal walking or reaching, signaling ligamentous laxity or meniscal involvement.",
    severity: "Early Intervention Essential",
  },
  {
    title: "Post-Surgical Joint Restriction",
    description:
      "Inability to achieve functional range of motion after knee/hip replacement or arthroscopic surgery due to developing fibrous adhesions.",
    severity: "Targeted Rehabilitation Needed",
  },
];

const CONSERVATIVE_VS_SURGICAL = [
  {
    feature: "Intervention Type",
    conservative: "Non-invasive mechanical decompression, manual mobilization, active strengthening",
    surgical: "Invasive incision, bone resection, artificial implants, or spinal fusion",
  },
  {
    feature: "Downtime & Hospitalization",
    conservative: "Zero hospital stay; outpatient sessions fit directly into your daily routine",
    surgical: "Hospital stay required, followed by weeks of immobilization and bed rest",
  },
  {
    feature: "Long-Term Mechanism",
    conservative: "Re-educates muscular stabilizers and corrects root posture imbalances",
    surgical: "Alters anatomy without addressing underlying movement dysfunction",
  },
  {
    feature: "Risk Profile",
    conservative: "Extremely safe, natural, drug-free pain relief without adverse side effects",
    surgical: "Risks of anesthesia, infection, implant wear, and adjacent-segment strain",
  },
];

export default async function ConditionsPage() {
  const conditions = await getConditions(true);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Pathologies &amp; Conditions Treated</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Targeted Care for Acute &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Chronic Pain.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Evidence-based physical therapy protocols designed to pinpoint root causes and alleviate spinal nerve compression, chronic joint degeneration, and sports injuries.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Conditions Treated" }]} />
      </div>

      {/* Conditions Directory */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Clinical Pathologies Directory
            </h2>
            <p className="text-sm text-slate-600">
              Select a condition below to review our evidence-driven treatment protocols and recovery timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conditions.map((condition, idx) => (
              <div
                key={condition.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0A363D] flex items-center justify-center group-hover:bg-[#0A363D] group-hover:text-white transition-colors duration-300 border border-teal-200/60">
                      <Activity className="w-6 h-6 text-teal-700 group-hover:text-teal-300 transition-colors" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Protocol 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors leading-snug">
                    {condition.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {condition.shortDescription}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                      Common Symptoms:
                    </span>
                    <div className="space-y-2">
                      {condition.symptoms.slice(0, 3).map((sym) => (
                        <div
                          key={sym}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-teal-700 font-bold uppercase tracking-wider">
                    Non-Surgical Care
                  </span>
                  <Link
                    href={`/conditions/${condition.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A363D] group-hover:text-[#E85D45] group-hover:translate-x-1 transition-all"
                  >
                    <span>Clinical Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags / Warning Signs Section */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider bg-rose-100/70 px-3.5 py-1.5 rounded-full border border-rose-200 inline-block">
              Clinical Triage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Key Symptoms That Warrant Immediate Physiotherapy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Delaying care when nerve compression or severe joint degeneration is present often turns manageable acute issues into chronic, difficult-to-treat deformities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RED_FLAGS.map((flag) => (
              <div
                key={flag.title}
                className="p-7 rounded-3xl bg-[#FBF9F5] border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    {flag.severity}
                  </span>
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {flag.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {flag.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservative Physiotherapy vs Surgery Comparison */}
      <section className="py-16 lg:py-20 bg-[#FBF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Conservative Management First
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Evidence-Based Physical Therapy Before Surgery?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              International clinical guidelines recommend at least 6 to 12 weeks of structured conservative physical therapy before considering spine or joint surgery.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="grid grid-cols-12 bg-[#0A363D] text-white text-xs font-bold py-4 px-6">
              <div className="col-span-4 sm:col-span-3">Comparison Point</div>
              <div className="col-span-8 sm:col-span-5 text-teal-300">GG Physiotherapy Approach</div>
              <div className="hidden sm:block sm:col-span-4 text-slate-300">Surgical Alternative</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {CONSERVATIVE_VS_SURGICAL.map((row) => (
                <div key={row.feature} className="grid grid-cols-12 p-6 gap-4 items-center">
                  <div className="col-span-12 sm:col-span-3 font-bold text-slate-900">
                    {row.feature}
                  </div>
                  <div className="col-span-12 sm:col-span-5 text-slate-700 font-medium">
                    <span className="sm:hidden font-bold text-teal-700 block mb-1">Our Approach: </span>
                    {row.conservative}
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-slate-500">
                    <span className="sm:hidden font-bold text-slate-400 block mb-1">Surgical: </span>
                    {row.surgical}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Assessment CTA */}
      <section className="py-16 bg-[#072025] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Living With Avoidable Pain
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Consult with Dr. Sundaravalli Jayakumar at GG Physiotherapy Clinic in Perungudi to map out a clear, structured non-surgical recovery plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm hover:bg-[#D44E36] shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Physical Evaluation</span>
            </Link>
            <a
              href="tel:09094026006"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <span>Call Clinic Doctor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
