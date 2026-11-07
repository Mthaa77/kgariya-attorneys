import { defineQuery } from "next-sanity";

export const attorneysQuery = defineQuery(`*[_type == "attorney" && approvedForPublication == true] | order(displayOrder asc) {
  _id, fullName, professionalTitle, photograph, biography, welcomeQuote, experience, qualifications, admissions, practiceAreas, displayOrder
}`);

export const articlesQuery = defineQuery(`*[_type == "article" && publicationStatus == "published" && coalesce(visibility, "public") == "public" && !string::startsWith(slug.current, "qa-") && !(_id == "5f902b1b-e6b9-4aba-bd64-300cfa2decdc") && defined(publicationDate)] | order(publicationDate desc) {
  _id, title, "slug": slug.current, excerpt, mainImage, imageAlt, body, "author": author->{fullName}, category, tags, publicationDate, seo
}`);

export const articleBySlugQuery = defineQuery(`*[_type == "article" && publicationStatus == "published" && coalesce(visibility, "public") == "public" && !string::startsWith(slug.current, "qa-") && !(_id == "5f902b1b-e6b9-4aba-bd64-300cfa2decdc") && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, mainImage, imageAlt, body, "author": author->{fullName}, category, tags, publicationDate, seo
}`);

export const mattersQuery = defineQuery(`*[_type == "representativeMatter" && approvedForPublication == true] | order(_createdAt desc) {
  _id, title, "slug": slug.current, practiceArea, industry, anonymisedSummary, legalContext, approvedOutcome, featuredImage, featuredImageAlt
}`);


export const practicesQuery = defineQuery(`*[_type == "practiceArea" && isPublished == true && defined(slug.current)] | order(number asc) {
  _id, "slug": slug.current, number, name, shortName, menuLabel, tagline, intro, accent, accentSoft, iconKey,
  "imageUrl": image.asset->url,
  "overview": overview[].children[0].text,
  scope, delivery, clients, stat { value, suffix, label }
}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0] {
  firmName, shortName, tagline, phone, email, careersEmail, website, address, hours, hoursShort, mapsQuery,
  logo, socialLinks, footerInformation, globalSeo
}`);
