"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import { ClinicSettings } from "@/types";

export function Footer({ settings = defaultSettings }: { settings?: ClinicSettings }) {
  const currentSettings = { ...defaultSettings, ...settings };

  return (
    <footer className="bg-[#072025] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-[#0A363D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Clinic Identity & Accreditation (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#0A363D] flex items-center justify-center text-white font-extrabold text-lg border border-teal-500/30 shadow-sm">
                <span className="text-teal-300">G</span>G
              </div>
              <div>
                <h4 className="text-white font-extrabold text-base leading-tight">
                  GG Physiotherapy Clinic
                </h4>
                <p className="text-xs text-teal-400 font-semibold">
                  Dr. Sundaravalli Jayakumar • M.P.T (Ortho)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Specialized orthopedic rehabilitation, non-surgical spinal decompression, and neuro-functional recovery in Perungudi, Chennai. Delivering evidence-driven, personalized clinical care since 2009.
            </p>

            {/* Google Verified Card */}
            <div className="bg-[#0A363D]/60 border border-teal-900/60 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  Google Verified Rating
                </span>
                <span className="flex items-center text-amber-400 text-xs font-extrabold gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  4.9 / 5.0
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Over 312+ verified reviews from patients across Chennai
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={currentSettings.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
                >
                  <span>Verified Google Profile</span>
                  <ExternalLink className="w-3 h-3 text-teal-400" />
                </a>

                {currentSettings.socialLinks?.instagram && (
                  <a
                    href={currentSettings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-pink-300 border border-white/10 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Explore Clinic
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: "About Clinic & Doctor", href: "/about" },
                { name: "Clinical Services", href: "/services" },
                { name: "Conditions Treated", href: "/conditions" },
                { name: "Medical Team", href: "/therapists" },
                { name: "Patient Reviews", href: "/testimonials" },
                { name: "Clinic Facility & Space", href: "/gallery" },
                { name: "Frequently Asked", href: "/faq" },
                { name: "Location & Directions", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-teal-300 transition-colors flex items-center gap-1 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500/70" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Treatments (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Key Specializations
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: "Orthopedic Rehabilitation", href: "/services/orthopedic-rehabilitation" },
                { name: "Spine & Low Back Pain Care", href: "/services/spine-back-pain-care" },
                { name: "Sciatica Nerve Decompression", href: "/conditions/low-back-pain-sciatica" },
                { name: "Knee Osteoarthritis Therapy", href: "/conditions/knee-osteoarthritis" },
                { name: "Frozen Shoulder Mobility", href: "/conditions/frozen-shoulder" },
                { name: "Sports Injury Reconditioning", href: "/services/sports-injury-rehab" },
                { name: "Stroke & Neuro Rehabilitation", href: "/services/neuro-rehabilitation" },
                { name: "Post-Surgical Knee / Hip Rehab", href: "/services/post-surgical-rehab" },
                { name: "Geriatric Balance & Fall Prevention", href: "/services/geriatric-physiotherapy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-teal-300 transition-colors flex items-center gap-1 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500/70" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location, Hours & Booking (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Clinic Hours &amp; Access
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  {currentSettings.address}, {currentSettings.area},{" "}
                  {currentSettings.city} - {currentSettings.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a
                  href={`tel:${currentSettings.phone.replace(/\s+/g, "")}`}
                  className="text-white hover:text-teal-300 font-bold"
                >
                  {currentSettings.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <p className="text-white font-semibold">Mon – Sat:</p>
                  <p className="text-slate-400">10:00 am – 1:00 pm, 5:00 pm – 9:00 pm</p>
                  <p className="text-white font-semibold mt-1">Sunday:</p>
                  <p className="text-slate-400">11:00 am – 1:00 pm</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/appointment"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E85D45] text-white font-bold text-xs hover:bg-[#D44E36] shadow-sm transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book In-Clinic Appointment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal Disclaimer */}
        <div className="mt-14 pt-6 border-t border-[#0A363D] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} GG Physiotherapy Clinic. All rights reserved.
          </p>

          <div className="flex items-center flex-wrap gap-4 text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-teal-300 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

        <div className="mt-4 text-[11px] text-slate-500 leading-relaxed text-center md:text-left">
          <strong>Clinical Disclaimer:</strong> Information on this website is for educational and appointment coordination purposes only. It is not a substitute for formal diagnosis or physical evaluation by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP).
        </div>
      </div>
    </footer>
  );
}
