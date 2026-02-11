import { PostModel } from "@/Models/Post/post-model";
import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicPostsCached = unstable_cache(
    async () => {
        return postRepository.findAllPublic()
    },
    ['posts'],
    {
        tags: ['posts'],
    }
)

export const findPublicPostSlugCached = cache((slug: string) => {
    return unstable_cache(
        async (slug: string) => {
            const post = await postRepository.findBySlugPublic(slug).catch(() => undefined);

            if (!post) notFound;

            return post;
        },
        [`post-${slug}`],
        { tags: [`post-${slug}`], }
    )(slug);
});

export const findPostsIdCached = cache(
    async (id: string) => await postRepository.findById(id)
);

