import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { verifyWebhookSignature } from "@/libs/stripe";

/**
 * Handle Stripe webhook events
 * This endpoint processes events sent from Stripe when payments succeed,
 * subscriptions are created/updated, etc.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = verifyWebhookSignature(body, signature);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 * This fires when a customer completes the checkout
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log("Checkout session completed:", session.id);

  const customerId = session.customer as string;
  const customerEmail = session.customer_email || session.customer_details?.email;
  const clientReferenceId = session.client_reference_id;

  // TODO: Update user in database
  // - Mark user as having purchased
  // - Store customer ID for future reference
  // - Grant access to purchased features
  // Example:
  // await User.findOneAndUpdate(
  //   { email: customerEmail },
  //   {
  //     stripeCustomerId: customerId,
  //     hasAccess: true,
  //     purchaseDate: new Date(),
  //   }
  // );

  console.log("User purchased:", {
    customerId,
    customerEmail,
    clientReferenceId,
  });
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("Subscription created:", subscription.id);

  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0].price.id;
  const status = subscription.status;

  // TODO: Update user subscription in database
  // Example:
  // await User.findOneAndUpdate(
  //   { stripeCustomerId: customerId },
  //   {
  //     subscriptionId: subscription.id,
  //     priceId,
  //     subscriptionStatus: status,
  //     currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  //   }
  // );

  console.log("Subscription created for customer:", {
    customerId,
    priceId,
    status,
  });
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("Subscription updated:", subscription.id);

  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0].price.id;
  const status = subscription.status;

  // TODO: Update subscription in database
  // Example:
  // await User.findOneAndUpdate(
  //   { stripeCustomerId: customerId },
  //   {
  //     priceId,
  //     subscriptionStatus: status,
  //     currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  //     cancelAtPeriodEnd: subscription.cancel_at_period_end,
  //   }
  // );

  console.log("Subscription updated for customer:", {
    customerId,
    priceId,
    status,
  });
}

/**
 * Handle subscription deleted/cancelled
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("Subscription deleted:", subscription.id);

  const customerId = subscription.customer as string;

  // TODO: Update user access in database
  // Example:
  // await User.findOneAndUpdate(
  //   { stripeCustomerId: customerId },
  //   {
  //     subscriptionStatus: 'canceled',
  //     hasAccess: false,
  //   }
  // );

  console.log("Subscription canceled for customer:", customerId);
}

/**
 * Handle successful invoice payment
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Invoice payment succeeded:", invoice.id);

  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  // TODO: Record payment in database
  // Example:
  // await Payment.create({
  //   customerId,
  //   subscriptionId,
  //   invoiceId: invoice.id,
  //   amount: invoice.amount_paid,
  //   currency: invoice.currency,
  //   status: 'paid',
  //   paidAt: new Date(),
  // });

  console.log("Payment succeeded for customer:", {
    customerId,
    subscriptionId,
    amount: invoice.amount_paid,
  });
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Invoice payment failed:", invoice.id);

  const customerId = invoice.customer as string;
  const customerEmail = invoice.customer_email;

  // TODO: Handle failed payment
  // - Send email notification to customer
  // - Update user record
  // - Potentially revoke access after grace period
  // Example:
  // await sendEmail({
  //   to: customerEmail,
  //   subject: 'Payment Failed',
  //   body: 'Your recent payment failed. Please update your payment method.',
  // });

  console.log("Payment failed for customer:", {
    customerId,
    customerEmail,
  });
}
