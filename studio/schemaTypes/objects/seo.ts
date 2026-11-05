import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO defaults",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "description", title: "SEO description", type: "text", rows: 3, validation: (Rule) => Rule.max(160) }),
    defineField({ name: "socialImage", title: "Social sharing image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alternative text", validation: (Rule) => Rule.required() }] }),
  ],
});
