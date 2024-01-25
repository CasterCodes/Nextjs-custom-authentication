import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = ["/account/create", "/accounts/login", "/"].includes(
    pathname
  );

  const accessToken = request.cookies.get("access_token_auth") || "";

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/accounts/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/accounts/profile", "/accounts/create", "/accounts/login", "/"],
};
