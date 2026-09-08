import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Phone,
  Activity,
  Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { getServiceBySlug, getServices } from "@/lib/firestore";
import { defaultSettings } from "@/lib/defaultData";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.seoTitle || service.title} | GG Physiotherapy Clinic`,
    description: service.seoDescription || service.shortDescription,
    openGraph: {
      title: `${service.title} | GG Physiotherapy Clinic`,
      description: service.shortDescription,
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices(true);
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices(true);
  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Hero Header */}
      <section className="bg-[#072025] text-white py-14 lg:py-20 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
            className="mb-3 text-slate-300"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Clinical Treatment Protocol</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {service.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-teal-200">
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>{service.durationInfo ? service.durationInfo.split(".")[0] : "45–60 mins per session"}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-3.5 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                <span>Evidence-Based Practice</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Clinical Details */}
            <div className="lg:col-span-8 space-y-10">
              {/* Hero Image */}
              <div className="relative h-[360px] sm:h-[440px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-100">
                <Image
                  src={service.heroImage || "/images/hero-cinematic.jpg"}
                  alt={service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>

              {/* Detailed Description */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Overview &amp; Clinical Scope
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                  {service.longDescription}
                </p>
              </div>

              {/* Treatment Approach */}
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest block">
                  Methodology
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Our Treatment Approach
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {service.treatmentApproach}
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest block">
                    Proven Results
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    Clinical Outcomes &amp; Patient Benefits
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl border border-slate-100 bg-[#FBF9F5]"
                    >
                      <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Who Is This Treatment Suitable For?
                </h3>
                <ul className="space-y-2.5">
                  {service.suitableFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700 font-normal"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Frequently Asked Questions About This Treatment
                  </h3>
                  <div className="space-y-3">
                    {service.faqs.map((faq, i) => (
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

            {/* Sidebar with Booking Card */}
            <div className="lg:col-span-4 space-y-6">
              {/* Sticky Booking CTA Card */}
              <div className="sticky top-28 bg-white p-7 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-800 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    Consultation Slot
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-3 leading-snug">
                    Book for {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Direct physical evaluation with Dr. Sundaravalli Jayakumar (M.P.T Ortho) at our Perungudi clinic.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span>Care Format:</span>
                    <strong className="text-slate-900">1-on-1 In-Clinic Consultation</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <strong className="text-slate-900">{service.durationInfo ? service.durationInfo.split(".")[0] : "45–60 mins"}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <strong className="text-slate-900">Perungudi, Chennai</strong>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <Link
                    href={`/appointment?service=${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E85D45] text-white font-extrabold text-xs sm:text-sm hover:bg-[#D44E36] shadow-sm transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment for This</span>
                  </Link>

                  <a
                    href={`tel:${defaultSettings.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Call 090940 26006</span>
                  </a>
                </div>
              </div>

              {/* Related Services */}
              {related.length > 0 && (
                <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Other Specializations
                  </h4>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/services/${r.slug}`}
                        className="block p-3 rounded-2xl bg-[#FBF9F5] border border-slate-100 hover:border-teal-300 hover:bg-white transition-all group"
                      >
                        <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#0A363D] transition-colors">
                          {r.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {r.shortDescription}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
