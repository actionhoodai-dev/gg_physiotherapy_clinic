import React from "react";
import { defaultSettings } from "@/lib/defaultData";

export function SchemaOrg() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": "https://ggphysiotherapy.com/#clinic",
    name: defaultSettings.clinicName,
    alternateName: "GG Physiotherapy Clinic Perungudi Chennai",
    description:
      "Advanced orthopedic, spine, and neurological physical therapy clinic led by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP, FOMT (AUS), MSC Osteopathy & Dry Needle Therapist) in Perungudi, Chennai.",
    url: "https://ggphysiotherapy.com",
    telephone: defaultSettings.phone,
    email: defaultSettings.email,
    medicalSpecialty: [
      "Physiotherapy",
      "Orthopedics",
      "NeurologicalRehabilitation",
      "SportsMedicine",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: defaultSettings.address,
      addressLocality: defaultSettings.area,
      addressRegion: "Tamil Nadu",
      postalCode: defaultSettings.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: defaultSettings.latitude,
      longitude: defaultSettings.longitude,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "13:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "17:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "13:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Dr. Sundaravalli Jayakumar",
      jobTitle: "Chief Consultant Physiotherapist",
      honorificPrefix: "Dr.",
      hasCredential: [
        "B.P.T (Bachelor of Physiotherapy)",
        "M.P.T ORTHO (Master of Physiotherapy in Orthopedics)",
        "DNT (Diploma in Neuro Therapy)",
        "MIAP (Member of Indian Association of Physiotherapists)",
      ],
    },
    priceRange: "₹₹",
    hasMap: defaultSettings.googleMapsUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
