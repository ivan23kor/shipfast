import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter with sliding window algorithm
// 5 requests per minute per IP
const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'ratelimit',
});

export async function middleware(request: NextRequest) {
  // Get IP address
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';

  // Check if route should be rate limited
  const path = request.nextUrl.pathname;
  const shouldRateLimit =
    path.startsWith('/api/') ||
    path.startsWith('/auth/') ||
    path.includes('/checkout') ||
    path.includes('/webhook');

  if (shouldRateLimit) {
    try {
      const { success, limit, remaining, reset } = await rateLimiter.limit(ip);

      if (!success) {
        // Redirect to rate limit exceeded endpoint
        return NextResponse.redirect(new URL('/api/rate-limit-exceeded', request.url));
      }

      // Add rate limit headers to response
      const response = NextResponse.next();
      response.headers.set('X-RateLimit-Limit', limit.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', reset.toString());

      return response;
    } catch (error) {
      console.error('Rate limiting error:', error);
      // Allow request through if rate limiting fails
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/api/:path*',
    '/auth/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
