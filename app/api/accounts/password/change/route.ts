import { isAuthenticatedOrAuthorized } from "@/app/lib/account";
import { deleteCookie, setCookie } from "@/app/lib/cookie";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { currentPassword, newPassword } = await request.json();
  try {
    const { id, authenticated, message } = await isAuthenticatedOrAuthorized([
      "user",
      "admin",
    ]);

    if (!authenticated) {
      return NextResponse.json(
        {
          status: "fail",
          message,
        },
        { status: 401 }
      );
    }

    const user = await User.findById(id);

    if (!(await user?.comparePassword(currentPassword))) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Incorrect current password",
        },
        { status: 200 }
      );
    }

    user.password = newPassword;

    await user.save();

    // Logout the user after the change password to force login

    deleteCookie("access_token_auth");

    return NextResponse.json({
      status: "success",
      message: "Password changed",
      accessToken: "",
    });
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
