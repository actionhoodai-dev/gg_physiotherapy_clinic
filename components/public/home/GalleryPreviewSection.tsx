"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera } from "lucide-react";
import { GalleryItem } from "@/types";
import { defaultGallery } from "@/lib/defaultData";
import { Reveal } from "@/components/ui/Reveal";

export function GalleryPreviewSection({
  gallery = defaultGallery,
}: {
  gallery?: GalleryItem[];
}) {
  const items = gallery.length > 0 ? gallery : defaultGallery;
  const mainImage = items[0]?.imageUrl || "/images/clinic-facility.jpg";
  const supporting = items.slice(1, 4);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Reveal direction="up">
              <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-teal-600" />
                <span>Modern Clinic Environment</span>
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
                Hygienic, Advanced Rehabilitation Space
              </h2>
            </Reveal>
            <Reveal direction="up" delay={150}>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-2xl leading-relaxed">
                Step inside our peaceful clinic in Perungudi, Chennai. Private therapy zones, sanitized treatment beds, digital spine traction, and medical-grade therapeutic modalities.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={200}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FBF9F5] border border-slate-200 text-xs sm:text-sm font-bold text-[#0A363D] hover:bg-[#0A363D] hover:text-white transition-all shadow-xs group"
            >
              <span>Explore All Clinic Photographs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Editorial Asymmetric Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Large Hero Facility Image (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <div className="relative h-[340px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-md border border-slate-200/80 group">
                <Image
                  src={mainImage}
                  alt="Modern Rehabilitation Clinic Interior at GG Physiotherapy Perungudi Chennai"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">
                    Dedicated Rehabilitation Studio
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Clean, Ergonomic &amp; Fully Equipped Treatment Area
                  </h3>
                  <p className="text-xs text-slate-200/90 max-w-lg">
                    Engineered for patient dignity, privacy, comfort, and progressive neuromuscular recovery.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Supporting Grid Column (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {supporting.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 120} direction="left">
                <div className="relative h-48 lg:h-[138px] w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 group">
                  <Image
                    src={item.imageUrl}
                    alt={item.altText || item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h4 className="text-xs font-bold leading-tight">
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p className="text-[10px] text-slate-300 line-clamp-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
