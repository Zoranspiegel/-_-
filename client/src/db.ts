import { Client } from 'pg';
import { loadEnvConfig } from '@next/env';

const appDir = process.cwd();
loadEnvConfig(appDir);

export function getClient (): Client {
  if (process.env.POSTGRES_URL !== null && process.env.POSTGRES_URL !== undefined) {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL
    });
    return client;
  } else {
    const client = new Client({
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      host: process.env.PG_HOST,
      database: process.env.PG_DB,
      port: Number(process.env.PG_PORT)
    });
    return client;
  }
}

getClient();
