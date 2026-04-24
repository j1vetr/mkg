export default function Marquee() {
  // Pre-uppercased Turkish strings so we don't rely on CSS text-transform,
  // which incorrectly maps lowercase "i" to "I" instead of the Turkish "İ".
  const items = [
    "KİŞİYE ÖZEL ANTRENMAN",
    "BİLİMSEL TEMELLER",
    "7/24 WHATSAPP",
    "HAFTALIK REVİZYON",
    "KAN TAHLİLİ ANALİZİ",
    "GERÇEK DÖNÜŞÜM",
    "UZAKTAN EĞİTİM",
    "SANA ÖZEL SİSTEM",
  ];

  return (
    <div
      style={{
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        padding: "26px 0",
        overflow: "hidden",
        background: "#060606",
      }}
    >
      <div className="animate-marquee flex gap-16 w-max">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display shrink-0 flex items-center gap-16"
            style={{
              color: "#888",
              fontSize: "0.8rem",
              letterSpacing: "0.22em",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {item}
            <span style={{ color: "#444", fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
