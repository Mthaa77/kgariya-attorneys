import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/client";
import {
  articleBySlugQuery, articlesQuery, attorneysQuery, mattersQuery, practicesQuery, siteSettingsQuery,
  homePageQuery, aboutPageQuery, groupPageQuery, careersPageQuery, joiningPageQuery,
  sectorsQuery, testimonialsQuery, jobPostingsQuery, tickerItemsQuery, regulatoryDisclosuresQuery,
  courtForumsQuery, statutesQuery, professionalCredentialsQuery, legalDocumentsQuery,
} from "@/sanity/lib/queries";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const slug = url.searchParams.get("slug");
  if (type === "article" && (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  try {
    if (type === "attorneys") return NextResponse.json(await sanityClient.fetch(attorneysQuery));
    if (type === "articles") return NextResponse.json(await sanityClient.fetch(articlesQuery));
    if (type === "article") {
      const slug = url.searchParams.get("slug");
      if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
      return NextResponse.json(await sanityClient.fetch(articleBySlugQuery, { slug }));
    }
    if (type === "matters") return NextResponse.json(await sanityClient.fetch(mattersQuery));
    if (type === "practices") return NextResponse.json(await sanityClient.fetch(practicesQuery));
    if (type === "siteSettings") return NextResponse.json(await sanityClient.fetch(siteSettingsQuery));
    if (type === "homePage") return NextResponse.json(await sanityClient.fetch(homePageQuery));
    if (type === "aboutPage") return NextResponse.json(await sanityClient.fetch(aboutPageQuery));
    if (type === "groupPage") return NextResponse.json(await sanityClient.fetch(groupPageQuery));
    if (type === "careersPage") return NextResponse.json(await sanityClient.fetch(careersPageQuery));
    if (type === "joiningPage") return NextResponse.json(await sanityClient.fetch(joiningPageQuery));
    if (type === "sectors") return NextResponse.json(await sanityClient.fetch(sectorsQuery));
    if (type === "testimonials") return NextResponse.json(await sanityClient.fetch(testimonialsQuery));
    if (type === "jobPostings") return NextResponse.json(await sanityClient.fetch(jobPostingsQuery));
    if (type === "tickerItems") return NextResponse.json(await sanityClient.fetch(tickerItemsQuery));
    if (type === "regulatoryDisclosures") return NextResponse.json(await sanityClient.fetch(regulatoryDisclosuresQuery));
    if (type === "courtForums") return NextResponse.json(await sanityClient.fetch(courtForumsQuery));
    if (type === "statutes") return NextResponse.json(await sanityClient.fetch(statutesQuery));
    if (type === "professionalCredentials") return NextResponse.json(await sanityClient.fetch(professionalCredentialsQuery));
    if (type === "legalDocuments") return NextResponse.json(await sanityClient.fetch(legalDocumentsQuery));
    return NextResponse.json({ error: "Unknown content type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "CMS content unavailable" }, { status: 503 });
  }
}
