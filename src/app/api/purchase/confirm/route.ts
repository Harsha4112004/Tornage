import { NextRequest, NextResponse } from "next/server";
import {connect} from "../../../../db/dbConfig";
import User from "../../../../models/users.models";
import { getDataFromToken } from "@/helpers/getDataFromToken"; 

export async function POST(req:NextRequest) {
  try {
    await connect();

    const userId = getDataFromToken(req);
    const { toolkitTitle } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.purchasedToolkits.includes(toolkitTitle)) {
      user.purchasedToolkits.push(toolkitTitle);
      await user.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
