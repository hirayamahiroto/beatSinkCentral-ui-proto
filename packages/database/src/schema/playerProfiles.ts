import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { usersTable } from "./users";

export const playerProfilesTable = pgTable("player_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  displayName: varchar("display_name", { length: 255 }),
  profileImageUrl: varchar("profile_image_url", { length: 500 }),
  coverPhotoUrl: varchar("cover_photo_url", { length: 500 }),
  biography: varchar("biography", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const playerProfilesRelations = relations(
  playerProfilesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [playerProfilesTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const playerProfileSelectSchema =
  createSelectSchema(playerProfilesTable);
export const playerProfileInsertSchema =
  createInsertSchema(playerProfilesTable);
export const playerProfileUpdateSchema =
  createUpdateSchema(playerProfilesTable);
