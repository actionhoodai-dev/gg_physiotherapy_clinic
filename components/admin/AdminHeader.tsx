"use client";

import React from "react";
import { Menu, ExternalLink, ShieldCheck, Bell } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "./AdminAuthProvider";

export function AdminHeader({
  setMobileOpen,
}: {
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
          aria-label="Open Sidebar Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900">
            GG Physiotherapy Clinic CMS
          </span>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-900 border border-teal-300">
            Live Cloud Firestore
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
        </Link>
      </div>
    </header>
  );
}
