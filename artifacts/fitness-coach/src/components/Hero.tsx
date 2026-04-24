import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const YOUTUBE_ID = "u0JdGzqdmIg";
const THUMBNAIL = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative pt-24 md:pt-32 pb-20"
      style={{ background: "#080808" }}
    >
      <motion.div style={{ y, opacity }} className="px-6 md:px-10 max-w-screen-xl mx-auto w-full mb-16 md:mb-24">
        <div className="mb-10 flex items-center gap-4">
          <div style={{ height: "1px", width: "32px", background: "#444" }} />
          <span className="section-label" style={{ color: "#888" }}>Uzaktan Kişisel Koçluk</span>
        </div>

        <h1
          className="font-display leading-none mb-10"
          style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA" }}
        >
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Hazır program.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="block"
          >
            Hazır sonuç.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="block"
            style={{ color: "#3a3a3a" }}
          >
            Bu illüzyon bitti.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16"
        >
          <p
            className="max-w-md leading-relaxed"
            style={{ color: "#B0B0B0", fontSize: "1.05rem", fontWeight: 400, lineHeight: 1.6 }}
          >
            Sen zaten denediğin her şeyin neden işe yaramadığını biliyorsun. Kalıplaşmış listeler değil — sana özel bilimsel bir sistem. Gerçek dönüşüm, programın sana uymasıyla başlar.
          </p>

          <button
            onClick={() => { const el = document.querySelector("#paketler"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="shrink-0 font-display font-medium tracking-wider border border-white text-white hover:bg-white hover:text-black px-8 py-4 transition-all duration-400 text-sm uppercase"
            style={{ letterSpacing: "0.12em" }}
            data-testid="hero-cta-button"
          >
            Başvur ve Değiş
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-3 md:px-6"
      >
        <div className="max-w-[1500px] mx-auto">
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
            aria-label="Videoyu oynat"
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

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative flex items-center justify-center transition-all duration-500"
                style={{
                  width: hover ? "120px" : "104px",
                  height: hover ? "120px" : "104px",
                }}
              >
                <span
                  className="absolute inset-0 rounded-full transition-all duration-700"
                  style={{
                    border: "1px solid rgba(255,255,255,0.4)",
                    transform: hover ? "scale(1.4)" : "scale(1)",
                    opacity: hover ? 0 : 1,
                  }}
                />
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
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none" className="relative z-10 transition-colors duration-300" style={{ marginLeft: "4px", color: hover ? "#000" : "#fff" }}>
                  <path d="M0 0L22 13L0 26V0Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#fff", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
              />
              <span
                style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.65rem", letterSpacing: "0.22em", fontWeight: 600 }}
              >
                TANITIM
              </span>
            </div>

            <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7">
              <span
                className="font-display block"
                style={{ color: "rgba(255,255,255,0.95)", fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                İzlemeden karar verme.
              </span>
              <span
                className="block mt-1"
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}
              >
                Tanıtım Videosu
              </span>
            </div>

            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.14em", fontWeight: 500 }}>OYNAT</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L12 6M16 10L12 14" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </button>
        </div>
      </motion.div>

      <VideoModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
