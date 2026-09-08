"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Save,
  Globe,
  MapPin,
  Tag,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { getSEOSettings, updateSEOSettings } from "@/lib/firestore";
import { SEOSettings } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";

export default function AdminSEOPage() {
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SEOSettings>({
    defaultTitle: "GG Physiotherapy Clinic | Best Physiotherapist in Perungudi, Chennai",
    titleTemplate: "%s | GG Physiotherapy Clinic Chennai",
    defaultDescription:
      "Expert physiotherapy & orthopedic rehabilitation clinic in Perungudi, Chennai led by Dr. Sundaravalli Jayakumar. Specialized care for back pain, neck pain, sports injuries, and post-op recovery.",
    keywords: [
      "Physiotherapy in Perungudi",
      "Best Physiotherapist Chennai",
      "Dr Sundaravalli Jayakumar",
      "Back Pain Treatment Chennai",
      "Sports Injury Rehab OMR",
    ],
    canonicalBase: "https://ggphysiotherapy.com",
    ogImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    localAreaTargeting: [
      "Perungudi",
      "OMR Chennai",
      "Thoraipakkam",
      "Kandanchavadi",
      "Velachery",
      "Madipakkam",
      "Palavakkam",
      "Thiruvanmiyur",
    ],
  });

  const [keywordsInput, setKeywordsInput] = useState("");
  const [areasInput, setAreasInput] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getSEOSettings();
      setForm(data);
      setKeywordsInput(data.keywords?.join(", ") || "");
      setAreasInput(data.localAreaTargeting?.join(", ") || "");
    } catch (err) {
      console.error(err);
      toastError("Failed to load SEO settings");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated: SEOSettings = {
        ...form,
        keywords: keywordsInput
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        localAreaTargeting: areasInput
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      };

      await updateSEOSettings(updated);
      setForm(updated);
      success("SEO metadata and local ranking settings updated successfully!");
    } catch (err) {
      console.error(err);
      toastError("Failed to save SEO settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-teal-600" />
            SEO & Google Local Search Optimization
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure metadata, Google ranking keywords, and Chennai local catchment areas.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Reload
        </button>
      </div>

      {/* Schema Verification Card */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-teal-900">
          <span className="font-bold block text-sm">Schema.org Structured Data Active</span>
          Your website automatically injects <code className="bg-teal-100/70 px-1 py-0.5 rounded font-mono text-[11px]">MedicalClinic</code> and <code className="bg-teal-100/70 px-1 py-0.5 rounded font-mono text-[11px]">Physiotherapy</code> JSON-LD schemas linking Dr. Sundaravalli Jayakumar, the Perungudi clinic address, phone numbers, and operational hours for Google rich snippets.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Meta Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-teal-600" />
            Primary Meta Tags & Title
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default Browser Title (Homepage & General)
            </label>
            <input
              type="text"
              value={form.defaultTitle}
              onChange={(e) => setForm({ ...form, defaultTitle: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Recommended length: 50-60 characters</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title Template (Sub-pages)
            </label>
            <input
              type="text"
              value={form.titleTemplate}
              onChange={(e) => setForm({ ...form, titleTemplate: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500 font-mono text-xs"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">Use %s for dynamic page title placeholder</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Default Meta Description (Google Search Snippet)
            </label>
            <textarea
              value={form.defaultDescription}
              onChange={(e) => setForm({ ...form, defaultDescription: e.target.value })}
              rows={3}
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              required
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Recommended length: 140-160 characters</span>
              <span className={form.defaultDescription.length > 160 ? "text-amber-600 font-semibold" : ""}>
                {form.defaultDescription.length} characters
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Canonical Base URL
            </label>
            <input
              type="url"
              value={form.canonicalBase}
              onChange={(e) => setForm({ ...form, canonicalBase: e.target.value })}
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5"
              required
            />
          </div>
        </div>

        {/* Local Keywords & Chennai Neighborhood Targeting */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="w-4 h-4 text-teal-600" />
            Local Keywords & Chennai Area Catchment
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Targeted Search Keywords (Comma separated)
            </label>
            <textarea
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              rows={3}
              placeholder="Physiotherapy in Perungudi, Best Physiotherapist Chennai, Sports Rehabilitation OMR"
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Local Service Areas / Neighborhoods in Chennai (Comma separated)
            </label>
            <textarea
              value={areasInput}
              onChange={(e) => setAreasInput(e.target.value)}
              rows={2}
              placeholder="Perungudi, OMR, Thoraipakkam, Kandanchavadi, Velachery, Madipakkam"
              className="w-full text-xs border border-slate-300 rounded-lg p-2.5"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              These areas are embedded in the footer, local schema, and contact pages for local search discovery.
            </p>
          </div>
        </div>

        {/* Social Share / OpenGraph */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Tag className="w-4 h-4 text-teal-600" />
            Social Media Share Image (OpenGraph / Twitter)
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Social Share Banner Image (1200 x 630 px)
            </label>
            <CloudinaryUploader
              value={form.ogImage}
              onChange={(url: string) => setForm({ ...form, ogImage: url })}
              folder="gg_physio/seo"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving Changes..." : "Save SEO Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
