import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding anxiety: When does it become a signal?",
  description: "An introduction to the role of anxiety, its impact on everyday life and how it may be explored in psychotherapy.",
  alternates: {
    canonical: "/en/blog/understanding-anxiety",
  },
  openGraph: {
    title: "Understanding anxiety: When does it become a signal?",
    description: "An introduction to the role of anxiety, its impact on everyday life and how it may be explored in psychotherapy.",
    type: "article",
    locale: "en_GB",
  },
};

export default function BlogArticlePage() {
  return (
    <main className="blog-article-page">
      <article className="blog-article-shell">
        <a className="blog-back" href="/en/blog">
          <span aria-hidden="true">←</span>
          Back to blog
        </a>

        <p className="blog-article-kicker">Anxiety</p>
        <h1 className="blog-article-title">Understanding anxiety: When does it become a signal?</h1>
        <p className="blog-article-intro">Anxiety is a natural emotion that can arise in response to danger or uncertainty. When it becomes more intense, however, it may begin to affect daily life, relationships and the way a person relates to themselves.</p>

        <div className="blog-article-divider" aria-hidden="true" />

        <div className="blog-article-content">
          <h2>The function of anxiety</h2>
          <p>Anxiety is not always something that needs to be eliminated. At times it can help us notice possible risks, prepare ourselves or recognise our limits. When it becomes overwhelming, thoughts may become increasingly focused on potential threats while the body remains in a heightened state of alert.</p>

          <h2>When might support be helpful?</h2>
          <p>If anxiety is significantly affecting sleep, daily functioning, relationships or decision-making, it may be useful to explore the experience more closely. Psychotherapy can look not only at symptoms, but also at the meaning of anxiety in a person's life and the patterns that may be maintaining it.</p>

          <div className="blog-article-note">
            This article is provided for general information only and does not
            replace psychological assessment, diagnosis or individual
            psychotherapy.
          </div>

          <div className="blog-article-author">
            <div className="blog-article-author-avatar" aria-hidden="true" />
            <div className="blog-article-author-copy">
              <strong>Hande Öner</strong>
              <span>Psychologist</span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}