import { type NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware (request: NextRequest): Promise<NextResponse | undefined> {
  if (process.env.JWT_SECRET === null || process.env.JWT_SECRET === undefined) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  const pathname = request.nextUrl.pathname;

  const authenticatedAPIRoutes = [
    pathname.startsWith('/api/users'),
    pathname.startsWith('/api/posts'),
    pathname.startsWith('/api/follows')
  ];

  if (authenticatedAPIRoutes.includes(true)) {
    const cookie = request.cookies.get('jwt-token');
    if (cookie?.value === null || cookie?.value === undefined) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }

    try {
      const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(cookie?.value, jwtSecret);
    } catch (error) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }
  }
}

export const config = {
  matcher: '/:path*'
};
