import { defineField, defineType } from "sanity";

export const attorney = defineType({
  name: "attorney",
  title: "Our People",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "professionalTitle", title: "Professional title and position", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "photograph", title: "Profile photograph", type: "imageWithAlt", validation: (Rule) => Rule.required() }),
    defineField({ name: "biography", title: "Biography", type: "text", rows: 6, validation: (Rule) => Rule.required().min(50) }),
    defineField({ name: "qualifications", title: "Qualifications", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "admissions", title: "Professional admissions and memberships", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "practiceAreas", title: "Practice-area associations", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 10, validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "approvedForPublication", title: "Approved for publication", type: "boolean", initialValue: false, description: "Only approved profiles appear on the public website." }),
  ],
  preview: { select: { title: "fullName", subtitle: "professionalTitle", media: "photograph" } },
});
