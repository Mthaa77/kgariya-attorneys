import { defineLive } from "next-sanity/live";
import { sanityClient } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  browserToken: false,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});
