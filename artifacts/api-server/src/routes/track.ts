import { Router, type IRouter } from "express";
import { db, visitsTable } from "@workspace/db";

const router: IRouter = Router();

function clean(value: unknown, max = 256): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return null;
  return v.slice(0, max);
}

router.post("/track/visit", async (req, res) => {
  const body = req.body ?? {};
  const path = clean(body.path) ?? "/";
  const referrer = clean(body.referrer) ?? clean(req.get("referer"));
  const utmSource = clean(body.utmSource);
  const utmMedium = clean(body.utmMedium);
  const utmCampaign = clean(body.utmCampaign);
  const utmTerm = clean(body.utmTerm);
  const utmContent = clean(body.utmContent);

  try {
    await db.insert(visitsTable).values({
      path,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    });
  } catch (err) {
    req.log.warn({ err }, "track visit failed");
  }
  return res.status(204).end();
});

export default router;
