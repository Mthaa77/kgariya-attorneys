"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "kgariya-cookie-consent";

type Prefs = { necessary: true; analytics: boolean; marketing: boolean };

function load(): Prefs | "accepted" | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    if (raw === "accepted") return "accepted";
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const v = load();
    if (!v) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function save(value: Prefs | "accepted") {
    localStorage.setItem(
      KEY,
      value === "accepted" ? "accepted" : JSON.stringify(value)
    );
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-3xl sm:bottom-6"
          role="dialog"
          aria-label="Cookie preferences"
        >
          <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white/95 shadow-luxe-lg backdrop-blur-xl">
            {!managing ? (
              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-200/60">
                  <Cookie className="h-6 w-6 text-gold-700" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-[17px] font-semibold text-navy-900">
                    Cookies, in plain language
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    We use necessary cookies to run this site, and optional analytics
                    cookies to understand what is useful — all under POPIA. You
                    choose. Read our{" "}
                    <Link
                      href="#/legal"
                      className="font-semibold text-gold-700 underline-offset-2 hover:underline"
                    >
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    className="rounded-full border-navy-200 text-navy-900"
                    onClick={() => setManaging(true)}
                  >
                    Manage
                  </Button>
                  <Button
                    className="rounded-full bg-navy-950 font-bold text-white hover:bg-navy-800"
                    onClick={() => save("accepted")}
                  >
                    Accept all
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-7">
                <p className="font-display text-[17px] font-semibold text-navy-900">
                  Manage cookie preferences
                </p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between rounded-2xl bg-ivory px-5 py-4">
                    <div>
                      <p className="text-[14px] font-bold text-navy-900">
                        Strictly necessary
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Security, forms and core functionality. Always on.
                      </p>
                    </div>
                    <Switch checked disabled className="data-[state=checked]:bg-gold-500" />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-ivory px-5 py-4">
                    <div>
                      <p className="text-[14px] font-bold text-navy-900">Analytics</p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Anonymous usage statistics (POPIA-compliant, consent-gated).
                      </p>
                    </div>
                    <Switch
                      checked={prefs.analytics}
                      onCheckedChange={(v) => setPrefs({ ...prefs, analytics: v })}
                      className="data-[state=checked]:bg-gold-500"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-ivory px-5 py-4">
                    <div>
                      <p className="text-[14px] font-bold text-navy-900">Marketing</p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Remarketing and campaign measurement. Off by default.
                      </p>
                    </div>
                    <Switch
                      checked={prefs.marketing}
                      onCheckedChange={(v) => setPrefs({ ...prefs, marketing: v })}
                      className="data-[state=checked]:bg-gold-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => setManaging(false)}
                    className="text-[13px] font-semibold text-muted-foreground hover:text-navy-900"
                  >
                    Back
                  </button>
                  <Button
                    className="rounded-full bg-navy-950 font-bold text-white hover:bg-navy-800"
                    onClick={() => save(prefs)}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Save preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
