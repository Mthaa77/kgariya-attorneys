export function SectionDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${dark ? "bg-navy-950" : "bg-white"}`} aria-hidden="true">
      <div className={`h-px w-full max-w-7xl ${dark ? "bg-white/10" : "bg-navy-100/80"}`} />
      <span className={`absolute flex size-7 items-center justify-center rounded-full border ${dark ? "border-gold-400/50 bg-navy-950" : "border-gold-500/50 bg-white"}`}>
        <span className="size-1.5 rotate-45 bg-gold-500" />
      </span>
    </div>
  );
}
