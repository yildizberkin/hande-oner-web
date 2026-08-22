"use client";

import { useEffect, useState } from "react";

type WorkAreaNavbarProps = {
  language: "tr" | "en";
};

export default function WorkAreaNavbar({ language }: WorkAreaNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTr = language === "tr";

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const links = isTr
    ? [
        { href: "/#hakkimda", label: "Hakkımda" },
        { href: "/#alanlar", label: "Çalışma Alanlarım", active: true },
        { href: "/blog", label: "Blog" },
        { href: "/#sss", label: "SSS" },
        { href: "/#danisan-haklari", label: "Danışan Hakları" },
        { href: "/#iletisim", label: "İletişim" },
      ]
    : [
        { href: "/en#about", label: "About" },
        { href: "/en#areas", label: "Areas of Work", active: true },
        { href: "/en/blog", label: "Blog" },
        { href: "/en#faq", label: "FAQ" },
        { href: "/en#client-rights", label: "Client Rights" },
        { href: "/en#contact", label: "Contact" },
      ];

  const home = isTr ? "/" : "/en";
  const contactHref = isTr ? "/#iletisim" : "/en#contact";
  const ctaLabel = isTr ? "Seans Talebi" : "Request a Session";

  return (
    <>
      <header className="cms-blog-navbar work-area-navbar section-shell">
        <a
          className="brand"
          href={home}
          aria-label={isTr ? "Hande Öner ana sayfa" : "Hande Öner home"}
        >
          <span className="brand-name">Hande Öner</span>
          <span className="brand-title">
            {isTr ? "Uzman Psikolog" : "Psychologist"}
          </span>
        </a>

        <nav
          className="cms-blog-nav-links"
          aria-label={isTr ? "Ana navigasyon" : "Main navigation"}
        >
          {links.map((link) => (
            <a
              key={link.href}
              className={link.active ? "is-active" : undefined}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="cms-blog-nav-actions">
          <div className="cms-blog-language">
            <a
              className={isTr ? "is-active" : undefined}
              href="/"
              lang="tr"
            >
              TR
            </a>
            <span>/</span>
            <a
              className={!isTr ? "is-active" : undefined}
              href="/en"
              lang="en"
            >
              EN
            </a>
          </div>

          <a className="cms-blog-nav-cta" href={contactHref}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          className={`mobile-menu-toggle cms-blog-mobile-toggle ${mobileMenuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={
            mobileMenuOpen
              ? isTr
                ? "Menüyü kapat"
                : "Close menu"
              : isTr
                ? "Menüyü aç"
                : "Open menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="work-area-mobile-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        className={`mobile-menu-overlay cms-blog-mobile-overlay ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
        onClick={closeMobileMenu}
      >
        <nav
          id="work-area-mobile-menu"
          className="mobile-menu-panel"
          aria-label={isTr ? "Mobil menü" : "Mobile menu"}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMobileMenu}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <a
              className="mobile-menu-cta"
              href={contactHref}
              onClick={closeMobileMenu}
            >
              {ctaLabel}
              <span aria-hidden="true">↗</span>
            </a>

            <div
              className="mobile-language-switcher"
              aria-label={isTr ? "Dil seçimi" : "Language selection"}
            >
              <a
                className={`language-option ${isTr ? "language-option-active" : ""}`}
                href="/"
                lang="tr"
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

              <span className="language-divider" aria-hidden="true">|</span>

              <a
                className={`language-option ${!isTr ? "language-option-active" : ""}`}
                href="/en"
                lang="en"
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
    </>
  );
}
