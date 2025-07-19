import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts, { status: 200 });
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
