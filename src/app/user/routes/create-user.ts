import type { NewUser } from 'src/@types/database';

import { password } from 'bun';
import { Elysia } from 'elysia';
import { omit } from 'es-toolkit';
import { db } from 'src/database';
import { userTable } from 'src/database/schema';
import { createUserDto } from '../dtos/create-user.dto';

export const createUser = new Elysia().post(
  '/',

  async ({ body, status }) => {
    const hashedPassword = await password.hash(body.password, 'argon2id');

    const newUserDto: NewUser = {
      ...body,
      password: hashedPassword,
    };

    const [newUser] = await db.insert(userTable).values(newUserDto).returning();

    return status('Created', omit(newUser, ['password']));
  },

  { body: createUserDto },
);
