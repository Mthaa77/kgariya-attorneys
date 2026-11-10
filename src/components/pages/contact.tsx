"use client";

import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { PRACTICE_AREAS } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Button } from "@/components/ui/button";
import { ConflictNotice } from "@/components/site/conflict-notice";
import { Icon } from "@/components/site/icon";
import { OfficeDirectory } from "@/components/site/office-directory";

export function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Routed to the right attorney — first time."
        lead="Every enquiry is directed to the relevant practice lead after conflict screening. No call centres, no lost emails — a practitioner responds within one business day."
        image="/images/office.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Contact" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            variant="gold"
            className="h-12 rounded-full px-7"
            onClick={() => useSite.getState().openDialog("booking")}
          >
            Book a consultation
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            className="h-12 rounded-full px-7"
            onClick={() => useSite.getState().openDialog("questions")}
          >
            Not sure who to ask? Three questions
          </Button>
        </div>
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Office directory */}
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Our offices"
              title={
                <>
                  Three cities. One <span className="gold-text italic">connected legal team</span>.
                </>
              }
              lead="Visit our Pretoria head office, or contact the firm to arrange an appointment in Middelburg or Cape Town. Branch-level directions and visit arrangements are confirmed directly with our team."
            />

            <Reveal delay={0.06}>
              <OfficeDirectory />
            </Reveal>

            <ConflictNotice />
          </div>

          {/* Form */}
          <div>
            <Reveal>
              <div className="rounded-3xl border border-navy-100 bg-ivory p-7 shadow-luxe sm:p-9">
                <h3 className="font-display text-2xl font-semibold text-navy-900">
                  Practice-routed enquiry
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  Choose the practice area closest to your matter — the form routes
                  directly to that practice lead&apos;s inbox.
                </p>
                <div className="mt-7">
                  <EnquiryForm />
                </div>
              </div>
            </Reveal>

            {/* Quick routes */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {PRACTICE_AREAS.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => navigate(`#/practice/${p.slug}`)}
                  className="group flex items-center gap-3 rounded-2xl border border-navy-100 bg-white px-4 py-3 text-left transition-all hover:border-gold-400/60 hover:shadow-sm"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: p.accent }}
                  >
                    <Icon name={p.icon} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[12.5px] font-semibold text-navy-900">
                    {p.shortName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
