import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getSiteChromeData } from "@/sanity/lib/data";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Jiffy Booth",
  description: "Premium photo booth experiences for events and celebrations.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings, services } = await getSiteChromeData();

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <ClientLayout
        siteSettings={settings}
        footerServiceLinks={services}
        interClassName={inter.className}
      >
        {children}
      </ClientLayout>
    </html>
  );
}
