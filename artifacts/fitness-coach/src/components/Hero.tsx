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
            fontSize: "clamp(2.6rem, 6.2vw, 5.6rem)",
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

        {/* CTA — centered, outline button (original style) with shorter, more assertive copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <button
            onClick={scrollToPackages}
            className="font-display font-medium tracking-wider border border-white text-white hover:bg-white hover:text-black px-10 py-4 transition-all duration-400 text-sm"
            style={{ letterSpacing: "0.14em" }}
            data-testid="hero-cta-button"
          >
            YERİNİ AL
          </button>

          {/* Editorial scroll cue — replaces the urgency dots line, mirrors the section-label aesthetic */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex items-center justify-center gap-3"
            style={{ color: "#888" }}
          >
            <span style={{ height: "1px", width: "24px", background: "#444" }} />
            <span
              className="font-display"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em", fontWeight: 500 }}
            >
              PAKETLERİ KEŞFET
            </span>
            <span style={{ height: "1px", width: "24px", background: "#444" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
