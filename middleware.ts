import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // For now, allow all routes to proceed
  // Once Supabase is configured, you can add auth checks here
  // This is a simplified version that doesn't require the deprecated auth-helpers package

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
