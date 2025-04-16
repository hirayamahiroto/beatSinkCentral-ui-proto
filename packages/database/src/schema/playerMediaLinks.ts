import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { usersTable } from "./users";

export const playerMediaLinksTable = pgTable("player_media_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const playerMediaLinksRelations = relations(
  playerMediaLinksTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [playerMediaLinksTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const playerMediaLinkSelectSchema = createSelectSchema(
  playerMediaLinksTable
);
export const playerMediaLinkInsertSchema = createInsertSchema(
  playerMediaLinksTable
);
export const playerMediaLinkUpdateSchema = createUpdateSchema(
  playerMediaLinksTable
);
