import { NextResponse } from 'next/server';

export async function GET (): Promise<NextResponse> {
  const response = NextResponse.json({ msg: 'Log out success' }, { status: 200 });
  response.cookies.delete('jwt-token');

  return response;
}
