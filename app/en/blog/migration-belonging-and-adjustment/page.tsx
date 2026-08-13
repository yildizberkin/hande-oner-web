import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migration, belonging and adjusting to a new life",
  description: "An article exploring belonging, identity, loneliness and adjustment following migration.",
  alternates: {
    canonical: "/en/blog/migration-belonging-and-adjustment",
  },
  openGraph: {
    title: "Migration, belonging and adjusting to a new life",
    description: "An article exploring belonging, identity, loneliness and adjustment following migration.",
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

        <p className="blog-article-kicker">Migration & Adjustment</p>
        <h1 className="blog-article-title">Migration, belonging and adjusting to a new life</h1>
        <p className="blog-article-intro">Migration is more than a change of location. Language, social networks, everyday routines, a sense of belonging and even the way a person defines themselves may all change at the same time.</p>

        <div className="blog-article-divider" aria-hidden="true" />

        <div className="blog-article-content">
          <h2>Carrying several losses at once</h2>
          <p>Building a new life can be exciting while also bringing a sense of grief for relationships, routines and familiar surroundings that have been left behind. Experiencing both of these emotional realities at the same time does not have to be a contradiction.</p>

          <h2>Can belonging be rebuilt?</h2>
          <p>Developing a sense of belonging in a new place often takes time and rarely follows a completely linear path. Psychotherapy can provide a safe space to make sense of the relationship a person has with both what they have left behind and the new life they are building.</p>

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