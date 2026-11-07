import { createClient } from "@sanity/client";
import {
  FIRM, PRACTICE_AREAS, DIRECTOR, FAQS, SECTORS, TRUST_PILLARS, GROUP_ENTITIES,
  VACANCIES, CAREER_VALUES, JOINING_FEATURES, JOINING_PHASES, SA_REGULATION,
  COURTS_FORUMS, SA_ACTS, CREDENTIALS, TICKER_ITEMS, TESTIMONIALS,
} from "../src/lib/site-data";
import { ARTICLES } from "../src/lib/insights";

const apply = process.argv.includes("--apply");
const projectId = process.env.SANITY_API_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) throw new Error("SANITY_API_PROJECT_ID and SANITY_API_DATASET are required");
if (apply && !token) throw new Error("SANITY_API_WRITE_TOKEN is required with --apply");

const practiceImages: Record<string, { assetId: string; alt: string }> = {
  "commercial-litigation": { assetId: "image-0f1381415b20e64dee929bbe5596e48e019bf1b1-1344x768-jpg", alt: "Commercial litigation and arbitration practice" },
  "real-estate-development": { assetId: "image-1305a0a048d782d48cae159b9d70e03237ba83fb-1344x768-jpg", alt: "Real estate development and township packaging practice" },
  "mining-resources": { assetId: "image-151d0f9f56402fef40f5af53b6a2f96ff361cf9a-1344x768-jpg", alt: "Mining and resources practice" },
  "agricultural-finance": { assetId: "image-37a98f808cf6ff14a05ee015e298b6c28214722e-1344x768-jpg", alt: "Agricultural finance and security practice" },
  "banking-finance": { assetId: "image-71245801ae90805a494232936548dc7fabfaf9cc-1344x768-jpg", alt: "Banking and finance practice" },
  "conveyancing-property": { assetId: "image-9f66b5a7f3905da508b24e4a214d7003df8040fc-1344x768-jpg", alt: "Conveyancing and property practice" },
};
const directorPhotograph = {
  _type: "imageWithAlt",
  asset: { _type: "reference", _ref: "image-16800d1e86f6dc4db55c371646d2a2cd0ea2c3cb-864x1152-jpg" },
  alt: "Portrait of the Founding Director of Kgariya Attorneys Incorporated",
};

const toBlocks = (paragraphs: string[]) => paragraphs.map((text, index) => ({ _key: `paragraph-${index + 1}`, _type: "block", style: "normal", markDefs: [], children: [{ _key: `span-${index + 1}`, _type: "span", marks: [], text }] }));
const id = (type: string, key: string) => `${type}.${key}`;
const draftId = (type: string, key: string) => `drafts.${id(type, key)}`;

const documents = [
  {
    _id: draftId("siteSettings", "singleton"), _type: "siteSettings", firmName: FIRM.name, shortName: FIRM.shortName, tagline: FIRM.tagline,
    phone: FIRM.phone, email: FIRM.email, careersEmail: FIRM.careersEmail, website: FIRM.webHref, address: Object.values(FIRM.address).join(", "),
    hours: FIRM.hours, hoursShort: FIRM.hoursShort, mapsQuery: FIRM.mapsQuery,
  },
  ...PRACTICE_AREAS.map((practice) => ({
    _id: draftId("practiceArea", practice.slug), _type: "practiceArea", slug: { _type: "slug", current: practice.slug }, number: practice.number,
    name: practice.name, shortName: practice.shortName, menuLabel: practice.menuLabel, tagline: practice.tagline, intro: practice.intro, accent: practice.accent, accentSoft: practice.accentSoft, iconKey: practice.icon,
    image: { _type: "imageWithAlt", asset: { _type: "reference", _ref: practiceImages[practice.slug].assetId }, alt: practiceImages[practice.slug].alt },
    overview: toBlocks(practice.overview), scope: practice.scope, delivery: practice.delivery, clients: practice.clients, stat: practice.stat, isPublished: false,
  })),
  ...PRACTICE_AREAS.flatMap((practice) => practice.matters.map((matter, index) => ({
    _id: draftId("representativeMatter", `${practice.slug}-${index + 1}`), _type: "representativeMatter", title: matter.title,
    slug: { _type: "slug", current: `${practice.slug}-${index + 1}` }, practiceArea: practice.slug, industry: matter.sector,
    anonymisedSummary: matter.detail, approvedOutcome: matter.outcome, forum: matter.forum, scale: matter.scale, approvedForPublication: false,
  }))),
  {
    _id: draftId("attorney", "founding-director"), _type: "attorney", fullName: "Founding Director", professionalTitle: DIRECTOR.role,
    photograph: directorPhotograph, welcomeQuote: DIRECTOR.welcome, experience: DIRECTOR.experience, qualifications: DIRECTOR.qualifications.map((item) => `${item.label} — ${item.group}`),
    practiceAreas: PRACTICE_AREAS.map((practice) => practice.slug), displayOrder: 1, approvedForPublication: false,
  },
  ...ARTICLES.map((article) => ({
    _id: draftId("article", article.slug), _type: "article", slug: { _type: "slug", current: article.slug }, title: article.title,
    category: article.category, categorySlug: article.categorySlug, publicationDate: article.date, readTime: article.readTime, excerpt: article.excerpt,
    body: toBlocks(article.body), publicationStatus: "draft", visibility: "internal", featured: Boolean(article.featured),
  })),

  {
    _id: draftId("homePage", "singleton"), _type: "homePage", title: "Homepage", isPublished: false,
    heroSlides: [
      { _key: "hero-commercial-litigation", eyebrow: "Commercial Litigation & Arbitration", title: "High-stakes disputes,", titleAccent: "fought with strategy.", text: "High Court litigation and AFSA arbitration for corporates, banks and public bodies — strategy before summons, reporting at every stage.", image: { _type: "imageWithAlt", asset: { _type: "reference", _ref: "image-f6216c46f0f1a9ce1870d611cf07415730c0767e-1080x695-jpg" }, alt: "Commercial litigation and arbitration" }, primaryLabel: "Book a consultation", primaryAction: "booking", secondaryLabel: "Our practice areas", secondaryRoute: "#practice" },
      { _key: "hero-development-packaging", eyebrow: "Real Estate Development Packaging", title: "From bare land", titleAccent: "to capital close.", text: "End-to-end legal packaging for townships, rezoning, NHBRC, SHRA schemes and bank/DFI finance applications — built to underwrite.", image: { _type: "imageWithAlt", asset: { _type: "reference", _ref: "image-66dd8534758977b4d819244db927e2c1a9055b08-980x653-jpg" }, alt: "Real estate development packaging" }, primaryLabel: "Book a consultation", primaryAction: "booking", secondaryLabel: "Explore development packaging", secondaryRoute: "#/practice/real-estate-development" },
      { _key: "hero-banking-finance", eyebrow: "Banking & Development Finance", title: "Facilities and security,", titleAccent: "documented to hold.", text: "Facility agreements, multi-tiered security packages and workouts — panel-ready for lenders, negotiated fairly for borrowers.", image: { _type: "imageWithAlt", asset: { _type: "reference", _ref: "image-c46e56063cd4d66471a4db3b3ef26a0afe7e0221-886x590-jpg" }, alt: "Banking and development finance" }, primaryLabel: "Book a consultation", primaryAction: "booking", secondaryLabel: "Banking & finance practice", secondaryRoute: "#/practice/banking-finance" }
    ],
    trustPillars: TRUST_PILLARS.map((item) => ({ iconKey: item.icon, title: item.title, text: item.text })),
    faqs: FAQS.map((item) => ({ question: item.q, answer: item.a })),
  },
  {
    _id: draftId("aboutPage", "singleton"), _type: "aboutPage", isPublished: false,
    heroTitle: "Built on evidence. Structured for institutions.",
    heroLead: "Kgariya Attorneys Incorporated occupies a distinct, authoritative position in the South African legal market — specialised, compliant and commercially astute.",
    title: "The institutional leap forward.",
    intro: "To address the increasingly complex regulatory and commercial demands of Gauteng's public and private sectors, Kgariya Inc. undertook a deliberate strategic pivot away from generalized legal provision.",
    body: toBlocks([
      "Recognising that institutional clients demand specialised depth rather than superficial width, the firm retired its historical generalist model and concentrated its strategic assets around six prioritised core competencies. This realignment ensures institutional clients access high-value legal expertise backed by direct commercial execution experience — optimising attorney resource allocation, accelerating transaction close times, and delivering risk-adjusted legal strategy across high-stakes disputes and development finance structures.",
      "The firm operates from Walker Creek Office Park in Pretoria with the strategic support of the broader Kgariya & Co Group — real-world development, construction and advisory capability that keeps our legal work anchored to project cash flows and commercial risk, not abstractions."
    ]),
    timeline: [
      { _key: "origins", era: "Origins", title: "A general practice — and a lesson", text: "The firm's legacy listed over forty sub-services, from aviation to immigration. Institutional clients, we learned, do not want width. They want depth they can verify." },
      { _key: "pivot", era: "The pivot", title: "Retiring 40 sub-services, by design", text: "Kgariya Inc. formally retired non-core areas — competition, aviation, immigration among them — and concentrated its operational infrastructure on six prioritised competencies." },
      { _key: "today", era: "Today", title: "Litigation-led, development-anchored", text: "A Pretoria commercial disputes and finance practice: High Court and AFSA work, end-to-end development packaging, and panel-ready banking, agri-finance and conveyancing capacity." },
      { _key: "next", era: "Next", title: "Growth by honourable succession", text: "The “Joining the Firm” model scales the practice by merging the mandates of retiring practitioners — continuity for their clients, careers for their staff." }
    ]
  },
  {
    _id: draftId("groupPage", "singleton"), _type: "groupPage", isPublished: false,
    heroTitle: "Legal advice anchored to real projects.",
    heroLead: "Kgariya Attorneys Inc. operates with the strategic support of the broader Kgariya & Co Group — complementary capability across real estate development, construction management, and property & financial advisory.",
    heroImage: { _type: "imageWithAlt", asset: { _type: "reference", _ref: "image-9678416bdfb457fe72d32ff42bb2f9f4f31b68b8-1344x768-jpg" }, alt: "Kgariya & Co Group construction and project capability" },
    title: "Three capabilities. One ecosystem.",
    intro: "The group brings together complementary capabilities that the legal practice draws on — and contributes legal rigour back to.",
    entities: GROUP_ENTITIES.map((item) => ({ iconKey: item.icon, name: item.name, text: item.text }))
  },
  {
    _id: draftId("careersPage", "singleton"), _type: "careersPage", isPublished: false,
    heroTitle: "Real mandates. Named mentors. Careers that last.",
    intro: "Join a Pretoria practice in deliberate growth — where candidate attorneys see court rolls and deeds offices in year one, and associates build institutional-grade work.",
    openPositionsIntro: "Applications are reviewed on a rolling basis. Send a CV and a short motivation through the form below, or via email.",
    values: CAREER_VALUES.map((item) => ({ iconKey: item.icon, title: item.title, text: item.text }))
  },
  {
    _id: draftId("joiningPage", "singleton"), _type: "joiningPage", isPublished: false,
    hero: { title: "An honourable handover for a life's practice.", text: "A dedicated succession and practice acquisition framework for retiring legal practitioners — built for seamless transitions, preserved legacies and protected clients." },
    features: JOINING_FEATURES.map((item) => ({ iconKey: item.icon, title: item.title, text: item.text })),
    phases: JOINING_PHASES.map((item) => ({ phase: item.phase, name: item.name, time: item.time, points: item.points }))
  },
  ...VACANCIES.map((item, index) => ({
    _id: draftId("jobPosting", "vacancy-" + (index + 1)), _type: "jobPosting",
    title: item.title, employmentType: item.type.split(" · ")[0], location: item.type.split(" · ")[1] || "Pretoria",
    statusText: item.open, summary: item.text, requirementsOrTags: item.tags,
    applicationEmail: FIRM.careersEmail, isOpen: true, displayOrder: index + 1
  })),
  ...SECTORS.map((item, index) => ({
    _id: draftId("sector", item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")),
    _type: "sector", name: item.name, iconKey: item.icon, tagline: item.tagline,
    clientNeed: item.need, firmResponse: item.response,
    relatedPractices: item.practices.map((slug) => ({ _type: "reference", _ref: id("practiceArea", slug) })),
    featuredMatter: { _type: "reference", _ref: id("representativeMatter", item.fileRef[0] + "-" + (item.fileRef[1] + 1)) },
    displayOrder: index + 1, isPublished: false
  })),
  ...TESTIMONIALS.map((item, index) => {
    const practice = PRACTICE_AREAS.find((area) => area.name === item.practice);
    return {
      _id: draftId("testimonial", "testimonial-" + (index + 1)), _type: "testimonial",
      quote: item.quote, attribution: item.name, organisationDescriptor: item.org,
      ...(practice ? { practiceArea: { _type: "reference", _ref: id("practiceArea", practice.slug) } } : {}),
      displayOrder: index + 1, isPublished: false
    };
  }),
  ...TICKER_ITEMS.map((item, index) => ({
    _id: draftId("tickerItem", "ticker-" + (index + 1)), _type: "tickerItem",
    kind: item.kind, title: item.title, value: item.value, direction: item.direction,
    active: false, displayOrder: index + 1
  })),
  ...SA_REGULATION.map((item, index) => ({
    _id: draftId("regulatoryDisclosure", "disclosure-" + (index + 1)), _type: "regulatoryDisclosure",
    iconKey: item.icon, label: item.label, sub: item.sub, detail: item.detail, displayOrder: index + 1
  })),
  ...COURTS_FORUMS.map((item, index) => ({
    _id: draftId("courtForum", "forum-" + (index + 1)), _type: "courtForum",
    name: item.name, note: item.note, displayOrder: index + 1
  })),
  ...SA_ACTS.map((item, index) => ({
    _id: draftId("statute", "statute-" + (index + 1)), _type: "statute",
    shortName: item.short, citation: item.citation, displayOrder: index + 1
  })),
  ...CREDENTIALS.map((item, index) => ({
    _id: draftId("professionalCredential", "credential-" + (index + 1)), _type: "professionalCredential",
    iconKey: item.icon, label: item.label, sub: item.sub, displayOrder: index + 1
  })),

];

console.log(`Prepared ${documents.length} draft documents: 1 siteSettings, ${PRACTICE_AREAS.length} practiceArea, ${PRACTICE_AREAS.reduce((total, practice) => total + practice.matters.length, 0)} representativeMatter, 1 attorney, ${ARTICLES.length} article.`);
console.log("All records use stable draft IDs and remain unpublished until explicitly promoted.");
if (!apply) {
  console.log("Dry run only. Re-run with --apply to write these drafts to Sanity.");
  process.exit(0);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false, perspective: "drafts" });
const chunkSize = 50;
const existingIds = new Set<string>();

// Read first, then create only missing IDs. Never replace an editor's existing draft.
for (let offset = 0; offset < documents.length; offset += chunkSize) {
  const batch = documents.slice(offset, offset + chunkSize);
  const existing = await client.fetch<Array<{ _id: string }>>(
    `*[_id in $ids]{_id}`,
    { ids: batch.map((document) => document._id) },
  );
  for (const document of existing) existingIds.add(document._id);
}

const missingDocuments = documents.filter((document) => !existingIds.has(document._id));
console.log(`Preserving ${existingIds.size} existing drafts; creating ${missingDocuments.length} missing drafts.`);

for (let offset = 0; offset < missingDocuments.length; offset += chunkSize) {
  const chunk = missingDocuments.slice(offset, offset + chunkSize);
  const transaction = client.transaction();
  for (const document of chunk) transaction.createIfNotExists(document);
  await transaction.commit();
}
console.log(`Sanity draft migration complete. ${missingDocuments.length} new drafts created; existing drafts were not overwritten and no content documents were published.`);
