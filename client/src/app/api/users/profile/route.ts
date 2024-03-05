import { getJWTPayload } from '@/app/utils/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();

  if (!jwtPayload?.sub) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
  }

  const { id } = JSON.parse(jwtPayload.sub);

  const client = getClient();
  await client.connect();

  const userProfileRes = await client.query(
    'select id, username, avatar, is_admin from users where id = $1',
    [id]
  );

  if (userProfileRes.rowCount === 0) {
    await client.end();
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  await client.end();

  const userProfile = userProfileRes.rows[0];

  return NextResponse.json(userProfile, { status: 200 });
}
