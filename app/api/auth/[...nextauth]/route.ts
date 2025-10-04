import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongo";
import { Resend } from "resend";
import config from "@/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    EmailProvider({
      server: "",
      from: config.mailgun.fromNoReply,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        try {
          await resend.emails.send({
            from: config.mailgun.fromNoReply,
            to: email,
            subject: `Sign in to ${config.appName}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Sign in to ${config.appName}</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(to right, #4F46E5, #7C3AED); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">${config.appName}</h1>
                  </div>

                  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333; margin-top: 0;">Sign in to your account</h2>
                    <p style="font-size: 16px; margin-bottom: 30px;">
                      Click the button below to sign in to your account. This link will expire in 24 hours.
                    </p>

                    <div style="text-align: center; margin: 40px 0;">
                      <a href="${url}"
                         style="background: #4F46E5; color: white; padding: 14px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
                        Sign In
                      </a>
                    </div>

                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                      If you didn't request this email, you can safely ignore it.
                    </p>

                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

                    <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                      © ${new Date().getFullYear()} ${config.appName}. All rights reserved.
                    </p>
                  </div>
                </body>
              </html>
            `,
          });
        } catch (error) {
          console.error("Error sending email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
  ],

  pages: {
    signIn: config.auth.loginUrl,
    error: config.auth.loginUrl,
  },

  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = user?.id || token?.sub || "";
        session.user.name = user?.name || token?.name || "";
        session.user.email = user?.email || token?.email || "";
        session.user.image = user?.image || token?.picture || "";
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },

  session: {
    strategy: "database",
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
