import { createClient } from "@sanity/client";
import { FIRM, PRACTICE_AREAS, DIRECTOR } from "../src/lib/site-data";
import { ARTICLES } from "../src/lib/insights";

const apply = process.argv.includes("--apply");
const projectId = process.env.SANITY_API_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_API_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) throw new Error("SANITY_API_PROJECT_ID and SANITY_API_DATASET are required");
if (apply && !token) throw new Error("SANITY_API_WRITE_TOKEN is required with --apply");

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
    overview: toBlocks(practice.overview), scope: practice.scope, delivery: practice.delivery, clients: practice.clients, stat: practice.stat, isPublished: false,
  })),
  ...PRACTICE_AREAS.flatMap((practice) => practice.matters.map((matter, index) => ({
    _id: draftId("representativeMatter", `${practice.slug}-${index + 1}`), _type: "representativeMatter", title: matter.title,
    slug: { _type: "slug", current: `${practice.slug}-${index + 1}` }, practiceArea: practice.slug, industry: matter.sector,
    anonymisedSummary: matter.detail, approvedOutcome: matter.outcome, forum: matter.forum, scale: matter.scale, approvedForPublication: false,
  }))),
  {
    _id: draftId("attorney", "founding-director"), _type: "attorney", fullName: "Founding Director", professionalTitle: DIRECTOR.role,
    welcomeQuote: DIRECTOR.welcome, experience: DIRECTOR.experience, qualifications: DIRECTOR.qualifications.map((item) => `${item.label} — ${item.group}`),
    practiceAreas: PRACTICE_AREAS.map((practice) => practice.slug), displayOrder: 1, approvedForPublication: false,
  },
  ...ARTICLES.map((article) => ({
    _id: draftId("article", article.slug), _type: "article", slug: { _type: "slug", current: article.slug }, title: article.title,
    category: article.category, categorySlug: article.categorySlug, publicationDate: article.date, readTime: article.readTime, excerpt: article.excerpt,
    body: toBlocks(article.body), publicationStatus: "draft", visibility: "internal", featured: Boolean(article.featured),
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
