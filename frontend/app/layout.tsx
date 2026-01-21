import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Using Plus Jakarta Sans as it's very close to the target
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Alpha Development",
  description: "Re-creation of nfinitepaper.com",
  icons: {
    icon: "/next.svg",
  },
};

import FloatingAvatar from "@/components/nfinite/FloatingAvatar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="antialiased">
        {children}
        <FloatingAvatar />
      </body>
    </html>
  );
}
