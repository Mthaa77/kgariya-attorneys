import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with alternative text",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (Rule) => Rule.required().min(3) })],
});
