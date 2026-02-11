'use server';

import { makePartialPublicPostFromDb, makePublicPostFromDb, PublicPost } from "@/dto/post/dtos";
import { PostUpdateSchema } from "@/lib/post/queries/validation";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";

type UpdatePostActionState = {
    formState: PublicPost;
    errors: string[];
    success?: true;
};

export async function updatePostAction(prevState: UpdatePostActionState, formData: FormData): Promise<UpdatePostActionState> {

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ['Dados inválidos.'],
        };
    }

    const id = formData.get('id')?.toString() || '';
    if (!id || typeof id !== 'string') {
        return {
            formState: prevState.formState,
            errors: ['ID inválido'],
        };
    }

    const formDataToObj = Object.fromEntries(formData.entries());
    const zodParseObj = PostUpdateSchema.safeParse(formDataToObj);

    if (!zodParseObj.success) {
        const errors = getZodErrorMessages(zodParseObj.error.format());
        return {
            errors,
            formState: makePartialPublicPostFromDb(formDataToObj),
        }
    }

    const validPostData = zodParseObj.data;
    const newPost = {
        ...validPostData,
    };

    let post;
    try {
        post = await postRepository.update(id, newPost)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                formState: makePartialPublicPostFromDb(formDataToObj),
                errors: [e.message]
            };
        }
        return {
            formState: makePartialPublicPostFromDb(formDataToObj),
            errors: ['Error desconhecido.']
        };
    }

    revalidateTag('posts', 'default');
    revalidateTag(`post-${post.slug}`, 'default');

    return {
        formState: makePublicPostFromDb(post),
        errors: [],
        success: true,
    };
}