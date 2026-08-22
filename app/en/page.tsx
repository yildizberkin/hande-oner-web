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
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
      turnstileToken: String(formData.get("cf-turnstile-response") ?? ""),
      language: "en",
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

      const data = await response.json() as { message?: string };

      if (!response.ok) {
        throw new Error(data?.message || "Your message could not be sent.");
      }

      setContactStatus("success");
      setContactMessage(
        "Your request has been sent successfully. You will be contacted as soon as possible.",
      );
      form.reset();

      if (typeof window !== "undefined" && "turnstile" in window) {
        const turnstile = (
          window as typeof window & {
            turnstile?: { reset: () => void };
          }
        ).turnstile;
        turnstile?.reset();
      }
    } catch (error) {
      setContactStatus("error");
      setContactMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    }
  };

  const workAreas = [
    {
      id: "anxiety",
      slug: "anxiety-disorders",
      title: "Anxiety Disorders",
      short: "Difficulties related to intense anxiety, worry and uncertainty.",
      detail:
        "Anxiety is a natural part of everyday life; however, when it becomes intense, it can affect a person's thoughts, relationships and daily functioning. Therapy can provide space to understand the patterns underlying anxiety and explore more helpful ways of responding.",
    },
    {
      id: "depression",
      slug: "depression",
      title: "Depression",
      short: "Changes in mood, motivation and engagement with daily life.",
      detail:
        "Depressive periods can affect a person's energy, interests, relationships and sense of self. Therapy offers a safe space to explore the meaning of these experiences and recurring emotional patterns.",
    },
    {
      id: "relationship-difficulties",
      slug: "relationship-difficulties",
      title: "Relationship Difficulties",
      short: "Recurring conflict and difficulties forming or maintaining close connections.",
      detail:
        "Recurring conflict, emotional distance or difficulty with closeness may be connected to both past and present experiences. Therapy can help identify relational patterns and explore ways of building more open and healthier connections.",
    },
    {
      id: "self-esteem",
      slug: "self-esteem-and-self-perception",
      title: "Self-Esteem & Self-Perception",
      short: "Difficulties related to self-worth, self-criticism and self-perception.",
      detail:
        "The way a person sees themselves can strongly influence their decisions and relationships. Therapy can offer space to understand the roots of intense self-criticism, inadequacy and difficulties with self-worth.",
    },
    {
      id: "loneliness",
      slug: "loneliness",
      title: "Loneliness",
      short: "Difficulty feeling connected and experiences of emotional loneliness.",
      detail:
        "Loneliness is not limited to being physically alone; it can also involve feeling unseen, misunderstood or disconnected within relationships. Therapy can explore the personal meaning of this experience and how it appears in a person's relationships.",
    },
    {
      id: "anger",
      slug: "anger-management",
      title: "Anger Management",
      short: "Difficulties understanding, expressing and regulating anger.",
      detail:
        "Anger is often connected to boundaries, hurt, frustration or unmet needs. Therapy can help identify triggers and explore more constructive ways of understanding and expressing anger.",
    },
    {
      id: "grief-loss",
      slug: "grief-and-loss",
      title: "Grief & Loss",
      short: "Emotional processes following loss, separation and significant change.",
      detail:
        "There is no single correct way or fixed timeline for grief; every loss can be experienced differently. Therapy offers space for the emotions that accompany loss and can support the process of reconnecting with a changed life.",
    },
    {
      id: "migration-adjustment",
      slug: "migration-and-adjustment",
      title: "Migration & Adjustment",
      short: "Adjusting to a new country, culture or way of life.",
      detail:
        "Migration can bring simultaneous changes in belonging, identity, relationships and everyday life. Therapy can provide space to explore the emotional impact of these changes and the experience of adapting to a new environment.",
    },
  ];

  const faqItems = [
    {
      question: "How long does a session last?",
      answer:
        "Individual psychotherapy sessions generally last around 50 minutes. Session frequency and the overall therapeutic framework can be discussed together during the initial meetings according to the client's needs.",
    },
    {
      question: "What happens in the first session?",
      answer:
        "The first session provides space to talk about what brings you to therapy, your expectations and your current needs. It is also an opportunity to ask questions about the therapeutic process and way of working.",
    },
    {
      question: "Are online sessions available?",
      answer:
        "Yes. Sessions can be held online or face-to-face when appropriate. The format that feels most suitable can be discussed together at the beginning of the process.",
    },
    {
      question: "How long does therapy continue?",
      answer:
        "There is no single timeframe that applies to everyone. The duration of therapy may vary depending on the reason for seeking support, individual needs, goals and the themes that emerge during the process.",
    },
    {
      question: "Are sessions confidential?",
      answer:
        "Confidentiality is one of the fundamental principles of psychotherapy. The scope of confidentiality and professional boundaries are discussed clearly with the client at the beginning of the therapeutic process.",
    },
    {
      question: "How are cancellations or changes handled?",
      answer:
        "If a session needs to be changed or cancelled, clients are generally asked to provide as much notice as possible. Specific cancellation and rescheduling terms are shared before the therapy process begins.",
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

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

      {/* NAVIGATION */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <a className="brand" href="#" aria-label="Hande Öner home">
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">Psychologist</span>
        </a>

        <nav className="nav-links" aria-label="Main menu">
          <a href="#about">About</a>
          <a href="#areas">Areas of Work</a>
          <a href="/en/blog">Blog</a>
          <a href="#faq">FAQ</a>
          <a href="#client-rights">Client Rights</a>
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
              aria-label="Turkish"
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

          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
          aria-label="Mobile menu"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu-links">
            <a href="#about" onClick={closeMobileMenu}>
              About
            </a>
            <a href="#areas" onClick={closeMobileMenu}>
              Areas of Work
            </a>
            <a href="/en/blog" onClick={closeMobileMenu}>
              Blog
            </a>
            <a href="#faq" onClick={closeMobileMenu}>
              FAQ
            </a>
            <a href="#client-rights" onClick={closeMobileMenu}>
              Client Rights
            </a>
            <a href="#contact" onClick={closeMobileMenu}>
              Contact
            </a>
          </div>

          <div className="mobile-menu-footer">
            <a
              className="mobile-menu-cta"
              href="#contact"
              onClick={closeMobileMenu}
            >
              Request a Session
              <span aria-hidden="true">↗</span>
            </a>

            <div className="mobile-language-switcher" aria-label="Language selection">
              <a
                className="language-option"
                href="/"
                lang="tr"
                aria-label="Turkish"
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
                className="language-option language-option-active"
                href="/en"
                lang="en"
                aria-current="page"
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
            PSYCHOLOGIST
            <span />
          </div>

          <h1 className="reveal reveal-2">
            Hande Öner <span className="hero-credentials">MSc, GMBPsS</span>
          </h1>

          <p className="hero-name reveal reveal-3">
            Psychotherapist for Adults
          </p>

          <p className="hero-description reveal reveal-4">
            I guide you through a psychotherapy process in which you can make
            deeper sense of yourself, your experiences, and recurring patterns
            in your relationships. I value understanding each client&apos;s
            experience within its own context and shaping the process
            accordingly.
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
              <span className="meta-value">Face-to-Face & Online</span>
            </div>

            <div>
              <span className="meta-label">Language</span>
              <span className="meta-value">Turkish & English</span>
            </div>
          </div>
        </div>

        {/* PORTRAIT */}
        <div className="hero-visual reveal visual-reveal">
          <div className="portrait-frame portrait-frame-straight">
            <div className="portrait-image-wrap">
              <Image
                src="/images/hande-oner-portrait.webp"
                alt="Psychologist Hande Öner"
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
      <section className="about section-shell" id="about">
        <div className="about-header">
          <div className="about-heading">
            <h2>About</h2>
          </div>
        </div>

        <article className="about-glass-card">
          <p>
            In my psychotherapy work, I work with adults experiencing anxiety,
            depression, relationship difficulties, self-esteem concerns,
            loneliness, anger, grief, and adjustment processes related to
            migration. I aim to understand these difficulties not only through
            visible symptoms, but also in relation to a person&apos;s past
            experiences, recurring relational patterns, and emotional needs.
          </p>

          <p>
            My work is primarily informed by a psychodynamic perspective. In
            line with each client&apos;s needs, I also draw on the knowledge
            and methods I have gained through schema therapy and
            cognitive-behavioural approaches. I value a therapy process that
            develops with trust, openness, and collaboration.
          </p>

          <p>
            My experience across different mental health settings in Türkiye
            and the United Kingdom includes psychological assessment, client
            interviews, psychoeducation, case management, motivational
            interviewing, and risk assessment. I work with adults in Turkish
            and English, both face-to-face and online.
          </p>
        </article>
      </section>


      {/* EDUCATION, TRAINING & VOLUNTEERING */}
      <section className="credentials section-shell" id="training">
        <div className="credentials-bridge" aria-hidden="true">
          <span className="credentials-bridge-line" />
          <span className="credentials-bridge-dot" />
        </div>

        <div className="credentials-header credentials-header-centered">
          <div className="credentials-heading">
            <p className="section-label">EDUCATION &amp; PROFESSIONAL DEVELOPMENT</p>

            <h2>
              Education and
              <br />
              <span>professional development.</span>
            </h2>

            <p className="credentials-intro">
              My academic education, professional development, and volunteering
              experience.
            </p>
          </div>
        </div>

        <div className="credentials-flow">
          <section className="credential-glass-panel credential-glass-panel-academic">
            <div className="credential-panel-heading">
              <h3>Academic Education</h3>
            </div>

            <div className="credential-flow-list">
              <article className="credential-flow-item">
                <span className="credential-type">MASTER&apos;S DEGREE</span>
                <strong>Bournemouth University</strong>
                <p>MSc Clinical Psychology</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">BACHELOR&apos;S DEGREE</span>
                <strong>Istanbul Bilgi University</strong>
                <p>BSc Psychology</p>
              </article>
            </div>
          </section>

          <section className="credential-glass-panel">
            <div className="credential-panel-heading">
              <h3>Professional Development</h3>
            </div>

            <div className="credential-flow-list">
              <article className="credential-flow-item">
                <span className="credential-type">MEMBERSHIP</span>
                <strong>British Psychological Society</strong>
                <p>GMBPsS Graduate Member</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">TRAINING</span>
                <strong>Istanbul Psychotherapy School</strong>
                <p>Psychoanalytic Psychotherapy Training – Theoretical Module</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">TRAINING</span>
                <strong>Dr. Alp Karaosmanoğlu / International Society of Schema Therapy</strong>
                <p>Schema Therapy Training</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">TRAINING</span>
                <strong>Prof. Dr. Ebru Şalcıoğlu</strong>
                <p>Cognitive and Behavioural Therapies Training</p>
              </article>
            </div>
          </section>

          <section className="credential-glass-panel credential-glass-panel-soft">
            <div className="credential-panel-heading">
              <h3>Volunteering &amp; Other Work</h3>
            </div>

            <div className="credential-flow-list">
              <article className="credential-flow-item">
                <span className="credential-type">VOLUNTEERING</span>
                <strong>Samaritans</strong>
                <p>Volunteer listening support by telephone for people experiencing emotional crisis.</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">VOLUNTEERING</span>
                <strong>World Human Relief</strong>
                <p>Psychosocial support for people affected by wildfires.</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">ACTIVITY</span>
                <strong>Istanbul University Psychology Club</strong>
                <p>Seminar on field psychology with earthquake survivors and trauma.</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">VOLUNTEERING</span>
                <strong>BILUM – BILGI Nar Initiative</strong>
                <p>Social responsibility projects in child protection institutions.</p>
              </article>

              <article className="credential-flow-item">
                <span className="credential-type">ACTIVITY</span>
                <strong>Turkish Psychology Students Working Group</strong>
                <p>Participation in a psychology students working group.</p>
              </article>
            </div>
          </section>
        </div>
      </section>


      {/* AREAS OF WORK */}
      <section className="areas section-shell" id="areas">
        <div className="areas-header">
<div className="areas-heading">
            <p className="section-label">AREAS OF WORK</p>

            <h2>
              Areas that may be explored
              <br />
              <span>through the therapy process.</span>
            </h2>

            <p className="areas-description">
              Select a card to view a short introduction to each area of work.
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
                  aria-label={`Turn ${area.title} card ${isFlipped ? "to the front" : "to the back"}`}
                >
                  <span className="area-card-inner">
                    <span className="area-card-face area-card-front">

                      <span className="area-card-copy">
                        <strong>{area.title}</strong>
                        <span>{area.short}</span>
                      </span>

                      <span className="area-flip-hint" aria-hidden="true">
                        ↻
                      </span>
                    </span>

                    <span className="area-card-face area-card-back">
                      <span className="area-back-label">BRIEF OVERVIEW</span>
                      <span className="area-back-text">{area.detail}</span>
                      <span className="area-back-return" aria-hidden="true">
                        Turn back ↻
                      </span>
                    </span>
                  </span>
                </button>

                <a
                  className="area-detail-link"
                  href={`/en/areas-of-work/${area.slug}`}
                >
                  Read more <span aria-hidden="true">↗</span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section-shell" id="faq">
        <div className="faq-header">
<div className="faq-heading">
            <p className="section-label">FREQUENTLY ASKED QUESTIONS</p>

            <h2>
              Questions about
              <br />
              <span>the therapy process.</span>
            </h2>

            <p className="faq-intro">
              The content in this section is temporary and intended to preview the layout. Final wording can be refined before launch.
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

      {/* CLIENT RIGHTS */}
      <section className="client-rights section-shell" id="client-rights">
        <div className="client-rights-header">
          <div className="client-rights-heading">
            <p className="section-label">CLIENT RIGHTS</p>

            <h2>
              Knowing your rights
              <br />
              <span>is part of a safe therapy process.</span>
            </h2>

            <p className="client-rights-intro">
              Therapy should not only be a place to receive support; it should
              also be a space where you feel safe, heard and respected. As a
              client, you have a number of fundamental rights throughout the
              process.
            </p>
          </div>
        </div>

        <div className="client-rights-grid">
          <article className="client-right-card">
            <span className="client-right-mark" aria-hidden="true">✓</span>
            <div>
              <h3>A safe and respectful relationship</h3>
              <p>
                You can expect a professional therapeutic relationship in which
                you feel safe, listened to and treated with respect.
              </p>
            </div>
          </article>

          <article className="client-right-card">
            <span className="client-right-mark" aria-hidden="true">✓</span>
            <div>
              <h3>Information and questions</h3>
              <p>
                You may ask about your therapist&apos;s training, therapeutic
                approach and how the process works, and request information in
                a clear and understandable form.
              </p>
            </div>
          </article>

          <article className="client-right-card">
            <span className="client-right-mark" aria-hidden="true">✓</span>
            <div>
              <h3>Active participation in the process</h3>
              <p>
                You may raise anything that feels difficult, uncomfortable or
                unsuitable during therapy and openly communicate your needs and
                expectations.
              </p>
            </div>
          </article>

          <article className="client-right-card">
            <span className="client-right-mark" aria-hidden="true">✓</span>
            <div>
              <h3>Privacy and confidentiality</h3>
              <p>
                You can expect to be informed about how your information is
                kept confidential and the exceptional circumstances in which
                confidentiality may be limited.
              </p>
            </div>
          </article>

          <article className="client-right-card">
            <span className="client-right-mark" aria-hidden="true">✓</span>
            <div>
              <h3>Pausing or ending therapy</h3>
              <p>
                If you no longer wish to continue, you may communicate this and
                pause or end therapy according to your own decision.
              </p>
            </div>
          </article>

          <article className="client-right-card">
            <span className="client-right-mark" aria-hidden="true">✓</span>
            <div>
              <h3>Considering other forms of support</h3>
              <p>
                When needed, you may ask about referral to another professional,
                a second opinion or other forms of support that may be more
                appropriate for you.
              </p>
            </div>
          </article>
        </div>
      </section>


      {/* CONTACT */}
      <section className="contact section-shell" id="contact">
        <div className="contact-header">
          <div className="contact-heading">
            <p className="section-label">CONTACT &amp; SESSION REQUEST</p>

            <h2>
              Take the first step
              <br />
              <span>and get in touch.</span>
            </h2>

            <div className="intro-consultation-card">
              <div className="intro-consultation-time" aria-hidden="true">
                <strong>15</strong>
                <span>MIN</span>
              </div>

              <div className="intro-consultation-copy">
                <span className="intro-consultation-label">FREE INITIAL CONSULTATION</span>
                <h3>Free 15-Minute Initial Consultation</h3>
                <p>
                  Before starting psychotherapy, you can arrange a free
                  15-minute initial consultation to discuss your questions
                  about the process and consider whether the way I work feels
                  suitable for you.
                </p>
              </div>
            </div>

            <p className="contact-intro">
              You can use the form to request a session, ask a question, or
              arrange an initial consultation. Please avoid sharing sensitive
              health information in your first message.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          <aside className="contact-info-card">
            <div className="contact-info-block">
              <span className="contact-info-label">Email</span>
              <a href="mailto:pskhandeoner@gmail.com" className="contact-info-value">
                pskhandeoner@gmail.com
              </a>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Session Format</span>
              <p className="contact-info-value">Face-to-Face &amp; Online</p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Languages</span>
              <p className="contact-info-value">Turkish &amp; English</p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Location</span>
              <p className="contact-info-value">Kadıköy, Istanbul</p>
            </div>

            <div className="contact-note-card">
              <span className="contact-note-title">Important Note</span>
              <p>
                Please keep your first message brief where possible. Avoid
                sharing sensitive health information or detailed private
                information through this form.
              </p>
            </div>
          </aside>

          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-grid">
                <label className="form-field">
                  <span>Full Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    placeholder="Enter your full name"
                  />
                </label>

                <label className="form-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="example@email.com"
                  />
                </label>

                                <label className="form-field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    required
                    maxLength={40}
                    placeholder="Your phone number"
                  />
                </label>

<label className="form-field">
                  <span>Session Preference</span>
                  <select name="sessionType" defaultValue="" required>
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="online">Online</option>
                    <option value="face-to-face">Face-to-Face</option>
                  </select>
                </label>

                <label className="form-field form-field-full">
                  <span>Short Message</span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    maxLength={1500}
                    placeholder="You may briefly share the reason for getting in touch."
                  />
                </label>
              </div>

              <div className="form-honeypot" aria-hidden="true">
                <label>
                  Website
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
                The contact details you submit will only be used to respond to
                your enquiry.
              </div>

              <div className="contact-form-actions">
                <button
                  type="submit"
                  className="primary-button"
                  disabled={contactStatus === "sending"}
                >
                  {contactStatus === "sending" ? "Sending..." : "Send Request"}
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
          <div className="site-footer-brand"><span className="site-footer-name">Hande Öner</span><span className="site-footer-title">Psychologist</span><p>Face-to-face and online psychotherapy for adults.</p></div>
          <div className="site-footer-links">
            <div className="footer-link-group"><span className="footer-link-title">Site</span><a href="#about">About</a><a href="#areas">Areas of Work</a><a href="/en/blog">Blog</a><a href="#faq">FAQ</a><a href="#client-rights">Client Rights</a><a href="#contact">Contact</a></div>
            <div className="footer-link-group"><span className="footer-link-title">Contact</span><a href="mailto:pskhandeoner@gmail.com">pskhandeoner@gmail.com</a><span>Kadıköy, Istanbul</span><span>Turkish &amp; English</span></div>
            <div className="footer-link-group"><span className="footer-link-title">Information</span><span>The information on this website is for general informational purposes and does not replace assessment, diagnosis or psychotherapy.</span></div>
          </div>
        </div>
      </footer>

    </main>
  );
}