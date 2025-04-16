import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { usersTable } from "./users";
import { mediaTable } from "./media";

export const playerPerformancesTable = pgTable("player_performances", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  mediaId: uuid("media_id")
    .notNull()
    .references(() => mediaTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  performanceDate: timestamp("performance_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const playerPerformancesRelations = relations(
  playerPerformancesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [playerPerformancesTable.userId],
      references: [usersTable.id],
    }),
    media: one(mediaTable, {
      fields: [playerPerformancesTable.mediaId],
      references: [mediaTable.id],
    }),
  })
);

export const playerPerformanceSelectSchema = createSelectSchema(
  playerPerformancesTable
);
export const playerPerformanceInsertSchema = createInsertSchema(
  playerPerformancesTable
);
export const playerPerformanceUpdateSchema = createUpdateSchema(
  playerPerformancesTable
);
