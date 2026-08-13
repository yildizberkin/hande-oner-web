import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Hande Öner",
  description:
    "Uzman Psikolog Hande Öner'in psikoloji, psikoterapi, ilişkiler, kaygı, yas, göç ve gündelik yaşam üzerine yazıları.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Hande Öner",
    description:
      "Psikoloji, psikoterapi ve gündelik yaşama dair yazılar.",
    type: "website",
    locale: "tr_TR",
  },
};

const posts = [
  {
    slug: "kaygiyi-anlamak",
    title: "Kaygıyı anlamak: Ne zaman bir sinyale dönüşür?",
    category: "Kaygı",
    excerpt:
      "Kaygının günlük yaşam içindeki işlevini ve yoğunlaştığında düşünceler, beden ve ilişkiler üzerindeki etkilerini ele alan kısa bir yazı.",
  },
  {
    slug: "iliskilerde-tekrar-eden-oruntuler",
    title: "İlişkilerde tekrar eden örüntüler",
    category: "İlişkiler",
    excerpt:
      "Yakın ilişkilerde benzer çatışmaların neden tekrar edebildiğini ve bu örüntüleri fark etmenin terapi sürecindeki yerini ele alan bir yazı.",
  },
  {
    slug: "goc-aidiyet-ve-uyum",
    title: "Göç, aidiyet ve yeni bir yaşam düzenine uyum",
    category: "Göç & Uyum",
    excerpt:
      "Yeni bir ülkeye veya kültüre uyum sağlarken ortaya çıkabilen aidiyet, kimlik ve yalnızlık deneyimleri üzerine bir yazı.",
  },
];

export default function BlogPage() {
  return (
    <>
      <header className="navbar navbar-scrolled blog-navbar">
        <a className="brand" href="/" aria-label="Hande Öner ana sayfa">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Uzman Psikolog</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          <a href="/#hakkimda">Hakkımda</a>
          <a href="/#alanlar">Çalışma Alanlarım</a>
          <a href="/blog" aria-current="page">
            Blog
          </a>
          <a href="/#sss">SSS</a>
          <a href="/#iletisim">İletişim</a>
        </nav>

        <div className="navbar-actions">
          <a className="nav-cta" href="/#iletisim">
            Seans Talebi
            <span aria-hidden="true">↗</span>
          </a>

          <div className="language-switcher" aria-label="Dil seçimi">
            <a
              className="language-option language-option-active"
              href="/blog"
              lang="tr"
              aria-current="page"
              aria-label="Türkçe"
            >
              <svg
                className="language-flag-svg"
                viewBox="0 0 60 40"
                aria-hidden="true"
                focusable="false"
              >
                <rect width="60" height="40" rx="2" fill="#E30A17" />
                <circle cx="24" cy="20" r="10" fill="#FFFFFF" />
                <circle cx="28" cy="20" r="8" fill="#E30A17" />
                <polygon
                  points="37,15.6 38.4,18.3 41.4,18.7 39.2,20.8 39.8,23.8 37,22.4 34.2,23.8 34.8,20.8 32.6,18.7 35.6,18.3"
                  fill="#FFFFFF"
                />
              </svg>
              <span>TR</span>
            </a>

            <span className="language-divider" aria-hidden="true">
              |
            </span>

            <a
              className="language-option"
              href="/en/blog"
              lang="en"
              aria-label="English"
            >
              <svg
                className="language-flag-svg"
                viewBox="0 0 60 40"
                aria-hidden="true"
                focusable="false"
              >
                <rect width="60" height="40" rx="2" fill="#012169" />
                <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="8" />
                <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
                <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="12" />
                <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="7" />
              </svg>
              <span>EN</span>
            </a>
          </div>
        </div>
      </header>

      <main className="blog-page">
      <div className="section-shell">
        <a className="blog-back" href="/">
          <span aria-hidden="true">←</span>
          Ana sayfaya dön
        </a>

        <header className="blog-hero blog-hero-with-profile">
          <span className="section-index">BLOG</span>

          <div className="blog-hero-copy">
            <p className="section-label">YAZILAR</p>

            <h1>
              Psikoloji ve gündelik yaşam
              <br />
              <span>üzerine notlar.</span>
            </h1>

            <p className="blog-lead">
              Psikoloji, ilişkiler, duygusal süreçler ve psikoterapiye dair
              bilgilendirici yazılar. Bu içerikler psikoterapi veya bireysel
              değerlendirme yerine geçmez.
            </p>
          </div>

          <aside className="blog-profile" aria-label="Yazar bilgisi">
            <div className="blog-profile-photo">
              <Image
                src="/images/hande-oner-blog-profile.webp"
                alt="Uzman Psikolog Hande Öner"
                fill
                sizes="118px"
                className="blog-profile-image"
              />
            </div>
            <strong>Hande Öner</strong>
            <span>Uzman Psikolog</span>
          </aside>
        </header>

        <section className="blog-glass-grid" aria-label="Blog yazıları">
          {posts.map((post, index) => (
            <a
              className="blog-glass-card"
              href={`/blog/${post.slug}`}
              key={post.slug}
              aria-label={`${post.title} yazısını oku`}
            >
              <div className="blog-glass-card-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{post.category}</span>
              </div>

              <div className="blog-glass-card-copy">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>

              <div className="blog-glass-card-footer">
                <span>Yazıyı oku</span>
                <span aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </section>
      </div>
    </main>
    </>
  );
}