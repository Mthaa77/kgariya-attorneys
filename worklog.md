# Worklog

---
Task ID: 1
Agent: Main agent (Z.ai)
Task: Build a premium multipage website for Kgariya Attorneys Incorporated per the Website Development Brief + Institutional Company Profile (uploaded PDFs) and the firm's gold/navy logo.

Work Log:
- Loaded `fullstack-dev` skill; initialized Next.js 16 environment (init-fullstack.sh).
- Loaded `image-generation` skill; generated 10 on-brand images (3 heroes, director portrait, office, construction, library, agri, mining, conveyancing) via z-ai CLI. Fixed API size constraint (must be multiples of 32px — replaced 1440x720 with 1344x768); ran waves in foreground after detached processes were killed by the sandbox.
- Design system: Playfair Display (display serif) + Manrope (body) via next/font; deep navy (#0a1b33 family) + gold (#c6a55c family) palette in globals.css; custom utilities (shadow-luxe, gold-text, glass, kenburns, texture grids, custom scrollbar).
- Brand: hand-built SVG crest (gold shield + bold K monogram + diamond rule) used for favicon (`public/crest.svg`) and Logo lockup component.
- Content layer: `src/lib/site-data.ts` (6 practice areas with scope/delivery/clients/matters/stats, counters, trust pillars, 8 sectors, journey, fee models, FAQs, director credentials, group entities, vacancies, joining model, badges) and `src/lib/insights.ts` (6 full-length articles).
- Architecture: hash-based multipage router (`src/lib/router.ts`) inside the single visible route, with AnimatePresence page transitions; zustand store for global dialogs.
- Backend: Prisma (SQLite) Enquiry/Booking/Subscriber models (db:push done); API routes `/api/enquiry`, `/api/booking`, `/api/subscribe` with zod validation, honeypot + in-memory rate limiting.
- Components: header (top bar + sticky glass nav + mega menu + mobile Sheet), footer (CTA band + directory + compliance strip), hero slider (3 slides, ken burns, autoplay/pause), trust strip, animated counters, reveal/stagger animations, practice cards (numbered/colour-coded), matter cards (anonymised + outcome labels), journey stepper, FAQ accordion, enquiry form (practice-routed, POPIA consent), booking dialog (calendar + slots), callback dialog, search dialog, three-questions routing flow, cookie consent with preference centre.
- Pages: Home; 6 practice-area pages; Our People; About; Kgariya & Co Group; Insights (filterable) + article reader; Joining the Firm; Careers; Contact; Legal (POPIA/PAIA/cookies/terms/LPC tabs).
- Fixed lint errors (react-hooks/set-state-in-effect) via inner-mount resets / derived-state patterns; fixed duplicate Notfound export; replaced non-existent lucide `Crane` icon with `Construction`.
- Verification (agent-browser): home + all pages render; mega menu; hero autoplay; booking flow (record saved: Thabo Mokoena); contact enquiry (Anele Dlamini); callback (Precious Nkosi) — 2 enquiries + 1 booking in DB; search; 3-questions routing; cookie consent persisted; mobile 390px responsive + sheet menu; sticky footer; lint clean; no runtime errors after reload.

Stage Summary:
- Deliverable: complete premium multipage website (12+ routes via hash router) at src/app/page.tsx, content-driven from src/lib/site-data.ts and src/lib/insights.ts.
- Key decisions: hash router to satisfy single-route constraint; navy+gold palette from the firm's crest; "Evidence over slogans" philosophy embedded across trust sections; LPC-sensitive content marked for firm confirmation (director name, registration numbers, counters).
- Placeholders for the firm to confirm before go-live: director's full name/initials, LPC practice numbers, final matter values, B-BBEE certificate details.

---
Task ID: 2
Agent: Main agent (Z.ai)
Task: Upgrade homepage premium experience per user request — enhanced hero, live ticker under hero, floating navbar, more interactive homepage sections with scroll animations.

Work Log:
- Added TICKER_ITEMS (10 anonymised "deal desk" items) and TESTIMONIALS (4 LPC-safe client voices) to src/lib/site-data.ts.
- New src/components/site/interactions.tsx: Magnetic (cursor-pull wrapper), TiltCard, SpotlightCard (mouse-tracked gold glow, overlay z-20 above opaque cards), Parallax, ScrollProgress, BackToTop, WordReveal (per-word masked rise), ImageReveal (clip-path wipe).
- globals.css: marquee-slow + pause-on-hover, live-pulse, gold-pulse, light-sweep, scroll-cue, aurora, btn-sheen, gradient-ring (conic hover ring via @property), gold-text-shine.
- New src/components/site/live-ticker.tsx: Bloomberg-style "DEAL DESK — LIVE" strip under hero: red pulse dot, kind tags, direction arrows, gold diamond separators, edge fades, pause control, hover-pause marquee, items click into three-questions flow, LPC disclaimer in-loop.
- header.tsx rewritten as floating capsule navbar: fixed overlay (pointer-events managed), TopBar collapses on scroll, dark-glass rounded-full capsule shrinks 74→62px and tightens max-w when scrolled, sliding layoutId nav pill, blur/scale mega menu with staggered items, page scroll progress hairline inside capsule, Magnetic + btn-sheen CTA, gold mobile menu orb; removed in-flow spacer (broken expression) and PageHero pt raised 14→36/40 to clear fixed nav (all pages use dark heroes).
- hero-slider.tsx upgraded: 100svh, scroll parallax (bg y+scale, copy lift+fade, stat-stack drift), WordReveal headlines with gold-text-shine accent, cinematic light sweep per slide, floating glass stat cards (3 COUNTERS w/ Counter + floaty + staggered entrance + inline SVG glyphs), progress-fill slide dots, scroll cue, magnetic CTAs, prev/next/pause deck.
- home.tsx upgraded: LiveTicker after hero; SpotlightCard+gradient-ring on counters, trust pillars, sectors, fee cards; practice cards wrapped in gradient-ring; Magnetic CTAs; director portrait via ImageReveal + floating LPC credential chip; CTA panel aurora blobs; NEW Testimonials carousel (auto-advance 6.5s, hover-pause, progress dots, prev/next, anonymised); insights redesigned to featured navy panel + stacked cards; BackToTop added.
- journey.tsx: auto-advances every 6s, pauses on hover. matter-card.tsx: wrapped in SpotlightCard (all pages benefit).
- Verification (agent-browser, 1440px + 390px): hero, ticker marquee, practice grid, mega menu hover, testimonials, matters, featured insights, about + practice page hero clearance, booking dialog, mobile hero + sheet menu — all render; ESLint clean; fresh-session console clean (earlier error lines were stale HMR artifacts).

Stage Summary:
- Homepage is now: Hero (parallax + word reveal + proof stack) → Deal Desk live ticker → trust strip → positioning + spotlight counters → practice grid → dark trust architecture → sectors → matters → client voices carousel → director → auto journey → fees → 3-questions CTA → featured insights → FAQ, with floating navbar + BackToTop persistent.
- New reusable interaction primitives live in src/components/site/interactions.tsx for future page-level polish.
- No backend/data-model changes; all forms/dialogs from Task 1 still functional.

---
Task ID: 3
Agent: Main agent (Z.ai)
Task: Upgrade the homepage "Client matrix" and "Representative matters" sections into premium, modern, interactive and informative components.

Work Log:
- site-data.ts: extended Matter type with optional `forum` (execution venue) and `scale` (anonymised deal scale); populated both for all 18 matters across the 6 practices (derived from existing records — no invented facts). Converted SECTORS into a typed Sector[] with new `tagline`, `practices` (practice slugs) and `fileRef` ([practiceSlug, matterIndex]) fields.
- New src/components/site/sector-matrix.tsx — "Client matrix" master–detail explorer: desktop ledger-style sector index rail (08 rows, layoutId sliding navy pill, gold auto-advance progress hairline) + dark dossier panel (ghost numeral, gold icon orb, tagline, "Mandate challenge vs Kgariya response" split columns, practice deep-link chips → practice pages, "From the matter file" teaser with outcome/forum/scale chips, magnetic CTA → three-questions dialog). Auto-cycles every 6.8s, pauses on hover/focus. Mobile: horizontal snap-scroll chip rail + stacked panel. "Open the case roll" teaser scrolls smoothly to the matters section.
- New src/components/site/case-roll.tsx — "Representative matters" court-docket ledger: all 18 matters docket-numbered (01·01…06·03); practice filter chips (All files + 6 practices, layoutId pill, counts); ledger rows with File Nº / matter / forum & scale / outcome badge / chevron; row click expands an animated dossier drawer (case notes, sector chip, "Handled by {practice}" deep link, LPC anonymisation note); gold left rule on hover/open; staggered whileInView entrances; "Showing X of Y" counter; magnetic CTA → contact.
- home.tsx: replaced the static SECTORS grid and 3-card MatterDeck with <SectorMatrix /> and <CaseRoll />; removed dead imports/vars (kept ArrowUpRight used by insights).
- globals.css: added .scrollbar-hide utility for chip scrollers.
- Bug fixes during verification: grid blowout on mobile (chip scroller intrinsic width expanding the grid track — fixed with min-w-0 on grid children); non-existent palette shades navy-300/navy-500 replaced (navy-600/30, navy-600/60); wrong pulse class → animate-live-pulse; duplicated sector/outcome keys in agri matter removed; restructured case-roll row so mobile stacks file Nº → title → forum/scale → outcome cleanly.
- Verification (agent-browser): desktop 1440 — rail pill + progress, auto-cycle advance, dossier content correct per sector, practice chips, teaser deep-link scrolls to #case-roll (rect top ≈ 0), filter → 3 files, drawer expands with case notes; mobile 390 — chip scroller, panel fits, zero horizontal overflow (scrollWidth == innerWidth), roll row layout clean; page errors none; ESLint clean.

Stage Summary:
- Homepage now: Hero → Deal Desk ticker → trust strip → positioning/counters → practice grid → dark trust architecture → INTERACTIVE sector explorer (Client matrix) → INTERACTIVE case roll (Representative matters) → testimonials → director → journey → fees → 3-questions CTA → insights → FAQ.
- Data model additions are additive: MatterCard/MatterDeck and About-page sector usage unaffected; practice pages still render matters with the enriched metadata available for future reuse.
- All LPC sensitivities preserved: anonymised sectors/files, disclaimer footnotes in both sections.

---
Task ID: 4
Agent: Main agent (Z.ai)
Task: Replace generated hero imagery with the firm's real office-building photos (4 uploaded) and distribute the remaining images across the homepage.

Work Log:
- Copied the 4 uploaded photos to public/images with clean names: office-sunset.jpg (1080x695 golden-hour facade + plaza), office-architecture.jpg (980x653 B&W upward HDR with pergola), office-night.jpg (886x590 night shot, LED-lit building "4"), office-plaza.jpg (630x945 portrait, two-storey building + planters).
- hero-slider.tsx: all 3 slide backgrounds swapped to the real photos (sunset → Litigation slide, B&W architecture → Development slide, night → Finance slide); added a glass "Photographed — our Pretoria offices" MapPin chip next to the "Evidence over slogans" chip in the bottom control deck.
- globals.css: hero-vignette now layers a 100deg left-side navy scrim over the existing vertical gradient to protect headline contrast against the brighter real daylight photos.
- home.tsx (director section): portrait office photo added as a polaroid-style overlapping card (border-4 white, rotate-2, ImageReveal entrance, hover levels + zooms) with a MapPin "Our Pretoria offices / Where mandates meet" footer; first placement collided with the director caption/credentials line — resized to 168px and moved to bottom-14 right-4 so role + credentials text stays fully readable.
- Verification (agent-browser, 1440 + 390): all three hero slides render with correct copy + ken burns + parallax; location chip visible; hover-pause confirmed (pause orb switches to play); director collage layered correctly, caption legible; mobile hero contrast + controls clean; scrollWidth == innerWidth (no overflow); no page errors; ESLint clean.

Stage Summary:
- Homepage photography is now 100% real firm imagery: 3 hero slides + director-section polaroid. Generated practice-area imagery (hero-litigation.png etc.) remains in use on practice pages/mega menu only.
- Practice indicators / LPC-sensitive placeholders unchanged; no data-model changes.

---
Task ID: 5
Agent: Main agent (Z.ai)
Task: Add a premium onboarding interactive component ("Client Pathfinder") placed immediately before the practice-areas section, routing users to the right areas of the website.

Work Log:
- New src/components/site/client-pathfinder.tsx (~560 lines) — "Client pathfinder" guided-intake wizard on a dark navy full-bleed section: split layout with storytelling copy + vertical 4-step rail (left) and a white interactive console card with navy header band + animated gold progress hairline (right).
- 3-question flow with auto-advance (consistent with the three-questions dialog): Q1 profile (6 icon cards — company/lender/developer/public/individual/practitioner), Q2 need (6 cards mapped to practices), Q3 timeline (urgent/weeks/planning). AnimatePresence mode="wait" slide transitions, staggered option-card entrances, clickable answer chips to revise, Back/Start-over footer, ghost serif numeral crossfading 01→04 in the backdrop.
- Result = "boarding-pass" route itinerary: practice banner in the practice's accent colour → #/practice/[slug]; "Along the way" stops 02–04 with dashed connector + numbered navy/gold nodes, tailored per profile (WAYPOINTS map: case-roll / fees / client-matrix / journey / testimonials scroll targets, or #/about · #/people · #/joining · #/group routes); "Your next move" CTA panel driven by timeline (urgent → tel: link, weeks → booking dialog, planning → contact page) + "Browse the six practices" scroll; LPC-safe guidance footnote + confidentiality microcopy.
- Anchor IDs added for scroll routing: #client-matrix (sector-matrix), #testimonials (testimonials), #fees + #journey (home sections), scroll-mt-24 applied to all five targets incl. #case-roll and #practice-areas so floating nav never covers headings.
- Wired <ClientPathfinder /> into home.tsx between the positioning/counters section and #practice-areas (rhythm: white → navy gateway → ivory grid).
- Verification (agent-browser, 1440 + 390): full flows for company/lender/individual/practitioner profiles — correct practice per need (dispute→01 Litigation, property→06 Conveyancing), per-profile waypoints, waypoint scrolls land at 96px (scroll-mt respected), booking dialog opens from result CTA, route waypoint navigates to #/joining, urgent flow shows tel: CTA, rail step revision returns to Q1 with state preserved; mobile: option grid/chips/CTAs fit, scrollWidth == innerWidth (no overflow); no page errors; console clean apart from pre-existing hero-parallax warning; ESLint clean. Fixed during verification: banner eyebrow "Stop 01 · 01 · …" duplication → "Stop 01 · Recommended practice".

Stage Summary:
- Homepage flow is now: Hero → Deal Desk ticker → trust strip → positioning/counters → CLIENT PATHFINDER (interactive onboarding router) → practice grid → dark trust architecture → Client matrix → Case roll → testimonials → director → journey → fees → 3-questions CTA → insights → FAQ.
- The Pathfinder routes across the whole site (6 practice pages, 5 in-page sections, 4 sub-pages, booking dialog, tel:) — distinct from the compact three-questions dialog, which remains for nav/CTA entry points.
- No data-model changes; PRACTICE_AREAS/getPractice reused for routing; all waypoint targets exist on the homepage.

---
Task ID: 6
Agent: Main agent (Z.ai)
Task: Optimise overall performance and speed; shorten the "Representative matters" section while keeping it informative and interactive; clean up and refactor for speed without changing the site.

Work Log:
- Baseline prod build measured: 1.5MB static JS with one monolithic 536K chunk containing ALL 12 hash-routes — every visitor downloaded and parsed every page regardless of destination.
- Route-level code splitting (src/app/page.tsx): HomePage kept eager (primary landing); all 11 other routes (practice-area, people, about, group, insights, article, joining, careers, contact, legal, notfound) converted to next/dynamic lazy chunks with a shared RouteFallback (min-h-[72vh]) so the footer doesn't jump mid-transition. Next requires inline object literals for dynamic() options — fixed the initial shared-options-variable implementation after a 500.
- CaseRoll rework (src/components/site/case-roll.tsx): ledger now opens with a 6-file selection (~2/3 shorter section); new full-width progressive-disclosure bar ("Reveal all 18 files" ↔ "Show the selected six files" with visible/total counter) expands the complete ledger inline; filters reset to the compact view; rows tightened py-5→py-4. Extracted memo(RollRow) so dossier toggles/filters only re-render affected rows. Heading/lead copy updated to reflect the selection-then-expand model; "Showing X of Y" meta now reads "X of Y files · 18 on the full roll".
- Memoisation: PracticeCard and MatterCard wrapped in React.memo (pure props) — used in grids across home and multiple pages.
- Font payload trimmed in layout.tsx: Playfair Display 6×2 → 4×2 weights (dropped 800/900, unused), Manrope 6 → 4 weights (dropped 300/800, unused) — verified no font-black/font-extrabold/font-light usage anywhere; no explicit font-weight in globals.css. Build font files 24 → 14 woff2.
- globals.css: added prefers-reduced-motion guard disabling all decorative infinite animations (kenburns, aurora, live-pulse, gold-pulse, floaty, marquee×2, light-sweep, scroll-cue) with correct class names verified against the stylesheet.
- Small cleanups: home.tsx removed needless array spread ([...ARTICLES].slice → ARTICLES.slice).
- Image audit: hero already priority+sizes via next/image; all pages use next/image (optimizer handles resizing/WebP); dialogs confirmed mount-nothing-when-closed (Radix); header scroll listener already passive — no changes needed.
- Post-change prod build: monolith eliminated — largest chunk 219K (framework), home loads 14 chunks ≈1080K raw ≈330K gzip; each sub-route now a small dedicated chunk (25–67K) fetched only on navigation; fonts 24→14 files.
- Verification (agent-browser, 1440 + 390): home visual parity; case roll 6 rows + reveal bar → expand 18 → collapse 6; conveyancing filter → 3 rows, bar hidden; dossier drawer opens (Case notes · 06·01); lazy routes load on nav AND on direct deep link (#/practice/commercial-litigation first paint); contact/insights/about render; mobile overflow scrollWidth == innerWidth; compact rows render cleanly at 390; no page errors; ESLint clean.

Stage Summary:
- Section height of "Representative matters" reduced ~2/3 by default with zero loss of content: all 18 matters remain reachable through the disclosure bar and filters, drawers and filters unchanged.
- Performance: every route except home removed from the initial bundle (536K monolith → 219K max chunk); route changes fetch only their own chunk; font files down 42%; reduced-motion support added; list rendering memoised.
- Visual output unchanged everywhere except the intended CaseRoll shortening.

---
Task ID: 7
Agent: main (Z.ai)
Task: Create a new GitHub repo and push the project

Work Log:
- Verified active PAT for account Mthaa77 via GitHub API
- Created private repo Mthaa77/kgariya-attorneys via API
- Untracked .env (local-only config) before pushing; confirmed 404 on remote
- Pushed main branch (204 files) with token-auth remote
- Untracked db/custom.db (local dev SQLite) and added /db to .gitignore; pushed cleanup commit

Stage Summary:
- Repo live at https://github.com/Mthaa77/kgariya-attorneys (private), main branch tracking origin
- No secrets/env/db files on remote; local files untouched

---
Task ID: 8
Agent: Main agent (Z.ai)
Task: Add premium law icons and South African law trust signals across the website

Work Log:
- site-data.ts: added SA_REGULATION (6 regulation/admission signals — LPC, High Court admission, Deeds Registries Act, Master of the High Court, POPIA/PAIA, Attorneys Fidelity Fund), COURTS_FORUMS (10 courts/tribunals/registries), SA_ACTS (8 statutes with act numbers), CREDENTIALS (6 director standing chips), PRACTICE_FORUMS (per-practice courts & regulators map for all 6 practices)
- icon.tsx: extended icon MAP with law-specific lucide icons — gavel, scroll-text, stamp, book-open-check, award, fingerprint, file-badge, medal
- New sa-legal.tsx: SAFlag (geometric SA flag SVG) + SAFlagChip, CourtsMarquee (infinite marquee, marquee-pause, dark/light, edge fades), RegulationBoard (dark/light premium grid), ActsStrip (statute chip wall), CredentialWall (standing chips), PracticeForums (per-practice forums card, accent-tinted)
- home.tsx trust architecture: added courts marquee band ("Admitted before the courts of South Africa"), Regulation & standing board (Regulated. Admitted. Audited.), statutory framework strip; director section gained "Admissions & standing" CredentialWall
- practice-area.tsx: right column gained per-practice "Courts, forums & regulators" card under Typical clients
- about.tsx: location card gained SAFlagChip + nationwide line; credentials column gained Admissions & professional standing wall; new "The South African legal system" section (light courts marquee + RegulationBoard + ActsStrip)
- footer.tsx (site-wide): compliance badges now use distinct premium icons (Landmark/Award/Shield/FileCheck/Scale); added SA-flag "Practising under the statutes of the Republic" label + full ActsStrip row; removed dead Icon/Crest imports
- Fixed PRE-EXISTING mobile overflow on all 6 practice pages (scrollWidth 449 @ 390): mini PracticeCard truncate spans lacked min-w-0 (nowrap tagline inflated intrinsic width) and buttons shrink-to-fit — added min-w-0 to truncate chains, w-full to mini button, min-w-0 to enquiry grid columns; desktop rendering unchanged
- Verification: desktop 1440 screenshots (marquee, regulation board, acts strip, credential wall, footer, practice forums, about section) all premium and on-design; mobile 390 sweep across 15 routes → zero horizontal overflow; console shows only pre-existing hero-parallax warning; ESLint clean

Stage Summary:
- Site now carries authentic SA legal trust signals: LPC/High Court/Deeds Office/Master/Fidelity Fund regulation board, courts & forums marquee, 8-statute framework, director admissions wall, per-practice forums cards, SA flag jurisdiction accents — all verifiable claims only (LPC marketing compliant)
- Icon system upgraded with premium law iconography (gavel, scroll, stamp, book-lock etc.) used across all new components
- Bonus: fixed long-standing mobile horizontal overflow on practice pages (pre-existing bug, desktop visuals unchanged)
