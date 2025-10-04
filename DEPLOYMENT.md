# ShipFast Vercel Deployment Guide

Complete guide to deploying your ShipFast application on Vercel.

## Prerequisites

- Vercel account ([sign up](https://vercel.com/signup))
- GitHub repository with your ShipFast code
- All required API keys and credentials ready

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your repository has:
- `vercel.json` configuration file
- All source code committed
- `.env.example` for reference

### 2. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository containing ShipFast

### 3. Configure Environment Variables

Add all required environment variables in Vercel dashboard under "Environment Variables":

#### Required Variables

**App Configuration**
- `NEXT_PUBLIC_APP_URL` - Your production URL (e.g., `https://yourdomain.com`)
- `NEXTAUTH_URL` - Same as APP_URL
- `NEXTAUTH_SECRET` - Random string (min 15 chars) - Generate with: `openssl rand -base64 32`

**Authentication (Google OAuth)**
- `GOOGLE_ID` - Google OAuth client ID
- `GOOGLE_SECRET` - Google OAuth client secret

**Database (MongoDB)**
- `MONGODB_URI` - MongoDB connection string

**Payment (Stripe)**
- `STRIPE_SECRET_KEY` - Stripe secret key (use live key: `sk_live_...`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (use live key: `pk_live_...`)
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret (get from Stripe dashboard)

**Email (Resend)**
- `RESEND_API_KEY` - Resend API key

**Rate Limiting (Upstash Redis)**
- `UPSTASH_REDIS_REST_URL` - Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token

#### Optional Variables

**Customer Support**
- `NEXT_PUBLIC_CRISP_ID` - Crisp website ID (for live chat)

**Analytics**
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Your domain for Plausible analytics

### 4. Deploy

1. Click "Deploy" button
2. Wait for build to complete (typically 2-3 minutes)
3. Vercel will provide a deployment URL

### 5. Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` to match your domain

### 6. Configure Webhooks

#### Stripe Webhook
1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Copy webhook secret and update `STRIPE_WEBHOOK_SECRET` in Vercel

## Post-Deployment Verification

### 1. Check Homepage
- Visit your deployed URL
- Verify homepage loads correctly
- Check for console errors (F12)

### 2. Test Authentication
- Click "Sign In" button
- Test Google OAuth login
- Verify redirect after login

### 3. Test Payment Flow
- Navigate to pricing page
- Click "Get Started" on a plan
- Verify Stripe checkout opens
- **Test Mode:** Use test card `4242 4242 4242 4242`

### 4. Test Webhooks
- Complete a test payment
- Check Vercel Function logs for webhook execution
- Verify user access granted

### 5. Check Email Delivery
- Trigger welcome email
- Verify email sent via Resend
- Check spam folder if not received

## Environment Variables Checklist

Copy this checklist and mark off as you configure each variable:

```
Production Environment Variables:
□ NEXT_PUBLIC_APP_URL
□ NEXTAUTH_URL
□ NEXTAUTH_SECRET
□ GOOGLE_ID
□ GOOGLE_SECRET
□ MONGODB_URI
□ STRIPE_SECRET_KEY
□ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
□ STRIPE_WEBHOOK_SECRET
□ RESEND_API_KEY
□ UPSTASH_REDIS_REST_URL
□ UPSTASH_REDIS_REST_TOKEN
□ NEXT_PUBLIC_CRISP_ID (optional)
□ NEXT_PUBLIC_PLAUSIBLE_DOMAIN (optional)
```

## Troubleshooting Common Issues

### Build Fails

**Issue:** Build fails with "Module not found"
**Solution:**
- Run `npm install` locally
- Commit `package-lock.json`
- Redeploy

**Issue:** TypeScript errors during build
**Solution:**
- Run `npm run type-check` locally
- Fix all type errors
- Commit and redeploy

### Runtime Errors

**Issue:** 500 error on homepage
**Solution:**
- Check Vercel Function logs
- Verify all environment variables set
- Check MongoDB connection string

**Issue:** OAuth not working
**Solution:**
- Verify `NEXTAUTH_URL` matches deployment URL
- Check Google OAuth authorized redirect URIs include: `https://yourdomain.com/api/auth/callback/google`
- Ensure `NEXTAUTH_SECRET` is set

**Issue:** Stripe checkout fails
**Solution:**
- Verify using live Stripe keys in production
- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `pk_live_`
- Ensure `STRIPE_SECRET_KEY` starts with `sk_live_`

**Issue:** Webhooks not received
**Solution:**
- Verify webhook URL in Stripe: `https://yourdomain.com/api/webhooks/stripe`
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Review Vercel Function logs for errors

### Performance Issues

**Issue:** Slow page loads
**Solution:**
- Enable Vercel Analytics
- Check database query performance
- Consider adding Redis caching
- Review bundle size with `npm run build`

**Issue:** Function timeout
**Solution:**
- Optimize database queries
- Add indexes to MongoDB collections
- Consider background job processing for long tasks

## Continuous Deployment

Every push to `main` branch automatically deploys to production.

**Best Practices:**
- Use feature branches for development
- Test thoroughly before merging to `main`
- Monitor Vercel deployments dashboard
- Review function logs after deployment

## Monitoring

### Vercel Analytics
- Enable in Project Settings → Analytics
- Track page views and performance

### Error Tracking
- Check Vercel Function logs regularly
- Set up error monitoring (Sentry recommended)

### Uptime Monitoring
- Use UptimeRobot or similar
- Monitor critical endpoints:
  - Homepage: `https://yourdomain.com`
  - API health: `https://yourdomain.com/api/health`

## Rollback

If deployment has issues:
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- ShipFast Issues: GitHub Issues tab

## Security Checklist

Before going live:
- □ Use production API keys (not test keys)
- □ Verify `NEXTAUTH_SECRET` is strong and unique
- □ Enable 2FA on all service accounts (Vercel, Stripe, MongoDB)
- □ Review CSP headers in `next.config.ts`
- □ Test rate limiting works
- □ Verify webhooks use HTTPS
- □ Check no sensitive data in client-side code
- □ Review Vercel function logs for exposed secrets

## Performance Optimization

- Enable Vercel Edge Network
- Add ISR for static pages
- Configure proper cache headers
- Optimize images with Next.js Image
- Enable compression in `next.config.ts`

---

**Ready to ship?** Follow this guide step by step and you'll have your ShipFast app live in under 30 minutes.
