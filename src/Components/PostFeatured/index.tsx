import ErrorMessages from "../ErrorMessages";
import { PostCoverImage } from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export async function PostFeatured() {
    const posts = await findAllPublicPostsCached();

    if (posts.length <= 0) return <ErrorMessages contentTitle="Ops!" content='Ainda não criamos nenhum post.' />

    const post = posts[0];
    const postLink = `/post/${post.slug}`;
    return (
        <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
            <PostCoverImage
                linkProps={{
                    href: postLink
                }}
                imageProps={{
                    width: 1200,
                    height: 720,
                    src: post.coverImageUrl,
                    alt: post.title,
                    priority: true,
                }}
            />
            <PostSummary postHeading="h1" postLink={postLink} title={post.title} excerpt={post.excerpt} createdAt={post.createdAt} />
        </section>
    )
}