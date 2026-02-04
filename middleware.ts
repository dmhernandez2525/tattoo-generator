import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

const isPublicRoute = createRouteMatcher([
  '/',
  '/demo(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

const authMiddleware = clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect()
  }
})

const demoMiddleware = () => NextResponse.next()

export default demoMode ? demoMiddleware : authMiddleware

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api|trpc)(.*)'],
}
