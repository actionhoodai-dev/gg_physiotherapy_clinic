"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { ClinicSettings } from "@/types";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Conditions", href: "/conditions" },
  { name: "Reviews", href: "/testimonials" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header({ settings = defaultSettings }: { settings?: ClinicSettings }) {
  const currentSettings = { ...defaultSettings, ...settings };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollYOnOpen = useRef(0);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close menu on scroll (if user scrolls more than 80px from where they opened it)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    scrollYOnOpen.current = window.scrollY;

    const handleScrollClose = () => {
      const delta = Math.abs(window.scrollY - scrollYOnOpen.current);
      if (delta > 80) {
        closeMenu();
      }
    };
    window.addEventListener("scroll", handleScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [mobileMenuOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0A363D]"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop — tap to close */}
        <div
          className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Floating Menu Panel */}
        <div
          ref={menuRef}
          className={`absolute top-3 left-3 right-3 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-6 opacity-0 scale-95"
          }`}
          style={{ maxHeight: "85vh" }}
        >
          {/* Menu Header with close button */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0A363D] flex items-center justify-center text-white font-bold text-sm">
                <span className="text-teal-300">G</span>G
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                GG Physio
              </span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A363D]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto px-5 pt-3 pb-5 space-y-4" style={{ maxHeight: "calc(85vh - 64px)" }}>
            {/* Nav Links */}
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
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

            {/* Timings & Actions */}
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
                  href={`tel:${currentSettings.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0A363D]" />
                  <span>Call Clinic</span>
                </a>
                <a
                  href={generateWhatsAppLink(
                    currentSettings.whatsapp,
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
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E85D45] text-white font-bold text-sm shadow-md active:scale-[0.99] transition-all"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book In-Clinic / Home Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
