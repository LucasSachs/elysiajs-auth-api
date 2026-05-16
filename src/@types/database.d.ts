import type { userTable } from 'src/database/schema';

export type NewUser = typeof userTable.$inferInsert;
export type User = typeof userTable.$inferSelect;
