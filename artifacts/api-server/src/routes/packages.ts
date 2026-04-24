import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, packagesTable } from "@workspace/db";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

function publicShape(rows: Array<typeof packagesTable.$inferSelect>) {
  return rows.map((p) => ({
    slug: p.slug,
    duration: p.duration,
    blurb: p.blurb,
    priceTry: p.priceTry,
    highlight: p.highlight,
    position: p.position,
    active: p.active,
  }));
}

router.get("/packages", async (_req, res) => {
  const rows = await db
    .select()
    .from(packagesTable)
    .where(eq(packagesTable.active, true))
    .orderBy(asc(packagesTable.position));
  return res.json({ packages: publicShape(rows) });
});

router.get("/admin/packages", requireAdmin, async (_req, res) => {
  const rows = await db.select().from(packagesTable).orderBy(asc(packagesTable.position));
  return res.json({
    packages: rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      duration: p.duration,
      blurb: p.blurb,
      priceTry: p.priceTry,
      highlight: p.highlight,
      position: p.position,
      active: p.active,
      updatedAt: p.updatedAt,
    })),
  });
});

router.put("/admin/packages/:slug", requireAdmin, async (req, res) => {
  const slug = String(req.params.slug);
  const body = req.body ?? {};
  const updates: Record<string, unknown> = { updatedAt: new Date() };

  if (typeof body.duration === "string") updates.duration = body.duration.trim();
  if (typeof body.blurb === "string") updates.blurb = body.blurb.trim();
  if (typeof body.priceTry === "number" && body.priceTry >= 0) updates.priceTry = Math.round(body.priceTry);
  if (typeof body.highlight === "boolean") updates.highlight = body.highlight;
  if (typeof body.position === "number") updates.position = Math.round(body.position);
  if (typeof body.active === "boolean") updates.active = body.active;

  const result = await db
    .update(packagesTable)
    .set(updates)
    .where(eq(packagesTable.slug, slug))
    .returning();

  if (result.length === 0) return res.status(404).json({ error: "not_found" });
  const p = result[0];
  return res.json({
    package: {
      id: p.id,
      slug: p.slug,
      duration: p.duration,
      blurb: p.blurb,
      priceTry: p.priceTry,
      highlight: p.highlight,
      position: p.position,
      active: p.active,
      updatedAt: p.updatedAt,
    },
  });
});

export default router;
