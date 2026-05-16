import { Elysia } from 'elysia';
import { createUser } from './routes/create-user';
import { getUsers } from './routes/get-users';

export const userController = new Elysia({ prefix: '/users' }).use(createUser).use(getUsers);
