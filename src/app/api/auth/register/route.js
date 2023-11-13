import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password, img } = await request.json();
  await connect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    email,
    img,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has bee created", { status: 201 });
  } catch (e) {
    return new NextResponse(e.message, { status: 500 });
  }
};
