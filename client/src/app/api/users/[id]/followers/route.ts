import { getClient } from '@/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { searchParams } = new URL(request.nextUrl);
  const page = Number(searchParams.get('page')) || 0;
  const limit = 6;
  const offset = page * limit;

  const client = getClient();
  await client.connect();

  const followedUsersRes = await client.query(
    `select u.id, u.username, u.avatar, is_admin from users u 
    inner join follows f on f.follower_id = u.id 
    where f.user_id = $1 
    order by f.created_at desc limit $2 offset $3`,
    [params.id, limit, offset]
  );

  await client.end();

  return NextResponse.json(followedUsersRes.rows, { status: 200 });
}
