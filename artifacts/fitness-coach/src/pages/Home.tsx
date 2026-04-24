import Hero from "@/components/Hero";
import WhyMe from "@/components/WhyMe";
import Packages from "@/components/Packages";
import BeforeAfter from "@/components/BeforeAfter";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      <div className="grain-overlay" />
      <Hero />
      <Marquee />
      <WhyMe />
      <Packages />
      <BeforeAfter />
      <FAQ />
      <Footer />
    </div>
  );
}
