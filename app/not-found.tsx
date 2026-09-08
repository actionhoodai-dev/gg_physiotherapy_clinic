import React from "react";
import Link from "next/link";
import { Home, Phone, Calendar, ArrowRight } from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FBF9F5] px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-md">
        <div className="w-20 h-20 rounded-2xl bg-[#0A363D] text-teal-300 flex items-center justify-center font-extrabold text-2xl mx-auto shadow-sm">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            The page you are looking for may have been relocated or updated. Let&apos;s guide you back to our clinical services or help you book a consultation.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0A363D] text-white font-bold text-xs hover:bg-[#13545E] transition-all shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/appointment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E85D45] text-white font-bold text-xs hover:bg-[#D44E36] transition-all shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need immediate assistance? Call our clinic at{" "}
          <a
            href={`tel:${defaultSettings.phone}`}
            className="text-[#0A363D] font-extrabold hover:underline"
          >
            {defaultSettings.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
