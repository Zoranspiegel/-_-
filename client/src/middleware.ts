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

  const authenticatedAdminAPIRoutes = [
    pathname.startsWith('/api/admin')
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

  if (authenticatedAdminAPIRoutes.includes(true)) {
    const cookie = request.cookies.get('jwt-token');
    if (cookie?.value === null || cookie?.value === undefined) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }

    const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(cookie?.value, jwtSecret);

    if (!payload?.sub) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }

    const { is_admin } = JSON.parse(payload.sub);

    if (!is_admin) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
    }
  }
}

export const config = {
  matcher: '/:path*'
};
