import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCheckout } from "@/checkout/CheckoutContext";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { open } = useCheckout();

  return (
    <footer style={{ background: "#060606", borderTop: "1px solid #1a1a1a" }}>
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto py-28 md:py-40">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start gap-12"
        >
          <div className="flex items-center gap-4">
            <div style={{ width: "32px", height: "1px", background: "#555" }} />
            <span className="section-label" style={{ color: "#999" }}>Son adım</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#FAFAFA",
              lineHeight: 1,
              maxWidth: "900px",
            }}
          >
            Karar verdim.
            <br />
            <span style={{ color: "#5a5a5a" }}>Başlamak istiyorum.</span>
          </h2>

          <p style={{ color: "#A8A8A8", fontSize: "0.95rem", maxWidth: "460px", lineHeight: 1.7 }}>
            Paketini seç, birkaç dakika içinde başvurunu tamamla. Onay sonrası 24 saat içinde sana ulaşıyorum.
          </p>

          <button
            onClick={() => open("6-ay")}
            className="inline-flex items-center gap-4 font-display font-medium uppercase transition-all duration-300"
            style={{
              border: "1px solid #fff",
              color: "#fff",
              padding: "18px 40px",
              fontSize: "0.85rem",
              letterSpacing: "0.14em",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#fff";
              (e.currentTarget as HTMLElement).style.color = "#000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            data-testid="footer-cta"
          >
            Başvuruya başla
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </motion.div>
      </div>

      <div style={{ borderTop: "1px solid #1a1a1a" }} className="px-6 md:px-10 max-w-screen-xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-display font-bold text-sm" style={{ color: "#888" }}>KOÇ.</span>
          <span style={{ color: "#777", fontSize: "0.7rem", letterSpacing: "0.12em" }}>
            © {new Date().getFullYear()} — Tüm hakları saklıdır.
          </span>
        </div>
      </div>
    </footer>
  );
}
