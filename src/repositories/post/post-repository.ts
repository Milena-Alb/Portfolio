import { PostModel } from "@/Models/Post/post-model";

export interface PostRepository {
    findAllPublic(): Promise<PostModel[]>; //vai retornar um array de Post
    findById(id: string): Promise<PostModel>;
    findBySlugPublic(slug: string): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;
    create(post: PostModel): Promise<PostModel>;
    delete(id: string): Promise<PostModel>;
    update(
        id: string,
        newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
    ): Promise<PostModel>;
}