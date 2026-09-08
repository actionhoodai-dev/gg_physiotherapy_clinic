import React from "react";
import { Metadata } from "next";
import { defaultSettings } from "@/lib/defaultData";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | GG Physiotherapy Clinic Chennai",
  description: "Terms and conditions for clinic appointments and physiotherapy consultations at GG Physiotherapy Clinic.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      {/* Editorial Header */}
      <section className="bg-[#0A363D] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Terms of Service" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            <FileText className="w-3.5 h-3.5 text-teal-300" />
            Clinical Service Terms
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-stone-300 mt-3">
            Last Updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs space-y-8 text-stone-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                1. Medical Disclaimer
              </h2>
              <p className="text-sm sm:text-base">
                The content provided on this website—including articles, rehabilitation FAQs, exercise descriptions, and videos—is strictly educational and intended for general awareness. It does not substitute for formal clinical diagnosis, individualized physical therapy prescription, or physician consultation.
              </p>
            </section>

            <div className="h-px bg-stone-100" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                2. Appointment Scheduling & Confirmations
              </h2>
              <p className="text-sm sm:text-base">
                Online appointment booking represents a slot enquiry. All appointments are confirmed by our clinic reception team via phone call or WhatsApp message based on therapist schedule availability. If you are unable to attend your scheduled session, please provide at least 2 hours advance notice so the time slot can be offered to patients requiring urgent care.
              </p>
            </section>

            <div className="h-px bg-stone-100" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                3. In-Clinic Consultations &amp; Appointments
              </h2>
              <p className="text-sm sm:text-base">
                All consultations and physical therapy treatments are conducted in-clinic at our Perungudi facility. Scheduled 1-hour appointment slots should be honored promptly to ensure seamless clinical care and zero waiting times for all patients.
              </p>
            </section>

            <div className="h-px bg-stone-100" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                4. Governing Law & Jurisdiction
              </h2>
              <p className="text-sm sm:text-base">
                Any claims or disputes arising in connection with services rendered by GG Physiotherapy Clinic shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
