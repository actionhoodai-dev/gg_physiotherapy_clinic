import { MetadataRoute } from "next";
import { getServices, getConditions } from "@/lib/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ggphysiotherapy.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/conditions",
    "/therapists",
    "/testimonials",
    "/gallery",
    "/faq",
    "/contact",
    "/appointment",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const [services, conditions] = await Promise.all([
    getServices(true),
    getConditions(true),
  ]);

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt || s.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const conditionRoutes = conditions.map((c) => ({
    url: `${baseUrl}/conditions/${c.slug}`,
    lastModified: new Date(c.updatedAt || c.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes, ...conditionRoutes];
}
