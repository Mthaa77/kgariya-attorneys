"use client";

import { ArrowRight, ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import {
  COUNTERS,
  DIRECTOR,
  FEE_MODELS,
  PRACTICE_AREAS,
  TRUST_PILLARS,
} from "@/lib/site-data";
import { ARTICLES } from "@/lib/insights";
import { HeroSlider } from "@/components/site/hero-slider";
import { LiveTicker } from "@/components/site/live-ticker";
import { TrustStrip } from "@/components/site/trust-strip";
import { Counter } from "@/components/site/counter";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { PracticeCard } from "@/components/site/practice-card";
import { Icon } from "@/components/site/icon";
import { JourneyStepper } from "@/components/site/journey";
import { FaqAccordion } from "@/components/site/faq";
import { SectorMatrix } from "@/components/site/sector-matrix";
import { CaseRoll } from "@/components/site/case-roll";
import { ClientPathfinder } from "@/components/site/client-pathfinder";
import { Testimonials } from "@/components/site/testimonials";
import {
  CourtsMarquee,
  RegulationBoard,
  ActsStrip,
  CredentialWall,
  SAFlagChip,
} from "@/components/site/sa-legal";
import {
  ConstitutionCodexArt,
  ContractSigningArt,
  CourthouseColumnsArt,
  GavelStrikeArt,
  JusticeSeal,
  ProteaEmblem,
  SAMandateMap,
  ScalesOfJusticeArt,
} from "@/components/site/law-svg";
import { BackToTop, ImageReveal, Magnetic, SpotlightCard } from "@/components/site/interactions";
import { ConflictNotice } from "@/components/site/conflict-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

/** Chambers gallery — the firm at work (SA counsel, consultation, library). */
const GALLERY = [
  {
    src: "/images/sa-team-boardroom.png",
    alt: "Kgariya attorneys in consultation around a boardroom table at golden hour",
    caption: "In consultation — a development packaging session",
  },
  {
    src: "/images/sa-attorney-library.png",
    alt: "A Kgariya attorney drafting documents in the practice library",
    caption: "In the library — drafting and research",
  },
  {
    src: "/images/sa-team-corridor.png",
    alt: "Kgariya counsel and attorney walking through the firm's offices",
    caption: "Counsel on the move — between forums",
  },
];

export function HomePage() {
  const latest = ARTICLES.slice(0, 3);
  const featured = latest[0];
  const rest = latest.slice(1);

  return (
    <div>
      <HeroSlider />

      {/* ——— Premium live ticker ——— */}
      <LiveTicker />

      <TrustStrip />

      {/* ——— Positioning + counters ——— */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-28">
        <div className="texture-dots pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The firm"
              title={
                <>
                  A Pretoria practice rebuilt for the{" "}
                  <span className="gold-text italic">institutional</span> mandate.
                </>
              }
              lead="Kgariya Attorneys Incorporated evolved deliberately from a broad general practice into a specialist commercial litigation, real estate development packaging and development finance firm. We retired more than forty sub-services to concentrate on six practices where we hold genuine depth."
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                Our clients — blue-chip companies, SOEs, government departments,
                municipalities, banks, DFIs and developers — do not buy slogans.
                They buy verifiable credentials, structured dispute strategy and
                documents that survive credit committees, deeds offices and court
                rolls. That is why our operating philosophy is simple:{" "}
                <em className="font-display text-navy-900">evidence over slogans.</em>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic strength={0.15}>
                  <Button
                    size="lg"
                    className="btn-sheen h-12 rounded-full bg-navy-950 px-7 font-bold text-white hover:bg-navy-800"
                    onClick={() => navigate("#/about")}
                  >
                    Our story & values
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Magnetic>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-navy-200 px-7 font-bold text-navy-900"
                  onClick={() => useSite.getState().openDialog("questions")}
                >
                  Find your practice area
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Counters — spotlight tiles */}
          <div className="grid content-center gap-4 sm:grid-cols-2">
            {COUNTERS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <SpotlightCard className="gradient-ring h-full rounded-3xl">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-ivory p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe">
                    <span className="pointer-events-none absolute -right-4 -top-6 font-display text-7xl font-bold text-navy-950/5 transition-colors group-hover:text-gold-600/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-4xl font-semibold tracking-tight text-navy-900 sm:text-[2.6rem]">
                      <Counter value={c.value} suffix={c.suffix} />
                    </p>
                    <p className="mt-2 text-[13.5px] font-bold text-navy-900">{c.label}</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                      {c.note}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
            <Reveal delay={0.35} className="sm:col-span-2">
              <p className="text-center text-[11px] text-muted-foreground/70">
                Figures are practice indicators and will be re-verified against
                LPC marketing rules before publication.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ——— Inside the firm — chambers gallery ——— */}
        <div className="relative mx-auto mt-20 max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-700">
                  Inside the firm
                </p>
                <h3 className="mt-2.5 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                  Counsel, consultation &amp;{" "}
                  <span className="gold-text italic">craft</span>.
                </h3>
              </div>
              <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                Where mandates are actually worked — in the boardroom, in the
                library and on the move between the forums of South Africa.
              </p>
            </div>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={0.08 + i * 0.1} className={i === 1 ? "sm:mt-9" : ""}>
                <figure className="group relative overflow-hidden rounded-[1.75rem] border border-navy-100 shadow-luxe transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe-lg">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <ImageReveal
                      src={g.src}
                      alt={g.alt}
                      className="h-full w-full"
                      imgClassName="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  <span className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-10 border-l-2 border-t-2 border-gold-400/0 transition-colors duration-500 group-hover:border-gold-400/70" />
                  <figcaption className="absolute inset-x-4 bottom-4">
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-navy-950/70 px-3.5 py-1.5 text-[11px] font-semibold text-gold-200 backdrop-blur-md">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                      <span className="truncate">{g.caption}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Client pathfinder (interactive onboarding router) ——— */}
      <ClientPathfinder />

      {/* ——— Practice areas ——— */}
      <section id="practice-areas" className="scroll-mt-24 bg-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Practice hierarchy"
              title={
                <>
                  Six practices. <span className="gold-text italic">Deliberate depth.</span>
                </>
              }
              lead="A specialist hierarchy, ordered by priority — each practice a full-service line with its own scope, clients and representative matters."
            />
            <Reveal delay={0.1} className="shrink-0">
              <button
                onClick={() => useSite.getState().openDialog("questions")}
                className="group flex items-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-3 text-[13px] font-bold text-navy-900 transition-all hover:border-gold-500 hover:shadow-gold"
              >
                Not sure? Answer three questions
                <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          {/* Animated courthouse ornament — the courts above the practice */}
          <Reveal className="mt-12 hidden justify-center lg:flex">
            <CourthouseColumnsArt className="w-[440px] opacity-55" />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((p, i) => (
              <div key={p.slug} className="gradient-ring h-full rounded-3xl">
                <PracticeCard area={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Constitution medallion — the foundation beneath the six practices ——— */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="texture-dots pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200/25 blur-[130px]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <ConstitutionCodexArt className="mx-auto w-full max-w-[560px]" />
          </Reveal>
          <SectionHeading
            align="center"
            eyebrow="The foundation"
            title={
              <>
                Six practices, one{" "}
                <span className="gold-text italic">supreme law</span>.
              </>
            }
            lead="Everything we execute rests on the Constitution of the Republic of South Africa, 1996 — and on the statutes, courts and registries that give it force. That is the standard the courts hold us to, and the standard we hold ourselves to."
          />
        </div>
      </section>

      {/* ——— Trust architecture (dark) ——— */}
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
        <div className="texture-grid-dark pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Animated scales ghost — the showpiece behind the heading */}
          <ScalesOfJusticeArt className="pointer-events-none absolute left-1/2 top-0 hidden w-[520px] -translate-x-1/2 -translate-y-[38%] opacity-[0.16] md:block" />
          <SectionHeading
            dark
            align="center"
            eyebrow="Evidence over slogans"
            title={
              <>
                A trust architecture you can{" "}
                <span className="gold-text italic">verify</span>.
              </>
            }
            lead="Every market statement we make is backed by objective proof. Four operational pillars make that more than a promise."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {TRUST_PILLARS.map((p) => (
              <StaggerItem key={p.title}>
                <SpotlightCard dark className="h-full rounded-3xl">
                  <div className="group gradient-ring h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-white/10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950">
                      <Icon name={p.icon} className="h-5.5 w-5.5" />
                    </span>
                    <h3 className="mt-5 font-display text-[17px] font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/65">
                      {p.text}
                    </p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          {/* — In the forum — cinematic courtroom band — */}
          <Reveal delay={0.1} className="mt-16">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-luxe-lg">
              <div className="relative h-[360px] sm:h-[440px]">
                <ImageReveal
                  src="/images/sa-counsel-speaking.png"
                  alt="Counsel in South African court robes making submissions before the court"
                  className="h-full w-full"
                  imgClassName="object-cover object-[center_28%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/5" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                  <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
                    <span className="h-px w-8 bg-gold-400" />
                    In the forum
                  </p>
                  <h3 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-snug text-white sm:text-[1.9rem]">
                    Strategy is argued in rooms like this —{" "}
                    <span className="gold-text italic">prepared long before we stand up.</span>
                  </h3>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {[
                      "High Court — Gauteng Division",
                      "Supreme Court of Appeal",
                      "AFSA arbitration",
                      "Land Claims Court",
                    ].map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur-md"
                      >
                        {c}
                      </span>
                    ))}
                    <span className="ml-1 hidden sm:block">
                      <SAFlagChip dark />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* — Courts & forums of South Africa — */}
          <Reveal delay={0.15} className="mt-14">
            <p className="flex items-center justify-center gap-4 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
              <span className="hidden h-px w-10 bg-gold-500/60 sm:block" />
              Admitted before the courts of South Africa
              <span className="hidden h-px w-10 bg-gold-500/60 sm:block" />
            </p>
            <div className="-mx-6 mt-6">
              <CourtsMarquee dark />
            </div>
          </Reveal>

          {/* — Regulation, admission & standing — */}
          <div className="mt-16">
            <Reveal>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
                    Regulation &amp; standing
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                    Regulated. Admitted. <span className="gold-text italic">Audited.</span>
                  </h3>
                </div>
                <p className="max-w-sm text-[13px] leading-relaxed text-white/55">
                  Every standing claim below is verifiable — certificates,
                  enrolments and audit letters are produced on request.
                </p>
              </div>
            </Reveal>
            <div className="mt-9">
              <RegulationBoard dark />
            </div>
          </div>

          {/* — Statutory framework — */}
          <Reveal delay={0.1} className="mt-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
              Statutory framework
            </p>
            <div className="mt-5">
              <ActsStrip dark />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 text-center">
            <button
              onClick={() => navigate("#/legal")}
              className="link-underline text-[13.5px] font-bold text-gold-300"
            >
              Read our LPC disclosures, PAIA manual and privacy commitments
            </button>
          </Reveal>
        </div>
      </section>

      {/* ——— Client matrix (interactive sector explorer) ——— */}
      <SectorMatrix />

      {/* ——— Representative matters (interactive case roll) ——— */}
      <CaseRoll />

      {/* ——— Client voices carousel ——— */}
      <Testimonials />

      {/* ——— Nationwide mandates — SA jurisdiction map ——— */}
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
        <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              dark
              eyebrow="Jurisdiction · Republic of South Africa"
              title={
                <>
                  One seat in Pretoria. <span className="gold-text italic">Mandates that travel.</span>
                </>
              }
              lead="Instructions originate in Gauteng and reach the ports, mines, registries and land of the rest of the country — the file travels, the standard does not change."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {[
                  "Gauteng — head office",
                  "Western Cape",
                  "KwaZulu-Natal",
                  "Eastern Cape",
                  "Free State",
                  "Limpopo",
                  "North West",
                  "Mpumalanga",
                  "Northern Cape",
                ].map((p) => (
                  <span
                    key={p}
                    className={
                      p === "Gauteng — head office"
                        ? "rounded-full bg-gold-500 px-3.5 py-1.5 text-[11.5px] font-bold text-navy-950"
                        : "rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11.5px] font-semibold text-white/75"
                    }
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="mt-6 flex max-w-lg items-start gap-2.5 text-[12px] leading-relaxed text-white/45">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                Out-of-province appearances and filings are supported through correspondent counsel with right of appearance in the local forum.
              </p>
              <div className="mt-6">
                <SAFlagChip dark />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SAMandateMap className="mx-auto w-full max-w-[500px]" />
          </Reveal>
        </div>
      </section>

      {/* ——— Director's welcome ——— */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] border-2 border-gold-500/40" />
              <div className="relative h-[520px] w-full overflow-hidden rounded-[2rem] shadow-luxe-lg">
                <ImageReveal
                  src={DIRECTOR.photo}
                  alt="Portrait of the Founding Director of Kgariya Attorneys Incorporated"
                  className="h-full w-full"
                  imgClassName="object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-6 pt-16">
                  <p className="font-display text-xl font-semibold text-white">
                    {DIRECTOR.role}
                  </p>
                  <p className="mt-1 text-[12.5px] text-gold-300">
                    LLB · MBA (Finance) · PGDip Real Estate (Wits) · PDP (UCT)
                  </p>
                </div>
              </div>
              {/* Floating credential chip */}
              <div className="animate-floaty absolute -right-3 top-8 hidden items-center gap-3 rounded-2xl border border-navy-100 bg-white/90 p-4 shadow-luxe-lg backdrop-blur-xl sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-[12.5px] font-bold text-navy-900">LPC registered</p>
                  <p className="text-[10.5px] text-muted-foreground">
                    Trust account audited
                  </p>
                </div>
              </div>
              {/* Real office polaroid — overlapping card */}
              <div className="group absolute bottom-14 right-4 hidden w-[168px] rotate-2 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-luxe-lg transition-all duration-500 hover:-translate-y-1.5 hover:rotate-0 md:block">
                <div className="relative h-[185px] overflow-hidden">
                  <ImageReveal
                    src="/images/office-plaza.jpg"
                    alt="The Kgariya Attorneys office building, Pretoria"
                    className="h-full w-full"
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                  <div className="leading-tight">
                    <p className="text-[10.5px] font-bold text-navy-900">Our Pretoria offices</p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Where mandates meet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="A word from the director"
              title={
                <>
                  Grounded in the <span className="gold-text italic">boardroom</span>,
                  not just the courtroom.
                </>
              }
            />
            <Reveal delay={0.1}>
              <div className="mt-6 rounded-3xl border border-navy-100 bg-ivory p-7">
                <p className="font-display text-[17px] italic leading-relaxed text-navy-900">
                  {DIRECTOR.welcome}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-7 space-y-3.5">
                {DIRECTOR.experience.map((e, i) => (
                  <li key={i} className="flex gap-3.5 text-[14px] leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {e}
                  </li>
                ))}
              </ul>
              <Reveal delay={0.12}>
                <div className="mt-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-700">
                    Admissions &amp; standing
                  </p>
                  <CredentialWall className="mt-5" />
                </div>
              </Reveal>
              <Magnetic strength={0.15}>
                <Button
                  size="lg"
                  variant="outline"
                  className="mt-8 h-12 rounded-full border-navy-200 px-7 font-bold text-navy-900"
                  onClick={() => navigate("#/people")}
                >
                  View credentials in full
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Engagement journey ——— */}
      <section id="journey" className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-24 sm:py-28">
        <div className="texture-grid-dark pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Animated gavel — strikes at matter close */}
          <GavelStrikeArt className="pointer-events-none absolute -top-6 right-2 hidden w-[210px] opacity-85 xl:block" />
          <SectionHeading
            dark
            eyebrow="How we engage"
            title={
              <>
                From first enquiry to{" "}
                <span className="gold-text italic">matter close</span>.
              </>
            }
            lead="A systematic four-step workflow that enforces confidentiality, defines mandate scope and maintains LPC compliance — low friction for you, rigorous for both of us."
          />
          <div className="mt-14">
            <JourneyStepper dark />
          </div>
        </div>
      </section>

      {/* ——— Fee models ——— */}
      <section id="fees" className="relative scroll-mt-24 overflow-hidden bg-white py-24 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Animated contract signing — agreed in writing */}
          <ContractSigningArt className="pointer-events-none absolute -top-8 right-0 hidden w-[240px] lg:block" />
          <SectionHeading
            eyebrow="Fee transparency"
            title={
              <>
                Clear fees, agreed{" "}
                <span className="gold-text italic">in writing</span> — before work begins.
              </>
            }
            lead="Three commercial models, matched to the mandate. No surprises on an invoice you did not see coming."
          />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.12}>
            {FEE_MODELS.map((f, i) => (
              <StaggerItem key={f.name}>
                <SpotlightCard className="gradient-ring h-full rounded-3xl">
                  <Card className="relative h-full overflow-hidden rounded-3xl border-navy-100">
                    {i === 1 && (
                      <span className="absolute right-5 top-5 z-10 rounded-full bg-gold-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-700">
                        Popular for developments
                      </span>
                    )}
                    <CardContent className="p-8">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-950 text-gold-400">
                        <Icon name={f.icon} className="h-5.5 w-5.5" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                        {f.name}
                      </h3>
                      <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gold-700">
                        {f.best}
                      </p>
                      <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                        {f.text}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {f.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex items-start gap-2.5 text-[13px] text-navy-900/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ——— Three questions CTA ——— */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-950 px-8 py-14 shadow-luxe-lg sm:px-14 sm:py-16">
            <div className="texture-grid-dark pointer-events-none absolute inset-0" />
            <div className="animate-aurora pointer-events-none absolute -right-20 -top-24 h-80 w-96 rounded-full bg-gold-500/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-gold-400/10 blur-[90px]" />
            {/* Rotating justice seal watermark */}
            <JusticeSeal className="pointer-events-none absolute -right-12 -top-12 hidden w-52 opacity-25 md:block" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-300">
                  <span className="h-px w-8 bg-gold-500" />
                  Practice-routed intake
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Thirty seconds. Three questions.{" "}
                  <span className="gold-text-shine italic">The right practice area.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/70">
                  Our guided flow routes you to the correct practice lead — so your
                  first conversation is with the attorney who can actually act,
                  not a call centre.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={0.2}>
                    <Button
                      size="lg"
                      variant="gold"
                      className="btn-sheen h-12 rounded-full px-7"
                      onClick={() => useSite.getState().openDialog("questions")}
                    >
                      Start the three questions
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Magnetic>
                  <Button
                    size="lg"
                    variant="outline-light"
                    className="h-12 rounded-full px-7"
                    onClick={() => navigate("#/contact")}
                  >
                    Or go straight to contact
                  </Button>
                </div>
              </div>
              <ConflictNotice dark />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Latest insights — featured + cards ——— */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Insights"
              title={
                <>
                  Legal updates, written to be{" "}
                  <span className="gold-text italic">used</span>.
                </>
              }
              lead="Case notes and practical guides from the practices — plain language, boardroom relevant."
            />
            <Reveal delay={0.1} className="shrink-0">
              <Button
                variant="outline"
                className="h-12 rounded-full border-navy-200 px-6 font-bold text-navy-900"
                onClick={() => navigate("#/insights")}
              >
                All insights
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Featured note */}
            <Reveal className="h-full">
              <button
                onClick={() => navigate(`#/insights/${featured.slug}`)}
                className="group relative flex h-full min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-navy-950 p-8 text-left shadow-luxe transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe-lg sm:p-10"
              >
                <div className="pointer-events-none absolute inset-0 opacity-25">
                  <Image
                    src="/images/sa-judge-bench.png"
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover object-[center_30%]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/55" />
                <div className="texture-grid-dark pointer-events-none absolute inset-0" />
                <div className="animate-aurora pointer-events-none absolute -right-16 -top-20 h-64 w-72 rounded-full bg-gold-500/15 blur-[90px]" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-gold-500 px-3 py-1 text-[10.5px] font-bold text-navy-950">
                      Featured note
                    </span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[10.5px] font-bold text-gold-300">
                      {featured.category}
                    </span>
                    <span className="text-[11.5px] text-white/50">{featured.readTime}</span>
                  </div>
                  <h3 className="mt-6 max-w-lg font-display text-2xl font-semibold leading-snug text-white transition-colors group-hover:text-gold-200 sm:text-[1.8rem]">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-white/70">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-gold-300">
                    Read the featured note
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                  <span className="hidden text-[11.5px] text-white/40 sm:block">
                    {new Date(featured.date).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </button>
            </Reveal>

            {/* Stacked notes */}
            <div className="grid gap-6">
              {rest.map((a, i) => (
                <Reveal key={a.slug} delay={0.08 + i * 0.08} className="h-full">
                  <button
                    onClick={() => navigate(`#/insights/${a.slug}`)}
                    className="group flex h-full w-full flex-col rounded-[2rem] border border-navy-100 bg-ivory p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-luxe sm:flex-row sm:items-center sm:gap-8 sm:p-8"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-navy-950 px-3 py-1 text-[10.5px] font-bold text-gold-300">
                          {a.category}
                        </span>
                        <span className="text-[11.5px] text-muted-foreground">
                          {a.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug text-navy-900 transition-colors group-hover:text-navy-700 sm:text-xl">
                        {a.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
                        {a.excerpt}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-bold text-gold-700 sm:mt-0 sm:flex-col sm:items-end sm:gap-2">
                      Read
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                        <ArrowUpRight className="h-4.5 w-4.5" />
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Client questions"
              title={
                <>
                  Asked often, answered{" "}
                  <span className="gold-text italic">plainly</span>.
                </>
              }
              lead="If your question is not here, ask it directly — the enquiry form routes to the right practice lead."
            />
            <Reveal delay={0.15}>
              <Button
                className="mt-8 h-12 rounded-full bg-navy-950 px-7 font-bold text-white hover:bg-navy-800"
                onClick={() => navigate("#/contact")}
              >
                Ask us directly
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
            {/* King protea — national flower emblem */}
            <Reveal delay={0.2} className="mt-12 hidden sm:block">
              <ProteaEmblem className="w-36" />
              <p className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
                King protea · South Africa’s national flower
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
