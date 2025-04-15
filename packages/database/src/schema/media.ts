import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { playerPerformancesTable } from "./playerPerformances";

export const mediaTable = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: varchar("url", { length: 500 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const mediaRelations = relations(mediaTable, ({ many }) => ({
  performances: many(playerPerformancesTable),
}));

export const mediaSelectSchema = createSelectSchema(mediaTable);
export const mediaInsertSchema = createInsertSchema(mediaTable);
export const mediaUpdateSchema = createUpdateSchema(mediaTable);
