"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Inbox,
  Briefcase,
  Star,
  UserCheck,
  BookOpen,
  ArrowUpRight,
  Database,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Loader2,
  HardDrive,
} from "lucide-react";
import {
  getAppointments,
  getEnquiries,
  getServices,
  getTestimonials,
  getTherapists,
  getBlogPosts,
  seedFirestoreDatabase,
  updateAppointmentStatus,
} from "@/lib/firestore";
import { AppointmentItem, EnquiryItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";

export default function AdminOverviewPage() {
  const { success, error: toastError } = useToast();

  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [counts, setCounts] = useState({
    services: 0,
    testimonials: 0,
    therapists: 0,
    blogs: 0,
  });
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [apts, enqs, srv, test, thp, blg] = await Promise.all([
        getAppointments(),
        getEnquiries(),
        getServices(),
        getTestimonials(),
        getTherapists(),
        getBlogPosts(),
      ]);

      setAppointments(apts);
      setEnquiries(enqs);
      setCounts({
        services: srv.length,
        testimonials: test.length,
        therapists: thp.length,
        blogs: blg.length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: AppointmentItem["status"]
  ) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      success(`Appointment status updated to ${newStatus}`);
    } catch (err) {
      toastError("Failed to update status");
    }
  };

  const handleSeedDatabase = async () => {
    if (
      !confirm(
        "This will initialize/sync all official GG Physiotherapy clinic data (services, doctor profile, testimonials, FAQs, and settings) to Firestore. Proceed?"
      )
    ) {
      return;
    }

    setSeeding(true);
    const res = await seedFirestoreDatabase();
    setSeeding(false);

    if (res.success) {
      success(res.message);
      fetchData();
    } else {
      toastError(res.message);
    }
  };

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Seed Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Clinic Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time appointment requests, patient enquiries, and content controls for GG Physiotherapy Clinic.
          </p>
        </div>

        <button
          onClick={handleSeedDatabase}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer disabled:opacity-50"
        >
          {seeding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Syncing Database...</span>
            </>
          ) : (
            <>
              <Database className="w-4 h-4" />
              <span>Sync / Seed Firestore DB</span>
            </>
          )}
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Appointments */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Appointments
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {pendingCount}
            </div>
            <span className="text-[11px] text-amber-700 font-medium">
              Requires confirmation
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Confirmed Appointments */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Confirmed Slots
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {confirmedCount}
            </div>
            <span className="text-[11px] text-teal-700 font-medium">
              Scheduled patients
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        {/* New Enquiries */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              New Enquiries
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {newEnquiriesCount}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Total {enquiries.length} received
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        {/* Published Services */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Services
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              {counts.services}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {counts.testimonials} Google Reviews
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#e6f4f1] text-[#0e3b43] flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Appointments Management Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Appointment Requests
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review patient submissions and update scheduling status directly.
            </p>
          </div>

          <Link
            href="/admin/appointments"
            className="text-xs font-semibold text-[#0e3b43] hover:text-teal-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Loading appointment records...
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800">
              No Appointments Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              When patients book consultations on the website, they will appear here with instant notification.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Patient</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Treatment</th>
                  <th className="py-3.5 px-4">Date &amp; 1-Hr Slot</th>
                  <th className="py-3.5 px-4">Mode</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {apt.fullName}
                      {apt.message && (
                        <span className="block text-[11px] font-normal text-slate-500 truncate max-w-xs mt-0.5">
                          &ldquo;{apt.message}&rdquo;
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-700">
                      <a href={`tel:${apt.phone}`} className="hover:underline">
                        {apt.phone}
                      </a>
                    </td>
                    <td className="py-4 px-4 text-slate-800 font-medium">
                      {apt.preferredService}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      <span className="font-semibold block text-slate-900">{formatDate(apt.preferredDate)}</span>
                      <span className="text-[11px] text-teal-700 font-medium">{apt.preferredTime}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        In-Clinic
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          apt.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : apt.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : apt.status === "cancelled"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5">
                      {apt.status === "pending" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "confirmed")}
                          className="px-2.5 py-1 rounded bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700"
                        >
                          Confirm
                        </button>
                      )}
                      {apt.status === "confirmed" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "completed")}
                          className="px-2.5 py-1 rounded bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700"
                        >
                          Complete
                        </button>
                      )}
                      {apt.status !== "cancelled" && apt.status !== "completed" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "cancelled")}
                          className="px-2 py-1 rounded border border-slate-300 text-slate-600 hover:text-rose-600 text-[11px]"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick CMS Modules Access */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Quick Management Portals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Appointments Desk",
              desc: "Manage patient consultation bookings, dates and status",
              href: "/admin/appointments",
              icon: CalendarCheck,
            },
            {
              title: "Patient Enquiries",
              desc: "View messages received from website contact form",
              href: "/admin/enquiries",
              icon: Inbox,
            },
            {
              title: "Services Catalog",
              desc: "Add, edit, or update clinical treatments and images",
              href: "/admin/services",
              icon: Briefcase,
            },
            {
              title: "Google Reviews",
              desc: "Manage patient testimonials and Google review highlights",
              href: "/admin/testimonials",
              icon: Star,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all group block"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-[#e6f4f1] text-slate-700 group-hover:text-[#0e3b43] flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#0e3b43]">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {card.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
