import { env as bunEnv } from 'bun';
import { z } from 'zod';

const envSchema = z.object({
  port: z.coerce.number({ error: '.env: PORT must be a valid number' }).min(0, { error: '.env: PORT must be between 0 and 65535' }).max(65535, { error: '.env: PORT must be between 0 and 65535' }),
});

export const env = envSchema.parse({
  port: bunEnv.PORT,
});
