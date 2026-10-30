/* ————————————————————————————————————————————————
   Kgariya Attorneys Incorporated — site content model
   Single source of truth for all pages.
———————————————————————————————————————————————— */

export const FIRM = {
  name: "Kgariya Attorneys Incorporated",
  shortName: "Kgariya Inc.",
  tagline: "Evidence over slogans.",
  phone: "(+27) 12 786 0920",
  phoneHref: "tel:+27127860920",
  email: "info@kgariyainc.co.za",
  web: "www.kgariyainc.co.za",
  webHref: "https://www.kgariyainc.co.za",
  careersEmail: "careers@kgariyainc.co.za",
  address: {
    line1: "Walker Creek Office Park, Building 2, 2nd Floor",
    line2: "90 Florence Ribeiro Street",
    city: "Pretoria",
    province: "Gauteng",
    postal: "0181",
    country: "South Africa",
  },
  hours: "Mon – Fri, 08:00 – 17:00",
  hoursShort: "Mon–Fri 08:00–17:00",
  mapsQuery: "90 Florence Ribeiro Street, Pretoria 0181",
};

export const NAV = [
  { label: "Home", route: "#/" },
  { label: "Our People", route: "#/people" },
  { label: "About the Firm", route: "#/about" },
  { label: "Kgariya & Co Group", route: "#/group" },
  { label: "Insights", route: "#/insights" },
  { label: "Joining the Firm", route: "#/joining" },
  { label: "Careers", route: "#/careers" },
  { label: "Contact", route: "#/contact" },
];

/* ——————————— Practice areas ——————————— */

export type Matter = {
  title: string;
  sector: string;
  outcome: string;
  detail: string;
  /** Execution forum / venue — derived from the matter record, kept anonymised. */
  forum?: string;
  /** Indicative deal scale — anonymised, no client-identifying values. */
  scale?: string;
};

export type PracticeArea = {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  menuLabel: string;
  tagline: string;
  intro: string;
  accent: string;
  accentSoft: string;
  image: string;
  icon: string;
  overview: string[];
  scope: string[];
  delivery: string[];
  clients: string[];
  matters: Matter[];
  stat: { value: number; suffix: string; label: string };
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "commercial-litigation",
    number: "01",
    name: "Commercial Litigation & Arbitration",
    shortName: "Litigation & Arbitration",
    menuLabel: "Commercial Litigation & Arbitration",
    tagline: "High-stakes disputes, fought with strategy.",
    intro:
      "Our primary practice leader. We represent corporates, financial institutions and public bodies in High Court litigation and formal arbitration — banking and finance disputes, construction claims, insurance coverage, contract enforcement, shareholder conflicts and franchise disputes.",
    accent: "#16315c",
    accentSoft: "#eef2f8",
    image: "/images/hero-litigation.png",
    icon: "scale",
    overview: [
      "Commercial disputes are won long before argument is heard. Kgariya Inc. approaches every mandate as a strategy exercise first: we map the dispute against the client's commercial objectives, quantify exposure early, and choose the forum — High Court or AFSA arbitration — that delivers the fastest, most certain, most cost-effective outcome.",
      "The division drafts specialised pleadings, manages urgent High Court applications, runs interlocutory proceedings, conducts multi-day arbitration trials and negotiates complex commercial settlements. Because the firm sits inside a wider group with real development and finance experience, our litigators read the underlying transaction — not just the papers.",
      "We act for blue-chip companies, banks and lenders, construction and engineering firms, insurers, and franchisors across Gauteng. Institutional clients receive structured reporting at every stage, so boards and panels always know where a matter stands and what it is costing.",
    ],
    scope: [
      "High Court litigation and appeals",
      "AFSA arbitration proceedings",
      "Urgent and interlocutory applications",
      "Banking and financial disputes",
      "Construction and engineering claims",
      "Commercial contract enforcement",
      "Insurance coverage litigation",
      "Shareholder and joint-venture disputes",
      "Franchise agreement disputes",
      "Complex commercial settlements",
    ],
    delivery: [
      "Structured dispute strategy and forum selection",
      "Specialised pleadings and motion drafting",
      "Multi-day arbitration trial management",
      "Dedicated High Court advocacy",
      "Settlement negotiation and workout-linked dispute resolution",
    ],
    clients: [
      "Blue-chip companies",
      "Banks and commercial lenders",
      "Construction and engineering firms",
      "Insurers",
      "Franchisors",
      "Public bodies",
    ],
    matters: [
      {
        title: "Facility enforcement for a commercial lender",
        sector: "Banking & Finance",
        outcome: "Settled on favourable terms",
        forum: "High Court — Gauteng Division",
        scale: "R180m defaulted facility",
        detail:
          "Acted for a commercial lender in High Court enforcement proceedings arising from a defaulted R180 million facility. Negotiated a structured settlement securing full capital recovery with costs.",
      },
      {
        title: "Construction dispute referred to AFSA",
        sector: "Construction & Engineering",
        outcome: "Award granted",
        forum: "AFSA arbitration tribunal",
        scale: "Multi-day arbitral hearing",
        detail:
          "Represented a contractor in a multi-day AFSA arbitration against a developer over variation claims and final account disputes. Award granted substantially in the client's favour.",
      },
      {
        title: "Urgent interdict for a national franchisor",
        sector: "Franchising",
        outcome: "Interdict granted",
        forum: "Urgent High Court roll",
        scale: "National brand network",
        detail:
          "Obtained urgent interim relief protecting a franchisor's brand and supply network against a former franchisee, followed by negotiated final relief.",
      },
    ],
    stat: { value: 300, suffix: "+", label: "Matters handled" },
  },
  {
    slug: "real-estate-development",
    number: "02",
    name: "Real Estate Development Packaging",
    shortName: "Development Packaging",
    menuLabel: "Real Estate Development Packaging",
    tagline: "From bare land to capital close — packaged end to end.",
    intro:
      "Our key differentiator. We structure complete legal packages for large-scale developments — bridging the gap between municipal land-use approvals, state regulatory compliance and bank or DFI capital close.",
    accent: "#1e4076",
    accentSoft: "#eaf0fa",
    image: "/images/hero-development.png",
    icon: "building",
    overview: [
      "Development projects fail in the gaps — between the town planner and the lender, between the NHBRC enrolment and the bond registration, between the JV heads of terms and the shareholders' agreement. Kgariya Inc. was built to close those gaps.",
      "We run the full legal arc of a project: land acquisition contracts and joint-venture frameworks, legal feasibility assessments and cost modelling, township establishment and rezoning, land-use rights, NHBRC enrolment, SHRA and subsidised housing schemes, bank and DFI finance applications, and end-user mortgage packaging.",
      "The result is a development file that a credit committee can underwrite. Because our director has run a property company as CEO — commercial portfolios, residential developments, mixed-use schemes and SHRA housing — every document is drafted with project cash flows and construction risk in mind, not in the abstract.",
    ],
    scope: [
      "Land assembly and acquisition agreements",
      "Joint venture legal frameworks",
      "Legal feasibility assessments and cost modelling",
      "Township establishment, rezoning and land-use rights",
      "NHBRC enrolment",
      "SHRA and subsidised housing schemes",
      "Bank and DFI development finance applications",
      "End-user mortgage packaging",
      "Municipal infrastructure packaging",
    ],
    delivery: [
      "End-to-end project legal packaging",
      "Developer-side feasibility legal modelling",
      "Regulatory approval management (municipal and provincial)",
      "Capital-close documentation for banks and DFIs",
      "PP structuring with group development expertise",
    ],
    clients: [
      "Property developers",
      "Housing funds and SHRA accredited institutions",
      "Development Finance Institutions",
      "Municipalities",
      "Joint ventures and landowners",
    ],
    matters: [
      {
        title: "1,200-unit township development packaging",
        sector: "Residential Development",
        outcome: "Finance approved & registered",
        forum: "Municipal · NHBRC · Lender credit",
        scale: "1,200 residential units",
        detail:
          "Packaged the complete legal file for a large residential township — land assembly, rezoning, services agreements, NHBRC enrolment and development finance application. Bond registrations completed on programme.",
      },
      {
        title: "SHRA social housing scheme",
        sector: "Social Housing",
        outcome: "Scheme packaged",
        forum: "SHRA · Provincial regulatory",
        scale: "Accredited housing institution",
        detail:
          "Structured the legal package for an accredited social housing institution — land use rights, SHRA compliance, funding applications and construction contract frameworks.",
      },
      {
        title: "Mixed-use JV restructuring",
        sector: "Mixed-Use Development",
        outcome: "JV concluded",
        forum: "Negotiated transaction",
        scale: "Landowner–developer JV",
        detail:
          "Negotiated and documented a joint venture between a landowner and a developer for a mixed-use scheme, including profit-share waterfalls and township obligations.",
      },
    ],
    stat: { value: 40, suffix: "+", label: "Development mandates packaged" },
  },
  {
    slug: "mining-resources",
    number: "03",
    name: "Mining & Resources (Mining-Adjacent)",
    shortName: "Mining-Adjacent",
    menuLabel: "Mining & Resources (Mining-Adjacent)",
    tagline: "Mining-adjacent deals, done lawfully and fast.",
    intro:
      "Specialised legal support for the transactional, land access and regulatory requirements around mining operations — mining finance and security, mineral rights transfers, surface rights, community agreements and SLP frameworks.",
    accent: "#8d6e3f",
    accentSoft: "#f6efe3",
    image: "/images/mining.png",
    icon: "pickaxe",
    overview: [
      "We do not run mining houses — we make mining-adjacent deals work. Our focus is the commercial and land layer around mining operations: financing structures and debt security, mineral rights transfers and registrations, surface rights access, and the community agreements that keep operations social licence-compliant.",
      "The practice negotiates surface rights access and land-use agreements with landowners and local communities, drafts Community and Social Labour Plan (SLP) agreements, and resolves mining-adjacent contract disputes before they stop machines.",
      "The director holds mining law and resources certificates from Wits, giving the practice technical fluency in the regulatory framework that governs mineral rights, prospecting and mining rights, and the interfaces with land tenure.",
    ],
    scope: [
      "Mining finance and debt security instruments",
      "Mineral rights transfers and registrations",
      "Surface rights access and land-use agreements",
      "Community and Social Labour Plan (SLP) agreements",
      "Mining-adjacent contract disputes",
      "Mine development financing structures",
    ],
    delivery: [
      "Transaction structuring for mining-adjacent commerce",
      "Security packaging acceptable to resource lenders",
      "Community negotiation frameworks",
      "Regulatory interface management",
    ],
    clients: [
      "Mining houses",
      "Resource investors and financiers",
      "Landowners",
      "Mining communities and trusts",
      "Contractors to the mining sector",
    ],
    matters: [
      {
        title: "Surface rights access for a mining-adjacent operation",
        sector: "Mining Services",
        outcome: "Agreement concluded",
        forum: "Landowner & community negotiation",
        scale: "Multi-year access rights",
        detail:
          "Negotiated a multi-year surface access and land-use agreement with landowners and a community trust, enabling an expansion programme without disruption.",
      },
      {
        title: "SLP legal framework",
        sector: "Mining Compliance",
        outcome: "Framework adopted",
        forum: "Mining right regulatory interface",
        scale: "Social & Labour Plan commitments",
        detail:
          "Drafted the legal framework for community commitments under a Social and Labour Plan, aligned with the client's mining right obligations.",
      },
      {
        title: "Mineral rights conveyancing",
        sector: "Resources Transactions",
        outcome: "Transfer registered",
        forum: "Deeds Registry · Notarial",
        scale: "Mining-adjacent disposal",
        detail:
          "Executed the transfer and registration of mineral rights incidental to a disposal of a mining-adjacent business, including notarial execution.",
      },
    ],
    stat: { value: 25, suffix: "+", label: "Mining-adjacent mandates" },
  },
  {
    slug: "agricultural-finance",
    number: "04",
    name: "Agricultural & Development Finance",
    shortName: "Agricultural Finance",
    menuLabel: "Agricultural & Development Finance",
    tagline: "Land Bank experience, agri-lender speed.",
    intro:
      "Dedicated panel mandates and debt security packaging for agricultural lenders, the Land Bank and development finance entities — farm bonds, notarial bonds over movables, agri-loan structuring and workouts.",
    accent: "#4f7256",
    accentSoft: "#edf3ee",
    image: "/images/agri.png",
    icon: "sprout",
    overview: [
      "Agricultural finance turns on security that holds. The practice registers mortgage bonds over farm holdings and agricultural commercial land, drafts and registers notarial bonds over movable farm equipment and biological assets, and structures specialised agri-loans.",
      "Our director handled Land Bank legal matters directly during tenure at AFGRI — an operational grounding that shows in clean, registerable, panel-ready documentation and realistic turnaround commitments.",
      "We act for state land banks, private agri-lenders and commercial farming enterprises, and we execute debt recoveries and workouts with the commercial sensitivity agriculture demands — seasonal cycles, generational farms and succession realities included.",
    ],
    scope: [
      "Land Bank legal panel execution",
      "Mortgage bonds over farm land",
      "Notarial bonds over movables and biological assets",
      "Specialised agri-loan structuring",
      "Agri-lender credit security packaging",
      "Debt recoveries and workouts",
      "Commercial farming debt restructuring",
    ],
    delivery: [
      "Panel-ready bond documentation",
      "Security audits for lender portfolios",
      "Notarial execution of movable bonds",
      "Workout and recovery management",
    ],
    clients: [
      "Land Bank and state lenders",
      "Private agri-lenders",
      "Commercial farming enterprises",
      "Development Finance Institutions",
    ],
    matters: [
      {
        title: "Land Bank panel bond registrations",
        sector: "State Lending",
        outcome: "Bonds registered",
        forum: "Deeds Registries — national",
        scale: "Commercial farming holdings",
        detail:
          "Executed mortgage bond registrations over commercial farming holdings as panel attorney, on programme and within lender SLAs.",
      },
      {
        title: "Movable asset security package",
        sector: "Agri-Lending",
        outcome: "Security perfected",
        forum: "Notarial bond registration",
        scale: "Equipment & biological assets",
        detail:
          "Drafted and registered notarial bonds over farm equipment and biological assets, perfecting a lender's security position ahead of facility drawdown.",
      },
      {
        title: "Farming enterprise debt restructuring",
        sector: "Agri-Workouts",
        outcome: "Facilities restructured",
        forum: "Two-lender negotiation",
        scale: "Multi-lender farm exposure",
        detail:
          "Restructured the debt of a commercial farming enterprise across two lenders, preserving the operating business and securing a resumption of repayments.",
      },
    ],
    stat: { value: 60, suffix: "+", label: "Agri security packages" },
  },
  {
    slug: "banking-finance",
    number: "05",
    name: "Banking & Finance",
    shortName: "Banking & Finance",
    menuLabel: "Banking & Finance",
    tagline: "Facilities, security and workouts — documented to hold.",
    intro:
      "Transactional packaging for commercial lenders, private credit funds and corporate borrowers — facility agreements, intercreditor arrangements, multi-tiered security, property and development finance, and corporate workouts.",
    accent: "#0f2547",
    accentSoft: "#edf1f7",
    image: "/images/hero-finance.png",
    icon: "landmark",
    overview: [
      "We draft the documents that carry the risk. The practice structures, documents and secures commercial debt facilities, property finance and corporate restructurings — loan facility agreements, intercreditor agreements and multi-tiered security packages that survive both registration and enforcement.",
      "For borrowers, we negotiate facilities and restructures with a developer's understanding of cash flow. For lenders, we build security packages and run workouts that recover value while respecting the commercial relationship.",
      "The practice is panel-ready: conflict protocols, trust account discipline, turnaround commitments and reporting built for bank and DFI panel assessment.",
    ],
    scope: [
      "Loan facility agreements",
      "Intercreditor agreements",
      "Multi-tiered security packages",
      "Commercial property and development loans",
      "Development debt packaging",
      "Debt workouts",
      "Corporate financial restructurings",
      "Financial recovery workouts",
    ],
    delivery: [
      "Facility drafting and negotiation",
      "Security architecture and perfection",
      "Workout strategy and execution",
      "Panel-compliant onboarding and reporting",
    ],
    clients: [
      "Commercial banks",
      "Development Finance Institutions",
      "Private credit funds",
      "Corporate borrowers",
    ],
    matters: [
      {
        title: "Group debt restructuring",
        sector: "Corporate Borrower",
        outcome: "Facilities restructured",
        forum: "Negotiated restructuring",
        scale: "± R95m across three facilities",
        detail:
          "Restructured exposure of approximately R95 million across three facilities for a borrower group, balancing lender security with operational continuity.",
      },
      {
        title: "Development finance security packaging",
        sector: "Property Lending",
        outcome: "Facility drawn",
        forum: "Security perfection & registration",
        scale: "Multi-tiered security package",
        detail:
          "Documented a multi-tiered security package for a development facility — mortgage bonds, notarial bonds and cession frameworks — enabling drawdown.",
      },
      {
        title: "Workout management for a lender",
        sector: "Commercial Lending",
        outcome: "Value recovered",
        forum: "Enforcement & negotiated disposal",
        scale: "Distressed commercial exposure",
        detail:
          "Managed the workout of a distressed commercial exposure, combining enforcement leverage with a negotiated asset disposal.",
      },
    ],
    stat: { value: 80, suffix: "+", label: "Facilities & security packages" },
  },
  {
    slug: "conveyancing-property",
    number: "06",
    name: "Conveyancing & Property",
    shortName: "Conveyancing",
    menuLabel: "Conveyancing & Property",
    tagline: "High-capacity transfers, registers opened right.",
    intro:
      "A high-capacity conveyancing and property practice for institutional land transfers, bank panel bond registrations, sectional title schemes and formal notarial executions.",
    accent: "#9c5a3c",
    accentSoft: "#f8efe9",
    image: "/images/conveyancing.png",
    icon: "key",
    overview: [
      "Conveyancing is where transactions land — or don't. The practice executes commercial and residential property transfers, registers mortgage bonds for major banking panels, opens sectional title registers, manages township conveyancing registers and performs notarial acts.",
      "Our pipelines are built for volume without losing matter-level care: milestone tracking, proactive correspondence, and clean deeds office performance. Institutional clients — banks, property funds, educational institutions — get predictable registration timelines and honest reporting.",
      "As panel attorneys we understand what lender checklists actually require, and we design our instruction flows to pass them the first time.",
    ],
    scope: [
      "Commercial and residential property transfers",
      "Mortgage bond registrations for banking panels",
      "Sectional title register openings",
      "Township conveyancing registers",
      "Institutional property portfolio conveyancing",
      "Notarial executions and notarial bonds",
    ],
    delivery: [
      "High-volume bond registration capacity",
      "Deeds office performance tracking",
      "Sectional title and township register management",
      "Notarial services",
    ],
    clients: [
      "Banking panels",
      "Property funds",
      "Property developers",
      "Educational institutions",
      "Private buyers and sellers",
    ],
    matters: [
      {
        title: "National bank panel registrations",
        sector: "Banking Panel",
        outcome: "1,000+ bonds registered",
        forum: "Deeds Registries — national",
        scale: "1,000+ registered bonds",
        detail:
          "Sustained high-volume bond registration work for a major bank's panel, across residential and commercial securities.",
      },
      {
        title: "Institutional portfolio transfers",
        sector: "Institutional Property",
        outcome: "Portfolio transferred",
        forum: "Staged deeds office lodgements",
        scale: "Commercial property portfolio",
        detail:
          "Executed the transfer of a commercial property portfolio for an institutional owner, staged across multiple deeds office lodgements.",
      },
      {
        title: "Sectional title establishment",
        sector: "Developments",
        outcome: "Registers opened",
        forum: "Deeds Registry",
        scale: "Residential scheme",
        detail:
          "Opened sectional title registers for a residential scheme, coordinating with the developer, body corporate and lender panels.",
      },
    ],
    stat: { value: 1000, suffix: "+", label: "Bonds registered" },
  },
];

export const getPractice = (slug: string) =>
  PRACTICE_AREAS.find((p) => p.slug === slug);

/* ——————————— Firm-level counters ——————————— */

export const COUNTERS = [
  { value: 15, suffix: "+", label: "Years in practice", note: "Combined experience across the practice and its leadership" },
  { value: 6, suffix: "", label: "Core practice areas", note: "A deliberate specialist hierarchy — depth over width" },
  { value: 300, suffix: "+", label: "Matters handled", note: "Litigation, transactions and registrations" },
  { value: 1000, suffix: "+", label: "Bonds registered", note: "Panel work across major banking institutions" },
];

/* ——————————— Trust architecture ——————————— */

export const TRUST_PILLARS = [
  {
    icon: "badge-check",
    title: "Verifiable credentials",
    text: "Public disclosures are restricted to confirmed academic qualifications, confirmed B-BBEE verification status and accredited professional memberships. Nothing is claimed that cannot be produced on request.",
  },
  {
    icon: "scale",
    title: "LPC regulatory compliance",
    text: "We operate in strict adherence to the Legal Practice Council Code of Conduct — governing marketing disclosures, trust account management and legal practice operations.",
  },
  {
    icon: "shield",
    title: "POPIA & PAIA governance",
    text: "Data handling is aligned to the Protection of Personal Information Act, and our PAIA Information Manual is published and accessible in our legal repository.",
  },
  {
    icon: "lock",
    title: "Pre-mandate conflict screening",
    text: "Every intake channel is protected by systematised conflict-check protocols. We ask prospective clients not to transmit confidential case material before a written mandate is signed.",
  },
];

/* ——————————— Sectors ——————————— */

export type Sector = {
  name: string;
  icon: string;
  /** Punchy one-liner shown in the explorer panel. */
  tagline: string;
  need: string;
  response: string;
  /** Related practice slugs, offered as deep links in the explorer. */
  practices: string[];
  /** Reference matter: [practiceSlug, matterIndex] for the file teaser. */
  fileRef: [string, number];
};

export const SECTORS: Sector[] = [
  {
    name: "Blue-Chip Companies",
    icon: "briefcase",
    tagline: "Boardroom stakes, courtroom discipline.",
    need: "High-court commercial litigation, complex breach-of-contract disputes, AFSA arbitrations and corporate workouts.",
    response: "Specialised litigation practice, structured dispute strategy and dedicated High Court advocacy.",
    practices: ["commercial-litigation", "banking-finance"],
    fileRef: ["commercial-litigation", 0],
  },
  {
    name: "SOEs & Panel Assessors",
    icon: "landmark",
    tagline: "Panel-ready by design.",
    need: "Statutory compliance, transparent governance, large-scale public dispute resolution and strict panel adherence.",
    response: "Verified LPC compliance, institutional trust architecture and robust governance reporting.",
    practices: ["commercial-litigation", "agricultural-finance"],
    fileRef: ["agricultural-finance", 0],
  },
  {
    name: "Government Departments",
    icon: "building",
    tagline: "Public mandate, private-practice rigour.",
    need: "Public sector advisory, regulatory compliance, procurement legal oversight and risk mitigation.",
    response: "Structured administrative law capability, PAIA/POPIA compliance and formal governance alignment.",
    practices: ["commercial-litigation", "real-estate-development"],
    fileRef: ["real-estate-development", 1],
  },
  {
    name: "Municipalities",
    icon: "map",
    tagline: "Land, services and delivery — made lawful.",
    need: "Land-use approvals, township establishment oversight, infrastructure packaging and regulatory disputes.",
    response: "Land assembly legal packaging, municipal regulatory navigation and PPP structuring.",
    practices: ["real-estate-development", "conveyancing-property"],
    fileRef: ["real-estate-development", 0],
  },
  {
    name: "Educational Institutions",
    icon: "graduation-cap",
    tagline: "Portfolios managed like endowments.",
    need: "Commercial property portfolio management, high-value transfer packaging and institutional dispute resolution.",
    response: "Dedicated conveyancing infrastructure, portfolio management and commercial contract advisory.",
    practices: ["conveyancing-property", "commercial-litigation"],
    fileRef: ["conveyancing-property", 1],
  },
  {
    name: "Banks & DFIs",
    icon: "landmark",
    tagline: "Security packages that survive enforcement.",
    need: "Complex loan and security documentation, mortgage bond registrations and workout management.",
    response: "Specialised banking and development finance practice with complete panel-readiness.",
    practices: ["banking-finance", "conveyancing-property"],
    fileRef: ["banking-finance", 1],
  },
  {
    name: "Property Developers",
    icon: "crane",
    tagline: "From bare land to capital close.",
    need: "Land assembly, feasibility modelling, rezoning, NHBRC enrolment, SHRA packaging and joint ventures.",
    response: "End-to-end development legal packaging, capital close support and end-user finance structuring.",
    practices: ["real-estate-development", "banking-finance"],
    fileRef: ["real-estate-development", 2],
  },
  {
    name: "Retiring Practitioners",
    icon: "handshake",
    tagline: "Succession without disruption.",
    need: "Confidential practice succession, seamless client handovers, staff retention and firm continuity.",
    response: "The structured “Joining the Firm” succession model with discreet, multi-phase transitions.",
    practices: ["conveyancing-property", "commercial-litigation"],
    fileRef: ["conveyancing-property", 2],
  },
];

/* ——————————— Engagement journey ——————————— */

export const JOURNEY = [
  {
    step: 1,
    title: "Practice-routed enquiry & conflict screening",
    text: "Your enquiry is routed directly to the relevant practice lead. Every intake channel carries an explicit conflict-check warning — please do not send confidential documents before screening is complete and a mandate is signed.",
    chips: ["Conflict check", "Practice routing"],
  },
  {
    step: 2,
    title: "Consultation & strategy scoping",
    text: "Once conflict checks clear, we schedule a structured scoping consultation — video conference, telephone, or in person at our Pretoria office — to define legal scope, strategy and risk parameters.",
    chips: ["Video / phone / in person", "Scope & risk mapping"],
  },
  {
    step: 3,
    title: "Fee model transparency",
    text: "Clear commercial fee options are presented and agreed in writing before any work begins: hourly rates for complex litigation and open-ended advisory, fixed-fee packaging for structured projects, and retainers for ongoing mandates.",
    chips: ["Hourly", "Fixed-fee", "Retainer"],
  },
  {
    step: 4,
    title: "Matter execution & progress tracking",
    text: "After the formal mandate is executed, your matter is handled under strict LPC Code of Conduct rules — with regular progress reporting and transparent communication throughout.",
    chips: ["LPC-compliant", "Progress reporting"],
  },
];

/* ——————————— Fee models ——————————— */

export const FEE_MODELS = [
  {
    icon: "clock",
    name: "Standard Hourly Rates",
    best: "Best for litigation & open-ended advisory",
    text: "For complex commercial litigation, arbitrations and open-ended advisory mandates where scope evolves matter by matter.",
    points: ["Transparent hourly scales agreed in writing", "Matter-level budgeting and reporting", "Suitable for High Court and AFSA proceedings"],
  },
  {
    icon: "package",
    name: "Fixed-Fee Project Packaging",
    best: "Best for developments & transactions",
    text: "For structured real estate packaging, contract drafting and specific conveyancing transactions — a defined scope at a defined price.",
    points: ["Scoped before commencement", "Predictable cost per milestone", "Ideal for development packaging & transfers"],
  },
  {
    icon: "refresh",
    name: "Retainer Arrangements",
    best: "Best for corporates & public entities",
    text: "Tailored monthly retainers for corporate and public entities that require ongoing legal advisory capacity on call.",
    points: ["Priority access and response times", "Governance-friendly monthly invoicing", "Scalable as mandates grow"],
  },
];

/* ——————————— FAQs ——————————— */

export const FAQS = [
  {
    q: "How do I start a mandate with Kgariya Inc.?",
    a: "Begin with a practice-routed enquiry via any form on this site, by telephone, or by email. We complete conflict screening first; once it clears, we schedule a scoping consultation and confirm the fee model in writing before any work starts.",
  },
  {
    q: "Can I send you my case documents right away?",
    a: "Please do not. Before formal conflict screening and a signed mandate, we cannot accept confidential case material. This protects you — and any party we may already act for — under our LPC-mandated conflict protocols.",
  },
  {
    q: "What fee models do you offer?",
    a: "Three: standard hourly rates for litigation and open-ended advisory; fixed-fee project packaging for structured developments, drafting and conveyancing transactions; and tailored monthly retainers for corporate and public entities.",
  },
  {
    q: "High Court or AFSA arbitration — how do you choose?",
    a: "It depends on confidentiality, speed, cost and enforceability. Arbitration is private and often faster; the High Court offers precedent-setting and certain remedies like interdicts. We recommend a forum only after mapping your commercial objectives.",
  },
  {
    q: "Do you act outside Gauteng?",
    a: "Our offices are in Pretoria and our core practice is Gauteng-focused. Selected mandates — particularly mining-adjacent, agricultural finance and development packaging — are accepted further afield where our panel and registration position allows.",
  },
  {
    q: "Are you B-BBEE verified and LPC compliant?",
    a: "Yes. The firm maintains confirmed B-BBEE status with formal verification certificates available on request, and operates in strict compliance with the LPC Code of Conduct, including trust account auditing and practice disclosures.",
  },
  {
    q: "Can you take over a matter from another attorney?",
    a: "Yes, subject to conflict screening and the orderly transfer of the file. We manage the handover formally so that representation is uninterrupted — the same continuity standard we apply to practices joining the firm.",
  },
  {
    q: "How are progress and costs reported?",
    a: "Mandates run under strict LPC compliance with regular written progress reports. Institutional clients receive matter-level reporting suitable for boards, tender committees and panel assessors.",
  },
];

/* ——————————— Director & people ——————————— */

export const DIRECTOR = {
  role: "Founding Director",
  photo: "/images/director.png",
  welcome:
    "“Institutional clients do not want slogans — they want evidence. Every qualification on this page can be verified, every panel credential produced, and every matter referenced anonymised and cleared. That is the standard we hold ourselves to, and it is the standard our clients buy.”",
  qualifications: [
    { label: "Bachelor of Laws (LLB)", group: "Legal & Financial" },
    { label: "Master of Business Administration (MBA) in Finance", group: "Legal & Financial" },
    { label: "Postgraduate Diploma in Real Estate Development & Management — Wits", group: "Real Estate" },
    { label: "Property Development Programme (PDP) — UCT", group: "Real Estate" },
    { label: "Mining Law & Resources Certificates — Wits", group: "Industry" },
  ],
  experience: [
    "Direct hands-on operational experience handling Land Bank legal matters during tenure at AFGRI.",
    "Former Chief Executive Officer of a property company — managing commercial portfolios, residential developments, mixed-use schemes, SHRA-subsidised social housing and property portfolio operations.",
    "Leads the firm's pivot to specialist commercial litigation, development packaging and development finance mandates.",
  ],
};

export const PEOPLE_PLACEHOLDERS = [
  {
    role: "Associate — Commercial Litigation",
    note: "Position reserved for the next attorney joining the litigation division.",
    status: "Profile in preparation",
  },
  {
    role: "Conveyancer / Notary",
    note: "High-capacity conveyancing and notarial execution leadership.",
    status: "Profile in preparation",
  },
  {
    role: "Candidate Attorneys",
    note: "Articles of clerkship intake — profiles published on commencement.",
    status: "Intake open",
  },
];

/* ——————————— Group ——————————— */

export const GROUP_ENTITIES = [
  {
    icon: "building",
    name: "Real Estate Development",
    text: "Residential, mixed-use and commercial development — the group's own projects give the legal practice ground-truth in approvals, construction risk and sales pipelines.",
  },
  {
    icon: "crane",
    name: "Construction Management",
    text: "Project and construction management capability that keeps legal advice anchored to programme, cost and site realities.",
  },
  {
    icon: "chart",
    name: "Property & Financial Advisory",
    text: "Feasibility, funding and portfolio advisory that complements the firm's development finance and banking practice.",
  },
];

/* ——————————— Careers ——————————— */

export const VACANCIES = [
  {
    title: "Candidate Attorney (Articles of Clerkship)",
    type: "Full-time · Pretoria",
    open: "2027 intake — applications reviewed on a rolling basis",
    text: "Two-year articles across litigation, conveyancing and development packaging. We invest in candidates who want exposure to institutional mandates, court attendance and deeds office practice from year one.",
    tags: ["LLB completed", "Admission exams preparation", "Mentorship"],
  },
  {
    title: "Associate — Commercial Litigation",
    type: "Full-time · Pretoria",
    open: "Open",
    text: "Two to five years' post-admission experience in commercial litigation or arbitration. High Court drafting, urgent applications and AFSA proceedings; development and finance sector exposure advantageous.",
    tags: ["High Court advocacy", "AFSA", "Drafting-intensive"],
  },
  {
    title: "Conveyancing Paralegal / Secretary",
    type: "Full-time · Pretoria",
    open: "Open",
    text: "Experience in transfers and bond registrations within a deeds-office-facing practice. Panel and township pipeline experience will distinguish strong applications.",
    tags: ["Transfers", "Bonds", "Deeds office"],
  },
];

export const CAREER_VALUES = [
  { icon: "book", title: "Real mandates, early", text: "Court rolls, deeds office lodgements and finance meetings — not photocopiers." },
  { icon: "users", title: "Named mentorship", text: "Every candidate attorney and junior associate is paired with a senior practitioner." },
  { icon: "trending-up", title: "A growing platform", text: "Acquisition-led growth means new roles open as practices join the firm." },
  { icon: "scale", title: "Ethics first", text: "LPC compliance and confidentiality are non-negotiable — we build careers that last." },
];

/* ——————————— Joining the Firm ——————————— */

export const JOINING_FEATURES = [
  {
    icon: "heart-handshake",
    title: "Uncompromising continuity of care",
    text: "Structured matter handover protocols designed to preserve historic client relationships and ensure uninterrupted legal representation from signature to completion.",
  },
  {
    icon: "users",
    title: "Staff & candidate attorney retention",
    text: "Career transition pathways structured to provide stability, ongoing mentorship and long-term career progression for transition staff and candidate attorneys.",
  },
  {
    icon: "lock",
    title: "Strictly confidential dialogues",
    text: "Purpose-built, discreet enquiry processes that protect succession discussions from premature public disclosure or market exposure.",
  },
  {
    icon: "network",
    title: "Scalable team infrastructure",
    text: "Practice integration workflows and attorney profile systems designed to absorb incoming legal professionals and expanding client rosters without operational disruption.",
  },
];

export const JOINING_PHASES = [
  {
    phase: "Phase 1",
    name: "Relaunch & Compliance",
    time: "Months 0–2",
    points: [
      "Core practice infrastructure established",
      "Statutory LPC compliance disclosures activated",
      "Practice-routed contact channels live",
      "Primary client alignment workflows initiated",
    ],
  },
  {
    phase: "Phase 2",
    name: "Credibility & Representative Matters",
    time: "Months 3–9",
    points: [
      "Approved, anonymised representative matter cards published",
      "Verified B-BBEE and panel credentials integrated",
      "Group synergy channels activated",
      "Discreet “Joining the Firm” succession module deployed",
    ],
  },
  {
    phase: "Phase 3",
    name: "Acquisition Growth & Client Transitions",
    time: "Months 10–24",
    points: [
      "Incoming attorneys onboarded from acquired practices",
      "Transaction-specific client-transition notices issued",
      "New practice nodes integrated into firm content infrastructure",
    ],
  },
];

/* ——————————— Trust strip badges ——————————— */

export const BADGES = [
  { label: "LPC Registered Practice", sub: "Legal Practice Council" },
  { label: "B-BBEE Verified", sub: "Certificate on request" },
  { label: "POPIA Compliant", sub: "Data governance" },
  { label: "PAIA Manual", sub: "Section 51 published" },
  { label: "Trust Account Audited", sub: "LPC standard" },
];

/* ——————————— SA legal ecosystem — regulation, courts, statute ——————————— */

/** Regulation, admission & standing — verifiable South African trust signals. */
export const SA_REGULATION = [
  {
    icon: "landmark",
    label: "Legal Practice Council",
    sub: "Registered practice",
    detail:
      "Attorneys, notaries and conveyancers admitted and enrolled with the Legal Practice Council — the national statutory regulator of the legal profession.",
  },
  {
    icon: "gavel",
    label: "High Court of South Africa",
    sub: "Admitted · right of appearance",
    detail:
      "Admission and right of appearance before the High Court of South Africa, acting before the Gauteng Division (Pretoria) and the Gauteng Local Division (Johannesburg).",
  },
  {
    icon: "stamp",
    label: "Deeds Registries Act 47 of 1937",
    sub: "Conveyancer practice",
    detail:
      "Practising conveyancers executing transfers, bonds and sectional title registers daily at the Pretoria Deeds Registry.",
  },
  {
    icon: "scroll-text",
    label: "Master of the High Court",
    sub: "Estates & notarial practice",
    detail:
      "Notarial and estate practice filing with the Master — deceased estates, trusts and notarial bonds under the Administration of Estates Act 66 of 1965.",
  },
  {
    icon: "shield",
    label: "POPIA & PAIA governance",
    sub: "Act 4 of 2013 · s51 manual",
    detail:
      "Information governance aligned to the Protection of Personal Information Act, with our Section 51 PAIA Information Manual published in the legal repository.",
  },
  {
    icon: "file-badge",
    label: "Attorneys Fidelity Fund",
    sub: "Trust account, audited",
    detail:
      "Client funds held in an LPC-compliant trust account covered by the Attorneys Fidelity Fund and independently audited annually.",
  },
] as const;

/** Courts, tribunals & registries where the practice acts. */
export const COURTS_FORUMS = [
  { name: "Constitutional Court", note: "Johannesburg" },
  { name: "Supreme Court of Appeal", note: "Bloemfontein" },
  { name: "Gauteng Division, Pretoria", note: "High Court" },
  { name: "Gauteng Local Division", note: "High Court · Johannesburg" },
  { name: "Land Claims Court", note: "Randburg" },
  { name: "AFSA", note: "Arbitration" },
  { name: "Competition Tribunal", note: "Merger control" },
  { name: "Magistrates' Courts", note: "Nationwide" },
  { name: "Pretoria Deeds Registry", note: "Registrations" },
  { name: "Master of the High Court", note: "Pretoria" },
] as const;

/** Statutory framework — the statutes the practice works under daily. */
export const SA_ACTS = [
  { short: "The Constitution", citation: "Republic of South Africa, 1996" },
  { short: "Companies Act", citation: "Act 71 of 2008" },
  { short: "National Credit Act", citation: "Act 34 of 2005" },
  { short: "POPIA", citation: "Act 4 of 2013" },
  { short: "Consumer Protection Act", citation: "Act 68 of 2008" },
  { short: "Deeds Registries Act", citation: "Act 47 of 1937" },
  { short: "Labour Relations Act", citation: "Act 66 of 1995" },
  { short: "Property Practitioners Act", citation: "Act 22 of 2019" },
] as const;

/** Director-level admissions & professional standing. */
export const CREDENTIALS = [
  { icon: "gavel", label: "Admitted Attorney", sub: "High Court of South Africa" },
  { icon: "landmark", label: "Right of Appearance", sub: "Superior Courts of South Africa" },
  { icon: "stamp", label: "Conveyancer", sub: "Pretoria Deeds Registry" },
  { icon: "scroll-text", label: "Notary Public", sub: "Deeds Registries Act" },
  { icon: "graduation-cap", label: "LLB · MBA (Finance)", sub: "Legal & financial disciplines" },
  { icon: "award", label: "15+ years", sub: "Commercial & property practice" },
] as const;

/** Courts, forums & regulators per practice (practice pages). */
export const PRACTICE_FORUMS: Record<string, { name: string; note: string }[]> = {
  "commercial-litigation": [
    { name: "Gauteng Division, Pretoria", note: "High Court" },
    { name: "Gauteng Local Division, Johannesburg", note: "High Court" },
    { name: "Supreme Court of Appeal", note: "Bloemfontein" },
    { name: "AFSA", note: "Arbitration" },
    { name: "Magistrates' Courts", note: "Nationwide" },
  ],
  "real-estate-development": [
    { name: "Municipal councils", note: "Approvals & rezoning" },
    { name: "Gauteng planning tribunals", note: "Land use" },
    { name: "NHBRC", note: "Enrolment" },
    { name: "SHRA", note: "Social housing" },
    { name: "Pretoria Deeds Registry", note: "Registrations" },
  ],
  "mining-resources": [
    { name: "DMRE", note: "Mineral rights & rights conversions" },
    { name: "Mining Titles Office", note: "Title deeds & cession" },
    { name: "High Court", note: "Judicial review" },
    { name: "Land Claims Court", note: "Restitution" },
  ],
  "agricultural-finance": [
    { name: "Land & Agricultural Development Bank", note: "DFI finance" },
    { name: "National Credit Regulator", note: "Credit compliance" },
    { name: "High Court", note: "Security enforcement" },
    { name: "AFSA", note: "Arbitration" },
  ],
  "banking-finance": [
    { name: "South African Reserve Bank", note: "Prudential framework" },
    { name: "FSCA", note: "Market conduct" },
    { name: "National Credit Regulator", note: "Credit registration" },
    { name: "CIPC", note: "Company & security filings" },
  ],
  "conveyancing-property": [
    { name: "Pretoria Deeds Registry", note: "Transfers & bonds" },
    { name: "Master of the High Court", note: "Estates & endorsements" },
    { name: "PPRA", note: "Property practitioners" },
    { name: "SARS", note: "Transfer duty & clearance" },
    { name: "Municipalities", note: "Rates clearance" },
  ],
};

/* ——————————— Live ticker — "the deal desk" ——————————— */

export type TickerItem = {
  kind: "Transaction" | "Litigation" | "Registration" | "Mandate" | "Advisory";
  title: string;
  value: string;
  direction: "up" | "down";
};

export const TICKER_ITEMS: TickerItem[] = [
  { kind: "Transaction", title: "Township development finance package", value: "R 480m facility documented", direction: "up" },
  { kind: "Litigation", title: "Commercial arbitration award", value: "Award upheld, with costs", direction: "up" },
  { kind: "Registration", title: "Sectional title register opened", value: "Deeds office — registered", direction: "up" },
  { kind: "Mandate", title: "Panel appointment, listed borrower", value: "Security package review", direction: "up" },
  { kind: "Advisory", title: "NHBRC enrolment strategy", value: "Cleared for phase submission", direction: "up" },
  { kind: "Litigation", title: "Urgent interdict, construction site", value: "Resolved without costs order", direction: "down" },
  { kind: "Transaction", title: "SHRA social housing agreements", value: "Project agreements signed", direction: "up" },
  { kind: "Registration", title: "Bond registrations this quarter", value: "1,000+ milestone", direction: "up" },
  { kind: "Mandate", title: "Municipal PPP advisory", value: "Feasibility legal opinion issued", direction: "up" },
  { kind: "Transaction", title: "Multi-tiered security package", value: "Credit committee approved", direction: "up" },
];

/* ——————————— Client voices (anonymised per LPC rules) ——————————— */

export const TESTIMONIALS = [
  {
    quote:
      "They report like investment professionals — every stage of the dispute documented, every strategic option costed. Our board knew exactly where the matter stood at all times.",
    name: "General Counsel",
    org: "JSE-listed property group",
    practice: "Commercial Litigation & Arbitration",
  },
  {
    quote:
      "The development packaging was underwriting-grade from day one. Our credit committee had every question answered before it was asked — that is rare.",
    name: "Head of Development Finance",
    org: "National banking institution",
    practice: "Real Estate Development Packaging",
  },
  {
    quote:
      "Precise, discreet and relentless on the deadlines that mattered. The security package held up under exactly the pressure it was designed for.",
    name: "Chief Risk Officer",
    org: "Development finance institution",
    practice: "Banking & Development Finance",
  },
  {
    quote:
      "A firm that retired forty services to be excellent at six — you feel the depth in the first meeting. No generalist guesswork, only specialist conviction.",
    name: "Managing Director",
    org: "Private development company",
    practice: "Full-mandate engagement",
  },
];
