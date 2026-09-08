"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { getClinicSettings, updateClinicSettings } from "@/lib/firestore";
import { ClinicSettings } from "@/types";
import { defaultSettings } from "@/lib/defaultData";
import { useToast } from "@/components/ui/Toast";

export default function AdminSettingsPage() {
  const { success, error: toastError } = useToast();
  const [settings, setSettings] = useState<ClinicSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getClinicSettings();
      setSettings(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateClinicSettings(settings);
      success("Clinic settings updated successfully!");
    } catch (err: any) {
      toastError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-xs text-slate-500">Loading settings...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Business Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your clinic identity, address in Perungudi, contact numbers, hours, and WhatsApp integration.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0e3b43] text-white font-semibold text-xs hover:bg-[#092b31] disabled:opacity-50 transition-colors shadow-xs"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* General Information */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Clinic Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Clinic Name</label>
            <input
              type="text"
              value={settings.clinicName}
              onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Tagline / Slogan</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Contact Details & Perungudi Address
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Phone (Direct Call)</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">WhatsApp Number (with +91)</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Clinic Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs font-bold text-slate-700">Street Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Area / Locality</label>
            <input
              type="text"
              value={settings.area}
              onChange={(e) => setSettings({ ...settings, area: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">City</label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Pincode</label>
            <input
              type="text"
              value={settings.pincode}
              onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Google Maps URL</label>
            <input
              type="text"
              value={settings.googleMapsUrl}
              onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Google Business Profile URL</label>
            <input
              type="text"
              value={settings.googleBusinessProfileUrl}
              onChange={(e) => setSettings({ ...settings, googleBusinessProfileUrl: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs font-bold text-slate-700">Google Maps Embed iframe URL</label>
          <input
            type="text"
            value={settings.googleMapsEmbedUrl || ""}
            onChange={(e) => setSettings({ ...settings, googleMapsEmbedUrl: e.target.value })}
            placeholder="https://www.google.com/maps/embed?pb=..."
            className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
          />
          <span className="text-[11px] text-slate-400">
            Paste the embed link from Google Maps (or the src inside the iframe tag).
          </span>
        </div>


      </div>

      {/* Consultation Hours */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Consultation Timings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Monday – Saturday</label>
            <input
              type="text"
              value={settings.workingHours.monSat}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, monSat: e.target.value },
                })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Sunday Hours</label>
            <input
              type="text"
              value={settings.workingHours.sunday}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, sunday: e.target.value },
                })
              }
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>

      {/* Social Media Profiles */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Social Media Handles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Instagram Profile URL</label>
            <input
              type="text"
              value={settings.socialLinks?.instagram || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                })
              }
              placeholder="https://www.instagram.com/ggphysiotherapyclinic/"
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Facebook Page URL</label>
            <input
              type="text"
              value={settings.socialLinks?.facebook || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                })
              }
              placeholder="https://facebook.com/..."
              className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
