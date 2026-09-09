import React from "react";
import { Metadata } from "next";
import { AppointmentForm } from "@/components/public/AppointmentForm";
import {
  Clock,
  Phone,
  ShieldCheck,
  Building2,
  CheckCircle,
  Star,
  Calendar,
  Activity,
  Award,
  Sparkles,
  MapPin,
} from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";
import { getClinicSettings } from "@/lib/firestore";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const metadata: Metadata = {
  title: "Book an Appointment | GG Physiotherapy Clinic Perungudi Chennai",
  description:
    "Schedule your dedicated in-clinic physiotherapy consultation with Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP) in Perungudi, Chennai. Modern 1-on-1 offline clinical care and rehabilitation.",
};

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; condition?: string; doctor?: string }>;
}) {
  const [{ service, condition }, settings] = await Promise.all([
    searchParams,
    getClinicSettings(),
  ]);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>Dedicated In-Clinic Consultation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Book Your Physiotherapy Consultation{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              in Perungudi, Chennai.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select your preferred consultation date and 1-hour time slot. Our clinical desk in Perungudi will review and confirm your in-clinic appointment promptly.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Book In-Clinic Appointment" }]} />
      </div>

      {/* Main Booking Area */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Booking Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
              <AppointmentForm
                initialService={service}
                initialCondition={condition}
                settings={settings}
              />
            </div>

            {/* Clinic Information Sidebar (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trust Card */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>What to Expect at Your First Consultation</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>In-depth 1-on-1 root cause biomechanical &amp; orthopedic evaluation by Dr. Sundaravalli</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Immediate targeted manual therapy and pain-relieving electro-modalities</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>Personalized progressive exercise roadmap and posture re-training</span>
                  </li>
                </ul>
              </div>

              {/* In-Clinic Facility Advantages Card */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    In-Clinic Treatment Facility
                  </h3>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    Offline Clinic Only
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-[#FBF9F5] space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Building2 className="w-4 h-4 text-[#0A363D]" />
                      <span>Dedicated Clinic at Perungudi</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Equipped with digital spinal traction units, ultrasound, IFT electrotherapy bays, and functional rehabilitation gear.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-[#FBF9F5] space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Clock className="w-4 h-4 text-[#0A363D]" />
                      <span>Organized 1-Hour Dedicated Slots</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Zero long waiting times. Each patient receives uninterrupted, hands-on clinical therapy with senior physiotherapist.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-100 bg-[#FBF9F5] space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <MapPin className="w-4 h-4 text-[#0A363D]" />
                      <span>Easy Ground Floor Access &amp; Parking</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Convenient for patients with mobility limitations, knee osteoarthritis, or acute lumbar disc pain.
                    </p>
                  </div>
                </div>
              </div>

              {/* Immediate Reception Desk */}
              <div className="bg-[#0A363D] text-white p-7 rounded-3xl space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-teal-300 font-bold uppercase tracking-wider">
                    Need Help Immediately?
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-300 font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    4.9★
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Speak Directly With Reception
                </h4>
                <p className="text-xs text-teal-100/90 leading-relaxed">
                  Call directly to check same-day emergency appointment slots:
                </p>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-base font-extrabold text-teal-300 hover:text-white transition-colors pt-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>{settings.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
