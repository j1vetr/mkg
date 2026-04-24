import { Router, type IRouter } from "express";
import {
  verifyCredentials,
  createSession,
  destroySession,
  getSession,
  setSessionCookie,
  clearSessionCookie,
  getSessionCookie,
} from "../lib/adminAuth";

const router: IRouter = Router();

router.post("/admin/login", async (req, res) => {
  const username = String(req.body?.username ?? "").trim();
  const password = String(req.body?.password ?? "");
  if (!username || !password) {
    return res.status(400).json({ error: "missing_fields" });
  }
  const user = await verifyCredentials(username, password);
  if (!user) {
    return res.status(401).json({ error: "invalid_credentials" });
  }
  const cookie = await createSession(user.id);
  setSessionCookie(res, cookie);
  return res.json({ username: user.username });
});

router.post("/admin/logout", async (req, res) => {
  await destroySession(getSessionCookie(req));
  clearSessionCookie(res);
  return res.json({ ok: true });
});

router.get("/admin/me", async (req, res) => {
  const session = await getSession(getSessionCookie(req));
  if (!session) {
    return res.status(401).json({ error: "unauthorized" });
  }
  return res.json({ username: session.username });
});

export default router;
