import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckout } from "@/checkout/CheckoutContext";

const YOUTUBE_ID = "u0JdGzqdmIg";
const THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(14px)" }}
          onClick={onClose}
          data-testid="video-modal"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/60 transition-colors"
            data-testid="video-modal-close"
            aria-label="Kapat"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1400px]"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -inset-px" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&color=white`}
              title="Tanıtım"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none", background: "#000" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const { open: openCheckout } = useCheckout();

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

        {/* Big H1 — centered */}
        <h1
          className="font-display leading-none mb-12 md:mb-16 text-center"
          style={{ fontSize: "clamp(2.6rem, 9vw, 8.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA" }}
        >
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Hazır Program.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="block"
          >
            Hazır Sonuç.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="block"
            style={{ color: "#3a3a3a" }}
          >
            Bu İllüzyon Bitti.
          </motion.span>
        </h1>

        {/* Video block — centered, comes right after title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-12 md:mb-16"
        >
          <div className="max-w-[1200px] mx-auto">
            <button
              onClick={() => setOpen(true)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="group relative w-full overflow-hidden block"
              style={{
                aspectRatio: "16/9",
                background: "#0a0a0a",
                border: "1px solid #1a1a1a",
                cursor: "pointer",
              }}
              data-testid="hero-video-trigger"
              aria-label="Tanıtım videosunu oynat"
            >
              <img
                src={THUMBNAIL}
                alt="Tanıtım videosu"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out"
                style={{
                  filter: "brightness(0.55) contrast(1.05) saturate(0.85)",
                  transform: hover ? "scale(1.04)" : "scale(1)",
                }}
              />

              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.5) 100%)" }}
              />

              {/* Play button — much smaller on mobile */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative flex items-center justify-center transition-all duration-500"
                  style={{
                    width: "clamp(56px, 9vw, 104px)",
                    height: "clamp(56px, 9vw, 104px)",
                    transform: hover ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-full transition-all duration-500"
                    style={{
                      border: "1px solid rgba(255,255,255,0.55)",
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full transition-all duration-500"
                    style={{
                      background: hover ? "#fff" : "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(8px)",
                    }}
                  />
                  <svg
                    viewBox="0 0 22 26"
                    fill="none"
                    className="relative z-10 transition-colors duration-300"
                    style={{
                      marginLeft: "3px",
                      color: hover ? "#000" : "#fff",
                      width: "clamp(16px, 2.6vw, 22px)",
                      height: "clamp(20px, 3vw, 26px)",
                    }}
                  >
                    <path d="M0 0L22 13L0 26V0Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* TANITIM label — no pulsing dot */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2.5">
                <div style={{ width: "16px", height: "1px", background: "rgba(255,255,255,0.6)" }} />
                <span
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.6rem", letterSpacing: "0.22em", fontWeight: 600 }}
                >
                  TANITIM
                </span>
              </div>

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 max-w-[60%]">
                <span
                  className="font-display block"
                  style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(0.82rem, 1.4vw, 1.15rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2 }}
                >
                  İzlemeden Karar Verme.
                </span>
                <span
                  className="block mt-1"
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.62rem, 0.9vw, 0.75rem)" }}
                >
                  Tanıtım Videosu
                </span>
              </div>

              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 hidden sm:flex items-center gap-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.14em", fontWeight: 500 }}>OYNAT</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L12 6M16 10L12 14" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Description + CTA — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-8 md:gap-10 max-w-2xl mx-auto"
        >
          <p
            className="leading-relaxed"
            style={{ color: "#B0B0B0", fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", fontWeight: 400, lineHeight: 1.65 }}
          >
            Sen zaten denediğin her şeyin neden işe yaramadığını biliyorsun. Kalıplaşmış listeler değil — sana özel bilimsel bir sistem. Gerçek dönüşüm, programın sana uymasıyla başlar.
          </p>

          <button
            onClick={() => openCheckout("6-ay")}
            className="font-display font-medium tracking-wider border border-white text-white hover:bg-white hover:text-black px-10 py-4 transition-all duration-400 text-sm uppercase"
            style={{ letterSpacing: "0.14em" }}
            data-testid="hero-cta-button"
          >
            Başvur ve Değiş
          </button>
        </motion.div>
      </div>

      <VideoModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
