"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Calendar,
  Phone,
  MessageSquare,
  Sparkles,
  Building2,
  Award,
} from "lucide-react";
import { GalleryItem } from "@/types";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";

export function GalleryClient({
  initialItems = [],
  phone = defaultSettings.phone,
  whatsapp = defaultSettings.whatsapp,
}: {
  initialItems?: GalleryItem[];
  phone?: string;
  whatsapp?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "facility", label: "Clinic Facility" },
    { id: "equipment", label: "Modern Equipment" },
    { id: "rehab", label: "Rehabilitation Studio" },
    { id: "consultation", label: "Consultation Bays" },
    { id: "certification", label: "Certifications & Credentials" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory);

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const whatsappRequestUrl = generateWhatsAppLink(
    whatsapp,
    "Hello GG Physiotherapy Clinic, I would like to request photographs and a facility walkthrough of your clinic."
  );

  // If no images have been uploaded yet, render the clean notice card
  if (!initialItems || initialItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-6 sm:px-10 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#0A363D] flex items-center justify-center mx-auto shadow-xs border border-teal-100">
          <Camera className="w-8 h-8 text-[#0A363D]" />
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/70">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Updated Photographs Coming Soon</span>
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Clinic Photographs Being Updated
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Our high-resolution clinic space and specialized rehabilitation equipment photographs are currently being updated. In the meantime, you are warmly invited to request photos directly via WhatsApp or visit our clinic in Thirumalai Nagar Annexe, Perungudi, Chennai for an in-person facility walkthrough.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappRequestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba59] transition-all shadow-sm hover:shadow active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Photos via WhatsApp</span>
          </a>

          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-200 transition-colors border border-slate-200/80"
          >
            <Phone className="w-4 h-4 text-teal-700" />
            <span>Call {phone}</span>
          </a>

          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-xs sm:text-sm hover:bg-[#D44E36] transition-all shadow-sm active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule In-Clinic Visit</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <Building2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Ground floor clinic with dedicated parking • 22, 1st Main Rd, Perungudi</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setActiveLightboxIndex(null);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#0A363D] text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid or Category Empty State */}
      {filteredItems.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-2xl border border-slate-200/80 text-xs text-slate-500">
          No photographs found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white text-[#0A363D] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>

                {/* Credential badge for certifications */}
                {item.category === 'certification' && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Award className="w-3 h-3" />
                    <span>Verified Credential</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={filteredItems[activeLightboxIndex].imageUrl}
                alt={filteredItems[activeLightboxIndex].altText || filteredItems[activeLightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center text-white space-y-1">
              <h4 className="font-extrabold text-base">
                {filteredItems[activeLightboxIndex].title}
              </h4>
              {filteredItems[activeLightboxIndex].caption && (
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              )}
              <span className="text-[11px] text-teal-300 font-bold block pt-1">
                {activeLightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
