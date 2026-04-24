import { useRef } from "react";
import { motion } from "framer-motion";

const YOUTUBE_ID = "u0JdGzqdmIg";

function scrollToPackages() {
  const el = document.getElementById("paketler");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative pt-20 md:pt-24 pb-20"
      style={{ background: "#080808" }}
    >
      <div className="px-5 md:px-10 max-w-screen-xl mx-auto w-full">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8 md:mb-10"
        >
          <div style={{ height: "1px", width: "24px", background: "#444" }} />
          <span className="section-label" style={{ color: "#888" }}>Uzaktan Kişisel Koçluk</span>
          <div style={{ height: "1px", width: "24px", background: "#444" }} />
        </motion.div>

        {/* Big H1 — centered, with generous breathing room between lines */}
        <h1
          className="font-display mb-16 md:mb-20 text-center"
          style={{
            fontSize: "clamp(2.6rem, 9vw, 8.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#FAFAFA",
            lineHeight: 1.22,
          }}
        >
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block"
            style={{ paddingBottom: "0.12em" }}
          >
            Hazır Program.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="block"
            style={{ paddingBottom: "0.12em" }}
          >
            Hazır Sonuç.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="block relative hero-illusion-line"
            style={{
              paddingBottom: "0.08em",
              fontStyle: "italic",
              letterSpacing: "-0.025em",
            }}
            data-testid="hero-illusion-line"
          >
            Bu{" "}
            <span className="relative inline-block">
              İllüzyon
              {/* Animated strike-through that draws across just the word "İllüzyon" */}
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: "55%",
                  height: "3px",
                  background: "#FAFAFA",
                  transformOrigin: "left center",
                }}
              />
            </span>{" "}
            Bitti.
          </motion.span>
        </h1>

        {/* Video block — autoplay muted inline, comes right after title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-12 md:mb-16"
        >
          <div className="max-w-[1200px] mx-auto">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16/9",
                background: "#0a0a0a",
                border: "1px solid #1a1a1a",
              }}
              data-testid="hero-video"
            >
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&color=white`}
                title="Tanıtım"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none", background: "#000" }}
              />

              {/* TANITIM label — sits above the iframe but doesn't block its controls */}
              <div
                className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2.5 pointer-events-none"
                style={{ zIndex: 2 }}
              >
                <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    fontWeight: 600,
                    textShadow: "0 0 12px rgba(0,0,0,0.6)",
                  }}
                >
                  TANITIM
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA — centered, bold, with arrow circle that animates on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <button
            onClick={scrollToPackages}
            className="hero-cta group relative inline-flex items-center bg-white text-black overflow-hidden"
            style={{
              paddingLeft: "clamp(28px, 4vw, 40px)",
              paddingRight: "clamp(8px, 1.2vw, 12px)",
              paddingTop: "clamp(8px, 1.2vw, 12px)",
              paddingBottom: "clamp(8px, 1.2vw, 12px)",
              gap: "clamp(20px, 2.5vw, 32px)",
              transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
            }}
            data-testid="hero-cta-button"
            aria-label="Başvur ve Değiş — paket seçimine git"
          >
            {/* Sweep highlight on hover — soft dark tint that travels across the white button */}
            <span
              aria-hidden
              className="hero-cta-sweep pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, transparent 25%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.10) 55%, transparent 75%)",
              }}
            />
            <span
              className="font-display relative z-10"
              style={{
                fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)",
                letterSpacing: "0.16em",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Başvur ve Değiş
            </span>
            <span
              className="hero-cta-arrow relative z-10 flex items-center justify-center bg-black text-white shrink-0"
              style={{
                width: "clamp(48px, 5vw, 60px)",
                height: "clamp(48px, 5vw, 60px)",
                borderRadius: "9999px",
                transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 11h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </span>
          </button>

          {/* Urgency micro-line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex items-center justify-center gap-3"
            style={{ color: "#7a7a7a" }}
          >
            <span style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#FAFAFA" }} />
            <span
              className="font-display"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em", fontWeight: 500, textTransform: "uppercase" }}
            >
              Sınırlı Kontenjan · 60 Saniyede Başvur
            </span>
            <span style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#FAFAFA" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
