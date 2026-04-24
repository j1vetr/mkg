import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "./AdminAuthContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV: Array<{ href: string; label: string; testid: string }> = [
  { href: "/admin", label: "Genel Bakış", testid: "nav-dashboard" },
  { href: "/admin/paketler", label: "Paketler", testid: "nav-packages" },
  { href: "/admin/medya", label: "Dönüşüm Galerisi", testid: "nav-media" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await logout();
    setLocation("/admin/giris");
  };

  return (
    <div style={{ background: "#080808", color: "#FAFAFA", minHeight: "100vh" }}>
      <header
        className="sticky top-0 z-30 backdrop-blur"
        style={{
          background: "rgba(8,8,8,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 md:gap-6">
            <Link href="/admin">
              <span
                className="font-display"
                style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em", cursor: "pointer" }}
                data-testid="admin-logo"
              >
                KOÇ.
              </span>
            </Link>
            <span
              className="hidden md:inline font-display"
              style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: "#666" }}
            >
              CONTROL CENTER
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((item) => {
              const active = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className="font-display cursor-pointer"
                    data-testid={item.testid}
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      color: active ? "#FAFAFA" : "#777",
                      borderBottom: active ? "1px solid #FAFAFA" : "1px solid transparent",
                      paddingBottom: "4px",
                      transition: "color 0.3s",
                    }}
                  >
                    {item.label.toUpperCase()}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <span style={{ fontSize: "0.7rem", color: "#666", letterSpacing: "0.04em" }}>
              {user?.username}
            </span>
            <button
              onClick={onLogout}
              className="font-display"
              data-testid="admin-logout"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                color: "#FAFAFA",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "8px 14px",
                background: "transparent",
                cursor: "pointer",
                transition: "border-color 0.3s",
              }}
            >
              ÇIKIŞ
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            data-testid="admin-menu-toggle"
            style={{ color: "#FAFAFA", padding: "6px" }}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="px-5 py-5 flex flex-col gap-5">
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      onClick={() => setOpen(false)}
                      className="font-display block cursor-pointer"
                      style={{
                        fontSize: "0.85rem",
                        letterSpacing: "0.14em",
                        color: location === item.href ? "#FAFAFA" : "#888",
                      }}
                    >
                      {item.label.toUpperCase()}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    void onLogout();
                  }}
                  className="font-display text-left"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "#FAFAFA", paddingTop: "8px" }}
                >
                  ÇIKIŞ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14">{children}</main>
    </div>
  );
}
