"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";
import { getFAQs, saveFAQ, deleteFAQ } from "@/lib/firestore";
import { FAQItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";

const CATEGORIES = [
  "Appointments & Visiting",
  "Treatment & Safety",
  "Home Physiotherapy",
  "Billing & Insurance",
];

const EMPTY_FAQ: Partial<FAQItem> = {
  question: "",
  answer: "",
  category: "Treatment & Safety",
  displayOrder: 1,
  published: true,
};

export default function AdminFAQsPage() {
  const { success, error: toastError } = useToast();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<FAQItem>>(EMPTY_FAQ);
  const [deleteTarget, setDeleteTarget] = useState<FAQItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
      toastError("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingItem(null);
    setForm({
      ...EMPTY_FAQ,
      id: `faq-${Date.now()}`,
      displayOrder: faqs.length + 1,
    });
    setModalOpen(true);
  }

  function openEdit(faq: FAQItem) {
    setEditingItem(faq);
    setForm({ ...faq });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question?.trim() || !form.answer?.trim()) {
      toastError("Question and Answer are required");
      return;
    }

    setSaving(true);
    try {
      const faqToSave: FAQItem = {
        id: editingItem?.id || form.id || `faq-${Date.now()}`,
        question: form.question.trim(),
        answer: form.answer.trim(),
        category: form.category?.trim() || "General",
        displayOrder: Number(form.displayOrder) || faqs.length + 1,
        published: form.published ?? true,
      };

      await saveFAQ(faqToSave);

      if (editingItem) {
        setFaqs((prev) => prev.map((f) => (f.id === faqToSave.id ? faqToSave : f)));
        success("FAQ updated successfully");
      } else {
        setFaqs((prev) => [...prev, faqToSave]);
        success("New FAQ added");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toastError("Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteFAQ(deleteTarget.id);
      setFaqs((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      success("FAQ deleted");
      setDeleteTarget(null);
    } catch (err) {
      toastError("Failed to delete FAQ");
    }
  }

  const filtered = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-teal-600" />
            Frequently Asked Questions (FAQs)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage answers to common patient questions regarding appointments, pain relief, and clinic treatment protocols.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Add New FAQ
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter FAQs by category"
          className="text-xs font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
            Loading FAQs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold">No questions found</p>
            <p className="text-xs text-slate-400 mt-1">Add FAQs to help patients understand your treatments</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((faq) => (
              <div
                key={faq.id}
                className="p-5 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {faq.category}
                    </span>
                    <span className="text-[11px] text-slate-400">Order: {faq.displayOrder}</span>
                    {faq.published ? (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5">
                        <CheckCircle className="w-3 h-3" /> Live
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                        <XCircle className="w-3 h-3" /> Hidden
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-end md:self-start">
                  <button
                    onClick={() => openEdit(faq)}
                    className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(faq)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? "Edit FAQ" : "Add New FAQ"}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Question *
              </label>
              <input
                type="text"
                value={form.question || ""}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="e.g. How many physiotherapy sessions will I need?"
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  list="categories-list"
                  value={form.category || ""}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Select or type category"
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                  required
                />
                <datalist id="categories-list">
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.displayOrder || 1}
                  onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Answer *
              </label>
              <textarea
                value={form.answer || ""}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="Provide a clear, comforting, and professional medical answer..."
                rows={5}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5 leading-relaxed"
                required
              />
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={form.published ?? true}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                Show on public FAQ page
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 rounded-lg hover:bg-teal-300 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingItem ? "Update FAQ" : "Add FAQ"}
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete FAQ"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this FAQ: <strong>{deleteTarget.question}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
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
