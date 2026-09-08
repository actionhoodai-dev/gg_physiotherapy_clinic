import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Award,
  CheckCircle,
  Phone,
  MessageSquare,
  Globe,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getTherapists } from "@/lib/firestore";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const therapists = await getTherapists(true);
  const doctor = therapists.find((t) => t.id === slug);
  if (!doctor) return { title: "Therapist Not Found" };

  return {
    title: `${doctor.name} | ${doctor.designation} | GG Physiotherapy Clinic`,
    description: doctor.biography.slice(0, 160),
  };
}

export default async function TherapistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const therapists = await getTherapists(true);
  const doctor = therapists.find((t) => t.id === slug);

  if (!doctor) {
    notFound();
  }

  const whatsappUrl = generateWhatsAppLink(
    defaultSettings.whatsapp,
    `Hello Dr. ${doctor.name}, I would like to book a consultation at GG Physiotherapy Clinic.`
  );

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Header */}
      <section className="bg-[#072025] text-white py-14 lg:py-20 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Breadcrumbs
            items={[
              { label: "Therapists", href: "/therapists" },
              { label: doctor.name },
            ]}
            className="text-slate-300"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative h-72 sm:h-80 w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                <Image
                  src={doctor.profileImage || "/images/doctor-portrait.jpg"}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-9 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-200 bg-white/10 border border-white/10 px-3.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-teal-400" />
                <span>{doctor.yearsOfExperience}+ Years Clinical Excellence</span>
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {doctor.name}
              </h1>

              <p className="text-base font-bold text-teal-300">
                {doctor.qualification}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {doctor.designation}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <span>GG Physiotherapy Clinic, Perungudi, Chennai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-teal-400" />
                  <span>Languages: {doctor.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Full Biography */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Professional Biography
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                  {doctor.biography}
                </p>
              </div>

              {/* Specializations */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Areas of Clinical Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.specialization.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-slate-100 bg-[#FBF9F5]"
                    >
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Philosophy */}
              <div className="p-7 sm:p-9 rounded-3xl bg-white border-l-4 border-[#0A363D] shadow-xs space-y-3">
                <h3 className="text-xl font-extrabold text-[#0A363D]">
                  Treatment Philosophy
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
                  &ldquo;Every patient deserves to understand the root cause behind their pain. When patients are educated on their biomechanics and supported through progressive, supervised therapeutic movement, natural healing takes place without relying on lifelong medications.&rdquo;
                </p>
              </div>
            </div>

            {/* Sidebar with Booking Action */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white p-7 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    Direct Consultation
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-3 leading-snug">
                    Book Assessment With {doctor.name.split(" ")[1] || doctor.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Morning and evening consultation slots available in Perungudi, Chennai.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <strong className="text-slate-900">Perungudi, Chennai</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Morning Slots:</span>
                    <strong className="text-slate-900">10:00 AM – 1:00 PM</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Evening Slots:</span>
                    <strong className="text-slate-900">5:00 PM – 9:00 PM</strong>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <Link
                    href={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E85D45] text-white font-extrabold text-xs sm:text-sm hover:bg-[#D44E36] transition-all shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment Slot</span>
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Clinic</span>
                  </a>

                  <a
                    href={`tel:${defaultSettings.phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Call {defaultSettings.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
