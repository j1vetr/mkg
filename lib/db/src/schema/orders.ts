import { pgTable, text, timestamp, integer, serial } from "drizzle-orm/pg-core";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderCode: text("order_code").notNull().unique(),
  packageId: text("package_id").notNull(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  priceTry: integer("price_try").notNull(),
  status: text("status").notNull().default("ready"),
  source: text("source"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Order = typeof ordersTable.$inferSelect;
