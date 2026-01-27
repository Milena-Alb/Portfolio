import { formateDatetime, formatRelativeDate } from "@/utils/format-datetime";
import { PostHeading } from "../PostHeading";
import { PostModel } from "@/Models/Post/post-model";
import { PostDate } from "../PostDate";

type PostSummaryProps = {
    postHeading: 'h1' | 'h2';
    postLink: string; 
    createdAt: string;
    title: string;
    excerpt: string;
}

export async function PostSummary({postHeading, postLink, createdAt, title, excerpt}: PostSummaryProps) {
    return (
        <div className="flex flex-col gap-2 sm:justify-center">
            <PostDate dateTime={createdAt}/>

            <PostHeading url={postLink} as={postHeading}>
                {title}
            </PostHeading>
            <p>
                {excerpt}

            </p>

        </div>
    )
}