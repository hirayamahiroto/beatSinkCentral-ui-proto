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
export const playerStoriesTable = pgTable("player_stories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const playerStoriesRelations = relations(
  playerStoriesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [playerStoriesTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const playerStorySelectSchema = createSelectSchema(playerStoriesTable);
export const playerStoryInsertSchema = createInsertSchema(playerStoriesTable);
export const playerStoryUpdateSchema = createUpdateSchema(playerStoriesTable);
