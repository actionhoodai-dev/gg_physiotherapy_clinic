import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  ClinicSettings,
  HomepageCMS,
  ServiceItem,
  ConditionItem,
  TherapistItem,
  TestimonialItem,
  GalleryItem,
  AppointmentItem,
  EnquiryItem,
  BlogPostItem,
  FAQItem,
  SEOSettings,
} from "@/types";
import {
  defaultSettings,
  defaultHomepageCMS,
  defaultServices,
  defaultConditions,
  defaultTherapists,
  defaultTestimonials,
  defaultGallery,
  defaultBlogPosts,
  defaultFAQs,
  defaultSEOSettings,
} from "./defaultData";

/* =========================================================================
   1. CLINIC SETTINGS
   ========================================================================= */

export async function getClinicSettings(): Promise<ClinicSettings> {
  // 1. In browser, fetch from /api/settings
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        return (await res.json()) as ClinicSettings;
      }
    } catch (e) {
      console.warn("Client fetch /api/settings error:", e);
    }
  }

  // 2. On server, read local file first if present
  if (typeof window === "undefined") {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "data", "clinicSettings.json");
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        return { ...defaultSettings, ...JSON.parse(content) };
      }
    } catch (e) {
      // ignore
    }
  }

  // 3. Fallback to Firestore
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "settings", "general");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { ...defaultSettings, ...snap.data() } as ClinicSettings;
      }
    } catch (err) {
      console.error("Error fetching clinic settings from Firestore:", err);
    }
  }

  return defaultSettings;
}

export async function updateClinicSettings(settings: Partial<ClinicSettings>): Promise<void> {
  // 1. In browser, POST to /api/settings
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        return;
      }
    } catch (e) {
      console.warn("Client update /api/settings error:", e);
    }
  }

  // 2. On server, save to local data file
  if (typeof window === "undefined") {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "clinicSettings.json");
      const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : {};
      fs.writeFileSync(
        filePath,
        JSON.stringify(
          { ...defaultSettings, ...existing, ...settings, updatedAt: new Date().toISOString() },
          null,
          2
        ),
        "utf-8"
      );
    } catch (e) {
      // ignore
    }
  }

  // 3. Sync to Firestore
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "settings", "general");
      await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error("Firestore updateClinicSettings error:", err);
    }
  }
}

/* =========================================================================
   2. HOMEPAGE CMS
   ========================================================================= */

export async function getHomepageCMS(): Promise<HomepageCMS> {
  if (!db || !isFirebaseConfigured()) return defaultHomepageCMS;
  try {
    const docRef = doc(db, "homepage", "content");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as HomepageCMS;
      if (data.trustStats) {
        data.trustStats = data.trustStats.map((s) =>
          s.label === "Clinical Experience" ? { ...s, value: "10+ Years" } : s
        );
      }
      return data;
    }
  } catch (err) {
    console.error("Error fetching homepage CMS from Firestore:", err);
  }
  return defaultHomepageCMS;
}

export async function updateHomepageCMS(content: Partial<HomepageCMS>): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "homepage", "content");
  await setDoc(docRef, { ...content, updatedAt: new Date().toISOString() }, { merge: true });
}

/* =========================================================================
   3. SERVICES
   ========================================================================= */

export async function getServices(onlyPublished = false): Promise<ServiceItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return onlyPublished ? defaultServices.filter((s) => s.published) : defaultServices;
  }
  try {
    const colRef = collection(db, "services");
    const q = onlyPublished
      ? query(colRef, where("published", "==", true), orderBy("displayOrder", "asc"))
      : query(colRef, orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem));
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  }
  return onlyPublished ? defaultServices.filter((s) => s.published) : defaultServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  if (db && isFirebaseConfigured()) {
    try {
      const colRef = collection(db, "services");
      const q = query(colRef, where("slug", "==", slug), where("published", "==", true), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { id: snap.docs[0].id, ...snap.docs[0].data() } as ServiceItem;
      }
    } catch (err) {
      console.error("Error fetching service by slug:", err);
    }
  }
  return defaultServices.find((s) => s.slug === slug && s.published) || defaultServices.find((s) => s.slug === slug) || null;
}

export async function saveService(service: ServiceItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "services", service.id);
  await setDoc(docRef, { ...service, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteService(serviceId: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "services", serviceId);
  await deleteDoc(docRef);
}

/* =========================================================================
   4. CONDITIONS
   ========================================================================= */

export async function getConditions(onlyPublished = false): Promise<ConditionItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return onlyPublished ? defaultConditions.filter((c) => c.published) : defaultConditions;
  }
  try {
    const colRef = collection(db, "conditions");
    const q = onlyPublished
      ? query(colRef, where("published", "==", true), orderBy("displayOrder", "asc"))
      : query(colRef, orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ConditionItem));
    }
  } catch (err) {
    console.error("Error fetching conditions:", err);
  }
  return onlyPublished ? defaultConditions.filter((c) => c.published) : defaultConditions;
}

export async function getConditionBySlug(slug: string): Promise<ConditionItem | null> {
  if (db && isFirebaseConfigured()) {
    try {
      const colRef = collection(db, "conditions");
      const q = query(colRef, where("slug", "==", slug), where("published", "==", true), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { id: snap.docs[0].id, ...snap.docs[0].data() } as ConditionItem;
      }
    } catch (err) {
      console.error("Error fetching condition by slug:", err);
    }
  }
  return defaultConditions.find((c) => c.slug === slug && c.published) || defaultConditions.find((c) => c.slug === slug) || null;
}

export async function saveCondition(condition: ConditionItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "conditions", condition.id);
  await setDoc(docRef, { ...condition, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteCondition(conditionId: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "conditions", conditionId);
  await deleteDoc(docRef);
}

/* =========================================================================
   5. THERAPISTS
   ========================================================================= */

export async function getTherapists(onlyActive = false): Promise<TherapistItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return onlyActive ? defaultTherapists.filter((t) => t.active) : defaultTherapists;
  }
  try {
    const colRef = collection(db, "therapists");
    const q = onlyActive
      ? query(colRef, where("active", "==", true), orderBy("displayOrder", "asc"))
      : query(colRef, orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as TherapistItem));
    }
  } catch (err) {
    console.error("Error fetching therapists:", err);
  }
  return onlyActive ? defaultTherapists.filter((t) => t.active) : defaultTherapists;
}

export async function saveTherapist(therapist: TherapistItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "therapists", therapist.id);
  await setDoc(docRef, { ...therapist, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteTherapist(therapistId: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "therapists", therapistId);
  await deleteDoc(docRef);
}

/* =========================================================================
   6. TESTIMONIALS
   ========================================================================= */

export async function getTestimonials(onlyPublished = false): Promise<TestimonialItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return onlyPublished ? defaultTestimonials.filter((t) => t.published) : defaultTestimonials;
  }
  try {
    const colRef = collection(db, "testimonials");
    const q = onlyPublished
      ? query(colRef, where("published", "==", true), orderBy("displayOrder", "asc"))
      : query(colRef, orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TestimonialItem));
      // If Firestore only has a few legacy seed items, merge with our full list of Google reviews
      if (items.length < defaultTestimonials.length) {
        const itemIds = new Set(items.map((i) => i.id));
        const missing = defaultTestimonials.filter((d) => !itemIds.has(d.id));
        return [...items, ...(onlyPublished ? missing.filter((t) => t.published) : missing)];
      }
      return items;
    }
  } catch (err) {
    console.error("Error fetching testimonials:", err);
  }
  return onlyPublished ? defaultTestimonials.filter((t) => t.published) : defaultTestimonials;
}

export async function saveTestimonial(testimonial: TestimonialItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "testimonials", testimonial.id);
  await setDoc(docRef, testimonial, { merge: true });
}

export async function deleteTestimonial(testimonialId: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "testimonials", testimonialId);
  await deleteDoc(docRef);
}

/* =========================================================================
   7. GALLERY
   ========================================================================= */

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!db || !isFirebaseConfigured()) return defaultGallery;
  try {
    const colRef = collection(db, "gallery");
    const q = query(colRef, orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
    }
  } catch (err) {
    console.error("Error fetching gallery items:", err);
  }
  return defaultGallery;
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "gallery", item.id);
  await setDoc(docRef, item, { merge: true });
}

export async function deleteGalleryItem(itemId: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "gallery", itemId);
  await deleteDoc(docRef);
}

/* =========================================================================
   8. APPOINTMENTS
   ========================================================================= */

export async function getAppointments(): Promise<AppointmentItem[]> {
  if (!db || !isFirebaseConfigured()) return [];
  try {
    const colRef = collection(db, "appointments");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AppointmentItem));
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return [];
  }
}

export async function createAppointment(
  data: Omit<AppointmentItem, "id" | "status" | "createdAt">
): Promise<string> {
  const id = `apt-${Date.now()}`;
  const appointment: AppointmentItem = {
    ...data,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "appointments", id);
      await setDoc(docRef, appointment);
    } catch (err) {
      console.error("Firestore appointment save error:", err);
    }
  }
  return id;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentItem["status"],
  notes?: string
): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "appointments", id);
  await updateDoc(docRef, {
    status,
    ...(notes !== undefined ? { notes } : {}),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteAppointment(id: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "appointments", id);
  await deleteDoc(docRef);
}

/* =========================================================================
   9. ENQUIRIES
   ========================================================================= */

export async function getEnquiries(): Promise<EnquiryItem[]> {
  if (!db || !isFirebaseConfigured()) return [];
  try {
    const colRef = collection(db, "enquiries");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EnquiryItem));
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    return [];
  }
}

export async function createEnquiry(
  data: Omit<EnquiryItem, "id" | "status" | "createdAt">
): Promise<string> {
  const id = `enq-${Date.now()}`;
  const enquiry: EnquiryItem = {
    ...data,
    id,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, "enquiries", id);
      await setDoc(docRef, enquiry);
    } catch (err) {
      console.error("Firestore enquiry save error:", err);
    }
  }
  return id;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryItem["status"]
): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "enquiries", id);
  await updateDoc(docRef, { status });
}

export async function deleteEnquiry(id: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "enquiries", id);
  await deleteDoc(docRef);
}

/* =========================================================================
   10. BLOGS & FAQS
   ========================================================================= */

export async function getBlogPosts(onlyPublished = false): Promise<BlogPostItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return onlyPublished ? defaultBlogPosts.filter((b) => b.published) : defaultBlogPosts;
  }
  try {
    const colRef = collection(db, "blogs");
    const q = onlyPublished
      ? query(colRef, where("published", "==", true), orderBy("publishedAt", "desc"))
      : query(colRef, orderBy("publishedAt", "desc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPostItem));
    }
  } catch (err) {
    console.error("Error fetching blog posts:", err);
  }
  return onlyPublished ? defaultBlogPosts.filter((b) => b.published) : defaultBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  if (db && isFirebaseConfigured()) {
    try {
      const colRef = collection(db, "blogs");
      const q = query(colRef, where("slug", "==", slug), where("published", "==", true), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { id: snap.docs[0].id, ...snap.docs[0].data() } as BlogPostItem;
      }
    } catch (err) {
      console.error("Error fetching blog post by slug:", err);
    }
  }
  return defaultBlogPosts.find((b) => b.slug === slug && b.published) || defaultBlogPosts.find((b) => b.slug === slug) || null;
}

export async function saveBlogPost(post: BlogPostItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "blogs", post.id);
  await setDoc(docRef, { ...post, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "blogs", id);
  await deleteDoc(docRef);
}

export async function getFAQs(onlyPublished = false): Promise<FAQItem[]> {
  if (!db || !isFirebaseConfigured()) {
    return onlyPublished ? defaultFAQs.filter((f) => f.published) : defaultFAQs;
  }
  try {
    const colRef = collection(db, "faqs");
    const q = onlyPublished
      ? query(colRef, where("published", "==", true), orderBy("displayOrder", "asc"))
      : query(colRef, orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQItem));
    }
  } catch (err) {
    console.error("Error fetching FAQs:", err);
  }
  return onlyPublished ? defaultFAQs.filter((f) => f.published) : defaultFAQs;
}

export async function saveFAQ(faq: FAQItem): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "faqs", faq.id);
  await setDoc(docRef, faq, { merge: true });
}

export async function deleteFAQ(id: string): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "faqs", id);
  await deleteDoc(docRef);
}

export async function getTherapistBySlug(slug: string): Promise<TherapistItem | null> {
  const all = await getTherapists(true);
  return all.find((t) => t.name.toLowerCase().replace(/[\s.]+/g, "-").replace(/[^a-z0-9-]/g, "") === slug) || null;
}

/* =========================================================================
   12. SEO SETTINGS
   ========================================================================= */

export async function getSEOSettings(): Promise<SEOSettings> {
  if (!db || !isFirebaseConfigured()) return defaultSEOSettings;
  try {
    const docRef = doc(db, "settings", "seo");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as SEOSettings;
    }
  } catch (err) {
    console.error("Error fetching SEO settings:", err);
  }
  return defaultSEOSettings;
}

export async function updateSEOSettings(settings: Partial<SEOSettings>): Promise<void> {
  if (!db || !isFirebaseConfigured()) return;
  const docRef = doc(db, "settings", "seo");
  await setDoc(docRef, settings, { merge: true });
}

/* =========================================================================
   13. ONE-CLICK DATABASE SEEDER (FOR ADMIN)
   ========================================================================= */

export async function seedFirestoreDatabase(): Promise<{ success: boolean; message: string }> {
  if (!db || !isFirebaseConfigured()) {
    return {
      success: false,
      message: "Firebase is not configured. Please add your credentials in .env.local first.",
    };
  }

  try {
    // 1. Settings
    await setDoc(doc(db, "settings", "general"), defaultSettings);

    // 2. Homepage CMS
    await setDoc(doc(db, "homepage", "content"), defaultHomepageCMS);

    // 3. Services
    for (const service of defaultServices) {
      await setDoc(doc(db, "services", service.id), service);
    }

    // 4. Conditions
    for (const condition of defaultConditions) {
      await setDoc(doc(db, "conditions", condition.id), condition);
    }

    // 5. Therapists
    for (const therapist of defaultTherapists) {
      await setDoc(doc(db, "therapists", therapist.id), therapist);
    }

    // 6. Testimonials
    for (const testimonial of defaultTestimonials) {
      await setDoc(doc(db, "testimonials", testimonial.id), testimonial);
    }

    // 7. Gallery
    for (const item of defaultGallery) {
      await setDoc(doc(db, "gallery", item.id), item);
    }

    // 8. Blogs
    for (const blog of defaultBlogPosts) {
      await setDoc(doc(db, "blogs", blog.id), blog);
    }

    // 9. FAQs
    for (const faq of defaultFAQs) {
      await setDoc(doc(db, "faqs", faq.id), faq);
    }

    // 10. SEO
    await setDoc(doc(db, "settings", "seo"), defaultSEOSettings);

    return {
      success: true,
      message: "All GG Physiotherapy default data seeded successfully to Firestore!",
    };
  } catch (error: any) {
    console.error("Database seed error:", error);
    return {
      success: false,
      message: error?.message || "Failed to seed database.",
    };
  }
}

