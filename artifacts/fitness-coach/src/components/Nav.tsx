import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Sistem", href: "#sistem" },
  { label: "Paketler", href: "#paketler" },
  { label: "Dönüşümler", href: "#donusumler" },
  { label: "SSS", href: "#sss" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,8,8,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-700 text-lg tracking-tight text-white"
            data-testid="nav-logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            KOÇ<span style={{ color: "#fff", opacity: 0.3 }}>.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleAnchor(l.href)}
                className="section-label text-white/40 hover:text-white/80 transition-colors duration-200"
                data-testid={`nav-link-${l.label.toLowerCase()}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleAnchor("#paketler")}
            className="hidden md:flex items-center gap-2 text-xs font-medium tracking-widest uppercase border border-white/20 text-white/70 hover:border-white hover:text-white px-5 py-2 transition-all duration-300"
            data-testid="nav-cta"
          >
            Başvur
          </button>

          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="nav-menu-toggle"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(8,8,8,0.97)", paddingTop: "80px" }}
          >
            <div className="flex flex-col items-center justify-center gap-10 flex-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleAnchor(l.href)}
                  className="font-display text-4xl font-light text-white/70 hover:text-white transition-colors"
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => handleAnchor("#paketler")}
                className="mt-6 border border-white text-white font-display text-sm tracking-widest uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
                data-testid="mobile-nav-cta"
              >
                Başvur
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
