"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { validateIndianPhone } from "@/lib/utils";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }

    if (!validateIndianPhone(formData.phone)) {
      setStatus({
        type: "error",
        message: "Please enter a valid 10-digit Indian phone number.",
      });
      return;
    }

    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Please enter your message." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent to Dr. Sundaravalli & the clinic staff. We will get back to you shortly.",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "General Enquiry",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to submit enquiry. Please call us.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again or call the clinic directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status.type === "success" && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      {status.type === "error" && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{status.message}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#0A363D] uppercase tracking-wider">
          Your Name <span className="text-[#E85D45]">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Ramesh Kumar"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full h-12 px-4 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0A363D] uppercase tracking-wider">
            Phone Number <span className="text-[#E85D45]">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="10-digit mobile (e.g. 9876543210)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#0A363D] uppercase tracking-wider">
            Email (Optional)
          </label>
          <input
            type="email"
            placeholder="e.g. ramesh@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#0A363D] uppercase tracking-wider">
          Subject
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full h-12 px-4 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
        >
          <option value="General Enquiry">General Consultation Enquiry</option>
          <option value="In-Clinic Assessment">In-Clinic Comprehensive Assessment</option>
          <option value="Spine & Back Pain Care">Spine & Back Pain Care</option>
          <option value="Knee & Joint Pain">Knee & Joint Pain</option>
          <option value="Post-Op Rehabilitation">Post-Operative Rehabilitation</option>
          <option value="Sports Injury">Sports Injury Recovery</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#0A363D] uppercase tracking-wider">
          Your Message <span className="text-[#E85D45]">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="Briefly describe your symptoms or query..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-4 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#E85D45] text-white font-semibold text-sm hover:bg-[#d44d36] disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Direct Message to Clinic</span>
          </>
        )}
      </button>
    </form>
  );
}
