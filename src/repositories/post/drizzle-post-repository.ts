import { PostModel } from '@/Models/Post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { asyncDelay } from '@/utils/async-delay';
import { SIMULATE_WAIT_IN_MS } from '@/lib/constants';
import { eq } from 'drizzle-orm';
import { postTable } from '@/db/drizzle/schemas';

export class DrizzlePostRepository implements PostRepository {
    async findAllPublic(): Promise<PostModel[]> {
        await asyncDelay(SIMULATE_WAIT_IN_MS, true);
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
            where: (posts, { eq }) => eq(posts.published, true),
        });

        return posts;
    }

    async findBySlugPublic(slug: string): Promise<PostModel> {
        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug)),
        });

        if (!post) throw new Error('Post não encontrado para este slug.');

        return post;
    }

    async findAll(): Promise<PostModel[]> {
        const posts = await drizzleDb.query.posts.findMany({
            orderBy: (posts, { desc }) => desc(posts.createdAt),
        });

        return posts;
    }

    async findById(id: string): Promise<PostModel> {
        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        });

        if (!post) throw new Error('Post não encontrado para este Id.');

        return post;
    }

    async create(post: PostModel): Promise<PostModel> {
        const postExists = await drizzleDb.query.posts.findFirst({
            where: (posts, { or, eq }) =>
                or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
            columns: { id: true },
        });

        if (!!postExists) {
            throw new Error('Post com ID ou Slug já existe na base de dados');
        }

        await drizzleDb.insert(postTable).values(post);
        return post;
    }

    async delete(id: string): Promise<PostModel> {
        const post = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        });

        if (!post) {
            throw new Error('Post não existe');
        }

        await drizzleDb.delete(postTable).where(eq(postTable.id, id));

        return post;
    }

    async update(
        id: string,
        newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
    ): Promise<PostModel> {
        const oldPost = await drizzleDb.query.posts.findFirst({
            where: (posts, { eq }) => eq(posts.id, id),
        });

        if (!oldPost) {
            throw new Error('Post não existe');
        }

        const updatedAt = new Date().toISOString();
        const postData = {
            author: newPostData.author,
            content: newPostData.content,
            coverImageUrl: newPostData.coverImageUrl,
            excerpt: newPostData.excerpt,
            published: newPostData.published,
            title: newPostData.title,
            updatedAt,
        };
        await drizzleDb
            .update(postTable)
            .set(postData)
            .where(eq(postTable.id, id));

        return {
            ...oldPost,
            ...postData,
        };
    }
}

// (async () => {
//     const repo = new DrizzlePostRepository();
//     const posts = await repo.findAllPublic();

//     posts.forEach(post => console.log(post.slug, post.published));
// })();