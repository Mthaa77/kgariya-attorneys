export type SanityAttorney = {
  _id: string;
  fullName: string;
  professionalTitle?: string;
  photograph?: unknown;
  biography?: string;
  qualifications?: string[];
  admissions?: string[];
  practiceAreas?: string[];
  displayOrder?: number;
};

export type SanityArticle = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: unknown;
  imageAlt?: string;
  body?: unknown[];
  author?: { fullName?: string };
  category?: string;
  tags?: string[];
  publicationDate?: string;
  seo?: { title?: string; description?: string; socialImage?: unknown };
};

export type SanityMatter = {
  _id: string;
  title: string;
  slug?: string;
  practiceArea?: string;
  industry?: string;
  anonymisedSummary?: string;
  legalContext?: string;
  approvedOutcome?: string;
  featuredImage?: unknown;
  featuredImageAlt?: string;
};
