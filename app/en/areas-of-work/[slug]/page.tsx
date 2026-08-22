import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site";
import { getEnglishWorkArea, workAreas } from "@/lib/work-areas";

export function generateStaticParams() {
  return workAreas.map((area) => ({ slug: area.enSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getEnglishWorkArea(slug);

  if (!area) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/en/areas-of-work/${area.enSlug}`;
  const turkish = `${siteUrl}/calisma-alanlari/${area.trSlug}`;

  return {
    title: `${area.enTitle} | Hande Öner`,
    description: area.enShort,
    alternates: {
      canonical,
      languages: {
        "tr-TR": turkish,
        "en-GB": canonical,
      },
    },
    openGraph: {
      title: `${area.enTitle} | Hande Öner`,
      description: area.enShort,
      url: canonical,
      type: "article",
      locale: "en_GB",
    },
  };
}

export default async function WorkAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getEnglishWorkArea(slug);

  if (!area) {
    notFound();
  }

  return (
    <main className="work-area-page" lang="en">
      <header className="detail-navbar section-shell">
        <a className="brand" href="/en" aria-label="Hande Öner home">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Psychologist</span>
        </a>

        <a className="detail-back-link" href="/en#areas">
          Back to areas of work <span aria-hidden="true">↗</span>
        </a>
      </header>

      <article className="work-area-article section-shell">
        <div className="work-area-breadcrumb" aria-label="Breadcrumb">
          <a href="/en">Home</a>
          <span>/</span>
          <a href="/en#areas">Areas of Work</a>
          <span>/</span>
          <span>{area.enTitle}</span>
        </div>

        <div className="work-area-hero">
          <div className="work-area-index">AREA OF WORK</div>

          <div className="work-area-heading">
            <h1>{area.enTitle}</h1>
            <p>{area.enIntro}</p>
          </div>
        </div>

        <div className="work-area-content">
          {area.enSections.map((section, index) => (
            <section className="work-area-content-card" key={section.heading}>
              <span className="work-area-section-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </div>

        <aside className="work-area-note">
          <span>Information</span>
          <p>
            The information on this page is for general informational purposes
            and does not replace assessment, diagnosis or individual
            psychological support.
          </p>
        </aside>

        <div className="work-area-cta">
          <div>
            <span>SESSION REQUEST</span>
            <h2>You can get in touch to ask about the therapy process.</h2>
          </div>
          <a className="primary-button" href="/en#contact">
            Get in Touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </main>
  );
}
