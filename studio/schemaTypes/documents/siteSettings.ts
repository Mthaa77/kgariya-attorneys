import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Global Site Settings",
  type: "document",
  fields: [
    defineField({ name: "firmName", title: "Firm name", type: "string", initialValue: "Kgariya Attorneys Incorporated", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Firm logo", type: "imageWithAlt" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "shortName", title: "Short name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "careersEmail", title: "Careers email", type: "email" }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "hours", title: "Office hours", type: "string" }),
    defineField({ name: "hoursShort", title: "Short office hours", type: "string" }),
    defineField({ name: "mapsQuery", title: "Map search query", type: "string" }),
    defineField({ name: "socialLinks", title: "Social media links", type: "array", of: [{ type: "object", fields: [defineField({ name: "label", type: "string", title: "Label" }), defineField({ name: "url", type: "url", title: "URL" })] }] }),
    defineField({ name: "footerInformation", title: "Footer information", type: "text", rows: 4 }),
    defineField({ name: "globalSeo", title: "Global SEO defaults", type: "seo" }),
  ],
  preview: { select: { title: "firmName", media: "logo" } },
});
