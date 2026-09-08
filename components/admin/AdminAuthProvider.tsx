"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

interface AdminAuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;

  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);

    if (!auth || !isFirebaseConfigured()) {
      // Local offline fallback if Firebase Auth is not active
      if (process.env.NODE_ENV !== "production") {
        setIsAdmin(true);
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, error: "Firebase Authentication is not configured." };
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      setUser(cred.user);
      setIsAdmin(true);
      setLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setLoading(false);
      const error = err as { code?: string; message?: string };
      let message = "Invalid email or password.";
      if (error.code === "auth/user-not-found") message = "No account found with this email.";
      if (error.code === "auth/wrong-password") message = "Incorrect password.";
      if (error.code === "auth/too-many-requests") message = "Too many failed attempts. Try again later.";
      return { success: false, error: message };
    }
  };

  const logout = async () => {

    setIsAdmin(false);
    setUser(null);
    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error("Signout error:", err);
      }
    }
    router.push("/admin/login");
  };

  const resetPassword = async (email: string) => {
    if (!auth || !isFirebaseConfigured()) {
      return {
        success: true,
        error: "Password reset unavailable (Firebase not configured).",
      };
    }
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err: unknown) {
      const error = err as Error;
      return { success: false, error: error.message || "Failed to send reset email." };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,

        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
