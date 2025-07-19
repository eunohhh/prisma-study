import { QUERY_KEYS } from "@/consts/constants";
import { Post } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./apis";

export function usePostsQuery() {
  return useQuery<Post[], Error, Post[]>({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: () => getPosts(false),
  });
}
