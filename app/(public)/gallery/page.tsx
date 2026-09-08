import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Sparkles,
  Layers,
  Activity,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { getGalleryItems } from "@/lib/firestore";
import { GalleryClient } from "@/components/public/GalleryClient";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { defaultSettings } from "@/lib/defaultData";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Clinic Gallery & Facilities | GG Physiotherapy Clinic Chennai",
  description:
    "Explore our modern clinical infrastructure, electrotherapy bays, traction equipment, and exercise rehabilitation area in Perungudi, Chennai.",
};

const INFRASTRUCTURE_FEATURES = [
  {
    icon: Layers,
    title: "Private Acoustically-Treated Cubicles",
    description:
      "Every treatment station is curtained and partitioned to provide complete dignity, comfort, and focused one-on-one attention during therapy sessions.",
    highlight: "100% Patient Privacy",
  },
  {
    icon: Activity,
    title: "Digital Lumbar & Cervical Traction Tables",
    description:
      "Precision-calibrated mechanical decompression units engineered to gently relieve intervertebral disc pressure for sciatica and cervical radiculopathy.",
    highlight: "Non-Surgical Decompression",
  },
  {
    icon: Sparkles,
    title: "Advanced Multi-Wave Electro-Modalities",
    description:
      "Includes 4-channel Interferential Therapy (IFT), high-frequency therapeutic ultrasound, TENS units, and neuromuscular muscle stimulators.",
    highlight: "Rapid Pain & Inflammation Relief",
  },
  {
    icon: HeartHandshake,
    title: "Movement Rehabilitation & Exercise Gym",
    description:
      "Equipped with Swiss balls, resistance bands, proprioception balance discs, shoulder pulleys, and gait retraining tracks for dynamic recovery.",
    highlight: "Functional Kinetic Training",
  },
];

const HYGIENE_STANDARDS = [
  "Hospital-grade sanitization of treatment couches after each patient",
  "Sterilized modality probe heads and clean conductive gels",
  "Freshly laundered single-use linen and disposable headrest covers",
  "Regular disinfection of all rehabilitation exercise accessories and bands",
  "Continuous fresh-air cross-ventilation and clean clinical atmosphere",
  "Strict adherence to Indian Association of Physiotherapists safety protocols",
];

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Camera className="w-3.5 h-3.5 text-teal-400" />
            <span>Clinic Tour &amp; Facility</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Modern Infrastructure &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Clinical Space.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Take a visual walkthrough of our private therapy cubicles, computerized traction tables, electro-modalities, and movement rehabilitation studio in Perungudi, Chennai.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Clinic Gallery" }]} />
      </div>

      {/* Interactive Gallery Stream / Upload Notice */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient initialItems={items} />
        </div>
      </section>

      {/* Clinical Infrastructure Highlights */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-100/70 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Clinical Environment
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Designed For Healing, Comfort, and Patient Privacy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every square foot of GG Physiotherapy Clinic in Perungudi has been carefully appointed to support rapid clinical assessment and uninterrupted recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INFRASTRUCTURE_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-8 rounded-3xl bg-[#FBF9F5] border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-900 text-teal-200 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
                      {feat.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hygiene & Clinical Protocols */}
      <section className="py-16 lg:py-20 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#072025] rounded-3xl p-8 sm:p-12 text-white border border-[#0A363D] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Clinical Hygiene Assurance</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Hospital-Grade Sanitization Standards
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Our patients range from active sportspersons to vulnerable seniors and post-operative patients. We enforce strict infection control and equipment sanitization between every single appointment.
                </p>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs text-teal-300 font-semibold">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>Thirumalai Nagar Annexe, Perungudi, Chennai</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {HYGIENE_STANDARDS.map((standard) => (
                  <div
                    key={standard}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="py-16 text-center bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Experience Our Clinical Care in Person
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Visit Dr. Sundaravalli Jayakumar at GG Physiotherapy Clinic in Perungudi for a comprehensive physical evaluation and personalized rehabilitation protocol.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm hover:bg-[#D44E36] shadow-sm transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Clinic Assessment</span>
            </Link>
            <a
              href={`tel:${defaultSettings.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>Call Clinic Doctor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
