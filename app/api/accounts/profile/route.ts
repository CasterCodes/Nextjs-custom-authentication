import { isAuthenticatedOrAuthorized } from "@/app/lib/account";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
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
      return NextResponse.json({
        user: null,
        error: true,
        message: message,
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({
        status: "fail",
        message: "No user",
      });
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Logged in profile",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
