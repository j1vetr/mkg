import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";

const COACH_NAME = "Murat Kaan Günaydın";

function scrollToPackages() {
  const el = document.getElementById("paketler");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const legalLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/mesafeli-satis-sozlesmesi", label: "Mesafeli Satış Sözleşmesi" },
  { href: "/iptal-iade", label: "İptal ve İade Koşulları" },
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer style={{ background: "#060606", borderTop: "1px solid #1a1a1a" }}>
      <div className="px-5 md:px-10 max-w-screen-xl mx-auto py-24 md:py-40">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center gap-10"
        >
          <div className="flex items-center justify-center gap-4">
            <div style={{ width: "24px", height: "1px", background: "#444" }} />
            <span className="section-label" style={{ color: "#888" }}>Son Adım</span>
            <div style={{ width: "24px", height: "1px", background: "#444" }} />
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#FAFAFA",
              lineHeight: 1.02,
              maxWidth: "900px",
            }}
          >
            Karar Verdim.
            <br />
            <span style={{ color: "#5a5a5a" }}>Başlamak İstiyorum.</span>
          </h2>

          <p style={{ color: "#A8A8A8", fontSize: "0.95rem", maxWidth: "460px", lineHeight: 1.7 }}>
            Paketini seç, birkaç dakika içinde başvurunu tamamla. Onay sonrası 24 saat içinde sana ulaşıyorum.
          </p>

          <button
            onClick={scrollToPackages}
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
            Başvuruya Başla
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Legal links + brand block */}
      <div style={{ borderTop: "1px solid #1a1a1a" }} className="px-5 md:px-10 max-w-screen-xl mx-auto py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="font-display" style={{ fontSize: "0.92rem", color: "#FAFAFA", letterSpacing: "0.04em", fontWeight: 600 }}>
              {COACH_NAME}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#666", letterSpacing: "0.06em" }}>
              Uzaktan Kişisel Fitness Koçluğu
            </span>
          </div>

          <nav aria-label="Yasal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 max-w-2xl">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-white"
                style={{ color: "#888", fontSize: "0.78rem", letterSpacing: "0.02em" }}
                data-testid={`footer-link-${l.href.replace(/\//g, "")}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-2 pt-2" style={{ borderTop: "1px solid #1a1a1a", paddingTop: "20px", width: "100%" }}>
            <span style={{ color: "#666", fontSize: "0.7rem", letterSpacing: "0.12em" }}>
              © {new Date().getFullYear()} {COACH_NAME} — Tüm Hakları Saklıdır.
            </span>
            <span style={{ color: "#555", fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Ödeme Altyapısı: PayTR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
