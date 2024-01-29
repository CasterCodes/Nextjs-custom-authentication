import { isAuthenticatedOrAuthorized } from "@/app/lib/account";
import { getAccessToken, verifyToken } from "@/app/lib/jwt";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { authenticated, message, id } = await isAuthenticatedOrAuthorized([
    "user",
    "admin",
  ]);

  if (!authenticated || !id) {
    return NextResponse.json(
      {
        status: "fail",
        message: message,
      },
      { status: 401 }
    );
  }

  if (!authenticated) {
    return {
      user: null,
      error: true,
      message: message,
    };
  }

  const user = await User.findById(id).select("-password");

  return NextResponse.json({
    status: "success",
    message: "Logged in profile",
    user,
  });
}
