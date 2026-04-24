import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const packagesTable = pgTable("packages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  duration: text("duration").notNull(),
  blurb: text("blurb").notNull(),
  priceTry: integer("price_try").notNull(),
  highlight: boolean("highlight").notNull().default(false),
  position: integer("position").notNull().default(0),
  active: boolean("active").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Package = typeof packagesTable.$inferSelect;
