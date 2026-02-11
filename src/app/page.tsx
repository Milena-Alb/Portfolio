
import { PostFeatured } from "@/Components/PostFeatured";
import { PostsLists } from "@/Components/PostsLists";
import { SpinLoader } from "@/Components/SpinLoader";
import { Suspense } from "react";

export const dynamic = 'force-static';

export default async function HomePage() {
  return (
    <>
      {/* 
      <ClientComponent>
        <ServerComponent />
      </ClientComponent> */}
      <Suspense fallback={<SpinLoader containerClasses="min-h-20 mb-16" />} >
        <PostFeatured />
        <PostsLists />
      </Suspense>
    </>
  )
}
