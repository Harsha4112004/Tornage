import { NextResponse } from "next/server";
import User from "@/models/users.models";
import { sendMail } from "./../../../helpers/sendmail";
import {connect} from "../../../db/dbConfig";

connect();

export async function POST(request: Request) {
  try {
    const { email, emailType } = await request.json();

    // ✅ Validate input
    if (!email || !emailType) {
      return NextResponse.json(
        { error: "Email and emailType are required" },
        { status: 400 }
      );
    }

    if (emailType !== "VERIFY") {
      return NextResponse.json(
        { error: "Invalid email type" },
        { status: 400 }
      );
    }

    // ✅ Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Already verified?
    if (user.isVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // ✅ Send OTP
    await sendMail({
      email,
      emailType: "VERIFY",
      userId: user._id.toString(),
    });

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
