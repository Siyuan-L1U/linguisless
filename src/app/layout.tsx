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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-serif">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
