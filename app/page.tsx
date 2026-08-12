"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [siteReady, setSiteReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);

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

  return (
    <main className={siteReady ? "site-ready" : "site-loading"}>
      {/* INTRO */}
      {!introDone && (
        <div className="intro-screen" aria-hidden="true">
          <div className="intro-curtain">
            <div className="intro-content">
              <p className="intro-name">Hande Öner</p>
              <p className="intro-title">Klinik Psikolog</p>
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
          <span className="brand-title">Klinik Psikolog</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          <a href="#hakkimda">Hakkında</a>
          <a href="#alanlar">Çalışma Alanları</a>
          <a href="#sss">SSS</a>
          <a href="#iletisim">İletişim</a>
        </nav>

        <a className="nav-cta" href="#iletisim">
          Seans Talebi
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      {/* HERO */}
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="hero-label reveal reveal-1">
            <span />
            KLİNİK PSİKOLOG
            <span />
          </div>

          <p className="hero-name reveal reveal-2">Hande Öner</p>

          <h1 className="reveal reveal-3">
            Kendinizi anlamak,
            <br />
            <span>değişimin başladığı yerdir.</span>
          </h1>

          <p className="hero-description reveal reveal-4">
            Bireysel psikoterapi sürecinde yaşadığınız güçlükleri
            anlamlandırabileceğiniz, kendinize ait ve güvenli bir alan.
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
              <span className="meta-value">Online &amp; Yüz Yüze</span>
            </div>

            <div>
              <span className="meta-label">Alan</span>
              <span className="meta-value">Bireysel Psikoterapi</span>
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

            <div className="glass-card glass-card-bottom">
              <div className="glass-dot" />

              <div>
                <span className="glass-title">Seans seçenekleri</span>
                <span className="glass-text">Online · Yüz Yüze</span>
              </div>
            </div>

            <div className="glass-card glass-card-top">
              <div>
                <span className="glass-title">Bireysel Psikoterapi</span>
                <span className="glass-text">
                  Güvenli · Yargısız · Size ait
                </span>
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
            <p className="section-label">HAKKINDA</p>

            <h2>
              Mesleki yolculuk,
              <br />
              <span>deneyimle şekillenir.</span>
            </h2>

            <p className="about-description">
              Bu bölüm Hande Öner’in eğitimi, mesleki yaklaşımı, klinik
              deneyimi ve uzmanlık alanları doğrultusunda daha sonra
              doldurulacaktır.
            </p>
          </div>
        </div>

        {/* CHRONOLOGY */}
        <div className="timeline">
          {/* ORGANIC ROUTE */}
          <div className="timeline-path" aria-hidden="true">
            <svg
              viewBox="0 0 1440 1180"
              preserveAspectRatio="none"
              role="presentation"
            >
              <path
                className="timeline-route-glow"
                d="
                  M 840 48

                  C 852 100,
                    858 152,
                    825 198

                  C 800 236,
                    738 242,
                    720 292

                  C 704 338,
                    746 394,
                    812 425

                  C 865 450,
                    955 444,
                    998 490

                  C 1027 522,
                    1022 577,
                    985 610

                  C 940 651,
                    849 655,
                    760 674

                  C 682 690,
                    615 716,
                    608 768

                  C 601 818,
                    642 850,
                    720 865

                  C 813 883,
                    949 864,
                    1040 892

                  C 1082 905,
                    1092 928,
                    1073 952

                  C 1058 971,
                    1077 1002,
                    1075 1048

                  C 1072 1090,
                    1038 1131,
                    982 1150
                "
              />

              <path
                className="timeline-route-base"
                d="
                  M 840 48

                  C 852 100,
                    858 152,
                    825 198

                  C 800 236,
                    738 242,
                    720 292

                  C 704 338,
                    746 394,
                    812 425

                  C 865 450,
                    955 444,
                    998 490

                  C 1027 522,
                    1022 577,
                    985 610

                  C 940 651,
                    849 655,
                    760 674

                  C 682 690,
                    615 716,
                    608 768

                  C 601 818,
                    642 850,
                    720 865

                  C 813 883,
                    949 864,
                    1040 892

                  C 1082 905,
                    1092 928,
                    1073 952

                  C 1058 971,
                    1077 1002,
                    1075 1048

                  C 1072 1090,
                    1038 1131,
                    982 1150
                "
              />

              <path
                className="timeline-route-shimmer"
                d="
                  M 840 48

                  C 852 100,
                    858 152,
                    825 198

                  C 800 236,
                    738 242,
                    720 292

                  C 704 338,
                    746 394,
                    812 425

                  C 865 450,
                    955 444,
                    998 490

                  C 1027 522,
                    1022 577,
                    985 610

                  C 940 651,
                    849 655,
                    760 674

                  C 682 690,
                    615 716,
                    608 768

                  C 601 818,
                    642 850,
                    720 865

                  C 813 883,
                    949 864,
                    1040 892

                  C 1082 905,
                    1092 928,
                    1073 952

                  C 1058 971,
                    1077 1002,
                    1075 1048

                  C 1072 1090,
                    1038 1131,
                    982 1150
                "
              />
            </svg>
          </div>

          <article className="timeline-card timeline-card-1">
            <div className="timeline-card-glass">
              <div className="timeline-card-header">
                <span className="timeline-year">2017</span>
                <span className="timeline-number">01</span>
              </div>

              <h3>Başlangıç</h3>

              <p>
                Bu bölüm Hande Öner’in eğitim ve mesleki geçmişi doğrultusunda
                daha sonra doldurulacaktır.
              </p>
            </div>
          </article>

          <article className="timeline-card timeline-card-2">
            <div className="timeline-card-glass">
              <div className="timeline-card-header">
                <span className="timeline-year">2019</span>
                <span className="timeline-number">02</span>
              </div>

              <h3>Akademik Gelişim</h3>

              <p>
                Bu bölüm Hande Öner’in eğitim ve mesleki geçmişi doğrultusunda
                daha sonra doldurulacaktır.
              </p>
            </div>
          </article>

          <article className="timeline-card timeline-card-3">
            <div className="timeline-card-glass">
              <div className="timeline-card-header">
                <span className="timeline-year">2021</span>
                <span className="timeline-number">03</span>
              </div>

              <h3>Klinik Deneyim</h3>

              <p>
                Bu bölüm Hande Öner’in eğitim ve mesleki geçmişi doğrultusunda
                daha sonra doldurulacaktır.
              </p>
            </div>
          </article>

          <article className="timeline-card timeline-card-4">
            <div className="timeline-card-glass">
              <div className="timeline-card-header">
                <span className="timeline-year">2023</span>
                <span className="timeline-number">04</span>
              </div>

              <h3>Uzmanlaşma</h3>

              <p>
                Bu bölüm Hande Öner’in eğitim ve mesleki geçmişi doğrultusunda
                daha sonra doldurulacaktır.
              </p>
            </div>
          </article>

          <article className="timeline-card timeline-card-5">
            <div className="timeline-card-glass">
              <div className="timeline-card-header">
                <span className="timeline-year">Bugün</span>
                <span className="timeline-number">05</span>
              </div>

              <h3>Güncel Yaklaşım</h3>

              <p>
                Bu bölüm Hande Öner’in güncel çalışma yaklaşımı ve profesyonel
                çerçevesi doğrultusunda daha sonra doldurulacaktır.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}