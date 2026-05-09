import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Log for debugging
  console.log(`Middleware processing: ${pathname}`)
  
  // Allow all API routes
  if (pathname.startsWith('/api/')) {
    console.log(`API route allowed: ${pathname}`)
    return NextResponse.next()
  }
  
  // Allow public paths
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    console.log(`Public path allowed: ${pathname}`)
    return NextResponse.next()
  }
  
  // For everything else, you might want to check auth
  // But for now, let everything through to debug
  console.log(`Allowing path: ${pathname}`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}