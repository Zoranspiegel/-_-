import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function PATCH (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  const client = getClient();
  await client.connect();

  await client.query(
    `update posts set banned = true, banned_at = now () 
    where id = $1`,
    [id]
  );

  await client.end();

  return NextResponse.json({ msg: 'Post successfully banned' }, { status: 200 });
}
