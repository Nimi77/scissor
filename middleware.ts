import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  // Define public paths
  const publicPaths = [
    /^\/$/,
    /^\/signup$/,
    /^\/login$/,
    /^\/logout$/,
    /^\/forgot-password$/,
    /^\/reset-password\/?.*$/,
  ];

  // Access to public paths even if the user is not authenticated
  if (publicPaths.some((regex) => regex.test(pathname))) {
    return NextResponse.next();
  }

  // Redirect to 404 for non-existent routes not matching any path
  if (
    !pathname.startsWith("/dashboard") &&
    !publicPaths.some((regex) => regex.test(pathname))
  ) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // If there is no session and the user is trying to access a protected route
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if the path is a short URL
  const shortUrlPattern = /^\/[a-zA-Z0-9]{10}$/;
  if (shortUrlPattern.test(pathname)) {
    const shortId = pathname.slice(1);
    const result =
      await sql`SELECT 1 FROM user_urls WHERE short_url = ${shortId} LIMIT 1`;

    if (result.rowCount === 0) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If the session exists or the path is public, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/:path*"],
};