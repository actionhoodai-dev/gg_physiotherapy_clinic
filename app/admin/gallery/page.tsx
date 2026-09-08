"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Eye,
  Filter,
} from "lucide-react";
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from "@/lib/firestore";
import { GalleryItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";

const CATEGORIES: Array<GalleryItem["category"]> = [
  "facility",
  "equipment",
  "rehab",
  "consultation",
];

const EMPTY_FORM: Partial<GalleryItem> = {
  title: "",
  category: "facility",
  imageUrl: "",
  caption: "",
  altText: "",
  displayOrder: 1,
};

export default function AdminGalleryPage() {
  const { success, error: toastError } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<GalleryItem>>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getGalleryItems();
      setItems(data);
    } catch (err) {
      console.error(err);
      toastError("Failed to load gallery photos");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditingItem(null);
    setForm({
      ...EMPTY_FORM,
      id: `gal-${Date.now()}`,
      displayOrder: items.length + 1,
    });
    setModalOpen(true);
  }

  function openEdit(item: GalleryItem) {
    setEditingItem(item);
    setForm({ ...item });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title?.trim() || !form.imageUrl?.trim()) {
      toastError("Title and Image are required");
      return;
    }

    setSaving(true);
    try {
      const itemToSave: GalleryItem = {
        id: editingItem?.id || form.id || `gal-${Date.now()}`,
        title: form.title.trim(),
        category: (form.category as GalleryItem["category"]) || "facility",
        imageUrl: form.imageUrl.trim(),
        caption: form.caption || "",
        altText: form.altText?.trim() || form.title.trim(),
        displayOrder: Number(form.displayOrder) || items.length + 1,
        createdAt: editingItem?.createdAt || new Date().toISOString(),
      };

      await saveGalleryItem(itemToSave);

      if (editingItem) {
        setItems((prev) => prev.map((i) => (i.id === itemToSave.id ? itemToSave : i)));
        success("Gallery image updated");
      } else {
        setItems((prev) => [...prev, itemToSave]);
        success("New gallery image added");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toastError("Failed to save gallery item");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteGalleryItem(deleteTarget.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      success("Image removed from gallery");
      setDeleteTarget(null);
    } catch (err) {
      toastError("Failed to delete image");
    }
  }

  const filtered = items.filter(
    (i) => categoryFilter === "all" || i.category === categoryFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-teal-600" />
            Clinic Facility & Photo Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showcase treatment rooms, electrotherapy equipment, and doctor consultation spaces.
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
            Add New Photo
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {["all", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
              categoryFilter === cat
                ? "bg-[#0c4a60] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-500 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-teal-600 mb-2" />
          Loading gallery photos...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-700 font-semibold">No photos in this category</p>
          <p className="text-xs text-slate-400 mt-1">Upload facility images to display on the website gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col"
            >
              <div className="relative h-48 w-full bg-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.category}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-white/90 text-slate-700">
                  Order: {item.displayOrder}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  {item.caption && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.caption}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">ID: {item.id}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-1.5 text-slate-600 hover:text-teal-600 hover:bg-slate-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? "Edit Gallery Photo" : "Add Gallery Photo"}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Photo Title *
              </label>
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Advanced Ultrasound Therapy Room"
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value as GalleryItem["category"] })
                  }
                  className="w-full text-sm border border-slate-300 rounded-lg p-2.5 capitalize"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="capitalize">
                      {c}
                    </option>
                  ))}
                </select>
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
                Clinic Photo (Cloudinary Upload / URL) *
              </label>
              <CloudinaryUploader
                value={form.imageUrl || ""}
                onChange={(url: string) => setForm({ ...form, imageUrl: url })}
                folder="gg_physio/gallery"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Caption / Description (Optional)
              </label>
              <textarea
                value={form.caption || ""}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                placeholder="Short description of the equipment or room setup..."
                rows={2}
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alt Text (for SEO & Accessibility)
              </label>
              <input
                type="text"
                value={form.altText || ""}
                onChange={(e) => setForm({ ...form, altText: e.target.value })}
                placeholder="e.g. Modern rehabilitation table at GG Physiotherapy Chennai"
                className="w-full text-xs border border-slate-300 rounded-lg p-2.5"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
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
                {saving ? "Saving..." : editingItem ? "Update Photo" : "Add to Gallery"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Gallery Photo"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to remove <strong>{deleteTarget.title}</strong> from the clinic gallery?
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
