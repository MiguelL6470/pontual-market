import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/register(.*)',
  '/search(.*)',
  '/products(.*)',
  '/categories(.*)',
  '/deals(.*)',
  '/cart(.*)',
  '/checkout(.*)',
  '/api(.*)',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Permitir rotas públicas sem autenticação
  if (isPublicRoute(request)) {
    return NextResponse.next()
  }

  // Proteger rotas privadas
  const { userId } = await auth()
  if (!userId && !request.nextUrl.pathname.startsWith('/login')) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}


