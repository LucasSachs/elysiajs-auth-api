import 'src/database/index';

import { Elysia } from 'elysia';
import { userController } from './user';

const app = new Elysia().use(userController).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
