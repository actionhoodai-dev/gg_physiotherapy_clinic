import React from "react";
import { Phone, Clock, MapPin, Star } from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

export function TopBar({ settings = defaultSettings }: { settings?: ClinicSettings }) {
  const currentSettings = { ...defaultSettings, ...settings };

  return (
    <div className="bg-[#092b31] text-slate-200 text-xs py-2 px-4 border-b border-[#0e3b43]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Location & Hours */}
        <div className="flex items-center flex-wrap gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>{currentSettings.area}, {currentSettings.city} {currentSettings.pincode}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Mon–Sat: {currentSettings.workingHours?.monSat || "10am–1pm, 5–9pm"} | Sun: {currentSettings.workingHours?.sunday || "11am–1pm"}</span>
          </div>
        </div>

        {/* Right: Phone, Rating badge & Instagram */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-amber-300 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>4.9★ (312+ Google Reviews)</span>
          </div>

          {currentSettings.socialLinks?.instagram && (
            <a
              href={currentSettings.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-pink-400 font-medium transition-colors"
              title="Follow GG Physiotherapy Clinic on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden lg:inline">Instagram</span>
            </a>
          )}

          <a
            href={`tel:${currentSettings.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-1.5 text-white hover:text-teal-300 font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>{currentSettings.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
