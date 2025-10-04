import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createCheckoutSession, getPlanByPriceId } from "@/libs/stripe";
import config from "@/config";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a checkout session" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { priceId, successUrl, cancelUrl } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Verify the price ID exists in config
    const plan = getPlanByPriceId(priceId);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL;
    const checkoutSession = await createCheckoutSession({
      priceId,
      userId: session.user.email as string,
      userEmail: session.user.email as string,
      successUrl: successUrl || `${baseUrl}/dashboard?success=true`,
      cancelUrl: cancelUrl || `${baseUrl}/pricing?canceled=true`,
      clientReferenceId: session.user.email as string,
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}
