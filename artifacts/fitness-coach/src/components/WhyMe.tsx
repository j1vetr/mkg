import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    num: "01",
    title: "Sana Özel Sistem.",
    desc: "Hazır program değil. Sıfırdan — senin hayat düzenine, alışkanlıklarına ve hedeflerine göre inşa edilen bir sistem.",
  },
  {
    num: "02",
    title: "Bilim, Sadelikle.",
    desc: "Bilimsel temeller üzerine kurulu ama gereksiz karmaşıklaştırılmayan programlar. Sürdürülebilirlik her şeyin önünde gelir.",
  },
  {
    num: "03",
    title: "7/24 Erişim.",
    desc: "WhatsApp üzerinden doğrudan benimle iletişim. Asistan yok, ekip yok. Her mesaj bana ulaşır.",
  },
  {
    num: "04",
    title: "Haftalık Revizyon.",
    desc: "İlerleme takibi ve program güncellemeleri haftalık yapılır. Duraksayan sürecin değil, seni ileriye taşıyan bir sistemin parçasısın.",
  },
  {
    num: "05",
    title: "Kan Tahlili Dahil.",
    desc: "Antrenman ve beslenme programlarının ötesinde — kan değerlerini analiz ederek bütünsel bir strateji oluştururum.",
  },
  {
    num: "06",
    title: "Hayatın Uyar, Sen Değil.",
    desc: "Yoğun iş, vardiyalı çalışma, düzensiz uyku — program bunlara göre şekillenir. Mükemmel koşullar beklenmez.",
  },
];

function ReasonCard({ r, i }: { r: typeof reasons[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      style={{ borderTop: "1px solid #222", paddingTop: "32px", paddingBottom: "32px" }}
    >
      <div className="flex gap-6 md:gap-10">
        <span
          className="font-display shrink-0"
          style={{ color: "#888", fontSize: "0.8rem", letterSpacing: "0.12em", paddingTop: "6px", fontWeight: 500 }}
        >
          {r.num}
        </span>
        <div>
          <h3
            className="font-display mb-4 transition-colors duration-300"
            style={{ color: "#FAFAFA", fontSize: "clamp(1.2rem, 2.6vw, 1.6rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            {r.title}
          </h3>
          <p style={{ color: "#A8A8A8", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "480px", fontWeight: 400 }}>
            {r.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sistem" className="py-28 md:py-40 px-6 md:px-10 max-w-screen-xl mx-auto">
      <div className="mb-16 md:mb-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div style={{ width: "32px", height: "1px", background: "#555" }} />
            <span className="section-label" style={{ color: "#999" }}>Neden Farklı</span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", maxWidth: "780px", lineHeight: 1.1 }}
          >
            Çoğu İnsan Dene, Bırak Döngüsündedir.
            <br />
            <span style={{ color: "#5a5a5a" }}>Seninki Farklı Olabilir.</span>
          </h2>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-0 md:gap-x-20" style={{ borderBottom: "1px solid #222" }}>
        {reasons.map((r, i) => (
          <ReasonCard key={r.num} r={r} i={i} />
        ))}
      </div>
    </section>
  );
}
