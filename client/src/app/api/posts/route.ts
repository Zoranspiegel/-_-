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

  let userPosts = [];
  if (username) {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar from posts p 
      inner join users u on p.user_id = u.id 
      where u.username ilike $1 
      order by created_at desc limit $2 offset $3`,
      [username, limit, offset]
    );

    userPosts = userPostsRes.rows;
  } else {
    const userPostsRes = await client.query(
      `select p.*, u.username, u.avatar from posts p 
      inner join users u on p.user_id = u.id 
      where u.id = $1 
      order by created_at desc limit $2 offset $3`,
      [userID, limit, offset]
    );

    userPosts = userPostsRes.rows;
  }

  await client.end();

  return NextResponse.json(userPosts, { status: 200 });
}
