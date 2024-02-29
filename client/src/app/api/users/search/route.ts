import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Missing query parameter username' }, { status: 400 });
  }

  const client = getClient();
  await client.connect();

  const searchUsersRes = await client.query(
    'select id, username, avatar, is_admin from users where username ilike $1 limit $2',
    ['%' + username + '%', 5]
  );

  await client.end();

  return NextResponse.json(searchUsersRes.rows, { status: 200 });
}
