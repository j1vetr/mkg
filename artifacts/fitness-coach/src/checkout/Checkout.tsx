import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPackage } from "./data";
import { useCheckout, type CheckoutForm, type CheckoutStep } from "./CheckoutContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WA_LINK_BASE = "https://wa.me/905XXXXXXXXX";

const STEPS: { id: CheckoutStep; n: string; label: string }[] = [
  { id: "kimlik", n: "01", label: "Kimlik" },
  { id: "iletisim", n: "02", label: "İletişim" },
  { id: "onay", n: "03", label: "Onay" },
];

function formatTRY(n: number) {
  return n.toLocaleString("tr-TR");
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isValidPhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

function formatPhone(raw: string) {
  // Strip non-digits, keep up to 11 digits
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  error?: string;
  testId: string;
  autoFocus?: boolean;
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  error,
  testId,
  autoFocus,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const inputId = `koc-${testId}`;
  const errorId = `${inputId}-error`;
  return (
    <div className="relative" style={{ paddingTop: "22px" }}>
      <label
        htmlFor={inputId}
        className="font-display absolute left-0 pointer-events-none transition-all duration-300"
        style={{
          top: active ? "0" : "30px",
          fontSize: active ? "0.62rem" : "0.92rem",
          letterSpacing: active ? "0.22em" : "0.01em",
          textTransform: active ? "uppercase" : "none",
          fontWeight: active ? 600 : 400,
          color: active ? (focused ? "#FAFAFA" : "#888") : "#888",
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        placeholder={focused ? placeholder : ""}
        autoComplete={autoComplete}
        inputMode={inputMode}
        autoFocus={autoFocus}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="w-full bg-transparent outline-none border-0 py-3 text-white"
        style={{
          fontSize: "1rem",
          fontWeight: 400,
          letterSpacing: "0.005em",
          caretColor: "#fff",
        }}
        data-testid={testId}
      />
      <div className="relative h-px w-full" style={{ background: "rgba(255,255,255,0.12)" }}>
        <div
          className="absolute left-0 top-0 h-px transition-all duration-500"
          style={{
            width: focused ? "100%" : value.length > 0 ? "100%" : "0%",
            background: error ? "rgba(255,255,255,0.45)" : "#FAFAFA",
            transformOrigin: "left",
          }}
        />
        {error && (
          <div
            className="absolute left-0 top-0 h-px w-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 4px, transparent 4px 8px)",
            }}
          />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="italic mt-2"
            style={{ fontSize: "0.72rem", color: "#999", letterSpacing: "0.01em" }}
            data-testid={`${testId}-error`}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepIdentity() {
  const { state, setField, setErrors } = useCheckout();
  return (
    <div className="space-y-7">
      <Field
        label="Ad"
        value={state.form.name}
        onChange={(v) => setField("name", v)}
        onBlur={() => {
          if (state.form.name.trim().length < 2)
            setErrors({ ...state.errors, name: "Adını gir" });
        }}
        autoComplete="given-name"
        placeholder="Adın"
        error={state.errors.name}
        testId="field-name"
        autoFocus
      />
      <Field
        label="Soyad"
        value={state.form.surname}
        onChange={(v) => setField("surname", v)}
        onBlur={() => {
          if (state.form.surname.trim().length < 2)
            setErrors({ ...state.errors, surname: "Soyadını gir" });
        }}
        autoComplete="family-name"
        placeholder="Soyadın"
        error={state.errors.surname}
        testId="field-surname"
      />
      <p
        className="italic"
        style={{ fontSize: "0.74rem", color: "#666", lineHeight: 1.6, paddingTop: "8px" }}
      >
        Bilgilerin yalnızca koçluk sürecin için kullanılır. Üçüncü taraflarla paylaşılmaz.
      </p>
    </div>
  );
}

function StepContact() {
  const { state, setField, setErrors } = useCheckout();
  return (
    <div className="space-y-7">
      <Field
        label="E-posta"
        value={state.form.email}
        onChange={(v) => setField("email", v)}
        onBlur={() => {
          if (!isValidEmail(state.form.email))
            setErrors({ ...state.errors, email: "Geçerli bir e-posta gir" });
        }}
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="ad@ornek.com"
        error={state.errors.email}
        testId="field-email"
        autoFocus
      />
      <Field
        label="Telefon"
        value={state.form.phone}
        onChange={(v) => setField("phone", formatPhone(v))}
        onBlur={() => {
          if (!isValidPhone(state.form.phone))
            setErrors({ ...state.errors, phone: "Geçerli bir telefon numarası gir" });
        }}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="0532 123 45 67"
        error={state.errors.phone}
        testId="field-phone"
      />
      <div className="flex items-center gap-3" style={{ paddingTop: "8px" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2.5" y="6" width="9" height="6" stroke="currentColor" strokeWidth="1" style={{ color: "#888" }} />
          <path d="M4.5 6V4.5C4.5 3 5.5 2 7 2C8.5 2 9.5 3 9.5 4.5V6" stroke="currentColor" strokeWidth="1" style={{ color: "#888" }} />
        </svg>
        <span className="italic" style={{ fontSize: "0.72rem", color: "#777" }}>
          Veriler şifreli iletilir
        </span>
      </div>
    </div>
  );
}

function StepReview() {
  const { state, setField } = useCheckout();
  const pkg = getPackage(state.packageId);
  if (!pkg) return null;
  return (
    <div className="space-y-8">
      <div>
        <span
          className="font-display block mb-3"
          style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#666", fontWeight: 600 }}
        >
          Bilgilerini doğrula
        </span>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <ReviewRow label="Ad Soyad" value={`${state.form.name} ${state.form.surname}`} />
          <ReviewRow label="E-posta" value={state.form.email} />
          <ReviewRow label="Telefon" value={state.form.phone} />
          <ReviewRow label="Paket" value={pkg.duration} />
        </div>
      </div>

      <div>
        <span
          className="font-display block mb-3"
          style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#666", fontWeight: 600 }}
        >
          Ödeme
        </span>
        <div className="flex items-end justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: "18px" }}>
          <div>
            <span className="block" style={{ fontSize: "0.78rem", color: "#888", marginBottom: "4px" }}>
              Toplam (KDV dahil)
            </span>
            <span
              className="font-display"
              style={{ fontSize: "2.4rem", fontWeight: 700, letterSpacing: "-0.035em", color: "#FAFAFA", lineHeight: 1 }}
            >
              {formatTRY(pkg.price)}
              <span style={{ fontSize: "0.95rem", color: "#888", marginLeft: "8px", letterSpacing: "0.06em", fontWeight: 500 }}>
                TL
              </span>
            </span>
          </div>
          <div className="text-right">
            <span className="block" style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "#666", textTransform: "uppercase", marginBottom: "6px" }}>
              Ödeme Sağlayıcı
            </span>
            <span style={{ fontSize: "0.85rem", color: "#aaa", letterSpacing: "0.05em" }}>PayTR</span>
          </div>
        </div>
      </div>

      <label
        htmlFor="koc-kvkk"
        className="flex items-start gap-3 cursor-pointer select-none"
        style={{ fontSize: "0.78rem", color: "#aaa", lineHeight: 1.6 }}
      >
        <input
          id="koc-kvkk"
          type="checkbox"
          checked={state.form.kvkk}
          onChange={(e) => setField("kvkk", e.target.checked)}
          className="sr-only"
          data-testid="field-kvkk"
        />
        <span
          aria-hidden="true"
          className="shrink-0 mt-0.5 flex items-center justify-center"
          style={{
            width: "16px",
            height: "16px",
            border: state.form.kvkk ? "1px solid #fff" : "1px solid rgba(255,255,255,0.3)",
            background: state.form.kvkk ? "#fff" : "transparent",
            transition: "all 200ms",
          }}
        >
          {state.form.kvkk && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#000" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          )}
        </span>
        <span>
          KVKK kapsamında bilgilerimin koçluk süreci için işlenmesini kabul ediyorum.
        </span>
      </label>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-baseline justify-between py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span style={{ fontSize: "0.72rem", color: "#777", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.92rem", color: "#FAFAFA", fontWeight: 500, textAlign: "right" }}>
        {value || "—"}
      </span>
    </div>
  );
}

function SuccessScreen() {
  const { state, close } = useCheckout();
  const pkg = getPackage(state.packageId);
  const fullName = `${state.form.name}`.trim() || "Hoş geldin";
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: "70vh", padding: "40px 24px" }}>
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display block mb-4"
        style={{ fontSize: "0.7rem", letterSpacing: "0.32em", color: "#888", textTransform: "uppercase", fontWeight: 600 }}
      >
        Başvuru alındı
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="font-display mb-6"
        style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)", fontWeight: 700, letterSpacing: "-0.035em", color: "#FAFAFA", lineHeight: 1.05 }}
        data-testid="success-greeting"
      >
        Hoş Geldin,
        <br />
        <span style={{ color: "#5a5a5a" }}>{fullName}.</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ color: "#A8A8A8", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "440px", marginBottom: "28px" }}
      >
        24 saat içinde sana WhatsApp üzerinden ulaşacağım. Sürecin başlamasından önce kısa bir tanışma görüşmesi yapacağız.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col items-center gap-2 mb-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 32px" }}
      >
        <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", color: "#666", textTransform: "uppercase" }}>
          Sipariş No
        </span>
        <span className="font-display" style={{ fontSize: "1.05rem", color: "#FAFAFA", letterSpacing: "0.08em", fontWeight: 600 }} data-testid="success-order-id">
          {state.orderId ?? "—"}
        </span>
        {pkg && (
          <span style={{ fontSize: "0.78rem", color: "#888", marginTop: "4px" }}>
            {pkg.duration} · {formatTRY(pkg.price)} TL
          </span>
        )}
      </motion.div>

      <motion.a
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        href={WA_LINK_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 font-display font-medium uppercase transition-all duration-300"
        style={{
          background: "#fff",
          color: "#000",
          padding: "18px 36px",
          fontSize: "0.82rem",
          letterSpacing: "0.18em",
        }}
        data-testid="success-whatsapp-cta"
      >
        Süreci Başlat
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </motion.a>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        onClick={close}
        className="mt-10"
        style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#666", textTransform: "uppercase" }}
        data-testid="success-close"
      >
        Siteye Dön
      </motion.button>
    </div>
  );
}

function PackageSummary() {
  const { state } = useCheckout();
  const pkg = getPackage(state.packageId);
  if (!pkg) return null;
  return (
    <div className="flex flex-col h-full" style={{ padding: "32px 28px" }}>
      <span
        className="font-display block mb-4"
        style={{ fontSize: "0.62rem", letterSpacing: "0.28em", color: "#666", textTransform: "uppercase", fontWeight: 600 }}
      >
        Seçili Paket · {pkg.num}
      </span>
      <h3
        className="font-display mb-1"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#FAFAFA", lineHeight: 1 }}
      >
        {pkg.duration}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.55, maxWidth: "260px", marginTop: "10px" }}>
        {pkg.blurb}
      </p>

      <div className="mt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
        <span style={{ fontSize: "0.7rem", color: "#666", letterSpacing: "0.06em" }}>Toplam</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span
            className="font-display"
            style={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1 }}
          >
            {formatTRY(pkg.price)}
          </span>
          <span style={{ fontSize: "0.78rem", color: "#888", letterSpacing: "0.06em", fontWeight: 500 }}>
            TL
          </span>
        </div>
      </div>

      <div className="mt-auto pt-10">
        <p className="italic" style={{ fontSize: "0.72rem", color: "#666", lineHeight: 1.6 }}>
          Onayından sonra 24 saat içinde sana ulaşıyorum.
        </p>
      </div>
    </div>
  );
}

function CompactPackageBar() {
  const { state } = useCheckout();
  const pkg = getPackage(state.packageId);
  if (!pkg) return null;
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div className="min-w-0">
        <span
          className="font-display block"
          style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "#666", textTransform: "uppercase", fontWeight: 600 }}
        >
          Seçili · {pkg.num}
        </span>
        <span className="font-display block mt-0.5" style={{ fontSize: "0.95rem", color: "#FAFAFA", fontWeight: 600, letterSpacing: "-0.01em" }}>
          {pkg.duration}
        </span>
      </div>
      <div className="text-right shrink-0">
        <span className="font-display block" style={{ fontSize: "1.05rem", color: "#FAFAFA", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {formatTRY(pkg.price)}
          <span style={{ fontSize: "0.62rem", color: "#888", marginLeft: "4px", letterSpacing: "0.06em", fontWeight: 500 }}>
            TL
          </span>
        </span>
      </div>
    </div>
  );
}

function StepProgress() {
  const { state } = useCheckout();
  const idx = STEPS.findIndex((s) => s.id === state.step);
  const pct = state.step === "basari" ? 100 : ((idx + 1) / STEPS.length) * 100;
  return (
    <div>
      <div className="relative h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="absolute left-0 top-0 h-px"
          style={{ background: "#FAFAFA", transformOrigin: "left" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>
    </div>
  );
}

function TopBar() {
  const { state, close, setStep } = useCheckout();
  const idx = STEPS.findIndex((s) => s.id === state.step);
  const isSuccess = state.step === "basari";
  const canBack = !isSuccess && idx > 0;
  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-4 min-w-0">
        {canBack ? (
          <button
            onClick={() => setStep(STEPS[idx - 1].id)}
            className="flex items-center justify-center"
            style={{ width: "32px", height: "32px", color: "#888" }}
            data-testid="checkout-back"
            aria-label="Geri"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2M2 8L6 4M2 8L6 12" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        ) : (
          <span className="font-display font-700 text-base tracking-tight text-white">
            KOÇ<span style={{ opacity: 0.3 }}>.</span>
          </span>
        )}
        {!isSuccess && (
          <span className="font-display" style={{ fontSize: "0.6rem", letterSpacing: "0.24em", color: "#777", fontWeight: 600 }}>
            ADIM {STEPS[idx].n} <span style={{ color: "#444" }}>· {STEPS.length.toString().padStart(2, "0")}</span>
          </span>
        )}
      </div>
      <button
        onClick={close}
        className="flex items-center gap-2"
        style={{ color: "#888", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
        data-testid="checkout-close"
      >
        <span className="hidden sm:inline">Vazgeç</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" />
          <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
    </div>
  );
}

function validateStep(step: CheckoutStep, form: CheckoutForm): Partial<Record<keyof CheckoutForm, string>> {
  const errs: Partial<Record<keyof CheckoutForm, string>> = {};
  if (step === "kimlik") {
    if (form.name.trim().length < 2) errs.name = "Adını gir";
    if (form.surname.trim().length < 2) errs.surname = "Soyadını gir";
  }
  if (step === "iletisim") {
    if (!isValidEmail(form.email)) errs.email = "Geçerli bir e-posta gir";
    if (!isValidPhone(form.phone)) errs.phone = "Geçerli bir telefon numarası gir";
  }
  if (step === "onay") {
    if (!form.kvkk) errs.kvkk = "KVKK onayı gerekli";
  }
  return errs;
}

function BottomCTA() {
  const { state, setStep, setErrors, submit } = useCheckout();
  const idx = STEPS.findIndex((s) => s.id === state.step);
  const isLast = state.step === "onay";
  const pkg = getPackage(state.packageId);

  const valid = useMemo(() => {
    return Object.keys(validateStep(state.step, state.form)).length === 0;
  }, [state.step, state.form]);

  const onPrimary = async () => {
    const errs = validateStep(state.step, state.form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (isLast) {
      await submit();
    } else {
      setStep(STEPS[idx + 1].id);
    }
  };

  const label = isLast ? `Öde ${pkg ? formatTRY(pkg.price) : ""} TL` : "Devam Et";

  return (
    <div
      className="sticky bottom-0 left-0 right-0"
      style={{
        background: "linear-gradient(to top, #060606 70%, rgba(6,6,6,0.85) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 20px 20px",
      }}
    >
      <button
        onClick={onPrimary}
        disabled={state.submitting}
        className="w-full flex items-center justify-between font-display uppercase transition-all duration-500"
        style={{
          padding: "18px 22px",
          background: valid ? "#FAFAFA" : "transparent",
          color: valid ? "#000" : "#fff",
          border: valid ? "1px solid #fff" : "1px solid rgba(255,255,255,0.25)",
          fontSize: "0.82rem",
          letterSpacing: "0.18em",
          fontWeight: 600,
          opacity: state.submitting ? 0.6 : 1,
          cursor: state.submitting ? "wait" : "pointer",
        }}
        data-testid="checkout-primary"
      >
        <span>
          {state.submitting ? "Yönlendiriliyorsun..." : label}
        </span>
        {!state.submitting && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </button>
      <p className="text-center mt-3 italic" style={{ fontSize: "0.66rem", color: "#666", letterSpacing: "0.04em" }}>
        Ödeme PayTR güvenli ödeme altyapısı üzerinden alınır.
      </p>
    </div>
  );
}

export default function CheckoutPanel() {
  const { state } = useCheckout();
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Reset scroll on step change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.step]);

  // Focus trap + restoration
  useEffect(() => {
    if (!state.open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;

    // Initial focus to first focusable input/button after a tick
    const t = window.setTimeout(() => {
      const node = panelRef.current;
      if (!node) return;
      const focusable = node.querySelector<HTMLElement>(
        "input:not([type='hidden']):not(.sr-only), button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
      );
      focusable?.focus();
    }, 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const node = panelRef.current;
      if (!node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(
          "input:not([type='hidden']):not(.sr-only), button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => !el.hasAttribute("aria-hidden") && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      // Restore focus on close
      const prev = previousFocus.current;
      if (prev && typeof prev.focus === "function") {
        try {
          prev.focus();
        } catch {
          // ignore
        }
      }
    };
  }, [state.open]);

  return (
    <AnimatePresence>
      {state.open && (
        <motion.div
          ref={panelRef}
          initial={{ y: "100%", opacity: 0.7 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 flex flex-col"
          style={{ background: "#060606", zIndex: 200, height: "100dvh" }}
          role="dialog"
          aria-modal="true"
          aria-label="Başvuru ödeme akışı"
          data-testid="checkout-panel"
        >
          <TopBar />
          {state.step !== "basari" && <StepProgress />}

          <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
            {state.step === "basari" ? (
              <SuccessScreen />
            ) : (
              <div className="md:grid md:grid-cols-[minmax(0,360px)_1fr] md:gap-12 md:max-w-5xl md:mx-auto md:px-10 md:py-16">
                {/* Mobile: compact bar at top */}
                <div className="md:hidden">
                  <CompactPackageBar />
                </div>

                {/* Desktop: sticky package summary on left */}
                <div className="hidden md:block">
                  <div className="sticky top-8" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <PackageSummary />
                  </div>
                </div>

                <div style={{ padding: "32px 24px 40px", maxWidth: "520px" }} className="md:px-0 md:py-0 md:pt-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={state.step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <h2
                        className="font-display mb-2"
                        style={{ fontSize: "clamp(1.7rem, 5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#FAFAFA", lineHeight: 1.1 }}
                      >
                        {state.step === "kimlik" && "Önce Sen Kimsin?"}
                        {state.step === "iletisim" && "Sana Nasıl Ulaşırım?"}
                        {state.step === "onay" && "Son Bir Bakış."}
                      </h2>
                      <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "32px" }}>
                        {state.step === "kimlik" && "Faturanı düzgün hazırlamak için tam adın gerekli."}
                        {state.step === "iletisim" && "Onay ve süreç bilgileri için iki kanal alıyorum."}
                        {state.step === "onay" && "Onayladığında güvenli ödeme sayfasına yönlendirileceksin."}
                      </p>

                      {state.step === "kimlik" && <StepIdentity />}
                      {state.step === "iletisim" && <StepContact />}
                      {state.step === "onay" && <StepReview />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {state.step !== "basari" && <BottomCTA />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
