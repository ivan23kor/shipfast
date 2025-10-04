# ShipFast

Launch your startup in days, not weeks. A production-ready Next.js 15 SaaS boilerplate with authentication, payments, email, and more.

## Features

- **Authentication** - Google OAuth and magic link email authentication with NextAuth.js
- **Payments** - Complete Stripe integration with checkout, subscriptions, and customer portal
- **Database** - MongoDB with Mongoose ODM (Supabase support included)
- **Email** - Transactional emails with Resend (Mailgun alternative available)
- **Rate Limiting** - Upstash Redis-based rate limiting for API protection
- **UI Components** - Pre-built components with Tailwind CSS and DaisyUI
- **Blog** - Built-in blog system with markdown support
- **SEO** - Automatic sitemap generation with next-sitemap
- **Customer Support** - Crisp chat integration
- **Analytics** - Plausible Analytics integration
- **Type Safety** - Full TypeScript support throughout

## Tech Stack

- **Framework:** Next.js 15 with App Router and Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3, DaisyUI 5
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js 4 with MongoDB adapter
- **Payments:** Stripe
- **Email:** Resend
- **Rate Limiting:** Upstash Redis
- **Deployment:** Vercel-ready

## Quick Start

### Prerequisites

- Node.js 20+ installed
- MongoDB database (local or MongoDB Atlas)
- Stripe account for payments
- Google OAuth credentials
- Resend account for emails

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd shipfast
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials (see [SETUP.md](SETUP.md) for detailed instructions).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shipfast/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   └── stripe/       # Stripe checkout & webhooks
│   ├── blog/             # Blog pages
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── blog/             # Blog-specific components
│   ├── ButtonCheckout.tsx
│   ├── Pricing.tsx
│   └── ...
├── libs/                  # Utility libraries
│   ├── mongo.ts          # MongoDB client
│   ├── mongoose.ts       # Mongoose connection
│   ├── next-auth.ts      # Auth configuration
│   ├── stripe.ts         # Stripe utilities
│   └── resend.ts         # Email utilities
├── models/                # Mongoose models
│   ├── User.ts
│   ├── Account.ts
│   └── Session.ts
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── config.ts              # Application configuration
└── middleware.ts          # Next.js middleware
```

## Environment Variables

Required environment variables:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-min-15-chars

# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Resend
RESEND_API_KEY=re_your_resend_api_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

See [SETUP.md](SETUP.md) for detailed setup instructions for each service.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

The main configuration is in `config.ts`:

```typescript
const config = {
  appName: "ShipFast",
  appDescription: "Launch your startup in days, not weeks",
  domainName: "shipfast.com",

  stripe: {
    plans: [...], // Define your pricing plans
  },

  colors: {
    theme: "", // Auto light/dark
    main: "#FFBE18", // Primary color
  },

  // ... more options
};
```

### Customizing Pricing Plans

Edit the `stripe.plans` array in `config.ts`:

```typescript
stripe: {
  plans: [
    {
      priceId: "price_123",
      name: "Starter",
      price: 19,
      features: [
        { name: "Feature 1" },
        { name: "Feature 2" },
      ],
    },
  ],
}
```

## Key Features Explained

### Authentication

- Google OAuth sign-in
- Magic link email authentication
- Secure session management with MongoDB
- Protected routes via middleware

### Payments

- One-time payments
- Subscription management
- Customer portal
- Webhook handling for automated fulfillment
- Promo code support

### Rate Limiting

API endpoints are protected with Upstash Redis rate limiting:

```typescript
import { rateLimit } from "@/libs/security";

// Apply rate limiting
const { success } = await rateLimit.limit(identifier);
if (!success) return NextResponse.json({ error: "Too many requests" });
```

### Email

Transactional emails with Resend:

```typescript
import { resend } from "@/libs/resend";

await resend.emails.send({
  from: config.mailgun.fromNoReply,
  to: email,
  subject: "Welcome!",
  html: emailTemplate,
});
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Stripe Webhook Setup

After deployment, configure your Stripe webhook:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Documentation

- [FEATURES.md](FEATURES.md) - Detailed feature documentation
- [SETUP.md](SETUP.md) - Step-by-step setup guide for all services
- [ARCHITECTURE.md](ARCHITECTURE.md) - Project architecture and design decisions
- [CHANGELOG.md](CHANGELOG.md) - Version history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use existing component patterns
- Update documentation when adding features
- Test payments in Stripe test mode
- Keep dependencies up to date

## Support

- Email: support@shipfast.com
- Documentation: [Full docs](SETUP.md)
- Issues: [GitHub Issues](https://github.com/yourusername/shipfast/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Stripe](https://stripe.com)
- [MongoDB](https://mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)

---

Made with care for indie hackers and startup founders.
