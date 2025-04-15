import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { playersTable } from "./players";
import { userRolesTable } from "./userRoles";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  roleId: uuid("role_id")
    .notNull()
    .references(() => userRolesTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  player: one(playersTable, {
    fields: [usersTable.id],
    references: [playersTable.userId],
  }),
  role: one(userRolesTable, {
    fields: [usersTable.roleId],
    references: [userRolesTable.id],
  }),
}));

export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);
