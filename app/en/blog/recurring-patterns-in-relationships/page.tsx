import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recurring patterns in relationships",
  description: "An article on why similar conflicts may recur in close relationships and how relational patterns can be explored in psychotherapy.",
  alternates: {
    canonical: "/en/blog/recurring-patterns-in-relationships",
  },
  openGraph: {
    title: "Recurring patterns in relationships",
    description: "An article on why similar conflicts may recur in close relationships and how relational patterns can be explored in psychotherapy.",
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

        <p className="blog-article-kicker">Relationships</p>
        <h1 className="blog-article-title">Recurring patterns in relationships</h1>
        <p className="blog-article-intro">Even when relationships change, a person may find themselves facing similar conflicts, emotional distance or disappointments. These recurring experiences are not always limited to the relationship that is happening in the present.</p>

        <div className="blog-article-divider" aria-hidden="true" />

        <div className="blog-article-content">
          <h2>How do patterns develop?</h2>
          <p>Our expectations in relationships, the way we experience closeness and the strategies we use to protect ourselves can all be shaped by earlier experiences. Without fully realising it, a person may gravitate towards familiar relational dynamics or repeatedly rely on the same defensive responses.</p>

          <h2>What can therapy make space for?</h2>
          <p>Psychotherapy can offer a space to notice these repetitions without judgement and to understand how a person positions themselves within relationships. As awareness grows, it may become possible to develop more flexible ways of relating that are more consistent with the person's current needs.</p>

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