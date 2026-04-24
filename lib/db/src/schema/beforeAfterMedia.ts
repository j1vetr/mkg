import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const beforeAfterMediaTable = pgTable("before_after_media", {
  id: serial("id").primaryKey(),
  objectPath: text("object_path").notNull(),
  thumbObjectPath: text("thumb_object_path"),
  caption: text("caption"),
  weeks: text("weeks"),
  position: integer("position").notNull().default(0),
  width: integer("width"),
  height: integer("height"),
  bytes: integer("bytes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type BeforeAfterMedia = typeof beforeAfterMediaTable.$inferSelect;
