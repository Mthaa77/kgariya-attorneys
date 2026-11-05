import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "./client";

const builder = imageUrlBuilder(sanityConfig);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
