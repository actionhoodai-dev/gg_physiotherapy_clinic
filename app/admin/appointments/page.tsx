"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  CheckCheck,
  XCircle,
  Phone,
  MessageSquare,
  Trash2,
  RefreshCw,
  ExternalLink,
  Edit,
  User,
  MapPin,
  FileText,
} from "lucide-react";
import { getAppointments, updateAppointmentStatus, deleteAppointment } from "@/lib/firestore";
import { AppointmentItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";

export default function AdminAppointmentsPage() {
  const { success, error: toastError } = useToast();
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");

  // Detail / Notes Modal
  const [selectedApt, setSelectedApt] = useState<AppointmentItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [statusDraft, setStatusDraft] = useState<AppointmentItem["status"]>("pending");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AppointmentItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      toastError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }

  function openDetail(apt: AppointmentItem) {
    setSelectedApt(apt);
    setNotes(apt.notes || "");
    setStatusDraft(apt.status);
    setModalOpen(true);
  }

  async function handleUpdate() {
    if (!selectedApt) return;
    setSaving(true);
    try {
      await updateAppointmentStatus(selectedApt.id, statusDraft, notes);
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedApt.id
            ? { ...a, status: statusDraft, notes, updatedAt: new Date().toISOString() }
            : a
        )
      );
      success("Appointment updated successfully");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toastError("Failed to update appointment");
    } finally {
      setSaving(false);
    }
  }

  async function handleQuickStatus(id: string, newStatus: AppointmentItem["status"]) {
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      success(`Marked as ${newStatus}`);
    } catch (err) {
      toastError("Failed to change status");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteAppointment(deleteTarget.id);
      setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      success("Appointment deleted");
      setDeleteTarget(null);
    } catch (err) {
      toastError("Failed to delete appointment");
    }
  }

  const filtered = appointments.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      (item.preferredService && item.preferredService.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesMode = modeFilter === "all" || item.consultationMode === modeFilter;

    return matchesSearch && matchesStatus && matchesMode;
  });

  const getStatusBadge = (status: AppointmentItem["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCheck className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getModeBadge = (mode: AppointmentItem["consultationMode"]) => {
    switch (mode) {
      case "clinic":
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            Clinic Visit
          </span>
        );
      case "home":
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
            Home Care
          </span>
        );
      case "online":
        return (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
            Online Tele-rehab
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-teal-600" />
            Appointments Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review, confirm, and update patient consultations and home visits.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-xs self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Bookings
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{appointments.length}</div>
        </div>
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Pending Confirmation</div>
          <div className="text-2xl font-bold text-amber-900 mt-1">
            {appointments.filter((a) => a.status === "pending").length}
          </div>
        </div>
        <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-200 shadow-xs">
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Confirmed</div>
          <div className="text-2xl font-bold text-teal-900 mt-1">
            {appointments.filter((a) => a.status === "confirmed").length}
          </div>
        </div>
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Completed Rehab</div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">
            {appointments.filter((a) => a.status === "completed").length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, phone number, or service..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter appointments by status"
            className="text-xs font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            aria-label="Filter appointments by consultation mode"
            className="text-xs font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Modes</option>
            <option value="clinic">Clinic Visit</option>
            <option value="home">Home Care</option>
            <option value="online">Online Consultation</option>
          </select>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
            Loading appointments...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold">No appointments found</p>
            <p className="text-xs text-slate-400 mt-1">
              {search || statusFilter !== "all" || modeFilter !== "all"
                ? "Try clearing your filters or search query"
                : "New patient booking requests will automatically appear here"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5">Patient Details</th>
                  <th className="px-4 py-3.5">Service & Mode</th>
                  <th className="px-4 py-3.5">Preferred Slot</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Received</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((apt) => {
                  const cleanPhone = apt.phone.replace(/[^0-9]/g, "").slice(-10);
                  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${apt.fullName}, this is GG Physiotherapy Clinic regarding your appointment request for ${apt.preferredDate} (${apt.preferredTime}).`
                  )}`;

                  return (
                    <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900">{apt.fullName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-teal-600" />
                          <a href={`tel:${apt.phone}`} className="hover:text-teal-600 font-medium">
                            {apt.phone}
                          </a>
                        </div>
                        {apt.email && (
                          <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[180px]">
                            {apt.email}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-800 text-xs line-clamp-1">
                          {apt.preferredService}
                        </div>
                        <div className="mt-1">{getModeBadge(apt.consultationMode)}</div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900 text-xs">
                          {apt.preferredDate}
                        </div>
                        <div className="text-xs text-slate-500">{apt.preferredTime}</div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {getStatusBadge(apt.status)}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-slate-500">
                        {formatDate(apt.createdAt)}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* WhatsApp link */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          {/* Call link */}
                          <a
                            href={`tel:${apt.phone}`}
                            className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition"
                            title="Call Patient"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Edit / Notes */}
                          <button
                            onClick={() => openDetail(apt)}
                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                            title="View / Edit Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteTarget(apt)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Status Modal */}
      {selectedApt && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Appointment Details & Status"
        >
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-sm">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="font-semibold text-slate-900">{selectedApt.fullName}</span>
                {getModeBadge(selectedApt.consultationMode)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Phone:</span>
                  <a href={`tel:${selectedApt.phone}`} className="font-medium text-teal-600">
                    {selectedApt.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="font-medium text-slate-700">{selectedApt.email || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Preferred Date:</span>
                  <span className="font-medium text-slate-700">{selectedApt.preferredDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Preferred Time:</span>
                  <span className="font-medium text-slate-700">{selectedApt.preferredTime}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Service Requested:</span>
                <span className="font-medium text-xs text-slate-800">
                  {selectedApt.preferredService}
                </span>
              </div>
              {selectedApt.message && (
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <span className="text-slate-500 text-xs block">Patient Symptoms / Message:</span>
                  <p className="text-xs text-slate-700 mt-1 whitespace-pre-wrap">
                    {selectedApt.message}
                  </p>
                </div>
              )}
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consultation Status
              </label>
              <select
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value as AppointmentItem["status"])}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              >
                <option value="pending">Pending Review</option>
                <option value="confirmed">Confirmed with Doctor</option>
                <option value="completed">Completed / Attended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Internal Doctor / Admin Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic Notes (Internal Only)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Called patient, confirmed 10:30 AM slot with Dr. Sundaravalli. Referred by Ortho specialist."
                rows={3}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={saving}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Update Appointment"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Appointment Record"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to permanently delete the appointment record for{" "}
              <strong className="text-slate-900">{deleteTarget.fullName}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
