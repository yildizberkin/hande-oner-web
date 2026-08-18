"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [siteReady, setSiteReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [flippedArea, setFlippedArea] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    const siteReadyTimer = window.setTimeout(() => {
      setSiteReady(true);
    }, 1050);

    const introTimer = window.setTimeout(() => {
      setIntroDone(true);
    }, 2050);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(siteReadyTimer);
      window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      sessionType: String(formData.get("sessionType") ?? ""),
      contactType: String(formData.get("contactType") ?? ""),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
      turnstileToken: String(formData.get("cf-turnstile-response") ?? ""),
      language: "tr",
    };

    setContactStatus("sending");
    setContactMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Mesaj gönderilemedi.");
      }

      setContactStatus("success");
      setContactMessage("Talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçilecektir.");
      form.reset();

      if (typeof window !== "undefined" && "turnstile" in window) {
        const turnstile = (window as typeof window & {
          turnstile?: { reset: () => void };
        }).turnstile;
        turnstile?.reset();
      }
    } catch (error) {
      setContactStatus("error");
      setContactMessage(
        error instanceof Error
          ? error.message
          : "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      );
    }
  };

  const workAreas = [
    {
      id: "kaygi",
      slug: "kaygi-bozukluklari",
      title: "Kaygı Bozuklukları",
      short: "Yoğun kaygı, endişe ve belirsizlikle ilişkili güçlükler.",
      detail:
        "Kaygı, gündelik yaşamın doğal bir parçasıdır; ancak yoğunlaştığında kişinin düşüncelerini, ilişkilerini ve günlük işlevselliğini etkileyebilir. Terapi sürecinde kaygının altında yatan örüntüleri anlamaya ve kişi için daha işlevsel yollar geliştirmeye alan açılır.",
    },
    {
      id: "depresyon",
      slug: "depresyon",
      title: "Depresyon",
      short: "Duygudurum, isteksizlik ve yaşam enerjisindeki değişimler.",
      detail:
        "Depresif dönemler kişinin enerjisini, ilgisini, ilişkilerini ve kendisiyle kurduğu bağı etkileyebilir. Terapi, bu yaşantının anlamını ve tekrar eden duygusal örüntüleri güvenli bir alanda ele almayı amaçlar.",
    },
    {
      id: "iliskisel-zorluklar",
      slug: "iliskisel-zorluklar",
      title: "İlişkisel Zorluklar",
      short: "Yakın ilişkilerde tekrar eden çatışmalar ve bağ kurma güçlükleri.",
      detail:
        "İlişkilerde tekrar eden çatışmalar, uzaklaşma ya da yakınlık kurmakta zorlanma kişinin geçmiş ve güncel deneyimleriyle bağlantılı olabilir. Terapi sürecinde ilişkisel örüntüler fark edilerek daha açık ve sağlıklı bağlar kurabilmenin yolları araştırılır.",
    },
    {
      id: "ozsaygi",
      slug: "ozsaygi-ve-benlik-algisi",
      title: "Özsaygı ve Benlik Algısı",
      short: "Kendilik değeri, öz eleştiri ve benlik algısıyla ilgili güçlükler.",
      detail:
        "Kişinin kendisini nasıl gördüğü, aldığı kararları ve başkalarıyla kurduğu ilişkileri önemli ölçüde etkileyebilir. Terapi, yoğun öz eleştirinin ve yetersizlik duygularının kaynaklarını anlamlandırmaya yardımcı olabilecek bir alan sunar.",
    },
    {
      id: "yalnizlik",
      slug: "yalnizlik",
      title: "Yalnızlık",
      short: "Bağ kurmakta zorlanma ve duygusal yalnızlık deneyimleri.",
      detail:
        "Yalnızlık yalnızca fiziksel olarak tek başına olmak değil, ilişkiler içinde anlaşılmadığını veya bağ kuramadığını hissetmek şeklinde de yaşanabilir. Terapi sürecinde bu deneyimin kişisel anlamı ve ilişkilerdeki yansımaları birlikte incelenebilir.",
    },
    {
      id: "ofke",
      slug: "ofke-yonetimi",
      title: "Öfke Yönetimi",
      short: "Öfkeyi anlamlandırma, ifade etme ve düzenleme güçlükleri.",
      detail:
        "Öfke çoğu zaman sınırlar, incinme, hayal kırıklığı veya karşılanmayan ihtiyaçlarla bağlantılı bir duygudur. Terapi süreci, öfkenin tetikleyicilerini anlamaya ve bu duyguyu daha işlevsel biçimde ifade edebilmenin yollarını keşfetmeye yardımcı olabilir.",
    },
    {
      id: "yas-kayip",
      slug: "yas-ve-kayip-surecleri",
      title: "Yas ve Kayıp Süreçleri",
      short: "Kayıp, ayrılık ve değişim sonrasında yaşanan duygusal süreçler.",
      detail:
        "Yasın tek bir doğru biçimi veya sabit bir süresi yoktur; her kayıp kişide farklı bir deneyim yaratabilir. Terapi, kayıpla birlikte gelen duygulara yer açmayı ve değişen yaşamla yeniden ilişki kurmayı destekleyen bir alan sunar.",
    },
    {
      id: "goc-uyum",
      slug: "goc-ve-uyum-surecleri",
      title: "Göç ve Uyum Süreçleri",
      short: "Yeni bir ülke, kültür veya yaşam düzenine uyum süreçleri.",
      detail:
        "Göç; aidiyet, kimlik, ilişkiler ve gündelik yaşam üzerinde birden fazla değişimi aynı anda beraberinde getirebilir. Terapi sürecinde bu değişimlerin yarattığı duygusal yük ve yeni yaşam düzenine uyum deneyimi ele alınabilir.",
    },
  ];

  const faqItems = [
    {
      question: "Seanslar ne kadar sürüyor?",
      answer:
        "Bireysel psikoterapi görüşmeleri genellikle yaklaşık 50 dakika sürer. Görüşme sıklığı ve sürecin çerçevesi ilk seanslarda danışanın ihtiyaçları doğrultusunda birlikte değerlendirilir.",
    },
    {
      question: "İlk görüşmede neler konuşulur?",
      answer:
        "İlk görüşme, terapiye başvurma nedeninizi, beklentilerinizi ve mevcut ihtiyaçlarınızı konuşmak için bir tanışma alanıdır. Aynı zamanda çalışma biçimi ve terapi sürecine ilişkin sorularınızı paylaşabilirsiniz.",
    },
    {
      question: "Görüşmeler çevrimiçi yapılabilir mi?",
      answer:
        "Evet. Görüşmeler uygun koşullar sağlandığında çevrimiçi veya yüz yüze gerçekleştirilebilir. Hangi görüşme biçiminin sizin için daha uygun olduğu başlangıçta birlikte değerlendirilebilir.",
    },
    {
      question: "Terapi süreci ne kadar devam eder?",
      answer:
        "Terapi süresini herkes için geçerli tek bir zaman aralığıyla tanımlamak mümkün değildir. Süre; başvuru nedeni, ihtiyaçlar, hedefler ve süreç içinde ortaya çıkan konulara göre değişebilir.",
    },
    {
      question: "Görüşmeler gizli midir?",
      answer:
        "Psikoterapi görüşmelerinde gizlilik temel ilkelerden biridir. Gizliliğin kapsamı ve profesyonel sınırlar terapi sürecinin başlangıcında danışanla açık biçimde paylaşılır.",
    },
    {
      question: "Seans iptali veya değişikliği nasıl yapılır?",
      answer:
        "Randevu değişikliği veya iptal ihtiyacında mümkün olduğunca önceden iletişime geçilmesi beklenir. Kesin iptal ve değişiklik koşulları seans süreci başlamadan önce danışanla paylaşılır.",
    },
  ];

  return (
    <main className={siteReady ? "site-ready" : "site-loading"}>
      {/* INTRO */}
      {!introDone && (
        <div className="intro-screen" aria-hidden="true">
          <div className="intro-curtain">
            <div className="intro-content">
              <p className="intro-name">Hande Öner</p>
              <p className="intro-title">Uzman Psikolog</p>
            </div>

            <div className="glass-sweep">
              <div className="glass-sweep-inner" />
            </div>

            <div className="intro-glow intro-glow-one" />
            <div className="intro-glow intro-glow-two" />
          </div>
        </div>
      )}

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

      {/* NAVIGATION */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <a className="brand" href="#" aria-label="Hande Öner ana sayfa">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Uzman Psikolog</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          <a href="#hakkimda">Hakkımda</a>
          <a href="#alanlar">Çalışma Alanlarım</a>
          <a href="/blog">Blog</a>
          <a href="#sss">SSS</a>
          <a href="#iletisim">İletişim</a>
        </nav>

        <div className="navbar-actions">
          <a className="nav-cta" href="#iletisim">
            Seans Talebi
            <span aria-hidden="true">↗</span>
          </a>

          <div className="language-switcher" aria-label="Dil seçimi">
            <a
              className="language-option language-option-active"
              href="/"
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
              href="/en"
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

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
        onClick={closeMobileMenu}
      >
        <nav
          id="mobile-menu"
          className="mobile-menu-panel"
          aria-label="Mobil menü"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu-links">
            <a href="#hakkimda" onClick={closeMobileMenu}>
              Hakkımda
            </a>
            <a href="#alanlar" onClick={closeMobileMenu}>
              Çalışma Alanlarım
            </a>
            <a href="/blog" onClick={closeMobileMenu}>
              Blog
            </a>
            <a href="#sss" onClick={closeMobileMenu}>
              SSS
            </a>
            <a href="#iletisim" onClick={closeMobileMenu}>
              İletişim
            </a>
          </div>

          <div className="mobile-menu-footer">
            <a
              className="mobile-menu-cta"
              href="#iletisim"
              onClick={closeMobileMenu}
            >
              Seans Talebi
              <span aria-hidden="true">↗</span>
            </a>

            <div className="mobile-language-switcher" aria-label="Dil seçimi">
              <a
                className="language-option language-option-active"
                href="/"
                lang="tr"
                aria-current="page"
                aria-label="Türkçe"
                onClick={closeMobileMenu}
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
                href="/en"
                lang="en"
                aria-label="English"
                onClick={closeMobileMenu}
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
        </nav>
      </div>

      {/* HERO */}
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="hero-label reveal reveal-1">
            <span />
            UZMAN PSİKOLOG
            <span />
          </div>

          <h1 className="reveal reveal-2">Hande Öner</h1>

          <p className="hero-name reveal reveal-3">
            Yetişkinlere Yönelik Psikoterapi
          </p>

          <p className="hero-description reveal reveal-4">
            Yüz yüze ve çevrimiçi psikoterapi.
            <br />
            Türkçe ve İngilizce görüşme seçeneği.
          </p>

          <div className="hero-actions reveal reveal-5">
            <a href="#iletisim" className="primary-button">
              Seans Talebi Oluştur
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#hakkimda" className="text-link">
              Hakkımda
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-meta reveal reveal-6">
            <div>
              <span className="meta-label">Görüşme</span>
              <span className="meta-value">Yüz Yüze ve Çevrimiçi</span>
            </div>

            <div>
              <span className="meta-label">Dil</span>
              <span className="meta-value">Türkçe ve İngilizce</span>
            </div>
          </div>
        </div>

        {/* PORTRAIT */}
        <div className="hero-visual reveal visual-reveal">
          <div className="portrait-frame portrait-frame-straight">
            <div className="portrait-image-wrap">
              <Image
                src="/images/hande-oner-portrait.webp"
                alt="Uzman Psikolog Hande Öner"
                fill
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 720px, 42vw"
                className="portrait-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TRANSITION */}
      <div className="section-separator" aria-hidden="true">
        <div className="separator-flow">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* ABOUT */}
      <section className="about section-shell" id="hakkimda">
        <div className="about-header">
          <span className="section-index">01</span>

          <div className="about-heading">
            <p className="section-label">HAKKIMDA</p>

            <h2>
              Eğitim, deneyim
              <br />
              <span>ve çalışma yaklaşımı.</span>
            </h2>
          </div>
        </div>

        <div className="about-paragraphs">
          <article className="about-paragraph-card">
            <p>
              Hande Öner, lisans eğitimini İstanbul Bilgi Üniversitesi
              Psikoloji Bölümü’nde tamamlamıştır. Ardından İngiltere’de
              Bournemouth University’de Klinik Psikoloji yüksek lisansını
              tamamlayarak uzmanlık eğitimini almıştır. Yüksek lisans tezinde
              çocukluk çağı cinsel istismarının yetişkinlik dönemindeki
              kişilerarası ilişkiler üzerindeki etkilerini incelemiştir.
            </p>
          </article>

          <article className="about-paragraph-card">
            <p>
              Türkiye ve İngiltere’de farklı ruh sağlığı kurumlarında
              psikolojik değerlendirme, danışan görüşmeleri ve psikoeğitim
              süreçlerinde görev almıştır. İngiltere’de ruh sağlığı destek
              çalışanı, ardından We Are With You bünyesinde iyileşme destek
              çalışanı olarak çalışmış; yetişkinlerle vaka yönetimi,
              motivasyonel görüşme, risk değerlendirmesi ve iyileşme odaklı
              destek süreçlerinde yer almıştır.
            </p>
          </article>

          <article className="about-paragraph-card">
            <p>
              Klinik çalışmalarını ağırlıklı olarak psikodinamik bakış
              açısıyla sürdürmektedir. Terapiyi, bireyin kendisini daha
              yakından tanıyabileceği, yaşadığı güçlükleri
              anlamlandırabileceği ve kalıcı değişim için alan açabileceği bir
              süreç olarak görmektedir. Türkçe ve İngilizce dillerinde
              yetişkinlere yönelik yüz yüze ve çevrimiçi psikoterapi hizmeti
              sunmaktadır.
            </p>
          </article>
        </div>
      </section>


      {/* AREAS OF WORK */}
      <section className="areas section-shell" id="alanlar">
        <div className="areas-header">
          <span className="section-index">02</span>

          <div className="areas-heading">
            <p className="section-label">ÇALIŞMA ALANLARIM</p>

            <h2>
              Terapi sürecinde
              <br />
              <span>çalışılabilecek başlıklar.</span>
            </h2>

            <p className="areas-description">
              Bir kartı seçerek ilgili çalışma alanı hakkında kısa bilgi
              görüntüleyebilirsiniz.
            </p>
          </div>
        </div>

        <div className="areas-grid">
          {workAreas.map((area, index) => {
            const isFlipped = flippedArea === area.id;

            return (
              <article className="area-card-shell" key={area.id}>
                <button
                  type="button"
                  className={`area-flip-card ${isFlipped ? "is-flipped" : ""}`}
                  onClick={() => setFlippedArea(isFlipped ? null : area.id)}
                  aria-pressed={isFlipped}
                  aria-label={`${area.title} kartını ${isFlipped ? "ön yüze" : "arka yüze"} çevir`}
                >
                  <span className="area-card-inner">
                    <span className="area-card-face area-card-front">
                      <span className="area-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="area-card-copy">
                        <strong>{area.title}</strong>
                        <span>{area.short}</span>
                      </span>

                      <span className="area-flip-hint" aria-hidden="true">
                        ↻
                      </span>
                    </span>

                    <span className="area-card-face area-card-back">
                      <span className="area-back-label">KISA BİLGİ</span>
                      <span className="area-back-text">{area.detail}</span>
                      <span className="area-back-return" aria-hidden="true">
                        Tekrar çevir ↻
                      </span>
                    </span>
                  </span>
                </button>

                <a
                  className="area-detail-link"
                  href={`/calisma-alanlari/${area.slug}`}
                >
                  Detaylı bilgi <span aria-hidden="true">↗</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* EDUCATION, TRAINING & VOLUNTEERING */}
      <section className="credentials section-shell" id="egitimler">
        <div className="credentials-header">
          <span className="section-index">03</span>

          <div className="credentials-heading">
            <p className="section-label">EĞİTİMLER &amp; DİĞER ÇALIŞMALAR</p>

            <h2>
              Mesleki gelişim
              <br />
              <span>ve gönüllülük deneyimleri.</span>
            </h2>
          </div>
        </div>

        <div className="credentials-compact-grid">
          <div className="credential-column">
            <div className="credential-column-heading">
              <span className="credential-accent" aria-hidden="true" />
              <h3>Eğitimler &amp; Sertifikalar</h3>
            </div>

            <article className="credential-mini-card credential-membership">
              <span className="credential-type">ÜYELİK</span>
              <strong>British Psychological Society</strong>
              <p>GMBPsS Graduate Member</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">YÜKSEK LİSANS</span>
              <strong>Bournemouth University</strong>
              <p>Klinik Psikoloji Yüksek Lisansı (MSc Clinical Psychology)</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">LİSANS</span>
              <strong>İstanbul Bilgi Üniversitesi</strong>
              <p>Psikoloji Lisans Programı</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">EĞİTİM</span>
              <strong>İstanbul Psikoterapi Okulu</strong>
              <p>Psikanalitik Psikoterapi Eğitimi – Kuramsal Modül</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">EĞİTİM</span>
              <strong>Dr. Alp Karaosmanoğlu / International Society of Schema Therapy</strong>
              <p>Şema Terapi Eğitimi</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">EĞİTİM</span>
              <strong>Prof. Dr. Ebru Şalcıoğlu</strong>
              <p>Bilişsel ve Davranışçı Terapiler Eğitimi</p>
            </article>
          </div>

          <div className="credential-column">
            <div className="credential-column-heading">
              <span className="credential-accent" aria-hidden="true" />
              <h3>Gönüllülük &amp; Aktiviteler</h3>
            </div>

            <article className="credential-mini-card">
              <span className="credential-type">GÖNÜLLÜLÜK</span>
              <strong>Samaritans</strong>
              <p>Duygusal kriz yaşayan bireylere telefonla gönüllü dinleme desteği.</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">GÖNÜLLÜLÜK</span>
              <strong>World Human Relief</strong>
              <p>Orman yangınlarından etkilenen bireylere psikososyal destek.</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">AKTİVİTE</span>
              <strong>İstanbul Üniversitesi Psikoloji Kulübü</strong>
              <p>Deprem mağdurları ve travma alanında saha psikologluğu semineri.</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">GÖNÜLLÜLÜK</span>
              <strong>BİLUM – BİLGİ Nar Harekatı</strong>
              <p>Çocuk esirgeme kurumlarında sosyal sorumluluk projeleri.</p>
            </article>

            <article className="credential-mini-card">
              <span className="credential-type">AKTİVİTE</span>
              <strong>Türkiye Psikoloji Öğrencileri Çalışma Grubu</strong>
              <p>Psikoloji öğrencileri çalışma grubu katılımı.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section-shell" id="sss">
        <div className="faq-header">
          <span className="section-index">04</span>

          <div className="faq-heading">
            <p className="section-label">SIK SORULAN SORULAR</p>

            <h2>
              Terapi sürecine dair
              <br />
              <span>merak edilenler.</span>
            </h2>

            <p className="faq-intro">
              Bu bölümdeki içerikler şimdilik tasarım ve yerleşimi görmek
              amacıyla hazırlanmıştır; son metinler yayından önce
              netleştirilebilir.
            </p>
          </div>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <article
                className={`faq-item ${isOpen ? "is-open" : ""}`}
                key={item.question}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>

                <div className="faq-answer-wrap">
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>


      {/* CONTACT */}
      <section className="contact section-shell" id="iletisim">
        <div className="contact-header">
          <span className="section-index">05</span>

          <div className="contact-heading">
            <p className="section-label">İLETİŞİM &amp; SEANS TALEBİ</p>

            <h2>
              İlk adımı atmak için
              <br />
              <span>benimle iletişime geçin.</span>
            </h2>

            <p className="contact-intro">
              Seans talebi, soru veya ön görüşme isteğiniz için aşağıdaki formu
              kullanabilirsiniz. İlk mesajınızda hassas sağlık bilgileri
              paylaşmamanız önerilir.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          <aside className="contact-info-card">
            <div className="contact-info-block">
              <span className="contact-info-label">E-posta</span>
              <a href="mailto:pskhandeoner@gmail.com" className="contact-info-value">
                pskhandeoner@gmail.com
              </a>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Görüşme Biçimi</span>
              <p className="contact-info-value">Yüz Yüze &amp; Çevrimiçi</p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Dil</span>
              <p className="contact-info-value">Türkçe &amp; İngilizce</p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Konum</span>
              <p className="contact-info-value">Kadıköy, İstanbul</p>
            </div>

            <div className="contact-note-card">
              <span className="contact-note-title">Önemli Not</span>
              <p>
                Form üzerinden mümkün olduğunca kısa bilgi paylaşmanız önerilir.
                Lütfen hassas sağlık verilerinizi veya ayrıntılı özel
                bilgilerinizi ilk mesajınızda iletmeyin.
              </p>
            </div>
          </aside>

          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-grid">
                <label className="form-field">
                  <span>Ad Soyad</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Adınızı ve soyadınızı yazın"
                  />
                </label>

                <label className="form-field">
                  <span>E-posta</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="ornek@mail.com"
                  />
                </label>

                <label className="form-field">
                  <span>Telefon</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="05xx xxx xx xx"
                  />
                </label>

                <label className="form-field">
                  <span>Görüşme Tercihi</span>
                  <select name="sessionType" defaultValue="" required>
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    <option value="online">Çevrimiçi</option>
                    <option value="face-to-face">Yüz Yüze</option>
                    <option value="either">Fark Etmez</option>
                  </select>
                </label>

                <label className="form-field">
                  <span>İletişim Tercihi</span>
                  <select name="contactType" defaultValue="" required>
                    <option value="" disabled>
                      Seçiniz
                    </option>
                    <option value="email">E-posta</option>
                    <option value="phone">Telefon</option>
                  </select>
                </label>

                <label className="form-field form-field-full">
                  <span>Kısa Mesaj</span>
                  <textarea
                    name="message"
                    rows={6}
                    maxLength={1500}
                    placeholder="Kısaca ulaşma nedeninizi paylaşabilirsiniz."
                  />
                </label>
              </div>

              <div className="form-honeypot" aria-hidden="true">
                <label>
                  Web sitesi
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <div className="turnstile-wrap">
                  <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-theme="light"
                    data-size="flexible"
                  />
                </div>
              )}

              <div className="form-disclaimer">
                Form üzerinden gönderdiğiniz iletişim bilgileri yalnızca size
                dönüş yapmak amacıyla kullanılacaktır.
              </div>

              <div className="contact-form-actions">
                <button
                  type="submit"
                  className="primary-button"
                  disabled={contactStatus === "sending"}
                >
                  {contactStatus === "sending" ? "Gönderiliyor..." : "Talebi Gönder"}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>

              {contactMessage && (
                <p
                  className={`contact-form-status ${
                    contactStatus === "success" ? "is-success" : "is-error"
                  }`}
                  role="status"
                >
                  {contactMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="section-shell site-footer-shell">
          <div className="site-footer-brand">
            <span className="site-footer-name">Hande Öner</span>
            <span className="site-footer-title">Uzman Psikolog</span>
            <p>
              Yetişkinlere yönelik yüz yüze ve çevrimiçi psikoterapi.
            </p>
          </div>

          <div className="site-footer-links">
            <div className="footer-link-group">
              <span className="footer-link-title">Site</span>
              <a href="#hakkimda">Hakkımda</a>
              <a href="#alanlar">Çalışma Alanlarım</a>
              <a href="/blog">Blog</a>
              <a href="#sss">SSS</a>
              <a href="#iletisim">İletişim</a>
            </div>

            <div className="footer-link-group">
              <span className="footer-link-title">İletişim</span>
              <a href="mailto:pskhandeoner@gmail.com">pskhandeoner@gmail.com</a>
              <span>Kadıköy, İstanbul</span>
              <span>Türkçe &amp; English</span>
            </div>

            <div className="footer-link-group">
              <span className="footer-link-title">Bilgilendirme</span>
              <span>
                Bu sitedeki bilgiler genel bilgilendirme amaçlıdır; tanı,
                değerlendirme veya psikoterapi yerine geçmez.
              </span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}