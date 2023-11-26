import { NextResponse } from "next/server";

import { state, initView } from "../posts";

export const GET = async (request, { params }) => {
  const { id } = params;
  const watchedPosts = initView(state);

  try {
    const currPost = watchedPosts.allPosts.find((post) => post._id === id);

    return new NextResponse(JSON.stringify(currPost), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  const watchedPosts = initView(state);
  try {
    watchedPosts.deletePostId = id;
    watchedPosts.user.triggle = !watchedPosts.user.triggle;
    // watchedPosts.allPosts = state.allPosts;
    return new NextResponse("Post hav been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
