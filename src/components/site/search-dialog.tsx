"use client";

import { useMemo, useState } from "react";
import { ArrowRight, FileText, Scale, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSite } from "@/lib/store";
import { navigate } from "@/lib/router";
import { PRACTICE_AREAS } from "@/lib/site-data";
import { ARTICLES } from "@/lib/insights";

type Hit = { title: string; sub: string; route: string; kind: "page" | "practice" | "insight" };

const PAGES: Hit[] = [
  { title: "Home", sub: "Positioning, practice areas, credentials", route: "#/", kind: "page" },
  { title: "Our People", sub: "Director profile & credentials", route: "#/people", kind: "page" },
  { title: "About the Firm", sub: "History, values, trust architecture", route: "#/about", kind: "page" },
  { title: "Kgariya & Co Group", sub: "Group synergies", route: "#/group", kind: "page" },
  { title: "Insights", sub: "Articles, legal updates & case notes", route: "#/insights", kind: "page" },
  { title: "Joining the Firm", sub: "Succession & practice transition", route: "#/joining", kind: "page" },
  { title: "Careers", sub: "Vacancies & articles of clerkship", route: "#/careers", kind: "page" },
  { title: "Contact", sub: "Practice-routed enquiry & office", route: "#/contact", kind: "page" },
  { title: "Legal & Compliance", sub: "Privacy, PAIA, cookies, terms, LPC", route: "#/legal", kind: "page" },
];

export function SearchDialog() {
  const { dialog, closeDialog } = useSite();
  const open = dialog === "search";

  const index = useMemo<Hit[]>(
    () => [
      ...PAGES,
      ...PRACTICE_AREAS.map((p) => ({
        title: p.name,
        sub: p.tagline,
        route: `#/practice/${p.slug}`,
        kind: "practice" as const,
      })),
      ...ARTICLES.map((a) => ({
        title: a.title,
        sub: `${a.category} · ${a.readTime}`,
        route: `#/insights/${a.slug}`,
        kind: "insight" as const,
      })),
    ],
    []
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="rounded-3xl border-navy-100 p-0 sm:max-w-xl">
        {/* Inner component mounts fresh on every open, so the query resets naturally */}
        <SearchInner index={index} />
      </DialogContent>
    </Dialog>
  );
}

function SearchInner({ index }: { index: Hit[] }) {
  const { closeDialog } = useSite();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return index.slice(0, 8);
    return index
      .filter(
        (h) =>
          h.title.toLowerCase().includes(needle) ||
          h.sub.toLowerCase().includes(needle)
      )
      .slice(0, 10);
  }, [q, index]);

  return (
    <>
      <DialogHeader className="px-6 pb-2 pt-6">
          <DialogTitle className="sr-only">Search the site</DialogTitle>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search practice areas, insights, pages…"
              className="h-13 rounded-2xl border-navy-100 bg-ivory pl-11 text-[15px]"
            />
          </div>
        </DialogHeader>
        <div className="max-h-[55vh] overflow-y-auto px-3 pb-3 scroll-thin">
          {results.length === 0 && (
            <p className="px-4 py-10 text-center text-[13.5px] text-muted-foreground">
              No matches. Try “litigation”, “development”, “bonds” or “POPIA”.
            </p>
          )}
          {results.map((h) => (
            <button
              key={h.route + h.title}
              onClick={() => {
                navigate(h.route);
                closeDialog();
              }}
              className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-ivory"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                {h.kind === "insight" ? (
                  <FileText className="h-4 w-4" />
                ) : h.kind === "practice" ? (
                  <Scale className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold text-navy-900">
                  {h.title}
                </span>
                <span className="block truncate text-[12px] text-muted-foreground">
                  {h.sub}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
    </>
  );
}
