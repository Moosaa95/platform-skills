// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are protected and which are public
const protectedRoutes = ['/dashboard', '/profile', '/settings'];
const authRoutes = ['/', '/login', '/register'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isPublicRoute = authRoutes.includes(pathname)
  
  // Check if access token cookie exists
  const accessToken = request.cookies.get('access_token');
  const isAuthenticated = !!accessToken;

  console.log("ISAUTHENTICATED", isAuthenticated)
  
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect unauthenticated users away from protected pages
//   if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
}


  
  return NextResponse.next();
}

// Configure which paths should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - api routes (API endpoints)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};