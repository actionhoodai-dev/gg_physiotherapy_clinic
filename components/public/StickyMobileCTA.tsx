"use client";

import React from "react";
import Link from "next/link";
import { Phone, Calendar, MessageSquare } from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";

export function StickyMobileCTA() {
  const whatsappUrl = generateWhatsAppLink(
    defaultSettings.whatsapp,
    "Hello GG Physiotherapy Clinic, I would like to book an appointment."
  );

  return (
    <aside
      aria-label="Quick Mobile Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(10,54,61,0.08)] px-3 py-2 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${defaultSettings.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-[#0A363D] mb-0.5" />
          <span>Call Clinic</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold min-h-[44px]"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/appointment"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#E85D45] text-white text-xs font-extrabold shadow-sm active:scale-95 transition-transform min-h-[44px]"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span>Book Slot</span>
        </Link>
      </div>
    </aside>
  );
}
