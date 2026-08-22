import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedPost } from "@/lib/blog-db";
import { renderRichContent } from "@/lib/rich-content";
import { getSiteUrl } from "@/lib/site";
import type { ReferenceItem } from "@/lib/cms-types";
import BlogNavbar from "@/app/components/BlogNavbar";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost("en", slug);
  if (!post) return {};

  const url = `${getSiteUrl()}/en/blog/${post.slug}`;

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: "article",
      url,
      locale: "en_GB",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost("en", slug);
  if (!post) notFound();

  let references: ReferenceItem[] = [];
  try {
    references = JSON.parse(post.references_json || "[]");
  } catch {}

  return (
    <main className="cms-article-page" lang="en">
      <BlogNavbar language="en" />

      <article className="cms-article section-shell">
        <div className="cms-article-meta">
          <span>{post.category_name ?? "Blog"}</span>
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-GB")
              : ""}
          </span>
        </div>

        <h1>{post.title}</h1>
        <p className="cms-article-lead">{post.excerpt}</p>

        <div
          className="cms-article-content tiptap-public-content"
          dangerouslySetInnerHTML={{ __html: renderRichContent(post.content_json) }}
        />

        {references.length > 0 && (
          <section className="article-references">
            <span>REFERENCES</span>
            <h2>References</h2>
            <ol>
              {references.map((reference) => (
                <li key={reference.id}>
                  {reference.url ? (
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reference.title || reference.url}
                    </a>
                  ) : (
                    <strong>{reference.title}</strong>
                  )}
                  {reference.note && <p>{reference.note}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        <aside className="cms-article-disclaimer">
          This article is for general informational purposes and does not replace
          assessment, diagnosis or psychotherapy.
        </aside>

        <div className="cms-article-author">
          <div className="cms-article-author-photo">
            <Image
              src="/images/hande-oner-blog-profile.webp"
              alt="Hande Öner"
              fill
              sizes="52px"
              className="cms-article-author-image"
            />
          </div>

          <div className="cms-article-author-copy">
            <strong>Hande Öner</strong>
            <span>PSYCHOLOGIST</span>
          </div>
        </div>
      </article>
    </main>
  );
}
