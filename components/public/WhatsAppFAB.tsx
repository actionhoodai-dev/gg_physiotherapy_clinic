"use client";

import React, { useState, useEffect } from "react";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { ClinicSettings } from "@/types";

export function WhatsAppFAB({ settings = defaultSettings }: { settings?: ClinicSettings }) {
  const currentSettings = { ...defaultSettings, ...settings };
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to defer mount state update
    const rafId = requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(() => {
      requestAnimationFrame(() => setShowTooltip(true));
    }, 3000);
    const hideTimer = setTimeout(() => {
      requestAnimationFrame(() => setShowTooltip(false));
    }, 9000);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted) return null;

  const whatsappUrl = generateWhatsAppLink(
    currentSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I would like to consult with Dr. Sundaravalli Jayakumar."
  );

  return (
    <div
      className="fixed z-50 bottom-6 right-4 sm:bottom-8 sm:right-8 flex items-center group select-none"
      role="complementary"
      aria-label="WhatsApp Quick Contact"
    >
      {/* Tooltip / Prompt Badge */}
      <div
        className={`hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 bg-white text-slate-800 text-xs font-semibold rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-slate-200 transition-all duration-300 origin-right ${
          showTooltip
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="whitespace-nowrap">Chat with Clinic Specialist</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dr. Sundaravalli Jayakumar on WhatsApp"
        title="Chat with GG Physiotherapy Clinic on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white shadow-[0_6px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_28px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

        {/* Official WhatsApp Icon Vector */}
        <svg
          viewBox="0 0 448 512"
          className="w-7 h-7 fill-white drop-shadow-sm relative z-10"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Small Online Badge on the FAB */}
        <span
          className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full z-20"
          title="Online"
        />
      </a>
    </div>
  );
}
