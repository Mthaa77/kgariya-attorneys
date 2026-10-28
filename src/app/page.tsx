"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { parseRoute, useRoute } from "@/lib/router";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { CallbackDialog } from "@/components/site/callback-dialog";
import { SearchDialog } from "@/components/site/search-dialog";
import { ThreeQuestions } from "@/components/site/three-questions";
import { CookieConsent } from "@/components/site/cookie-consent";
import { FloatingContact } from "@/components/site/floating-contact";
import { PrototypeBanner } from "@/components/site/prototype-banner";
import { HomePage } from "@/components/pages/home";

/*
 * Route-level code splitting: only the home page ships in the initial bundle.
 * Every other route is a lazy chunk, fetched on first navigation — the landing
 * page paints and hydrates faster, and each route pays only for itself.
 * (Next requires each dynamic() options argument to be an inline object literal,
 * so the fallback is repeated — the shared RouteFallback keeps it readable.)
 */
const RouteFallback = () => (
  <div className="min-h-[72vh] bg-white" aria-busy="true" />
);

const PracticeAreaPage = dynamic(
  () => import("@/components/pages/practice-area").then((m) => ({ default: m.PracticeAreaPage })),
  { loading: () => <RouteFallback /> }
);
const Notfound = dynamic(
  () => import("@/components/pages/notfound").then((m) => ({ default: m.Notfound })),
  { loading: () => <RouteFallback /> }
);
const PeoplePage = dynamic(
  () => import("@/components/pages/people").then((m) => ({ default: m.PeoplePage })),
  { loading: () => <RouteFallback /> }
);
const AboutPage = dynamic(
  () => import("@/components/pages/about").then((m) => ({ default: m.AboutPage })),
  { loading: () => <RouteFallback /> }
);
const GroupPage = dynamic(
  () => import("@/components/pages/group").then((m) => ({ default: m.GroupPage })),
  { loading: () => <RouteFallback /> }
);
const InsightsPage = dynamic(
  () => import("@/components/pages/insights").then((m) => ({ default: m.InsightsPage })),
  { loading: () => <RouteFallback /> }
);
const ArticlePage = dynamic(
  () => import("@/components/pages/insights").then((m) => ({ default: m.ArticlePage })),
  { loading: () => <RouteFallback /> }
);
const JoiningPage = dynamic(
  () => import("@/components/pages/joining").then((m) => ({ default: m.JoiningPage })),
  { loading: () => <RouteFallback /> }
);
const CareersPage = dynamic(
  () => import("@/components/pages/careers").then((m) => ({ default: m.CareersPage })),
  { loading: () => <RouteFallback /> }
);
const ContactPage = dynamic(
  () => import("@/components/pages/contact").then((m) => ({ default: m.ContactPage })),
  { loading: () => <RouteFallback /> }
);
const LegalPage = dynamic(
  () => import("@/components/pages/legal").then((m) => ({ default: m.LegalPage })),
  { loading: () => <RouteFallback /> }
);

function PageContent({ route }: { route: string }) {
  const parts = parseRoute(route);
  const root = parts[0] ?? "";

  switch (root) {
    case "":
      return <HomePage />;
    case "practice":
      return <PracticeAreaPage slug={parts[1] ?? ""} />;
    case "people":
      return <PeoplePage />;
    case "about":
      return <AboutPage />;
    case "group":
      return <GroupPage />;
    case "insights":
      return parts[1] ? <ArticlePage slug={parts[1]} /> : <InsightsPage />;
    case "joining":
      return <JoiningPage />;
    case "careers":
      return <CareersPage />;
    case "contact":
      return <ContactPage />;
    case "legal":
      return <LegalPage />;
    default:
      return <Notfound />;
  }
}

export default function Site() {
  const route = useRoute();

  // Ensure we always have a hash route set
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PrototypeBanner />
        <AnimatePresence mode="wait">
          <motion.div
            key={route.split("?")[0]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageContent route={route} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Global overlays */}
      <BookingDialog />
      <CallbackDialog />
      <SearchDialog />
      <ThreeQuestions />
      <CookieConsent />
      <FloatingContact />
    </div>
  );
}
