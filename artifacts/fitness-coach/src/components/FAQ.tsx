import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Daha önce birçok program denedim ama sonuç alamadım. Bu neden farklı?",
    a: "Çoğu kişi ya \"herkese aynı program\" kullanıyor ya da bilimsel olmayan yöntemlerle ilerliyor. Benim yaklaşımım farklı. Programı sana özel hazırlıyorum ama bunu tamamen bilimsel temeller üzerine kuruyorum. Ve en önemlisi, bu bilgiyi karmaşık hale getirmeden senin günlük hayatına uyacak şekilde sadeleştiriyorum. Yani sadece doğru programı değil, doğru sistemi kullanıyorsun.",
  },
  {
    q: "Bu program gerçekten işe yarıyor mu?",
    a: "Programlara doğru şekilde uyulduğunda sistemim sonuç üretir. Buradaki kilit nokta, bilimsel temellere dayanan bu sistemi senin hayat düzenine göre şekillendirmem ve sürdürülebilir hale getirmem. Çünkü ne kadar doğru olursa olsun, sürdüremediğin bir program işe yaramaz. Bu yüzden programlar gereksiz karmaşık değil; aksine, günlük hayatına uyacak kadar net ve uygulanabilir oluyor.",
  },
  {
    q: "Benim seviyeme uygun mu?",
    a: "Evet. Programları tamamen seviyene göre oluşturuyorum, bu yüzden her seviyeye uygundur.",
  },
  {
    q: "Uzaktan eğitim kimler için uygundur?",
    a: "Uzaktan eğitim, spor salonunda ya da evde spor yapabilen herkes için uygundur.",
  },
  {
    q: "Yoğun bir hayatım var. Bu programa uyum sağlayabilir miyim?",
    a: "Program senin hayatına uyar, sen programa uymak zorunda kalmazsın. Çünkü tamamen hayat düzenine göre oluşturuyorum.",
  },
  {
    q: "Programlar kişiye özel mi hazırlanıyor?",
    a: "Evet. Her programı sıfırdan, tamamen kişiye özel olarak hazırlıyorum. Bunu yaparken günlük rutinini, beslenme alışkanlıklarını, uyku düzenini, antrenman geçmişini ve hedeflerini dikkate alıyorum. Yani sana hazır bir program vermiyorum; doğrudan sana uygun bir sistem oluşturuyorum.",
  },
  {
    q: "Süreç tam olarak nasıl işliyor?",
    a: "Süreç 4 adımdan oluşur: 1. Başvuru formunu doldurursun. 2. Verilerin analiz edilir. 3. Sana özel program hazırlanır ve iletilir. 4. Haftalık olarak ilerlemen takip edilir ve gerekli güncellemeler yapılır. Yani sadece program almazsın, süreç boyunca yönlendirilirsin.",
  },
  {
    q: "Program ne kadar sürede hazırlanır?",
    a: "Başvuru formunu doldurduktan sonra programın genellikle 1-3 gün içinde hazırlanır ve sana iletilir.",
  },
  {
    q: "İlerlemem nasıl takip edilecek?",
    a: "Takibini haftalık olarak yapıyoruz ama süreci gereksiz yere karmaşıklaştırmıyorum. Sürekli ölçü almakla uğraşmıyorsun. İlerlemeyi vücut görünümün, performansın ve genel durumun üzerinden değerlendiriyoruz. Yani hem düzenli takip var hem de seni bunaltan bir sistem yok.",
  },
  {
    q: "Benimle birebir iletişim olacak mı?",
    a: "Evet. Süreci tamamen benimle WhatsApp üzerinden birebir iletişimle sürdüreceğiz. Herhangi bir çalışanım ya da ekibim yok. Amacım sadece program vermek değil, süreci doğru şekilde yönetmeni sağlamak.",
  },
  {
    q: "Programı aksatırsam ne olur?",
    a: "Bu süreç mükemmel gitmek zorunda değil. Aksaklıklar olabilir. Böyle durumlarda program yeniden düzenlenir ve kaldığın yerden devam etmen sağlanır. Önemli olan tamamen bırakmamak ve süreci sürdürülebilir kılmaktır.",
  },
  {
    q: "Ne kadar sürede sonuç alırım?",
    a: "Bu tamamen seviyene ve sürece uyumuna bağlıdır. Ancak, çoğu kişi ilk 2–4 hafta içinde gözle görülür değişimleri fark etmeye başlar. Daha belirgin fiziksel dönüşüm genellikle 8–12 hafta içinde ortaya çıkar.",
  },
  {
    q: "Diyet listeleri zorlayıcı mı?",
    a: "Katı ve sürdürülemez diyetler uygulanmaz. Beslenme planı, mevcut alışkanlıklarına uygun şekilde düzenlenir. Amaç kısa süreli değil, uzun vadeli sürdürülebilir sonuç almaktır. Ayrıca süreç boyunca beslenmede uymakta zorlandığın kısımlar olursa revize ediyorum.",
  },
  {
    q: "Sakatlığım / özel durumum var, katılabilir miyim?",
    a: "Evet, ancak bu durum başvuru sırasında mutlaka belirtilmelidir. Program buna göre düzenlenir ve riskli hareketlerden kaçınılarak güvenli bir plan oluşturulur.",
  },
  {
    q: "Kan tahlillerinde ya da sağlık kontrollerinde sorun yaratır mı?",
    a: "Hayır. Benimle birlikte profesyonel bir şekilde ilerlediğinde kan tahlillerinde ya da sağlık kontrolünde herhangi bir sorun yaşamazsın.",
  },
  {
    q: "Vardiyalı çalışıyorum ya da uyku düzenim düzensiz. Programa uyabilir miyim?",
    a: "Evet. Programlar tamamen hayat düzenine göre şekillendirilir.",
  },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      style={{ borderBottom: "1px solid #1f1f1f" }}
    >
      <button
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
        onClick={() => setOpen(!open)}
        data-testid={`faq-item-${index}`}
        aria-expanded={open}
      >
        <span
          className="font-display group-hover:text-white"
          style={{ color: open ? "#FAFAFA" : "#D5D5D5", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", fontWeight: 500, lineHeight: 1.4, transition: "color 0.2s" }}
        >
          {item.q}
        </span>
        <span
          className="shrink-0 mt-1"
          style={{
            width: "22px",
            height: "22px",
            border: "1px solid #3a3a3a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "#fff" : "#888",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.4s ease, border-color 0.2s, color 0.2s",
            borderColor: open ? "#fff" : "#3a3a3a",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ color: "#A8A8A8", fontSize: "0.95rem", lineHeight: 1.75, paddingBottom: "28px", maxWidth: "720px" }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sss" className="py-28 md:py-40 px-6 md:px-10 max-w-screen-xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-14 md:mb-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <div style={{ width: "32px", height: "1px", background: "#555" }} />
          <span className="section-label" style={{ color: "#999" }}>Sıkça Sorulan Sorular</span>
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1.1 }}
        >
          Aklındaki Sorular
          <br />
          <span style={{ color: "#5a5a5a" }}>Burada Yanıt Buluyor.</span>
        </h2>
      </motion.div>

      <div style={{ borderTop: "1px solid #1f1f1f" }}>
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
