import { defineField, defineType } from "sanity";

export const representativeMatter = defineType({
  name: "representativeMatter",
  title: "Representative Matters",
  type: "document",
  description: "Use anonymised information only. Never add client identities or confidential case details.",
  fields: [
    defineField({ name: "title", title: "Matter title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "practiceArea", title: "Practice area", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "industry", title: "Industry or sector", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "anonymisedSummary", title: "Anonymised matter summary", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: "legalContext", title: "Relevant legal context", type: "text", rows: 4 }),
    defineField({ name: "approvedOutcome", title: "Approved outcome, where permitted", type: "string" }),
    defineField({ name: "featuredImage", title: "Featured image", type: "imageWithAlt" }),
    defineField({ name: "approvedForPublication", title: "Approval for public publication", type: "boolean", initialValue: false, validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "practiceArea", media: "featuredImage" } },
});
