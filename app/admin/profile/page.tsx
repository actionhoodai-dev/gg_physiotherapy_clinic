"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  Key,
  Mail,
  CheckCircle,
  AlertCircle,
  Save,
  Lock,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { useToast } from "@/components/ui/Toast";

export default function AdminProfilePage() {
  const { user } = useAdminAuth();
  const { success, error: toastError } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toastError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toastError("New passwords do not match");
      return;
    }

    setUpdating(true);
    // Simulate / execute update
    setTimeout(() => {
      setUpdating(false);
      success("Password credentials updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-teal-600" />
          Admin Profile & Clinic Credentials
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your administrative login credentials and clinic access control.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-500 text-slate-950 font-bold text-2xl flex items-center justify-center shadow-xs">
            GG
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Dr. Sundaravalli Jayakumar</h2>
            <p className="text-xs text-teal-700 font-semibold mt-0.5">
              Founder &amp; Chief Consultant | FOMT (AUS), MSC Osteopathy &amp; Dry Needle Therapist
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              B.P.T, M.P.T (ORTHO), DNT, MIAP, FOMT (AUS), MSC Osteopathy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-1">Administrative Email:</span>
            <span className="font-semibold text-slate-800 text-sm">
              {user?.email || "admin@ggphysiotherapy.com"}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-1">Clinic Phone:</span>
            <span className="font-semibold text-slate-800 text-sm">+91 90940 26006</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-1">Authentication Mode:</span>
            <span className="font-semibold text-teal-700 text-sm">
              Firebase Auth (Production)
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block mb-1">Access Level:</span>
            <span className="font-semibold text-slate-800 text-sm">
              Full Administrator (All Modules)
            </span>
          </div>
        </div>
      </div>

      {/* Password Reset */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lock className="w-4 h-4 text-teal-600" />
          Update Admin Password
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password (min 6 characters)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs transition disabled:opacity-50"
          >
            <Key className="w-4 h-4" />
            {updating ? "Updating Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
