import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { adminApi, formatTRY, type AdminPackage } from "./lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Draft {
  duration: string;
  blurb: string;
  priceTry: string;
  highlight: boolean;
  active: boolean;
}

function toDraft(p: AdminPackage): Draft {
  return {
    duration: p.duration,
    blurb: p.blurb,
    priceTry: String(p.priceTry),
    highlight: p.highlight,
    active: p.active,
  };
}

export default function PackagesAdmin() {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [loading, setLoading] = useState(true);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true);
    try {
      const r = await adminApi.packages();
      setItems(r.packages);
      const next: Record<string, Draft> = {};
      r.packages.forEach((p) => (next[p.slug] = toDraft(p)));
      setDrafts(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "load_failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const update = (slug: string, patch: Partial<Draft>) => {
    setDrafts((prev) => ({ ...prev, [slug]: { ...prev[slug], ...patch } }));
  };

  const save = async (p: AdminPackage) => {
    const d = drafts[p.slug];
    if (!d) return;
    const priceNum = Number(d.priceTry.replace(/[^\d]/g, ""));
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setError("Geçersiz fiyat.");
      return;
    }
    setSavingSlug(p.slug);
    setError(null);
    try {
      const r = await adminApi.updatePackage(p.slug, {
        duration: d.duration.trim(),
        blurb: d.blurb.trim(),
        priceTry: priceNum,
        highlight: d.highlight,
        active: d.active,
      });
      setItems((prev) => prev.map((x) => (x.slug === p.slug ? r.package : x)));
      setDrafts((prev) => ({ ...prev, [p.slug]: toDraft(r.package) }));
      setSavedSlug(p.slug);
      window.setTimeout(() => setSavedSlug((s) => (s === p.slug ? null : s)), 2400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "save_failed");
    } finally {
      setSavingSlug(null);
    }
  };

  if (loading) return <div style={{ color: "#555", padding: "40px 0" }}>Yükleniyor…</div>;

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <div
          className="font-display"
          style={{ fontSize: "0.66rem", letterSpacing: "0.24em", color: "#666", marginBottom: "10px" }}
        >
          PAKET YÖNETİMİ
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#FAFAFA" }}
        >
          Paketler
        </h1>
        <p style={{ color: "#777", fontSize: "0.88rem", marginTop: "12px", maxWidth: "560px", lineHeight: 1.55 }}>
          Fiyat, açıklama ve görünürlük güncellemeleri kaydedildiği anda canlı sitede görünür.
        </p>
      </motion.div>

      {error && (
        <div
          data-testid="pkg-error"
          style={{ padding: "12px 16px", border: "1px solid rgba(255,116,116,0.4)", color: "#ff7676", fontSize: "0.78rem" }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((p, i) => {
          const d = drafts[p.slug] ?? toDraft(p);
          const dirty =
            d.duration.trim() !== p.duration ||
            d.blurb.trim() !== p.blurb ||
            Number(d.priceTry.replace(/[^\d]/g, "")) !== p.priceTry ||
            d.highlight !== p.highlight ||
            d.active !== p.active;
          const isSaving = savingSlug === p.slug;
          const justSaved = savedSlug === p.slug;
          return (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              style={{ background: "#0c0c0c", padding: "26px 24px" }}
              data-testid={`pkg-card-${p.slug}`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div
                    className="font-display"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.24em", color: "#666" }}
                  >
                    {p.slug.toUpperCase()}
                  </div>
                  <div
                    className="font-display"
                    style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#FAFAFA", marginTop: "4px" }}
                  >
                    {formatTRY(p.priceTry)} TL
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle
                    label="Vitrin"
                    checked={d.highlight}
                    onChange={(v) => update(p.slug, { highlight: v })}
                    testid={`toggle-highlight-${p.slug}`}
                  />
                  <Toggle
                    label="Aktif"
                    checked={d.active}
                    onChange={(v) => update(p.slug, { active: v })}
                    testid={`toggle-active-${p.slug}`}
                  />
                </div>
              </div>

              <Field label="Süre / Başlık">
                <input
                  type="text"
                  value={d.duration}
                  onChange={(e) => update(p.slug, { duration: e.target.value })}
                  className="ac-input"
                  data-testid={`pkg-duration-${p.slug}`}
                />
              </Field>

              <Field label="Fiyat (TL)">
                <input
                  type="text"
                  inputMode="numeric"
                  value={d.priceTry}
                  onChange={(e) => update(p.slug, { priceTry: e.target.value.replace(/[^\d]/g, "") })}
                  className="ac-input"
                  data-testid={`pkg-price-${p.slug}`}
                />
              </Field>

              <Field label="Açıklama">
                <textarea
                  value={d.blurb}
                  onChange={(e) => update(p.slug, { blurb: e.target.value })}
                  className="ac-input"
                  rows={3}
                  data-testid={`pkg-blurb-${p.slug}`}
                />
              </Field>

              <div className="flex items-center justify-between mt-7">
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: justSaved ? "#7dffb6" : "#666",
                    transition: "color 0.4s",
                    letterSpacing: "0.06em",
                  }}
                  data-testid={`pkg-status-${p.slug}`}
                >
                  {justSaved
                    ? "Kaydedildi."
                    : dirty
                      ? "Kaydedilmemiş değişiklik."
                      : "Güncel."}
                </span>
                <button
                  onClick={() => save(p)}
                  disabled={!dirty || isSaving}
                  className="font-display"
                  data-testid={`pkg-save-${p.slug}`}
                  style={{
                    background: dirty ? "#FAFAFA" : "rgba(255,255,255,0.08)",
                    color: dirty ? "#0a0a0a" : "#555",
                    padding: "12px 22px",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    cursor: dirty && !isSaving ? "pointer" : "not-allowed",
                    transition: "background 0.3s, color 0.3s",
                  }}
                >
                  {isSaving ? "KAYDEDİLİYOR…" : "KAYDET"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .ac-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 12px 0;
          color: #FAFAFA;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s;
          font-family: inherit;
          resize: vertical;
        }
        .ac-input:focus { border-bottom-color: #FAFAFA; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-5">
      <span
        className="block font-display"
        style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "#777", marginBottom: "6px" }}
      >
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  testid,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  testid: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      data-testid={testid}
      aria-pressed={checked}
      className="flex items-center gap-2 font-display"
      style={{
        fontSize: "0.62rem",
        letterSpacing: "0.18em",
        color: checked ? "#FAFAFA" : "#666",
        background: "transparent",
        border: 0,
        cursor: "pointer",
        padding: 0,
      }}
    >
      <span
        style={{
          width: "28px",
          height: "16px",
          background: checked ? "#FAFAFA" : "rgba(255,255,255,0.12)",
          position: "relative",
          transition: "background 0.25s",
          display: "inline-block",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "14px" : "2px",
            width: "12px",
            height: "12px",
            background: checked ? "#0a0a0a" : "#888",
            transition: "left 0.25s",
          }}
        />
      </span>
      {label.toUpperCase()}
    </button>
  );
}
