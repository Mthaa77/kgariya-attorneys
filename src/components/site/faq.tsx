"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/site-data";

export function FaqAccordion({ dark = false }: { dark?: boolean }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQS.map((f, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className={dark ? "border-white/10" : "border-navy-100"}
        >
          <AccordionTrigger
            className={`py-5 text-left font-display text-[16.5px] font-semibold hover:no-underline ${
              dark ? "text-white hover:text-gold-300" : "text-navy-900 hover:text-gold-700"
            }`}
          >
            <span className="flex items-baseline gap-3.5">
              <span className="text-[11px] font-bold tracking-widest text-gold-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {f.q}
            </span>
          </AccordionTrigger>
          <AccordionContent
            className={`pb-6 pl-9 text-[14.5px] leading-relaxed ${
              dark ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
