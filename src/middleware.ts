import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('token');

  if (token && url.pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}
