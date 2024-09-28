import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Connect from "@/lib/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookies from "js-cookie";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("reqBody: ",reqBody);
    const { token2 } = reqBody;

    const secret = "dispatch-system";
    console.log("token: ",token2);
    console.log("process.env.TOKEN_SECRET: ",process.env.TOKEN_SECRET);
    const decoded = jwt.verify(token2, secret);
    
    console.log("Decoded Token Data: ", decoded);
    return NextResponse.json({
      message: "User created SUccessfully",
      success: true,
      decoded,
    });
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({
      message: error,
      success: false,
      
    });
  }
}