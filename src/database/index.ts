import { Database } from '@tursodatabase/database';
import { drizzle } from 'drizzle-orm/tursodatabase/database';

const client = new Database('turso.db');

export const db = drizzle({ client });
