import React from "react";
import { Metadata } from "next";
import { defaultSettings } from "@/lib/defaultData";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | GG Physiotherapy Clinic Chennai",
  description: "Privacy policy and patient clinical data confidentiality standards at GG Physiotherapy Clinic.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen">
      {/* Editorial Header */}
      <section className="bg-[#0A363D] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy Policy" },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
            Patient Data Privacy Standards
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy
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
                1. Information Collection & Usage
              </h2>
              <p className="text-sm sm:text-base">
                GG Physiotherapy Clinic respects your personal privacy. We collect personal identification details (including name, telephone number, email address, preferred appointment times, and clinical symptoms) solely for scheduling consultations, communicating reminders, and delivering personalized physiotherapy care.
              </p>
            </section>

            <div className="h-px bg-stone-100" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                2. Clinical Confidentiality
              </h2>
              <p className="text-sm sm:text-base">
                All clinical intake information, case histories, and physiological records provided to Dr. Sundaravalli Jayakumar and our certified physical therapy staff are treated with strict confidentiality in accordance with Indian Medical Ethics and healthcare data guidelines. We will never sell, rent, or lease your personal information to third-party advertisers.
              </p>
            </section>

            <div className="h-px bg-stone-100" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                3. Communication & WhatsApp Coordination
              </h2>
              <p className="text-sm sm:text-base">
                When you submit an appointment enquiry or choose to interact with our clinic via WhatsApp, your contact number is used solely to coordinate your visit, answer queries, or confirm time slots. You may opt out of non-essential communications at any time.
              </p>
            </section>

            <div className="h-px bg-stone-100" />

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[#0A363D]">
                4. Contact Our Privacy Officer
              </h2>
              <p className="text-sm sm:text-base">
                For questions regarding our privacy practices, please contact us at{" "}
                <strong className="text-[#0A363D]">{defaultSettings.email}</strong> or visit our clinic at {defaultSettings.address}, {defaultSettings.area}, {defaultSettings.city} - {defaultSettings.pincode}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
