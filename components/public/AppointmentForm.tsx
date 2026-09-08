"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Sparkles,
  MapPin,
  Check,
} from "lucide-react";
import { validateIndianPhone, generateWhatsAppLink } from "@/lib/utils";
import { defaultSettings } from "@/lib/defaultData";

const WEEKDAY_MORNING_SLOTS = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
];

const WEEKDAY_EVENING_SLOTS = [
  "05:00 PM – 06:00 PM",
  "06:00 PM – 07:00 PM",
  "07:00 PM – 08:00 PM",
  "08:00 PM – 09:00 PM",
];

const SUNDAY_SLOTS = [
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
];

export function AppointmentForm({
  initialService = "",
  initialCondition = "",
}: {
  initialService?: string;
  initialCondition?: string;
}) {
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredService:
      initialService || initialCondition || "Orthopedic Rehabilitation",
    preferredDate: todayStr,
    preferredTime: "10:00 AM – 11:00 AM",
    consultationMode: "clinic" as const,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  // Determine if the selected date is Sunday
  const isSunday = useMemo(() => {
    if (!formData.preferredDate) return false;
    // Split to avoid UTC timezone off-by-one
    const parts = formData.preferredDate.split("-");
    if (parts.length !== 3) return false;
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.getDay() === 0;
  }, [formData.preferredDate]);

  // Adjust time slot when changing between Sunday and Weekday if needed
  const handleDateChange = (date: string) => {
    const parts = date.split("-");
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const sunday = d.getDay() === 0;
    
    let newTime = formData.preferredTime;
    if (sunday && !SUNDAY_SLOTS.includes(newTime)) {
      newTime = SUNDAY_SLOTS[0];
    } else if (!sunday && SUNDAY_SLOTS.includes(newTime) && !WEEKDAY_MORNING_SLOTS.includes(newTime)) {
      newTime = WEEKDAY_MORNING_SLOTS[0];
    }

    setFormData({
      ...formData,
      preferredDate: date,
      preferredTime: newTime,
    });
  };

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

    if (!formData.preferredTime) {
      setErrorMessage("Please select a 1-hour time slot.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          consultationMode: "clinic", // Strictly offline / in-clinic
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedId(data.appointmentId);
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.error || "Failed to schedule appointment. Please call the clinic directly."
        );
      }
    } catch {
      setErrorMessage("Network error. Please try again or call 090940 26006 directly.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppSummaryLink = () => {
    const text = `Hello GG Physiotherapy Clinic, I have submitted an in-clinic appointment request:
- Booking Ref: ${confirmedId}
- Patient: ${formData.fullName}
- Phone: ${formData.phone}
- Treatment: ${formData.preferredService}
- Date: ${formData.preferredDate}
- 1-Hour Slot: ${formData.preferredTime}
- Location: In-Clinic (Perungudi, Chennai)
Please confirm my consultation slot.`;
    return generateWhatsAppLink(defaultSettings.whatsapp, text);
  };

  if (submitted) {
    return (
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-200 shadow-md text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            In-Clinic Consultation Scheduled
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Appointment Request Confirmed!
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Booking Reference: {confirmedId}
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Dr. Sundaravalli &amp; the clinical reception have received your request for:
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 text-left space-y-2.5 max-w-md mx-auto">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Date &amp; Slot:</span>
            <span className="font-bold text-[#0A363D]">
              {formData.preferredDate} • {formData.preferredTime}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Treatment:</span>
            <span className="font-semibold text-slate-900">
              {formData.preferredService}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Clinic Location:</span>
            <span className="font-semibold text-slate-900 text-right">
              Perungudi, Chennai
            </span>
          </div>
          {formData.email && (
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Email Confirmation:</span>
              <span className="font-medium text-slate-800 truncate max-w-[200px]">
                Sent to {formData.email}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-1">
            <span className="text-slate-500 font-medium">Clinical Status:</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 text-xs">
              Pending Clinic Confirmation
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppSummaryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Details via WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: "",
                phone: "",
                email: "",
                preferredService: "Orthopedic Rehabilitation",
                preferredDate: todayStr,
                preferredTime: "10:00 AM – 11:00 AM",
                consultationMode: "clinic",
                message: "",
              });
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            Book Another Consultation
          </button>
        </div>

        <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
          * A receptionist or Dr. Sundaravalli&apos;s assistant will call or message your mobile number ({formData.phone}) to confirm your exact entry time.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* In-Clinic Notice Badge */}
      <div className="p-3.5 rounded-2xl bg-[#0A363D]/5 border border-[#0A363D]/15 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#0A363D]">
          <Building2 className="w-4 h-4 text-teal-700 flex-shrink-0" />
          <span>In-Clinic Therapy at Perungudi, Chennai</span>
        </div>
        <span className="text-[11px] text-teal-800 font-semibold bg-white px-2.5 py-1 rounded-full border border-teal-200 shadow-2xs">
          Offline Treatment Only
        </span>
      </div>

      {/* Patient Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Kumar"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              placeholder="10-digit mobile (e.g. 9876543210)"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Treatment & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Treatment Concern / Service <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.preferredService}
            onChange={(e) =>
              setFormData({ ...formData, preferredService: e.target.value })
            }
            className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
          >
            <option value="Orthopedic Rehabilitation">Orthopedic Rehabilitation</option>
            <option value="Spine & Back Pain Care">Spine &amp; Back Pain Care</option>
            <option value="Low Back Pain & Sciatica">Low Back Pain &amp; Sciatica</option>
            <option value="Knee Osteoarthritis">Knee Osteoarthritis Therapy</option>
            <option value="Cervical Spondylosis & Neck Pain">Cervical Spondylosis &amp; Neck Pain</option>
            <option value="Frozen Shoulder Mobility">Frozen Shoulder Mobility</option>
            <option value="Sports Injury Rehabilitation">Sports Injury Rehabilitation</option>
            <option value="Stroke & Neuro Rehabilitation">Stroke &amp; Neuro Rehabilitation</option>
            <option value="Post-Surgical Knee / Hip Rehab">Post-Surgical Knee / Hip Rehab</option>
            <option value="Geriatric Mobility & Balance">Geriatric Mobility &amp; Balance</option>
            <option value="Comprehensive Physical Assessment">Comprehensive Physical Assessment</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Email Address <span className="text-slate-400 font-normal">(For Confirmation)</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="e.g. ramesh@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Appointment Date Picker */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select Preferred Date <span className="text-rose-500">*</span>
          </label>
          {isSunday && (
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Sunday Timings (11:00 AM – 1:00 PM)
            </span>
          )}
        </div>
        <div className="relative">
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            required
            min={todayStr}
            value={formData.preferredDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
          />
        </div>
      </div>

      {/* 1-Hour Time Slot Selection */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Select 1-Hour Consultation Slot <span className="text-rose-500">*</span>
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Selected: <strong className="text-[#0A363D]">{formData.preferredTime}</strong>
          </span>
        </div>

        {isSunday ? (
          /* Sunday Slots */
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Sunday Morning Slots
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SUNDAY_SLOTS.map((slot) => {
                const isSelected = formData.preferredTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredTime: slot })}
                    className={`py-3 px-3.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0A363D] text-white border-[#0A363D] shadow-sm ring-2 ring-[#0A363D]/20"
                        : "bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-teal-300" : "text-teal-600"}`} />
                      {slot}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-teal-300" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Weekday Slots (Morning + Evening) */
          <div className="space-y-3">
            {/* Morning Session */}
            <div>
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block mb-1.5">
                Morning Sessions (10:00 AM – 1:00 PM)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {WEEKDAY_MORNING_SLOTS.map((slot) => {
                  const isSelected = formData.preferredTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0A363D] text-white border-[#0A363D] shadow-xs ring-2 ring-[#0A363D]/20"
                          : "bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/40"
                      }`}
                    >
                      <span className="truncate">{slot}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-300 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evening Session */}
            <div>
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block mb-1.5">
                Evening Sessions (5:00 PM – 9:00 PM)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {WEEKDAY_EVENING_SLOTS.map((slot) => {
                  const isSelected = formData.preferredTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`py-2.5 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0A363D] text-white border-[#0A363D] shadow-xs ring-2 ring-[#0A363D]/20"
                          : "bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/40"
                      }`}
                    >
                      <span className="truncate">{slot}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-teal-300 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Symptoms / Medical Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Symptoms or Medical History <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Chronic lower back pain radiating to left leg for 3 weeks..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A363D] bg-white transition-all"
        />
      </div>

      {/* Submit CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#E85D45] text-white font-extrabold text-sm sm:text-base hover:bg-[#D44E36] disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Scheduling In-Clinic Slot...</span>
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5 text-white/90" />
              <span>Confirm In-Clinic Appointment Slot</span>
            </>
          )}
        </button>
      </div>

      <div className="text-[11px] text-slate-500 text-center leading-relaxed">
        No online advance payment required. Dr. Sundaravalli Jayakumar &amp; clinical desk at Perungudi will confirm your time slot upon receiving this form.
      </div>
    </form>
  );
}
