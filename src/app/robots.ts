import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.kgariyainc.co.za";
  return {
    rules: { userAgent: "*", allow: ["/", "/insights/"], disallow: ["/api/", "/studio/", "/_next/"] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
