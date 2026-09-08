"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  Star,
} from "lucide-react";
import { getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/firestore";
import { TestimonialItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";

const EMPTY_FORM: Partial<TestimonialItem> = {
  patientName: "",
  review: "",
  rating: 5,
  treatment: "",
  location: "",
  featured: false,
  published: true,
  displayOrder: 1,
  source: "google",
};

export default function AdminTestimonialsPage() {
  const { success, error: toastError } = useToast();
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<TestimonialItem>>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const data = await getTestimonials();
    setItems(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingItem(null);
    setForm({ ...EMPTY_FORM, displayOrder: items.length + 1 });
    setModalOpen(true);
  }

  function openEdit(item: TestimonialItem) {
    setEditingItem(item);
    setForm({ ...item });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.patientName?.trim() || !form.review?.trim()) {
      toastError("Patient name and review are required");
      return;
    }
    setSaving(true);
    try {
      const data: TestimonialItem = {
        id: editingItem?.id || `testimonial-${Date.now()}`,
        patientName: form.patientName || "",
        review: form.review || "",
        rating: form.rating || 5,
        treatment: form.treatment || "",
        patientImage: form.patientImage,
        location: form.location,
        featured: form.featured ?? false,
        published: form.published ?? true,
        displayOrder: form.displayOrder ?? items.length + 1,
        source: form.source || "google",
        createdAt: editingItem?.createdAt || new Date().toISOString(),
      };
      await saveTestimonial(data);
      success(editingItem ? "Testimonial updated!" : "Testimonial added!");
      setModalOpen(false);
      loadData();
    } catch {
      toastError("Failed to save testimonial.");
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteTestimonial(deleteTarget.id);
      success("Testimonial deleted.");
      setDeleteTarget(null);
      loadData();
    } catch { toastError("Failed to delete."); }
  }

  const filtered = items.filter((t) =>
    t.patientName.toLowerCase().includes(search.toLowerCase()) ||
    t.review.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-6 h-6 text-teal-600" />
            Testimonials & Reviews
          </h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} review{items.length !== 1 ? "s" : ""} total. {items.filter(t => t.featured).length} featured.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0e3b43] hover:bg-[#0a2d33] text-white rounded-lg font-semibold text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search reviews..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-teal-600 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No testimonials yet.</p>
          <button onClick={openCreate} className="mt-3 text-teal-600 font-semibold text-sm hover:underline">+ Add your first review</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 text-left">Patient</th>
                  <th className="px-5 py-3 text-left hidden md:table-cell">Review</th>
                  <th className="px-5 py-3 text-center">Rating</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center hidden sm:table-cell">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{item.patientName}</p>
                      <p className="text-xs text-slate-400">{item.treatment}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-xs text-slate-500 truncate max-w-[250px]">{item.review}</p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center hidden sm:table-cell">
                      {item.featured && <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">★ Featured</span>}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteTarget(item)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Edit Testimonial" : "Add Testimonial"} size="lg">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Name *</label>
              <input type="text" value={form.patientName || ""} onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Treatment Received</label>
              <input type="text" value={form.treatment || ""} onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Back Pain Recovery" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Review *</label>
            <textarea value={form.review || ""} onChange={(e) => setForm({ ...form, review: e.target.value })}
              rows={4} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Patient's review text..." />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
              <select value={form.rating || 5} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Source</label>
              <select value={form.source || "google"} onChange={(e) => setForm({ ...form, source: e.target.value as "google" | "direct" })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="google">Google</option>
                <option value="direct">Direct</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Order</label>
              <input type="number" value={form.displayOrder || 1} onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input type="text" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Chennai" />
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published ?? true} onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span className="text-sm font-medium text-slate-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured ?? false} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
              <span className="text-sm font-medium text-slate-700">Featured</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
          <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2 bg-[#0e3b43] hover:bg-[#0a2d33] text-white rounded-lg font-semibold text-sm disabled:opacity-50 inline-flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingItem ? "Update" : "Add Review"}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Testimonial">
        <p className="text-sm text-slate-600">Delete the review by <strong>{deleteTarget?.patientName}</strong>? This cannot be undone.</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
