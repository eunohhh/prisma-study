import { Post } from "@/generated/prisma";
import api from "@/lib/axios";
import serverApi from "@/lib/axios-server";

export function getPosts(isServer: boolean) {
  return isServer
    ? serverApi.get<Post[], Post[]>("/api/posts")
    : api.get<Post[], Post[]>("/api/posts");
}

export function createPost(formData: FormData) {
  return api.post<Post, Post>("/api/posts", formData);
}
