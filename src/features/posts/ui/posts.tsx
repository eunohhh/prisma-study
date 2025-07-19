"use client";

import { useEffect } from "react";
import { usePostsQuery } from "../queries";
import { Post } from "./post";

function Posts() {
  const { data: posts, isPending, error } = usePostsQuery();

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  if (isPending) return <div>Loading...</div>;

  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-12 md:p-8 text-black">
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
    </ol>
  );
}

export default Posts;
