"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ListChecks,
  Target,
  Users,
} from "lucide-react";
import { navigate, useRoute } from "@/lib/router";
import { useSite } from "@/lib/store";
import { PRACTICE_AREAS, getPractice } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { MatterDeck } from "@/components/site/matter-card";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { PracticeCard } from "@/components/site/practice-card";
import { PracticeForums } from "@/components/site/sa-legal";
import { Button } from "@/components/ui/button";
import { Notfound } from "./notfound";
export function PracticeAreaPage({ slug }: { slug: string }) {
  const area = getPractice(slug);
  if (!area) return <Notfound />;

  const others = PRACTICE_AREAS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div>
      <PageHero
        eyebrow={`Practice ${area.number} of 06`}
        title={area.name}
        lead={area.intro}
        image={area.image}
        breadcrumb={[
          { label: "Home", route: "#/" },
          { label: "Practice Areas" },
          { label: area.shortName },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3.5">
          <Button
            size="lg"
            variant="gold"
            className="h-12 rounded-full px-7"
            onClick={() => useSite.getState().openDialog("booking", area.name)}
          >
            Book a consultation
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            className="h-12 rounded-full px-7"
            onClick={() =>
              document
                .getElementById("enquire")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Enquire about this practice
          </Button>
          <span className="ml-1 hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[12px] font-semibold text-gold-200 sm:flex">
            <BadgeCheck className="h-3.5 w-3.5" />
            {area.stat.value.toLocaleString("en-ZA")}
            {area.stat.suffix} {area.stat.label}
          </span>
        </div>
      </PageHero>

      {/* Overview + scope */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Overview"
              title={area.tagline}
            />
            <div className="mt-6 space-y-5">
              {area.overview.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 rounded-3xl border border-navy-100 bg-ivory p-7">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: area.accent }}
                  >
                    <Target className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    Technical delivery
                  </h3>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {area.delivery.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-navy-900/80"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-luxe">
                <div
                  className="flex items-center gap-3 px-7 py-5 text-white"
                  style={{ backgroundColor: area.accent }}
                >
                  <ListChecks className="h-5 w-5" />
                  <h3 className="font-display text-[17px] font-semibold">
                    Scope of services
                  </h3>
                </div>
                <ul className="divide-y divide-navy-100/70 bg-white px-7">
                  {area.scope.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 py-3.5 text-[13.5px] leading-relaxed text-navy-900/85"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: area.accent }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-3xl border border-navy-100 bg-navy-950 p-7 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                    <Users className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold">
                    Typical clients
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.clients.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold text-white/80"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <PracticeForums
              slug={area.slug}
              accent={area.accent}
              fallbackName={area.name}
            />
          </div>
        </div>
      </section>

      {/* Representative matters */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Representative matters"
            title={
              <>
                How this practice <span className="gold-text italic">performs</span>.
              </>
            }
            lead="Anonymised profiles with outcome labels. No client names or confidential details — published in line with LPC marketing rules."
          />
          <div className="mt-12">
            <MatterDeck matters={area.matters} ctaLabel="Discuss a similar matter" />
          </div>
        </div>
      </section>

      {/* Lead attorney strip */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid items-center gap-8 overflow-hidden rounded-[2.5rem] border border-navy-100 shadow-luxe lg:grid-cols-[1fr_1.4fr]">
              <div className="relative h-72 lg:h-full lg:min-h-[340px]">
                <Image
                  src="/images/office.png"
                  alt="Kgariya Attorneys boardroom, Pretoria"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="p-8 sm:p-12">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold-700">
                  Lead attorney
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-navy-900">
                  {area.shortName} is led by the firm&apos;s Founding Director
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                  LLB · MBA in Finance · Postgraduate Diploma in Real Estate
                  Development &amp; Management (Wits) · Property Development
                  Programme (UCT) · Mining Law &amp; Resources Certificates (Wits).
                  Former CEO of a property company, with hands-on Land Bank legal
                  experience at AFGRI.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
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
                    Book with the practice
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-28 bg-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Practice-routed enquiry"
              title={
                <>
                  Talk to the <span className="gold-text italic">{area.shortName}</span>{" "}
                  lead.
                </>
              }
              lead="This form is pre-routed to the practice lead's inbox. Conflict screening happens first; expect our response within one business day."
            />
            <div className="mt-8 space-y-4">
              {PRACTICE_AREAS.filter((p) => p.slug !== area.slug)
                .slice(0, 3)
                .map((p) => (
                  <PracticeCard key={p.slug} area={p} variant="mini" />
                ))}
            </div>
          </div>
          <Reveal delay={0.1} className="min-w-0">
            <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-luxe sm:p-9">
              <EnquiryForm defaultPractice={area.name} lockPractice />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other practices */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Continue exploring" title="Other practices" />
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <StaggerItem key={p.slug}>
                <PracticeCard area={p} index={i} />
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
