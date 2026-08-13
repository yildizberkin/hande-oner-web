import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İlişkilerde tekrar eden örüntüler | Hande Öner",
  description:
    "Yakın ilişkilerde benzer çatışmaların neden tekrar edebildiğini ve ilişkisel örüntülerin psikoterapide nasıl ele alınabileceğini anlatan bir yazı.",
  alternates: {
    canonical: "/blog/iliskilerde-tekrar-eden-oruntuler",
  },
  openGraph: {
    title: "İlişkilerde tekrar eden örüntüler",
    description:
      "Yakın ilişkilerde benzer çatışmaların neden tekrar edebildiğini ve ilişkisel örüntülerin psikoterapide nasıl ele alınabileceğini anlatan bir yazı.",
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

        <p className="blog-article-kicker">İlişkiler</p>

        <h1 className="blog-article-title">İlişkilerde tekrar eden örüntüler</h1>

        <p className="blog-article-intro">
          Bazı ilişkiler değişse de kişinin kendisini benzer çatışmaların, uzaklaşmaların veya hayal kırıklıklarının içinde bulması mümkün olabilir. Tekrar eden bu deneyimler çoğu zaman yalnızca bugünkü ilişkiyle sınırlı değildir.
        </p>

        <div className="blog-article-divider" aria-hidden="true" />

        <div className="blog-article-content">
          <h2>Örüntüler nasıl oluşur?</h2>
          <p>
            İlişkilerde beklentilerimiz, yakınlıkla kurduğumuz bağ ve kendimizi koruma biçimlerimiz geçmiş deneyimlerden etkilenebilir. Kişi farkında olmadan tanıdık gelen ilişki biçimlerine yönelebilir veya aynı savunma yollarını tekrar kullanabilir.
          </p>

          <h2>Terapi neye alan açar?</h2>
          <p>
            Psikoterapi, bu tekrarları yargılamadan fark edebilmek ve kişinin ilişkiler içinde nasıl konumlandığını anlamlandırmak için bir alan sunabilir. Farkındalık arttıkça daha esnek ve kişinin ihtiyaçlarıyla daha uyumlu ilişki kurma biçimleri geliştirmek mümkün hale gelebilir.
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