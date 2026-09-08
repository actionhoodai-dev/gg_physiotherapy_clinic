"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  Building2,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { validateIndianPhone, generateWhatsAppLink } from "@/lib/utils";
import { defaultSettings } from "@/lib/defaultData";

export function AppointmentForm({
  initialService = "",
  initialCondition = "",
}: {
  initialService?: string;
  initialCondition?: string;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredService:
      initialService || initialCondition || "Orthopedic Rehabilitation",
    preferredDate: new Date().toISOString().split("T")[0],
    preferredTime: "Morning (10:00 AM - 1:00 PM)",
    consultationMode: "clinic" as "clinic" | "home" | "online",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!validateIndianPhone(formData.phone)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.preferredDate) {
      setErrorMessage("Please select your preferred appointment date.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedId(data.appointmentId);
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.error || "Failed to schedule appointment. Please call the clinic."
        );
      }
    } catch {
      setErrorMessage("Network error. Please try again or call 090940 26006 directly.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppSummaryLink = () => {
    const text = `Hello GG Physiotherapy Clinic, I have submitted an appointment request for:
- Name: ${formData.fullName}
- Phone: ${formData.phone}
- Service: ${formData.preferredService}
- Mode: ${formData.consultationMode.toUpperCase()}
- Date: ${formData.preferredDate} (${formData.preferredTime})
Please confirm my slot.`;
    return generateWhatsAppLink(defaultSettings.whatsapp, text);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-md text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Appointment Request Received!
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Booking Reference: {confirmedId}
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Dr. Sundaravalli & the clinic staff have received your booking request for{" "}
            <strong>{formData.preferredDate} ({formData.preferredTime})</strong>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-500">Mode:</span>
            <span className="font-semibold capitalize text-slate-800">
              {formData.consultationMode} Visit
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-slate-800">
              {formData.preferredService}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-amber-600">
              Pending Clinic Confirmation
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppSummaryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Confirmation on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                phone: "",
                email: "",
                preferredService: "Orthopedic Rehabilitation",
                preferredDate: new Date().toISOString().split("T")[0],
                preferredTime: "Morning (10:00 AM - 1:00 PM)",
                consultationMode: "clinic",
                message: "",
              });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
          >
            Book Another Slot
          </button>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * Note: Your appointment slot will be confirmed via phone call or WhatsApp by the clinic before your visit.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6"
    >
      {errorMessage && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mode of Consultation */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Consultation Mode <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { id: "clinic", label: "Clinic Visit", icon: Building2, desc: "Perungudi" },
            { id: "home", label: "Home Visit", icon: Home, desc: "South Chennai" },
            { id: "online", label: "Online", icon: Video, desc: "Video Call" },
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = formData.consultationMode === mode.id;
            return (
              <button
                type="button"
                key={mode.id}
                onClick={() =>
                  setFormData({
                    ...formData,
                    consultationMode: mode.id as "clinic" | "home" | "online",
                  })
                }
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#0e3b43] bg-[#e6f4f1] text-[#0e3b43] font-bold shadow-xs"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isSelected ? "text-[#0e3b43]" : "text-slate-500"}`} />
                <span className="text-xs">{mode.label}</span>
                <span className="text-[10px] text-slate-500 font-normal">{mode.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Ananth Narayan"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>

      {/* Service & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Preferred Treatment / Reason
          </label>
          <select
            value={formData.preferredService}
            onChange={(e) =>
              setFormData({ ...formData, preferredService: e.target.value })
            }
            className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43] bg-white"
          >
            <option value="Orthopedic Rehabilitation">Orthopedic Rehabilitation</option>
            <option value="Spine & Back Pain Care">Spine & Back Pain Care</option>
            <option value="Low Back Pain & Sciatica">Low Back Pain & Sciatica</option>
            <option value="Knee Osteoarthritis">Knee Osteoarthritis</option>
            <option value="Cervical Spondylosis & Neck Pain">Cervical Spondylosis & Neck Pain</option>
            <option value="Frozen Shoulder">Frozen Shoulder</option>
            <option value="Sports Injury Rehabilitation">Sports Injury Rehabilitation</option>
            <option value="Stroke & Neuro Rehabilitation">Stroke & Neuro Rehabilitation</option>
            <option value="Post-Surgical Rehabilitation">Post-Surgical Rehabilitation</option>
            <option value="Geriatric Mobility & Fall Prevention">Geriatric Mobility & Fall Prevention</option>
            <option value="General Physical Assessment">General Physical Assessment</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="e.g. ananth@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>
      </div>

      {/* Preferred Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Preferred Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={formData.preferredDate}
              onChange={(e) =>
                setFormData({ ...formData, preferredDate: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Preferred Slot <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={formData.preferredTime}
              onChange={(e) =>
                setFormData({ ...formData, preferredTime: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43] bg-white"
            >
              <option value="Morning (10:00 AM - 1:00 PM)">Morning: 10:00 AM – 1:00 PM</option>
              <option value="Evening (5:00 PM - 7:00 PM)">Evening: 5:00 PM – 7:00 PM</option>
              <option value="Night (7:00 PM - 9:00 PM)">Night: 7:00 PM – 9:00 PM</option>
              <option value="Sunday (11:00 AM - 1:00 PM)">Sunday: 11:00 AM – 1:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Symptoms / Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Symptoms or Specific Concerns (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Left knee pain while climbing stairs for 3 weeks..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full p-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0e3b43]"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#E85D45] text-white font-extrabold text-sm sm:text-base hover:bg-[#D44E36] disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5 text-white/90" />
              <span>Confirm Appointment Request</span>
            </>
          )}
        </button>
      </div>

      <div className="text-[11px] text-slate-500 text-center leading-relaxed">
        No payment required now. Your request will be directly confirmed by Dr. Sundaravalli&apos;s team at GG Physiotherapy Clinic.
      </div>
    </form>
  );
}
