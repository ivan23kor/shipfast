# Email System Documentation

This email system uses [Resend](https://resend.com) for sending transactional emails.

## Setup

1. Add your Resend API key to `.env`:
```bash
RESEND_API_KEY=re_your_resend_api_key
```

2. Configure email settings in `config.ts`:
```typescript
mailgun: {
  fromNoReply: `YourApp <noreply@yourdomain.com>`,
  fromAdmin: `YourApp Admin <admin@yourdomain.com>`,
  supportEmail: "support@yourdomain.com",
}
```

## Usage

### Send Magic Link Email
```typescript
import { sendMagicLinkEmail } from "@/libs/resend";

await sendMagicLinkEmail({
  to: "user@example.com",
  magicLink: "https://yourapp.com/auth/verify?token=abc123",
  appName: "YourApp", // optional, defaults to config.appName
});
```

### Send Verification Email
```typescript
import { sendVerificationEmail } from "@/libs/resend";

await sendVerificationEmail(
  "user@example.com",
  "https://yourapp.com/verify?token=abc123"
);
```

### Send Welcome Email
```typescript
import { sendWelcomeEmail } from "@/libs/resend";

await sendWelcomeEmail("user@example.com", "John Doe");
```

### Send Password Reset Email
```typescript
import { sendPasswordResetEmail } from "@/libs/resend";

await sendPasswordResetEmail(
  "user@example.com",
  "https://yourapp.com/reset-password?token=abc123"
);
```

### Send Custom Email
```typescript
import { sendEmail } from "@/libs/resend";

await sendEmail({
  to: "user@example.com",
  subject: "Your custom subject",
  html: "<p>Your custom HTML content</p>",
  from: "custom@yourdomain.com", // optional
  replyTo: "reply@yourdomain.com", // optional
  cc: "cc@example.com", // optional
  bcc: "bcc@example.com", // optional
});
```

### Send Transactional Email
```typescript
import { sendTransactionalEmail } from "@/libs/resend";

await sendTransactionalEmail({
  to: ["user1@example.com", "user2@example.com"],
  subject: "Order Confirmation",
  html: "<p>Your order has been confirmed!</p>",
});
```

## Email Templates

All email templates are responsive and mobile-friendly. They include:

- **Magic Link Email**: For passwordless authentication
- **Verification Email**: For email address verification
- **Welcome Email**: For new user onboarding
- **Password Reset Email**: For password recovery

### Customizing Templates

Edit the template functions in `libs/resend.ts`:

- `getMagicLinkEmailTemplate()`
- `getVerificationEmailTemplate()`
- `getWelcomeEmailTemplate()`
- `getPasswordResetEmailTemplate()`

### Using React Email Templates (Optional)

For more complex emails, use the React components in `libs/email-templates.tsx`:

```typescript
import { render } from "@react-email/render";
import { MagicLinkEmail } from "@/libs/email-templates";
import { sendEmail } from "@/libs/resend";

const html = render(
  <MagicLinkEmail
    magicLink="https://yourapp.com/auth/verify?token=abc123"
    appName="YourApp"
    buttonColor="#FFBE18"
  />
);

await sendEmail({
  to: "user@example.com",
  subject: "Sign in to YourApp",
  html,
});
```

## Error Handling

All email functions throw errors on failure:

```typescript
try {
  await sendWelcomeEmail("user@example.com", "John");
} catch (error) {
  console.error("Failed to send welcome email:", error);
  // Handle error appropriately
}
```

## TypeScript Types

Import types from `@/types/email`:

```typescript
import type {
  EmailResponse,
  MagicLinkData,
  VerificationData,
  WelcomeData,
  PasswordResetData,
} from "@/types/email";
```

## Best Practices

1. **Always use environment variables** for API keys
2. **Test emails thoroughly** in development before production
3. **Handle errors gracefully** and log them for debugging
4. **Use appropriate sender addresses** (noreply vs admin vs support)
5. **Keep email content concise** and action-oriented
6. **Include unsubscribe links** for marketing emails
7. **Test on multiple email clients** (Gmail, Outlook, etc.)

## Development Tips

- Use Resend's test mode for development
- Check Resend dashboard for delivery logs
- Monitor bounce rates and adjust accordingly
- Use proper email authentication (SPF, DKIM, DMARC)
