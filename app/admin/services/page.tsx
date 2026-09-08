"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { getServices, saveService, deleteService } from "@/lib/firestore";
import { ServiceItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { slugify } from "@/lib/utils";

export default function AdminServicesPage() {
  const { success, error: toastError } = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [form, setForm] = useState<Partial<ServiceItem>>({
    title: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    heroImage: "",
    thumbnail: "",
    benefits: [],
    treatmentApproach: "",
    suitableFor: [],
    durationInfo: "45 to 60 minutes per session.",
    published: true,
    displayOrder: 1,
    seoTitle: "",
    seoDescription: "",
  });

  const [benefitInput, setBenefitInput] = useState("");

  const loadServices = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      id: `service-${Date.now()}`,
      title: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
      benefits: ["Restores joint mobility", "Alleviates chronic nerve pain"],
      treatmentApproach: "",
      suitableFor: ["Patients with joint stiffness"],
      durationInfo: "45 to 60 minutes per session.",
      published: true,
      displayOrder: services.length + 1,
      seoTitle: "",
      seoDescription: "",
    });
    setBenefitInput("");
    setModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setForm(item);
    setBenefitInput("");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.shortDescription) {
      toastError("Please provide title and short description");
      return;
    }

    setSaving(true);
    const itemToSave: ServiceItem = {
      id: form.id || `service-${Date.now()}`,
      title: form.title!,
      slug: form.slug || slugify(form.title!),
      shortDescription: form.shortDescription!,
      longDescription: form.longDescription || form.shortDescription!,
      heroImage: form.heroImage || "",
      thumbnail: form.thumbnail || form.heroImage || "",
      benefits: form.benefits || [],
      treatmentApproach: form.treatmentApproach || "",
      suitableFor: form.suitableFor || [],
      durationInfo: form.durationInfo || "45 to 60 minutes.",
      faqs: form.faqs || [],
      relatedConditions: form.relatedConditions || [],
      relatedServices: form.relatedServices || [],
      seoTitle: form.seoTitle || form.title!,
      seoDescription: form.seoDescription || form.shortDescription!,
      published: form.published ?? true,
      displayOrder: form.displayOrder || 1,
      createdAt: form.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveService(itemToSave);
      success("Service saved successfully!");
      setModalOpen(false);
      loadServices();
    } catch (err: any) {
      toastError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteService(id);
      success(`Service "${title}" deleted`);
      loadServices();
    } catch (err) {
      toastError("Failed to delete service");
    }
  };

  const togglePublished = async (item: ServiceItem) => {
    const updated = { ...item, published: !item.published };
    try {
      await saveService(updated);
      setServices((prev) =>
        prev.map((s) => (s.id === item.id ? updated : s))
      );
      success(`Service ${updated.published ? "published" : "unpublished"}`);
    } catch (err) {
      toastError("Failed to update status");
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Services Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, reorder, or publish/unpublish clinical treatment offerings.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0e3b43] hover:bg-[#092b31] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-teal-300" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
          />
        </div>
        <span className="text-xs text-slate-500">
          Showing {filteredServices.length} of {services.length} services
        </span>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Loading services...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No services found. Click &quot;Add New Service&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Service</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Display Order</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                          <Image
                            src={service.thumbnail || service.heroImage}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">
                            {service.title}
                          </span>
                          <span className="text-[11px] text-slate-500 line-clamp-1 max-w-sm">
                            {service.shortDescription}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-600">
                      /services/{service.slug}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      #{service.displayOrder}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => togglePublished(service)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                          service.published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {service.published ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-slate-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-[#0e3b43] hover:bg-slate-100 transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, service.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? `Edit: ${editingItem.title}` : "Add New Clinical Service"}
        maxWidth="3xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Service Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    slug: form.slug || slugify(e.target.value),
                  })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">URL Slug *</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Short Summary *</label>
            <textarea
              required
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Detailed Treatment Description</label>
            <textarea
              rows={4}
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          {/* Cloudinary Image Upload for Service Hero */}
          <CloudinaryUploader
            currentImageUrl={form.heroImage}
            label="Service Hero Photo (Cloudinary)"
            onSuccess={(media) => {
              setForm({
                ...form,
                heroImage: media.secureUrl,
                thumbnail: media.secureUrl,
              });
              success("Photo uploaded to Cloudinary!");
            }}
          />

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Treatment Approach & Modalities</label>
            <textarea
              rows={2}
              value={form.treatmentApproach}
              onChange={(e) => setForm({ ...form, treatmentApproach: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Display Order</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) =>
                  setForm({ ...form, displayOrder: parseInt(e.target.value) || 1 })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Publish Status</label>
              <select
                value={form.published ? "true" : "false"}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.value === "true" })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#0e3b43]"
              >
                <option value="true">Published</option>
                <option value="false">Draft / Unpublished</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#0e3b43] text-white text-xs font-bold hover:bg-[#092b31] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
