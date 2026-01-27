import { findPostsSlugCached } from "@/lib/post/queries";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { PostHeading } from "../PostHeading";
import { PostDate } from "../PostDate";
import { SafeMarkdown } from "../SafeMarkdown";

type SinglePostProps = {
    slug: string;
}

export async function SinglePost({ slug }: SinglePostProps) {
    const post = await findPostsSlugCached(slug).catch(() => undefined);
    if (!post) notFound();

    return (
        <article className="mb-16">
            <header className="flex flex-col gap-4 mb-4">
                <Image
                    className="rounded-xl"
                    src={post.coverImageUrl}
                    width={1200}
                    height={720}
                    alt={post.title}
                />
                <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>

                <p>{post.author} | <PostDate dateTime={post.createdAt} /></p>
            </header>

            <p className="text-xl mb-6">{post.excerpt}</p>

            <SafeMarkdown markdown={post.content} />

        </article>
    )
}