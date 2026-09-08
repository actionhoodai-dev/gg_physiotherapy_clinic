import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateIndianPhone(phone: string): boolean {
  // Cleans spaces, dashes, +91 or 0 prefix
  const cleaned = phone.replace(/[\s\-\(\)]/g, "").replace(/^(\+91|91|0)/, "");
  // Indian mobile numbers typically start with 6, 7, 8, 9 and have 10 digits
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, "");
}

export function formatIndianPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "").replace(/^(\+91|91|0)/, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  const cleanNumber = phone.replace(/[^0-9]/g, "");
  const formattedNumber = cleanNumber.startsWith("91")
    ? cleanNumber
    : cleanNumber.length === 10
    ? `91${cleanNumber}`
    : cleanNumber.replace(/^0/, "91");
  return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
}

export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
