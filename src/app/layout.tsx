import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const socialPreviewImage = "https://kgariya-attorneyzz.vercel.app/opengraph-image?v=20261111-brand-refresh";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kgariyainc.co.za"),
  title: {
    default: "Kgariya Attorneys Incorporated | Commercial, Property & Finance Attorneys, Pretoria",
    template: "%s | Kgariya Attorneys Incorporated",
  },
  description:
    "Kgariya Attorneys Incorporated is a South African commercial, property and finance practice providing representation in all courts, formal arbitration and other appropriate legal forums, alongside real estate development, packaging and advisory, banking and finance, and conveyancing services.",
  keywords: [
    "commercial litigation Pretoria",
    "arbitration attorneys Gauteng",
    "AFSA arbitration South Africa",
    "real estate development advisory Pretoria",
    "real estate development packaging Pretoria",
    "vehicle and asset finance debt collection",
    "home-loan debt collection",
    "land audits and land-rights due diligence",
    "town-planning advisory",
    "development finance attorneys",
    "conveyancing Pretoria",
    "mining law attorneys",
    "Land Bank legal panel",
    "banking and finance attorneys",
    "Kgariya Attorneys Incorporated",
  ],
  authors: [{ name: "Kgariya Attorneys Incorporated" }],
  icons: {
    icon: "/images/kgariya-mark.webp",
  },
  openGraph: {
    title: "Kgariya Attorneys Incorporated",
    description:
      "A South African commercial, property and finance practice offering court representation, formal arbitration, real estate development advisory and conveyancing. Evidence over slogans.",
    url: "https://www.kgariyainc.co.za",
    siteName: "Kgariya Attorneys Incorporated",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Kgariya Attorneys Incorporated premium navy-and-gold logo",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kgariya Attorneys Incorporated",
    description:
      "Commercial, property and finance law: court representation, formal arbitration, real estate development advisory and conveyancing — Pretoria, South Africa.",
    images: [socialPreviewImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1b33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <body
        className="font-sans antialiased bg-background text-foreground"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
