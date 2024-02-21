import { cookies } from 'next/headers';
import { jwtVerify, type JWTPayload } from 'jose';

export async function getJWTPayload (): Promise<JWTPayload | undefined> {
  if (process.env.JWT_SECRET === null || process.env.JWT_SECRET === undefined) return;

  const cookieStore = cookies();
  const token = cookieStore.get('jwt-token');

  if (token?.value === null || token?.value === undefined) return;

  const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token.value, jwtSecret);

  return payload;
}
