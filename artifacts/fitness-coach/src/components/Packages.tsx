import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCheckout } from "@/checkout/CheckoutContext";
import type { PackageId } from "@/checkout/data";
import { useResolvedPackages, usePackages } from "@/lib/usePublicData";

interface PackageView {
  id: PackageId;
  num: string;
  duration: string;
  price: number;
  monthly: string | null;
  highlight: boolean;
  tag: string | null;
  isConsult: boolean;
  blurb: string;
}

const META: Record<PackageId, { num: string; tag: string | null; isConsult: boolean }> = {
  "3-ay": { num: "01", tag: null, isConsult: false },
  "6-ay": { num: "02", tag: "En Çok Tercih Edilen", isConsult: false },
  "12-ay": { num: "03", tag: null, isConsult: false },
  gorusme: { num: "04", tag: null, isConsult: true },
};

const features = [
  "Kişiye Özel Antrenman Programı",
  "Kişiye Özel Beslenme Programı",
  "Supplement Planlaması",
  "Profesyonel Ürün Planlaması",
  "Kan Tahlili İnceleme & Yorum",
  "7/24 WhatsApp İletişimi",
  "Haftalık Form Kontrolü & Revizyon",
];

function PackageCard({ pkg, i, inView }: { pkg: PackageView; i: number; inView: boolean }) {
  const [hover, setHover] = useState(false);
  const { open } = useCheckout();
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
      className="relative flex flex-col p-7 sm:p-8 md:p-10"
      style={{
        background: dark ? (hover ? "#101010" : "#0a0a0a") : "#FAFAFA",
        color: fg,
        transition: "background 0.5s ease, transform 0.5s ease",
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
            fontSize: "0.6rem",
            letterSpacing: "0.24em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {pkg.tag}
        </div>
      )}

      <div style={{ paddingTop: pkg.highlight ? "20px" : "0" }} className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-8 md:mb-12">
          <div>
            <span
              className="font-display block"
              style={{ fontSize: "0.7rem", letterSpacing: "0.24em", fontWeight: 500, color: fgVeryMuted, textTransform: "uppercase" }}
            >
              Sistem · {pkg.num}
            </span>
            <span
              className="font-display block mt-2"
              style={{ fontSize: "1.4rem", fontWeight: 600, letterSpacing: "-0.02em", color: fg }}
            >
              {pkg.duration}
            </span>
          </div>
        </div>

        <div className="mb-8 flex items-baseline gap-2">
          <span
            className="font-display"
            style={{
              fontSize: "clamp(2.6rem, 5.2vw, 4.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
              color: fg,
            }}
          >
            {formattedPrice}
          </span>
          <span style={{ fontSize: "0.85rem", color: fgMuted, fontWeight: 500, letterSpacing: "0.06em" }}>TL</span>
        </div>

        <p
          className="mb-8"
          style={{ fontSize: "0.92rem", lineHeight: 1.6, color: fgMuted, maxWidth: "280px" }}
        >
          {pkg.blurb}
        </p>

        {!pkg.isConsult ? (
          <div className="flex-1 mb-8" style={{ borderTop: `1px solid ${hairline}` }}>
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
                <span style={{ fontSize: "0.86rem", lineHeight: 1.45, color: fg, opacity: 0.92 }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 mb-8" style={{ borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}`, padding: "20px 0" }}>
            <span
              className="font-display block mb-4"
              style={{ fontSize: "0.65rem", color: fgVeryMuted, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Tek Seferlik Görüşme
            </span>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: fg, opacity: 0.85 }}>
              30 dakikalık birebir video görüşme. Hedeflerini, mevcut durumunu ve sürecin sana uygunluğunu birlikte değerlendiririz.
            </p>
          </div>
        )}

        <button
          onClick={() => open(pkg.id)}
          className="group/cta flex items-center justify-between transition-all duration-500 w-full text-left"
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
            style={{ fontSize: "0.8rem", letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}
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
        </button>
      </div>
    </motion.div>
  );
}

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const resolved = useResolvedPackages();
  const { data } = usePackages();
  const liveMap = useMemo(() => {
    const m = new Map<string, { highlight: boolean; active: boolean }>();
    (data?.packages ?? []).forEach((p) => m.set(p.slug, { highlight: p.highlight, active: p.active }));
    return m;
  }, [data]);

  const packages: PackageView[] = useMemo(() => {
    return resolved
      .filter((p) => liveMap.get(p.id)?.active !== false)
      .map((p) => {
        const meta = META[p.id];
        const live = liveMap.get(p.id);
        return {
          id: p.id,
          num: meta.num,
          duration: p.duration,
          price: p.price,
          monthly: p.monthly,
          highlight: live ? live.highlight : p.id === "6-ay",
          tag: meta.tag,
          isConsult: meta.isConsult,
          blurb: p.blurb,
        };
      });
  }, [resolved, liveMap]);

  return (
    <section id="paketler" style={{ background: "#060606", borderTop: "1px solid #1a1a1a" }} className="py-24 md:py-40">
      <div className="px-5 md:px-10 max-w-screen-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <div style={{ width: "32px", height: "1px", background: "#555" }} />
            <span className="section-label" style={{ color: "#999" }}>Paketler</span>
            <div className="md:hidden" style={{ width: "32px", height: "1px", background: "#555" }} />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="font-display mx-auto md:mx-0"
              style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1.1, maxWidth: "780px" }}
            >
              Dönüşüme Yatırım Yapmanın
              <br />
              <span style={{ color: "#5a5a5a" }}>Tek Doğru Zamanı Şimdi.</span>
            </h2>
            <div style={{ maxWidth: "320px" }} className="mx-auto md:mx-0">
              <p style={{ color: "#A8A8A8", lineHeight: 1.7, fontSize: "0.95rem" }}>
                Sınırlı kontenjanla çalışıyorum. Her danışana gereken ilgiyi verebilmek için kapasitemi düşük tutuyorum.
              </p>
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
      </div>
    </section>
  );
}
