import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl } from "@/lib/site";
import { getTurkishWorkArea, workAreas } from "@/lib/work-areas";

export function generateStaticParams() {
  return workAreas.map((area) => ({ slug: area.trSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getTurkishWorkArea(slug);

  if (!area) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/calisma-alanlari/${area.trSlug}`;
  const english = `${siteUrl}/en/areas-of-work/${area.enSlug}`;

  return {
    title: `${area.trTitle} | Hande Öner`,
    description: area.trShort,
    alternates: {
      canonical,
      languages: {
        "tr-TR": canonical,
        "en-GB": english,
      },
    },
    openGraph: {
      title: `${area.trTitle} | Hande Öner`,
      description: area.trShort,
      url: canonical,
      type: "article",
      locale: "tr_TR",
    },
  };
}

export default async function WorkAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getTurkishWorkArea(slug);

  if (!area) {
    notFound();
  }

  return (
    <main className="work-area-page">
      <header className="detail-navbar section-shell">
        <a className="brand" href="/" aria-label="Hande Öner ana sayfa">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Uzman Psikolog</span>
        </a>

        <a className="detail-back-link" href="/#alanlar">
          Çalışma alanlarına dön <span aria-hidden="true">↗</span>
        </a>
      </header>

      <article className="work-area-article section-shell">
        <div className="work-area-breadcrumb" aria-label="Sayfa yolu">
          <a href="/">Ana Sayfa</a>
          <span>/</span>
          <a href="/#alanlar">Çalışma Alanları</a>
          <span>/</span>
          <span>{area.trTitle}</span>
        </div>

        <div className="work-area-hero">
          <div className="work-area-index">ÇALIŞMA ALANI</div>

          <div className="work-area-heading">
            <h1>{area.trTitle}</h1>
            <p>{area.trIntro}</p>
          </div>
        </div>

        <div className="work-area-content">
          {area.trSections.map((section, index) => (
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
          <span>Bilgilendirme</span>
          <p>
            Bu sayfadaki içerik genel bilgilendirme amaçlıdır; tanı,
            değerlendirme veya kişiye özel psikolojik destek yerine geçmez.
          </p>
        </aside>

        <div className="work-area-cta">
          <div>
            <span>SEANS TALEBİ</span>
            <h2>Terapi süreci hakkında iletişime geçebilirsiniz.</h2>
          </div>
          <a className="primary-button" href="/#iletisim">
            İletişime Geç <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </main>
  );
}
