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
import { usersTable } from "./users";

export const achievementsTable = pgTable("achievements", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  link: varchar("link", { length: 500 }),
  result: varchar("result", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const achievementsRelations = relations(
  achievementsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [achievementsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const achievementSelectSchema = createSelectSchema(achievementsTable);
export const achievementInsertSchema = createInsertSchema(achievementsTable);
export const achievementUpdateSchema = createUpdateSchema(achievementsTable);
