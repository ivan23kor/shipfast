/**
 * Email System Usage Examples
 *
 * This file contains examples of how to use the email functions.
 * Copy and adapt these examples in your API routes or server actions.
 */

import {
  sendMagicLinkEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendTransactionalEmail,
  sendEmail,
} from "@/libs/resend";

// Example 1: Send magic link for authentication
export async function exampleMagicLink(userEmail: string, token: string) {
  try {
    const result = await sendMagicLinkEmail({
      to: userEmail,
      magicLink: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`,
    });

    console.log("Magic link sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending magic link:", error);
    throw error;
  }
}

// Example 2: Send email verification
export async function exampleVerification(userEmail: string, token: string) {
  try {
    const result = await sendVerificationEmail(
      userEmail,
      `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
    );

    console.log("Verification email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}

// Example 3: Send welcome email to new user
export async function exampleWelcome(userEmail: string, userName: string) {
  try {
    const result = await sendWelcomeEmail(userEmail, userName);

    console.log("Welcome email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

// Example 4: Send password reset email
export async function examplePasswordReset(userEmail: string, token: string) {
  try {
    const result = await sendPasswordResetEmail(
      userEmail,
      `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
    );

    console.log("Password reset email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

// Example 5: Send custom transactional email
export async function exampleOrderConfirmation(
  userEmail: string,
  orderDetails: any
) {
  const html = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your purchase!</p>
    <p>Order ID: ${orderDetails.id}</p>
    <p>Total: $${orderDetails.total}</p>
  `;

  try {
    const result = await sendTransactionalEmail({
      to: userEmail,
      subject: "Your Order Confirmation",
      html,
    });

    console.log("Order confirmation sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending order confirmation:", error);
    throw error;
  }
}

// Example 6: Send email with CC and BCC
export async function exampleWithCopyRecipients(userEmail: string) {
  try {
    const result = await sendEmail({
      to: userEmail,
      subject: "Important Notification",
      html: "<p>This is an important notification.</p>",
      cc: "manager@example.com",
      bcc: "archive@example.com",
    });

    console.log("Email with CC/BCC sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending email with CC/BCC:", error);
    throw error;
  }
}

// Example 7: Send to multiple recipients
export async function exampleBulkEmail(recipients: string[]) {
  try {
    const result = await sendTransactionalEmail({
      to: recipients,
      subject: "Team Announcement",
      html: "<p>Important team update!</p>",
    });

    console.log("Bulk email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending bulk email:", error);
    throw error;
  }
}

// Example 8: API Route usage (Next.js App Router)
// File: app/api/auth/magic-link/route.ts
/*
import { NextRequest, NextResponse } from "next/server";
import { sendMagicLinkEmail } from "@/libs/resend";
import { generateToken } from "@/libs/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Generate magic link token
    const token = await generateToken(email);
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

    // Send email
    await sendMagicLinkEmail({
      to: email,
      magicLink,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in magic link route:", error);
    return NextResponse.json(
      { error: "Failed to send magic link" },
      { status: 500 }
    );
  }
}
*/

// Example 9: Server Action usage (Next.js)
// File: app/actions/auth.ts
/*
"use server";

import { sendWelcomeEmail } from "@/libs/resend";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  try {
    // Create user in database
    // const user = await createUser({ email, name });

    // Send welcome email
    await sendWelcomeEmail(email, name);

    redirect("/dashboard");
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Failed to register user");
  }
}
*/
