"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, UserCheck, Stethoscope, Activity, Camera } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function HomePortalsSection() {
  const portals = [
    {
      title: "About Our Clinic & Doctor",
      subtitle: "Dr. Sundaravalli Jayakumar • 20+ Yrs Exp",
      description:
        "Meet our Chief Consultant Physiotherapist | FOMT (AUS), MSC Osteopathy & Dry Needle Therapist (B.P.T, M.P.T Ortho, DNT, MIAP). Discover our evidence-driven philosophy.",
      href: "/about",
      cta: "Read Doctor & Clinic Profile",
      icon: UserCheck,
      image: "/images/doctor-portrait.jpg",
      badge: "Clinical Leadership",
      accent: "from-slate-950/90 via-[#0A363D]/60 to-slate-900/20",
    },
    {
      title: "Clinical Services & Treatments",
      subtitle: "Orthopedic, Spine & Neuro Care",
      description:
        "Explore our targeted rehabilitation modalities including spinal decompression, joint mobilization, electrotherapy, and exercise therapy.",
      href: "/services",
      cta: "Explore All Treatments",
      icon: Stethoscope,
      image: "/images/hero-cinematic.jpg",
      badge: "Targeted Rehabilitation",
      accent: "from-slate-950/90 via-emerald-950/60 to-slate-900/20",
    },
    {
      title: "Conditions We Treat",
      subtitle: "Back, Neck, Knee & Post-Op",
      description:
        "Specialized therapeutic solutions for sciatica, lumbar disc herniation, cervical spondylosis, knee osteoarthritis, and sports injuries.",
      href: "/conditions",
      cta: "View Conditions Directory",
      icon: Activity,
      image: "/images/doctor-consultation.jpg",
      badge: "Pathology Care",
      accent: "from-slate-950/90 via-teal-950/60 to-slate-900/20",
    },
    {
      title: "Clinic Facility & Equipment Tour",
      subtitle: "Modern Infrastructure in Perungudi",
      description:
        "Take a visual walkthrough of our private treatment cubicles, computerized traction units, modalities, and rehabilitation gym.",
      href: "/gallery",
      cta: "Tour Clinic Gallery",
      icon: Camera,
      image: "/images/clinic-gym.jpg",
      badge: "Facility Showcase",
      accent: "from-slate-950/90 via-slate-900/60 to-slate-900/20",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="up">
            <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-100/80 px-3.5 py-1.5 rounded-full border border-teal-200 inline-block">
              Explore Our Healthcare Practice
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
              Comprehensive Care Across Every Dimension
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Browse each dedicated area of our clinic — from our clinical leadership credentials and specialized treatments to our state-of-the-art facility.
            </p>
          </Reveal>
        </div>

        {/* 4 Multi-Page Gateway Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <Reveal key={portal.title} direction="up" delay={index * 100}>
                <Link
                  href={portal.href}
                  className="group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-7 sm:p-9 border border-slate-200 hover:border-teal-500/50 block"
                >
                  {/* Background Image */}
                  <Image
                    src={portal.image}
                    alt={portal.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${portal.accent} opacity-85 group-hover:opacity-75 transition-opacity duration-300`}
                  />

                  {/* Card Content */}
                  <div className="relative z-10 space-y-3.5 text-white">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/20 text-teal-200">
                        <Icon className="w-3.5 h-3.5 text-teal-300" />
                        <span>{portal.badge}</span>
                      </span>
                      <span className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#E85D45] backdrop-blur-md flex items-center justify-center transition-colors shadow-sm">
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-teal-300 font-semibold block">
                        {portal.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5 group-hover:text-teal-100 transition-colors">
                        {portal.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200/90 line-clamp-2 leading-relaxed font-normal">
                      {portal.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-teal-300 group-hover:text-white transition-colors">
                      <span>{portal.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
