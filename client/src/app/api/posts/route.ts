import { getJWTPayload } from '@/app/utils/auth';
import { getClient } from '@/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.nextUrl);
  const username = searchParams.get('username');
  const page = Number(searchParams.get('page')) || 0;
  const limit = 10;
  const offset = page * limit;

  const jwtPayload = await getJWTPayload();
  const userID = jwtPayload?.sub;

  const client = getClient();
  await client.connect();

  let pages;
  let last;
  if (username) {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar, u.is_admin from posts p 
      inner join users u on p.user_id = u.id 
      where u.username ilike $1 
      order by updated_at desc limit $2 offset $3`,
      [username, limit + 1, offset]
    );

    pages = userPostsRes.rows.slice(0, limit);
    last = userPostsRes.rows.length < limit + 1;
  } else {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar, u.is_admin from posts p 
      inner join users u on p.user_id = u.id 
      where u.id = $1 
      order by updated_at desc limit $2 offset $3`,
      [userID, limit + 1, offset]
    );

    pages = userPostsRes.rows.slice(0, limit);
    last = userPostsRes.rows.length < limit + 1;
  }

  await client.end();

  return NextResponse.json({ pages, last }, { status: 200 });
}

export async function POST (request: Request): Promise<NextResponse> {
  const reqJSON = await request.json();
  const { content } = reqJSON;

  const jwtPayload = await getJWTPayload();
  const userID = jwtPayload?.sub;

  const client = getClient();
  await client.connect();

  try {
    await client.query(
      'insert into posts (user_id, content) values ($1, $2)',
      [userID, content]
    );
  } catch (error) {
    await client.end();
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  await client.end();

  return NextResponse.json({ msg: 'Post successfully created' }, { status: 201 });
}
