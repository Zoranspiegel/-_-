import { type NextRequest, NextResponse } from 'next/server';
import { getJWTPayload } from '@/app/utils/auth';
import { getClient } from '@/db';

export async function GET (request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.nextUrl);
  const userID = searchParams.get('user_id');

  if (!userID) {
    return NextResponse.json({ error: 'Missing query param' }, { status: 400 });
  }

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const followsRes = await client.query(
    'select * from follows where user_id = $1 and follower_id = $2',
    [userID, jwtPayload?.sub]
  );

  await client.end();

  return NextResponse.json(followsRes.rowCount, { status: 200 });
}

export async function POST (request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.nextUrl);
  const userID = searchParams.get('user_id');

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const alreadyFollowedRes = await client.query(
    'select user_id from follows where user_id = $1 and follower_id = $2',
    [userID, jwtPayload?.sub]
  );

  if (alreadyFollowedRes.rowCount) {
    await client.end();
    return NextResponse.json({ error: 'User already followd' }, { status: 400 });
  }

  await client.query(
    'insert into follows (user_id, follower_id) values ($1, $2)',
    [userID, jwtPayload?.sub]
  );

  await client.end();

  return NextResponse.json({ msg: 'Follow user success' }, { status: 201 });
}

export async function DELETE (request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.nextUrl);
  const userID = searchParams.get('user_id');

  const jwtPayload = await getJWTPayload();

  const client = getClient();
  await client.connect();

  const unfollowUserRes = await client.query(
    'delete from follows where user_id = $1 and follower_id = $2 returning *',
    [userID, jwtPayload?.sub]
  );

  await client.end();

  if (!unfollowUserRes.rowCount) {
    return NextResponse.json({ msg: 'User not followed' }, { status: 400 });
  }

  return NextResponse.json({ msg: 'Unfollow user success' }, { status: 200 });
}
