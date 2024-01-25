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
    await User.create({ email, firstName, lastName, password });

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
