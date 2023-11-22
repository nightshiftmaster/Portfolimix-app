import { NextResponse } from "next/server";

export const POST = async (request) => {
  //   const { name, email, message } = await request.json();
  try {
    return new NextResponse("Thank you for feedback!", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (e) {
    return new NextResponse(
      "Email not sent. Check your credentials or try again later",
      { status: 500 }
    );
  }
};
