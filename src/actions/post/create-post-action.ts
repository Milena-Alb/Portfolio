'use server';

import { makePartialPublicPostFromDb, PublicPost } from "@/dto/post/dtos";
import { PostCreateSchema } from "@/lib/post/queries/validation";
import { PostModel } from "@/Models/Post/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type CreatePostActionState = {
    formState: PublicPost;
    errors: string[];
    success?: true;
}
export async function createPostAction(prevState: CreatePostActionState, formData: FormData): Promise<CreatePostActionState> {

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos.'],
        };
    }

    const formDataToObj = Object.fromEntries(formData.entries());
    const zodParseObj = PostCreateSchema.safeParse(formDataToObj);

    if (!zodParseObj.success) {
        const errors = getZodErrorMessages(zodParseObj.error.format());
        return {
            errors,
            formState: makePartialPublicPostFromDb(formDataToObj),
        }
    }

    const validPostData = zodParseObj.data;
    const newPost: PostModel = {
        ...validPostData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidV4(),
        slug: makeSlugFromText(validPostData.title),
    };

    try {
        await postRepository.create(newPost)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                formState: newPost,
                errors: [e.message]
            };
        }
        return {
            formState: newPost,
            errors: ['Error desconhecido.']
        };
    }

    revalidateTag('posts', 'default');
    redirect(`/admin/post/${newPost.id}`);

    // return {
    //     formState: newPost,
    //     errors: [],
    // }; 
}