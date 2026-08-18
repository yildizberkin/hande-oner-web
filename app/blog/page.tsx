import { listCategories, listPublishedPosts } from "@/lib/blog-db";

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
    listPublishedPosts({ language: "tr", search: q, category, page }),
    listCategories("tr"),
  ]);

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return (
    <main className="cms-blog-page">
      <header className="cms-blog-navbar section-shell">
        <a className="brand" href="/">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Uzman Psikolog</span>
        </a>
        <a href="/">Ana Sayfa ↗</a>
      </header>

      <section className="cms-blog-hero section-shell">
        <span className="section-label">BLOG</span>
        <h1>Düşünmek, anlamak<br /><span>ve farklı bir yerden bakmak.</span></h1>
        <p>Psikoloji, ilişkiler ve terapi sürecine dair bilgilendirici yazılar.</p>
      </section>

      <section className="cms-blog-tools section-shell">
        <form>
          <input name="q" defaultValue={q} placeholder="Yazılarda ara..." />
          {category && <input type="hidden" name="category" value={category} />}
          <button>Ara</button>
        </form>

        <div className="cms-blog-categories">
          <a className={!category ? "is-active" : ""} href="/blog">Tümü</a>
          {categories.map((item) => (
            <a
              key={item.id}
              className={category === item.slug ? "is-active" : ""}
              href={`/blog?category=${item.slug}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </section>

      <section className="cms-blog-grid section-shell">
        {posts.length === 0 ? (
          <div className="cms-blog-empty">Bu filtreye uygun yayımlanmış yazı bulunamadı.</div>
        ) : (
          posts.map((post) => (
            <article className="cms-blog-card" key={post.id}>
              <div className="cms-blog-card-meta">
                <span>{post.category_name ?? "Blog"}</span>
                <span>{post.published_at ? new Date(post.published_at).toLocaleDateString("tr-TR") : ""}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href={`/blog/${post.slug}`}>Yazıyı Oku <span>↗</span></a>
            </article>
          ))
        )}
      </section>

      {totalPages > 1 && (
        <nav className="cms-blog-pagination section-shell" aria-label="Sayfalama">
          {page > 1 && (
            <a href={`/blog?page=${page - 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>
              ← Önceki
            </a>
          )}
          <span>{page} / {totalPages}</span>
          {page < totalPages && (
            <a href={`/blog?page=${page + 1}${q ? `&q=${encodeURIComponent(q)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>
              Sonraki →
            </a>
          )}
        </nav>
      )}
    </main>
  );
}
