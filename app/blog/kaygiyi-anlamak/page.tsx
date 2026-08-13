import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaygıyı anlamak: Ne zaman bir sinyale dönüşür? | Hande Öner",
  description:
    "Kaygının işlevini, yoğunlaştığında gündelik yaşam üzerindeki etkilerini ve terapi sürecinde nasıl ele alınabileceğini anlatan bilgilendirici bir yazı.",
  alternates: {
    canonical: "/blog/kaygiyi-anlamak",
  },
  openGraph: {
    title: "Kaygıyı anlamak: Ne zaman bir sinyale dönüşür?",
    description:
      "Kaygının işlevini, yoğunlaştığında gündelik yaşam üzerindeki etkilerini ve terapi sürecinde nasıl ele alınabileceğini anlatan bilgilendirici bir yazı.",
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

        <p className="blog-article-kicker">Kaygı</p>

        <h1 className="blog-article-title">Kaygıyı anlamak: Ne zaman bir sinyale dönüşür?</h1>

        <p className="blog-article-intro">
          Kaygı, tehlike veya belirsizlik karşısında ortaya çıkabilen doğal bir duygudur. Ancak yoğunluğu arttığında gündelik yaşamı, ilişkileri ve kişinin kendisiyle kurduğu bağı zorlayabilir.
        </p>

        <div className="blog-article-divider" aria-hidden="true" />

        <div className="blog-article-content">
          <h2>Kaygının işlevi</h2>
          <p>
            Kaygı her zaman ortadan kaldırılması gereken bir duygu değildir. Bazen yaklaşan bir riski fark etmemize, hazırlanmamıza veya sınırlarımızı görmemize yardımcı olur. Zorlayıcı hale geldiği noktada ise düşünceler sürekli olası tehditlere yönelir ve beden de bu alarm durumuna eşlik edebilir.
          </p>

          <h2>Ne zaman destek düşünülmeli?</h2>
          <p>
            Kaygı kişinin uyku düzenini, işlevselliğini, ilişkilerini veya karar verme biçimini belirgin biçimde etkiliyorsa bu deneyimi daha yakından ele almak faydalı olabilir. Psikoterapi sürecinde yalnızca belirtilere değil, kaygının kişinin yaşamındaki anlamına ve tekrar eden örüntülere de bakılabilir.
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