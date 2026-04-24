import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const PACKAGE_PRICES: Record<string, { duration: string; priceTRY: number }> = {
  "3-ay": { duration: "3 Ay", priceTRY: 6400 },
  "6-ay": { duration: "6 Ay", priceTRY: 9600 },
  "12-ay": { duration: "12 Ay", priceTRY: 16000 },
  "gorusme": { duration: "30dk Görüşme", priceTRY: 7000 },
};

const orders = new Map<
  string,
  {
    id: string;
    packageId: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    priceTRY: number;
    status: "pending" | "ready" | "paid";
    createdAt: number;
  }
>();

function generateOrderId() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const ts = Date.now().toString(36).slice(-3).toUpperCase();
  return `KOC-${ts}-${rand}`;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

router.post("/checkout/session", (req, res) => {
  const body = req.body ?? {};
  const packageId = String(body.packageId ?? "").trim();
  const name = String(body.name ?? "").trim();
  const surname = String(body.surname ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const kvkk = body.kvkk === true;

  const pkg = PACKAGE_PRICES[packageId];
  if (!pkg) {
    return res.status(400).json({ error: "invalid_package" });
  }
  if (name.length < 2) return res.status(400).json({ error: "invalid_name" });
  if (surname.length < 2) return res.status(400).json({ error: "invalid_surname" });
  if (!isValidEmail(email)) return res.status(400).json({ error: "invalid_email" });
  if (!isValidPhone(phone)) return res.status(400).json({ error: "invalid_phone" });
  if (!kvkk) return res.status(400).json({ error: "kvkk_required" });

  const orderId = generateOrderId();
  const order = {
    id: orderId,
    packageId,
    name,
    surname,
    email,
    phone,
    priceTRY: pkg.priceTRY,
    status: "ready" as const,
    createdAt: Date.now(),
  };
  orders.set(orderId, order);

  // Mask email for KVKK/GDPR-friendly logs
  const [local, domain] = email.split("@");
  const maskedEmail = local
    ? `${local.slice(0, 2)}***@${domain ?? ""}`
    : "***";
  logger.info({ orderId, packageId, email: maskedEmail }, "checkout session created");

  // TODO(payment): integrate Iyzico CheckoutForm here.
  //   const iyzicoSession = await iyzico.checkoutForm.initialize({...});
  //   return res.json({ orderId, paymentSessionUrl: iyzicoSession.paymentPageUrl });
  // Stripe fallback can be wired similarly with stripe.checkout.sessions.create.

  return res.json({
    orderId,
    status: "ready",
    duration: pkg.duration,
    priceTRY: pkg.priceTRY,
  });
});

router.get("/checkout/order/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "not_found" });
  return res.json({
    id: order.id,
    packageId: order.packageId,
    name: order.name,
    status: order.status,
    priceTRY: order.priceTRY,
  });
});

export default router;
