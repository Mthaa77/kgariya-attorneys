import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kgariya Attorneys Incorporated | Commercial Litigation & Development Finance Attorneys, Pretoria",
    template: "%s | Kgariya Attorneys Incorporated",
  },
  description:
    "Kgariya Attorneys Incorporated is a Pretoria commercial disputes and finance practice specialising in High Court litigation, AFSA arbitration, real estate development packaging, mining-adjacent services, agricultural and development finance, banking and conveyancing.",
  keywords: [
    "commercial litigation Pretoria",
    "arbitration attorneys Gauteng",
    "AFSA arbitration South Africa",
    "real estate development packaging",
    "development finance attorneys",
    "conveyancing Pretoria",
    "mining law attorneys",
    "Land Bank legal panel",
    "banking and finance attorneys",
    "Kgariya Attorneys Incorporated",
  ],
  authors: [{ name: "Kgariya Attorneys Incorporated" }],
  icons: {
    icon: "/crest.svg",
  },
  openGraph: {
    title: "Kgariya Attorneys Incorporated",
    description:
      "A Pretoria commercial disputes and finance practice with deep property and development packaging expertise. Evidence over slogans.",
    url: "https://www.kgariyainc.co.za",
    siteName: "Kgariya Attorneys Incorporated",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kgariya Attorneys Incorporated",
    description:
      "Commercial litigation, arbitration, real estate development packaging and development finance — Pretoria, South Africa.",
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
        className={`${display.variable} ${body.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
