import { postRepository } from "@/repositories/post";
import { cache } from "react";

export const findAllPublicPostsCached = cache ( 
    async () => await postRepository.findAllPublic()
);

export const findPostsSlugCached = cache ( 
    async (slug: string) => await postRepository.findBySlug(slug)
);

export const findPostsIdCached = cache ( 
    async (id: string) => await postRepository.findById(id)
);