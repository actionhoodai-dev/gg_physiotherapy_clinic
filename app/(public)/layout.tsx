import React from "react";
import { TopBar } from "@/components/public/TopBar";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { StickyMobileCTA } from "@/components/public/StickyMobileCTA";
import { WhatsAppFAB } from "@/components/public/WhatsAppFAB";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFAB />
      <StickyMobileCTA />
    </div>
  );
}
