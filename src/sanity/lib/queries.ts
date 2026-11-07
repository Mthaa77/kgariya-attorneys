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


export const homePageQuery = defineQuery(`*[_type == "homePage" && isPublished == true][0] {
  title,
  heroSlides[] {
    eyebrow, title, titleAccent, text, primaryLabel, primaryAction, secondaryLabel, secondaryRoute,
    "imageUrl": image.asset->url, "imageAlt": image.alt
  },
  trustPillars, faqs
}`);

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage" && isPublished == true][0] {
  heroTitle, heroLead, title, intro, body, timeline[] { era, title, text }
}`);

export const groupPageQuery = defineQuery(`*[_type == "groupPage" && isPublished == true][0] {
  heroTitle, heroLead, "heroImageUrl": heroImage.asset->url, title, intro, entities[] { iconKey, name, text }
}`);

export const careersPageQuery = defineQuery(`*[_type == "careersPage" && isPublished == true][0] {
  heroTitle, "heroImageUrl": heroImage.asset->url, intro, openPositionsIntro, values[] { iconKey, title, text, displayOrder }
}`);

export const joiningPageQuery = defineQuery(`*[_type == "joiningPage" && isPublished == true][0] {
  hero { title, text, "imageUrl": image.asset->url },
  features[] { iconKey, title, text },
  phases[] { phase, name, time, points }
}`);

export const sectorsQuery = defineQuery(`*[_type == "sector" && isPublished == true] | order(displayOrder asc) {
  _id, name, iconKey, tagline, clientNeed, firmResponse,
  "relatedPractices": relatedPractices[]->{ "slug": slug.current, name },
  "featuredMatter": featuredMatter->{ title, "slug": slug.current }
}`);

export const testimonialsQuery = defineQuery(`*[_type == "testimonial" && isPublished == true] | order(displayOrder asc) {
  _id, quote, attribution, organisationDescriptor,
  "practiceArea": practiceArea->{ name, "slug": slug.current }
}`);

export const jobPostingsQuery = defineQuery(`*[_type == "jobPosting" && isOpen == true] | order(displayOrder asc) {
  _id, title, employmentType, location, statusText, summary, requirementsOrTags, applicationEmail
}`);

export const tickerItemsQuery = defineQuery(`*[_type == "tickerItem" && active == true] | order(displayOrder asc) {
  _id, kind, title, value, direction
}`);

export const regulatoryDisclosuresQuery = defineQuery(`*[_type == "regulatoryDisclosure"] | order(displayOrder asc) {
  _id, iconKey, label, sub, detail
}`);

export const courtForumsQuery = defineQuery(`*[_type == "courtForum"] | order(displayOrder asc) {
  _id, name, note
}`);

export const statutesQuery = defineQuery(`*[_type == "statute"] | order(displayOrder asc) {
  _id, shortName, citation
}`);

export const professionalCredentialsQuery = defineQuery(`*[_type == "professionalCredential"] | order(displayOrder asc) {
  _id, iconKey, label, sub
}`);

export const legalDocumentsQuery = defineQuery(`*[_type == "legalDocument" && published == true] | order(displayOrder asc) {
  _id, documentType, "slug": slug.current, title, intro, sections[] { heading, body, listItems },
  effectiveDate, lastReviewedDate, version
}`);
