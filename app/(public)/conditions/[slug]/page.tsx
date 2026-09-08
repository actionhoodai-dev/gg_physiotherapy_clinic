import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Phone,
  Activity,
} from "lucide-react";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { getConditionBySlug, getConditions } from "@/lib/firestore";
import { defaultSettings } from "@/lib/defaultData";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = await getConditionBySlug(slug);
  if (!condition) return { title: "Condition Not Found" };

  return {
    title: `${condition.seoTitle || condition.title} Treatment | GG Physiotherapy Clinic`,
    description: condition.seoDescription || condition.shortDescription,
    openGraph: {
      title: `${condition.title} Treatment | GG Physiotherapy Clinic`,
      description: condition.shortDescription,
      images: condition.image ? [{ url: condition.image }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const conditions = await getConditions(true);
  return conditions.map((c) => ({ slug: c.slug }));
}

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = await getConditionBySlug(slug);

  if (!condition) {
    notFound();
  }

  const allConditions = await getConditions(true);
  const otherConditions = allConditions.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Hero Header */}
      <section className="bg-[#072025] text-white py-14 lg:py-20 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Breadcrumbs
            items={[
              { label: "Conditions", href: "/conditions" },
              { label: condition.title },
            ]}
            className="mb-3 text-slate-300"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Targeted Condition Protocol</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {condition.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {condition.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Information */}
            <div className="lg:col-span-8 space-y-10">
              {/* Image */}
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src={condition.image}
                  alt={condition.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>

              {/* Detailed Pathological Content */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Understanding This Condition
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                  {condition.detailedContent}
                </p>
              </div>

              {/* Symptoms */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Hallmark Symptoms &amp; Warning Signs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {condition.symptoms.map((s) => (
                    <div
                      key={s}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-slate-100 bg-[#FBF9F5]"
                    >
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Approach */}
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-700" />
                  <h3 className="text-xl font-extrabold text-[#0A363D]">
                    How GG Physiotherapy Alleviates This
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {condition.treatmentApproach}
                </p>
              </div>

              {/* When to seek help */}
              <div className="p-7 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>When to Seek Immediate Clinical Attention:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  {condition.whenToSeekHelp}
                </p>
              </div>

              {/* FAQs */}
              {condition.faqs && condition.faqs.length > 0 && (
                <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {condition.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-2xl bg-[#FBF9F5] border border-slate-200/70 space-y-2"
                      >
                        <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Booking Card */}
              <div className="sticky top-28 bg-white p-7 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    Personalized Therapy
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-3 leading-snug">
                    Suffering from {condition.title}?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Schedule a clinical diagnosis with Dr. Sundaravalli Jayakumar (M.P.T Ortho) in Perungudi, Chennai.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <Link
                    href={`/appointment?condition=${encodeURIComponent(condition.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E85D45] text-white font-extrabold text-xs sm:text-sm hover:bg-[#D44E36] shadow-sm transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Diagnosis Appointment</span>
                  </Link>

                  <a
                    href={`tel:${defaultSettings.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Call {defaultSettings.phone}</span>
                  </a>
                </div>
              </div>

              {/* Other Conditions */}
              <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Other Conditions Treated
                </h4>
                <div className="space-y-2.5">
                  {otherConditions.map((other) => (
                    <Link
                      key={other.id}
                      href={`/conditions/${other.slug}`}
                      className="block p-3.5 rounded-2xl bg-[#FBF9F5] border border-slate-100 hover:border-teal-400 hover:bg-white transition-all group"
                    >
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors">
                        {other.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
