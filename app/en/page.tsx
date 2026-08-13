"use client";

import { useEffect, useState } from "react";

export default function EnglishHome() {
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
              <p className="intro-title">Psychologist</p>
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
        <a className="brand" href="/en" aria-label="Hande Öner homepage">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Psychologist</span>
        </a>

        <nav className="nav-links" aria-label="Main menu">
          <a href="#about">About</a>
          <a href="#areas">Areas of Work</a>
          <a href="#blog">Blog</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="navbar-actions">
          <a className="nav-cta" href="#contact">
            Request a Session
            <span aria-hidden="true">↗</span>
          </a>

          <div className="language-switcher" aria-label="Language selection">
            <a
              className="language-option"
              href="/"
              lang="tr"
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
              className="language-option language-option-active"
              href="/en"
              lang="en"
              aria-current="page"
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
        </div>
      </header>

      {/* HERO */}
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="hero-label reveal reveal-1">
            <span />
            PSYCHOLOGIST
            <span />
          </div>

          <h1 className="reveal reveal-2">Hande Öner</h1>

          <p className="hero-name reveal reveal-3">
            Psychotherapy for Adults
          </p>

          <p className="hero-description reveal reveal-4">
            Face-to-face and online psychotherapy.
            <br />
            Sessions available in Turkish and English.
          </p>

          <div className="hero-actions reveal reveal-5">
            <a href="#contact" className="primary-button">
              Request a Session
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#about" className="text-link">
              About
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-meta reveal reveal-6">
            <div>
              <span className="meta-label">Session</span>
              <span className="meta-value">Face-to-Face &amp; Online</span>
            </div>

            <div>
              <span className="meta-label">Language</span>
              <span className="meta-value">Turkish &amp; English</span>
            </div>
          </div>
        </div>

        {/* PORTRAIT */}
        <div className="hero-visual reveal visual-reveal">
          <div className="portrait-frame">
            <div className="portrait-tilt">
              <div className="portrait-placeholder">
                <span>Hande’s photo</span>
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
      <section className="about section-shell" id="about">
        <div className="about-header">
          <span className="section-index">01</span>

          <div className="about-heading">
            <p className="section-label">ABOUT</p>

            <h2>
              Education, experience
              <br />
              <span>and therapeutic approach.</span>
            </h2>
          </div>
        </div>

        <div className="about-paragraphs">
          <article className="about-paragraph-card">
            <p>
              Hande Öner completed her undergraduate degree in Psychology at
              Istanbul Bilgi University. She later completed a master’s degree
              in Clinical Psychology at Bournemouth University in the United
              Kingdom. Her master’s thesis explored the impact of childhood
              sexual abuse on interpersonal relationships in adulthood.
            </p>
          </article>

          <article className="about-paragraph-card">
            <p>
              She has worked across different mental health settings in both
              Türkiye and the United Kingdom, taking part in psychological
              assessments, client interviews and psychoeducation processes. In
              the United Kingdom, she worked as a Mental Health Support Worker
              and later as a Recovery Worker at We Are With You, supporting
              adults through case management, motivational interviewing, risk
              assessment and recovery-focused care.
            </p>
          </article>

          <article className="about-paragraph-card">
            <p>
              Her clinical work is primarily informed by a psychodynamic
              perspective. She views therapy as a process in which individuals
              can understand themselves more deeply, make sense of their
              difficulties and create space for lasting change. She offers
              face-to-face and online psychotherapy for adults in both Turkish
              and English.
            </p>
          </article>
        </div>
      </section>


      {/* AREAS OF WORK */}
      <section className="areas section-shell" id="areas">
        <div className="areas-header">
          <span className="section-index">02</span>

          <div className="areas-heading">
            <p className="section-label">AREAS OF WORK</p>

            <h2>
              Areas that may be explored
              <br />
              <span>through the therapy process.</span>
            </h2>

            <p className="areas-description">
              Select a topic to learn more about the areas that may be
              addressed in therapy.
            </p>
          </div>
        </div>

        <div className="areas-grid">
          <a
            className="area-card"
            href="/en/areas-of-work/anxiety"
            aria-label="Learn more about anxiety"
          >
            <span className="area-number">01</span>
            <div>
              <h3>Anxiety</h3>
              <p>Difficulties related to worry, uncertainty and anxiety.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="area-card"
            href="/en/areas-of-work/depression"
            aria-label="Learn more about depression"
          >
            <span className="area-number">02</span>
            <div>
              <h3>Depression</h3>
              <p>Changes in mood, motivation and engagement with daily life.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="area-card"
            href="/en/areas-of-work/anger"
            aria-label="Learn more about anger difficulties"
          >
            <span className="area-number">03</span>
            <div>
              <h3>Anger Difficulties</h3>
              <p>Difficulties understanding, expressing and regulating anger.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="area-card"
            href="/en/areas-of-work/migration-adjustment"
            aria-label="Learn more about migration and adjustment"
          >
            <span className="area-number">04</span>
            <div>
              <h3>Migration &amp; Adjustment</h3>
              <p>Adjusting to a new country, culture or way of life.</p>
            </div>
            <span className="area-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

    </main>
  );
}