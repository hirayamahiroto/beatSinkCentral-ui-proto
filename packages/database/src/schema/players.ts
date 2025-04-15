import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { usersTable } from "./users";
import { playerProfilesTable } from "./playerProfiles";
import { playerMediaLinksTable } from "./playerMediaLinks";
import { playerStoriesTable } from "./playerStories";
import { playerPerformancesTable } from "./playerPerformances";
import { achievementsTable } from "./achievements";

export const playersTable = pgTable("players", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  deletedAt: timestamp("deleted_at"),
});

export const playersRelations = relations(playersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [playersTable.userId],
    references: [usersTable.id],
  }),
  profile: one(playerProfilesTable, {
    fields: [playersTable.id],
    references: [playerProfilesTable.playerId],
  }),
  mediaLinks: many(playerMediaLinksTable),
  stories: many(playerStoriesTable),
  performances: many(playerPerformancesTable),
  achievements: many(achievementsTable),
}));

export const playerSelectSchema = createSelectSchema(playersTable);
export const playerInsertSchema = createInsertSchema(playersTable);
export const playerUpdateSchema = createUpdateSchema(playersTable);
