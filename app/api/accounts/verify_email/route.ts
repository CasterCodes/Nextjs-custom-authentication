import Token from "@/models/token.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  try {
    if (!token)
      return NextResponse.json({
        status: "fail",
        message: "Email Verification token is required ",
      });

    const storedTokenExists = await Token.findOne({
      token,
      type: "emailVerification",
    });

    const user = await User.findById(storedTokenExists?.user);

    if (!storedTokenExists || !user)
      return NextResponse.json({
        status: "fail",
        message: "Invalid email token ",
      });

    user.isEmailVerified = true;

    await user.save();

    await Token.findByIdAndDelete(storedTokenExists._id);

    return NextResponse.json(
      {
        status: "success",
        message: "Email confirmed. Processed to login",
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
