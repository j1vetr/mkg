export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  intro?: string;
  updatedAt: string;
  sections: LegalSection[];
}

const COACH = "Murat Kaan Günaydın";
const BRAND = "KOÇ.";
const CONTACT_EMAIL = "mkaangunaydin@icloud.com";
const SUPPORT_PHONE = "+90 501 595 44 14";
const UPDATED = "01 Mayıs 2026";

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  hakkimizda: {
    slug: "hakkimizda",
    title: "Hakkımızda",
    intro:
      "Hazır programlar ve kalıplaşmış listelerle değil, kişiye özel bilimsel sistemlerle çalışıyorum.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "Kim Çalıştığını Bil",
        paragraphs: [
          `${COACH} olarak uzaktan kişisel fitness koçluğu yapıyorum. Asistanım veya ekibim yok — başvurudan teslimata, takipten revizyona kadar tüm süreci doğrudan ben yürütüyorum.`,
          "Yaklaşımım net: bilimsel temellere dayanan, senin hayat düzenine uyacak şekilde sadeleştirilmiş ve sürdürülebilir bir sistem oluşturmak. Çünkü ne kadar doğru olursa olsun, sürdüremediğin bir program işe yaramaz.",
        ],
      },
      {
        heading: "Hizmet Kapsamı",
        list: [
          "Kişiye özel antrenman programı",
          "Kişiye özel beslenme planı",
          "Supplement ve ürün planlaması",
          "Kan tahlili inceleme ve yorum",
          "7/24 WhatsApp üzerinden birebir iletişim",
          "Haftalık form kontrolü ve revizyon",
        ],
      },
      {
        heading: "İletişim Bilgileri",
        list: [
          `Hizmet sağlayıcı: ${COACH}`,
          `E-posta: ${CONTACT_EMAIL}`,
          `Telefon: ${SUPPORT_PHONE}`,
          "Hizmet türü: Uzaktan dijital koçluk",
        ],
      },
    ],
  },

  iletisim: {
    slug: "iletisim",
    title: "İletişim",
    intro: "Sorularını veya başvuru taleplerini aşağıdaki kanallardan iletebilirsin.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "Doğrudan İletişim",
        list: [
          `Hizmet sağlayıcı: ${COACH}`,
          `E-posta: ${CONTACT_EMAIL}`,
          `Telefon / WhatsApp: ${SUPPORT_PHONE}`,
        ],
      },
      {
        heading: "Geri Dönüş Süresi",
        paragraphs: [
          "Tüm mesajlara genellikle 24 saat içinde dönüyorum. Hafta sonları yanıt süresi uzayabilir.",
          "Aktif danışanlarımla WhatsApp üzerinden anlık iletişim kuruyorum. Henüz danışan değilsen, başvurunu tamamladıktan sonra kanal otomatik açılır.",
        ],
      },
      {
        heading: "Şikâyet ve Geri Bildirim",
        paragraphs: [
          "Hizmet süresince yaşadığın her türlü sorun, öneri veya şikâyetini doğrudan e-posta ile iletebilirsin. Yazılı talepler 7 iş günü içinde yanıtlanır.",
        ],
      },
    ],
  },

  "mesafeli-satis-sozlesmesi": {
    slug: "mesafeli-satis-sozlesmesi",
    title: "Mesafeli Satış Sözleşmesi",
    intro:
      "Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca düzenlenmiştir.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "1. Taraflar",
        list: [
          `SATICI: ${COACH} — ${CONTACT_EMAIL}`,
          "ALICI: Başvuru formundaki ad, soyad, e-posta ve telefon bilgilerini beyan eden tüketici.",
        ],
      },
      {
        heading: "2. Sözleşmenin Konusu",
        paragraphs: [
          `İşbu sözleşme; ALICI'nın ${BRAND} platformu üzerinden seçtiği uzaktan dijital koçluk hizmetinin (antrenman programı, beslenme planı, supplement planlaması, takip ve revizyon) satışı, teslimi ve şartlarını düzenler.`,
        ],
      },
      {
        heading: "3. Ürün / Hizmet ve Bedel",
        paragraphs: [
          "Seçilen paketin süresi, fiyatı ve kapsamı başvuru ekranında ve onay özetinde açıkça gösterilmiştir. Tüm fiyatlar Türk Lirası (TL) cinsindendir ve KDV dahildir.",
          "Mevcut paketler: 3 Ay (6.400 TL), 6 Ay (9.600 TL), 12 Ay (16.000 TL) ve 30 dakikalık tek seferlik görüşme (7.000 TL).",
        ],
      },
      {
        heading: "4. Ödeme",
        paragraphs: [
          "Ödeme, PayTR güvenli ödeme altyapısı üzerinden kredi kartı, banka kartı veya banka havalesi ile yapılır. SATICI'nın ALICI'ya ait kart bilgilerini görmesi, saklaması ya da işlemesi söz konusu değildir.",
        ],
      },
      {
        heading: "5. Hizmetin Teslimi",
        paragraphs: [
          "Ödeme onayının ardından SATICI, ALICI ile WhatsApp üzerinden 24 saat içinde iletişime geçer. Detaylı tanışma formunun doldurulmasını takiben kişiye özel program 1–3 iş günü içinde dijital olarak teslim edilir.",
          "Hizmet, sözleşme süresi boyunca dijital kanallar (WhatsApp, e-posta, video görüşme) üzerinden sürdürülür.",
        ],
      },
      {
        heading: "6. Cayma Hakkı",
        paragraphs: [
          "Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, ALICI; sözleşmenin kurulmasından itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir.",
          "Ancak; aynı yönetmeliğin 15/h maddesi gereğince, ALICI'nın onayı ile ifasına başlanan dijital içerik ve hizmetler bakımından cayma hakkı kullanılamaz. Buna göre, kişiye özel program teslim edildiği veya birebir görüşme gerçekleştirildiği andan itibaren cayma hakkı sona erer.",
          "ALICI, başvuru aşamasında işbu maddeyi okuyup kabul ettiğini beyan eder.",
        ],
      },
      {
        heading: "7. İptal ve İade Koşulları",
        paragraphs: [
          "Ödeme alındıktan sonra ancak hizmet henüz başlatılmamışsa (program teslim edilmemiş, görüşme yapılmamışsa), ALICI'nın yazılı talebi üzerine ödeme tamamen iade edilir. İade, kullanılan ödeme yöntemine bağlı olarak 3–14 iş günü içinde aynı kanaldan gerçekleştirilir.",
          "Hizmet başladıktan sonra paket bedelinin iadesi yapılmaz. Ancak özel durumlarda (sağlık, mücbir sebep) süreç dondurulabilir veya başka bir tarihe ertelenebilir.",
        ],
      },
      {
        heading: "8. Uyuşmazlıkların Çözümü",
        paragraphs: [
          "İşbu sözleşmeden doğan uyuşmazlıklarda; Gümrük ve Ticaret Bakanlığı'nca her yıl ilan edilen değer kadar Tüketici Hakem Heyetleri, üzeri için ALICI'nın yerleşim yeri Tüketici Mahkemeleri yetkilidir.",
        ],
      },
      {
        heading: "9. Yürürlük",
        paragraphs: [
          "ALICI, başvuru ekranındaki onay kutucuğunu işaretleyerek işbu sözleşmenin tüm maddelerini okuduğunu, anladığını ve elektronik ortamda kabul ettiğini beyan eder. Sözleşme, ödeme onayının alınmasıyla yürürlüğe girer.",
        ],
      },
    ],
  },

  "iptal-iade": {
    slug: "iptal-iade",
    title: "İptal ve İade Koşulları",
    intro:
      "Aşağıdaki şartlar, satın aldığın koçluk paketi için iptal ve iade süreçlerini düzenler.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "İade Hakkı",
        paragraphs: [
          "Ödemen alındıktan sonra ancak henüz hizmet başlamadan önce (sana özel program hazırlanıp teslim edilmediyse veya birebir görüşme yapılmadıysa), tüm tutarın eksiksiz olarak iade edilir.",
          `Talebini ${CONTACT_EMAIL} adresine yazılı olarak iletmen yeterli. İade, kullandığın ödeme yöntemine göre 3–14 iş günü içinde aynı kanaldan hesabına geçer.`,
        ],
      },
      {
        heading: "Cayma Hakkı (14 Gün)",
        paragraphs: [
          "Mesafeli Sözleşmeler Yönetmeliği'nin 15/h maddesi gereği, sana özel hazırlanan dijital koçluk hizmetinin ifasına onayınla başlandığında 14 günlük cayma hakkı kullanılamaz.",
          "Bu nedenle başvuru ekranında bu maddeyi açıkça onayladığını teyit ederiz. Kişiye özel program teslim edildiği anda hizmet başlamış sayılır.",
        ],
      },
      {
        heading: "Süreç Başladıktan Sonra",
        paragraphs: [
          "Hizmet başladıktan sonra paket bedeli iade edilmez. Ancak aşağıdaki istisnai durumlarda süreç dondurulabilir:",
        ],
        list: [
          "Belgelenmiş sağlık problemi (doktor raporu)",
          "Hamilelik veya doğum süreci",
          "Askerlik veya zorunlu yurt dışı görevi",
          "Mücbir sebep olarak değerlendirilebilecek diğer haller",
        ],
      },
      {
        heading: "Süreç Dondurma",
        paragraphs: [
          "Onaylanan dondurma talebi sonrası kalan süre yeniden başlatılana kadar saklanır. Maksimum dondurma süresi 6 aydır.",
        ],
      },
      {
        heading: "İletişim",
        paragraphs: [
          `Tüm iptal ve iade talepleri için: ${CONTACT_EMAIL}. Geri dönüş süresi en fazla 7 iş günüdür.`,
        ],
      },
    ],
  },

  kvkk: {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    intro:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, kişisel verilerinin nasıl işlendiğine dair bilgilendirmedir.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "1. Veri Sorumlusu",
        paragraphs: [
          `Veri sorumlusu sıfatıyla; ${COACH} (bundan sonra "Hizmet Sağlayıcı" olarak anılacaktır) tarafından hazırlanmıştır. İletişim: ${CONTACT_EMAIL}`,
        ],
      },
      {
        heading: "2. İşlenen Kişisel Veriler",
        paragraphs: ["Hizmet süresince aşağıdaki kişisel verilerin işlenebilir:"],
        list: [
          "Kimlik verileri: ad, soyad",
          "İletişim verileri: e-posta, telefon numarası",
          "Sağlık ve fiziksel veriler: yaş, boy, kilo, antrenman geçmişi, beslenme alışkanlıkları, kan tahlil sonuçları",
          "Ödeme verileri: PayTR aracılığıyla işlenir; kart bilgileri Hizmet Sağlayıcı tarafından görülmez veya saklanmaz",
          "Sipariş verileri: paket bilgisi, sipariş numarası, ödeme tarihi",
        ],
      },
      {
        heading: "3. İşleme Amaçları",
        list: [
          "Sözleşmenin kurulması, ifası ve takibi",
          "Kişiye özel antrenman ve beslenme programlarının hazırlanması",
          "İletişim ve destek hizmetlerinin sunulması",
          "Yasal yükümlülüklerin yerine getirilmesi (fatura, vergi mevzuatı)",
          "Hizmet kalitesinin iyileştirilmesi",
        ],
      },
      {
        heading: "4. İşlemenin Hukuki Sebepleri",
        paragraphs: [
          "Verilerin; KVKK'nın 5/2-c (sözleşmenin kurulması veya ifası), 5/2-ç (hukuki yükümlülüğün yerine getirilmesi), 5/1 (açık rıza) ve 6/3 (sağlık verileri için açık rıza) maddelerine dayanılarak işlenmektedir.",
        ],
      },
      {
        heading: "5. Veri Aktarımı",
        paragraphs: [
          "Verilerin aşağıdaki taraflarla, yalnızca gerekli olduğu ölçüde paylaşılır:",
        ],
        list: [
          "Ödeme altyapısı sağlayıcısı PayTR (ödeme işlemleri için)",
          "Yetkili kamu kurum ve kuruluşları (yasal zorunluluk halinde)",
          "Hosting ve teknik altyapı sağlayıcıları (sadece sistem işlerliği için, gerekli teknik tedbirler altında)",
        ],
      },
      {
        heading: "6. Saklama Süresi",
        paragraphs: [
          "Verilerin; sözleşmenin sona ermesinden itibaren 10 yıl boyunca (Türk Borçlar Kanunu zaman aşımı) saklanır. Bu süreden sonra silinir, yok edilir veya anonim hale getirilir.",
        ],
      },
      {
        heading: "7. Haklarınız (KVKK Madde 11)",
        paragraphs: [
          "KVKK kapsamında aşağıdaki haklara sahipsin:",
        ],
        list: [
          "Kişisel verilerinin işlenip işlenmediğini öğrenme",
          "İşlenmişse buna ilişkin bilgi talep etme",
          "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
          "Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme",
          "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme",
          "Silinmesini veya yok edilmesini talep etme",
          "Aktarıldığı üçüncü kişilere bildirilmesini isteme",
          "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhe çıkan sonuca itiraz etme",
          "Kanuna aykırı işleme nedeniyle zarara uğraman halinde zararın giderilmesini talep etme",
        ],
      },
      {
        heading: "8. Başvuru",
        paragraphs: [
          `Haklarınla ilgili tüm başvuruları ${CONTACT_EMAIL} adresine iletebilirsin. Başvurunuz en geç 30 gün içinde sonuçlandırılır.`,
        ],
      },
    ],
  },

  gizlilik: {
    slug: "gizlilik",
    title: "Gizlilik Politikası",
    intro:
      "Bilgilerinin nasıl toplandığı, kullanıldığı ve korunduğuna dair şeffaf bir açıklamadır.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "Hangi Bilgileri Topluyoruz",
        list: [
          "Başvuru formunda verdiğin ad, soyad, e-posta ve telefon",
          "Süreç içinde paylaştığın sağlık ve antrenman bilgileri",
          "Ödeme işlemine ait sipariş numarası ve tutar (kart bilgileri PayTR'de işlenir, bizde saklanmaz)",
          "Site kullanım istatistikleri (anonim teknik veriler)",
        ],
      },
      {
        heading: "Bilgiler Nasıl Kullanılır",
        list: [
          "Sana özel program hazırlamak ve süreci yönetmek",
          "Yasal yükümlülükleri yerine getirmek (fatura, vergi)",
          "Sözleşmesel hak ve borçları takip etmek",
          "Hizmet kalitesini ölçmek ve iyileştirmek",
        ],
      },
      {
        heading: "Üçüncü Taraflarla Paylaşım",
        paragraphs: [
          "Bilgilerin reklam, pazarlama veya satış amacıyla üçüncü taraflarla paylaşılmaz. Yalnızca aşağıdaki teknik partnerlerle, hizmetin gerektirdiği ölçüde paylaşım yapılır:",
        ],
        list: [
          "PayTR — ödeme işlemlerinin gerçekleştirilmesi için",
          "Hosting sağlayıcısı — site ve veri tabanı işlerliği için",
          "Yetkili kamu kurumları — yasal zorunluluk halinde",
        ],
      },
      {
        heading: "Veri Güvenliği",
        paragraphs: [
          "Veriler şifreli bağlantı (HTTPS / TLS) üzerinden iletilir, sınırlı erişim politikalarıyla korunur. PayTR PCI-DSS sertifikalı bir altyapıdır ve kart bilgilerini taraflar arası iletmez.",
        ],
      },
      {
        heading: "Saklama Süresi",
        paragraphs: [
          "Veriler, sözleşme sona erdikten sonra 10 yıl boyunca saklanır (Türk Borçlar Kanunu zaman aşımı). Bu sürenin sonunda silinir veya anonim hale getirilir.",
        ],
      },
      {
        heading: "Haklarının Kullanımı",
        paragraphs: [
          `Bilgilerin üzerindeki KVKK haklarını kullanmak için ${CONTACT_EMAIL} adresine yazılı talep iletebilirsin. Detaylı bilgi için KVKK Aydınlatma Metni'ni inceleyebilirsin.`,
        ],
      },
    ],
  },

  "cerez-politikasi": {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    intro:
      "Sitemiz, deneyimini iyileştirmek için sınırlı sayıda teknik çerez kullanır.",
    updatedAt: UPDATED,
    sections: [
      {
        heading: "Çerez Nedir",
        paragraphs: [
          "Çerezler, ziyaret ettiğin sitelerin tarayıcına yerleştirdiği küçük metin dosyalarıdır. Sitenin doğru çalışmasına ve tercihlerinin hatırlanmasına yardımcı olur.",
        ],
      },
      {
        heading: "Hangi Çerezleri Kullanıyoruz",
        list: [
          "Zorunlu çerezler: Sitenin temel işlevleri (oturum, sepet/başvuru durumu) için gereklidir.",
          "Performans çerezleri: Sayfa yüklenme süresi gibi anonim teknik istatistikleri ölçer.",
          "Üçüncü taraf çerezleri: Ödeme adımında PayTR, kendi güvenlik çerezlerini kullanabilir.",
        ],
      },
      {
        heading: "Çerezleri Yönetme",
        paragraphs: [
          "Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsin. Ancak zorunlu çerezler kapatıldığında sitenin bazı bölümleri çalışmayabilir.",
        ],
      },
      {
        heading: "Reklam ve Takip",
        paragraphs: [
          "Sitemiz; reklam ağı, profilleme veya kişiselleştirilmiş reklamlar için çerez kullanmaz.",
        ],
      },
    ],
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS);
