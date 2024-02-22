import { NextResponse } from 'next/server';
import { getClient } from '@/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST (request: Request): Promise<NextResponse> {
  if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === null) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  const resJSON = await request.json();
  const { username, password }: LoginUser = resJSON;

  const client = getClient();
  await client.connect();

  const loggedUserRes = await client.query(
    'select id, password from users where username ilike $1',
    [username]
  );

  if (loggedUserRes.rowCount !== null && loggedUserRes.rowCount === 0) {
    return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
  }

  const hash: string = loggedUserRes.rows[0].password;
  const match = await bcrypt.compare(password, hash);

  if (!match) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
  }

  await client.end();

  const jwtSub: string = loggedUserRes.rows[0].id;
  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(jwtSub)
    .setIssuedAt()
    .setExpirationTime('20h')
    .sign(jwtSecret);

  const response = NextResponse.json({ msg: 'Login success' }, { status: 200 });
  response.cookies.set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true
  });

  return response;
}
