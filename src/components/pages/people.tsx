"use client";

import Image from "next/image";
import { Award, BadgeCheck, GraduationCap, Quote, Stethoscope } from "lucide-react";
import { navigate } from "@/lib/router";
import { DIRECTOR, PEOPLE_PLACEHOLDERS } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSite as useSiteStore } from "@/lib/store";

const QUAL_GROUPS = [
  { key: "Legal & Financial", icon: "scale" },
  { key: "Real Estate", icon: "building" },
  { key: "Industry", icon: "pickaxe" },
];

export function PeoplePage() {
  return (
    <div>
      <PageHero
        eyebrow="Our people"
        title="Counsel grounded in commercial reality."
        lead="Kgariya Inc.'s execution capability stems from leadership that bridges legal strategy, financial modelling and hands-on operational experience in development and corporate management."
        image="/images/library.png"
        breadcrumb={[
          { label: "Home", route: "#/" },
          { label: "Our People" },
        ]}
      />

      {/* Director profile */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border-2 border-gold-500/40" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-luxe-lg">
                  <Image
                    src={DIRECTOR.photo}
                    alt="Portrait of the Founding Director of Kgariya Attorneys Incorporated"
                    width={864}
                    height={1152}
                    priority
                    className="h-[560px] w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent p-7 pt-20">
                    <p className="font-display text-2xl font-semibold text-white">
                      The Founding Director
                    </p>
                    <p className="mt-1 text-[13px] text-gold-300">
                      Director · Attorney · Former property company CEO
                    </p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                variant="gold"
                className="mt-7 h-12 w-full rounded-full"
                onClick={() => useSiteStore.getState().openDialog("booking")}
              >
                Book a consultation
              </Button>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Director profile"
              title={
                <>
                  A multi-disciplinary{" "}
                  <span className="gold-text italic">credential set</span>.
                </>
              }
              lead="Advanced legal degrees, executive finance training, real estate development qualifications and technical industry certifications — a combination deliberately built for institutional mandates."
            />

            {/* Welcome quote */}
            <Reveal delay={0.08}>
              <div className="mt-8 rounded-3xl border border-navy-100 bg-ivory p-7">
                <Quote className="h-6 w-6 text-gold-500" />
                <p className="mt-3 font-display text-[16.5px] italic leading-relaxed text-navy-900">
                  {DIRECTOR.welcome}
                </p>
              </div>
            </Reveal>

            {/* Qualifications */}
            <div className="mt-10 space-y-6">
              {QUAL_GROUPS.map((g, gi) => {
                const items = DIRECTOR.qualifications.filter((q) => q.group === g.key);
                return (
                  <Reveal key={g.key} delay={gi * 0.06}>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                          <Icon name={g.icon} className="h-4.5 w-4.5" />
                        </span>
                        <h3 className="font-display text-[17px] font-semibold text-navy-900">
                          {g.key}
                        </h3>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {items.map((q) => (
                          <li
                            key={q.label}
                            className="flex items-start gap-3 rounded-2xl border border-navy-100 bg-white px-5 py-3.5 text-[14px] font-medium text-navy-900 shadow-sm"
                          >
                            <BadgeCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-600" />
                            {q.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Experience */}
            <Reveal delay={0.1}>
              <div className="mt-10">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                    <Stethoscope className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold text-navy-900">
                    Operational & leadership experience
                  </h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {DIRECTOR.experience.map((e, i) => (
                    <li
                      key={i}
                      className="flex gap-3.5 rounded-2xl bg-ivory px-5 py-4 text-[14px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Future profiles */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Growing bench"
            title={
              <>
                Space reserved for the attorneys{" "}
                <span className="gold-text italic">joining us</span>.
              </>
            }
            lead="As practices join through our structured succession model, attorney profiles are published here — continuity of care means clients see exactly who carries their matter forward."
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" gap={0.1}>
            {PEOPLE_PLACEHOLDERS.map((p) => (
              <StaggerItem key={p.role}>
                <Card className="h-full rounded-3xl border-dashed border-navy-200 bg-white/60">
                  <CardContent className="p-7">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-300">
                      <GraduationCap className="h-7 w-7" />
                    </span>
                    <p className="mt-5 inline-flex rounded-full bg-gold-200/50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-700">
                      {p.status}
                    </p>
                    <h3 className="mt-3 font-display text-[17px] font-semibold text-navy-900">
                      {p.role}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                      {p.note}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mt-10 text-center">
            <Button
              variant="outline"
              className="h-12 rounded-full border-navy-200 px-7 font-bold text-navy-900"
              onClick={() => navigate("#/careers")}
            >
              <Award className="h-4 w-4 text-gold-600" />
              Build your career here — see vacancies
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
