import { Elysia } from 'elysia';
import { createUser } from './routes/create-user';

export const userController = new Elysia({ prefix: '/users' }).use(createUser);
