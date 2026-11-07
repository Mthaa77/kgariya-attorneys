import { defineField, defineType } from "sanity";

const ordered = (name = "displayOrder") => defineField({ name, title: "Display order", type: "number", initialValue: 10, validation: (Rule) => Rule.integer().min(0) });
const published = (name = "isPublished") => defineField({ name, title: "Published", type: "boolean", initialValue: false });
const body = (name = "body") => defineField({ name, title: "Body", type: "array", of: [{ type: "block" }, { type: "imageWithAlt" }] });
const stringList = (name: string, title: string) => defineField({ name, title, type: "array", of: [{ type: "string" }] });

export const practiceArea = defineType({
  name: "practiceArea", title: "Practice Areas", type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "number", title: "Number", type: "string" }),
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "shortName", title: "Short name", type: "string" }),
    defineField({ name: "menuLabel", title: "Menu label", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Hero image", type: "imageWithAlt" }),
    defineField({ name: "accent", title: "Accent colour", type: "string" }),
    defineField({ name: "accentSoft", title: "Soft accent colour", type: "string" }),
    defineField({ name: "iconKey", title: "Icon key", type: "string" }),
    body("overview"), stringList("scope", "Scope"), stringList("delivery", "Delivery"), stringList("clients", "Clients"),
    defineField({ name: "stat", title: "Statistic", type: "object", fields: [defineField({ name: "value", type: "number", title: "Value" }), defineField({ name: "suffix", type: "string", title: "Suffix" }), defineField({ name: "label", type: "string", title: "Label" })] }),
    ordered(), published(),
  ], preview: { select: { title: "name", subtitle: "slug.current", media: "image" } },
});

export const homePage = defineType({
  name: "homePage", title: "Homepage", type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Internal title", initialValue: "Homepage" }),
    defineField({
      name: "heroSlides", type: "array", title: "Hero slides",
      of: [{ type: "object", fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "titleAccent", type: "string", title: "Title accent" },
        { name: "text", type: "text", title: "Text" },
        { name: "image", type: "imageWithAlt", title: "Image" },
        { name: "primaryLabel", type: "string", title: "Primary action label" },
        { name: "primaryAction", type: "string", title: "Primary action" },
        { name: "secondaryLabel", type: "string", title: "Secondary action label" },
        { name: "secondaryRoute", type: "string", title: "Secondary route" },
      ] }],
    }),
    defineField({ name: "trustPillars", type: "array", title: "Trust pillars", of: [{ type: "object", fields: [
      defineField({ name: "iconKey", type: "string", title: "Icon key" }),
      defineField({ name: "title", type: "string", title: "Title" }),
      defineField({ name: "text", type: "text", title: "Text" }),
    ] }] }),
    defineField({ name: "faqs", type: "array", title: "FAQs", of: [{ type: "object", fields: [{ name: "question", type: "string", title: "Question" }, { name: "answer", type: "text", title: "Answer" }] }] }),
    published(),
  ],
});

export const aboutPage = defineType({ name: "aboutPage", title: "About the Firm", type: "document", fields: [
  defineField({ name: "heroTitle", type: "string", title: "Hero title" }),
  defineField({ name: "heroLead", type: "text", title: "Hero introduction" }),
  defineField({ name: "title", type: "string", title: "Section title" }),
  defineField({ name: "intro", type: "text", title: "Section introduction" }),
  body(),
  defineField({ name: "timeline", type: "array", title: "Timeline", of: [{ type: "object", fields: [
    defineField({ name: "era", type: "string", title: "Era" }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "text", type: "text", title: "Text" })
  ] }] }),
  published()
] });

export const groupPage = defineType({ name: "groupPage", title: "Kgariya & Co Group", type: "document", fields: [
  defineField({ name: "heroTitle", type: "string", title: "Hero title" }),
  defineField({ name: "heroLead", type: "text", title: "Hero introduction" }),
  defineField({ name: "heroImage", type: "imageWithAlt", title: "Hero image" }),
  defineField({ name: "title", type: "string", title: "Section title" }),
  defineField({ name: "intro", type: "text", title: "Introduction" }),
  defineField({ name: "entities", type: "array", title: "Group entities", of: [{ type: "object", fields: [
    defineField({ name: "iconKey", type: "string", title: "Icon key" }),
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "text", type: "text", title: "Text" })
  ] }] }),
  published()
] });

export const legalDocument = defineType({ name: "legalDocument", title: "Legal & Compliance Documents", type: "document", fields: [defineField({ name: "documentType", type: "string", title: "Document type", options: { list: ["privacy", "paia", "cookies", "terms", "lpc"] }, validation: (Rule) => Rule.required() }), defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "documentType" }, validation: (Rule) => Rule.required() }), defineField({ name: "title", type: "string", title: "Title" }), defineField({ name: "intro", type: "text", title: "Introduction" }), defineField({ name: "sections", type: "array", title: "Sections", of: [{ type: "object", fields: [defineField({ name: "heading", type: "string", title: "Heading" }), body(), stringList("listItems", "List items")] }] }), defineField({ name: "effectiveDate", type: "date", title: "Effective date" }), defineField({ name: "lastReviewedDate", type: "date", title: "Last reviewed" }), defineField({ name: "version", type: "string", title: "Version" }), published(), ordered()] });

export const jobPosting = defineType({ name: "jobPosting", title: "Job postings", type: "document", fields: [defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }), defineField({ name: "employmentType", type: "string", title: "Employment type" }), defineField({ name: "location", type: "string", title: "Location" }), defineField({ name: "statusText", type: "string", title: "Status" }), defineField({ name: "summary", type: "text", title: "Summary" }), stringList("requirementsOrTags", "Requirements and tags"), defineField({ name: "applicationEmail", type: "email", title: "Application email" }), defineField({ name: "isOpen", type: "boolean", title: "Open", initialValue: false }), ordered()] });

export const careersPage = defineType({ name: "careersPage", title: "Careers page", type: "document", fields: [
  defineField({ name: "heroTitle", type: "string", title: "Hero title" }),
  defineField({ name: "heroImage", type: "imageWithAlt", title: "Hero image" }),
  defineField({ name: "intro", type: "text", title: "Introduction" }),
  defineField({ name: "openPositionsIntro", type: "text", title: "Open positions introduction" }),
  defineField({ name: "values", type: "array", title: "Career values", of: [{ type: "object", fields: [
    defineField({ name: "iconKey", type: "string", title: "Icon key" }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "text", type: "text", title: "Text" }),
    ordered()
  ] }] }),
  published()
] });

export const joiningPage = defineType({ name: "joiningPage", title: "Joining the Firm", type: "document", fields: [
  defineField({ name: "hero", type: "object", title: "Hero", fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "text", type: "text", title: "Text" }),
    defineField({ name: "image", type: "imageWithAlt", title: "Image" })
  ] }),
  defineField({ name: "features", type: "array", title: "Features", of: [{ type: "object", fields: [
    defineField({ name: "iconKey", type: "string", title: "Icon key" }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "text", type: "text", title: "Text" })
  ] }] }),
  defineField({ name: "phases", type: "array", title: "Phases", of: [{ type: "object", fields: [
    defineField({ name: "phase", type: "string", title: "Phase" }),
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "time", type: "string", title: "Time" }),
    stringList("points", "Points")
  ] }] }),
  published()
] });

export const sector = defineType({ name: "sector", title: "Sectors", type: "document", fields: [defineField({ name: "name", type: "string", title: "Name" }), defineField({ name: "iconKey", type: "string", title: "Icon key" }), defineField({ name: "tagline", type: "string", title: "Tagline" }), defineField({ name: "clientNeed", type: "text", title: "Client need" }), defineField({ name: "firmResponse", type: "text", title: "Firm response" }), defineField({ name: "relatedPractices", type: "array", title: "Related practices", of: [{ type: "reference", to: [{ type: "practiceArea" }] }] }), defineField({ name: "featuredMatter", type: "reference", title: "Featured matter", to: [{ type: "representativeMatter" }] }), ordered(), published()] });

export const testimonial = defineType({ name: "testimonial", title: "Testimonials", type: "document", fields: [defineField({ name: "quote", type: "text", title: "Quote" }), defineField({ name: "attribution", type: "string", title: "Attribution" }), defineField({ name: "organisationDescriptor", type: "string", title: "Organisation descriptor" }), defineField({ name: "practiceArea", type: "reference", title: "Practice area", to: [{ type: "practiceArea" }] }), ordered(), published()] });
export const tickerItem = defineType({ name: "tickerItem", title: "Ticker items", type: "document", fields: [defineField({ name: "kind", type: "string", title: "Kind" }), defineField({ name: "title", type: "string", title: "Title" }), defineField({ name: "value", type: "string", title: "Value" }), defineField({ name: "direction", type: "string", title: "Direction" }), defineField({ name: "reviewDate", type: "date", title: "Review date" }), defineField({ name: "active", type: "boolean", title: "Active", initialValue: false }), ordered()] });

const supporting = (name: string, title: string, fields: ReturnType<typeof defineField>[]) => defineType({ name, title, type: "document", fields: [...fields, ordered()] });
export const regulatoryDisclosure = supporting("regulatoryDisclosure", "Regulatory disclosures", [defineField({ name: "iconKey", type: "string", title: "Icon key" }), defineField({ name: "label", type: "string", title: "Label" }), defineField({ name: "sub", type: "string", title: "Sub-label" }), defineField({ name: "detail", type: "text", title: "Detail" })]);
export const courtForum = supporting("courtForum", "Courts and forums", [defineField({ name: "name", type: "string", title: "Name" }), defineField({ name: "note", type: "string", title: "Note" })]);
export const statute = supporting("statute", "Statutes", [defineField({ name: "shortName", type: "string", title: "Short name" }), defineField({ name: "citation", type: "string", title: "Citation" })]);
export const professionalCredential = supporting("professionalCredential", "Professional credentials", [defineField({ name: "iconKey", type: "string", title: "Icon key" }), defineField({ name: "label", type: "string", title: "Label" }), defineField({ name: "sub", type: "string", title: "Sub-label" })]);
