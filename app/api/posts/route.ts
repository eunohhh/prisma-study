import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page || !limit) {
    // const posts = await prisma.post.findMany();
    // return NextResponse.json(posts, { status: 200 });
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const allPostsCount = await prisma.post.count();

  const posts = await prisma.post.findMany({
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  const response = {
    data: posts,
    totalItems: posts.length,
    totalPages: Math.ceil(allPostsCount / Number(limit)),
    currentPage: Number(page),
  };

  // console.log(response);
  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: NextRequest) {
  const formDataObject = await request.formData();
  const title = formDataObject.get("title") as string;
  const url = formDataObject.get("url") as string;
  const content = formDataObject.get("content") as string;

  if (!title || !url || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: { title, url, content, vote: 0, createdAt: new Date() },
  });

  console.log(post);

  revalidatePath("/");
  redirect("/");

  // return NextResponse.json(post, { status: 201 });
}
