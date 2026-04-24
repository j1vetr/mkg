import { motion } from "framer-motion";
import { Link } from "wouter";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "#060606", color: "#FAFAFA" }}
      data-testid="not-found-page"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display"
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.32em",
          color: "#666",
          marginBottom: "32px",
        }}
      >
        — HATA · 404
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
        className="font-display text-center"
        style={{
          fontSize: "clamp(4.5rem, 18vw, 10rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.92,
          marginBottom: "8px",
        }}
      >
        404
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
        className="font-display text-center"
        style={{
          fontSize: "clamp(1.4rem, 4vw, 2.1rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginTop: "8px",
        }}
      >
        Sayfa Bulunamadı.
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.28 }}
        className="text-center"
        style={{
          color: "#888",
          fontSize: "0.95rem",
          letterSpacing: "0.01em",
          maxWidth: "440px",
          marginTop: "20px",
          lineHeight: 1.55,
        }}
      >
        Aradığın sayfa burada değil. Belki taşındı, belki silindi — ya da hiç var olmadı.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-12"
      >
        <Link
          href="/"
          className="font-display"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAFAFA",
            color: "#060606",
            padding: "16px 28px",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            fontWeight: 600,
            transition: "transform 0.3s",
          }}
          data-testid="not-found-home"
        >
          ANA SAYFAYA DÖN
        </Link>
        <Link
          href="/#paketler"
          className="font-display"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#FAFAFA",
            padding: "16px 28px",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            fontWeight: 600,
            background: "transparent",
          }}
          data-testid="not-found-packages"
        >
          PAKETLERE GÖZ AT
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="font-display"
        style={{
          marginTop: "64px",
          fontSize: "0.62rem",
          letterSpacing: "0.32em",
          color: "#444",
        }}
      >
        MURAT KAAN GÜNAYDIN
      </motion.div>
    </div>
  );
}
