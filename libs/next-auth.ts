import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

/**
 * Get the current user session on the server
 * Use this in Server Components, Server Actions, and API routes
 */
export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Check if user is authenticated
 * Returns true if user has an active session
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in protected routes/API endpoints
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized - Authentication required");
  }

  return session.user;
}

/**
 * Get user ID from current session
 * Returns null if not authenticated
 */
export async function getUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id || null;
}

/**
 * Check if user has a specific role
 * Extend this as needed for your role-based access control
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await getCurrentUser();
  // Add role checking logic here when you add roles to your user model
  return false;
}
