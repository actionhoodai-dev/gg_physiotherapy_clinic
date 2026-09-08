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
  Activity,
} from "lucide-react";
import { getConditions, saveCondition, deleteCondition } from "@/lib/firestore";
import { ConditionItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { slugify } from "@/lib/utils";

const EMPTY_FORM: Partial<ConditionItem> = {
  title: "",
  slug: "",
  shortDescription: "",
  detailedContent: "",
  symptoms: [],
  treatmentApproach: "",
  whenToSeekHelp: "",
  relatedServices: [],
  image: "",
  seoTitle: "",
  seoDescription: "",
  published: true,
  displayOrder: 1,
};

export default function AdminConditionsPage() {
  const { success, error: toastError } = useToast();
  const [items, setItems] = useState<ConditionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ConditionItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<ConditionItem>>(EMPTY_FORM);

  const [deleteTarget, setDeleteTarget] = useState<ConditionItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getConditions();
    setItems(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingItem(null);
    setForm({ ...EMPTY_FORM, displayOrder: items.length + 1 });
    setModalOpen(true);
  }

  function openEdit(item: ConditionItem) {
    setEditingItem(item);
    setForm({ ...item });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title?.trim()) {
      toastError("Title is required");
      return;
    }
    setSaving(true);
    try {
      const slug = form.slug || slugify(form.title!);
      const now = new Date().toISOString();
      const data: ConditionItem = {
        id: editingItem?.id || `cond-${Date.now()}`,
        title: form.title || "",
        slug,
        shortDescription: form.shortDescription || "",
        detailedContent: form.detailedContent || "",
        symptoms: form.symptoms || [],
        treatmentApproach: form.treatmentApproach || "",
        whenToSeekHelp: form.whenToSeekHelp || "",
        relatedServices: form.relatedServices || [],
        image: form.image || "",
        faqs: form.faqs || [],
        seoTitle: form.seoTitle || form.title || "",
        seoDescription: form.seoDescription || form.shortDescription || "",
        published: form.published ?? true,
        displayOrder: form.displayOrder ?? items.length + 1,
        createdAt: editingItem?.createdAt || now,
        updatedAt: now,
      };
      await saveCondition(data);
      success(editingItem ? "Condition updated!" : "Condition created!");
      setModalOpen(false);
      loadData();
    } catch {
      toastError("Failed to save condition.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteCondition(deleteTarget.id);
      success("Condition deleted.");
      setDeleteTarget(null);
      loadData();
    } catch {
      toastError("Failed to delete condition.");
    }
  }

  const filtered = items.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-600" />
            Conditions Treated
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage conditions and ailments your clinic treats. {items.length} condition{items.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0e3b43] hover:bg-[#0a2d33] text-white rounded-lg font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Condition
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search conditions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No conditions found.</p>
          <button onClick={openCreate} className="mt-3 text-teal-600 font-semibold text-sm hover:underline">
            + Add your first condition
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 text-left">Condition</th>
                  <th className="px-5 py-3 text-left hidden md:table-cell">Symptoms</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Order</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[250px]">{item.shortDescription}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">
                        {item.symptoms?.slice(0, 3).join(", ")}
                        {(item.symptoms?.length ?? 0) > 3 && "..."}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center text-xs font-medium text-slate-600">{item.displayOrder}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(item)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Edit Condition" : "Add Condition"} size="lg">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="e.g. Frozen Shoulder"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
            <input
              type="text"
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
            <textarea
              value={form.shortDescription || ""}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Brief description shown in listings..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Content</label>
            <textarea
              value={form.detailedContent || ""}
              onChange={(e) => setForm({ ...form, detailedContent: e.target.value })}
              rows={5}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Full condition details, causes, recovery..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Symptoms (one per line)</label>
            <textarea
              value={(form.symptoms || []).join("\n")}
              onChange={(e) => setForm({ ...form, symptoms: e.target.value.split("\n").filter(Boolean) })}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Pain in shoulder&#10;Restricted movement..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Treatment Approach</label>
            <textarea
              value={form.treatmentApproach || ""}
              onChange={(e) => setForm({ ...form, treatmentApproach: e.target.value })}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">When to Seek Help</label>
            <textarea
              value={form.whenToSeekHelp || ""}
              onChange={(e) => setForm({ ...form, whenToSeekHelp: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
            <input
              type="text"
              value={form.image || ""}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={form.displayOrder || 1}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published ?? true}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-700">Published</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Title</label>
            <input
              type="text"
              value={form.seoTitle || ""}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Description</label>
            <textarea
              value={form.seoDescription || ""}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
          <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2 bg-[#0e3b43] hover:bg-[#0a2d33] text-white rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 inline-flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingItem ? "Update Condition" : "Create Condition"}
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Condition">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
