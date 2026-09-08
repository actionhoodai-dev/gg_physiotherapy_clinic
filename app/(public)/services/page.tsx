import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Clock,
  Activity,
  Calendar,
  ShieldCheck,
  Sparkles,
  Zap,
  HelpCircle,
  Stethoscope,
  Layers,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { getServices } from "@/lib/firestore";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Specialized Physiotherapy Services | Perungudi, Chennai | GG Physio",
  description:
    "Explore our complete range of physical therapy services in Perungudi, Chennai including Orthopedic Rehab, Spine & Back Care, Sports Injury Therapy, and Stroke Recovery.",
};

const MODALITIES = [
  {
    name: "Interferential Therapy (IFT)",
    category: "Electrotherapy",
    purpose:
      "Crosses two medium-frequency currents deep within soft tissues to alleviate acute muscle spasm, sciatica inflammation, and chronic back ache.",
  },
  {
    name: "Therapeutic Ultrasound (1 & 3 MHz)",
    category: "Deep Heat Modality",
    purpose:
      "Delivers high-frequency acoustic waves that generate micro-massage and deep cellular thermal effects to soften scar tissue and treat tendonitis.",
  },
  {
    name: "Digital Cervical & Lumbar Traction",
    category: "Spinal Decompression",
    purpose:
      "Precision computerized unloading of compressed intervertebral discs to relieve nerve root entrapment in slipped disc and sciatica cases.",
  },
  {
    name: "TENS (Transcutaneous Electrical Nerve Stimulation)",
    category: "Pain Modulation",
    purpose:
      "Stimulates sensory nerve endings to activate the body's natural gate control pain-blocking mechanism for non-pharmaceutical analgesia.",
  },
  {
    name: "Manual Therapy & Joint Mobilization",
    category: "Hands-on Orthopedics",
    purpose:
      "Expert passive mobilization of spinal vertebrae, shoulder, and knee joints following Maitland and Kaltenborn orthopedic protocols.",
  },
  {
    name: "Kinetic Rehabilitation & Exercise Therapy",
    category: "Active Restoration",
    purpose:
      "Targeted resistance training, Swiss ball balance drills, and core stabilizing exercises to rebuild long-term muscular resilience.",
  },
];

const SERVICE_FAQS = [
  {
    q: "How many physiotherapy sessions will I need?",
    a: "The number of sessions depends on the nature of your pathology. Acute sprains often show significant recovery within 4 to 6 sessions, whereas chronic conditions like lumbar disc herniation, frozen shoulder, or post-operative knee replacement may require 10 to 15 structured sessions alongside home exercises.",
  },
  {
    q: "Do I need an X-ray or MRI before booking a consultation?",
    a: "While imaging reports are helpful, you do not need an MRI or X-ray to initiate evaluation. Dr. Sundaravalli performs comprehensive physical, neurological, and biomechanical tests during your first appointment and will advise imaging only if clinically indicated.",
  },
  {
    q: "Can physiotherapy help me avoid spinal or knee surgery?",
    a: "In many cases of lumbar disc bulge, sciatica, mild-to-moderate knee osteoarthritis, and cervical spondylosis, structured physical therapy and mechanical decompression resolve pain and restore functional movement, making invasive surgery unnecessary.",
  },
  {
    q: "How are consultation slots scheduled at the clinic?",
    a: "We provide dedicated 1-hour in-clinic appointment slots from Monday to Saturday (10:00 AM – 1:00 PM & 5:00 PM – 9:00 PM) and Sunday (11:00 AM – 1:00 PM). Booking in advance ensures zero waiting times and dedicated one-on-one clinical attention.",
  },
];

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Clinical Treatments &amp; Rehabilitation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Targeted Physiotherapy Protocols{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              in Chennai.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every rehabilitation protocol is formulated around root biomechanical diagnosis, imaging findings, and your personal lifestyle demands to ensure rapid relief and long-term joint health.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Clinical Services" }]} />
      </div>

      {/* Services Listing Grid */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Clinical Specializations
            </h2>
            <p className="text-sm text-slate-600">
              Evidence-based treatments led by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T Ortho, DNT, MIAP).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.thumbnail || service.heroImage || "/images/hero-cinematic.jpg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-[#0A363D] text-white shadow-xs uppercase tracking-wider">
                        Specialization 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors leading-snug">
                      {service.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                        Proven Clinical Outcomes:
                      </span>
                      {service.benefits.slice(0, 3).map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <Check className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{service.durationInfo ? service.durationInfo.split(".")[0] : "45–60 mins"}</span>
                    </div>

                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A363D] group-hover:text-[#E85D45] transition-colors"
                    >
                      <span>Treatment Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalities & Clinical Technology Matrix */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Equipment &amp; Modalities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Advanced Clinical Modalities Used in Your Care
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We combine manual physical therapy with calibrated electro-physical agents to safely accelerate tissue regeneration and relieve deep nerve compression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODALITIES.map((mod) => (
              <div
                key={mod.name}
                className="p-7 rounded-3xl bg-[#FBF9F5] border border-slate-200/80 shadow-xs hover:border-teal-400 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-md">
                    {mod.category}
                  </span>
                  <Zap className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {mod.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {mod.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment FAQs */}
      <section className="py-16 lg:py-20 bg-[#FBF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Treatment FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers to help you feel completely confident before your appointment.
            </p>
          </div>

          <div className="space-y-4">
            {SERVICE_FAQS.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7.5 font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="py-16 bg-[#072025] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Not Sure Which Treatment Protocol You Need?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Schedule a comprehensive physical evaluation with Dr. Sundaravalli Jayakumar (M.P.T Ortho) for an accurate root-cause diagnosis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm hover:bg-[#D44E36] shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Clinical Assessment</span>
            </Link>
            <a
              href="tel:09094026006"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <span>Call Clinic Directly</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
