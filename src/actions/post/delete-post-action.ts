'use server';

import { drizzleDb } from "@/db/drizzle";
import { postTable } from "@/db/drizzle/schemas";
import { postRepository } from "@/repositories/post";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
    if (!id || typeof id !== 'string') {
        return {
            error: 'Dados inválidos.',
        };
    }

    let post;

    try {
        post = await postRepository.delete(id)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {
                errors: [e.message]
            };
        }
        return {
            errors: ['Error desconhecido.']
        };
    }

    await drizzleDb.delete(postTable).where(eq(postTable.id, id));
    revalidateTag('posts', 'default');
    revalidateTag(`post-${post.slug}`, 'default')
    return {
        error: ''
    };
}
