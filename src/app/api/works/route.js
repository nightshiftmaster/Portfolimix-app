import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Work from "@/models/Work";

export const GET = async (request) => {
  try {
    await connect();
    const works = await Work.find();
    return new NextResponse(JSON.stringify(works), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
