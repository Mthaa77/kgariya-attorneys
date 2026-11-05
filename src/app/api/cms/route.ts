import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/client";
import { articleBySlugQuery, articlesQuery, attorneysQuery, mattersQuery } from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  try {
    if (type === "attorneys") return NextResponse.json(await sanityClient.fetch(attorneysQuery));
    if (type === "articles") return NextResponse.json(await sanityClient.fetch(articlesQuery));
    if (type === "article") {
      const slug = url.searchParams.get("slug");
      if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
      return NextResponse.json(await sanityClient.fetch(articleBySlugQuery, { slug }));
    }
    if (type === "matters") return NextResponse.json(await sanityClient.fetch(mattersQuery));
    return NextResponse.json({ error: "Unknown content type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "CMS content unavailable" }, { status: 503 });
  }
}
