import { getClient } from '@/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.nextUrl);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username filter required' }, { status: 400 });
  }

  const client = getClient();
  await client.connect();

  const userRes = await client.query(
    'select id, username, avatar, is_admin from users where username ilike $1',
    [username]
  );

  if (!userRes.rowCount) {
    return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
  }

  await client.end();

  return NextResponse.json(userRes.rows[0], { status: 200 });
}
