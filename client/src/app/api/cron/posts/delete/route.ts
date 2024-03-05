import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const authorization = request.headers.get('Authorization');

  if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const client = getClient();
  await client.connect();

  const res = await client.query(
    `delete from posts
    where banned = true and banned_at <= now () - interval '1 minute'`
  );

  await client.end();

  return NextResponse.json({ msg: `${res.rowCount} deleted posts` }, { status: 200 });
}
