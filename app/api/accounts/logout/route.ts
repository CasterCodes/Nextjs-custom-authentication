import { deleteCookie } from "@/app/lib/cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  deleteCookie("access_token_auth");
  const response = NextResponse.json({
    status: "success",
    accessToken: "",
    message: "Logout  successfull",
  });

  return response;
}
