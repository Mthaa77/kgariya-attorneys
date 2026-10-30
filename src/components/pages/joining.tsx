"use client";

import Image from "next/image";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { JOINING_FEATURES, JOINING_PHASES } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Button } from "@/components/ui/button";

export function JoiningPage() {
  return (
    <div>
      <PageHero
        eyebrow="Joining the firm"
        title="An honourable handover for a life's practice."
        lead="A dedicated succession and practice acquisition framework for retiring legal practitioners — built for seamless transitions, preserved legacies and protected clients."
        image="/images/library.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Joining the Firm" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            variant="gold"
            className="h-12 rounded-full px-7"
            onClick={() =>
              document
                .getElementById("confidential-enquiry")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Lock className="h-4 w-4" />
            Start a confidential conversation
          </Button>
        </div>
      </PageHero>

      {/* Promise */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Why practitioners choose us"
                title={
                  <>
                    Your clients, your people, your{" "}
                    <span className="gold-text italic">legacy</span> — protected.
                  </>
                }
                lead="Decades of client relationships and a staff who built those relationships deserve more than a listing agreement. Our succession model is designed around three commitments."
              />
              <Reveal delay={0.1}>
                <div className="mt-8 space-y-4">
                  {[
                    {
                      t: "Continuity of care",
                      d: "Matters transfer under structured handover protocols — clients experience a change of letterhead, not a change of standards.",
                    },
                    {
                      t: "People first",
                      d: "Staff and candidate attorneys receive structured career pathways, mentorship and retention commitments.",
                    },
                    {
                      t: "Discretion always",
                      d: "Discussions remain strictly confidential until you choose to announce — no market exposure, no client alarm.",
                    },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="flex gap-4 rounded-2xl border border-navy-100 bg-ivory p-5"
                    >
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                      <div>
                        <p className="text-[14.5px] font-bold text-navy-900">{x.t}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                          {x.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-gold-500/40" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-luxe-lg">
                  <Image
                    src="/images/library.png"
                    alt="Law library — the weight of an established practice"
                    width={1344}
                    height={768}
                    className="h-[420px] w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-7 pt-16">
                    <p className="font-display text-lg italic text-white">
                      “A practice is its people and its promises. We inherit both —
                      and honour both.”
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="texture-grid-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            dark
            eyebrow="Operational features"
            title={
              <>
                A framework built for{" "}
                <span className="gold-text italic">stability</span>.
              </>
            }
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {JOINING_FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon name={f.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-[16.5px] font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/65">
                    {f.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 3-phase model */}
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Expansion model"
            title={
              <>
                The 3-phase{" "}
                <span className="gold-text italic">transition</span> pathway.
              </>
            }
            lead="Practice acquisitions follow a dedicated, phased model — from relaunch and compliance through credibility building to acquisition growth and client-transition notices."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {JOINING_PHASES.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.08}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-luxe">
                  <span className="pointer-events-none absolute -right-4 -top-8 font-display text-[110px] font-bold leading-none text-navy-950/5">
                    {i + 1}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-navy-950 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-300">
                      {p.phase}
                    </span>
                    <span className="text-[12px] font-bold text-gold-700">{p.time}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[19px] font-semibold text-navy-900">
                    {p.name}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-[12px] text-muted-foreground/80">
              No public statement is made about any specific transaction. All
              succession dialogues are confidential by design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Confidential enquiry */}
      <section
        id="confidential-enquiry"
        className="scroll-mt-28 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Confidential enquiry"
              title={
                <>
                  A discreet first{" "}
                  <span className="gold-text italic">conversation</span>.
                </>
              }
              lead="Share as little or as much as you are comfortable with. The enquiry routes directly and confidentially to the director — nothing is disclosed to clients, staff or market before you decide."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-3xl border border-navy-100 bg-navy-950 p-7 text-white">
                <Lock className="h-6 w-6 text-gold-400" />
                <p className="mt-4 font-display text-[16.5px] font-semibold">
                  What happens next
                </p>
                <ol className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-white/70">
                  <li className="flex gap-3">
                    <span className="font-bold text-gold-400">1.</span>
                    A private call with the director, at a time and channel you choose.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gold-400">2.</span>
                    A mutual exploration of fit — clients, staff, area of practice, timing.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gold-400">3.</span>
                    Only then: structured due diligence under confidentiality, with
                    your advisors welcome throughout.
                  </li>
                </ol>
                <p className="mt-5 border-t border-white/10 pt-4 text-[12px] leading-relaxed text-white/50">
                  Please do not include confidential client information in the
                  enquiry form. Conflict screening applies here too.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-navy-100 bg-ivory p-7 shadow-luxe sm:p-9">
              <EnquiryForm kind="joining" heading="Strictly confidential enquiry" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
