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
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "globalSeo", title: "Global SEO defaults", type: "seo" }),
  ],
  preview: { select: { title: "firmName", media: "logo" } },
});
