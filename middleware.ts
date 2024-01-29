import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/jwt";
import { getCookie, setCookie } from "./app/lib/cookie";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = ["/accounts/create", "/accounts/login", "/"].includes(
    pathname
  );

  const accessToken = getCookie("access_token_auth") || "";

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (!isPublicRoute && !accessToken) {
    return NextResponse.redirect(new URL("/accounts/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/accounts/profile", "/accounts/create", "/accounts/login", "/"],
};
