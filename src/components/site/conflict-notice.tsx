"use client";

import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pre-mandate conflict-check warning — appears near every intake channel. */
export function ConflictNotice({
  className,
  dark = false,
  children,
}: {
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex gap-3.5 rounded-2xl border p-4 sm:p-5",
        dark
          ? "border-gold-500/30 bg-gold-500/10"
          : "border-gold-500/40 bg-gold-200/40",
        className
      )}
      role="note"
    >
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
      <div>
        <p
          className={cn(
            "text-[12px] font-bold uppercase tracking-[0.16em]",
            dark ? "text-gold-300" : "text-gold-700"
          )}
        >
          Conflict-check notice
        </p>
        <p
          className={cn(
            "mt-1.5 text-[13px] leading-relaxed",
            dark ? "text-white/75" : "text-navy-900/80"
          )}
        >
          {children ??
            "Please do not upload or transmit confidential case documents before formal conflict screening is completed and a written mandate is signed. Until then, we cannot accept such material — this protects you and our existing clients."}
        </p>
      </div>
    </div>
  );
}
