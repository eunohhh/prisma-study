import { LIMIT, QUERY_KEYS } from "@/consts/constants";
import { Post } from "@/generated/prisma";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createPost, getPaginatedPosts, getPosts } from "./apis";
import { PostInfiniteQuery } from "./types";

export function usePostsQuery() {
  return useQuery<Post[], Error, Post[]>({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: () => getPosts(false),
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, FormData>({
    mutationFn: (formData) => createPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });
}

export function usePostsInfiniteQuery() {
  return useInfiniteQuery<PostInfiniteQuery, Error, Post[], [string], number>({
    queryKey: [QUERY_KEYS.POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.totalPages > pages.length ? pages.length + 1 : undefined;
    },
    queryFn: ({ pageParam }) => getPaginatedPosts(false, pageParam, LIMIT),
    select: (data) => data.pages.flatMap((page) => page.data),
  });
}
