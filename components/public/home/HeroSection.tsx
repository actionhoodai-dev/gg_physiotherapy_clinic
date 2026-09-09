"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Phone,
  Star,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { defaultHomepageCMS, defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { ClinicSettings, HomepageCMS } from "@/types";

export function HeroSection({
  cms = defaultHomepageCMS,
  settings = defaultSettings,
}: {
  cms?: HomepageCMS;
  settings?: ClinicSettings;
}) {
  const currentSettings = { ...defaultSettings, ...settings };
  const { hero } = cms;
  const whatsappUrl = generateWhatsAppLink(
    currentSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I would like to book a consultation."
  );

  return (
    <section className="relative w-full min-h-[95svh] lg:min-h-[100svh] flex items-center overflow-hidden bg-[#072025] text-white">
      {/* 1. Cinematic Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.heroImage || "/images/hero-cinematic.jpg"}
          alt="Professional physiotherapy rehabilitation session at GG Physiotherapy Clinic Perungudi Chennai"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-center filter brightness-[0.9] animate-hero-image"
        />

        {/* 2. Sophisticated Multi-Stage Vignette / Gradient Overlay */}
        {/* Left-to-right directional mask for typography contrast while keeping the right side bright and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072025]/95 via-[#072025]/80 to-[#072025]/25 lg:to-transparent" />
        {/* Subtle bottom fade to seamlessly blend with the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#072025] via-transparent to-transparent opacity-90" />
        {/* Subtle top shade to ground the header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#072025]/70 to-transparent" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 animate-hero-reveal">
            {/* Top Pre-heading Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-teal-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span>GG Physiotherapy Clinic • Perungudi, Chennai</span>
            </div>

            {/* Editorial Display Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Restore Your Natural Mobility.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block mt-2">
                Live Free From Pain.
              </span>
            </h1>

            {/* Doctor Credentials & Positioning Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200/90 font-normal leading-relaxed max-w-2xl">
              Under the clinical leadership of{" "}
              <strong className="text-white font-semibold underline decoration-teal-400/50 underline-offset-4">
                Dr. Sundaravalli Jayakumar
              </strong>{" "}
              (B.P.T, M.P.T ORTHO, DNT, MIAP, FOMT, MSE), Founder &amp; Chief Consultant, Osteopathy &amp; Dry Needle Therapist, we provide precise root-cause diagnosis, advanced spinal decompression, and evidence-driven orthopedic rehabilitation in Chennai.
            </p>

            {/* Clinical Highlights Pill Badges */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-slate-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>20+ Years Orthopedic Excellence</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Non-Surgical Disc & Spine Care</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>1-on-1 In-Clinic Therapy Only</span>
              </div>
            </div>

            {/* High-Conversion Primary & Secondary Action Cluster */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {/* Primary High-Contrast Appointment CTA */}
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#E85D45] text-white font-bold text-sm sm:text-base hover:bg-[#D44E36] shadow-[0_10px_25px_-5px_rgba(232,93,69,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5 text-white/90" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary Explore Treatments CTA */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/25 transition-all"
              >
                <span>Explore Treatments</span>
              </Link>

              {/* Quick Communication Actions */}
              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href={`tel:${currentSettings.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white hover:bg-white/20 transition-colors"
                  title={`Call Clinic (${currentSettings.phone})`}
                >
                  <Phone className="w-4 h-4 text-teal-300" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 backdrop-blur-sm border border-[#25D366]/40 text-[#25D366] transition-colors"
                  title="Chat on WhatsApp"
                  aria-label="Chat with Clinic on WhatsApp"
                >
                  <svg
                    className="w-5 h-5 fill-current text-[#25D366]"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.201.3-.778.979-.954 1.18-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.784-1.673-2.085-.175-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.175.201-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.678-1.633-.929-2.238-.244-.589-.493-.509-.678-.519-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.375-.276.3-1.054 1.03-1.054 2.513s1.079 2.913 1.23 3.113c.15.2 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.251-.702.251-1.303.176-1.43-.075-.127-.276-.202-.577-.352z" />
                    <path d="M12.004 0C5.385 0 0 5.385 0 12.004c0 2.115.553 4.184 1.602 6.007L0 24l6.166-1.579a11.96 11.96 0 005.838 1.503c6.618 0 12.003-5.385 12.003-12.004C24.007 5.385 18.622 0 12.004 0zm0 21.907c-1.808 0-3.578-.487-5.12-1.408l-.367-.218-3.662.937.978-3.568-.239-.38a9.88 9.88 0 01-1.517-5.266c0-5.467 4.453-9.92 9.927-9.92 5.474 0 9.927 4.453 9.927 9.92 0 5.468-4.453 9.925-9.927 9.925z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Proof & Trust Metric Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-extrabold text-white text-sm">4.9 / 5.0</span>
                <span className="text-slate-400">• 312+ Google Reviews</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>12,500+ Patients Treated Across Chennai</span>
              </div>
            </div>
          </div>

          {/* Right Floating Trust Highlights Card */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end space-y-4">
            {/* Floating Doctor Card */}
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-2xl space-y-3 animate-subtle-float">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-[#0A363D] flex items-center justify-center text-white font-extrabold text-lg shadow-md border border-white/20">
                  SJ
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Dr. Sundaravalli Jayakumar
                  </h3>
                  <p className="text-xs text-teal-300 font-medium">
                    B.P.T, M.P.T (ORTHO), DNT, MIAP, FOMT, MSE
                  </p>
                  <p className="text-[11px] text-teal-200/80 font-normal">
                    Osteopathy &amp; Dry Needle Therapist
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-200/80 leading-relaxed border-t border-white/10 pt-3">
                Founder &amp; Chief Consultant Physiotherapist, Osteopathy &amp; Dry Needle Therapist serving Perungudi, Velachery, Thoraipakkam, and the OMR IT Corridor.
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-teal-200 pt-1">
                <span>✓ 1-on-1 Personalized Care</span>
                <span>✓ Advanced Modalities</span>
              </div>
            </div>

            {/* Quick Timing & Location Pill */}
            <div className="bg-[#0A363D]/90 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10 shadow-lg text-xs space-y-1">
              <div className="flex items-center gap-2 text-teal-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Morning & Evening Consultations</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Mon–Sat: 10am–1pm & 5–9pm | Sunday: 11am–1pm
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Subtle Ambient Scroll Down Indicator */}
      <div className="absolute bottom-4 inset-x-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-teal-200/80 mb-1">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-teal-300 animate-bounce" />
      </div>
    </section>
  );
}
