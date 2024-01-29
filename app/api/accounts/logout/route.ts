import { setCookie } from "@/app/lib/cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  setCookie("auth_access_token", "");
  const response = NextResponse.json({
    status: "success",
    accessToken: "",
    message: "Logout  successfull",
  });
}
