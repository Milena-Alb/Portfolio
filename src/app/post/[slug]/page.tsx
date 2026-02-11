import { SinglePost } from "@/Components/SinglePost";
import { SpinLoader } from "@/Components/SpinLoader";
import { findPublicPostSlugCached } from "@/lib/post/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-static';

type PostSlugPageProps = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostSlugPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await findPublicPostSlugCached(slug).catch(() => undefined);

    return {
        title: post?.title,
        description: post?.excerpt
    };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
    const { slug } = await params;

    return (
        <Suspense fallback={<SpinLoader containerClasses="min-h-20 mb-16" />} >
            <SinglePost slug={slug} />
        </Suspense>
    );
}