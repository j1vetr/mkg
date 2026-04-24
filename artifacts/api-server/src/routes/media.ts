import { Router, type IRouter, type Request, type Response } from "express";
import multer from "multer";
import { asc, desc, eq } from "drizzle-orm";
import { db, beforeAfterMediaTable } from "@workspace/db";
import { requireAdmin } from "../lib/adminAuth";
import { optimizeAndUpload, deleteObject, streamObject } from "../lib/imageStorage";

const router: IRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.get("/before-after", async (_req, res) => {
  const rows = await db
    .select()
    .from(beforeAfterMediaTable)
    .orderBy(asc(beforeAfterMediaTable.position), desc(beforeAfterMediaTable.createdAt));
  return res.json({
    items: rows.map((r) => ({
      id: r.id,
      objectPath: r.objectPath,
      thumbObjectPath: r.thumbObjectPath,
      caption: r.caption,
      weeks: r.weeks,
      position: r.position,
      width: r.width,
      height: r.height,
    })),
  });
});

router.get("/admin/before-after", requireAdmin, async (_req, res) => {
  const rows = await db
    .select()
    .from(beforeAfterMediaTable)
    .orderBy(asc(beforeAfterMediaTable.position), desc(beforeAfterMediaTable.createdAt));
  return res.json({
    items: rows.map((r) => ({
      id: r.id,
      objectPath: r.objectPath,
      thumbObjectPath: r.thumbObjectPath,
      caption: r.caption,
      weeks: r.weeks,
      position: r.position,
      width: r.width,
      height: r.height,
      bytes: r.bytes,
      createdAt: r.createdAt,
    })),
  });
});

router.post(
  "/admin/before-after",
  requireAdmin,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) {
      return res.status(400).json({ error: "no_file" });
    }
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ error: "invalid_type" });
    }

    const caption = typeof req.body?.caption === "string" ? req.body.caption.trim() : null;
    const weeks = typeof req.body?.weeks === "string" ? req.body.weeks.trim() : null;
    const position = Number.isFinite(Number(req.body?.position)) ? Number(req.body?.position) : 0;

    let optimized;
    try {
      optimized = await optimizeAndUpload(file.buffer);
    } catch (err) {
      req.log.error({ err }, "image optimize failed");
      return res.status(500).json({ error: "optimize_failed" });
    }

    const inserted = await db
      .insert(beforeAfterMediaTable)
      .values({
        objectPath: optimized.objectPath,
        thumbObjectPath: optimized.thumbObjectPath,
        caption,
        weeks,
        position,
        width: optimized.width,
        height: optimized.height,
        bytes: optimized.bytes,
      })
      .returning();

    const r = inserted[0];
    return res.json({
      item: {
        id: r.id,
        objectPath: r.objectPath,
        thumbObjectPath: r.thumbObjectPath,
        caption: r.caption,
        weeks: r.weeks,
        position: r.position,
        width: r.width,
        height: r.height,
        bytes: r.bytes,
      },
    });
  },
);

router.patch("/admin/before-after/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "invalid_id" });
  const body = req.body ?? {};
  const updates: Record<string, unknown> = {};
  if (typeof body.caption === "string") updates.caption = body.caption.trim();
  if (typeof body.weeks === "string") updates.weeks = body.weeks.trim();
  if (typeof body.position === "number") updates.position = Math.round(body.position);

  const result = await db
    .update(beforeAfterMediaTable)
    .set(updates)
    .where(eq(beforeAfterMediaTable.id, id))
    .returning();
  if (result.length === 0) return res.status(404).json({ error: "not_found" });
  const r = result[0];
  return res.json({
    item: {
      id: r.id,
      objectPath: r.objectPath,
      thumbObjectPath: r.thumbObjectPath,
      caption: r.caption,
      weeks: r.weeks,
      position: r.position,
    },
  });
});

router.delete("/admin/before-after/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "invalid_id" });
  const rows = await db
    .select()
    .from(beforeAfterMediaTable)
    .where(eq(beforeAfterMediaTable.id, id))
    .limit(1);
  if (rows.length === 0) return res.status(404).json({ error: "not_found" });
  await db.delete(beforeAfterMediaTable).where(eq(beforeAfterMediaTable.id, id));
  await deleteObject(rows[0].objectPath);
  if (rows[0].thumbObjectPath) await deleteObject(rows[0].thumbObjectPath);
  return res.json({ ok: true });
});

router.get("/storage/objects/*splat", async (req, res) => {
  const splat = (req.params as Record<string, string | string[]>).splat;
  const rest = Array.isArray(splat) ? splat.join("/") : (splat ?? "");
  const objectPath = `/objects/${rest}`;
  try {
    const result = await streamObject(objectPath);
    if (!result) {
      res.status(404).end();
      return;
    }
    res.setHeader("Content-Type", result.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    if (result.size) res.setHeader("Content-Length", String(result.size));
    result.stream
      .on("error", (err) => {
        req.log.error({ err }, "stream object error");
        if (!res.headersSent) res.status(500).end();
      })
      .pipe(res);
  } catch (err) {
    req.log.error({ err }, "object serve error");
    res.status(404).end();
  }
});

export default router;
