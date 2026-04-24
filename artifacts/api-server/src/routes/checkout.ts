import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, packagesTable, ordersTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function generateOrderCode() {
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

router.post("/checkout/session", async (req, res) => {
  const body = req.body ?? {};
  const packageSlug = String(body.packageId ?? "").trim();
  const name = String(body.name ?? "").trim();
  const surname = String(body.surname ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const kvkk = body.kvkk === true;
  const source = typeof body.source === "string" ? body.source.slice(0, 128) : null;
  const hasCondition = body.hasCondition === true;
  const rawNote = typeof body.conditionNote === "string" ? body.conditionNote.trim() : "";
  const conditionNote = hasCondition && rawNote.length > 0 ? rawNote.slice(0, 2000) : null;

  const pkgRows = await db
    .select()
    .from(packagesTable)
    .where(eq(packagesTable.slug, packageSlug))
    .limit(1);
  const pkg = pkgRows[0];
  if (!pkg || !pkg.active) {
    return res.status(400).json({ error: "invalid_package" });
  }
  if (name.length < 2) return res.status(400).json({ error: "invalid_name" });
  if (surname.length < 2) return res.status(400).json({ error: "invalid_surname" });
  if (!isValidEmail(email)) return res.status(400).json({ error: "invalid_email" });
  if (!isValidPhone(phone)) return res.status(400).json({ error: "invalid_phone" });
  if (!kvkk) return res.status(400).json({ error: "kvkk_required" });

  const orderCode = generateOrderCode();
  await db.insert(ordersTable).values({
    orderCode,
    packageId: packageSlug,
    name,
    surname,
    email,
    phone,
    priceTry: pkg.priceTry,
    status: "ready",
    source,
    hasCondition,
    conditionNote,
  });

  const [local, domain] = email.split("@");
  const maskedEmail = local ? `${local.slice(0, 2)}***@${domain ?? ""}` : "***";
  logger.info({ orderCode, packageSlug, email: maskedEmail }, "checkout session created");

  return res.json({
    orderId: orderCode,
    status: "ready",
    duration: pkg.duration,
    priceTRY: pkg.priceTry,
  });
});

export default router;
