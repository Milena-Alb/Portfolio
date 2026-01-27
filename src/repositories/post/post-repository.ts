import { PostModel } from "@/Models/Post/post-model";

export interface PostRepository {
    findAllPublic(): Promise<PostModel[]>; //vai retornar um array de Post
    findById(id: string): Promise<PostModel>; 
    findBySlug(slug: string): Promise<PostModel>; 


}