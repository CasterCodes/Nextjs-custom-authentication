import Token from "@/models/token.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { token, password, confirmPassword } = await request.json();

  try {
    if (!token) {
      return NextResponse.json(
        {
          status: "fail",
          message: "No reset password token",
        },
        { status: 400 }
      );
    }

    const storedToken = await Token.findOne({
      token,
      expiresIn: { $gt: Date.now() },
    });

    if (!storedToken)
      return NextResponse.json(
        {
          status: "fail",
          message: "Invalid password reset token",
        },
        { status: 400 }
      );

    const user = await User.findById(storedToken.user);

    if (!user)
      return NextResponse.json(
        {
          status: "fail",
          message: "There is something wrong with you token",
        },
        { status: 400 }
      );

    user.password = password;

    await user.save();

    await Token.findByIdAndDelete(storedToken._id);

    return NextResponse.json(
      {
        status: "success",
        message: "Password reset successfully",
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
