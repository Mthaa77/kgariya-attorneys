"use client";

import { ArrowUpRight, Lock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { BADGES, FIRM, PRACTICE_AREAS } from "@/lib/site-data";
import { Logo } from "./logo";
import { Icon } from "./icon";
import { Button } from "@/components/ui/button";
import { Crest } from "./logo";

const FIRM_LINKS = [
  { label: "Our People", route: "#/people" },
  { label: "About the Firm", route: "#/about" },
  { label: "Kgariya & Co Group", route: "#/group" },
  { label: "Insights", route: "#/insights" },
  { label: "Joining the Firm", route: "#/joining" },
  { label: "Careers", route: "#/careers" },
  { label: "Contact", route: "#/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy (POPIA)", tab: "privacy" },
  { label: "PAIA Manual", tab: "paia" },
  { label: "Cookie Policy", tab: "cookies" },
  { label: "Website Terms", tab: "terms" },
  { label: "LPC Disclosures", tab: "lpc" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy-950 text-white">
      <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-gold-500/10 blur-[120px]" />

      {/* CTA band */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 lg:flex-row lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Next step
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Book a consultation — video, telephone, or in person in Pretoria.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant="gold"
              className="h-12 rounded-full px-7"
              onClick={() => useSite.getState().openDialog("booking")}
            >
              Book a consultation
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline-light"
              className="h-12 rounded-full px-7"
              onClick={() => navigate("#/contact")}
            >
              Practice-routed enquiry
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/65">
            A Pretoria commercial disputes and finance practice with deep property
            and real estate development packaging expertise. We prove capability
            through matters, credentials and people — evidence over slogans.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {BADGES.slice(0, 3).map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1.5 text-[11px] font-semibold text-gold-200"
              >
                <ShieldCheck className="h-3 w-3" />
                {b.label}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Practice areas">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">
            Practice Areas
          </h3>
          <ul className="mt-5 space-y-3">
            {PRACTICE_AREAS.map((p) => (
              <li key={p.slug}>
                <button
                  onClick={() => navigate(`#/practice/${p.slug}`)}
                  className="group flex items-center gap-2.5 text-left text-[13.5px] text-white/70 transition-colors hover:text-gold-300"
                >
                  <span className="text-[10px] font-bold text-gold-500/80">
                    {p.number}
                  </span>
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Firm">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">
            The Firm
          </h3>
          <ul className="mt-5 space-y-3">
            {FIRM_LINKS.map((l) => (
              <li key={l.route}>
                <button
                  onClick={() => navigate(l.route)}
                  className="text-[13.5px] text-white/70 transition-colors hover:text-gold-300"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">
            Legal
          </h3>
          <ul className="mt-5 space-y-3">
            {LEGAL_LINKS.map((l) => (
              <li key={l.tab}>
                <button
                  onClick={() => navigate(`#/legal?${l.tab}`)}
                  className="flex items-center gap-1.5 text-[13.5px] text-white/70 transition-colors hover:text-gold-300"
                >
                  {l.tab === "paia" && <Lock className="h-3 w-3 text-gold-500/70" />}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-400">
            Office Directory
          </h3>
          <ul className="mt-5 space-y-4 text-[13.5px] text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {FIRM.address.line1}
                <br />
                {FIRM.address.line2}
                <br />
                {FIRM.address.city} {FIRM.address.postal}
              </span>
            </li>
            <li>
              <a
                href={FIRM.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-gold-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                {FIRM.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${FIRM.email}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-300"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                {FIRM.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[12px] font-semibold text-gold-300">Office hours</p>
            <p className="mt-1 text-[12.5px] text-white/60">{FIRM.hours}</p>
            <p className="mt-2 text-[12px] text-white/50">
              Consultations by video, telephone or in person.
            </p>
          </div>
        </div>
      </div>

      {/* Compliance strip */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6">
          {BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <Crest dark className="h-6 w-6 opacity-80" />
              <div className="leading-tight">
                <p className="text-[11.5px] font-bold text-white/85">{b.label}</p>
                <p className="text-[10px] text-white/45">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} {FIRM.name}. All rights reserved. Attorneys,
            Notaries & Conveyancers — registered with the Legal Practice Council.
          </p>
          <p className="font-display text-[12.5px] italic text-gold-400">
            {FIRM.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
