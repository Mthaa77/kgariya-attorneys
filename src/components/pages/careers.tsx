"use client";

import { ArrowRight, BookOpen, Briefcase, MapPin } from "lucide-react";
import { CAREER_VALUES, VACANCIES } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/reveal";
import { Icon } from "@/components/site/icon";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CareersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title="Real mandates. Named mentors. Careers that last."
        lead="Join a Pretoria practice in deliberate growth — where candidate attorneys see court rolls and deeds offices in year one, and associates build institutional-grade work."
        image="/images/office.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Careers" }]}
      />

      {/* Vacancies */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Open positions"
            title={
              <>
                Current <span className="gold-text italic">vacancies</span> & articles
                of clerkship.
              </>
            }
            lead="Applications are reviewed on a rolling basis. Send a CV and a short motivation through the form below, or via email."
          />
          <div className="mt-14 space-y-5">
            {VACANCIES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <Card className="card-lift overflow-hidden rounded-3xl border-navy-100">
                  <CardContent className="grid gap-6 p-7 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl font-semibold text-navy-900">
                          {v.title}
                        </h3>
                        <Badge className="rounded-full bg-gold-200/60 text-[10.5px] font-bold text-gold-700 hover:bg-gold-200/60">
                          {v.open}
                        </Badge>
                      </div>
                      <p className="mt-2 flex items-center gap-2 text-[12.5px] font-semibold text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5 text-gold-600" />
                        {v.type}
                        <span className="mx-1">·</span>
                        <MapPin className="h-3.5 w-3.5 text-gold-600" />
                        Walker Creek Office Park, Pretoria
                      </p>
                      <p className="mt-3.5 text-[13.5px] leading-relaxed text-muted-foreground">
                        {v.text}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {v.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-ivory px-3 py-1 text-[11px] font-semibold text-navy-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5 lg:items-end">
                      <Button
                        className="h-11 w-full rounded-full bg-navy-950 font-bold text-white hover:bg-navy-800 lg:w-auto lg:px-7"
                        onClick={() =>
                          document
                            .getElementById("apply")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        Apply for this role
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <p className="text-center text-[11.5px] text-muted-foreground lg:text-right">
                        Or email careers@kgariyainc.co.za
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
        <div className="texture-grid-dark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            dark
            eyebrow="Why Kgariya"
            title={
              <>
                What a career here{" "}
                <span className="gold-text italic">looks like</span>.
              </>
            }
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {CAREER_VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:bg-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon name={v.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-[16.5px] font-semibold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/65">
                    {v.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <div className="mx-auto flex max-w-2xl items-start gap-3.5 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-5">
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <p className="text-[13px] leading-relaxed text-gold-100">
                Articles of clerkship at Kgariya Inc. are structured for admission:
                supervised court exposure, deeds office practice, and rotation
                across litigation, conveyancing and development packaging — with
                protected study time before board exams.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-28 bg-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Apply"
              title={
                <>
                  Tell us about{" "}
                  <span className="gold-text italic">yourself</span>.
                </>
              }
              lead="A short motivation and your background is enough to start. If your profile fits, we will invite a conversation and request your CV then — no lengthy forms to begin."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-5 text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-bold text-navy-900">POPIA note: </span>
                application details are processed solely for recruitment purposes
                and retained only as long as necessary under our privacy notice.
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-luxe sm:p-9">
              <EnquiryForm kind="career" heading="Application / article enquiry" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
