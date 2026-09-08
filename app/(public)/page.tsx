import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/public/home/HeroSection";
import { TrustStatsSection } from "@/components/public/home/TrustStatsSection";
import { HomePortalsSection } from "@/components/public/home/HomePortalsSection";
import { FirstVisitSection } from "@/components/public/home/FirstVisitSection";
import { WhyUsSection } from "@/components/public/home/WhyUsSection";
import { ProcessSection } from "@/components/public/home/ProcessSection";
import { TestimonialsSection } from "@/components/public/home/TestimonialsSection";
import { GoogleReviewBanner } from "@/components/public/home/GoogleReviewBanner";
import { LocationSection } from "@/components/public/home/LocationSection";
import { FinalCtaSection } from "@/components/public/home/FinalCtaSection";
import {
  getHomepageCMS,
  getTestimonials,
  getClinicSettings,
} from "@/lib/firestore";

export const revalidate = 60; // ISR revalidation every 60s

export const metadata: Metadata = {
  title: "GG Physiotherapy Clinic | Best Physiotherapist in Perungudi, Chennai",
  description:
    "Specialized orthopedic, spine, and neurological physical therapy in Perungudi, Chennai led by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP). 4.9★ rating with 312+ Google reviews. In-Clinic & Home Visits.",
};

export default async function HomePage() {
  const [cms, testimonials, settings] = await Promise.all([
    getHomepageCMS(),
    getTestimonials(true),
    getClinicSettings(),
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Official WhatsApp & Direct Booking Actions */}
      <HeroSection cms={cms} />

      {/* 2. Trust Stats Bar */}
      <TrustStatsSection stats={cms.trustStats} />

      {/* 3. Multi-Page Portals (About Doctor, Services, Conditions, Gallery) */}
      <HomePortalsSection />

      {/* 4. What to Expect on Your First Visit Walkthrough */}
      <FirstVisitSection />

      {/* 5. Treatment Journey & Clinical Methodology */}
      <ProcessSection process={cms.treatmentProcess} />

      {/* 6. Why Choose GG Physio */}
      <WhyUsSection whyUs={cms.whyChooseUs} />

      {/* 7. Verified Patient Testimonials (Google Reviews) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8. Direct Google Review Submission Callout */}
      <GoogleReviewBanner />

      {/* 9. Clinic Location & Interactive Google Map */}
      <LocationSection settings={settings} />

      {/* 10. Final Conversion CTA */}
      <FinalCtaSection cta={cms.finalCta} />
    </div>
  );
}
