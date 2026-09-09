import React from "react";
import { Metadata } from "next";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { getClinicSettings } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Contact & Clinic Location | GG Physiotherapy Clinic Perungudi Chennai",
  description:
    "Get in touch with GG Physiotherapy Clinic in Perungudi, Chennai. Address, consultation hours, direct phone 90940 26006, Google Map directions, and enquiry form.",
};

export default async function ContactPage() {
  const settings = await getClinicSettings();
  const currentSettings = { ...defaultSettings, ...settings };
  const whatsappUrl = generateWhatsAppLink(
    currentSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I would like to make an enquiry."
  );

  return (
    <div className="bg-[#FBF9F5]">
      {/* Editorial Page Header */}
      <section className="bg-[#072025] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#0A363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold uppercase tracking-wider border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Direct Clinic Access</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Contact &amp; Visit Us in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-200 block sm:inline">
              Perungudi, Chennai.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Easily accessible from OMR, Velachery, Thoraipakkam, and Kandanchavadi with reserved ground-floor parking and personalized patient assistance.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs items={[{ label: "Contact & Clinic Location" }]} />
      </div>

      {/* Main Grid */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info & Hours */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest block">
                    Location &amp; Desk
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Clinic Details
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FBF9F5] border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#0A363D] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold uppercase tracking-wider text-xs">
                        Address:
                      </strong>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        {currentSettings.address}, {currentSettings.area},{" "}
                        {currentSettings.city} - {currentSettings.pincode}
                      </p>
                      <p className="text-[11px] text-teal-700 mt-1 font-semibold">
                        Landmark: Near Thirumalai Nagar Annexe, Perungudi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FBF9F5] border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-teal-200">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold uppercase tracking-wider text-xs">
                        Direct Phone:
                      </strong>
                      <a
                        href={`tel:${currentSettings.phone.replace(/\s+/g, "")}`}
                        className="text-[#0A363D] font-extrabold hover:underline text-sm mt-0.5 block"
                      >
                        {currentSettings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FBF9F5] border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold uppercase tracking-wider text-xs">
                        WhatsApp Consultation Desk:
                      </strong>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline text-xs mt-0.5 block"
                      >
                        Chat on WhatsApp ({currentSettings.whatsapp})
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FBF9F5] border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 font-bold uppercase tracking-wider text-xs">
                        Working Hours:
                      </strong>
                      <p className="text-slate-600 mt-1">
                        <strong>Mon – Sat:</strong> {currentSettings.workingHours?.monSat || "10:00 am – 1:00 pm & 5:00 pm – 9:00 pm"}
                      </p>
                      <p className="text-slate-600">
                        <strong>Sunday:</strong> {currentSettings.workingHours?.sunday || "11:00 am – 1:00 pm (Appointments only)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={defaultSettings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0A363D] text-white font-bold text-xs sm:text-sm hover:bg-[#13545E] transition-all shadow-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps for Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-widest block">
                  Enquiry &amp; Support
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Send a Direct Message to Clinic
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Have questions about our rehabilitation protocols, clinic consultation timings, or treatment pricing? Submit your details below and our team will get back to you promptly.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

          {/* Interactive Map Embed Container */}
          <div className="mt-14 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md min-h-[420px] bg-slate-100">
            <iframe
              title="GG Physiotherapy Clinic Location Map"
              src={
                defaultSettings.googleMapsEmbedUrl ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1857795440815!2d80.23988167373162!3d12.95996101513605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d66f80c2b93%3A0x17341abd35988268!2sGG%20Physiotherapy%20Clinic(Dr.Sundaravalli%20jayakumar%20B.P.T%2CM.P.T(ORTHO)%2CDNT%2CMIAP!5e0!3m2!1sen!2sin!4v1788861434395!5m2!1sen!2sin"
              }
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-[450px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
