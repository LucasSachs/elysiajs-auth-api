import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/config/drizzle',
  schema: './src/database/schema.ts',
  dialect: 'sqlite',
  dbCredentials: { url: 'turso.db' },
});
