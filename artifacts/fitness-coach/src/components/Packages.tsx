import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const packages = [
  {
    id: "3-ay",
    label: "3 Aylık",
    duration: "3 Ay",
    price: "6.400",
    unit: "TL",
    highlight: false,
    tag: null,
  },
  {
    id: "6-ay",
    label: "6 Aylık",
    duration: "6 Ay",
    price: "9.600",
    unit: "TL",
    highlight: true,
    tag: "En Çok Tercih Edilen",
  },
  {
    id: "12-ay",
    label: "12 Aylık",
    duration: "12 Ay",
    price: "16.000",
    unit: "TL",
    highlight: false,
    tag: null,
  },
  {
    id: "gorusme",
    label: "Görüşme",
    duration: "30dk Video",
    price: "7.000",
    unit: "TL",
    highlight: false,
    tag: null,
    isConsult: true,
  },
];

const features = [
  "Kişiye Özel Antrenman Programı",
  "Kişiye Özel Beslenme Programı",
  "İsteğe Bağlı Supplement Planlaması",
  "Profesyonel Ürün Planlaması",
  "Kan Tahlili İnceleme ve Yorumlama",
  "7/24 WhatsApp İletişimi",
  "Haftalık Form Kontrolü ve Program Revizyonu",
];

const WA_LINK = "https://wa.me/905XXXXXXXXX";

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="paketler" style={{ background: "#060606", borderTop: "1px solid #111" }} className="py-28 md:py-40">
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
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1.1 }}
          >
            Dönüşüme yatırım yapmanın
            <br />
            <span style={{ color: "#5a5a5a" }}>tek doğru zamanı şimdi.</span>
          </h2>
          <p style={{ color: "#A8A8A8", marginTop: "24px", maxWidth: "520px", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Sınırlı kontenjanla çalışıyorum. Her müşteriye gereken ilgiyi verebilmek için kapasitemi düşük tutuyorum.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px" style={{ background: "#1a1a1a" }}>
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col p-8 md:p-10"
              style={{
                background: pkg.highlight ? "#111" : "#080808",
              }}
            >
              {pkg.tag && (
                <div
                  className="absolute top-0 left-0 right-0 text-center py-2"
                  style={{ background: "#fff", color: "#000", fontSize: "0.6rem", letterSpacing: "0.18em", fontWeight: 600 }}
                >
                  {pkg.tag.toUpperCase()}
                </div>
              )}

              <div style={{ paddingTop: pkg.tag ? "24px" : "0" }}>
                <span className="section-label block mb-6">{pkg.duration}</span>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-display"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "#F5F5F5", letterSpacing: "-0.04em", lineHeight: 1 }}
                    >
                      {pkg.price}
                    </span>
                    <span style={{ color: "#555", fontSize: "0.8rem", marginLeft: "4px" }}>TL</span>
                  </div>
                </div>

                {!pkg.isConsult && (
                  <ul className="mb-10 space-y-3.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-1 shrink-0" style={{ color: "#888" }}>
                          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                        <span style={{ color: "#B0B0B0", fontSize: "0.85rem", lineHeight: 1.55 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {pkg.isConsult && (
                  <div className="mb-10">
                    <p style={{ color: "#B0B0B0", fontSize: "0.9rem", lineHeight: 1.7 }}>
                      Başlamadan önce sorularını yanıtlayabileceğin, sürecin sana uyup uymadığını anlayabileceğin 30 dakikalık birebir görüntülü görüşme.
                    </p>
                  </div>
                )}

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-medium uppercase tracking-widest py-4 transition-all duration-300"
                  style={{
                    border: pkg.highlight ? "none" : "1px solid #2a2a2a",
                    background: pkg.highlight ? "#fff" : "transparent",
                    color: pkg.highlight ? "#000" : "#E5E5E5",
                    letterSpacing: "0.12em",
                  }}
                  onMouseEnter={(e) => {
                    if (!pkg.highlight) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#fff";
                      (e.currentTarget as HTMLElement).style.background = "#fff";
                      (e.currentTarget as HTMLElement).style.color = "#000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.highlight) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#E5E5E5";
                    }
                  }}
                  data-testid={`package-cta-${pkg.id}`}
                >
                  Başvur
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
