export type Language = "tr" | "en";
export type PostStatus = "draft" | "published";

export type ReferenceItem = {
  id: string;
  title: string;
  url: string;
  note?: string;
};

export type Category = {
  id: number;
  slug: string;
  language: Language;
  name: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  language: Language;
  title: string;
  excerpt: string;
  content: string;
  content_json: string | null;
  references_json: string;
  revision: number;
  category_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  featured_image: string | null;
  image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PostInput = {
  slug: string;
  language: Language;
  title: string;
  excerpt: string;
  contentJson: string;
  referencesJson: string;
  categoryId: number | null;
  featuredImage: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  status: PostStatus;
};
