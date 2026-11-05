import { createClient } from "next-sanity";

const projectId = process.env.SANITY_API_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "mycnw8ft";
const dataset = process.env.SANITY_API_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
  stega: false,
});

export const sanityConfig = { projectId, dataset };
