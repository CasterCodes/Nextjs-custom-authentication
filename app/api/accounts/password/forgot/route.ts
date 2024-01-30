import sendMail from "@/app/lib/email";
import { createToken } from "@/app/lib/token";
import Token from "@/models/token.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    if (!email)
      return NextResponse.json(
        {
          status: "fail",
          message: "Provide email",
        },
        { status: 400 }
      );

    const user = await User.findOne({ email });

    if (!user) {
      // For security purpose return 200 status
      return NextResponse.json(
        {
          status: "success",
          message: "Password reset token sent",
        },
        { status: 200 }
      );
    }

    const token = createToken();

    const expiresIn = new Date(Date.now() + 20 * 60 * 1000);

    await Token.create({
      token,
      type: "passwordReset",
      expiresIn,
      user: user._id,
    });

    const emailHtml = `<p>Click <a href="${process.env.ROOT_URL}/accounts/password/reset?token=${token}">here</a> to reset your password
            or copy and paste the link below in your browser. <br> ${process.env.ROOT_URL}/accounts/verify_email?token=${token}
            </p>`;

    const mailData = {
      html: emailHtml,
      to: email,
      from: "nextjsauthexample@gmail.com",
      subject: "Reset password reset instructions",
      text: emailHtml,
    };

    await sendMail(mailData);

    return NextResponse.json(
      {
        status: "success",
        message: "Instructions sent to email",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
