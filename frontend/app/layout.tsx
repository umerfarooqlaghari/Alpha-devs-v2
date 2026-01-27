import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Using Plus Jakarta Sans as it's very close to the target
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

import { getOptimizationData } from "@/lib/optimization";

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await getOptimizationData('*');

  return {
    title: globalData?.title || "Alpha Development",
    description: globalData?.description || "Take your business to the next level with Alpha Development",
    keywords: globalData?.keywords,
    openGraph: {
      title: globalData?.ogTitle || globalData?.title || "Alpha Development",
      description: globalData?.ogDescription || globalData?.description,
      images: globalData?.ogImage ? [{ url: globalData.ogImage }] : [],
    },
    icons: {
      icon: "/favicon.png",
    },
  };
}

import FloatingAvatar from "@/components/nfinite/FloatingAvatar";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getOptimizationData('*');

  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        {globalData?.headerScripts && (
          <div dangerouslySetInnerHTML={{ __html: globalData.headerScripts }} />
        )}
        {globalData?.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalData.structuredData) }}
          />
        )}
      </head>
      <body className="antialiased">
        {globalData?.bodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: globalData.bodyScripts }} />
        )}
        {children}
        <AnalyticsTracker />
        <FloatingAvatar />
        {globalData?.footerScripts && (
          <div dangerouslySetInnerHTML={{ __html: globalData.footerScripts }} />
        )}
      </body>
    </html>
  );
}
