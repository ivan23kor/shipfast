# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev                # Start dev server with Turbopack
npm run build              # Build for production
npm start                  # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run type-check         # TypeScript type checking without build

# Deployment
npx vercel                 # Deploy to Vercel
npx vercel --yes          # Deploy without confirmation
```

## Architecture Overview

This is a **ShipFast SaaS boilerplate** built with Next.js 15, featuring authentication, payments, and a complete set of startup-ready components.

### Core Architecture Patterns

**Central Configuration**: All app settings are centralized in `config.ts` including:
- Pricing plans (used by Pricing component and Stripe API)
- Email settings (from addresses, support email)
- Auth configuration (login URLs, callbacks)
- Theme colors and styling

**Modular Auth System**:
- NextAuth.js configured in `/app/api/auth/[...nextauth]/route.ts`
- MongoDB adapter for session persistence via models in `/models/`
- Auth helpers in `/libs/next-auth.ts` for server-side auth checks
- Magic links use Resend email system from `/libs/resend.ts`

**API Structure**:
- Authentication: `/app/api/auth/[...nextauth]/route.ts`
- Payments: `/app/api/stripe/` (checkout, webhooks, portal)
- Rate limiting handled by middleware.ts using Upstash Redis
- Validation example at `/app/api/validate/route.ts`

**Component Architecture**:
- Reusable UI components in `/components/` with TypeScript interfaces
- Landing page sections (Hero, Pricing, FAQ, etc.) are self-contained components
- Button components handle specific actions (ButtonCheckout triggers Stripe, ButtonLead saves to database)
- Blog components in `/components/blog/` use content from `/app/blog/_assets/content.tsx`

### Key Integration Points

**Payment Flow**:
1. ButtonCheckout component → `/app/api/stripe/create-checkout/`
2. Stripe webhook → `/app/api/stripe/webhook/` (handles fulfillment)
3. Customer portal → `/app/api/stripe/create-portal/`
4. Pricing data comes from `config.ts` stripe.plans array

**Rate Limiting**:
- Middleware.ts applies 5 req/min sliding window to all API routes
- Uses Upstash Redis for distributed rate limiting
- Redirects exceeded requests to `/api/rate-limit-exceeded/`

**Email System**:
- Resend integration in `/libs/resend.ts`
- Magic link emails, welcome emails, password reset
- Email templates as React components in `/libs/email-templates.tsx`
- Uses config.mailgun settings for from addresses

**Security**:
- Security headers configured in next.config.ts (CSP, HSTS, etc.)
- Input sanitization and validation utilities in `/libs/security.ts`
- CSRF protection helpers available

### Development Workflow

1. **Adding New Pricing Plans**: Edit `config.ts` stripe.plans array with priceId from Stripe dashboard
2. **Creating API Endpoints**: Place in `/app/api/` and optionally use rate limiting utilities
3. **Adding Landing Page Sections**: Create new component in `/components/` and import in page
4. **Blog Content**: Edit `/app/blog/_assets/content.tsx` (JSX content supported)
5. **Auth Changes**: Update NextAuth config and/or MongoDB models in `/models/`

### Important File Relationships

- `middleware.ts` ↔ `libs/security.ts` (rate limiting implementation)
- `config.ts` ↔ `components/Pricing.tsx` (pricing data)
- `libs/stripe.ts` ↔ `/app/api/stripe/` (payment utilities)
- `libs/next-auth.ts` ↔ `models/` (auth with database models)
- `libs/resend.ts` ↔ `config.ts` (email settings)

### Environment Setup

Copy `.env.example` to `.env.local`. Required for basic functionality:
- `NEXTAUTH_SECRET` (min 15 chars)
- `MONGODB_URI`
- `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`

### Known Constraints

- Rate limiting requires Upstash Redis (optional but recommended)
- Magic links require Resend API key
- Stripe requires test keys for development
- Google OAuth requires credentials in Google Cloud Console