"use client";

/**
 * Law SVG art — advanced animated SVG components, South African law themed.
 * Hand-built navy+gold line art animated with framer-motion:
 * strokes draw on as sections enter the viewport, then settle into calm
 * ambient loops (pendulum scales, gavel strike, protea breathing,
 * mandate arcs across the nine provinces, rotating justice seal).
 * Every decorative loop is disabled under prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "-60px" } as const;

/* Brand palette (matches globals.css tokens) */
const NAVY = "#060f1f";
const GOLD = "#c6a55c";
const GOLD_LIGHT = "#e5d09b";
const GOLD_SOFT = "#f0e3c0";
const IVORY = "#f6f4ee";

/** Shared gold gradient — unique id per artwork (SVG ids are document-global). */
function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={GOLD_SOFT} />
        <stop offset="52%" stopColor={GOLD} />
        <stop offset="100%" stopColor="#9a7a35" />
      </linearGradient>
    </defs>
  );
}

/** Draw-on stroke: pathLength 0 → 1 when scrolled into view (once). */
function draw(reduced: boolean | null, delay = 0, duration = 1.2) {
  return {
    initial: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: VIEW,
    transition: {
      pathLength: { delay, duration, ease: EASE },
      opacity: { delay, duration: 0.3, ease: "easeOut" as const },
    },
  };
}

/** Fade-in group helper (entrance only, no loop conflicts). */
function Fade({
  children,
  delay = 0,
  duration = 0.9,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEW}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.g>
  );
}

/* ————————————————————————————————————————————————
   1 · Scales of Justice — showpiece ghost (dark sections)
———————————————————————————————————————————————— */

export function ScalesOfJusticeArt({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 340 320" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="ksvg-gold" />
      {/* ambient glow */}
      <motion.circle
        cx="170" cy="152" r="126" fill="url(#ksvg-gold)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.07 }} viewport={VIEW}
        transition={{ duration: 2, delay: 0.8 }}
      />
      {/* finial diamond + orb */}
      <motion.path d="M170 26 L177 38 L170 50 L163 38 Z" stroke="url(#ksvg-gold)" strokeWidth="2" strokeLinejoin="round" {...draw(reduced, 0, 0.7)} />
      <motion.circle cx="170" cy="66" r="7" stroke="url(#ksvg-gold)" strokeWidth="2" {...draw(reduced, 0.15, 0.6)} />
      {/* capital + column — solid gold: objectBoundingBox gradients don't paint on straight H/V lines */}
      <motion.path d="M148 84 H192" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.35, 0.6)} />
      <motion.path d="M170 73 V250" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.3, 0.9)} />
      {/* beam */}
      <motion.path d="M86 96 H254" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.55, 1)} />
      <motion.circle
        cx="86" cy="96" r="4" fill="url(#ksvg-gold)" style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
        transition={{ delay: 1.35, type: "spring", stiffness: 260, damping: 14 }}
      />
      <motion.circle
        cx="254" cy="96" r="4" fill="url(#ksvg-gold)" style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
        transition={{ delay: 1.45, type: "spring", stiffness: 260, damping: 14 }}
      />
      {/* left pan — pendulum sway */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "top center" }}
        animate={reduced ? undefined : { rotate: [0, 2.4, 0, -2, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.path d="M86 98 L68 146 M86 98 L104 146" stroke="url(#ksvg-gold)" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.05, 0.7)} />
        <motion.path d="M64 148 Q86 170 108 148" stroke="url(#ksvg-gold)" strokeWidth="2.2" strokeLinecap="round" {...draw(reduced, 1.25, 0.7)} />
        <motion.path d="M64 148 Q86 158 108 148" stroke="url(#ksvg-gold)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" {...draw(reduced, 1.35, 0.6)} />
      </motion.g>
      {/* right pan — opposite phase */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "top center" }}
        animate={reduced ? undefined : { rotate: [0, -2.4, 0, 2, 0] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
      >
        <motion.path d="M254 98 L236 146 M254 98 L272 146" stroke="url(#ksvg-gold)" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.15, 0.7)} />
        <motion.path d="M232 148 Q254 170 276 148" stroke="url(#ksvg-gold)" strokeWidth="2.2" strokeLinecap="round" {...draw(reduced, 1.35, 0.7)} />
        <motion.path d="M232 148 Q254 158 276 148" stroke="url(#ksvg-gold)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" {...draw(reduced, 1.45, 0.6)} />
      </motion.g>
      {/* base steps */}
      <motion.path d="M146 250 H194 M130 264 H210 M112 280 H228" stroke="url(#ksvg-gold)" strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.75, 0.9)} />
      {/* laurel arcs */}
      <motion.path d="M84 240 Q104 266 132 272" stroke="url(#ksvg-gold)" strokeWidth="1.4" strokeLinecap="round" {...draw(reduced, 1.6, 0.8)} />
      <motion.path d="M256 240 Q236 266 208 272" stroke="url(#ksvg-gold)" strokeWidth="1.4" strokeLinecap="round" {...draw(reduced, 1.7, 0.8)} />
      {/* ground diamond */}
      <motion.path
        d="M170 296 L174 301 L170 306 L166 301 Z" fill="url(#ksvg-gold)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.9 }} viewport={VIEW}
        transition={{ delay: 1.9, type: "spring", stiffness: 200, damping: 12 }}
      />
    </svg>
  );
}

/* ————————————————————————————————————————————————
   2 · Gavel strike — accent art (journey / dark sections)
———————————————————————————————————————————————— */

export function GavelStrikeArt({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 260 240" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="kgav-gold" />
      <motion.circle
        cx="130" cy="140" r="100" fill="url(#kgav-gold)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.06 }} viewport={VIEW}
        transition={{ duration: 2, delay: 0.5 }}
      />
      {/* sound block */}
      <motion.ellipse cx="184" cy="178" rx="34" ry="8" stroke="url(#kgav-gold)" strokeWidth="2" {...draw(reduced, 0.15, 0.7)} />
      <motion.path d="M150 178 V196 A34 8 0 0 0 218 196 V178" stroke="url(#kgav-gold)" strokeWidth="2" {...draw(reduced, 0.3, 0.7)} />
      {/* impact rings — synced to the strike */}
      {[0, 1].map((i) => (
        <motion.circle
          key={i} cx="168" cy="174" r="5" fill="none" stroke="url(#kgav-gold)" strokeWidth="1.8"
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0 } : { opacity: [0, 0.75, 0], r: [4, 26] }}
          transition={{ duration: 0.85, times: [0, 0.25, 1], repeat: Infinity, repeatDelay: 2.75, delay: 1.3 + i * 0.2, ease: "easeOut" }}
        />
      ))}
      {/* sparks */}
      <motion.path
        d="M196 160 L206 150" stroke="url(#kgav-gold)" strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 0 } : { opacity: [0, 1, 0], x: [0, 5], y: [0, -5] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.1, delay: 1.32, ease: "easeOut" }}
      />
      <motion.path
        d="M204 174 L217 170" stroke="url(#kgav-gold)" strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 0 } : { opacity: [0, 1, 0], x: [0, 6] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.1, delay: 1.38, ease: "easeOut" }}
      />
      {/* gavel — pivot at handle end */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }}
        animate={reduced ? undefined : { rotate: [-18, 4, 4, -18] }}
        transition={{ duration: 3.6, times: [0, 0.3, 0.45, 1], repeat: Infinity, ease: ["easeIn", "easeOut", "easeInOut"] }}
      >
        <motion.path d="M52 208 L148 132" stroke="url(#kgav-gold)" strokeWidth="4.5" strokeLinecap="round" {...draw(reduced, 0.5, 0.8)} />
        <g transform="rotate(49 158 124)">
          <motion.rect x="128" y="111" width="60" height="26" rx="10" stroke="url(#kgav-gold)" strokeWidth="2.5" fill="rgba(198,165,92,0.14)" {...draw(reduced, 0.7, 0.7)} />
          <motion.rect
            x="119" y="106" width="11" height="36" rx="4.5" fill="url(#kgav-gold)"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
            transition={{ delay: 1.15, type: "spring", stiffness: 240, damping: 14 }}
          />
          <motion.rect
            x="186" y="106" width="11" height="36" rx="4.5" fill="url(#kgav-gold)"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
            transition={{ delay: 1.25, type: "spring", stiffness: 240, damping: 14 }}
          />
        </g>
      </motion.g>
    </svg>
  );
}

/* ————————————————————————————————————————————————
   3 · Courthouse columns — civic ornament (light/dark)
———————————————————————————————————————————————— */

export function CourthouseColumnsArt({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduced = useReducedMotion();
  const line = tone === "dark" ? IVORY : NAVY;
  const dentils = Array.from({ length: 23 }, (_, i) => `M${124 + i * 14} 132 V148`).join(" ");
  const cols = [120, 200, 280, 360, 440];
  return (
    <svg viewBox="0 0 560 330" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="kcol-gold" />
      {/* rising sun over the pediment */}
      <motion.circle
        cx="280" cy="118" r="64" fill="url(#kcol-gold)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }} viewport={VIEW}
        transition={{ duration: 1.8, delay: 0.5 }}
      />
      <Fade delay={0.9} duration={1.2}>
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="280" cy="118" r="84" stroke={GOLD} strokeWidth="1" strokeDasharray="2 10" opacity="0.4" />
        </motion.g>
      </Fade>
      {/* pediment */}
      <motion.path d="M100 130 L280 42 L460 130" stroke="url(#kcol-gold)" strokeWidth="2.5" strokeLinejoin="round" {...draw(reduced, 0.1, 1.2)} />
      <motion.path d="M136 126 L280 58 L424 126" stroke={line} strokeOpacity={tone === "dark" ? 0.22 : 0.25} strokeWidth="1.5" strokeLinejoin="round" {...draw(reduced, 0.35, 1)} />
      {/* entablature + dentils */}
      <motion.path d="M92 130 H468 M92 150 H468" stroke={line} strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" {...draw(reduced, 0.6, 0.9)} />
      <motion.path d={dentils} stroke={line} strokeOpacity="0.16" strokeWidth="1.2" {...draw(reduced, 0.9, 0.8)} />
      {/* columns */}
      {cols.map((x, i) => (
        <motion.g key={x}>
          <motion.path d={`M${x - 19} 154 H${x + 19} M${x - 21} 268 H${x + 21}`} stroke={line} strokeOpacity="0.32" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 0.9 + i * 0.1, 0.6)} />
          <motion.path d={`M${x - 13} 164 V264 M${x + 13} 164 V264`} stroke={line} strokeOpacity="0.26" strokeWidth="1.4" strokeLinecap="round" {...draw(reduced, 1 + i * 0.1, 0.7)} />
        </motion.g>
      ))}
      {/* steps */}
      <motion.path d="M76 288 H484 M62 302 H498 M48 316 H512" stroke={line} strokeOpacity="0.34" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.5, 1)} />
      {/* keystone diamond */}
      <motion.path d="M280 88 L286 97 L280 106 L274 97 Z" stroke="url(#kcol-gold)" strokeWidth="1.8" strokeLinejoin="round" {...draw(reduced, 1.4, 0.6)} />
    </svg>
  );
}

/* ————————————————————————————————————————————————
   4 · King protea — national flower emblem
———————————————————————————————————————————————— */

const PETAL_OUT = "M100 26 C112 46 114 72 100 92 C86 72 88 46 100 26 Z";
const PETAL_IN = "M100 54 C108 66 110 82 100 94 C90 82 92 66 100 54 Z";

export function ProteaEmblem({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="kpro-gold" />
      {/* outer dashed ring — slow rotate */}
      <Fade duration={1.4}>
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="92" stroke="#a9863d" strokeWidth="1" strokeDasharray="1.5 9" strokeOpacity="0.55" />
        </motion.g>
      </Fade>
      <motion.circle cx="100" cy="100" r="78" stroke={NAVY} strokeOpacity="0.1" strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ duration: 1.2, delay: 0.2 }} />
      {/* breathing petals */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={`o${i}`} transform={`rotate(${i * 36} 100 100)`}>
            <motion.path
              d={PETAL_OUT} stroke="#a9863d" strokeWidth="1.5" fill="rgba(198,165,92,0.08)"
              style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
              initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
              transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 130, damping: 15 }}
            />
          </g>
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={`i${i}`} transform={`rotate(${18 + i * (360 / 7)} 100 100)`}>
            <motion.path
              d={PETAL_IN} stroke="#a9863d" strokeWidth="1.3" fill="rgba(198,165,92,0.22)"
              style={{ transformBox: "view-box", transformOrigin: "100px 100px" }}
              initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
              transition={{ delay: 1.1 + i * 0.06, type: "spring", stiffness: 140, damping: 15 }}
            />
          </g>
        ))}
      </motion.g>
      {/* heart */}
      <motion.circle
        cx="100" cy="100" r="10" fill="url(#kpro-gold)" style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={VIEW}
        transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 12 }}
      />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <motion.circle
            key={`d${i}`} cx={100 + 17 * Math.cos(a)} cy={100 + 17 * Math.sin(a)} r="1.6" fill="#a9863d"
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} viewport={VIEW} transition={{ delay: 1.8 + i * 0.05 }}
          />
        );
      })}
      {/* leaves */}
      <motion.path d="M100 178 C86 164 70 160 56 164 C68 176 84 180 100 178 Z" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1.4" fill="rgba(10,27,51,0.04)" strokeLinejoin="round" {...draw(reduced, 1.9, 0.7)} />
      <motion.path d="M100 178 C114 164 130 160 144 164 C132 176 116 180 100 178 Z" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1.4" fill="rgba(10,27,51,0.04)" strokeLinejoin="round" {...draw(reduced, 2, 0.7)} />
    </svg>
  );
}

/* ————————————————————————————————————————————————
   5 · SA mandate map — draw-on Republic + Gauteng pin +
       travelling briefs arcs (dark sections)
———————————————————————————————————————————————— */

const SA_OUTLINE =
  "M56 190 C90 188 124 186 156 182 L156 98 C160 114 166 132 172 148 C198 150 240 140 283 123 C298 121 312 120 327 118 C332 104 336 90 339 77 C347 62 355 46 364 35 C376 34 388 35 399 39 C403 60 406 88 409 116 C405 118 400 120 396 119 C391 121 386 128 384 136 C386 146 388 156 394 160 C398 162 402 162 406 160 C418 157 431 154 443 151 C439 170 431 192 422 215 C410 240 394 260 374 272 C354 284 336 293 318 303 C300 312 282 318 262 320 C240 322 216 324 194 328 C184 331 174 336 164 340 C152 346 138 344 130 334 C124 326 120 318 118 308 C112 288 104 268 96 252 C84 230 72 208 56 190 Z";

const MAP_CITIES: [number, number][] = [
  [122, 320], // Cape Town
  [417, 214], // Durban
  [288, 318], // Gqeberha
  [297, 194], // Bloemfontein
  [366, 77], // Polokwane
  [180, 190], // Upington
];

const MAP_ARCS: { d: string; delay: number }[] = [
  { d: "M330 134 Q204 196 122 320", delay: 1.9 }, // Cape Town
  { d: "M330 134 Q395 149 417 214", delay: 2.05 }, // Durban
  { d: "M330 134 Q282 224 288 318", delay: 2.2 }, // Gqeberha
  { d: "M330 134 Q294 150 297 194", delay: 2.35 }, // Bloemfontein
  { d: "M330 134 Q348 88 366 77", delay: 2.5 }, // Polokwane
  { d: "M330 134 Q246 133 180 190", delay: 2.65 }, // Upington
];

export function SAMandateMap({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 460 400" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="kmap-gold" />
      {/* graticule */}
      <Fade duration={1.2}>
        <g>
          {[70, 140, 210, 280, 350].map((y) => (
            <line key={`h${y}`} x1="14" x2="446" y1={y} y2={y} stroke={IVORY} strokeOpacity="0.05" />
          ))}
          {[90, 180, 270, 360].map((x) => (
            <line key={`v${x}`} x1={x} x2={x} y1="14" y2="386" stroke={IVORY} strokeOpacity="0.05" />
          ))}
        </g>
      </Fade>
      {/* ocean labels */}
      <Fade delay={1.4} duration={1}>
        <g fontSize="9" fontStyle="italic" letterSpacing="3" fill={IVORY} fillOpacity="0.28">
          <text x="26" y="316">ATLANTIC</text>
          <text x="404" y="316" textAnchor="middle" transform="rotate(0 404 316)">INDIAN</text>
        </g>
      </Fade>
      {/* compass */}
      <Fade delay={1.2} duration={1}>
        <g>
          <circle cx="52" cy="58" r="14" stroke={IVORY} strokeOpacity="0.18" strokeWidth="1" />
          <path d="M52 49 L55.5 61 L52 58 L48.5 61 Z" fill="url(#kmap-gold)" />
          <text x="52" y="44" textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="1" fill={IVORY} fillOpacity="0.45">N</text>
        </g>
      </Fade>
      {/* the Republic */}
      <motion.path
        d={SA_OUTLINE} stroke="url(#kmap-gold)" strokeWidth="2.4" strokeLinejoin="round" fill="rgba(198,165,92,0.05)"
        {...draw(reduced, 0.2, 2.2)}
      />
      {/* Lesotho enclave */}
      <motion.circle
        cx="334" cy="196" r="25" stroke={GOLD_LIGHT} strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="4 5" fill="rgba(6,15,31,0.35)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ delay: 1.6, duration: 0.8 }}
      />
      <motion.text
        x="334" y="234" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill={IVORY} fillOpacity="0.4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ delay: 1.8, duration: 0.6 }}
      >
        LESOTHO
      </motion.text>
      {/* mandate arcs + travelling comets */}
      {MAP_ARCS.map((a) => (
        <g key={a.d}>
          <motion.path d={a.d} stroke="#d9bd7c" strokeOpacity="0.55" strokeWidth="1.4" fill="none" {...draw(reduced, a.delay, 1)} />
          {!reduced && (
            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ delay: a.delay + 0.9, duration: 0.4 }}>
              <motion.path
                d={a.d} pathLength={1} strokeDasharray="0.06 0.94" stroke={GOLD_SOFT} strokeWidth="1.7" strokeLinecap="round" fill="none"
                animate={{ strokeDashoffset: [0, -1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: a.delay + 0.9 }}
              />
            </motion.g>
          )}
        </g>
      ))}
      {/* city dots */}
      {MAP_CITIES.map(([x, y], i) => (
        <motion.circle
          key={`${x}-${y}`} cx={x} cy={y} r="3" fill={IVORY} fillOpacity="0.75"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
          transition={{ delay: 2.6 + i * 0.1, type: "spring", stiffness: 300, damping: 16 }}
        />
      ))}
      {/* Gauteng seat — pin + ripple */}
      <Fade delay={2.9} duration={0.4}>
        <g>
          {[0, 1].map((i) => (
            <motion.circle
              key={i} cx="330" cy="134" r="6" fill="none" stroke={GOLD_LIGHT} strokeWidth="1.4"
              animate={reduced ? undefined : { r: [6, 26], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 3 + i * 1.1 }}
            />
          ))}
        </g>
      </Fade>
      <motion.circle
        cx="330" cy="134" r="7" fill="url(#kmap-gold)" style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={VIEW}
        transition={{ delay: 3, type: "spring", stiffness: 260, damping: 12 }}
      />
      <motion.circle cx="330" cy="134" r="2.6" fill={NAVY} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ delay: 3.3 }} />
      <motion.text
        x="346" y="126" fontSize="9" letterSpacing="2" fontWeight="700" fill={GOLD_LIGHT} fillOpacity="0.9"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ delay: 3.4 }}
      >
        GAUTENG
      </motion.text>
    </svg>
  );
}

/* ————————————————————————————————————————————————
   6 · Contract signing — "agreed in writing" (light)
———————————————————————————————————————————————— */

const SIGNATURE = "M86 188 C96 172 104 196 114 182 C122 170 128 194 140 180 C148 170 154 190 164 180 L188 174";

export function ContractSigningArt({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 280 240" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="ksig-gold" />
      {/* document */}
      <motion.g initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.8, ease: EASE }}>
        <rect x="64" y="22" width="150" height="192" rx="12" stroke={NAVY} strokeOpacity="0.3" strokeWidth="1.8" fill="#ffffff" />
        <rect x="64" y="22" width="150" height="192" rx="12" stroke="url(#ksig-gold)" strokeWidth="1" fill="none" strokeOpacity="0.5" />
      </motion.g>
      {/* typed lines */}
      {([
        [84, 54, 64, 6, 0.35],
        [84, 82, 112, 4, 0.16],
        [84, 100, 96, 4, 0.16],
        [84, 118, 112, 4, 0.16],
        [84, 136, 72, 4, 0.16],
      ] as const).map(([x, y, w, h, o], i) => (
        <motion.rect
          key={y} x={x} y={y} width={w} height={h} rx={h / 2} fill={NAVY} fillOpacity={o}
          style={{ transformBox: "fill-box", transformOrigin: "left center" }}
          initial={{ scaleX: reduced ? 1 : 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={VIEW}
          transition={{ delay: 0.4 + i * 0.14, duration: 0.5, ease: EASE }}
        />
      ))}
      {/* signature */}
      <motion.path d={SIGNATURE} stroke="url(#ksig-gold)" strokeWidth="2" strokeLinecap="round" fill="none" {...draw(reduced, 1.3, 1.5)} />
      {/* fountain pen */}
      <motion.g
        transform="translate(86 178) rotate(-42)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW}
        transition={{ opacity: { delay: 1.25, duration: 0.3 }, default: { delay: 1.3, duration: 1.5, ease: "easeInOut" } }}
        animate={reduced ? undefined : { x: [0, 26, 52, 78, 100], y: [0, -9, 0, -8, -14] }}
      >
        <rect x="-4.5" y="-40" width="9" height="36" rx="4" fill={NAVY} fillOpacity="0.85" />
        <rect x="-4.5" y="-40" width="9" height="7" rx="3" fill="url(#ksig-gold)" />
        <path d="M-4.5 -4 L4.5 -4 L0 10 Z" fill="url(#ksig-gold)" />
      </motion.g>
      {/* wax seal */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0, rotate: -14 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }} viewport={VIEW}
        transition={{ delay: 2.95, type: "spring", stiffness: 220, damping: 13 }}
      >
        <circle cx="212" cy="196" r="20" fill="url(#ksig-gold)" />
        <circle cx="212" cy="196" r="14.5" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 3" fill="none" />
        <g stroke={NAVY} strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M204 194 H220 M212 187 V201 M204 194 L200 199 M204 194 L208 199 M220 194 L216 199 M220 194 L224 199 M206 201 H218" />
        </g>
      </motion.g>
      {/* seal glow pulse */}
      <Fade delay={3.4} duration={0.6}>
        <motion.circle
          cx="212" cy="196" r="20" fill="none" stroke={GOLD} strokeWidth="1.2"
          animate={reduced ? undefined : { r: [20, 27], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      </Fade>
    </svg>
  );
}

/* ————————————————————————————————————————————————
   7 · Justice seal — rotating circular text emblem (dark)
———————————————————————————————————————————————— */

export function JusticeSeal({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="kseal-gold" />
      <defs>
        <path id="kseal-arc" d="M100 24 a76 76 0 1 1 -0.01 0" fill="none" />
      </defs>
      {/* rotating inscription */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <text fontSize="10" letterSpacing="2.2" fontWeight="700" fill={GOLD} fillOpacity="0.7">
          <textPath href="#kseal-arc">KGARIYA ATTORNEYS · REPUBLIC OF SOUTH AFRICA ·</textPath>
        </text>
      </motion.g>
      {/* counter-rotating dashed ring */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="60" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 7" fill="none" />
      </motion.g>
      {/* scales of justice */}
      <motion.g
        initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW}
        transition={{ duration: 1, ease: EASE }}
        stroke="url(#kseal-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      >
        <path d="M100 62 L105 69 L100 76 L95 69 Z" />
        <path d="M100 78 V126" stroke={GOLD} />
        <path d="M64 92 H136" stroke={GOLD} />
        <path d="M64 92 L58 106 M64 92 L70 106" />
        <path d="M136 92 L130 106 M136 92 L142 106" />
        <path d="M54 108 Q64 118 74 108" />
        <path d="M126 108 Q136 118 146 108" />
        <path d="M86 126 H114" stroke={GOLD} />
        <path d="M92 134 H108" stroke={GOLD} />
      </motion.g>
    </svg>
  );
}

/* ————————————————————————————————————————————————
   8 · Constitution codex — showcase medallion (light sections)
   The open Constitution with scales of justice rising from its spine,
   wreathed in protea-like laurel inside a rotating gold halo — the
   foundation beneath the firm's six practices.
———————————————————————————————————————————————— */

const CODEX_CX = 380;
const CODEX_CY = 232;

/* Round computed geometry to 2dp — server/client trig differs in the last
   ULP, and un-rounded coordinates break React hydration (attr mismatch). */
const r2 = (n: number) => +n.toFixed(2);

const CODEX_RAYS = Array.from({ length: 20 }, (_, i) => {
  const a = (i * Math.PI * 2) / 20;
  return {
    x1: r2(CODEX_CX + Math.cos(a) * 206),
    y1: r2(CODEX_CY + Math.sin(a) * 206),
    x2: r2(CODEX_CX + Math.cos(a) * 222),
    y2: r2(CODEX_CY + Math.sin(a) * 222),
  };
});

const CODEX_ORBITS = Array.from({ length: 7 }, (_, i) => {
  const a = (i * 2 * Math.PI) / 7 + Math.PI / 7;
  return {
    x: r2(CODEX_CX + Math.cos(a) * 186),
    y: r2(CODEX_CY + Math.sin(a) * 186),
    r: 2.4 + (i % 3) * 0.8,
  };
});

const CODEX_LEAF = "M0 0 C4.5 -7 5.5 -20 0 -30 C-5.5 -20 -4.5 -7 0 0 Z";

const CODEX_LEAVES_L = [
  { x: 347, y: 393, r: -38 },
  { x: 325, y: 387, r: -50 },
  { x: 305, y: 378, r: -58 },
  { x: 267, y: 351, r: -68 },
  { x: 250, y: 331, r: -76 },
];
const CODEX_LEAVES_R = [
  { x: 413, y: 393, r: 38 },
  { x: 435, y: 387, r: 50 },
  { x: 455, y: 378, r: 58 },
  { x: 493, y: 351, r: 68 },
  { x: 510, y: 331, r: 76 },
];

/** One laurel leaf — static outer transform positions it, inner motion springs it open. */
function CodexLeaf({ x, y, r, delay }: { x: number; y: number; r: number; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <motion.path
        d={CODEX_LEAF}
        fill={GOLD}
        fillOpacity="0.5"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeLinejoin="round"
        style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VIEW}
        transition={{ delay, type: "spring", stiffness: 210, damping: 15 }}
      />
    </g>
  );
}

export function ConstitutionCodexArt({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const haloOrigin = {
    transformBox: "view-box" as const,
    transformOrigin: `${CODEX_CX}px ${CODEX_CY}px`,
  };
  return (
    <svg viewBox="0 0 760 470" fill="none" className={className} aria-hidden="true">
      <GoldDefs id="kcod-gold" />
      <defs>
        <radialGradient id="kcod-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="62%" stopColor={GOLD} stopOpacity="0.09" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient halo */}
      <motion.circle
        cx={CODEX_CX} cy={CODEX_CY} r="170" fill="url(#kcod-halo)"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} viewport={VIEW}
        transition={{ duration: 2, delay: 0.9 }}
      />

      {/* static outer ring */}
      <motion.circle
        cx={CODEX_CX} cy={CODEX_CY} r="186" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.2"
        {...draw(reduced, 0.1, 1.5)}
      />

      {/* rotating dashed ring — inner */}
      <Fade delay={0.5} duration={1.1}>
        <motion.g style={haloOrigin} animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}>
          <circle cx={CODEX_CX} cy={CODEX_CY} r="172" stroke={GOLD} strokeWidth="1" strokeDasharray="2 9" opacity="0.42" fill="none" />
        </motion.g>
      </Fade>

      {/* counter-rotating dashed ring — outer */}
      <Fade delay={0.65} duration={1.1}>
        <motion.g style={haloOrigin} animate={reduced ? undefined : { rotate: -360 }} transition={{ duration: 110, repeat: Infinity, ease: "linear" }}>
          <circle cx={CODEX_CX} cy={CODEX_CY} r="202" stroke={GOLD} strokeWidth="1" strokeDasharray="1 16" opacity="0.3" fill="none" />
        </motion.g>
      </Fade>

      {/* slow-turning sun rays */}
      <Fade delay={0.75} duration={1.2}>
        <motion.g style={haloOrigin} animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
          {CODEX_RAYS.map((p, i) => (
            <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={GOLD} strokeOpacity="0.42" strokeWidth="1.2" strokeLinecap="round" />
          ))}
        </motion.g>
      </Fade>

      {/* orbiting gold particles */}
      <Fade delay={0.85} duration={1.2}>
        <motion.g style={haloOrigin} animate={reduced ? undefined : { rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }}>
          {CODEX_ORBITS.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={GOLD} opacity={0.4 + (i % 3) * 0.22} />
          ))}
        </motion.g>
      </Fade>

      {/* ——— scales of justice rising from the codex (entrance → float loop → sway loops) ——— */}
      <Fade delay={0.1}>
        <motion.g animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          {/* finial · orb · capital · stem · beam — solid gold on straight lines:
              objectBoundingBox gradients never paint on zero-height bboxes */}
          <motion.path d="M380 84 L387 96 L380 108 L373 96 Z" stroke="url(#kcod-gold)" strokeWidth="2" strokeLinejoin="round" {...draw(reduced, 0.15, 0.6)} />
          <motion.circle cx="380" cy="118" r="5.5" stroke="url(#kcod-gold)" strokeWidth="2" {...draw(reduced, 0.3, 0.5)} />
          <motion.path d="M360 132 H400" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.45, 0.5)} />
          <motion.path d="M380 108 V236" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.4, 0.8)} />
          <motion.path d="M290 142 H470" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" {...draw(reduced, 0.6, 0.9)} />
          <motion.circle
            cx="290" cy="142" r="4" fill="url(#kcod-gold)" style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
            transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 14 }}
          />
          <motion.circle
            cx="470" cy="142" r="4" fill="url(#kcod-gold)" style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
            transition={{ delay: 1.3, type: "spring", stiffness: 260, damping: 14 }}
          />
          {/* left pan — pendulum sway */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "top center" }}
            animate={reduced ? undefined : { rotate: [0, 2.2, 0, -1.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.path d="M290 144 L272 190 M290 144 L308 190" stroke="url(#kcod-gold)" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.0, 0.6)} />
            <motion.path d="M268 192 Q290 214 312 192" stroke="url(#kcod-gold)" strokeWidth="2.2" strokeLinecap="round" {...draw(reduced, 1.15, 0.6)} />
            <motion.path d="M268 192 Q290 202 312 192" stroke="url(#kcod-gold)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" {...draw(reduced, 1.25, 0.5)} />
          </motion.g>
          {/* right pan — opposite phase */}
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "top center" }}
            animate={reduced ? undefined : { rotate: [0, -2.2, 0, 1.8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <motion.path d="M470 144 L452 190 M470 144 L488 190" stroke="url(#kcod-gold)" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.08, 0.6)} />
            <motion.path d="M448 192 Q470 214 492 192" stroke="url(#kcod-gold)" strokeWidth="2.2" strokeLinecap="round" {...draw(reduced, 1.23, 0.6)} />
            <motion.path d="M448 192 Q470 202 492 192" stroke="url(#kcod-gold)" strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" {...draw(reduced, 1.33, 0.5)} />
          </motion.g>
        </motion.g>
      </Fade>

      {/* ——— the open codex ——— */}
      <motion.path
        d="M266 246 C300 226 352 222 378 236 L378 308 C350 295 300 299 266 318 Z"
        fill={GOLD} fillOpacity="0.05" stroke={NAVY} strokeOpacity="0.45" strokeWidth="1.8" strokeLinejoin="round"
        {...draw(reduced, 0.75, 1)}
      />
      <motion.path
        d="M494 246 C460 226 408 222 382 236 L382 308 C410 295 460 299 494 318 Z"
        fill={GOLD} fillOpacity="0.05" stroke={NAVY} strokeOpacity="0.45" strokeWidth="1.8" strokeLinejoin="round"
        {...draw(reduced, 0.85, 1)}
      />
      {/* cover curve beneath */}
      <motion.path d="M250 322 Q380 362 510 322" stroke={NAVY} strokeOpacity="0.38" strokeWidth="2" strokeLinecap="round" {...draw(reduced, 0.95, 0.8)} />
      {/* gold spine edges */}
      <motion.path d="M378 236 V308 M382 236 V308" stroke="url(#kcod-gold)" strokeWidth="1.4" strokeLinecap="round" {...draw(reduced, 1.05, 0.6)} />
      {/* page rules */}
      <motion.path d="M288 254 L352 247 M288 268 L352 262 M288 282 L352 277 M288 296 L352 292" stroke={NAVY} strokeOpacity="0.3" strokeWidth="1.3" strokeLinecap="round" {...draw(reduced, 1.15, 0.7)} />
      <motion.path d="M408 247 L472 254 M408 262 L472 268 M408 277 L472 282 M408 292 L472 296" stroke={NAVY} strokeOpacity="0.3" strokeWidth="1.3" strokeLinecap="round" {...draw(reduced, 1.25, 0.7)} />
      {/* ribbon bookmark */}
      <motion.path
        d="M373 308 L387 308 L387 334 L380 326.5 L373 334 Z"
        fill="url(#kcod-gold)" fillOpacity="0.9"
        style={{ transformBox: "fill-box", transformOrigin: "top center" }}
        initial={{ scale: reduced ? 1 : 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={VIEW}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 14 }}
      />

      {/* ——— laurel wreath ——— */}
      <motion.path d="M368 396 C308 390 258 358 236 304" stroke={GOLD} strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.55, 0.8)} />
      <motion.path d="M392 396 C452 390 502 358 524 304" stroke={GOLD} strokeOpacity="0.75" strokeWidth="1.6" strokeLinecap="round" {...draw(reduced, 1.6, 0.8)} />
      {CODEX_LEAVES_L.map((l, i) => (
        <CodexLeaf key={`l-${i}`} x={l.x} y={l.y} r={l.r} delay={1.75 + i * 0.1} />
      ))}
      {CODEX_LEAVES_R.map((l, i) => (
        <CodexLeaf key={`r-${i}`} x={l.x} y={l.y} r={l.r} delay={1.8 + i * 0.1} />
      ))}
      <motion.path
        d="M380 393 L386 400 L380 407 L374 400 Z" fill="url(#kcod-gold)"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.9 }} viewport={VIEW}
        transition={{ delay: 2.15, type: "spring", stiffness: 200, damping: 12 }}
      />

      {/* ——— inscription ——— */}
      <Fade delay={1.7} duration={0.9}>
        <text
          x={CODEX_CX} y="356" textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="10" fontWeight="600" letterSpacing="1.4"
          fill={GOLD} fillOpacity="0.9"
        >
          REPUBLIC OF SOUTH AFRICA
        </text>
      </Fade>
      <motion.path
        d="M278 347 L283 352 L278 357 L273 352 Z" fill={GOLD}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.75 }} viewport={VIEW}
        transition={{ delay: 1.95, type: "spring", stiffness: 200, damping: 12 }}
      />
      <motion.path
        d="M482 347 L487 352 L482 357 L477 352 Z" fill={GOLD}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.75 }} viewport={VIEW}
        transition={{ delay: 2.05, type: "spring", stiffness: 200, damping: 12 }}
      />
    </svg>
  );
}
