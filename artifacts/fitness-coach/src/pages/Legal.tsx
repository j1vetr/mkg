import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { LEGAL_DOCS } from "./legalContent";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LegalPage({ slug }: { slug: string }) {
  const doc = LEGAL_DOCS[slug];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Move focus to the heading for screen-reader / keyboard users on route change
    const t = window.setTimeout(() => {
      headingRef.current?.focus();
    }, 60);
    return () => window.clearTimeout(t);
  }, [slug]);

  if (!doc) {
    return (
      <div style={{ background: "#080808", minHeight: "100vh" }} className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <span className="font-display" style={{ color: "#666", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Sayfa Bulunamadı
        </span>
        <Link
          href="/"
          className="mt-6 font-display"
          style={{ color: "#FAFAFA", fontSize: "0.85rem", letterSpacing: "0.1em", textDecoration: "underline" }}
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#080808", minHeight: "100vh", color: "#FAFAFA" }}>
      <div className="grain-overlay" />

      {/* Top bar */}
      <div
        className="sticky top-0 z-20"
        style={{
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            data-testid="legal-back-home"
          >
            <span
              className="flex items-center justify-center transition-colors"
              style={{
                width: "32px",
                height: "32px",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#aaa",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <span className="font-display font-bold text-base tracking-tight" style={{ color: "#FAFAFA" }}>
              KOÇ<span style={{ opacity: 0.3 }}>.</span>
            </span>
          </Link>
          <span
            className="font-display"
            style={{ fontSize: "0.62rem", color: "#666", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}
          >
            Yasal
          </span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-3 mb-6" style={{ color: "#666" }}>
            <div style={{ width: "20px", height: "1px", background: "#444" }} />
            <span className="section-label">Belge</span>
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display outline-none"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 2.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            {doc.title}
          </h1>

          {doc.intro && (
            <p
              style={{
                color: "#A8A8A8",
                fontSize: "1rem",
                lineHeight: 1.7,
                maxWidth: "640px",
                marginBottom: "12px",
              }}
            >
              {doc.intro}
            </p>
          )}

          <span
            className="block"
            style={{ fontSize: "0.7rem", color: "#666", letterSpacing: "0.04em" }}
          >
            Son güncelleme: {doc.updatedAt}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 md:mt-16 space-y-10 md:space-y-12"
        >
          {doc.sections.map((section, i) => (
            <section key={i} style={{ borderTop: i === 0 ? "1px solid #1f1f1f" : undefined, paddingTop: i === 0 ? "32px" : 0 }}>
              {section.heading && (
                <h2
                  className="font-display mb-5"
                  style={{
                    fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    color: "#FAFAFA",
                  }}
                >
                  {section.heading}
                </h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  style={{
                    color: "#C5C5C5",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    marginBottom: "14px",
                  }}
                >
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 space-y-2.5" style={{ color: "#C5C5C5", fontSize: "0.93rem", lineHeight: 1.7 }}>
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-3">
                      <span style={{ color: "#666", marginTop: "10px", flexShrink: 0, width: "10px", height: "1px", background: "#666" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-10 flex flex-col items-center text-center gap-4"
          style={{ borderTop: "1px solid #1f1f1f" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-display uppercase transition-colors hover:text-white"
            style={{
              color: "#aaa",
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}
            data-testid="legal-back-home-bottom"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          <span style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "0.14em" }}>
            © {new Date().getFullYear()} Murat Kaan Günaydın
          </span>
        </motion.div>
      </article>
    </div>
  );
}
