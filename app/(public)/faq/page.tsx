import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Phone, Calendar, MessageSquare, HelpCircle, ArrowRight } from "lucide-react";
import { getFAQs } from "@/lib/firestore";
import { FAQClient } from "@/components/public/FAQClient";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Frequently Asked Questions | GG Physiotherapy Clinic Chennai",
  description:
    "Common questions answered about physiotherapy consultations, treatment costs, timings, home visits, and appointments in Perungudi, Chennai.",
};

export default async function FAQPage() {
  const faqs = await getFAQs(true);
  const whatsappUrl = generateWhatsAppLink(
    defaultSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I have a question regarding consultation."
  );

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Patient Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Frequently Asked Questions &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Guidance.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our clinic timings, doorstep home visits in South Chennai, evidence-based therapy protocols, and booking procedures.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />
      </div>

      {/* Main FAQ Area */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FAQClient faqs={faqs} />

          {/* Still Have Questions Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center space-y-5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Have a Question That Isn&apos;t Answered Here?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Our clinical desk and Dr. Sundaravalli Jayakumar are glad to provide clear answers regarding your specific condition.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={`tel:${defaultSettings.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A363D] text-white font-bold text-xs sm:text-sm hover:bg-[#13545E] transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                <span>Call {defaultSettings.phone}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E85D45] text-white font-bold text-xs sm:text-sm hover:bg-[#D44E36] shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
