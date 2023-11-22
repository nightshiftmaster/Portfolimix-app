import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
import { posts } from "../posts";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    const currPost = posts.find((post) => post._id === id);

    return new NextResponse(JSON.stringify(currPost), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

// export const DELETE = async (request, { params }) => {
//   const { id } = params;
//   try {
//     await connect();
//     const post = await Post.findByIdAndDelete(id);
//     return new NextResponse("Post hav been deleted", { status: 200 });
//   } catch (error) {
//     return new NextResponse("Database error", { status: 500 });
//   }
// };
