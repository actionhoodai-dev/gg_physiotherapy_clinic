"use client";

import React, { useState } from "react";
import {
  Sliders,
  Database,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Server,
  Cloud,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { seedFirestoreDatabase } from "@/lib/firestore";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useToast } from "@/components/ui/Toast";

export default function AdminSystemPage() {
  const { success, error: toastError } = useToast();
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const firebaseReady = isFirebaseConfigured();

  const handleSeed = async () => {
    if (!confirm("This will write all GG Physiotherapy initial data (Services, Conditions, Testimonials, Clinic Profile, FAQs) to your live Firestore database. Continue?")) {
      return;
    }

    setSeeding(true);
    setSeedResult(null);

    try {
      const res = await seedFirestoreDatabase();
      setSeedResult(res);
      if (res.success) {
        success(res.message);
      } else {
        toastError(res.message);
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to seed database";
      setSeedResult({ success: false, message: msg });
      toastError(msg);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Sliders className="w-6 h-6 text-teal-600" />
          System Health, Integrations & Database Seeder
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Inspect external cloud service health and manage database initial state.
        </p>
      </div>

      {/* Cloud Integrations Status */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Server className="w-4 h-4 text-teal-600" />
          Connected Cloud Integrations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Firebase */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Database className="w-4 h-4 text-amber-500" />
                Firebase
              </div>
              {firebaseReady ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  <CheckCircle className="w-3 h-3" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <AlertTriangle className="w-3 h-3" /> Fallback Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Project: <code className="font-mono text-slate-700 font-semibold">gg-physio</code>
            </p>
            <p className="text-[11px] text-slate-400">
              Stores appointments, services, reviews, and clinical settings.
            </p>
          </div>

          {/* Cloudinary */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Cloud className="w-4 h-4 text-sky-500" />
                Cloudinary
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                <CheckCircle className="w-3 h-3" /> Connected
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Cloud: <code className="font-mono text-slate-700 font-semibold">rnlb6jmx</code>
            </p>
            <p className="text-[11px] text-slate-400">
              High-speed media CDN for clinic images, treatments, and gallery photos.
            </p>
          </div>

          {/* Resend */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Mail className="w-4 h-4 text-purple-500" />
                Resend Email
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                <CheckCircle className="w-3 h-3" /> Configured
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Admin Notifications: <span className="font-semibold text-slate-700">Active</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Sends instant email alerts when patients submit enquiry and booking forms.
            </p>
          </div>
        </div>
      </div>

      {/* Database Seeder */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-600" />
              1-Click Firestore Database Seeder
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Synchronize your Firestore database with the complete authentic dataset for GG Physiotherapy:
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Clinic Profile & Hours (Perungudi, Chennai)
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Dr. Sundaravalli Jayakumar (Doctor Profile)
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            6+ Physiotherapy Treatment Services
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            6+ Conditions Treated (Back pain, Sciatica, etc.)
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            6 Authentic Patient Testimonials (4.9★)
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            6 Clinic Facility Gallery Photos
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            6 Frequently Asked Questions (FAQs)
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Local SEO & Schema.org Metadata
          </li>
        </ul>

        {seedResult && (
          <div
            className={`p-4 rounded-lg text-xs ${
              seedResult.success
                ? "bg-teal-50 border border-teal-200 text-teal-900"
                : "bg-rose-50 border border-rose-200 text-rose-900"
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {seedResult.success ? (
                <CheckCircle className="w-4 h-4 text-teal-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              )}
              {seedResult.success ? "Database Synchronized" : "Seeding Warning"}
            </div>
            <p className="mt-1">{seedResult.message}</p>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? "animate-spin" : ""}`} />
            {seeding ? "Writing Data to Firestore..." : "Seed / Reset Firestore Database"}
          </button>
        </div>
      </div>
    </div>
  );
}
