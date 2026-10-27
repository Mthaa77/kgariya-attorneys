"use client";

import { Building2 } from "lucide-react";
import { navigate } from "@/lib/router";
import { Button } from "@/components/ui/button";

export function Notfound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-navy-950 px-6 text-center">
      <Building2 className="h-10 w-10 text-gold-500" />
      <h1 className="mt-6 font-display text-4xl font-semibold text-white">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-[14.5px] text-white/65">
        The page you are looking for does not exist or has moved. Try the home
        page, or search the site.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="gold" className="rounded-full px-6" onClick={() => navigate("#/")}>
          Back to home
        </Button>
      </div>
    </section>
  );
}
