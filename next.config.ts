import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://client.crisp.chat https://plausible.io; style-src 'self' 'unsafe-inline' https://client.crisp.chat; img-src 'self' data: https: blob:; font-src 'self' data: https://client.crisp.chat; connect-src 'self' https://api.stripe.com https://client.crisp.chat wss://client.relay.crisp.chat https://plausible.io; frame-src 'self' https://js.stripe.com https://client.crisp.chat;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
