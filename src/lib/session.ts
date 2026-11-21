import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { dashboardFor, type Role } from "./roles";

/** Reads the Better Auth session once per request. */
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

/** Redirects to sign-in when there is no session; sends blocked users away. */
export async function requireUser(callbackPath?: string) {
  const session = await getSession();
  if (!session) {
    redirect(callbackPath ? `/sign-in?callbackUrl=${encodeURIComponent(callbackPath)}` : "/sign-in");
  }
  if (session.user.isBlocked) redirect("/blocked");
  return session.user;
}

/**
 * Server-side role gate for dashboard layouts. A user who edits the URL to
 * reach another role's dashboard is sent back to their own.
 */
export async function requireRole(role: Role) {
  const user = await requireUser(`/dashboard/${role}`);
  if (user.role !== role) redirect(dashboardFor(user.role));
  return user;
}
