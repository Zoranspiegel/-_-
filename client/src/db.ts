import { Client } from 'pg';
import { loadEnvConfig } from '@next/env';

const appDir = process.cwd();
loadEnvConfig(appDir);

export function getClient (): Client {
  console.log('PG_URL: ', process.env.POSTGRES_URL);
  console.log('JWT_SECRET: ', process.env.JWT_SECRET);
  if (process.env.POSTGRES_URL !== null && process.env.POSTGRES_URL !== undefined) {
    const client = new Client({
      connectionString: process.env.POSTGRES_URL + '?sslmode=require'
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
