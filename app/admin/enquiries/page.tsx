"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  ExternalLink,
} from "lucide-react";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/firestore";
import { EnquiryItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/utils";

export default function AdminEnquiriesPage() {
  const { success, error: toastError } = useToast();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EnquiryItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      toastError("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, newStatus: EnquiryItem["status"]) {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      success(`Status updated to ${newStatus}`);
    } catch (err) {
      toastError("Failed to update status");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteEnquiry(deleteTarget.id);
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      if (selectedEnquiry && selectedEnquiry.id === deleteTarget.id) {
        setSelectedEnquiry(null);
      }
      success("Enquiry deleted");
      setDeleteTarget(null);
    } catch (err) {
      toastError("Failed to delete enquiry");
    }
  }

  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.subject && item.subject.toLowerCase().includes(search.toLowerCase())) ||
      (item.message && item.message.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: EnquiryItem["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Clock className="w-3 h-3" /> New
          </span>
        );
      case "read":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Read
          </span>
        );
      case "replied":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle className="w-3 h-3" /> Replied
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <Archive className="w-3 h-3" /> Archived
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
            <Inbox className="w-6 h-6 text-teal-600" />
            Enquiries & Contact Messages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Incoming patient queries from the contact and consultation forms.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-xs self-start"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Messages
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Queries</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{enquiries.length}</div>
        </div>
        <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 shadow-xs">
          <div className="text-xs font-semibold text-rose-800 uppercase tracking-wider">New / Unread</div>
          <div className="text-2xl font-bold text-rose-900 mt-1">
            {enquiries.filter((e) => e.status === "new").length}
          </div>
        </div>
        <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 shadow-xs">
          <div className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Replied</div>
          <div className="text-2xl font-bold text-teal-900 mt-1">
            {enquiries.filter((e) => e.status === "replied").length}
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Archived</div>
          <div className="text-2xl font-bold text-slate-700 mt-1">
            {enquiries.filter((e) => e.status === "archived").length}
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
            placeholder="Search by name, phone, email, subject, or message content..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter enquiries by status"
          className="text-xs font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Enquiries</option>
          <option value="new">New / Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
            Loading enquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold">No messages found</p>
            <p className="text-xs text-slate-400 mt-1">
              {search || statusFilter !== "all"
                ? "Try adjusting your search query or filter"
                : "Messages sent from the Contact page will appear here"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3.5">Sender</th>
                  <th className="px-4 py-3.5">Subject & Message Preview</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const cleanPhone = item.phone.replace(/[^0-9]/g, "").slice(-10);
                  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${item.name}, thank you for contacting GG Physiotherapy Clinic regarding: ${item.subject}. How can we assist you with your rehabilitation?`
                  )}`;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        item.status === "new" ? "bg-amber-50/20 font-medium" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-teal-600" />
                          <a href={`tel:${item.phone}`} className="hover:text-teal-600">
                            {item.phone}
                          </a>
                        </div>
                        {item.email && (
                          <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[160px]">
                            {item.email}
                          </div>
                        )}
                      </td>

                      <td
                        className="px-4 py-3.5 cursor-pointer max-w-xs md:max-w-md"
                        onClick={() => {
                          setSelectedEnquiry(item);
                          if (item.status === "new") {
                            handleStatusChange(item.id, "read");
                          }
                        }}
                      >
                        <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                          {item.subject}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                          {item.message}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        {getStatusBadge(item.status)}
                      </td>

                      <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Reply on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          <a
                            href={`tel:${item.phone}`}
                            className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition"
                            title="Call Sender"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => {
                              setSelectedEnquiry(item);
                              if (item.status === "new") {
                                handleStatusChange(item.id, "read");
                              }
                            }}
                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition text-xs font-medium"
                            title="Read Message"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(item)}
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

      {/* Reader Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.subject}`}
        >
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">{selectedEnquiry.name}</span>
                {getStatusBadge(selectedEnquiry.status)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Phone:</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-teal-600 font-semibold">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="text-slate-700">{selectedEnquiry.email || "—"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date Received:</span>
                  <span className="text-slate-700">{formatDate(selectedEnquiry.createdAt)}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Full Message:
              </span>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Quick Status Toggles */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">Mark as:</span>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedEnquiry.id, "read")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedEnquiry.status === "read"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Read
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedEnquiry.id, "replied")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedEnquiry.status === "replied"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Replied
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedEnquiry.id, "archived")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedEnquiry.status === "archived"
                      ? "bg-slate-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Archived
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Enquiry"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to permanently delete this message from{" "}
              <strong>{deleteTarget.name}</strong>?
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
