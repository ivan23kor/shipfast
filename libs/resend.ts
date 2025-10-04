import { Resend } from "resend";
import config from "@/config";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

export interface MagicLinkEmailOptions {
  to: string;
  magicLink: string;
  appName?: string;
}

export interface TransactionalEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

/**
 * Send a magic link email for passwordless authentication
 */
export async function sendMagicLinkEmail({
  to,
  magicLink,
  appName = config.appName,
}: MagicLinkEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: config.mailgun.fromNoReply,
      to,
      subject: `Sign in to ${appName}`,
      html: getMagicLinkEmailTemplate({ magicLink, appName }),
    });

    if (error) {
      throw new Error(`Failed to send magic link email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending magic link email:", error);
    throw error;
  }
}

/**
 * Send a transactional email (welcome, confirmation, notification, etc.)
 */
export async function sendTransactionalEmail({
  to,
  subject,
  html,
  from = config.mailgun.fromNoReply,
}: TransactionalEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending transactional email:", error);
    throw error;
  }
}

/**
 * Send a custom email with full control over options
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = config.mailgun.fromNoReply,
  replyTo,
  cc,
  bcc,
}: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo && { replyTo }),
      ...(cc && { cc }),
      ...(bcc && { bcc }),
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(to: string, userName?: string) {
  const subject = `Welcome to ${config.appName}!`;
  const html = getWelcomeEmailTemplate({ userName, appName: config.appName });

  return sendTransactionalEmail({ to, subject, html });
}

/**
 * Send email verification
 */
export async function sendVerificationEmail(
  to: string,
  verificationLink: string
) {
  const subject = `Verify your ${config.appName} email`;
  const html = getVerificationEmailTemplate({
    verificationLink,
    appName: config.appName,
  });

  return sendTransactionalEmail({ to, subject, html });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  resetLink: string
) {
  const subject = `Reset your ${config.appName} password`;
  const html = getPasswordResetEmailTemplate({
    resetLink,
    appName: config.appName,
  });

  return sendTransactionalEmail({ to, subject, html });
}

// Email Templates

function getMagicLinkEmailTemplate({
  magicLink,
  appName,
}: {
  magicLink: string;
  appName: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to ${appName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #333333; font-size: 28px; font-weight: 600;">${appName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: 500;">Sign in to your account</h2>
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Click the button below to sign in to your ${appName} account. This link will expire in 10 minutes.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${magicLink}" style="display: inline-block; background-color: ${config.colors.main}; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600; text-align: center;">Sign In</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.5;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function getVerificationEmailTemplate({
  verificationLink,
  appName,
}: {
  verificationLink: string;
  appName: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #333333; font-size: 28px; font-weight: 600;">${appName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: 500;">Verify your email address</h2>
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Thanks for signing up! Please verify your email address by clicking the button below.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${verificationLink}" style="display: inline-block; background-color: ${config.colors.main}; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600; text-align: center;">Verify Email</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.5;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function getWelcomeEmailTemplate({
  userName,
  appName,
}: {
  userName?: string;
  appName: string;
}) {
  const greeting = userName ? `Hi ${userName}` : "Welcome";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${appName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #333333; font-size: 28px; font-weight: 600;">${appName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: 500;">${greeting}!</h2>
              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Welcome to ${appName}! We're excited to have you on board.
              </p>
              <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Your account has been created successfully, and you can now start exploring all the features we have to offer.
              </p>
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                If you have any questions or need assistance, feel free to reach out to our support team at ${config.mailgun.supportEmail}.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || config.domainName}" style="display: inline-block; background-color: ${config.colors.main}; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600; text-align: center;">Get Started</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function getPasswordResetEmailTemplate({
  resetLink,
  appName,
}: {
  resetLink: string;
  appName: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #333333; font-size: 28px; font-weight: 600;">${appName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: 500;">Reset your password</h2>
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resetLink}" style="display: inline-block; background-color: ${config.colors.main}; color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600; text-align: center;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; color: #999999; font-size: 14px; line-height: 1.5;">
                If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export default resend;
