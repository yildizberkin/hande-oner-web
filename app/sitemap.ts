import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/en`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/en/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog/kaygiyi-anlamak`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/iliskilerde-tekrar-eden-oruntuler`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/goc-aidiyet-ve-uyum`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/blog/understanding-anxiety`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/blog/recurring-patterns-in-relationships`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/blog/migration-belonging-and-adjustment`, changeFrequency: "monthly", priority: 0.7 },
  ];
}