"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Inbox,
  Settings,
  Home,
  Briefcase,
  Activity,
  UserCheck,
  Star,
  Image as ImageIcon,
  HelpCircle,
  Search,
  HardDrive,
  User,
  Sliders,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";
import { useAdminAuth } from "./AdminAuthProvider";

const ADMIN_NAV = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
  { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { name: "Business Settings", href: "/admin/settings", icon: Settings },
  { name: "Homepage CMS", href: "/admin/homepage", icon: Home },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Conditions", href: "/admin/conditions", icon: Activity },
  { name: "Therapists", href: "/admin/therapists", icon: UserCheck },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "SEO Settings", href: "/admin/seo", icon: Search },
  { name: "Media Library", href: "/admin/media", icon: HardDrive },
  { name: "Admin Profile", href: "/admin/profile", icon: User },
  { name: "System & Seeds", href: "/admin/system", icon: Sliders },
];

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const navContent = (
    <div className="flex flex-col h-full bg-[#092b31] text-slate-300 border-r border-[#0e3b43]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#0e3b43] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-base">
            GG
          </div>
          <div>
            <span className="font-bold text-sm text-white block leading-tight">
              Clinic CMS
            </span>
            <span className="text-[11px] text-teal-400 block font-medium">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav items list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs font-medium">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-teal-500 text-slate-950 font-bold shadow-xs"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-slate-950" : "text-teal-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Info & Footer Actions */}
      <div className="p-4 border-t border-[#0e3b43] space-y-3 bg-[#072025]">
        <div className="flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <span className="text-[11px] font-bold text-white block truncate">
              {user?.email || "Clinic Administrator"}
            </span>
            <span className="text-[10px] text-teal-300 block">
              Authenticated Admin
            </span>
          </div>
          <button
            onClick={() => logout()}
            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
        >
          <span>View Live Clinic Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
