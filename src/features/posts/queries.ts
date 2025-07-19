import { QUERY_KEYS } from "@/consts/constants";
import { Post } from "@/generated/prisma";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "./apis";

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
