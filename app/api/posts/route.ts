import prisma from "@/lib/db";

export async function GET() {
  const posts = await prisma.post.findMany();
  return Response.json(posts, { status: 200 });
}
