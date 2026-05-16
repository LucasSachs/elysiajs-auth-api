import { like, or } from 'drizzle-orm';
import Elysia from 'elysia';
import { omit } from 'es-toolkit';
import { db } from 'src/database';
import { userTable } from 'src/database/schema';
import z from 'zod';

export const getUsers = new Elysia().get(
  '/',

  async ({ status, query }) => {
    const users = await db
      .select()
      .from(userTable)
      .where(or(query.username ? like(userTable.username, `%${query.username}%`) : undefined, query.email ? like(userTable.email, `%${query.email}%`) : undefined));

    return status(
      'OK',
      users.map(user => omit(user, ['password'])),
    );
  },

  {
    query: z.object({
      username: z.string().max(255).optional(),
      email: z.string().optional(),
    }),
  },
);
