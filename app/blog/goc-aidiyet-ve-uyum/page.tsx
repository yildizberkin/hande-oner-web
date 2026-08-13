import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Göç, aidiyet ve yeni bir yaşam düzenine uyum | Hande Öner",
  description:
    "Göç sonrası aidiyet, kimlik, yalnızlık ve uyum deneyimlerini ele alan bilgilendirici bir psikoloji yazısı.",
  alternates: {
    canonical: "/blog/goc-aidiyet-ve-uyum",
  },
  openGraph: {
    title: "Göç, aidiyet ve yeni bir yaşam düzenine uyum",
    description:
      "Göç sonrası aidiyet, kimlik, yalnızlık ve uyum deneyimlerini ele alan bilgilendirici bir psikoloji yazısı.",
    type: "article",
    locale: "tr_TR",
  },
};

export default function BlogArticlePage() {
  return (
    <main className="blog-article-page">
      <article className="blog-article-shell">
        <a className="blog-back" href="/blog">
          <span aria-hidden="true">←</span>
          Blog'a dön
        </a>

        <p className="blog-article-kicker">Göç & Uyum</p>

        <h1 className="blog-article-title">Göç, aidiyet ve yeni bir yaşam düzenine uyum</h1>

        <p className="blog-article-intro">
          Göç yalnızca bir yer değişikliği değildir. Dil, sosyal çevre, gündelik rutinler, aidiyet hissi ve kişinin kendisini tanımlama biçimi aynı anda değişebilir.
        </p>

        <div className="blog-article-divider" aria-hidden="true" />

        <div className="blog-article-content">
          <h2>Birden fazla kaybı aynı anda taşımak</h2>
          <p>
            Yeni bir yaşam kurmak heyecan verici olabilse de geride bırakılan ilişkiler, alışkanlıklar ve tanıdık çevre için bir yas süreci de yaşanabilir. Bu iki duygunun aynı anda bulunması bir çelişki olmak zorunda değildir.
          </p>

          <h2>Aidiyet yeniden kurulabilir mi?</h2>
          <p>
            Yeni bir yerde aidiyet geliştirmek çoğu zaman zaman alan ve doğrusal ilerlemeyen bir süreçtir. Psikoterapi, kişinin hem geride bıraktıklarıyla hem de yeni yaşamıyla kurduğu ilişkiyi anlamlandırabileceği güvenli bir alan sağlayabilir.
          </p>

          <div className="blog-article-note">
            Bu yazı genel bilgilendirme amacı taşır; psikolojik değerlendirme,
            tanı veya bireysel psikoterapi yerine geçmez.
          </div>

          <div className="blog-article-author">
            <div className="blog-article-author-avatar" aria-hidden="true" />
            <div className="blog-article-author-copy">
              <strong>Hande Öner</strong>
              <span>Uzman Psikolog</span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}