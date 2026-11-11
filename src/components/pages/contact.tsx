"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { navigate } from "@/lib/router";
import { useSite } from "@/lib/store";
import { FIRM, PRACTICE_AREAS } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Button } from "@/components/ui/button";
import { ConflictNotice } from "@/components/site/conflict-notice";
import { Icon } from "@/components/site/icon";
import { OfficeDirectory } from "@/components/site/office-directory";

const FIRST_CONTACT_STEPS = [
  {
    number: "01",
    title: "Share the outline",
    description:
      "Tell us who you are, the kind of matter involved and which practice area seems relevant. Keep the summary non-confidential.",
  },
  {
    number: "02",
    title: "Conflict screening",
    description:
      "The firm must consider potential conflicts before sensitive information or case documents are shared.",
  },
  {
    number: "03",
    title: "Discuss next steps",
    description:
      "Once the appropriate checks have been completed, the firm can discuss the matter, the scope of assistance and a suitable way forward.",
  },
];

export function ContactPage() {
  const scrollToEnquiry = () => {
    document.getElementById("contact-enquiry")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <PageHero
        eyebrow="Contact the firm"
        title="Start with the right conversation."
        lead="A clear first step matters. Share a short outline of what you need, contact the firm directly, or arrange a consultation by video, telephone or in person."
        image="/images/office.png"
        breadcrumb={[{ label: "Home", route: "#/" }, { label: "Contact" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            variant="gold"
            className="h-12 rounded-full px-7"
            onClick={scrollToEnquiry}
          >
            Send an enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline-light"
            className="h-12 rounded-full px-7"
            onClick={() => useSite.getState().openDialog("booking")}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Book a consultation
          </Button>
        </div>
      </PageHero>

      <section className="relative z-10 -mt-8 px-5 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-3">
          <a
            href={FIRM.phoneHref}
            className="group flex min-w-0 items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxe-lg"
            aria-label={"Call the firm on " + FIRM.phone}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
              <Phone className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
                Call the firm
              </span>
              <span className="mt-1 block truncate text-[15px] font-semibold text-navy-950">
                {FIRM.phone}
              </span>
              <span className="mt-1 block text-[11px] text-muted-foreground">
                Central telephone
              </span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-navy-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-700" />
          </a>

          <a
            href={"mailto:" + FIRM.email}
            className="group flex min-w-0 items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxe-lg"
            aria-label={"Email the firm at " + FIRM.email}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
                Write to us
              </span>
              <span className="mt-1 block truncate text-[14px] font-semibold text-navy-950">
                {FIRM.email}
              </span>
              <span className="mt-1 block text-[11px] text-muted-foreground">
                Central email address
              </span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-navy-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-700" />
          </a>

          <button
            type="button"
            onClick={() => useSite.getState().openDialog("callback")}
            className="group flex min-w-0 items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 text-left shadow-luxe transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxe-lg"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
              <CalendarDays className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
                Prefer a call back?
              </span>
              <span className="mt-1 block text-[15px] font-semibold text-navy-950">
                Request a call
              </span>
              <span className="mt-1 block text-[11px] text-muted-foreground">
                Leave your contact details
              </span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-navy-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-700" />
          </button>
        </div>
      </section>

      <section className="bg-[#f7f6f2] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Where to find us"
              title={
                <>
                  Three cities. One{" "}
                  <span className="gold-text italic">connected legal team.</span>
                </>
              }
              lead="Visit the Pretoria head office, or contact the firm to arrange an appointment in Middelburg or Cape Town. Branch-level directions are confirmed directly with the team."
            />

            <Reveal delay={0.05}>
              <OfficeDirectory showContactDetails={false} />
            </Reveal>

            <div className="rounded-[1.7rem] border border-navy-100 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ivory text-gold-700">
                  <Clock3 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-700">
                    Central office hours
                  </p>
                  <p className="mt-1.5 text-[16px] font-semibold text-navy-950">
                    {FIRM.hours}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                    Consultations outside these hours may be arranged directly
                    with the firm.
                  </p>
                </div>
              </div>
            </div>

            <ConflictNotice />
          </div>

          <div id="contact-enquiry" className="scroll-mt-28">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-6 shadow-luxe sm:p-9">
                <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-gold-200/35 blur-[70px]" />
                <div className="relative">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-700">
                        Start here
                      </p>
                      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-950">
                        Make an enquiry
                      </h2>
                      <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-muted-foreground">
                        Give us a concise, non-confidential overview. Select
                        the practice area closest to your matter, or choose
                        general if you are unsure.
                      </p>
                    </div>
                    <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-200 bg-ivory text-gold-700 sm:flex">
                      <Mail className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-navy-100 bg-[#f8f7f3] px-4 py-3">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-gold-700" />
                    <p className="text-[11.5px] leading-relaxed text-navy-800/75">
                      Please do not include confidential documents or sensitive
                      case information at this stage.
                    </p>
                  </div>

                  <EnquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute -left-28 top-0 h-80 w-80 rounded-full bg-gold-500/10 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/[0.04] blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-300">
                A considered process
              </p>
              <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">
                What happens after you make contact?
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/60">
                The first exchange is about understanding the nature of the
                matter and establishing whether the firm can consider it.
              </p>
              <Button
                size="lg"
                variant="gold"
                className="mt-7 h-12 rounded-full px-7"
                onClick={() => useSite.getState().openDialog("booking")}
              >
                Arrange a consultation
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {FIRST_CONTACT_STEPS.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 sm:p-6"
                >
                  <p className="font-display text-2xl italic text-gold-300">
                    {step.number}
                  </p>
                  <h3 className="mt-5 text-[15px] font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.75] text-white/55">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-relaxed text-white/50">
              Know which team you need? Explore the firm&apos;s practice areas.
            </p>
            <div className="flex flex-wrap gap-2">
              {PRACTICE_AREAS.map((area) => (
                <button
                  key={area.slug}
                  type="button"
                  onClick={() => navigate("#/practice/" + area.slug)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-[11px] font-semibold text-white/75 transition-colors hover:border-gold-400/60 hover:bg-gold-500/10 hover:text-gold-200"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: area.accent }}
                  >
                    <Icon name={area.icon} className="h-3 w-3" />
                  </span>
                  {area.shortName}
                  <ArrowUpRight className="h-3 w-3 text-gold-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
