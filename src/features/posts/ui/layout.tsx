import { PropsWithChildren } from "react";

function PostLayout({ children }: PropsWithChildren) {
  return (
    <main className="pl-8 pr-8 md:pl-12 md:pr-12 bg-slate-100 h-screen overflow-scroll">
      <section className="h-full flex flex-col">{children}</section>
    </main>
  );
}

export default PostLayout;
