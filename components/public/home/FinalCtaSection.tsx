"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Phone, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { defaultHomepageCMS, defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { ClinicSettings, HomepageCMS } from "@/types";

export function FinalCtaSection({
  cta = defaultHomepageCMS.finalCta,
  settings = defaultSettings,
}: {
  cta?: HomepageCMS["finalCta"];
  settings?: ClinicSettings;
}) {
  const currentSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = generateWhatsAppLink(
    currentSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I would like to book a consultation."
  );

  return (
    <section className="relative py-20 lg:py-28 bg-[#07252A] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <Reveal direction="up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Begin Your Recovery Journey</span>
          </div>
        </Reveal>

        <Reveal direction="up" delay={100}>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Your Better, Pain-Free Movement{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Starts Today.
            </span>
          </h2>
        </Reveal>

        <Reveal direction="up" delay={150}>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {cta.subtitle || "Experience personalized 1-on-1 care with Dr. Sundaravalli Jayakumar. Dedicated in-clinic assessments in Perungudi and professional home visits across South Chennai."}
          </p>
        </Reveal>

        {/* Clinical Guarantees */}
        <Reveal direction="up" delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Direct Doctor Evaluation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Non-Surgical Focus</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Same-Day Slots Available</span>
            </div>
          </div>
        </Reveal>

        {/* Conversion CTA Group */}
        <Reveal direction="up" delay={250}>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E85D45] text-white font-extrabold text-sm sm:text-base hover:bg-[#D44E36] shadow-[0_10px_25px_-5px_rgba(232,93,69,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5 text-white/90" />
              <span>{cta.buttonText || "Book an Appointment"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${currentSettings.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call {currentSettings.phone}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 font-semibold text-sm sm:text-base transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
