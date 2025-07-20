import { Post } from "@/generated/prisma";
import api from "@/lib/axios";
import serverApi from "@/lib/axios-server";
import { PostInfiniteQuery } from "./types";

export function getPosts(isServer: boolean) {
  return isServer
    ? serverApi.get<Post[], Post[]>("/api/posts")
    : api.get<Post[], Post[]>("/api/posts");
}

export function createPost(formData: FormData) {
  return api.post<Post, Post>("/api/posts", formData);
}

export function getPost(id: string) {
  return api.get<Post, Post>(`/api/posts/${id}`);
}

export function getPaginatedPosts(
  isServer: boolean,
  page: number,
  limit: number
) {
  return isServer
    ? serverApi.get<PostInfiniteQuery, PostInfiniteQuery>(
        `/api/posts?page=${page}&limit=${limit}`
      )
    : api.get<PostInfiniteQuery, PostInfiniteQuery>(
        `/api/posts?page=${page}&limit=${limit}`
      );
}
