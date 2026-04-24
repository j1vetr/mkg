export default function Marquee() {
  const items = [
    "Kişiye Özel Antrenman",
    "Bilimsel Temeller",
    "7/24 WhatsApp",
    "Haftalık Revizyon",
    "Kan Tahlili Analizi",
    "Gerçek Dönüşüm",
    "Uzaktan Eğitim",
    "Sana Özel Sistem",
  ];

  return (
    <div
      style={{
        borderTop: "1px solid #111",
        borderBottom: "1px solid #111",
        padding: "18px 0",
        overflow: "hidden",
        background: "#060606",
      }}
    >
      <div className="animate-marquee flex gap-16 w-max">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display shrink-0 flex items-center gap-16"
            style={{ color: "#1e1e1e", fontSize: "0.7rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}
          >
            {item}
            <span style={{ color: "#222", fontSize: "0.4rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
