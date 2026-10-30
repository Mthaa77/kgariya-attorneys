"use client";

import Image from "next/image";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { BADGES, FIRM, TRUST_PILLARS } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { Counter } from "@/components/site/counter";
import { Button } from "@/components/ui/button";
import { COUNTERS } from "@/lib/site-data";
import {
  CredentialWall,
  CourtsMarquee,
  ActsStrip,
  RegulationBoard,
  SAFlagChip,
} from "@/components/site/sa-legal";

const TIMELINE = [
  {
    era: "Origins",
    title: "A general practice — and a lesson",
    text: "The firm's legacy listed over forty sub-services, from aviation to immigration. Institutional clients, we learned, do not want width. They want depth they can verify.",
  },
  {
    era: "The pivot",
    title: "Retiring 40 sub-services, by design",
    text: "Kgariya Inc. formally retired non-core areas — competition, aviation, immigration among them — and concentrated its operational infrastructure on six prioritised competencies.",
  },
  {
    era: "Today",
    title: "Litigation-led, development-anchored",
    text: "A Pretoria commercial disputes and finance practice: High Court and AFSA work, end-to-end development packaging, and panel-ready banking, agri-finance and conveyancing capacity.",
  },
  {
    era: "Next",
    title: "Growth by honourable succession",
    text: "The “Joining the Firm” model scales the practice by merging the mandates of retiring practitioners — continuity for their clients, careers for their staff.",
  },
];

export function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About the firm"
        title="Built on evidence. Structured for institutions."
        lead="Kgariya Attorneys Incorporated occupies a distinct, authoritative position in the South African legal market — specialised, compliant and commercially astute."
        image="/images/office.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "About the Firm" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            variant="gold"
            className="h-12 rounded-full px-7"
            onClick={() => navigate("#/people")}
          >
            Meet the director
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            className="h-12 rounded-full px-7"
            onClick={() => navigate("#/legal")}
          >
            Compliance & disclosures
          </Button>
        </div>
      </PageHero>

      {/* Story + timeline */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Strategic intent"
                title={
                  <>
                    The institutional{" "}
                    <span className="gold-text italic">leap forward</span>.
                  </>
                }
                lead="To address the increasingly complex regulatory and commercial demands of Gauteng's public and private sectors, Kgariya Inc. undertook a deliberate strategic pivot away from generalized legal provision."
              />
              <div className="mt-6 space-y-5">
                <Reveal>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Recognising that institutional clients demand specialised depth
                    rather than superficial width, the firm retired its historical
                    generalist model and concentrated its strategic assets around six
                    prioritised core competencies. This realignment ensures
                    institutional clients access high-value legal expertise backed by
                    direct commercial execution experience — optimising attorney
                    resource allocation, accelerating transaction close times, and
                    delivering risk-adjusted legal strategy across high-stakes
                    disputes and development finance structures.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    The firm operates from Walker Creek Office Park in Pretoria with
                    the strategic support of the broader Kgariya &amp; Co Group —
                    real-world development, construction and advisory capability that
                    keeps our legal work anchored to project cash flows and commercial
                    risk, not abstractions.
                  </p>
                </Reveal>
              </div>

              {/* Counters mini */}
              <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {COUNTERS.map((c) => (
                  <StaggerItem key={c.label}>
                    <div className="rounded-2xl bg-ivory p-5 text-center">
                      <p className="font-display text-2xl font-semibold text-navy-900 sm:text-[1.7rem]">
                        <Counter value={c.value} suffix={c.suffix} />
                      </p>
                      <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
                        {c.label}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Timeline */}
            <div className="relative">
              <Reveal>
                <div className="relative overflow-hidden rounded-[2rem] shadow-luxe-lg">
                  <Image
                    src="/images/library.png"
                    alt="The firm's law library"
                    width={1344}
                    height={768}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                </div>
              </Reveal>
              <div className="relative mt-8 space-y-0">
                {TIMELINE.map((t, i) => (
                  <Reveal key={t.era} delay={i * 0.06}>
                    <div className="relative border-l-2 border-navy-100 pb-8 pl-8 last:pb-0">
                      <span
                        className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-[3px] ${
                          i === 2
                            ? "border-gold-500 bg-gold-200 shadow-gold"
                            : "border-gold-500 bg-white"
                        }`}
                      />
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700">
                        {t.era}
                      </p>
                      <h3 className="mt-2 font-display text-[17.5px] font-semibold text-navy-900">
                        {t.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                        {t.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / trust pillars */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="texture-grid-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            dark
            align="center"
            eyebrow="Institutional values"
            title={
              <>
                “Evidence over slogans” is an{" "}
                <span className="gold-text italic">operating system</span>.
              </>
            }
            lead="The firm explicitly rejects generic corporate rhetoric. Every claim on this site is backed by verifiable, objective proof — these four pillars enforce that."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2" gap={0.1}>
            {TRUST_PILLARS.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="group flex h-full gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:border-gold-500/40 hover:bg-white/10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon name={p.icon} className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[17.5px] font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/65">
                      {p.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Location & credentials */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Visit us"
              title={
                <>
                  Walker Creek Office Park,{" "}
                  <span className="gold-text italic">Pretoria</span>.
                </>
              }
            />
            <Reveal delay={0.08}>
              <div className="mt-8 rounded-3xl border border-navy-100 bg-white p-7 shadow-luxe">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-[16.5px] font-semibold text-navy-900">
                      Physical office
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                      {FIRM.address.line1}
                      <br />
                      {FIRM.address.line2}
                      <br />
                      {FIRM.address.city}, {FIRM.address.province} {FIRM.address.postal}
                      <br />
                      {FIRM.address.country}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FIRM.mapsQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline mt-3 inline-block text-[13px] font-bold text-gold-700"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-navy-100 pt-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
                      Telephone
                    </p>
                    <a
                      href={FIRM.phoneHref}
                      className="mt-1 block text-[14px] font-semibold text-navy-900"
                    >
                      {FIRM.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
                      Office hours
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-navy-900">
                      {FIRM.hours}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-navy-100 pt-6">
                  <SAFlagChip />
                  <p className="mt-3 text-[12px] text-muted-foreground">
                    Serving clients across Gauteng and nationwide — consultations
                    by video, telephone or in person.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              eyebrow="Credentials"
              title={
                <>
                  Status you can{" "}
                  <span className="gold-text italic">confirm on request</span>.
                </>
              }
            />
            <div className="mt-8 space-y-3">
              {BADGES.map((b, i) => (
                <Reveal key={b.label} delay={i * 0.05}>
                  <div className="flex items-center justify-between rounded-2xl border border-navy-100 bg-white px-6 py-4 shadow-sm transition-shadow hover:shadow-luxe">
                    <div className="flex items-center gap-3.5">
                      <ShieldCheck className="h-5 w-5 text-gold-600" />
                      <span className="text-[14px] font-bold text-navy-900">
                        {b.label}
                      </span>
                    </div>
                    <span className="text-[12px] text-muted-foreground">{b.sub}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[12.5px] leading-relaxed text-muted-foreground">
                Formal verification certificates, the PAIA Information Manual and
                LPC registration details are available immediately upon request —
                see our{" "}
                <button
                  onClick={() => navigate("#/legal")}
                  className="font-bold text-gold-700 underline-offset-2 hover:underline"
                >
                  legal &amp; compliance page
                </button>
                .
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-700">
                  Admissions &amp; professional standing
                </p>
                <CredentialWall className="mt-5" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— SA legal ecosystem — courts, regulation & statute ——— */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="The South African legal system"
            title={
              <>
                Courts, regulators &amp; statute —{" "}
                <span className="gold-text italic">our daily workplace</span>.
              </>
            }
            lead="South African law is practised in specific rooms before specific bodies. This is where our mandates live — the superior courts, specialist tribunals, registries and the statutes that govern them."
          />
          <div className="-mx-6 mt-10">
            <CourtsMarquee />
          </div>
          <div className="mt-14">
            <Reveal>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-700">
                    Regulation &amp; standing
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                    Regulated. Admitted. <span className="gold-text italic">Audited.</span>
                  </h3>
                </div>
                <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                  Every standing claim is verifiable — certificates, enrolments
                  and audit letters are produced on request.
                </p>
              </div>
            </Reveal>
            <div className="mt-9">
              <RegulationBoard />
            </div>
          </div>
          <Reveal delay={0.1} className="mt-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-700">
              Statutory framework
            </p>
            <div className="mt-5">
              <ActsStrip />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
