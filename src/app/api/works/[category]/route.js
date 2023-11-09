import { NextResponse } from "next/server";
import connect from "../../../../utils/db";
import Work from "../../../../models/Work";

export const GET = async (request, { params }) => {
  const { category } = params;
  await connect();
  try {
    const post = await Work.find({ category });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
