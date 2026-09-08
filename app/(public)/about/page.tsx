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
    "Learn about GG Physiotherapy Clinic in Perungudi, Chennai, founded by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP) with over 15 years of clinical orthopedic experience.",
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
    title: "Dedicated Home Visit Care Service",
    description:
      "Expanded specialized rehabilitation services for post-knee replacement and elderly mobility patients across Velachery, Perungudi, and OMR.",
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
            Compassionate, Evidence-Driven{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Rehabilitation in Chennai.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Under the clinical direction of Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP), GG Physiotherapy Clinic has restored mobility and quality of life for thousands of patients across Perungudi and the OMR corridor since 2009.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "About Clinic & Doctor" }]} />
      </div>

      {/* Main Narrative & Doctor Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                <Image
                  src="/images/doctor-portrait.jpg"
                  alt="Dr. Sundaravalli Jayakumar B.P.T M.P.T Ortho at GG Physiotherapy Clinic"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 block">
                    Chief Consultant &amp; Director
                  </span>
                  <h3 className="text-xl font-extrabold">
                    Dr. Sundaravalli Jayakumar
                  </h3>
                  <p className="text-xs text-slate-200">
                    B.P.T, M.P.T (ORTHO), DNT, MIAP
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>15+ Years Clinical Practice</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized Master’s degree in Orthopedics (M.P.T) and Diploma in Neuro Therapy (DNT). Treated over 12,500+ patients suffering from acute disc herniations, sciatica, knee arthritis, and post-operative stiffness.
                </p>
              </div>
            </div>

            {/* Narrative Storytelling Column */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200">
                  Our Clinical Philosophy
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Freedom From Pain Without Unnecessary Surgery
                </h2>
              </div>

              {/* Editorial Quote */}
              <div className="p-6 rounded-2xl bg-white border-l-4 border-[#0A363D] shadow-xs relative">
                <Quote className="w-8 h-8 text-teal-600/30 absolute top-4 right-4" />
                <p className="text-base font-semibold text-slate-800 italic leading-relaxed">
                  &ldquo;Effective rehabilitation begins by uncovering the complete biomechanical portrait of each individual. Pain is rarely isolated — it is the symptom of an underlying muscular imbalance or altered joint mechanic.&rdquo;
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
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
                  "Dedicated home visit care for post-op and elderly patients",
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

      {/* 15+ Years Evolution Timeline */}
      <section className="py-16 lg:py-24 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Clinic History
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              15+ Years of Dedicated Clinical Service in Chennai
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

      {/* In-Clinic vs Home Visit Service Breakdown */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Flexible Care Delivery
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              In-Clinic Sessions &amp; Dedicated Home Visits
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you can travel to our modern Perungudi facility or require home-based physical therapy post-surgery, we ensure uninterrupted clinical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* In-Clinic */}
            <div className="p-8 rounded-3xl bg-[#FBF9F5] border-2 border-teal-700/20 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-900 text-teal-200 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    In-Clinic Outpatient Care
                  </h3>
                  <span className="text-xs font-semibold text-teal-700">
                    Perungudi Clinic Facility
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Full access to digital traction tables, IFT, ultrasound modalities, balance equipment, and complete privacy in our sanitized cubicles.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Computerized cervical and lumbar traction tables",
                  "Advanced multi-channel interferential therapy (IFT)",
                  "Dedicated exercise studio for gait and posture retraining",
                  "Flexible morning & evening slots (Mon–Sat: 10am–1pm, 5–9pm)",
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

            {/* Home Visit */}
            <div className="p-8 rounded-3xl bg-[#FBF9F5] border-2 border-amber-600/20 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E85D45] text-white flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Dedicated Home Visit Physiotherapy
                  </h3>
                  <span className="text-xs font-semibold text-amber-800">
                    Perungudi, Velachery, OMR &amp; South Chennai
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Specialized mobile physical therapy for senior citizens, post-operative knee and hip replacements, stroke survivors, and patients unable to travel.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "One-on-one supervised bed-to-chair transfer retraining",
                  "Post-surgical knee flexion & quadriceps strengthening",
                  "Portable electrotherapy and therapeutic ultrasound equipment",
                  "Caregiver education and home fall-hazard modification advice",
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
                  <span>Schedule Home Visit Consultation</span>
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
