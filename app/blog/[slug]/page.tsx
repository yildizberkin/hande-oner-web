import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedPost } from "@/lib/blog-db";
import { renderRichContent } from "@/lib/rich-content";
import { getSiteUrl } from "@/lib/site";
import type { ReferenceItem } from "@/lib/cms-types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost("tr", slug);
  if (!post) return {};

  const url = `${getSiteUrl()}/blog/${post.slug}`;

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: "article",
      url,
      locale: "tr_TR",
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
  const post = await getPublishedPost("tr", slug);
  if (!post) notFound();

  let references: ReferenceItem[] = [];
  try {
    references = JSON.parse(post.references_json || "[]");
  } catch {}

  return (
    <main className="cms-article-page">
      <header className="cms-blog-navbar section-shell">
        <a className="brand" href="/">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Uzman Psikolog</span>
        </a>

        <nav className="cms-blog-nav-links" aria-label="Blog navigasyonu">
          <a href="/#hakkimda">Hakkımda</a>
          <a href="/#alanlar">Çalışma Alanlarım</a>
          <a className="is-active" href="/blog">Blog</a>
          <a href="/#sss">SSS</a>
          <a href="/#iletisim">İletişim</a>
        </nav>

        <div className="cms-blog-nav-actions">
          <div className="cms-blog-language">
            <a className="is-active" href="/blog" lang="tr">TR</a>
            <span>/</span>
            <a href="/en/blog" lang="en">EN</a>
          </div>

          <a className="cms-blog-nav-cta" href="/#iletisim">
            Seans Talebi <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <article className="cms-article section-shell">
        <div className="cms-article-meta">
          <span>{post.category_name ?? "Blog"}</span>
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString("tr-TR")
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
            <span>KAYNAKLAR</span>
            <h2>Kaynaklar ve Referanslar</h2>
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
          Bu yazı genel bilgilendirme amaçlıdır; tanı, değerlendirme veya
          psikoterapi yerine geçmez.
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
            <span>UZMAN PSİKOLOG</span>
          </div>
        </div>
      </article>
    </main>
  );
}
