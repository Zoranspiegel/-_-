import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const content = searchParams.get('content');

  if (!content) {
    return NextResponse.json({ error: 'Missing query parameter content' }, { status: 400 });
  }

  const page = Number(searchParams.get('page')) || 0;
  const limit = 5;
  const offset = limit * page;

  const client = getClient();
  await client.connect();

  const foundPostsRes = await client.query(
    `select p.*, u.username, u.avatar, u.is_admin from posts p 
    inner join users u on p.user_id = u.id 
    where content ilike $1 
    order by updated_at desc limit $2 offset $3`,
    ['%' + content + '%', limit + 1, offset]
  );

  await client.end();

  const pages = foundPostsRes.rows.slice(0, limit);
  const last = foundPostsRes.rows.length < limit + 1;

  return NextResponse.json({ pages, last }, { status: 200 });
}
