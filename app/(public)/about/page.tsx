import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  Quote,
  Activity,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us | Dr. Sundaravalli Jayakumar | GG Physiotherapy Clinic Chennai",
  description:
    "Learn about GG Physiotherapy Clinic in Perungudi, Chennai, founded by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP) with over 10 years of clinical orthopedic experience.",
};

const CARE_PILLARS = [
  {
    step: "01",
    title: "Root-Cause Functional Evaluation",
    description:
      "We test kinetic chains, nerve conduction pathways, joint arthrokinematics, and postural alignment rather than treating isolated pain points.",
  },
  {
    step: "02",
    title: "Non-Surgical Spinal & Joint Decompression",
    description:
      "Precision computerized traction and gentle manual articulation to reduce intervertebral disc pressure and relieve impinged nerves.",
  },
  {
    step: "03",
    title: "Targeted Electro-Physical Modalities",
    description:
      "Application of IFT, Therapeutic Ultrasound, and TENS to resolve deep-seated inflammation, promote micro-circulation, and accelerate cellular recovery.",
  },
  {
    step: "04",
    title: "Kinetic Strengthening & Movement Re-education",
    description:
      "Rebuilding deep stabilizing musculature, lumbo-pelvic rhythm, and joint proprioception to create durable biomechanical stability.",
  },
  {
    step: "05",
    title: "Ergonomics & Relapse Prevention",
    description:
      "Custom workstation setup advice, posture micro-breaks, and home exercise protocols tailored to prevent chronic re-injury.",
  },
];

const CLINIC_MILESTONES = [
  {
    year: "2009",
    title: "Establishment in Perungudi",
    description:
      "Founded by Dr. Sundaravalli Jayakumar to bring specialized orthopedic and manual physical therapy directly to South Chennai.",
  },
  {
    year: "2014",
    title: "Digital Traction & Decompression Unit",
    description:
      "Introduced computerized cervical and lumbar traction tables, providing non-surgical relief for acute disc herniation patients.",
  },
  {
    year: "2018",
    title: "Advanced Electrotherapy & Rehab Bay Expansion",
    description:
      "Expanded our clinical outpatient center in Perungudi with advanced electro-modalities, therapeutic ultrasound, and specialized stroke & knee recovery bays.",
  },
  {
    year: "Present",
    title: "12,500+ Patients Recovered & 4.9★ Rating",
    description:
      "Celebrated 312+ five-star verified Google reviews as one of the most trusted outpatient physical therapy centers in Chennai.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>About Our Practice</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Evidence-Based Physiotherapy with a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Personalized Touch.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded in 2009 by Dr. Sundaravalli Jayakumar (M.P.T Ortho), GG Physiotherapy Clinic provides compassionate, non-surgical relief for acute and chronic pain.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "About Clinic & Doctor" }]} />
      </div>

      {/* Story & Doctor Intro */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Doctor Visual / Credentials */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <Image
                  src="/images/doctor-portrait.jpg"
                  alt="Dr. Sundaravalli Jayakumar - Chief Physiotherapist"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-bold backdrop-blur-md border border-teal-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                    <span>Founder &amp; Chief Clinical Director</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">
                    Dr. Sundaravalli Jayakumar
                  </h2>
                  <p className="text-xs text-teal-300 font-medium">
                    B.P.T, M.P.T (Ortho), DNT, MIAP • 10+ Years Clinical Practice
                  </p>
                </div>
              </div>

              {/* Stat Strip */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl font-extrabold text-[#0A363D]">10+</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Years Active</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl font-extrabold text-[#0A363D]">12,500+</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Patients Healed</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <span className="block text-2xl font-extrabold text-amber-600">4.9★</span>
                  <span className="text-[11px] text-slate-500 font-semibold">312+ Reviews</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest block">
                  Our Philosophy &amp; Mission
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Healing Root Causes, Not Just Masking Symptoms.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  At <strong>GG Physiotherapy Clinic</strong>, we believe every patient deserves focused, one-on-one attention from a qualified orthopedic specialist. In an era where clinical visits often feel rushed and impersonal, our practice stands apart by committing dedicated time to understand your biomechanics, movement dysfunctions, and daily physical demands.
                </p>
                <p>
                  Rather than applying temporary heating pads or passive routines, Dr. Sundaravalli utilizes an active, diagnostic-first approach. By combining precise manual therapy techniques with modern electro-modalities (interferential therapy, therapeutic ultrasound, mechanical cervical and lumbar traction) and structured therapeutic exercises, we achieve sustainable relief.
                </p>
                <p>
                  Situated in Thirumalai Nagar Annexe, Perungudi, our clinic is specifically positioned to serve local families, senior citizens, and desk-bound tech professionals working in Chennai’s IT highway (OMR).
                </p>
              </div>

              {/* Core Tenets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Accurate 1-on-1 root cause functional diagnosis",
                  "M.P.T (Ortho) specialized clinical supervision",
                  "Dedicated 1-on-1 personalized in-clinic therapy",
                  "Workstation ergonomics & posture correction drills",
                  "Hygienic, private therapy cubicles with modern equipment",
                  "Transparent recovery timelines without false promises",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>  

              {/* Booking Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm hover:bg-[#D44E36] shadow-sm transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Dr. Sundaravalli</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${defaultSettings.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>{defaultSettings.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Pillar Care Methodology */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Our Clinical Protocol
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The 5-Pillar GG Physiotherapy Recovery Model
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every patient journey follows a structured medical framework designed to relieve acute pain first, restore joint range, and build lasting kinetic endurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CARE_PILLARS.map((p) => (
              <div
                key={p.step}
                className="p-6 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-300 transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-extrabold text-teal-700 font-mono">
                    {p.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10+ Years Evolution Timeline */}
      <section className="py-16 lg:py-24 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Clinic History
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              10+ Years of Dedicated Clinical Service in Chennai
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From our humble beginnings to a premier orthopedic physical therapy practice trusted by leading orthopedic surgeons and families across Chennai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINIC_MILESTONES.map((m) => (
              <div
                key={m.year}
                className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-extrabold bg-[#0A363D] text-white">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Clinic Care Delivery Pillars */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Dedicated In-Clinic Care
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Specialized Physical Therapy at Our Perungudi Clinic
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Step into our fully equipped clinical facility in Perungudi with 1-on-1 personalized sessions, ground-floor accessibility, and dedicated parking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1: Orthopedic & Spine */}
            <div className="p-8 rounded-3xl bg-[#FBF9F5] border-2 border-teal-700/20 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-900 text-teal-200 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Spine &amp; Orthopedic Decompression
                  </h3>
                  <span className="text-xs font-semibold text-teal-700">
                    Non-Surgical Disc &amp; Joint Pain Relief
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Full access to computerized spinal traction tables, IFT, ultrasound modalities, and private sanitized therapy cubicles with senior therapist supervision.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Computerized cervical and lumbar traction tables",
                  "Advanced multi-channel interferential therapy (IFT)",
                  "Dedicated exercise studio for gait and posture retraining",
                  "Organized 1-hour dedicated slots (Mon–Sat: 10am–1pm, 5–9pm)",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0A363D] text-white font-bold text-xs sm:text-sm hover:bg-[#13545E] transition-all"
                >
                  <span>Book In-Clinic Assessment</span>
                </Link>
              </div>
            </div>

            {/* Pillar 2: Post-Op & Neuro Rehab */}
            <div className="p-8 rounded-3xl bg-[#FBF9F5] border-2 border-amber-600/20 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E85D45] text-white flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Post-Surgical &amp; Neuro Rehabilitation
                  </h3>
                  <span className="text-xs font-semibold text-amber-800">
                    Knee, Hip, Stroke &amp; Paralysis Recovery
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Clinical outpatient protocols for knee/hip replacements, ACL reconstructions, stroke hemiplegia, and geriatric balance reconditioning.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "One-on-one supervised movement and gait retraining",
                  "Post-surgical knee flexion & quadriceps strengthening gym",
                  "Targeted electrotherapy and therapeutic ultrasound equipment",
                  "Senior citizen fall prevention and balance stabilization",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#E85D45] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#E85D45] text-white font-bold text-xs sm:text-sm hover:bg-[#D44E36] transition-all"
                >
                  <span>Book Consultation Slot</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Final CTA */}
      <section className="py-16 text-center bg-[#072025] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-bold border border-white/10">
            <Award className="w-4 h-4 text-teal-400" />
            <span>Accredited Physical Therapy Center</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Consult Dr. Sundaravalli Jayakumar Today
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Take the first proactive step toward lasting, non-surgical relief from back pain, cervical stiffness, knee osteoarthritis, or sports injury.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm hover:bg-[#D44E36] shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Priority Consultation</span>
            </Link>
            <a
              href={`tel:${defaultSettings.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call Clinic Doctor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
