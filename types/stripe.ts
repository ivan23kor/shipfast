import Stripe from "stripe";

/**
 * Stripe checkout session creation parameters
 */
export interface CreateCheckoutSessionParams {
  priceId: string;
  userId?: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
  clientReferenceId?: string;
}

/**
 * Stripe subscription checkout session parameters
 */
export interface CreateSubscriptionCheckoutParams {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
}

/**
 * Customer portal session parameters
 */
export interface CreatePortalSessionParams {
  customerId: string;
  returnUrl: string;
}

/**
 * Customer creation parameters
 */
export interface CreateCustomerParams {
  email: string;
  name?: string;
  userId: string;
}

/**
 * Stripe webhook event types we handle
 */
export type StripeWebhookEvent =
  | "checkout.session.completed"
  | "customer.subscription.created"
  | "customer.subscription.updated"
  | "customer.subscription.deleted"
  | "invoice.payment_succeeded"
  | "invoice.payment_failed";

/**
 * Subscription status types
 */
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid";

/**
 * User payment info stored in database
 */
export interface UserPaymentInfo {
  stripeCustomerId?: string;
  subscriptionId?: string;
  priceId?: string;
  subscriptionStatus?: SubscriptionStatus;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  hasAccess: boolean;
  purchaseDate?: Date;
}

/**
 * API response for checkout session creation
 */
export interface CheckoutSessionResponse {
  sessionId: string;
  url: string | null;
}

/**
 * API response for portal session creation
 */
export interface PortalSessionResponse {
  url: string;
}

/**
 * Webhook event data types
 */
export interface WebhookEventData {
  checkoutSession?: Stripe.Checkout.Session;
  subscription?: Stripe.Subscription;
  invoice?: Stripe.Invoice;
}
