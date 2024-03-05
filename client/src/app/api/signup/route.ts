import { NextResponse } from 'next/server';
import { getClient } from '@/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST (request: Request): Promise<NextResponse> {
  if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  const reqJSON = await request.json();
  const { username, password }: SignupUser = reqJSON;

  const client = getClient();
  await client.connect();

  const alreadyUserRes = await client.query(
    'select id from users where username ilike $1',
    [username]
  );

  if (alreadyUserRes.rowCount !== null && alreadyUserRes.rowCount > 0) {
    await client.end();
    return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
  }

  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  const newUserRes = await client.query(
    'insert into users (username, password) values ($1, $2) returning id, is_admin',
    [username, hash]
  );

  if (newUserRes.rowCount === null || newUserRes.rowCount === 0) {
    await client.end();
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  await client.end();

  const jwtSub: string = JSON.stringify({
    id: newUserRes.rows[0].id,
    is_admin: newUserRes.rows[0].is_admin
  });

  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(jwtSub)
    .setIssuedAt()
    .setExpirationTime('20h')
    .sign(jwtSecret);

  const response = NextResponse.json({ msg: 'Register success' }, { status: 201 });
  response.cookies.set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });

  return response;
}
