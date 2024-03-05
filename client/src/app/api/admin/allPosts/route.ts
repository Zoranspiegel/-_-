import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 0;
  const limit = 10;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const allPostsRes = await client.query(
    `select p.*, u.username, u.avatar, u.is_admin from posts p 
    inner join users u on p.user_id = u.id 
    order by p.created_at desc limit $1 offset $2`,
    [limit + 1, offset]
  );

  await client.end();

  const pages = allPostsRes.rows.slice(0, limit);
  const last = allPostsRes.rows.length < limit + 1;

  return NextResponse.json({ pages, last }, { status: 200 });
}
