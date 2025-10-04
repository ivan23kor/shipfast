import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createCustomerPortalSession, getCustomerByEmail } from "@/libs/stripe";

/**
 * Create a Stripe customer portal session
 * This allows customers to manage their subscriptions, payment methods, and billing info
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to access the customer portal" },
        { status: 401 }
      );
    }

    // Get customer from Stripe
    const customer = await getCustomerByEmail(session.user.email);

    if (!customer) {
      return NextResponse.json(
        { error: "No Stripe customer found. Please make a purchase first." },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { returnUrl } = body;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL;
    const portalSession = await createCustomerPortalSession({
      customerId: customer.id,
      returnUrl: returnUrl || `${baseUrl}/dashboard`,
    });

    return NextResponse.json({
      url: portalSession.url,
    });
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create customer portal session",
      },
      { status: 500 }
    );
  }
}
