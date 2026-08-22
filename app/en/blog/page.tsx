import Image from "next/image";
import { listCategories, listPublishedPosts } from "@/lib/blog-db";
import BlogNavbar from "@/app/components/BlogNavbar";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";
  const page = Math.max(Number(params.page ?? 1) || 1, 1);

  const [{ posts, total, pageSize }, categories] = await Promise.all([
    listPublishedPosts({ language: "en", search: q, category, page }),
    listCategories("en"),
  ]);

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return (
    <main className="cms-blog-page" lang="en">
      <BlogNavbar language="en" />

      <section className="cms-blog-hero cms-blog-hero-profiled section-shell">
        <div className="cms-blog-hero-copy">
          <span className="section-label">BLOG</span>
          <h1>Thinking, understanding<br /><span>and seeing differently.</span></h1>
          <p>Informative writing on psychology, relationships and the therapy process.</p>
        </div>

        <aside className="cms-blog-profile" aria-label="Hande Öner">
          <div className="cms-blog-profile-photo">
            <Image
              src="/images/hande-oner-blog-profile.webp"
              alt="Hande Öner"
              fill
              sizes="118px"
              className="cms-blog-profile-image"
              priority
            />
          </div>
          <strong>Hande Öner</strong>
          <span>PSYCHOLOGIST</span>
        </aside>
      </section>

      <section className="cms-blog-tools section-shell">
        <form>
          <input name="q" defaultValue={q} placeholder="Search articles..." />
          {category && <input type="hidden" name="category" value={category} />}
          <button>Search</button>
        </form>

        <div className="cms-blog-categories">
          <a className={!category ? "is-active" : ""} href="/en/blog">All</a>
          {categories.map((item) => (
            <a
              key={item.id}
              className={category === item.slug ? "is-active" : ""}
              href={`/en/blog?category=${item.slug}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </section>

      <section className="cms-blog-grid section-shell">
        {posts.length === 0 ? (
          <div className="cms-blog-empty">No published articles match this filter.</div>
        ) : (
          posts.map((post) => (
            <article className="cms-blog-card" key={post.id}>
              <div className="cms-blog-card-meta">
                <span>{post.category_name ?? "Blog"}</span>
                <span>{post.published_at ? new Date(post.published_at).toLocaleDateString("en-GB") : ""}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href={`/en/blog/${post.slug}`}>Read Article <span>↗</span></a>
            </article>
          ))
        )}
      </section>

      {totalPages > 1 && (
        <nav className="cms-blog-pagination section-shell" aria-label="Pagination">
          {page > 1 && (
            <a href={`/en/blog?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>
              ← Previous
            </a>
          )}
          <span>{page} / {totalPages}</span>
          {page < totalPages && (
            <a href={`/en/blog?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>
              Next →
            </a>
          )}
        </nav>
      )}
    </main>
  );
}
