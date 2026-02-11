import { PostModel } from "@/Models/Post/post-model";

export type PublicPost = Omit<PostModel, 'updatedAt'>;
;
export const makePartialPublicPostFromDb = (post?: Partial<PostModel>): PublicPost => {
    return {
        id: post?.id || '',
        slug: post?.slug || '',
        content: post?.content || '',
        author: post?.author || '',
        title: post?.title || '',
        createdAt: post?.createdAt || '',
        coverImageUrl: post?.coverImageUrl || '',
        excerpt: post?.excerpt || '',
        published: post?.published || false,
    }
}

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
    return makePartialPublicPostFromDb(post);
}