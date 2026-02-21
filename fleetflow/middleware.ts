import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need auth
  const publicRoutes = ['/login', '/forgot-password', '/reset-password'];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for Supabase auth cookie or our custom auth flag cookie
  // Supabase stores tokens in cookies prefixed with 'sb-'
  const hasSupabaseAuth = request.cookies.getAll().some(
    (cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
  );
  const hasAuthFlag = request.cookies.get('fleetflow_auth')?.value === 'true';

  // If no auth detected, redirect to login
  if (!hasSupabaseAuth && !hasAuthFlag) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
