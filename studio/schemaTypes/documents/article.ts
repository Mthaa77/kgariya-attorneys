import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Insights & Articles",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Article title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (Rule) => Rule.required().max(260) }),
    defineField({ name: "mainImage", title: "Main image", type: "imageWithAlt" }),
    defineField({ name: "body", title: "Article body", type: "array", of: [{ type: "block" }] , validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "attorney" }] }),
    defineField({ name: "category", title: "Category", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "categorySlug", title: "Category slug", type: "string" }),
    defineField({ name: "readTime", title: "Reading time", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "publicationDate", title: "Publication date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "seo", title: "Search and social metadata", type: "seo" }),
    defineField({ name: "publicationStatus", title: "Publication status", type: "string", options: { list: [{ title: "Draft", value: "draft" }, { title: "Published", value: "published" }], layout: "radio" }, initialValue: "draft", validation: (Rule) => Rule.required() }),
    defineField({ name: "visibility", title: "Public visibility", description: "Only Public articles appear on the website. Use Internal for QA, editorial or private documents.", type: "string", options: { list: [{ title: "Public", value: "public" }, { title: "Internal", value: "internal" }], layout: "radio" }, initialValue: "public", validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "mainImage" } },
});
