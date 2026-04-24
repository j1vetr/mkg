import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const packages = [
  {
    id: "3-ay",
    num: "01",
    duration: "3 Ay",
    price: 6400,
    monthly: "2.133",
    highlight: false,
    tag: null,
    isConsult: false,
    blurb: "İlk somut dönüşüm için yeterli süre. Sürece adapte olur, alışkanlıkları yerleşir.",
  },
  {
    id: "6-ay",
    num: "02",
    duration: "6 Ay",
    price: 9600,
    monthly: "1.600",
    highlight: true,
    tag: "En çok tercih edilen",
    isConsult: false,
    blurb: "Kalıcı sonuç için altın denge. Çoğu danışanım bu süreçte fizyolojik olarak resetlenir.",
  },
  {
    id: "12-ay",
    num: "03",
    duration: "12 Ay",
    price: 16000,
    monthly: "1.333",
    highlight: false,
    tag: null,
    isConsult: false,
    blurb: "Hayat tarzı dönüşümü için tam süre. Aylık maliyet en düşük seviyede.",
  },
  {
    id: "gorusme",
    num: "04",
    duration: "30dk Görüşme",
    price: 7000,
    monthly: null,
    highlight: false,
    tag: null,
    isConsult: true,
    blurb: "Başlamadan önce sürecin sana uyup uymadığını anlamak için birebir video görüşme.",
  },
];

const features = [
  "Kişiye Özel Antrenman Programı",
  "Kişiye Özel Beslenme Programı",
  "Supplement Planlaması",
  "Profesyonel Ürün Planlaması",
  "Kan Tahlili İnceleme & Yorum",
  "7/24 WhatsApp İletişimi",
  "Haftalık Form Kontrolü & Revizyon",
];

const WA_LINK = "https://wa.me/905XXXXXXXXX";

function PackageCard({ pkg, i, inView }: { pkg: typeof packages[0]; i: number; inView: boolean }) {
  const [hover, setHover] = useState(false);
  const dark = !pkg.highlight;
  const fg = dark ? "#FAFAFA" : "#0a0a0a";
  const fgMuted = dark ? "rgba(250,250,250,0.55)" : "rgba(10,10,10,0.55)";
  const fgVeryMuted = dark ? "rgba(250,250,250,0.4)" : "rgba(10,10,10,0.4)";
  const hairline = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.12)";
  const hairlineStrong = dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)";

  const formattedPrice = pkg.price.toLocaleString("tr-TR");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex flex-col"
      style={{
        background: dark ? (hover ? "#101010" : "#0a0a0a") : "#FAFAFA",
        color: fg,
        padding: "44px 32px 36px",
        transition: "background 0.5s ease, transform 0.5s ease",
        minHeight: "660px",
        transform: hover && !pkg.highlight ? "translateY(-4px)" : "translateY(0)",
      }}
      data-testid={`package-card-${pkg.id}`}
    >
      {pkg.highlight && (
        <div
          className="absolute -top-px left-0 right-0 flex items-center justify-center gap-2 py-2"
          style={{
            background: "#0a0a0a",
            color: "#fff",
            fontSize: "0.62rem",
            letterSpacing: "0.24em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: "4px", height: "4px", background: "#fff", borderRadius: "50%" }} />
          {pkg.tag}
          <span style={{ width: "4px", height: "4px", background: "#fff", borderRadius: "50%" }} />
        </div>
      )}

      <div style={{ paddingTop: pkg.highlight ? "20px" : "0" }} className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-12">
          <div>
            <span
              className="font-display block"
              style={{ fontSize: "0.7rem", letterSpacing: "0.24em", fontWeight: 500, color: fgVeryMuted, textTransform: "uppercase" }}
            >
              Sistem · {pkg.num}
            </span>
            <span
              className="font-display block mt-2"
              style={{ fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.02em", color: fg }}
            >
              {pkg.duration}
            </span>
          </div>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <span
            className="font-display"
            style={{
              fontSize: "clamp(2.8rem, 5.2vw, 4.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
              color: fg,
            }}
          >
            {formattedPrice}
          </span>
          <span style={{ fontSize: "0.8rem", color: fgMuted, fontWeight: 500, letterSpacing: "0.06em" }}>TL</span>
        </div>

        <div className="mb-7 h-5">
          {pkg.monthly && (
            <span style={{ fontSize: "0.75rem", color: fgMuted, letterSpacing: "0.04em" }}>
              ≈ ayda {pkg.monthly} TL
            </span>
          )}
        </div>

        <p
          className="mb-9"
          style={{ fontSize: "0.9rem", lineHeight: 1.6, color: fgMuted, maxWidth: "280px" }}
        >
          {pkg.blurb}
        </p>

        {!pkg.isConsult ? (
          <div className="flex-1 mb-10" style={{ borderTop: `1px solid ${hairline}` }}>
            {features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <span
                  className="font-display shrink-0"
                  style={{
                    fontSize: "0.65rem",
                    color: fgVeryMuted,
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                    width: "16px",
                  }}
                >
                  —
                </span>
                <span style={{ fontSize: "0.83rem", lineHeight: 1.45, color: fg, opacity: 0.92 }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 mb-10" style={{ borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}`, padding: "20px 0" }}>
            <span
              className="font-display block mb-4"
              style={{ fontSize: "0.65rem", color: fgVeryMuted, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Tek Seferlik Görüşme
            </span>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: fg, opacity: 0.85 }}>
              30 dakikalık birebir video görüşme. Hedeflerini, mevcut durumunu ve sürecin sana uygunluğunu birlikte değerlendiririz.
            </p>
          </div>
        )}

        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta flex items-center justify-between transition-all duration-500"
          style={{
            paddingTop: "20px",
            paddingBottom: "4px",
            borderTop: `1px solid ${hairlineStrong}`,
            color: fg,
          }}
          data-testid={`package-cta-${pkg.id}`}
        >
          <span
            className="font-display"
            style={{ fontSize: "0.78rem", letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}
          >
            Başvur
          </span>
          <span
            className="relative flex items-center justify-center transition-all duration-500"
            style={{
              width: hover ? "44px" : "32px",
              height: "32px",
              border: `1px solid ${hairlineStrong}`,
              color: fg,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="paketler" style={{ background: "#060606", borderTop: "1px solid #1a1a1a" }} className="py-28 md:py-40">
      <div className="px-6 md:px-10 max-w-screen-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: "32px", height: "1px", background: "#555" }} />
            <span className="section-label" style={{ color: "#999" }}>Paketler</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1.1, maxWidth: "780px" }}
            >
              Dönüşüme yatırım yapmanın
              <br />
              <span style={{ color: "#5a5a5a" }}>tek doğru zamanı şimdi.</span>
            </h2>
            <div style={{ maxWidth: "320px" }}>
              <p style={{ color: "#A8A8A8", lineHeight: 1.7, fontSize: "0.95rem" }}>
                Sınırlı kontenjanla çalışıyorum. Her danışana gereken ilgiyi verebilmek için kapasitemi düşük tutuyorum.
              </p>
              <div className="flex items-center gap-3 mt-5" style={{ color: "#777" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#fff" }} />
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.18em", fontWeight: 500 }}>
                  Mayıs için kontenjan açık
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          style={{ background: "#1a1a1a", gap: "1px" }}
        >
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ color: "#777" }}
        >
          <div className="flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
              <path d="M7 4V8M7 10V10.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}>
              Tüm paketler aynı kalitede koçluk hizmetini içerir. Süre uzadıkça aylık maliyet düşer.
            </span>
          </div>
          <span className="font-display shrink-0" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", fontWeight: 500 }}>
            KDV DAHİL
          </span>
        </motion.div>
      </div>
    </section>
  );
}
