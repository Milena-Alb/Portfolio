'use server';

import { revalidateTag } from "next/cache";

export async function revalidateExampleAction(formData: FormData) {
    const path = formData.get('path') || '';

    revalidateTag('posts', 'default')
    revalidateTag('post-123', 'default')

}