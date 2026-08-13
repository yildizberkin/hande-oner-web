import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles by Psychologist Hande Öner on psychology, psychotherapy, relationships, anxiety, grief, migration and everyday life.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      "tr-TR": "/blog",
      "en-GB": "/en/blog",
    },
  },
  openGraph: {
    title: "Blog | Hande Öner",
    description: "Articles on psychology, psychotherapy and everyday life.",
    type: "website",
    locale: "en_GB",
  },
};

const posts = [
  {
    slug: "understanding-anxiety",
    title: "Understanding anxiety: When does it become a signal?",
    category: "Anxiety",
    excerpt:
      "A short introduction to the role of anxiety and how it can affect thoughts, the body and relationships when it becomes more intense.",
  },
  {
    slug: "recurring-patterns-in-relationships",
    title: "Recurring patterns in relationships",
    category: "Relationships",
    excerpt:
      "An exploration of why similar conflicts can reappear in close relationships and how recognising these patterns may become part of therapy.",
  },
  {
    slug: "migration-belonging-and-adjustment",
    title: "Migration, belonging and adjusting to a new life",
    category: "Migration & Adjustment",
    excerpt:
      "A reflection on belonging, identity and loneliness while adapting to a new country, culture or way of life.",
  },
];

export default function BlogPage() {
  return (
    <>
      <header className="navbar navbar-scrolled blog-navbar">
        <a className="brand" href="/en" aria-label="Hande Öner home">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Psychologist</span>
        </a>

        <nav className="nav-links" aria-label="Main menu">
          <a href="/en#about">About</a>
          <a href="/en#areas">Areas of Work</a>
          <a href="/en/blog" aria-current="page">Blog</a>
          <a href="/en#faq">FAQ</a>
          <a href="/en#contact">Contact</a>
        </nav>

        <div className="navbar-actions">
          <a className="nav-cta" href="/en#contact">
            Request a Session
            <span aria-hidden="true">↗</span>
          </a>

          <div className="language-switcher" aria-label="Language selection">
            <a className="language-option" href="/blog" lang="tr" aria-label="Turkish">
              <svg className="language-flag-svg" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
                <rect width="60" height="40" rx="2" fill="#E30A17" />
                <circle cx="24" cy="20" r="10" fill="#FFFFFF" />
                <circle cx="28" cy="20" r="8" fill="#E30A17" />
                <polygon points="37,15.6 38.4,18.3 41.4,18.7 39.2,20.8 39.8,23.8 37,22.4 34.2,23.8 34.8,20.8 32.6,18.7 35.6,18.3" fill="#FFFFFF" />
              </svg>
              <span>TR</span>
            </a>

            <span className="language-divider" aria-hidden="true">|</span>

            <a className="language-option language-option-active" href="/en/blog" lang="en" aria-current="page" aria-label="English">
              <svg className="language-flag-svg" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
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
          <a className="blog-back" href="/en">
            <span aria-hidden="true">←</span>
            Back to home
          </a>

          <header className="blog-hero blog-hero-with-profile">
            <span className="section-index">BLOG</span>

            <div className="blog-hero-copy">
              <p className="section-label">ARTICLES</p>
              <h1>
                Notes on psychology
                <br />
                <span>and everyday life.</span>
              </h1>
              <p className="blog-lead">
                Informative articles on psychology, relationships, emotional
                processes and psychotherapy. These articles do not replace
                psychotherapy or an individual psychological assessment.
              </p>
            </div>

            <aside className="blog-profile" aria-label="Author information">
              <div className="blog-profile-photo">
                <Image
                  src="/images/hande-oner-blog-profile.webp"
                  alt="Psychologist Hande Öner"
                  fill
                  sizes="118px"
                  className="blog-profile-image"
                />
              </div>
              <strong>Hande Öner</strong>
              <span>Psychologist</span>
            </aside>
          </header>

          <section className="blog-glass-grid" aria-label="Blog articles">
            {posts.map((post, index) => (
              <a
                className="blog-glass-card"
                href={`/en/blog/${post.slug}`}
                key={post.slug}
                aria-label={`Read ${post.title}`}
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
                  <span>Read article</span>
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