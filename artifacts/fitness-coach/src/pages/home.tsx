import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Menu, X, Play } from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const WHATSAPP_LINK = "https://wa.me/905XXXXXXXXX";

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <a href="#" className="font-heading text-xl font-bold tracking-tighter text-white z-50">
            KOÇ<span className="text-primary">.</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#hikaye" className="hover:text-white transition-colors">Hikaye</a>
            <a href="#sistem" className="hover:text-white transition-colors">Sistem</a>
            <a href="#paketler" className="hover:text-white transition-colors">Paketler</a>
            <a href="#donusumler" className="hover:text-white transition-colors">Dönüşümler</a>
            <a href="#sss" className="hover:text-white transition-colors">SSS</a>
          </nav>

          <div className="hidden md:block">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-black hover:bg-white/90 rounded-none px-6 font-bold" data-testid="nav-cta">
                Başla
              </Button>
            </a>
          </div>

          <button 
            className="md:hidden z-50 text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 md:hidden">
          <a href="#hikaye" onClick={closeMenu} className="font-heading text-3xl font-bold">Hikaye</a>
          <a href="#sistem" onClick={closeMenu} className="font-heading text-3xl font-bold">Sistem</a>
          <a href="#paketler" onClick={closeMenu} className="font-heading text-3xl font-bold">Paketler</a>
          <a href="#donusumler" onClick={closeMenu} className="font-heading text-3xl font-bold">Dönüşümler</a>
          <a href="#sss" onClick={closeMenu} className="font-heading text-3xl font-bold">SSS</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 mt-8 font-bold text-lg rounded-none px-12" data-testid="mobile-nav-cta">
              Başvur
            </Button>
          </a>
        </div>
      )}

      <main>
        {/* HERO */}
        <section id="hikaye" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
          
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.05] tracking-tight mb-8">
                Hazır program. Hazır sonuç. <br className="hidden md:block" />
                <span className="text-primary">Bu illüzyon bitti.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light leading-relaxed">
                Sen zaten denediğin her şeyin neden işe yaramadığını biliyorsun. Kalıplaşmış listeler, standart antrenmanlar ve kimsenin umursamadığı rutinler. Gerçek dönüşüm, sistemin sana uymasıyla başlar.
              </p>

              <a href="#paketler">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none h-16 px-10 text-lg font-bold uppercase tracking-wider mb-20" data-testid="hero-cta">
                  Başvur ve Değiş
                </Button>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-video w-full rounded-none overflow-hidden border border-white/10 bg-black"
            >
              <iframe 
                src="https://www.youtube.com/embed/u0JdGzqdmIg?rel=0&showinfo=0&autoplay=0" 
                title="Koçluk Videosu"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                data-testid="hero-video"
              />
            </motion.div>
          </div>
        </section>

        {/* NEDEN BENI TERCIH ETTILER */}
        <section id="sistem" className="py-24 md:py-32 bg-card border-y border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 max-w-3xl">
                Çoğu İnsan Dene, Bırak Döngüsündedir. <br/>
                <span className="text-muted-foreground">Seninki Farklı Olabilir.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Sana Özel Sistem", desc: "Herkese aynı program değil — tamamen senin biyolojine ve hayatına özel bir mekanizma." },
                { title: "Bilimsel Temel", desc: "Karmaşık akademik teorileri, günlük hayata uygulanabilir sadeliğe indirgiyorum." },
                { title: "7/24 İletişim", desc: "Mesai saati yok. Asistan yok. Doğrudan benimle WhatsApp üzerinden anlık iletişim." },
                { title: "Sürekli Revizyon", desc: "Haftalık form kontrolü. İşlemeyen bir şey varsa, anında tespit edilir ve değiştirilir." },
                { title: "Tam Resim", desc: "Sadece antrenman değil. Kan tahlili analizi dahil, vücudunun içini de okuyoruz." },
                { title: "Hayatına Uyan Plan", desc: "Sen programa uymak zorunda değilsin. Program senin yaşantına uymak zorunda." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background border border-white/5 p-8 hover:border-primary/50 transition-colors"
                >
                  <div className="text-primary font-heading text-2xl font-bold mb-4">0{i+1}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PAKETLER */}
        <section id="paketler" className="py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Kendine Yatırım Yap
              </h2>
              <p className="text-primary font-medium tracking-widest uppercase">Sınırlı Kontenjan. Gerçek Dönüşüm.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
              {/* Plan 1 */}
              <Card className="bg-card border-white/10 p-8 rounded-none flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">3 Aylık</h3>
                  <p className="text-muted-foreground mb-6">Uzaktan Eğitim</p>
                  <div className="text-4xl font-heading font-bold text-white">6.400 TL</div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Kişiye Özel Antrenman', 'Kişiye Özel Beslenme', 'İsteğe Bağlı Supplement', 'Kan Tahlili İnceleme', '7/24 WhatsApp İletişimi', 'Haftalık Form Kontrolü'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check size={18} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full rounded-none h-12 border-white/20 text-white hover:bg-white hover:text-black">Seç</Button>
                </a>
              </Card>

              {/* Plan 2 - Highlighted */}
              <Card className="bg-background border-primary/50 p-8 rounded-none flex flex-col h-full relative transform xl:-translate-y-4 shadow-[0_0_30px_rgba(255,51,0,0.1)]">
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-xs font-bold text-center py-1 uppercase tracking-wider">
                  En Çok Tercih Edilen
                </div>
                <div className="mb-8 mt-4">
                  <h3 className="text-2xl font-bold mb-2 text-white">6 Aylık</h3>
                  <p className="text-muted-foreground mb-6">Uzaktan Eğitim</p>
                  <div className="text-4xl font-heading font-bold text-primary">9.600 TL</div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Kişiye Özel Antrenman', 'Kişiye Özel Beslenme', 'İsteğe Bağlı Supplement', 'İsteğe Bağlı Profesyonel Ürün', 'Kan Tahlili İnceleme', '7/24 WhatsApp İletişimi', 'Haftalık Form Kontrolü'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check size={18} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full rounded-none h-12 bg-primary text-white hover:bg-primary/90">Seç</Button>
                </a>
              </Card>

              {/* Plan 3 */}
              <Card className="bg-card border-white/10 p-8 rounded-none flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">12 Aylık</h3>
                  <p className="text-muted-foreground mb-6">Uzaktan Eğitim</p>
                  <div className="text-4xl font-heading font-bold text-white">16.000 TL</div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Kişiye Özel Antrenman', 'Kişiye Özel Beslenme', 'İsteğe Bağlı Supplement', 'İsteğe Bağlı Profesyonel Ürün', 'Kan Tahlili İnceleme', '7/24 WhatsApp İletişimi', 'Haftalık Form Kontrolü'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check size={18} className="text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full rounded-none h-12 border-white/20 text-white hover:bg-white hover:text-black">Seç</Button>
                </a>
              </Card>

              {/* Plan 4 */}
              <Card className="bg-card border-white/10 p-8 rounded-none flex flex-col h-full opacity-90 hover:opacity-100 transition-opacity">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">Görüşme</h3>
                  <p className="text-muted-foreground mb-6">30dk Görüntülü</p>
                  <div className="text-4xl font-heading font-bold text-white">7.000 TL</div>
                </div>
                <div className="flex-grow flex flex-col justify-center mb-8">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Sistemime dahil olmadan önce birebir analiz, soru-cevap ve durum değerlendirmesi için 30 dakikalık özel görüşme seansı.
                  </p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
                  <Button variant="outline" className="w-full rounded-none h-12 border-white/20 text-white hover:bg-white hover:text-black">Seç</Button>
                </a>
              </Card>

            </div>
          </div>
        </section>

        {/* TRANSFORMATIONS */}
        <section id="donusumler" className="py-24 md:py-32 bg-card border-y border-white/5">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 max-w-3xl">
                Bunlar Tesadüf Değil. <br/>
                <span className="text-muted-foreground">Bunlar Sistem.</span>
              </h2>
              <p className="text-lg text-muted-foreground">Bu kişiler senden farklı değildi. Sadece doğru kararı verdiler.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: "/images/transform-1.png", quote: "12 haftada ne beklediğimden çok daha fazlasını aldım.", name: "Murat K., 34" },
                { img: "/images/transform-2.png", quote: "Aç kalmadan, hayatımı kısıtlamadan tamamen değiştim.", name: "Selin Y., 28" },
                { img: "/images/transform-3.png", quote: "Yıllardır boşa kürek çekiyormuşum. Sistem her şeymiş.", name: "Burak T., 41" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden mb-6 bg-black border border-white/10">
                    <img src={item.img} alt={`Transformasyon ${i+1}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                  </div>
                  <blockquote className="text-lg font-medium text-white mb-2 leading-tight">
                    "{item.quote}"
                  </blockquote>
                  <cite className="text-sm text-primary font-bold not-italic">— {item.name}</cite>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="sss" className="py-24 md:py-32">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Sıkça Sorulan Sorular
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="w-full text-white">
              {[
                {
                  q: "Daha önce birçok program denedim ama sonuç alamadım. Bu neden farklı?",
                  a: "Çoğu kişi ya \"herkese aynı program\" kullanıyor ya da bilimsel olmayan yöntemlerle ilerliyor. Benim yaklaşımım farklı. Programı sana özel hazırlıyorum ama bunu tamamen bilimsel temeller üzerine kuruyorum. Ve en önemlisi, bu bilgiyi karmaşık hale getirmeden senin günlük hayatına uyacak şekilde sadeleştiriyorum. Yani sadece doğru programı değil, doğru sistemi kullanıyorsun."
                },
                {
                  q: "Bu program gerçekten işe yarıyor mu?",
                  a: "Programlara doğru şekilde uyulduğunda sistemim sonuç üretir. Buradaki kilit nokta, bilimsel temellere dayanan bu sistemi senin hayat düzenine göre şekillendirmem ve sürdürülebilir hale getirmem. Çünkü ne kadar doğru olursa olsun, sürdüremediğin bir program işe yaramaz. Bu yüzden programlar gereksiz karmaşık değil; aksine, günlük hayatına uyacak kadar net ve uygulanabilir oluyor."
                },
                {
                  q: "Benim seviyeme uygun mu?",
                  a: "Evet. Programları tamamen seviyene göre oluşturuyorum, bu yüzden her seviyeye uygundur."
                },
                {
                  q: "Uzaktan eğitim kimler için uygundur?",
                  a: "Uzaktan eğitim, spor salonunda ya da evde spor yapabilen herkes için uygundur."
                },
                {
                  q: "Yoğun bir hayatım var. Bu programa uyum sağlayabilir miyim?",
                  a: "Program senin hayatına uyar, sen programa uymak zorunda kalmazsın. Çünkü tamamen hayat düzenine göre oluşturuyorum."
                },
                {
                  q: "Programlar kişiye özel mi hazırlanıyor?",
                  a: "Evet. Her programı sıfırdan, tamamen kişiye özel olarak hazırlıyorum. Bunu yaparken günlük rutinini, beslenme alışkanlıklarını, uyku düzenini, antrenman geçmişini ve hedeflerini dikkate alıyorum. Yani sana hazır bir program vermiyorum; doğrudan sana uygun bir sistem oluşturuyorum."
                },
                {
                  q: "Süreç tam olarak nasıl işliyor?",
                  a: "Süreç 4 adımdan oluşur: 1. Başvuru formunu doldurursun. 2. Verilerin analiz edilir. 3. Sana özel program hazırlanır ve iletilir. 4. Haftalık olarak ilerlemen takip edilir ve gerekli güncellemeler yapılır. Yani sadece program almazsın, süreç boyunca yönlendirilirsin."
                },
                {
                  q: "Program ne kadar sürede hazırlanır?",
                  a: "Başvuru formunu doldurduktan sonra programın genellikle 1-3 gün içinde hazırlanır ve sana iletilir."
                },
                {
                  q: "İlerlemem nasıl takip edilecek?",
                  a: "Takibini haftalık olarak yapıyoruz ama süreci gereksiz yere karmaşıklaştırmıyorum. Sürekli ölçü almakla uğraşmıyorsun. İlerlemeyi vücut görünümün, performansın ve genel durumun üzerinden değerlendiriyoruz. Yani hem düzenli takip var hem de seni bunaltan bir sistem yok."
                },
                {
                  q: "Benimle birebir iletişim olacak mı?",
                  a: "Evet. Süreci tamamen benimle WhatsApp üzerinden birebir iletişimle sürdüreceğiz. Herhangi bir çalışanım ya da ekibim yok. Amacım sadece program vermek değil, süreci doğru şekilde yönetmeni sağlamak."
                },
                {
                  q: "Programı aksatırsam ne olur?",
                  a: "Bu süreç mükemmel gitmek zorunda değil. Aksaklıklar olabilir. Böyle durumlarda program yeniden düzenlenir ve kaldığın yerden devam etmen sağlanır. Önemli olan tamamen bırakmamak ve süreci sürdürülebilir kılmaktır."
                },
                {
                  q: "Ne kadar sürede sonuç alırım?",
                  a: "Bu tamamen seviyene ve sürece uyumuna bağlıdır. Ancak, çoğu kişi ilk 2–4 hafta içinde gözle görülür değişimleri fark etmeye başlar. Daha belirgin fiziksel dönüşüm genellikle 8–12 hafta içinde ortaya çıkar."
                },
                {
                  q: "Diyet listeleri zorlayıcı mı?",
                  a: "Katı ve sürdürülemez diyetler uygulanmaz. Beslenme planı, mevcut alışkanlıklarına uygun şekilde düzenlenir. Amaç kısa süreli değil, uzun vadeli sürdürülebilir sonuç almaktır. Ayrıca süreç boyunca beslenmede uymakta zorlandığın kısımlar olursa revize ediyorum."
                },
                {
                  q: "Sakatlığım / özel durumum var, katılabilir miyim?",
                  a: "Evet, ancak bu durum başvuru sırasında mutlaka belirtilmelidir. Program buna göre düzenlenir ve riskli hareketlerden kaçınılarak güvenli bir plan oluşturulur."
                },
                {
                  q: "Kan tahlillerinde ya da sağlık kontrollerinde sorun yaratır mı?",
                  a: "Hayır. Benimle birlikte profesyonel bir şekilde ilerlediğinde kan tahlillerinde ya da sağlık kontrolünde herhangi bir sorun yaşamazsın."
                },
                {
                  q: "Vardiyalı çalışıyorum ya da uyku düzenim düzensiz. Programa uyabilir miyim?",
                  a: "Evet. Programlar tamamen hayat düzenine göre şekillendirilir."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors py-6 data-[state=open]:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 border-t border-primary/20" />
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold font-heading mb-10 text-white">
              Bahaneler Bitti.
            </h2>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none h-20 px-12 text-xl md:text-2xl font-bold uppercase tracking-wider shadow-[0_0_40px_rgba(255,51,0,0.3)] hover:shadow-[0_0_60px_rgba(255,51,0,0.5)] transition-all" data-testid="final-cta">
                Karar Verdim, Başlamak İstiyorum
              </Button>
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/10 bg-background text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Elite Coaching. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}
