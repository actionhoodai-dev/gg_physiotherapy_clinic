"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function LocationSection({
  settings = defaultSettings,
}: {
  settings?: typeof defaultSettings;
}) {
  const whatsappUrl = generateWhatsAppLink(
    settings.whatsapp || defaultSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I would like directions or appointment details."
  );

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Clinic Details Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <Reveal direction="up">
                <span className="text-xs font-bold text-teal-800 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinic Location &amp; Access</span>
                </span>
              </Reveal>

              <Reveal direction="up" delay={100}>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Visit Us in Perungudi, Chennai
                </h2>
              </Reveal>

              <Reveal direction="up" delay={150}>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Centrally located in Thirumalai Nagar Annexe, Perungudi — directly accessible from OMR, Velachery, Thoraipakkam, and Kandanchavadi with reserved ground parking.
                </p>
              </Reveal>

              {/* Information Cards */}
              <div className="space-y-3 pt-2">
                <Reveal direction="up" delay={200}>
                  <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0A363D] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Address
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {settings.address}, {settings.area}, {settings.city} - {settings.pincode}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={250}>
                  <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-teal-200">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Consultation Timings
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Mon–Sat:</strong> 10:00 am – 1:00 pm &amp; 5:00 pm – 9:00 pm
                      </p>
                      <p className="text-xs text-slate-600">
                        <strong>Sunday:</strong> 11:00 am – 1:00 pm (Prior booking)
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={300}>
                  <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-slate-200/80 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Direct Desk &amp; Home Visit Enquiry
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <a
                          href={`tel:${settings.phone}`}
                          className="text-xs font-bold text-[#0A363D] hover:underline"
                        >
                          {settings.phone}
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A363D] text-white font-bold text-xs hover:bg-[#13545E] shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>

              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E85D45] text-white font-bold text-xs hover:bg-[#D44E36] shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Slot</span>
              </Link>
            </div>
          </div>

          {/* Interactive Map Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-md relative min-h-[420px] bg-slate-100 flex flex-col">
            <iframe
              title="GG Physiotherapy Clinic Location Map"
              src={
                settings.googleMapsEmbedUrl ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1857795440815!2d80.23988167373162!3d12.95996101513605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d66f80c2b93%3A0x17341abd35988268!2sGG%20Physiotherapy%20Clinic(Dr.Sundaravalli%20jayakumar%20B.P.T%2CM.P.T(ORTHO)%2CDNT%2CMIAP!5e0!3m2!1sen!2sin!4v1788861434395!5m2!1sen!2sin"
              }
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full min-h-[420px] flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
