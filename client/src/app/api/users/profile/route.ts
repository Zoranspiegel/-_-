import { getJWTPayload } from '@/app/utils/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const payload = await getJWTPayload();
  const userID = payload?.sub;

  const client = getClient();
  await client.connect();

  const userProfileRes = await client.query(
    'select id, username, avatar from users where id = $1',
    [userID]
  );

  if (userProfileRes.rowCount === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  await client.end();

  const userProfile = userProfileRes.rows[0];

  return NextResponse.json(userProfile, { status: 200 });
}
