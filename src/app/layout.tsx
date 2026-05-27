import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { journalInfo } from "@/lib/articles";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: journalInfo.fullName,
    template: `%s | ${journalInfo.name}`,
  },
  description: journalInfo.description,
  keywords: ["linguistics", "satire", "humor", "academic journal", "open access"],
  openGraph: {
    title: journalInfo.fullName,
    description: journalInfo.tagline,
    type: "website",
    locale: "en_US",
  },
};

import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}