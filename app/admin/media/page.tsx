"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HardDrive,
  UploadCloud,
  Copy,
  Check,
  ExternalLink,
  Info,
  ShieldCheck,
} from "lucide-react";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import { useToast } from "@/components/ui/Toast";

// Sample curated clinic media library
const SAMPLE_MEDIA = [
  {
    id: "med-1",
    name: "Dr. Sundaravalli Jayakumar Consulting",
    url: "https://images.unsplash.com/photo-1594824813576-905c10fa25e6?auto=format&fit=crop&w=800&q=80",
    category: "Doctors",
    size: "650 KB",
  },
  {
    id: "med-2",
    name: "Spine & Joint Mobilization Therapy",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    category: "Services",
    size: "720 KB",
  },
  {
    id: "med-3",
    name: "Post-Operative Orthopedic Rehabilitation",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    category: "Rehabilitation",
    size: "810 KB",
  },
  {
    id: "med-4",
    name: "Ultrasound & Electrotherapy Device",
    url: "https://images.unsplash.com/photo-1583912267670-6575ad362378?auto=format&fit=crop&w=800&q=80",
    category: "Equipment",
    size: "540 KB",
  },
  {
    id: "med-5",
    name: "Sports Injury Return-to-Play Training",
    url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    category: "Sports",
    size: "690 KB",
  },
  {
    id: "med-6",
    name: "Ergonomic Assessment & Guidance",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    category: "Blog",
    size: "590 KB",
  },
];

export default function AdminMediaPage() {
  const { success, error: toastError } = useToast();
  const [mediaList, setMediaList] = useState(SAMPLE_MEDIA);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [newUploadUrl, setNewUploadUrl] = useState("");
  const [newUploadName, setNewUploadName] = useState("");

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleAddUploaded = () => {
    if (!newUploadUrl) {
      toastError("Please upload an image first");
      return;
    }

    const newItem = {
      id: `med-${Date.now()}`,
      name: newUploadName.trim() || "Uploaded Clinic Photo",
      url: newUploadUrl,
      category: "Uploads",
      size: "Optimized (Cloudinary)",
    };

    setMediaList([newItem, ...mediaList]);
    setNewUploadUrl("");
    setNewUploadName("");
    success("Photo added to media collection");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-teal-600" />
            Media Library & Cloudinary Assets
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Securely upload clinic photos, doctor portraits, and equipment images stored on Cloudinary.
          </p>
        </div>
      </div>

      {/* Cloudinary Status Banner */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-teal-900">
          <span className="font-bold block text-sm">Cloudinary CDN Connected</span>
          Cloud Name: <code className="bg-teal-100 px-1 py-0.5 rounded font-mono text-[11px]">rnlb6jmx</code>. 
          Uploads are automatically compressed, WebP-optimized, and hosted globally for lightning-fast mobile loading.
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-teal-600" />
          Upload New Image
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <CloudinaryUploader
            value={newUploadUrl}
            onChange={(url: string) => setNewUploadUrl(url)}
            folder="gg_physio/uploads"
          />

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Image Label / Title
              </label>
              <input
                type="text"
                value={newUploadName}
                onChange={(e) => setNewUploadName(e.target.value)}
                placeholder="e.g. Dr. Sundaravalli with patient"
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {newUploadUrl && (
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono break-all text-slate-600">
                  {newUploadUrl}
                </div>
                <button
                  type="button"
                  onClick={handleAddUploaded}
                  className="w-full py-2 px-4 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-xs transition"
                >
                  Save to Media Library
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800">
          Clinic Assets Collection ({mediaList.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col"
            >
              <div className="relative h-44 w-full bg-slate-100">
                <Image src={item.url} alt={item.name} fill className="object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-900 text-xs line-clamp-1">{item.name}</h3>
                  <div className="text-[11px] text-slate-400 mt-0.5 font-mono truncate">{item.url}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{item.size}</span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition"
                      title="Copy URL"
                    >
                      {copiedUrl === item.url ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span className="text-teal-600 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                      title="Open full size"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
