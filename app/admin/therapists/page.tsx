"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Search,
  UserCheck,
} from "lucide-react";
import { getTherapists, saveTherapist, deleteTherapist } from "@/lib/firestore";
import { TherapistItem } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { Modal } from "@/components/ui/Modal";

const EMPTY_FORM: Partial<TherapistItem> = {
  name: "",
  designation: "",
  qualification: "",
  yearsOfExperience: 0,
  specialization: [],
  biography: "",
  profileImage: "",
  languages: [],
  active: true,
  displayOrder: 1,
};

export default function AdminTherapistsPage() {
  const { success, error: toastError } = useToast();
  const [items, setItems] = useState<TherapistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TherapistItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<TherapistItem>>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<TherapistItem | null>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    const data = await getTherapists();
    setItems(data);
    setLoading(false);
  }

  function openCreate() {
    setEditingItem(null);
    setForm({ ...EMPTY_FORM, displayOrder: items.length + 1 });
    setModalOpen(true);
  }

  function openEdit(item: TherapistItem) {
    setEditingItem(item);
    setForm({ ...item });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name?.trim()) { toastError("Name is required"); return; }
    setSaving(true);
    try {
      const now = new Date().toISOString();
      const data: TherapistItem = {
        id: editingItem?.id || `therapist-${Date.now()}`,
        name: form.name || "",
        designation: form.designation || "",
        qualification: form.qualification || "",
        yearsOfExperience: form.yearsOfExperience || 0,
        specialization: form.specialization || [],
        biography: form.biography || "",
        profileImage: form.profileImage || "",
        languages: form.languages || [],
        displayOrder: form.displayOrder ?? items.length + 1,
        active: form.active ?? true,
        createdAt: editingItem?.createdAt || now,
        updatedAt: now,
      };
      await saveTherapist(data);
      success(editingItem ? "Therapist updated!" : "Therapist added!");
      setModalOpen(false);
      loadData();
    } catch {
      toastError("Failed to save therapist.");
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteTherapist(deleteTarget.id);
      success("Therapist removed.");
      setDeleteTarget(null);
      loadData();
    } catch { toastError("Failed to delete."); }
  }

  const filtered = items.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-teal-600" />
            Therapists & Doctors
          </h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} team member{items.length !== 1 ? "s" : ""} total.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0e3b43] hover:bg-[#0a2d33] text-white rounded-lg font-semibold text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Therapist
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search team..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-teal-600 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No therapists found.</p>
          <button onClick={openCreate} className="mt-3 text-teal-600 font-semibold text-sm hover:underline">+ Add a therapist</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {item.profileImage ? (
                    <Image
                      src={item.profileImage}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                      unoptimized
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-lg">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.designation}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {item.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-1"><strong>Qualification:</strong> {item.qualification}</p>
              <p className="text-xs text-slate-600 mb-1"><strong>Experience:</strong> {item.yearsOfExperience}+ years</p>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">{item.biography}</p>
              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" title="Edit"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(item)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Edit Therapist" : "Add Therapist"} size="lg">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input type="text" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Dr. Sundaravalli J" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
              <input type="text" value={form.designation || ""} onChange={(e) => setForm({ ...form, designation: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Chief Physiotherapist" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifications</label>
            <input type="text" value={form.qualification || ""} onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="B.P.T, M.P.T (ORTHO), DNT, MIAP" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Experience</label>
              <input type="number" value={form.yearsOfExperience || 0} onChange={(e) => setForm({ ...form, yearsOfExperience: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
              <input type="number" value={form.displayOrder || 1} onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Specializations (one per line)</label>
            <textarea value={(form.specialization || []).join("\n")} onChange={(e) => setForm({ ...form, specialization: e.target.value.split("\n").filter(Boolean) })}
              rows={3} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Orthopedic Rehabilitation&#10;Sports Injuries&#10;Spine Care" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Biography</label>
            <textarea value={form.biography || ""} onChange={(e) => setForm({ ...form, biography: e.target.value })}
              rows={4} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Image URL</label>
            <input type="text" value={form.profileImage || ""} onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Languages (one per line)</label>
            <textarea value={(form.languages || []).join("\n")} onChange={(e) => setForm({ ...form, languages: e.target.value.split("\n").filter(Boolean) })}
              rows={2} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Tamil&#10;English&#10;Hindi" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active ?? true} onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
            <span className="text-sm font-medium text-slate-700">Active</span>
          </label>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
          <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2 bg-[#0e3b43] hover:bg-[#0a2d33] text-white rounded-lg font-semibold text-sm disabled:opacity-50 inline-flex items-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingItem ? "Update" : "Add Therapist"}
          </button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Remove Therapist">
        <p className="text-sm text-slate-600">Remove <strong>{deleteTarget?.name}</strong> from the team list? This cannot be undone.</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
