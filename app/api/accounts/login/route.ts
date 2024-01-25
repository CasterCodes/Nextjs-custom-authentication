import { signToken } from "@/app/lib/jwt";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    const correctPassword = await user?.comparePassword(password);

    if (!user || !correctPassword) {
      return NextResponse.json({
        status: "fail",
        message: "Wrong password or email",
      });
    }

    const accessToken = signToken("access", {
      name: user.firstName,
      email: user.email,
      id: user._id,
    });

    const response = NextResponse.json({
      status: "success",
      accessToken,
      message: "Login successfull",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { status: "fail", error: error.message },
      { status: 500 }
    );
  }
}
