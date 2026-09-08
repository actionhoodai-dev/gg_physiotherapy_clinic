import { MetadataRoute } from "next";
import { getServices, getConditions, getTherapists } from "@/lib/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ggphysiotherapy.com";

  // Core static clinical pages with curated crawl priority and change frequency
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/appointment`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/conditions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/therapists`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic clinical treatments, conditions, and specialist pages
  const [services, conditions, therapists] = await Promise.all([
    getServices(true),
    getConditions(true),
    getTherapists(true),
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt || s.createdAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const conditionRoutes: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${baseUrl}/conditions/${c.slug}`,
    lastModified: new Date(c.updatedAt || c.createdAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const therapistRoutes: MetadataRoute.Sitemap = therapists.map((t) => ({
    url: `${baseUrl}/therapists/${t.id}`,
    lastModified: new Date(t.updatedAt || t.createdAt || new Date()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...conditionRoutes,
    ...therapistRoutes,
  ];
}
