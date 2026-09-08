import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { defaultSEOSettings } from "@/lib/defaultData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A363D",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ggphysiotherapy.com"),
  title: {
    default: defaultSEOSettings.defaultTitle,
    template: defaultSEOSettings.titleTemplate,
  },
  description: defaultSEOSettings.defaultDescription,
  keywords: defaultSEOSettings.keywords,
  authors: [{ name: "Dr. Sundaravalli Jayakumar" }],
  creator: "GG Physiotherapy Clinic",
  publisher: "GG Physiotherapy Clinic",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ggphysiotherapy.com",
    siteName: "GG Physiotherapy Clinic",
    title: defaultSEOSettings.defaultTitle,
    description: defaultSEOSettings.defaultDescription,
    images: [
      {
        url: defaultSEOSettings.ogImage,
        width: 1200,
        height: 630,
        alt: "GG Physiotherapy Clinic Perungudi Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEOSettings.defaultTitle,
    description: defaultSEOSettings.defaultDescription,
    images: [defaultSEOSettings.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <SchemaOrg />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-[#f8fafc] min-h-screen selection:bg-teal-100 selection:text-teal-900">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
