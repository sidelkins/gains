import { sqliteTable, text, integer, real, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  first_name: text('first_name'),
  last_name: text('last_name'),
  created_at: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),  // Uses SQLite's built-in timestamp
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const nutritionEntries = sqliteTable('nutrition_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  date: text('date').notNull().default(sql`CURRENT_TIMESTAMP`),
  description: text('description'),
  calories: real('calories').notNull(),
  protein: real('protein').notNull(),
  carbs: real('carbs').notNull(),
  fat: real('fat').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type NutritionEntry = typeof nutritionEntries.$inferSelect;
export type NewNutritionEntry = typeof nutritionEntries.$inferSelect;

export const supplements = sqliteTable('supplements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text('name').notNull(), // Name is not unique globally, but unique per user
  unit: integer('unit'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
  return {
    // Composite unique constraint on userId and name
    // e.g., User 1 and User 2 can have one "creatine" each
    userIdNameUnique: uniqueIndex('userId_name_unique').on(table.userId, table.name),
  };
})

export type Supplement = typeof supplements.$inferSelect;
export type NewSupplement = typeof supplements.$inferSelect;

export const supplementEntries = sqliteTable('supplement_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  date: text('date').notNull().default(sql`CURRENT_TIMESTAMP`),
  supplement_id: integer('supplement_id').notNull()
                .references(() => supplements.id, { onDelete: "cascade" }),
  quantity: integer('quantity'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});


export type SupplementEntry = typeof supplementEntries.$inferSelect;
export type NewSupplementEntry = typeof supplementEntries.$inferSelect;