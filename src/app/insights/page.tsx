import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { InsightsPage } from "@/components/pages/insights";

export const metadata: Metadata = {
  title: "Insights | Kgariya Attorneys Incorporated",
  description: "Practical legal updates and insights from Kgariya Attorneys Incorporated.",
  alternates: { canonical: "https://www.kgariyainc.co.za/insights" },
};

export default function InsightsRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1"><InsightsPage /></main>
      <Footer />
    </div>
  );
}
