"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { navigate } from "@/lib/router";
import type { Matter } from "@/lib/site-data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Anonymised representative matter card with outcome label. */
export function MatterCard({ matter, index }: { matter: Matter; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="card-lift group h-full overflow-hidden rounded-2xl border-navy-100/80">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-ivory px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-700">
              {matter.sector}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-950/90 px-3 py-1 text-[10.5px] font-bold text-emerald-300">
              <BadgeCheck className="h-3 w-3" />
              {matter.outcome}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <h3 className="font-display text-[17px] font-semibold leading-snug text-navy-900">
            {matter.title}
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
            {matter.detail}
          </p>
        </CardContent>
        <CardFooter className="pt-2">
          <p className="text-[10.5px] leading-relaxed text-muted-foreground/70">
            Representative matter profile — anonymised. No client names, case numbers
            or confidential details are published, in line with LPC marketing rules.
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function MatterDeck({
  matters,
  ctaLabel = "Discuss a similar matter",
}: {
  matters: Matter[];
  ctaLabel?: string;
}) {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {matters.map((m, i) => (
          <MatterCard key={i} matter={m} index={i} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("#/contact")}
          className={cn(
            "group inline-flex items-center gap-2 text-[14px] font-bold text-gold-700",
            "link-underline"
          )}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
