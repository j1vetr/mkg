import { Router, type IRouter } from "express";
import { sql, desc, gte } from "drizzle-orm";
import { db, ordersTable, visitsTable } from "@workspace/db";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

router.get("/admin/stats", requireAdmin, async (_req, res) => {
  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);

  const [{ totalOrders }] = await db
    .select({ totalOrders: sql<number>`count(*)::int` })
    .from(ordersTable);

  const [{ revenue30d }] = await db
    .select({ revenue30d: sql<number>`coalesce(sum(${ordersTable.priceTry}), 0)::int` })
    .from(ordersTable)
    .where(gte(ordersTable.createdAt, since));

  const [{ orders30d }] = await db
    .select({ orders30d: sql<number>`count(*)::int` })
    .from(ordersTable)
    .where(gte(ordersTable.createdAt, since));

  const [{ totalVisits }] = await db
    .select({ totalVisits: sql<number>`count(*)::int` })
    .from(visitsTable);

  const [{ visits30d }] = await db
    .select({ visits30d: sql<number>`count(*)::int` })
    .from(visitsTable)
    .where(gte(visitsTable.createdAt, since));

  const ordersByDay = await db
    .select({
      day: sql<string>`to_char(date_trunc('day', ${ordersTable.createdAt}), 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
      revenue: sql<number>`coalesce(sum(${ordersTable.priceTry}), 0)::int`,
    })
    .from(ordersTable)
    .where(gte(ordersTable.createdAt, since))
    .groupBy(sql`date_trunc('day', ${ordersTable.createdAt})`)
    .orderBy(sql`date_trunc('day', ${ordersTable.createdAt})`);

  const visitsByDay = await db
    .select({
      day: sql<string>`to_char(date_trunc('day', ${visitsTable.createdAt}), 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
    })
    .from(visitsTable)
    .where(gte(visitsTable.createdAt, since))
    .groupBy(sql`date_trunc('day', ${visitsTable.createdAt})`)
    .orderBy(sql`date_trunc('day', ${visitsTable.createdAt})`);

  const sources = await db
    .select({
      source: sql<string>`coalesce(${visitsTable.utmSource}, 'direct')`,
      count: sql<number>`count(*)::int`,
    })
    .from(visitsTable)
    .where(gte(visitsTable.createdAt, since))
    .groupBy(sql`coalesce(${visitsTable.utmSource}, 'direct')`)
    .orderBy(desc(sql`count(*)`))
    .limit(10);

  const referrers = await db
    .select({
      referrer: sql<string>`coalesce(${visitsTable.referrer}, 'direct')`,
      count: sql<number>`count(*)::int`,
    })
    .from(visitsTable)
    .where(gte(visitsTable.createdAt, since))
    .groupBy(sql`coalesce(${visitsTable.referrer}, 'direct')`)
    .orderBy(desc(sql`count(*)`))
    .limit(10);

  const ordersByPackage = await db
    .select({
      packageId: ordersTable.packageId,
      count: sql<number>`count(*)::int`,
      revenue: sql<number>`coalesce(sum(${ordersTable.priceTry}), 0)::int`,
    })
    .from(ordersTable)
    .where(gte(ordersTable.createdAt, since))
    .groupBy(ordersTable.packageId)
    .orderBy(desc(sql`count(*)`));

  const recent = await db
    .select()
    .from(ordersTable)
    .orderBy(desc(ordersTable.createdAt))
    .limit(20);

  return res.json({
    totals: {
      totalOrders,
      revenue30d,
      orders30d,
      totalVisits,
      visits30d,
    },
    ordersByDay,
    visitsByDay,
    sources,
    referrers,
    ordersByPackage,
    recentOrders: recent.map((o) => ({
      id: o.id,
      orderCode: o.orderCode,
      packageId: o.packageId,
      name: o.name,
      surname: o.surname,
      email: o.email,
      phone: o.phone,
      priceTry: o.priceTry,
      status: o.status,
      source: o.source,
      createdAt: o.createdAt,
    })),
  });
});

export default router;
