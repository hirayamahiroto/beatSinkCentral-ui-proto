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
  stageName: varchar("stage_name", { length: 255 }).notNull(),
  areaOfActivity: varchar("area_of_activity", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const playersRelations = relations(playersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [playersTable.userId],
    references: [usersTable.id],
  }),
  profile: one(playerProfilesTable, {
    fields: [playersTable.id],
    references: [playerProfilesTable.userId],
  }),
  mediaLinks: many(playerMediaLinksTable),
  stories: many(playerStoriesTable),
  performances: many(playerPerformancesTable),
  achievements: many(achievementsTable),
}));

export const playerSelectSchema = createSelectSchema(playersTable);
export const playerInsertSchema = createInsertSchema(playersTable);
export const playerUpdateSchema = createUpdateSchema(playersTable);
