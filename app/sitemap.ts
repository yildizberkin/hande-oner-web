import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getDb } from "@/lib/db";
import { workAreas } from "@/lib/work-areas";

type SitemapPost = {
  slug: string;
  language: "tr" | "en";
  updated_at: string;
};

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/en`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/en/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const workAreaRoutes: MetadataRoute.Sitemap = workAreas.flatMap((area) => {
    const trUrl = `${baseUrl}/calisma-alanlari/${area.trSlug}`;
    const enUrl = `${baseUrl}/en/areas-of-work/${area.enSlug}`;

    return [
      {
        url: trUrl,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: { "tr-TR": trUrl, "en-GB": enUrl } },
      },
      {
        url: enUrl,
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: { "tr-TR": trUrl, "en-GB": enUrl } },
      },
    ];
  });

  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const result = await getDb()
      .prepare(
        "SELECT slug, language, updated_at FROM posts WHERE status = 'published' ORDER BY updated_at DESC",
      )
      .all<SitemapPost>();

    postRoutes = result.results.map((post) => ({
      url:
        post.language === "tr"
          ? `${baseUrl}/blog/${post.slug}`
          : `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // During first setup, sitemap should still render before the D1 migration runs.
  }

  return [...staticRoutes, ...workAreaRoutes, ...postRoutes];
}
