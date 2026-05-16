import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: int({ mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
});
