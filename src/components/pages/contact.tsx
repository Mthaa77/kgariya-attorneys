"use client";

import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { FIRM, PRACTICE_AREAS } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Button } from "@/components/ui/button";
import { ConflictNotice } from "@/components/site/conflict-notice";
import { Icon } from "@/components/site/icon";

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
          {/* Directory */}
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Official entity directory"
              title={
                <>
                  Formal channels,{" "}
                  <span className="gold-text italic">verified</span>.
                </>
              }
            />

            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-luxe">
                {/* Stylised map */}
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FIRM.mapsQuery)}`,
                      "_blank"
                    )
                  }
                  className="group relative block h-52 w-full overflow-hidden text-left"
                  aria-label="Open office location in Google Maps"
                >
                  <div className="absolute inset-0 bg-navy-950" />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(198,165,92,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(198,165,92,0.25) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  {/* fake roads */}
                  <div className="absolute left-0 right-0 top-1/2 h-2 -rotate-6 bg-gold-500/25" />
                  <div className="absolute bottom-0 top-0 left-1/3 w-1.5 rotate-12 bg-white/10" />
                  <div className="absolute bottom-0 top-0 right-1/4 w-1 rotate-[24deg] bg-white/10" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative flex h-14 w-14 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/40" />
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-gold">
                        <MapPin className="h-5.5 w-5.5" />
                      </span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2.5 shadow-luxe">
                    <p className="text-[12px] font-bold text-navy-900">
                      Walker Creek Office Park
                    </p>
                    <p className="text-[10.5px] text-muted-foreground">
                      90 Florence Ribeiro Street, Pretoria
                    </p>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    Get directions
                  </span>
                </button>

                <div className="space-y-5 bg-white p-7">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-700">
                        Physical office
                      </p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy-900/85">
                        {FIRM.address.line1}, {FIRM.address.line2},{" "}
                        {FIRM.address.city} {FIRM.address.postal},{" "}
                        {FIRM.address.country}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <a
                      href={FIRM.phoneHref}
                      className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-ivory"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                        <Phone className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-gold-700">
                          Direct telephone
                        </span>
                        <span className="mt-1 block text-[14px] font-bold text-navy-900">
                          {FIRM.phone}
                        </span>
                      </span>
                    </a>
                    <a
                      href={`mailto:${FIRM.email}`}
                      className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-ivory"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-gold-700">
                          Official email
                        </span>
                        <span className="mt-1 block text-[14px] font-bold text-navy-900">
                          {FIRM.email}
                        </span>
                      </span>
                    </a>
                    <div className="flex gap-4 rounded-2xl p-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700">
                        <Clock className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-gold-700">
                          Office hours
                        </span>
                        <span className="mt-1 block text-[14px] font-bold text-navy-900">
                          {FIRM.hours}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-4 rounded-2xl p-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700">
                        <Video className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-gold-700">
                          Consultations
                        </span>
                        <span className="mt-1 block text-[14px] font-bold text-navy-900">
                          Video · Phone · In person
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
