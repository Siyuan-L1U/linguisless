import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { articles, issues } from "@/lib/articles";

export const metadata = {
  title: "All Articles",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">All Articles</h1>
      <p className="mt-2 font-sans text-sm text-journal-muted">
        Browse the complete archive of peer-reviewed-ish linguistic inquiry.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {issues.map((issue) => (
          <Link
            key={`${issue.volume}-${issue.issue}`}
            href={`/issues/${issue.volume}-${issue.issue}`}
            className="rounded border border-journal-parchment bg-white px-3 py-1 font-sans text-xs text-journal-navy hover:border-journal-navy"
          >
            Vol. {issue.volume}, No. {issue.issue}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        {articles.length === 0 ? (
          <p className="font-sans text-sm text-journal-muted">No papers published yet.</p>
        ) : (
          articles.map((article) => <ArticleCard key={article.id} article={article} />)
        )}
      </div>
    </div>
  );
}