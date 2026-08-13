"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [siteReady, setSiteReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* NAVIGATION */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <a className="brand" href="#" aria-label="Hande Öner ana sayfa">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Uzman Psikolog</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          <a href="#hakkimda">Hakkımda</a>
          <a href="#alanlar">Çalışma Alanlarım</a>
          <a href="#blog">Blog</a>
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
            <a href="#blog" onClick={closeMobileMenu}>
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
          <div className="portrait-frame">
            <div className="portrait-tilt">
              <div className="portrait-placeholder">
                <span>Hande’nin fotoğrafı</span>
              </div>
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
              Çalışma alanlarıyla ilgili detaylı bilgi için ilgili başlığı
              seçebilirsiniz.
            </p>
          </div>
        </div>

        <div className="areas-grid">
          <a
            className="area-card"
            href="/calisma-alanlari/anksiyete"
            aria-label="Anksiyete hakkında detaylı bilgi"
          >
            <span className="area-number">01</span>
            <div>
              <h3>Anksiyete</h3>
              <p>Kaygı, yoğun endişe ve belirsizlikle ilişkili güçlükler.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="area-card"
            href="/calisma-alanlari/depresyon"
            aria-label="Depresyon hakkında detaylı bilgi"
          >
            <span className="area-number">02</span>
            <div>
              <h3>Depresyon</h3>
              <p>Duygudurum, isteksizlik ve yaşam enerjisindeki değişimler.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="area-card"
            href="/calisma-alanlari/ofke-problemleri"
            aria-label="Öfke problemleri hakkında detaylı bilgi"
          >
            <span className="area-number">03</span>
            <div>
              <h3>Öfke Problemleri</h3>
              <p>Öfkeyi anlamlandırma, ifade etme ve düzenleme güçlükleri.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="area-card"
            href="/calisma-alanlari/goc-ve-uyum"
            aria-label="Göç ve uyum süreçleri hakkında detaylı bilgi"
          >
            <span className="area-number">04</span>
            <div>
              <h3>Göç ve Uyum Süreçleri</h3>
              <p>Yeni bir ülke, kültür veya yaşam düzenine uyum süreçleri.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

    </main>
  );
}