import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Keep the social image on the live Vercel host until the firm's custom
// domain is connected during the official handover.
const socialPreviewImage =
  "https://kgariya-attorneyzz.vercel.app/opengraph-image?v=20261111-brand-refresh-v2";

export const metadata: Metadata = {
  metadataBase: new URL("https://kgariya-attorneyzz.vercel.app"),
  alternates: {
    canonical: "https://www.kgariyainc.co.za",
  },
  title: {
    default: "Kgariya Attorneys | Commercial, Property & Finance Attorneys, Pretoria",
    template: "%s | Kgariya Attorneys",
  },
  description:
    "Kgariya Attorneys is a South African legal practice focused on agricultural finance, banking and finance, commercial litigation and arbitration, mining-adjacent matters, real estate development and conveyancing, and mergers and acquisitions.",
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
    "mergers and acquisitions attorneys Pretoria",
    "mining law attorneys",
    "Land Bank legal panel",
    "banking and finance attorneys",
    "Kgariya Attorneys",
  ],
  authors: [{ name: "Kgariya Attorneys" }],
  icons: {
    icon: "/images/kgariya-mark.webp",
  },
  openGraph: {
    title: "Kgariya Attorneys",
    description:
      "A South African legal practice offering agricultural finance, banking and finance, commercial litigation and arbitration, mining-adjacent legal services, real estate development and conveyancing, and mergers and acquisitions. Evidence over slogans.",
    url: "https://www.kgariyainc.co.za",
    siteName: "Kgariya Attorneys",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "Kgariya Attorneys premium navy-and-gold logo",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kgariya Attorneys",
    description:
      "Agricultural finance, banking and finance, commercial litigation, mining-adjacent services, real estate development, conveyancing, and mergers and acquisitions — Pretoria, South Africa.",
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
