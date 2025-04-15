import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  text,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { playersTable } from "./players";

export const achievementsTable = pgTable("achievements", {
  id: uuid("id").primaryKey().defaultRandom(),
  playerId: uuid("player_id")
    .notNull()
    .references(() => playersTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  link: varchar("link", { length: 500 }),
  result: varchar("result", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const achievementsRelations = relations(
  achievementsTable,
  ({ one, many }) => ({
    player: one(playersTable, {
      fields: [achievementsTable.playerId],
      references: [playersTable.id],
    }),
  })
);

export const achievementSelectSchema = createSelectSchema(achievementsTable);
export const achievementInsertSchema = createInsertSchema(achievementsTable);
export const achievementUpdateSchema = createUpdateSchema(achievementsTable);
