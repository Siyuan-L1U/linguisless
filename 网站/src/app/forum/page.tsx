import Link from "next/link";
import { getForumPosts } from "@/lib/forum-store";
import {
  allThreadsCategory,
  forumCategories,
  getCategoryName,
  getContentPreview,
  resolveCategoryId,
} from "@/lib/forum";

export const metadata = {
  title: "Forum",
  description: "Discuss linguistics, share hot takes, and pitch paper ideas.",
};

interface ForumPageProps {
  searchParams: Promise<{ category?: string }>;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ForumPage({ searchParams }: ForumPageProps) {
  const { category } = await searchParams;
  let posts = await getForumPosts();

  if (category) {
    posts = posts.filter((p) => resolveCategoryId(p.category) === category);
  }

  posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-journal-navy">Linguisless Forum</h1>
          <p className="mt-2 font-sans text-sm text-journal-muted">
            A place for linguistic discourse, debate, and gently unhinged opinions.
          </p>
        </div>
        <Link
          href="/forum/new"
          className="bg-journal-navy px-5 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-journal-cream hover:bg-journal-burgundy"
        >
          New Thread
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-journal-navy">
            Categories
          </h2>
          <ul className="mt-3 space-y-4">
            <li>
              <Link
                href="/forum"
                className={`block rounded px-2 py-1.5 transition-colors hover:bg-journal-parchment/40 ${!category ? "bg-journal-parchment/50" : ""}`}
              >
                <span
                  className={`block font-sans text-sm ${!category ? "font-medium text-journal-burgundy" : "text-journal-navy"}`}
                >
                  {allThreadsCategory.name}
                </span>
                <span className="mt-0.5 block font-sans text-xs leading-snug text-journal-muted">
                  {allThreadsCategory.description}
                </span>
              </Link>
            </li>
            {forumCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/forum?category=${cat.id}`}
                  className={`block rounded px-2 py-1.5 transition-colors hover:bg-journal-parchment/40 ${category === cat.id ? "bg-journal-parchment/50" : ""}`}
                >
                  <span
                    className={`block font-sans text-sm ${category === cat.id ? "font-medium text-journal-burgundy" : "text-journal-navy"}`}
                  >
                    {cat.name}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs leading-snug text-journal-muted">
                    {cat.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="lg:col-span-3">
          {posts.length === 0 ? (
            <p className="font-sans text-sm text-journal-muted">No threads in this category yet.</p>
          ) : (
            <div className="overflow-hidden border border-journal-parchment bg-white shadow-sm">
              <div className="grid grid-cols-12 gap-2 border-b border-journal-parchment bg-journal-parchment/50 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-journal-muted">
                <div className="col-span-7">Topic</div>
                <div className="col-span-2 text-center">Replies</div>
                <div className="col-span-2 text-center">Views</div>
                <div className="col-span-1 hidden text-right sm:block">Date</div>
              </div>

              {posts.map((post) => {
                const preview = getContentPreview(post.content);

                return (
                <Link
                  key={post.id}
                  href={`/forum/${post.id}`}
                  className="grid grid-cols-12 gap-2 border-b border-journal-parchment px-4 py-4 transition-colors last:border-b-0 hover:bg-journal-parchment/20"
                >
                  <div className="col-span-7">
                    <div className="flex items-center gap-2">
                      {post.pinned && (
                        <span className="rounded bg-journal-burgundy px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase text-white">
                          Pinned
                        </span>
                      )}
                      <span className="font-sans text-[10px] uppercase text-journal-muted">
                        {getCategoryName(post.category)}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-base font-semibold text-journal-navy">
                      {post.title}
                    </p>
                    {preview && (
                      <p className="mt-1 font-sans text-xs leading-relaxed text-journal-muted">
                        {preview}
                      </p>
                    )}
                    <p className="mt-0.5 font-sans text-xs text-journal-muted">by {post.author}</p>
                  </div>
                  <div className="col-span-2 flex items-center justify-center font-sans text-sm text-journal-muted">
                    {post.replies.length}
                  </div>
                  <div className="col-span-2 flex items-center justify-center font-sans text-sm text-journal-muted">
                    {post.views}
                  </div>
                  <div className="col-span-1 hidden items-center justify-end font-sans text-xs text-journal-muted sm:flex">
                    {formatDate(post.createdAt)}
                  </div>
                </Link>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
