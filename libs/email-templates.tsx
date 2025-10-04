import * as React from "react";

interface EmailLayoutProps {
  children: React.ReactNode;
  appName: string;
}

export function EmailLayout({ children, appName }: EmailLayoutProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          backgroundColor: "#f4f4f4",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#f4f4f4", padding: "20px" }}
        >
          <tr>
            <td align="center">
              <table
                width="600"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <tr>
                  <td
                    style={{
                      padding: "40px 40px 20px 40px",
                      textAlign: "center",
                    }}
                  >
                    <h1
                      style={{
                        margin: 0,
                        color: "#333333",
                        fontSize: "28px",
                        fontWeight: 600,
                      }}
                    >
                      {appName}
                    </h1>
                  </td>
                </tr>
                {children}
                <tr>
                  <td
                    style={{
                      padding: "20px 40px",
                      backgroundColor: "#f9f9f9",
                      borderTop: "1px solid #eeeeee",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: "#999999",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      &copy; {new Date().getFullYear()} {appName}. All rights
                      reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

interface ButtonProps {
  href: string;
  color: string;
  children: React.ReactNode;
}

export function Button({ href, color, children }: ButtonProps) {
  return (
    <table width="100%" cellPadding="0" cellSpacing="0">
      <tr>
        <td align="center">
          <a
            href={href}
            style={{
              display: "inline-block",
              backgroundColor: color,
              color: "#000000",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {children}
          </a>
        </td>
      </tr>
    </table>
  );
}

interface MagicLinkEmailProps {
  magicLink: string;
  appName: string;
  buttonColor: string;
}

export function MagicLinkEmail({
  magicLink,
  appName,
  buttonColor,
}: MagicLinkEmailProps) {
  return (
    <EmailLayout appName={appName}>
      <tr>
        <td style={{ padding: "0 40px 40px 40px" }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              color: "#333333",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            Sign in to your account
          </h2>
          <p
            style={{
              margin: "0 0 30px 0",
              color: "#666666",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            Click the button below to sign in to your {appName} account. This
            link will expire in 10 minutes.
          </p>
          <Button href={magicLink} color={buttonColor}>
            Sign In
          </Button>
          <p
            style={{
              margin: "30px 0 0 0",
              color: "#999999",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            If you didn't request this email, you can safely ignore it.
          </p>
        </td>
      </tr>
    </EmailLayout>
  );
}

interface VerificationEmailProps {
  verificationLink: string;
  appName: string;
  buttonColor: string;
}

export function VerificationEmail({
  verificationLink,
  appName,
  buttonColor,
}: VerificationEmailProps) {
  return (
    <EmailLayout appName={appName}>
      <tr>
        <td style={{ padding: "0 40px 40px 40px" }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              color: "#333333",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            Verify your email address
          </h2>
          <p
            style={{
              margin: "0 0 30px 0",
              color: "#666666",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            Thanks for signing up! Please verify your email address by clicking
            the button below.
          </p>
          <Button href={verificationLink} color={buttonColor}>
            Verify Email
          </Button>
          <p
            style={{
              margin: "30px 0 0 0",
              color: "#999999",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            If you didn't create an account, you can safely ignore this email.
          </p>
        </td>
      </tr>
    </EmailLayout>
  );
}

interface WelcomeEmailProps {
  appName: string;
  buttonColor: string;
  userName?: string;
  appUrl: string;
  supportEmail: string;
}

export function WelcomeEmail({
  appName,
  buttonColor,
  userName,
  appUrl,
  supportEmail,
}: WelcomeEmailProps) {
  const greeting = userName ? `Hi ${userName}` : "Welcome";

  return (
    <EmailLayout appName={appName}>
      <tr>
        <td style={{ padding: "0 40px 40px 40px" }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              color: "#333333",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            {greeting}!
          </h2>
          <p
            style={{
              margin: "0 0 20px 0",
              color: "#666666",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            Welcome to {appName}! We're excited to have you on board.
          </p>
          <p
            style={{
              margin: "0 0 20px 0",
              color: "#666666",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            Your account has been created successfully, and you can now start
            exploring all the features we have to offer.
          </p>
          <p
            style={{
              margin: "0 0 30px 0",
              color: "#666666",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            If you have any questions or need assistance, feel free to reach out
            to our support team at {supportEmail}.
          </p>
          <Button href={appUrl} color={buttonColor}>
            Get Started
          </Button>
        </td>
      </tr>
    </EmailLayout>
  );
}

interface PasswordResetEmailProps {
  resetLink: string;
  appName: string;
  buttonColor: string;
}

export function PasswordResetEmail({
  resetLink,
  appName,
  buttonColor,
}: PasswordResetEmailProps) {
  return (
    <EmailLayout appName={appName}>
      <tr>
        <td style={{ padding: "0 40px 40px 40px" }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              color: "#333333",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            Reset your password
          </h2>
          <p
            style={{
              margin: "0 0 30px 0",
              color: "#666666",
              fontSize: "16px",
              lineHeight: 1.5,
            }}
          >
            We received a request to reset your password. Click the button below
            to create a new password. This link will expire in 1 hour.
          </p>
          <Button href={resetLink} color={buttonColor}>
            Reset Password
          </Button>
          <p
            style={{
              margin: "30px 0 0 0",
              color: "#999999",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            If you didn't request a password reset, you can safely ignore this
            email. Your password will remain unchanged.
          </p>
        </td>
      </tr>
    </EmailLayout>
  );
}
