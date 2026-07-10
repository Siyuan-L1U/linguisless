import Link from "next/link";
import type { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

export default function ArticleCard({ article, compact }: ArticleCardProps) {
  return (
    <article className="border-b border-journal-parchment py-5 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2 font-sans text-xs uppercase tracking-wider text-journal-muted">
        <span className="text-journal-burgundy">{article.category}</span>
        <span>·</span>
        <span>
          Vol. {article.volume}, No. {article.issue} ({article.year})
        </span>
      </div>
      <h3 className={`mt-2 font-serif font-bold text-journal-navy hover:text-journal-burgundy ${compact ? "text-lg" : "text-xl"}`}>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.subtitle && (
        <p className="mt-1 font-serif text-sm italic text-journal-muted">{article.subtitle}</p>
      )}
      <p className="mt-2 font-sans text-sm text-journal-ink">
        {article.authors.map((a) => a.name).join(", ")}
      </p>
      {!compact && (
        <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-journal-muted">
          {article.abstract}
        </p>
      )}
      <Link
        href={`/articles/${article.slug}`}
        className="mt-3 inline-block font-sans text-sm font-medium text-journal-burgundy hover:underline"
      >
        Read full article →
      </Link>
    </article>
  );
}
