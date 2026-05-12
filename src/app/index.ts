import 'src/config/environment';
import 'src/config/secrets/jwt/generator';
import 'src/database/index';

import { Elysia } from 'elysia';
import { userController } from './user';

async function bootstrap() {
  const app = new Elysia().use(userController).listen(3000);

  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}

void bootstrap();
