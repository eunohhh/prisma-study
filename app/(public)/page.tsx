import { LIMIT, QUERY_KEYS } from "@/consts/constants";
import { getPaginatedPosts } from "@/features/posts/apis";
import { PostInfiniteQuery } from "@/features/posts/types";
import PostLayout from "@/features/posts/ui/layout";
import Posts from "@/features/posts/ui/posts";
import { Post } from "@/generated/prisma";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function PostPage() {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: () => getPosts(true),
  //   staleTime: 0,
  // });

  await queryClient.prefetchInfiniteQuery<
    PostInfiniteQuery,
    Error,
    Post[],
    [string],
    number
  >({
    queryKey: [QUERY_KEYS.POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.totalPages > pages.length ? pages.length + 1 : undefined;
    },
    queryFn: ({ pageParam }) => getPaginatedPosts(true, pageParam, LIMIT),
    pages: 1,
    // 1분으로 설정
    staleTime: 1000 * 60,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostLayout>
        <div className="w-full h-16 flex flex-row items-center justify-start p-4 gap-4">
          <p className="text-lg font-extrabold text-black">Prisma Study</p>
          <a className="text-black cursor-pointer" href="/submit">
            submit
          </a>
        </div>
        <div className="bg-[#f6f6ef] h-full w-full">
          <Posts />
        </div>
      </PostLayout>
    </HydrationBoundary>
  );
}

export default PostPage;
