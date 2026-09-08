export interface ClinicSettings {
  id?: string;
  clinicName: string;
  tagline: string;
  logo: string;
  favicon?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  googleBusinessProfileUrl: string;
  googleReviewUrl?: string;
  latitude: number;
  longitude: number;
  workingHours: {
    monSat: string;
    sunday: string;
    notes?: string;
  };
  emergencyContact: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  appointmentSettings: {
    consultationFee: string;
    allowClinic: boolean;
    allowHomeVisit: boolean;
    allowOnline: boolean;
    slotIntervalMinutes: number;
  };
  whatsappTemplate: string;
  updatedAt?: string;
}

export interface HomepageCMS {
  id?: string;
  announcement: {
    text: string;
    enabled: boolean;
    linkText?: string;
    linkUrl?: string;
  };
  hero: {
    badge: string;
    title: string;
    highlightWord: string;
    subtitle: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    heroImage: string;
    ratingNumber: number;
    reviewCount: number;
    experienceYears: number;
    patientsTreated: string;
  };
  trustStats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  aboutClinic: {
    badge: string;
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    bulletPoints: string[];
    image: string;
    doctorName: string;
    doctorTitle: string;
    doctorQualifications: string;
  };
  whyChooseUs: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  treatmentProcess: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  finalCta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  thumbnail: string;
  benefits: string[];
  treatmentApproach: string;
  suitableFor: string[];
  durationInfo: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedConditions: string[];
  relatedServices: string[];
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConditionItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedContent: string;
  symptoms: string[];
  treatmentApproach: string;
  whenToSeekHelp: string;
  relatedServices: string[];
  image: string;
  faqs: Array<{ question: string; answer: string }>;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TherapistItem {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  yearsOfExperience: number;
  specialization: string[];
  biography: string;
  profileImage: string;
  additionalImages?: string[];
  languages: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  review: string;
  rating: number;
  treatment: string;
  patientImage?: string;
  location?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  source: 'google' | 'direct';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facility' | 'equipment' | 'rehab' | 'consultation' | 'all';
  imageUrl: string;
  caption?: string;
  altText: string;
  displayOrder: number;
  createdAt: string;
}

export interface AppointmentItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredService: string;
  preferredDate: string;
  preferredTime: string;
  consultationMode: 'clinic' | 'home' | 'online';
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  published: boolean;
}

export interface SEOSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  canonicalBase: string;
  ogImage: string;
  localAreaTargeting: string[];
}

export interface MediaItem {
  id: string;
  publicId: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  altText?: string;
  caption?: string;
  category?: string;
  createdAt: string;
}
