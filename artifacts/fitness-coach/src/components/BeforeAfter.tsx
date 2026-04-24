import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// Import all 37 before/after images
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

const allImages = [
  ba0, ba1, ba2, ba3, ba4, ba5, ba6, ba7, ba8, ba9,
  ba10, ba11, ba12, ba13, ba14, ba15, ba16, ba17, ba18, ba19,
  ba20, ba21, ba22, ba23, ba24, ba25, ba26, ba27, ba28, ba29,
  ba30, ba31, ba32, ba33, ba34, ba35, ba36,
];

export default function BeforeAfter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);

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
            <div style={{ width: "32px", height: "1px", background: "#333" }} />
            <span className="section-label">Dönüşümler</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#F0F0F0", lineHeight: 1.1 }}
            >
              Bunlar tesadüf değil.
              <br />
              <span style={{ color: "#444" }}>Bunlar sistem.</span>
            </h2>
            <p style={{ color: "#555", fontSize: "0.85rem", maxWidth: "280px", lineHeight: 1.6 }}>
              Bu kişiler senden farklı değildi. Doğru sistemi buldular.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto scroll-hide pb-4"
          style={{
            paddingLeft: "max(24px, calc((100vw - 1280px) / 2 + 40px))",
            paddingRight: "max(24px, calc((100vw - 1280px) / 2 + 40px))",
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {allImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.5), ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 overflow-hidden"
              style={{
                width: "clamp(200px, 28vw, 340px)",
                aspectRatio: "3/4",
                background: "#111",
                border: "1px solid #1a1a1a",
              }}
            >
              <img
                src={src}
                alt={`Dönüşüm ${i + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                style={{ filter: "brightness(0.95) contrast(1.05)" }}
                draggable={false}
              />
            </motion.div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-4 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-4 w-16 pointer-events-none" style={{ background: "linear-gradient(to left, #080808, transparent)" }} />
      </div>

      <div className="px-6 md:px-10 max-w-screen-xl mx-auto mt-8">
        <div className="flex items-center gap-3" style={{ color: "#333" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M3 8L6 5M3 8L6 11" stroke="currentColor" strokeWidth="1" />
            <path d="M13 8L10 5M13 8L10 11" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#444" }}>SÜRÜKLEYIN</span>
        </div>
      </div>
    </section>
  );
}
