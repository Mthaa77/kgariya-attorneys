import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Preview links use the stable demo alias for their share image and URL.
// Production keeps its existing Vercel image host until the firm's official
// custom-domain handover is completed.
const isPreviewDeployment = process.env.VERCEL_ENV === "preview";
const previewOrigin = "https://kgariya-attorneys-demo2.vercel.app";
const productionOrigin = "https://kgariya-attorneyzz.vercel.app";
const siteOrigin = isPreviewDeployment ? previewOrigin : productionOrigin;
const socialPreviewImage = `${siteOrigin}/api/og?v=20261119-practice-explorer`;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
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
    url: isPreviewDeployment ? previewOrigin : "https://www.kgariyainc.co.za",
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
