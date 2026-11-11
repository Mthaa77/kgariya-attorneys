"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileCheck2,
  Scale,
} from "lucide-react";
import { navigate, useRoute } from "@/lib/router";
import { useSite } from "@/lib/store";
import { PRACTICE_AREAS, getPractice } from "@/lib/site-data";
import { PRACTICE_PAGE_CONTENT } from "@/lib/practice-page-content";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import {
  PracticeCapabilityExplorer,
  PracticeFaq,
  PracticeJourney,
  PracticeSectionNav,
} from "@/components/site/practice-experience";
import { Icon } from "@/components/site/icon";
import { MatterDeck } from "@/components/site/matter-card";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { PracticeCard } from "@/components/site/practice-card";
import { PracticeForums } from "@/components/site/sa-legal";
import { Button } from "@/components/ui/button";
import { Notfound } from "./notfound";
import useSWR from "swr";
import type { SanityMatter, SanityPractice } from "@/sanity/types";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PracticeHero({
  area,
  lead,
}: {
  area: NonNullable<ReturnType<typeof getPractice>>;
  lead: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src={area.image}
          alt=""
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,15,31,0.98)_0%,rgba(6,15,31,0.94)_42%,rgba(6,15,31,0.72)_100%)]" />
        <div className="texture-grid-dark absolute inset-0 opacity-35" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-44 top-12 h-[34rem] w-[34rem] rounded-full opacity-20 blur-[100px]"
          style={{ backgroundColor: area.accent }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pb-24">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-white/45"
          aria-label="Breadcrumb"
        >
          <button
            type="button"
            onClick={() => navigate("#/")}
            className="transition-colors hover:text-gold-300"
          >
            Home
          </button>
          <ChevronRight className="h-3 w-3 text-gold-500/60" />
          <span>Practice Areas</span>
          <ChevronRight className="h-3 w-3 text-gold-500/60" />
          <span className="font-semibold text-gold-300">{area.shortName}</span>
        </motion.nav>

        <div className="mt-9 grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-500/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Practice area {area.number}
              </span>
              <span className="text-[11px] font-semibold tracking-[0.08em] text-white/45">
                KGARIYA ATTORNEYS INCORPORATED
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="mt-7 max-w-2xl font-display text-xl italic leading-snug text-gold-200 sm:text-2xl"
            >
              {area.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-3xl font-display text-[2.55rem] font-semibold leading-[1.04] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.8rem]"
            >
              {area.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl text-[14.5px] leading-[1.8] text-white/70 sm:text-[16px]"
            >
              {lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.36 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                size="lg"
                variant="gold"
                className="btn-sheen h-12 rounded-full px-7"
                onClick={() => useSite.getState().openDialog("booking", area.name)}
              >
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline-light"
                className="h-12 rounded-full px-7"
                onClick={() => scrollToSection("expertise")}
              >
                Explore capabilities
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-white/45"
            >
              <span className="inline-flex items-center gap-2">
                <Scale className="h-3.5 w-3.5 text-gold-400" />
                Evidence-led legal work
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span className="inline-flex items-center gap-2">
                <FileCheck2 className="h-3.5 w-3.5 text-gold-400" />
                Clear mandate scope
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
          >
            <div className="absolute -inset-4 rounded-[2.4rem] border border-white/10" />
            <div className="absolute -inset-8 rounded-[2.8rem] border border-gold-400/10" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-[0_32px_100px_-35px_rgba(0,0,0,0.9)]">
              <Image
                src={area.image}
                alt=""
                fill
                priority
                className="object-cover opacity-75"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/15 to-navy-950/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 to-transparent" />
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/45 px-3.5 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                  Practice dossier
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-[4.5rem] font-semibold leading-none text-white/20 sm:text-[5.5rem]">
                  {area.number}
                </p>
                <div className="mt-3 flex items-end justify-between gap-4 border-t border-white/20 pt-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-300">
                      Practice snapshot
                    </p>
                    <p className="mt-1 font-display text-[27px] font-semibold leading-none text-white">
                      {area.stat.value.toLocaleString("en-ZA")}
                      {area.stat.suffix}
                    </p>
                    <p className="mt-1 text-[11px] text-white/55">{area.stat.label}</p>
                  </div>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 text-white backdrop-blur-md"
                    style={{ backgroundColor: area.accent + "b8" }}
                  >
                    <Icon name={area.icon} className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-900/90 px-4 py-3 shadow-luxe backdrop-blur-xl sm:-right-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300">
                <BadgeCheck className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                  Defined focus
                </span>
                <span className="mt-0.5 block text-[12px] font-semibold text-white">
                  Six specialist practices
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const cmsFetcher = (url: string) => fetch(url).then((res) => (res.ok ? res.json() : []));

export function PracticeAreaPage({ slug }: { slug: string }) {
  const { data: cmsPractices } = useSWR<SanityPractice[]>("/api/cms?type=practices", cmsFetcher);
  const { data: cmsMatters } = useSWR<SanityMatter[]>("/api/cms?type=matters", cmsFetcher);
  const fallbackArea = getPractice(slug);
  const cmsArea = cmsPractices?.find((practice) => practice.slug === slug);
  const area = fallbackArea
    ? {
        ...fallbackArea,
        number: cmsArea?.number ?? fallbackArea.number,
        name: cmsArea?.name ?? fallbackArea.name,
        shortName: cmsArea?.shortName ?? fallbackArea.shortName,
        menuLabel: cmsArea?.menuLabel ?? fallbackArea.menuLabel,
        tagline: cmsArea?.tagline ?? fallbackArea.tagline,
        intro: cmsArea?.intro ?? fallbackArea.intro,
        accent: cmsArea?.accent ?? fallbackArea.accent,
        accentSoft: cmsArea?.accentSoft ?? fallbackArea.accentSoft,
        image: cmsArea?.imageUrl || fallbackArea.image,
        icon: cmsArea?.iconKey ?? fallbackArea.icon,
        overview: cmsArea?.overview?.length ? cmsArea.overview : fallbackArea.overview,
        scope: cmsArea?.scope?.length ? cmsArea.scope : fallbackArea.scope,
        delivery: cmsArea?.delivery?.length ? cmsArea.delivery : fallbackArea.delivery,
        clients: cmsArea?.clients?.length ? cmsArea.clients : fallbackArea.clients,
        stat: cmsArea?.stat ?? fallbackArea.stat,
      }
    : null;
  const page = PRACTICE_PAGE_CONTENT[slug];
  const resolvedPage = page
    ? {
        ...page,
        heroLead: cmsArea?.intro ?? page.heroLead,
        overview: cmsArea?.overview?.length ? cmsArea.overview : page.overview,
      }
    : null;

  if (!area || !resolvedPage) return <Notfound />;

  const publishedMatters = (cmsMatters ?? [])
    .filter((matter) => !matter.practiceArea || matter.practiceArea === slug || matter.practiceArea === area.name)
    .map((matter) => ({
      title: matter.title,
      sector: matter.industry || "Representative matter",
      detail: matter.anonymisedSummary || matter.legalContext || "An anonymised representative matter.",
      outcome: matter.approvedOutcome || "Approved for publication",
    }));
  const displayMatters = publishedMatters.length ? publishedMatters : area.matters;
  const others = PRACTICE_AREAS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div>
      <PracticeHero area={area} lead={resolvedPage.heroLead} />
      <PracticeSectionNav />

      {/* Practice overview */}
      <section id="overview" className="scroll-mt-36 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              eyebrow="The mandate"
              title={resolvedPage.overviewHeading}
              lead="A focused legal service, shaped around the commercial, property or institutional question in front of the client."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 overflow-hidden rounded-[1.6rem] bg-navy-950 p-6 text-white shadow-luxe">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300">
                  <Compass className="h-4 w-4" />
                  Our point of view
                </div>
                <p className="mt-4 font-display text-[19px] leading-relaxed text-white/90">
                  “{resolvedPage.principle}”
                </p>
                <span className="mt-5 block h-px w-12 bg-gold-500" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Kgariya Attorneys Incorporated
                </p>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            {resolvedPage.overview.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.07}>
                <p className="text-[15px] leading-[1.9] text-muted-foreground sm:text-[16px]">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <div className="mt-4 grid gap-5 rounded-[1.6rem] border border-navy-100 bg-ivory p-6 sm:p-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                    Typical clients
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.clients.map((client) => (
                      <span
                        key={client}
                        className="rounded-full border border-navy-100 bg-white px-3.5 py-2 text-[11.5px] font-semibold text-navy-800"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-navy-200/70 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                    How mandates are supported
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {area.delivery.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                        <span className="text-[12px] leading-relaxed text-navy-800/85">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive capability explorer */}
      <section id="expertise" className="scroll-mt-36 bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                The detail behind the <span className="gold-text italic">discipline</span>.
              </>
            }
            lead={page.capabilityIntro}
          />
          <div className="mt-12">
            <PracticeCapabilityExplorer
              groups={page.capabilityGroups}
              accent={area.accent}
            />
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <PracticeForums
              slug={area.slug}
              accent={area.accent}
              fallbackName={area.name}
            />
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between rounded-[1.8rem] border border-navy-100 bg-white p-7 shadow-sm sm:p-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                    Considering an instruction?
                  </p>
                  <h3 className="mt-3 max-w-md font-display text-2xl font-semibold leading-tight text-navy-950">
                    Start with the issue. We can help frame the next step.
                  </h3>
                  <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-muted-foreground">
                    A short, non-confidential outline is enough to begin an enquiry.
                    The firm will complete conflict screening before requesting
                    confidential material.
                  </p>
                </div>
                <Button
                  className="mt-7 h-11 w-fit rounded-full bg-navy-950 px-6 font-bold text-white hover:bg-navy-800"
                  onClick={() => scrollToSection("enquire")}
                >
                  Discuss this practice
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive mandate journey */}
      <section id="approach" className="scroll-mt-36 relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="texture-grid-dark absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute -right-48 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Our approach"
            title={
              <>
                Thoughtful work. <span className="gold-text italic">Clear next steps.</span>
              </>
            }
            lead="A mandate should be understandable to the people responsible for it. We focus on the issue, the decision required and the work needed to move it forward."
            dark
          />
          <div className="mt-12">
            <PracticeJourney steps={page.journey} intro={page.journeyIntro} />
          </div>
        </div>
      </section>

      {/* Representative matters */}
      <section id="matters" className="scroll-mt-36 bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Representative matters"
            title={
              <>
                Experience, put into <span className="gold-text italic">context</span>.
              </>
            }
            lead="Selected anonymised matter profiles illustrate the type of work undertaken. They are not a promise that another matter will produce the same result."
          />
          <div className="mt-12">
            <MatterDeck matters={displayMatters} ctaLabel="Discuss a similar matter" />
          </div>
        </div>
      </section>

      {/* Leadership perspective */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid items-stretch gap-0 overflow-hidden rounded-[2.2rem] border border-navy-100 bg-white shadow-luxe lg:grid-cols-[0.86fr_1.14fr]">
              <div className="relative min-h-[280px] overflow-hidden bg-navy-900 sm:min-h-[360px]">
                <Image
                  src="/images/office.png"
                  alt="Kgariya Attorneys boardroom in Pretoria"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold-300">
                    Leadership perspective
                  </p>
                  <p className="mt-2 max-w-sm font-display text-2xl font-semibold leading-tight text-white">
                    Law, finance and property development in one room.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-11 lg:p-14">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                  <BadgeCheck className="h-4 w-4" />
                  Founding Director
                </div>
                <h3 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-[1.12] text-navy-950 sm:text-[2.5rem]">
                  A broader commercial perspective on legal work.
                </h3>
                <p className="mt-5 max-w-2xl text-[13.5px] leading-[1.85] text-muted-foreground sm:text-[14.5px]">
                  The practice is led by the firm's Founding Director, whose
                  qualifications and experience span law, finance and property
                  development: LLB, MBA in Finance, a postgraduate diploma in Real
                  Estate Development &amp; Management from Wits, the Property
                  Development Programme at UCT, and mining law and resources
                  certificates from Wits. Previous experience includes leading a
                  property company and handling Land Bank legal matters at AFGRI.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    className="h-11 rounded-full bg-navy-950 px-6 font-bold text-white hover:bg-navy-800"
                    onClick={() => navigate("#/people")}
                  >
                    View full profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 rounded-full border-navy-200 px-6 font-bold text-navy-900"
                    onClick={() => useSite.getState().openDialog("booking", area.name)}
                  >
                    Book a consultation
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Practice-specific FAQs */}
      <section id="faqs" className="scroll-mt-36 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Questions & answers"
              title="A little more clarity before you get in touch."
              lead="General information about the practice and the first steps in an enquiry."
            />
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-gold-200 bg-ivory p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-gold-700">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-[11.5px] leading-relaxed text-navy-800/80">
                The information on this page is general in nature and is not legal
                advice on a particular matter.
              </p>
            </div>
          </div>
          <Reveal delay={0.08}>
            <PracticeFaq slug={area.slug} items={page.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Practice-routed enquiry */}
      <section id="enquire" className="scroll-mt-36 bg-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Practice-routed enquiry"
              title={
                <>
                  Talk to the <span className="gold-text italic">{area.shortName}</span>{" "}
                  practice.
                </>
              }
              lead="Tell us what you need help with. Your enquiry is pre-routed to the relevant practice inbox, with conflict screening before confidential information is requested."
            />
            <div className="mt-8 space-y-3">
              {[
                "Your enquiry is linked to this practice area.",
                "A brief, non-confidential summary is sufficient at this stage.",
                "Please hold confidential documents until conflict screening is complete.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-white px-4 py-3.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <p className="text-[12px] leading-relaxed text-navy-800/85">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                Explore another practice
              </p>
              {others.map((practice) => (
                <PracticeCard key={practice.slug} area={practice} variant="mini" />
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <div className="rounded-[1.8rem] border border-navy-100 bg-white p-6 shadow-luxe sm:p-9">
              <div className="mb-6 flex items-center gap-3 border-b border-navy-100 pb-5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: area.accent }}
                >
                  <Icon name={area.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-700">
                    New enquiry
                  </p>
                  <h3 className="mt-0.5 truncate font-display text-lg font-semibold text-navy-950">
                    {area.name}
                  </h3>
                </div>
              </div>
              <EnquiryForm defaultPractice={area.name} lockPractice />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related practices */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Continue exploring"
            title="Other specialist practices"
          />
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((practice, index) => (
              <StaggerItem key={practice.slug}>
                <PracticeCard area={practice} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}

export function useRouteSlug(param: string) {
  const route = useRoute();
  const parts = route.replace(/^#\/?/, "").split("/");
  return parts.includes(param) ? parts[parts.indexOf(param) + 1] : null;
}
