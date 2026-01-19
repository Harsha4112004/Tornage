import { NextResponse, NextRequest } from "next/server";
import {connect} from "../../../../db/dbConfig";
import User from "../../../../models/users.models";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req:NextRequest) {
  try {
    await connect();

    const userId = getDataFromToken(req);
    const { searchParams } = new URL(req.url);
    const toolkitTitle = searchParams.get("toolkit");

    if (!userId || !toolkitTitle) {
      return NextResponse.json({ purchased: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ purchased: false });
    }

    return NextResponse.json({
      purchased: user.purchasedToolkits.includes(toolkitTitle),
    });
  } catch {
    return NextResponse.json({ purchased: false });
  }
}
