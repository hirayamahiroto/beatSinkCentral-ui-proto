import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { usersTable } from "./users";

export const userAttributesTable = pgTable("user_attributes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userAttributesRelations = relations(
  userAttributesTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userAttributesTable.id],
      references: [usersTable.id],
    }),
  })
);

export const userAttributesSelectSchema =
  createSelectSchema(userAttributesTable);
export const userAttributesInsertSchema =
  createInsertSchema(userAttributesTable);
export const userAttributesUpdateSchema =
  createUpdateSchema(userAttributesTable);
