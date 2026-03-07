import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { IBM_Plex_Sans, Merriweather } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans"
});

const display = Merriweather({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Professional Accounting Services in Kazakhstan | BuxTax Kazakhstan",
    template: "%s | BuxTax Kazakhstan"
  },
  description: siteConfig.description,
  keywords: [
    "salary calculator Kazakhstan",
    "IP tax calculator Kazakhstan",
    "accounting services Kazakhstan",
    "accounting for IP Kazakhstan",
    "accounting for LLP Kazakhstan",
    "payroll accounting Kazakhstan",
    "VAT calculator Kazakhstan",
    "ЭСФ Kazakhstan"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Professional Accounting Services in Kazakhstan",
    description: siteConfig.description
  },
  alternates: {
    canonical: siteConfig.url
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: siteConfig.name,
    description: siteConfig.description,
    areaServed: "Kazakhstan",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: "KZ"
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    url: siteConfig.url
  };

  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="relative flex min-h-screen flex-col">
          <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-hero-grid" />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Link
          href="https://t.me/buxtaxkz"
          className="fixed bottom-5 right-5 z-40 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          Telegram
        </Link>
      </body>
    </html>
  );
}
