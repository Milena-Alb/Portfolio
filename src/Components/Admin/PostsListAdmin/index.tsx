import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';
import ErrorMessages from '../../ErrorMessages';
import styles from './style.module.css';

export default async function PostsListAdmin() {
    const posts = await findAllPostsAdmin()

    if (posts.length <= 0)
        return (
            <ErrorMessages contentTitle='Ei 😅' content='Bora criar algum post??' />
        );

    return (
        <div className="mb-16">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className={clsx(
                        styles.adminPostRow,
                        !post.published && styles.draft
                    )}
                >
                    <div className={styles.adminPostTitle}>
                        <Link href={`/admin/post/${post.id}`}>
                            {post.title}
                        </Link>

                        {!post.published && (
                            <span className={styles.adminPostDraft}>
                                (Não publicado)
                            </span>
                        )}
                    </div>
                    <DeletePostButton id={post.id} title={post.title} />
                </div>
            ))}
            {/* <Dialog /> */}
        </div>
    )
}
