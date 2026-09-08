"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";

interface UploadedMedia {
  secureUrl: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface CloudinaryUploaderProps {
  onSuccess?: (media: UploadedMedia) => void;
  folder?: string;
  currentImageUrl?: string;
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
}

export function CloudinaryUploader({
  onSuccess,
  folder = "gg_physio",
  currentImageUrl,
  value,
  onChange,
  label = "Upload Image",
}: CloudinaryUploaderProps) {
  const initialUrl = value || currentImageUrl || "";
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const prevUrlRef = React.useRef(initialUrl);
  React.useEffect(() => {
    const url = value || currentImageUrl || "";
    if (url && !file && url !== prevUrlRef.current) {
      prevUrlRef.current = url;
      requestAnimationFrame(() => setPreview(url));
    }
  }, [value, currentImageUrl, file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB.");
      return;
    }

    setFile(selected);
    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");
    setProgress(15);

    try {
      // 1. Get secure upload signature from our backend
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      const signData = await signRes.json();
      setProgress(40);

      if (!signData.configured) {
        // Mock fallback if keys not configured
        setTimeout(() => {
          setUploading(false);
          setProgress(100);
          if (onSuccess) {
            onSuccess({
              secureUrl: preview,
              publicId: `mock_${Date.now()}`,
            });
          }
          if (onChange) {
            onChange(preview);
          }
        }, 1000);
        return;
      }

      // 2. Direct upload to Cloudinary using signed payload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;
      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      setProgress(85);
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || "Cloudinary upload failed");
      }

      setProgress(100);
      setUploading(false);
      if (onSuccess) {
        onSuccess({
          secureUrl: uploadData.secure_url,
          publicId: uploadData.public_id,
          format: uploadData.format,
          width: uploadData.width,
          height: uploadData.height,
          bytes: uploadData.bytes,
        });
      }
      if (onChange) {
        onChange(uploadData.secure_url);
      }
    } catch (err: unknown) {
      setUploading(false);
      const message = err instanceof Error ? err.message : "Failed to upload image. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>

      {error && (
        <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone & Preview */}
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50">
        {preview ? (
          <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-white">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-28 h-28 rounded-lg border border-slate-200 bg-white flex flex-col items-center justify-center text-slate-400 flex-shrink-0">
            <ImageIcon className="w-8 h-8 mb-1" />
            <span className="text-[10px]">No image</span>
          </div>
        )}

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
            >
              Choose File
            </button>

            {file && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-1.5 rounded-lg bg-[#0e3b43] hover:bg-[#092b31] text-white text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload to Cloudinary</span>
                  </>
                )}
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-500">
            Supports WebP, PNG, JPG up to 10MB. Stored securely on Cloudinary CDN.
          </p>
        </div>
      </div>
    </div>
  );
}
