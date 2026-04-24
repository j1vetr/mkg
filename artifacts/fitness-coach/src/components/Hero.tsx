import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col"
      style={{ background: "#080808" }}
    >
      <motion.div style={{ y, opacity }} className="flex-1 flex flex-col justify-end pb-16 pt-32 px-6 md:px-10 max-w-screen-xl mx-auto w-full">
        <div className="mb-10 flex items-center gap-4">
          <div className="divider-line" style={{ height: "1px", width: "32px", background: "#333", margin: "0" }} />
          <span className="section-label">Uzaktan Kişisel Koçluk</span>
        </div>

        <h1
          className="font-display leading-none mb-8"
          style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#F5F5F5" }}
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
            style={{ color: "#F5F5F5" }}
          >
            Hazır sonuç.
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="block"
            style={{ color: "#444" }}
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
            style={{ color: "#888", fontSize: "1rem", fontWeight: 400 }}
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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-6 md:px-10 pb-16 max-w-screen-xl mx-auto"
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/7", background: "#111", border: "1px solid #1a1a1a" }}
        >
          <iframe
            src="https://www.youtube.com/embed/u0JdGzqdmIg?rel=0&color=white&modestbranding=1"
            title="Koç Tanıtım Videosu"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            data-testid="hero-video"
          />
        </div>
        <div className="flex justify-between items-center mt-3" style={{ color: "#444", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
          <span>TANITIM</span>
          <span>2024</span>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#fff" }}>KAYDIRIN</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #fff, transparent)" }} />
      </div>
    </section>
  );
}
