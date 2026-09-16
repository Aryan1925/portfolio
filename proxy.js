import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/uploads")
  ) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/uploads/:path*"],
};