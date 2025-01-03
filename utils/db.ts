import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../utils/schema';


const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL as string);

export const db = drizzle(sql, {schema});