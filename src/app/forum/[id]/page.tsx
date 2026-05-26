import Link from "next/link";
import { notFound } from "next/navigation";
import { getForumPostById, incrementViews } from "@/lib/forum-store";
import { getCategoryName } from "@/lib/forum";
import ThreadClient from "./ThreadClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ThreadPage({ params }: PageProps) {
  const { id } = await params;
  await incrementViews(id);
  const post = await getForumPostById(id);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/forum" className="font-sans text-sm text-journal-burgundy hover:underline">
        ← Back to Forum
      </Link>

      <article className="mt-4 border border-journal-parchment bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {post.pinned && (
            <span className="rounded bg-journal-burgundy px-2 py-0.5 font-sans text-xs font-bold uppercase text-white">
              Pinned
            </span>
          )}
          <span className="font-sans text-xs uppercase tracking-wider text-journal-muted">
            {getCategoryName(post.category)}
          </span>
          <span className="font-sans text-xs text-journal-muted">· {post.views} views</span>
        </div>

        <h1 className="mt-3 font-serif text-2xl font-bold text-journal-navy">{post.title}</h1>
        <p className="mt-2 font-sans text-sm text-journal-muted">
          Posted by <strong>{post.author}</strong> · {formatDateTime(post.createdAt)}
        </p>

        <PostContent content={post.content} />

        <section className="mt-8">
          <h2 className="font-serif text-lg font-bold text-journal-navy">
            Replies ({post.replies.length})
          </h2>
          {post.replies.length === 0 ? (
            <p className="mt-4 font-sans text-sm text-journal-muted">
              No replies yet. Be the first to contribute to this scholarly discourse.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {post.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="border-l-2 border-journal-parchment pl-4"
                >
                  <p className="font-sans text-sm">
                    <strong className="text-journal-navy">{reply.author}</strong>
                    <span className="text-journal-muted"> · {formatDateTime(reply.createdAt)}</span>
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-journal-ink whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <ThreadClient postId={post.id} />
      </article>
    </div>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="mt-6 border-t border-journal-parchment pt-6 font-sans text-base leading-relaxed text-journal-ink whitespace-pre-wrap">
      {content}
    </div>
  );
}
