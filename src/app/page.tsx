"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { parseRoute, useRoute } from "@/lib/router";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { CallbackDialog } from "@/components/site/callback-dialog";
import { SearchDialog } from "@/components/site/search-dialog";
import { ThreeQuestions } from "@/components/site/three-questions";
import { CookieConsent } from "@/components/site/cookie-consent";
import { HomePage } from "@/components/pages/home";
import { PracticeAreaPage } from "@/components/pages/practice-area";
import { Notfound } from "@/components/pages/notfound";
import { PeoplePage } from "@/components/pages/people";
import { AboutPage } from "@/components/pages/about";
import { GroupPage } from "@/components/pages/group";
import { InsightsPage, ArticlePage } from "@/components/pages/insights";
import { JoiningPage } from "@/components/pages/joining";
import { CareersPage } from "@/components/pages/careers";
import { ContactPage } from "@/components/pages/contact";
import { LegalPage } from "@/components/pages/legal";

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
    </div>
  );
}
