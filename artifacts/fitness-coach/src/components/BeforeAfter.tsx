import { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useBeforeAfter, objectUrl } from "@/lib/usePublicData";

import ba0 from "@assets/before_after/ba_0.jpg";
import ba1 from "@assets/before_after/ba_1.jpg";
import ba2 from "@assets/before_after/ba_2.jpg";
import ba3 from "@assets/before_after/ba_3.jpg";
import ba4 from "@assets/before_after/ba_4.jpg";
import ba5 from "@assets/before_after/ba_5.jpg";
import ba6 from "@assets/before_after/ba_6.jpg";
import ba7 from "@assets/before_after/ba_7.jpg";
import ba8 from "@assets/before_after/ba_8.jpg";
import ba9 from "@assets/before_after/ba_9.jpg";
import ba10 from "@assets/before_after/ba_10.jpg";
import ba11 from "@assets/before_after/ba_11.jpg";
import ba12 from "@assets/before_after/ba_12.jpg";
import ba13 from "@assets/before_after/ba_13.jpg";
import ba14 from "@assets/before_after/ba_14.jpg";
import ba15 from "@assets/before_after/ba_15.jpg";
import ba16 from "@assets/before_after/ba_16.jpg";
import ba17 from "@assets/before_after/ba_17.jpg";
import ba18 from "@assets/before_after/ba_18.jpg";
import ba19 from "@assets/before_after/ba_19.jpg";
import ba20 from "@assets/before_after/ba_20.jpg";
import ba21 from "@assets/before_after/ba_21.jpg";
import ba22 from "@assets/before_after/ba_22.jpg";
import ba23 from "@assets/before_after/ba_23.jpg";
import ba24 from "@assets/before_after/ba_24.jpg";
import ba25 from "@assets/before_after/ba_25.jpg";
import ba26 from "@assets/before_after/ba_26.jpg";
import ba27 from "@assets/before_after/ba_27.jpg";
import ba28 from "@assets/before_after/ba_28.jpg";
import ba29 from "@assets/before_after/ba_29.jpg";
import ba30 from "@assets/before_after/ba_30.jpg";
import ba31 from "@assets/before_after/ba_31.jpg";
import ba32 from "@assets/before_after/ba_32.jpg";
import ba33 from "@assets/before_after/ba_33.jpg";
import ba34 from "@assets/before_after/ba_34.jpg";
import ba35 from "@assets/before_after/ba_35.jpg";
import ba36 from "@assets/before_after/ba_36.jpg";

const fallbackImages = [
  ba0, ba1, ba2, ba3, ba4, ba5, ba6, ba7, ba8, ba9,
  ba10, ba11, ba12, ba13, ba14, ba15, ba16, ba17, ba18, ba19,
  ba20, ba21, ba22, ba23, ba24, ba25, ba26, ba27, ba28, ba29,
  ba30, ba31, ba32, ba33, ba34, ba35, ba36,
];

interface Slide {
  src: string;
  thumb: string;
  caption: string | null;
}

function Lightbox({ slides, idx, onClose, onPrev, onNext }: { slides: Slide[]; idx: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
      data-testid="ba-lightbox"
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white border border-white/20 hover:border-white/60 transition-colors z-10"
        aria-label="Kapat"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white border border-white/15 hover:border-white/50 transition-colors z-10"
        aria-label="Önceki"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white border border-white/15 hover:border-white/50 transition-colors z-10"
        aria-label="Sonraki"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>

      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={slides[idx]?.src ?? ""}
          alt={slides[idx]?.caption ?? `Dönüşüm ${idx + 1}`}
          className="max-w-full max-h-[78vh] object-contain"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        />
        <div className="mt-5 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.18em", fontWeight: 600 }}>DÖNÜŞÜM</span>
          <span style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>
            {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          {slides[idx]?.caption && (
            <>
              <span style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.7)" }}>{slides[idx].caption}</span>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BeforeAfter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [moved, setMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { data: liveData } = useBeforeAfter();

  // After a mouse drag ends (or any imperative scroll), nudge the track to the
  // nearest card so it never gets stuck between two photos. Native touch scroll
  // already snaps via CSS scroll-snap, but JS-driven mouse drag bypasses that.
  const snapToNearest = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-ba-card]"));
    if (cards.length === 0) return;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const center = r.left + r.width / 2;
      const d = Math.abs(center - trackCenter);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    const target = cards[bestIdx];
    const tRect = target.getBoundingClientRect();
    const offset = tRect.left + tRect.width / 2 - trackCenter;
    track.scrollBy({ left: offset, behavior: "smooth" });
  };

  const slides: Slide[] = useMemo(() => {
    const live = liveData?.items ?? [];
    if (live.length > 0) {
      return live.map((m) => ({
        src: objectUrl(m.objectPath) ?? "",
        thumb: objectUrl(m.thumbObjectPath ?? m.objectPath) ?? "",
        caption: m.caption,
      }));
    }
    return fallbackImages.map((src) => ({ src, thumb: src, caption: null }));
  }, [liveData]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setDragging(true);
    setMoved(false);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 5) setMoved(true);
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (dragging && moved) snapToNearest();
    setDragging(false);
  };
  const handleMouseLeave = () => {
    if (dragging && moved) snapToNearest();
    setDragging(false);
  };

  const openLightbox = (i: number) => {
    if (moved) return;
    setLightboxIdx(i);
  };

  return (
    <section id="donusumler" className="py-28 md:py-40" style={{ background: "#080808" }}>
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto mb-14 md:mb-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: "32px", height: "1px", background: "#555" }} />
            <span className="section-label" style={{ color: "#999" }}>Dönüşümler</span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1.1 }}
          >
            Bunlar Tesadüf Değil.
            <br />
            <span style={{ color: "#5a5a5a" }}>Bunlar Sistem.</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scroll-hide pb-6"
          style={{
            paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 40px))",
            paddingRight: "max(24px, calc((100vw - 1280px) / 2 + 40px))",
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
            // Native touch panning — horizontal swipe scrolls the track,
            // vertical swipe still scrolls the page.
            touchAction: "pan-x pan-y",
            WebkitOverflowScrolling: "touch",
            // Snap to the nearest card so the carousel never stops between
            // two photos. `scroll-snap-stop: always` (set on each card) keeps
            // each swipe to a single card at a time.
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 40px))",
            scrollPaddingRight: "max(24px, calc((100vw - 1280px) / 2 + 40px))",
            overscrollBehaviorX: "contain",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          data-testid="ba-track"
        >
          {slides.map((slide, i) => {
            const aspectRatios = ["3/4", "4/5", "3/4", "2/3"];
            const aspect = aspectRatios[i % aspectRatios.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.6), ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 group relative overflow-hidden"
                style={{
                  width: "clamp(320px, 38vw, 500px)",
                  aspectRatio: aspect,
                  background: "#0d0d0d",
                  border: "1px solid #1f1f1f",
                  cursor: "zoom-in",
                  scrollSnapAlign: "center",
                  scrollSnapStop: "always",
                }}
                data-ba-card
                onClick={() => openLightbox(i)}
                data-testid={`ba-card-${i}`}
              >
                <img
                  src={slide.thumb}
                  alt={slide.caption ?? `Dönüşüm ${i + 1}`}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ filter: "brightness(0.92) contrast(1.08) saturate(0.95)" }}
                  draggable={false}
                  loading="lazy"
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)" }}
                />

                <div className="absolute top-5 left-5 flex items-center gap-2.5 opacity-90">
                  <span className="font-display" style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.7rem", letterSpacing: "0.16em", fontWeight: 600 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.4)" }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.65rem", letterSpacing: "0.18em", fontWeight: 500 }}>
                    DÖNÜŞÜM
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                  <span className="font-display" style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    Detay için tıkla
                  </span>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: "#fff" }}>
                    <path d="M5 17L17 5M17 5H8M17 5V14" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute left-0 top-0 bottom-6 w-24 pointer-events-none" style={{ background: "linear-gradient(to right, #080808 10%, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-6 w-24 pointer-events-none" style={{ background: "linear-gradient(to left, #080808 10%, transparent)" }} />
      </div>

      <div className="px-6 md:px-10 max-w-screen-xl mx-auto mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3" style={{ color: "#777" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9H15M3 9L6 6M3 9L6 12" stroke="currentColor" strokeWidth="1" />
            <path d="M15 9L12 6M15 9L12 12" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.18em", fontWeight: 500 }}>SÜRÜKLE VEYA TIKLA</span>
        </div>
        <span className="font-display hidden md:block" style={{ color: "#444", fontSize: "0.7rem", letterSpacing: "0.14em", fontWeight: 500 }}>
          {slides.length} GERÇEK SONUÇ
        </span>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            slides={slides}
            idx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx((p) => (p === null ? null : (p - 1 + slides.length) % slides.length))}
            onNext={() => setLightboxIdx((p) => (p === null ? null : (p + 1) % slides.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
