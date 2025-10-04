export interface EmailResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

export type EmailTemplate =
  | "magic-link"
  | "verification"
  | "welcome"
  | "password-reset"
  | "custom";

export interface BaseEmailOptions {
  to: string | string[];
  subject: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

export interface HtmlEmailOptions extends BaseEmailOptions {
  html: string;
  text?: string;
}

export interface TemplateEmailOptions extends BaseEmailOptions {
  template: EmailTemplate;
  data: Record<string, any>;
}

export interface MagicLinkData {
  magicLink: string;
  appName?: string;
  expiryMinutes?: number;
}

export interface VerificationData {
  verificationLink: string;
  appName?: string;
}

export interface WelcomeData {
  userName?: string;
  appName?: string;
  appUrl?: string;
  supportEmail?: string;
}

export interface PasswordResetData {
  resetLink: string;
  appName?: string;
  expiryHours?: number;
}
