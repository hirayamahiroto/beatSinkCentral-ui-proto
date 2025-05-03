import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const userRolesTable = pgTable("user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRolesSelectSchema = createSelectSchema(userRolesTable);
export const userRolesInsertSchema = createInsertSchema(userRolesTable);
export const userRolesUpdateSchema = createUpdateSchema(userRolesTable);
