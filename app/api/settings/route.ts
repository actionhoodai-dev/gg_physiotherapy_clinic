import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { defaultSettings } from "@/lib/defaultData";
import { ClinicSettings } from "@/types";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "clinicSettings.json");

export async function GET() {
  try {
    // 1. Check local persisted JSON file first
    if (fs.existsSync(SETTINGS_FILE_PATH)) {
      const fileData = fs.readFileSync(SETTINGS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json({ ...defaultSettings, ...parsed });
    }

    // 2. Check Firestore
    if (db && isFirebaseConfigured()) {
      const docRef = doc(db, "settings", "general");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return NextResponse.json({ ...defaultSettings, ...snap.data() });
      }
    }
  } catch (error) {
    console.error("Error reading clinic settings in API:", error);
  }

  return NextResponse.json(defaultSettings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updatedSettings: ClinicSettings = {
      ...defaultSettings,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // 1. Save to local data folder for guaranteed instant persistence
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE_PATH, JSON.stringify(updatedSettings, null, 2), "utf-8");

    // 2. Also save to Firestore if configured
    if (db && isFirebaseConfigured()) {
      try {
        const docRef = doc(db, "settings", "general");
        await setDoc(docRef, updatedSettings, { merge: true });
      } catch (firestoreError) {
        console.warn("Firestore sync warning in API route:", firestoreError);
      }
    }

    // 3. Immediately invalidate Next.js cache so the whole site re-renders with fresh business details
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/appointment");
      revalidatePath("/services");
      revalidatePath("/conditions");
      revalidatePath("/gallery");
      revalidatePath("/faq");
      revalidatePath("/testimonials");
    } catch (cacheError) {
      // ignore in environments where revalidatePath isn't active
    }

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error: any) {
    console.error("Error saving clinic settings:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to save settings" },
      { status: 500 }
    );
  }
}
