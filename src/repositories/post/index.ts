import { JsonPostRespository } from "./json-post-repository";
import { PostRepository } from "./post-repository";

export const postRepository: PostRepository = new JsonPostRespository();