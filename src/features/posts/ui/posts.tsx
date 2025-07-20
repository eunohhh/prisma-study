"use client";

import { useEffect } from "react";
import { usePostsInfiniteQuery } from "../queries";
import InfiniteScroll from "./infinite-scroll";
import { Post } from "./post";

function Posts() {
  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
  } = usePostsInfiniteQuery();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-12 md:p-8 text-black">
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
        {posts?.map((post, itemNo) => (
          <li key={post.id} className="mb-4">
            <Post
              id={post.id}
              itemNo={itemNo + 1}
              title={post.title}
              votes={post.vote}
              url={post.url}
            />
          </li>
        ))}
        {isPending && <div>Loading...</div>}
      </InfiniteScroll>
    </ol>
  );
}

export default Posts;
