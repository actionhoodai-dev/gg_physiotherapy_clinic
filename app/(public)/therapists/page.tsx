import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle, ArrowRight, ShieldCheck, Calendar, Phone } from "lucide-react";
import { getTherapists } from "@/lib/firestore";
import { defaultSettings } from "@/lib/defaultData";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Clinical Specialists & Doctors | GG Physiotherapy Clinic Chennai",
  description:
    "Meet Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP) and the clinical rehabilitation team at GG Physiotherapy Clinic in Perungudi, Chennai.",
};

export default async function TherapistsPage() {
  const therapists = await getTherapists(true);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>Clinical Specialists &amp; Medical Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Expert Physical Therapists{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Dedicated to Your Care.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experienced, accredited, and passionate practitioners delivering personalized orthopedic, spine, and neuro-functional recovery in Perungudi, Chennai.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Clinical Specialists" }]} />
      </div>

      {/* Therapists Listing */}
      <section className="py-12 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch group"
            >
              <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[440px] bg-slate-100 overflow-hidden">
                <Image
                  src={therapist.profileImage || "/images/doctor-portrait.jpg"}
                  alt={therapist.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300 block">
                    Chief Consultant
                  </span>
                  <h3 className="text-xl font-extrabold">
                    {therapist.name}
                  </h3>
                  <p className="text-xs text-slate-200">
                    {therapist.qualification}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 bg-teal-100/70 border border-teal-200 px-3 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                      <span>{therapist.yearsOfExperience}+ Years Clinical Excellence</span>
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      12,500+ Patients Treated
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {therapist.name}
                  </h2>

                  <p className="text-xs font-bold text-[#0A363D] uppercase tracking-wider">
                    {therapist.designation}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {therapist.biography}
                  </p>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
                      Specialized Clinical Practice:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {therapist.specialization.slice(0, 4).map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Languages: <strong className="text-slate-800">{therapist.languages.join(", ")}</strong>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/therapists/${therapist.id}`}
                      className="text-xs font-bold text-slate-600 hover:text-[#0A363D] transition-colors"
                    >
                      Credentials
                    </Link>

                    <Link
                      href="/appointment"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A363D] text-white text-xs font-bold hover:bg-[#13545E] shadow-sm transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-teal-300" />
                      <span>Book with {therapist.name.split(" ")[1]}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
