import { defineQuery } from "next-sanity";

export const attorneysQuery = defineQuery(`*[_type == "attorney" && approvedForPublication == true] | order(displayOrder asc) {
  _id, fullName, professionalTitle, photograph, biography, qualifications, admissions, practiceAreas, displayOrder
}`);

export const articlesQuery = defineQuery(`*[_type == "article" && publicationStatus == "published" && visibility == "public" && defined(publicationDate)] | order(publicationDate desc) {
  _id, title, "slug": slug.current, excerpt, mainImage, imageAlt, body, "author": author->{fullName}, category, tags, publicationDate, seo
}`);

export const articleBySlugQuery = defineQuery(`*[_type == "article" && publicationStatus == "published" && visibility == "public" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, excerpt, mainImage, imageAlt, body, "author": author->{fullName}, category, tags, publicationDate, seo
}`);

export const mattersQuery = defineQuery(`*[_type == "representativeMatter" && approvedForPublication == true] | order(_createdAt desc) {
  _id, title, "slug": slug.current, practiceArea, industry, anonymisedSummary, legalContext, approvedOutcome, featuredImage, featuredImageAlt
}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0] {
  firmName, phone, email, address, logo, globalSeo
}`);
