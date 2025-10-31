import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware básico - será expandido se necessário
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};


