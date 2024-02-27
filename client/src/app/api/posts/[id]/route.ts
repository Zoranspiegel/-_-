import { getJWTPayload } from '@/app/utils/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function DELETE (request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const jwtPayload = await getJWTPayload();
  const client = getClient();
  await client.connect();

  const deletedPostRes = await client.query(
    'delete from posts where user_id = $1 and id = $2 returning *',
    [jwtPayload?.sub, params.id]
  );

  await client.end();

  if (!deletedPostRes.rowCount) {
    return NextResponse.json({ error: 'Post does not exist' }, { status: 404 });
  }

  return NextResponse.json({ msg: 'Post successfully deleted', data: deletedPostRes.rows }, { status: 200 });
}
