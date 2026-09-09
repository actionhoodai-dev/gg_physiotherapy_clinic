import React from "react";
import { TopBar } from "@/components/public/TopBar";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { WhatsAppFAB } from "@/components/public/WhatsAppFAB";

import { getClinicSettings } from "@/lib/firestore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getClinicSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFAB settings={settings} />
    </div>
  );
}
