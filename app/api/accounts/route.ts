import sendMail from "@/app/lib/email";
import { createToken } from "@/app/lib/token";
import Token from "@/models/token.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, password } = await request.json();

    const emailTaken = await User.findOne({ email });

    if (emailTaken)
      return NextResponse.json(
        {
          status: "fail",
          message: "Email associated with account",
        },
        { status: 400 }
      );

    // NOTE: password is hashed in the mongoose pre middleware
    const user = await User.create({ email, firstName, lastName, password });

    const token = createToken();

    await Token.create({ user: user._id, token, type: "emailVerification" });

    const emailHtml = `<p>Click <a href="${process.env.ROOT_URL}/accounts/verify_email?token=${token}">here</a> to  verify your email
            or copy and paste the link below in your browser. <br> ${process.env.ROOT_URL}/accounts/verify_email?token=${token}
            </p>`;

    const mailData = {
      html: emailHtml,
      to: email,
      from: "nextjsauthexample@gmail.com",
      subject: "Email verification",
      text: emailHtml,
    };

    await sendMail(mailData);

    return NextResponse.json(
      {
        status: "success",
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "success",
    message: "Accounts route working",
  });
}
