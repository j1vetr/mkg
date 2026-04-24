import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { PackageId } from "./data";

export type CheckoutStep = "kimlik" | "iletisim" | "onay" | "basari";

export interface CheckoutForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  kvkk: boolean;
}

export interface CheckoutState {
  open: boolean;
  step: CheckoutStep;
  packageId: PackageId | null;
  form: CheckoutForm;
  submitting: boolean;
  orderId: string | null;
  errors: Partial<Record<keyof CheckoutForm, string>>;
}

const EMPTY_FORM: CheckoutForm = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  kvkk: true,
};

const INITIAL: CheckoutState = {
  open: false,
  step: "kimlik",
  packageId: null,
  form: EMPTY_FORM,
  submitting: false,
  orderId: null,
  errors: {},
};

type Action =
  | { type: "OPEN"; packageId: PackageId }
  | { type: "CLOSE" }
  | { type: "STEP"; step: CheckoutStep }
  | { type: "SET_FIELD"; key: keyof CheckoutForm; value: string | boolean }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof CheckoutForm, string>> }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; orderId: string }
  | { type: "SUBMIT_ERROR" }
  | { type: "RESTORE"; state: Partial<CheckoutState> };

function reducer(state: CheckoutState, action: Action): CheckoutState {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        open: true,
        packageId: action.packageId,
        step: state.orderId ? "kimlik" : state.step,
        orderId: null,
      };
    case "CLOSE":
      return { ...state, open: false };
    case "STEP":
      return { ...state, step: action.step, errors: {} };
    case "SET_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.key]: action.value },
        errors: { ...state.errors, [action.key]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SUBMIT_START":
      return { ...state, submitting: true };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submitting: false,
        orderId: action.orderId,
        step: "basari",
      };
    case "SUBMIT_ERROR":
      return { ...state, submitting: false };
    case "RESTORE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

interface CheckoutContextValue {
  state: CheckoutState;
  open: (id: PackageId) => void;
  close: () => void;
  setStep: (s: CheckoutStep) => void;
  setField: (k: keyof CheckoutForm, v: string | boolean) => void;
  setErrors: (e: Partial<Record<keyof CheckoutForm, string>>) => void;
  submit: () => Promise<void>;
}

const Ctx = createContext<CheckoutContextValue | null>(null);

const STORAGE_KEY = "koc.checkout.v1";

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved && typeof saved === "object") {
        dispatch({
          type: "RESTORE",
          state: {
            packageId: saved.packageId ?? null,
            step: saved.step ?? "kimlik",
            form: { ...EMPTY_FORM, ...(saved.form ?? {}) },
            orderId: saved.orderId ?? null,
          },
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist relevant state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          packageId: state.packageId,
          step: state.step,
          form: state.form,
          orderId: state.orderId,
        }),
      );
    } catch {
      // ignore
    }
  }, [state.packageId, state.step, state.form, state.orderId]);

  // Body scroll lock + Esc to close
  useEffect(() => {
    if (!state.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch({ type: "CLOSE" });
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [state.open]);

  const open = useCallback((id: PackageId) => dispatch({ type: "OPEN", packageId: id }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const setStep = useCallback((s: CheckoutStep) => dispatch({ type: "STEP", step: s }), []);
  const setField = useCallback(
    (k: keyof CheckoutForm, v: string | boolean) => dispatch({ type: "SET_FIELD", key: k, value: v }),
    [],
  );
  const setErrors = useCallback(
    (e: Partial<Record<keyof CheckoutForm, string>>) => dispatch({ type: "SET_ERRORS", errors: e }),
    [],
  );

  const submit = useCallback(async () => {
    if (!state.packageId) return;
    dispatch({ type: "SUBMIT_START" });
    try {
      // api-server is mounted at /api via the workspace proxy
      const { getCurrentSource } = await import("@/lib/visitTracking");
      const res = await fetch(`/api/checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: state.packageId,
          name: state.form.name.trim(),
          surname: state.form.surname.trim(),
          email: state.form.email.trim().toLowerCase(),
          phone: state.form.phone.trim(),
          kvkk: state.form.kvkk,
          source: getCurrentSource(),
        }),
      });
      if (!res.ok) {
        dispatch({ type: "SUBMIT_ERROR" });
        return;
      }
      const data = await res.json();
      // Mock payment redirect delay (Iyzico would redirect here in production)
      await new Promise((r) => setTimeout(r, 1400));
      dispatch({ type: "SUBMIT_SUCCESS", orderId: data.orderId });
    } catch {
      dispatch({ type: "SUBMIT_ERROR" });
    }
  }, [state.packageId, state.form]);

  const value = useMemo(
    () => ({ state, open, close, setStep, setField, setErrors, submit }),
    [state, open, close, setStep, setField, setErrors, submit],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCheckout() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
