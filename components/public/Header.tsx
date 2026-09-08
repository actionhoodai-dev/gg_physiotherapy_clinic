"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Calendar,
  ArrowRight,
  Clock,
  Phone,
  MessageSquare,
} from "lucide-react";
import { defaultSettings } from "@/lib/defaultData";
import { generateWhatsAppLink } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Conditions", href: "/conditions" },
  { name: "Reviews", href: "/testimonials" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(10,54,61,0.08)] py-3"
          : "bg-white border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0A363D] flex items-center justify-center text-white font-bold text-lg tracking-tight shadow-sm group-hover:bg-[#13545E] transition-all duration-300">
              <span className="text-teal-300">G</span>G
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-[#0A363D] transition-colors">
              GG Physiotherapy Clinic
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs font-semibold tracking-wide">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#0A363D] text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-[#0A363D] hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Conversion Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#E85D45] text-white hover:bg-[#D44E36] shadow-sm hover:shadow transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-white/90" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/appointment"
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E85D45] text-white"
            >
              Book Slot
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0A363D]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-slate-950/60 z-50 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-white border-b border-slate-200 shadow-2xl px-5 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto">

            {/* Links List */}
            <div className="border-t border-slate-100 pt-3 flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[#0A363D] text-white"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? "text-teal-300" : "text-slate-400"}`} />
                  </Link>
                );
              })}
            </div>

            {/* Timings & Direct CTA */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                <Clock className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Clinic Hours</span>
                  <span>10am–1pm & 5–9pm (Mon–Sat) • 11am–1pm (Sun)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${defaultSettings.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0A363D]" />
                  <span>Call Clinic</span>
                </a>
                <a
                  href={generateWhatsAppLink(
                    defaultSettings.whatsapp,
                    "Hello GG Physiotherapy Clinic, I would like to make an enquiry."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <Link
                href="/appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm shadow-md active:scale-[0.99] transition-all"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book In-Clinic Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
