"use client";

import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { OFFICES, FIRM } from "@/lib/site-data";

type OfficeDirectoryProps = {
  variant?: "full" | "footer";
  showContactDetails?: boolean;
};

export function OfficeDirectory({
  variant = "full",
  showContactDetails = true,
}: OfficeDirectoryProps) {
  if (variant === "footer") {
    return (
      <ul className="mt-5 space-y-4">
        {OFFICES.map((office) => (
          <li key={office.id} className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold text-white/85">
                {office.name}
              </span>
              <span className="mt-0.5 block text-[12px] text-white/55">
                {office.city}, {office.province}
              </span>
              {office.address && (
                <span className="mt-1 block text-[11.5px] leading-relaxed text-white/45">
                  {office.address.line1}
                  <br />
                  {office.address.line2}
                  <br />
                  {office.address.postal}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {OFFICES.map((office, index) => {
          const hasAddress = Boolean(office.address);
          return (
            <article
              key={office.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-navy-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxe sm:p-6"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(90deg,#86682c,#d9bd7c,#c6a55c)"
                      : "linear-gradient(90deg,rgba(198,165,92,.25),rgba(198,165,92,.8),rgba(198,165,92,.25))",
                }}
              />
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ivory text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-navy-100 bg-ivory px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-navy-700">
                  {office.label}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[22px] font-semibold leading-tight text-navy-950">
                {office.city}
              </h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-gold-700">
                {office.province}
              </p>

              {hasAddress ? (
                <>
                  <p className="mt-5 flex-1 text-[12.5px] leading-[1.8] text-muted-foreground">
                    {office.address!.line1}
                    <br />
                    {office.address!.line2}
                    <br />
                    {office.address!.city}, {office.address!.province}{" "}
                    {office.address!.postal}
                    <br />
                    {office.address!.country}
                  </p>
                  {office.mapsQuery && (
                    <a
                      href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(office.mapsQuery)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 text-[12px] font-bold text-navy-900 transition-colors hover:text-gold-700"
                    >
                      Get directions
                      <ArrowUpRight className="h-3.5 w-3.5 text-gold-600" />
                    </a>
                  )}
                </>
              ) : (
                <div className="mt-5 flex-1 rounded-xl border border-dashed border-navy-200 bg-ivory/70 p-4">
                  <p className="text-[12px] leading-relaxed text-navy-800/75">
                    Contact the firm to confirm the office location details and
                    arrange an appointment.
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {showContactDetails && (
        <div className="grid gap-4 rounded-[1.6rem] border border-navy-100 bg-navy-950 p-5 text-white shadow-luxe sm:grid-cols-3 sm:p-6">
          <a
            href={FIRM.phoneHref}
            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300">
              <Phone className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Central telephone
              </span>
              <span className="mt-1 block truncate text-[13px] font-semibold text-white">
                {FIRM.phone}
              </span>
            </span>
          </a>
          <a
            href={"mailto:" + FIRM.email}
            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300">
              <Mail className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Official email
              </span>
              <span className="mt-1 block truncate text-[13px] font-semibold text-white">
                {FIRM.email}
              </span>
            </span>
          </a>
          <div className="flex items-center gap-3 rounded-xl p-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300">
              <Clock3 className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Office hours
              </span>
              <span className="mt-1 block text-[13px] font-semibold text-white">
                {FIRM.hours}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
