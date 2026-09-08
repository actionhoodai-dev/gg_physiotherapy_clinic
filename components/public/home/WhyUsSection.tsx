import React from "react";
import { defaultHomepageCMS } from "@/lib/defaultData";
import { Activity, HeartHandshake, ShieldCheck, Home } from "lucide-react";

export function WhyUsSection({
  whyUs = defaultHomepageCMS.whyChooseUs,
}: {
  whyUs?: typeof defaultHomepageCMS.whyChooseUs;
}) {
  const icons = [Activity, HeartHandshake, ShieldCheck, Home];

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-teal-400 tracking-wider uppercase bg-teal-950/80 px-3 py-1 rounded-md border border-teal-800">
            Why Choose GG Physiotherapy
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mt-3">
            Specialized Clinical Care That Puts Patients First
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Combining rigorous clinical orthopedics with genuine compassionate care to deliver verifiable, sustainable recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 hover:border-teal-500 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-teal-900/60 border border-teal-700 text-teal-300 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
