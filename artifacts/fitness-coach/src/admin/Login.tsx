import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useAdminAuth } from "./AdminAuthContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username.trim(), password);
      setLocation("/admin");
    } catch (err) {
      setError(err instanceof Error && err.message === "invalid_credentials" ? "Kullanıcı adı veya şifre hatalı." : "Giriş yapılamadı.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: "#080808", color: "#FAFAFA" }}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12"
        >
          <div
            className="font-display"
            style={{ fontSize: "0.7rem", letterSpacing: "0.32em", color: "#666", marginBottom: "20px" }}
          >
            CONTROL CENTER
          </div>
          <div
            className="font-display"
            style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            KOÇ.
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="space-y-7"
        >
          <Field label="Kullanıcı Adı">
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="ac-input"
              data-testid="admin-username"
            />
          </Field>
          <Field label="Şifre">
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="ac-input"
              data-testid="admin-password"
            />
          </Field>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: "0.78rem", color: "#ff7676", letterSpacing: "0.02em" }}
              data-testid="admin-error"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full font-display"
            style={{
              background: "#FAFAFA",
              color: "#0a0a0a",
              padding: "18px 24px",
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              fontWeight: 600,
              opacity: submitting ? 0.55 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
              transition: "opacity 0.3s",
            }}
            data-testid="admin-submit"
          >
            {submitting ? "GİRİŞ YAPILIYOR…" : "GİRİŞ YAP"}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-12"
          style={{ fontSize: "0.68rem", color: "#444", letterSpacing: "0.18em" }}
        >
          MURAT KAAN GÜNAYDIN · YETKİLİ ERİŞİM
        </motion.div>
      </div>

      <style>{`
        .ac-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          padding: 14px 0;
          color: #FAFAFA;
          font-size: 1rem;
          letter-spacing: 0.01em;
          outline: none;
          transition: border-color 0.3s;
        }
        .ac-input:focus { border-bottom-color: #FAFAFA; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="block font-display"
        style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: "#888", marginBottom: "8px" }}
      >
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}
