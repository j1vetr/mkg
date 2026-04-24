import bcrypt from "bcryptjs";
import { randomBytes, createHmac, timingSafeEqual } from "crypto";
import type { Request, Response, NextFunction } from "express";
import { eq, and, gt } from "drizzle-orm";
import { db, adminUsersTable, adminSessionsTable } from "@workspace/db";
import { logger } from "./logger";

const SESSION_COOKIE = "kc_admin_sid";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;

const SECRET = process.env.SESSION_SECRET ?? "dev-only-not-secret";

const ADMIN_USERNAME = "toov-mhk";
const ADMIN_PASSWORD = "Toov1453@@mhk";

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("base64url");
}

function pack(sessionId: string): string {
  return `${sessionId}.${sign(sessionId)}`;
}

function unpack(cookie: string | undefined): string | null {
  if (!cookie || !cookie.includes(".")) return null;
  const idx = cookie.lastIndexOf(".");
  const id = cookie.slice(0, idx);
  const sig = cookie.slice(idx + 1);
  const expected = sign(id);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!timingSafeEqual(a, b)) return null;
    return id;
  } catch {
    return null;
  }
}

let bootstrapPromise: Promise<void> | null = null;

export function bootstrapAdmin(): Promise<void> {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      const existing = await db
        .select()
        .from(adminUsersTable)
        .where(eq(adminUsersTable.username, ADMIN_USERNAME))
        .limit(1);
      if (existing.length > 0) {
        // Refresh password to match env-defined credentials
        const ok = await bcrypt.compare(ADMIN_PASSWORD, existing[0].passwordHash);
        if (!ok) {
          const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
          await db
            .update(adminUsersTable)
            .set({ passwordHash })
            .where(eq(adminUsersTable.id, existing[0].id));
          logger.info("admin password updated");
        }
        return;
      }
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await db.insert(adminUsersTable).values({
        username: ADMIN_USERNAME,
        passwordHash,
      });
      logger.info({ username: ADMIN_USERNAME }, "admin user created");
    })().catch((err) => {
      logger.error({ err }, "admin bootstrap failed");
    });
  }
  return bootstrapPromise;
}

export async function verifyCredentials(
  username: string,
  password: string,
): Promise<{ id: number; username: string } | null> {
  const rows = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.username, username))
    .limit(1);
  if (rows.length === 0) return null;
  const ok = await bcrypt.compare(password, rows[0].passwordHash);
  if (!ok) return null;
  return { id: rows[0].id, username: rows[0].username };
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = randomBytes(24).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(adminSessionsTable).values({ id: sessionId, userId, expiresAt });
  return pack(sessionId);
}

export async function destroySession(packedCookie: string | undefined): Promise<void> {
  const id = unpack(packedCookie);
  if (!id) return;
  await db.delete(adminSessionsTable).where(eq(adminSessionsTable.id, id));
}

export async function getSession(
  packedCookie: string | undefined,
): Promise<{ id: number; username: string } | null> {
  const id = unpack(packedCookie);
  if (!id) return null;
  const rows = await db
    .select({
      userId: adminSessionsTable.userId,
      username: adminUsersTable.username,
    })
    .from(adminSessionsTable)
    .innerJoin(adminUsersTable, eq(adminUsersTable.id, adminSessionsTable.userId))
    .where(and(eq(adminSessionsTable.id, id), gt(adminSessionsTable.expiresAt, new Date())))
    .limit(1);
  if (rows.length === 0) return null;
  return { id: rows[0].userId, username: rows[0].username };
}

export function setSessionCookie(res: Response, packedCookie: string): void {
  res.cookie(SESSION_COOKIE, packedCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_MS,
    path: "/",
  });
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
}

export function getSessionCookie(req: Request): string | undefined {
  return req.cookies?.[SESSION_COOKIE];
}

export interface AdminRequest extends Request {
  admin?: { id: number; username: string };
}

export async function requireAdmin(
  req: AdminRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const session = await getSession(getSessionCookie(req));
  if (!session) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  req.admin = session;
  next();
}
