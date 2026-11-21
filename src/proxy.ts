import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Optimistic check only: if there is no session cookie at all, skip the
 * render and go straight to sign-in. Real role checks happen server-side in
 * the dashboard layouts and in the Express API.
 */
export function proxy(request: NextRequest) {
  const hasSession = Boolean(getSessionCookie(request));
  const { pathname, search } = request.nextUrl;

  if (!hasSession) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/services/:id+", "/payment/:path*"],
};
