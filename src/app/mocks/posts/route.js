import { NextResponse } from "next/server";
import Post from "@/models/Post";

import { state, initView } from "./posts";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const watchedPosts = initView(state, username);
  if (username) {
    watchedPosts.user.name = username;
    return new NextResponse(JSON.stringify(watchedPosts.currPosts));
  }
  try {
    return new NextResponse(JSON.stringify(watchedPosts.allPosts), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const post = { ...body, _id: Math.floor(Math.random(1) * 100).toString() };
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const watchedPosts = initView(state, username);
  watchedPosts.allPosts.push(post);
  watchedPosts.user.name = username;
  try {
    return new NextResponse("Post has been created", { status: 201 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
