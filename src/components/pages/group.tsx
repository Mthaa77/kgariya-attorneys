"use client";

import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { GROUP_ENTITIES } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";

const SYNERGIES = [
  {
    title: "Project cost modelling",
    text: "Feasibility and cost work across group projects gives our development finance drafting a grounded view of cash flows — the documents read like they were written by people who have funded a project, not just papered one.",
  },
  {
    title: "Construction risk mitigation",
    text: "Watching contracts perform (and fail) on real sites sharpens the litigation practice's construction disputes work and the packaging practice's contract frameworks.",
  },
  {
    title: "Property financing reality",
    text: "Group participation in property financing keeps the banking practice current on what lenders actually require — from credit committee to bond registration.",
  },
];

export function GroupPage() {
  return (
    <div>
      <PageHero
        eyebrow="Kgariya & Co Group"
        title="Legal advice anchored to real projects."
        lead="Kgariya Attorneys Inc. operates with the strategic support of the broader Kgariya & Co Group — complementary capability across real estate development, construction management, and property & financial advisory."
        image="/images/group-construction.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Kgariya & Co Group" }]}
      />

      {/* Entities */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Group entities"
            title={
              <>
                Three capabilities.{" "}
                <span className="gold-text italic">One ecosystem.</span>
              </>
            }
            lead="The group brings together complementary capabilities that the legal practice draws on — and contributes legal rigour back to."
          />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.12}>
            {GROUP_ENTITIES.map((e) => (
              <StaggerItem key={e.name}>
                <div className="card-lift group h-full overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-luxe">
                  <div className="relative h-44 overflow-hidden bg-navy-950">
                    <Image
                      src="/images/group-construction.png"
                      alt=""
                      fill
                      className="object-cover opacity-60 transition-transform duration-[1.3s] group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
                    <span className="absolute bottom-4 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-navy-950 shadow-gold transition-transform duration-500 group-hover:scale-110">
                      <Icon name={e.icon} className="h-5.5 w-5.5" />
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-[18px] font-semibold text-navy-900">
                      {e.name}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                      {e.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Synergy explanation */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="texture-grid-dark pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              dark
              eyebrow="Why it matters"
              title={
                <>
                  Distinct <span className="gold-text italic">real-world</span>{" "}
                  insight.
                </>
              }
              lead="By observing and participating in the practical mechanics of project cost modelling, construction risk mitigation and property financing across group projects, Kgariya Inc. delivers legal advisory work that accounts for operational realities, project cash flows and commercial risk parameters."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-3xl border border-gold-500/30 bg-gold-500/10 p-6">
                <p className="text-[14px] leading-relaxed text-gold-100">
                  The group link is a strategic asset — never a conflict. Mandates
                  run through the same conflict-screening, LPC compliance and trust
                  account disciplines as every other matter. Where a matter touches
                  a group interest, it is disclosed and managed under the firm's
                  conflicts protocol.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="space-y-5">
            {SYNERGIES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors duration-500 hover:border-gold-500/40">
                  <h3 className="flex items-center gap-3 font-display text-[16.5px] font-semibold text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/15 text-[12px] font-bold text-gold-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-navy-100 bg-white p-10 shadow-luxe lg:grid-cols-[1.3fr_1fr] sm:p-14">
            <div>
              <SectionHeading
                eyebrow="Next step"
                title={
                  <>
                    Bring a group-informed legal team to your{" "}
                    <span className="gold-text italic">next project</span>.
                  </>
                }
                lead="Whether you are structuring a joint venture, packaging a township, or closing development finance — the practice that lives inside a development group is a different conversation."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-navy-950 px-7 font-bold text-white hover:bg-navy-800"
                  onClick={() => navigate("#/practice/real-estate-development")}
                >
                  <Building2 className="h-4 w-4" />
                  Development packaging practice
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-navy-200 px-7 font-bold text-navy-900"
                  onClick={() => useSite.getState().openDialog("booking")}
                >
                  Book a consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative hidden h-72 lg:block">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <Image
                  src="/images/hero-development.png"
                  alt="Mixed-use development at golden hour"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
