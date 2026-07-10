import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/ArticleContent";
import { articles, getArticleBySlug } from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.abstract,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="border-b-2 border-journal-navy pb-8">
        <div className="font-sans text-xs uppercase tracking-wider text-journal-muted">
          <span className="text-journal-burgundy">{article.category}</span>
          {" · "}
          Vol. {article.volume}, No. {article.issue} ({article.year})
          {" · "}
          pp. {article.pages}
        </div>

        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-journal-navy md:text-4xl">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="mt-3 font-serif text-lg italic text-journal-muted">{article.subtitle}</p>
        )}

        <div className="mt-6 space-y-2">
          {article.authors.map((author, i) => (
            <div key={i} className="font-sans text-sm">
              <span className="font-semibold text-journal-navy">{author.name}</span>
              <span className="text-journal-muted"> — {author.affiliation}</span>
              {author.email && (
                <span className="text-journal-muted">
                  {" "}
                  ·{" "}
                  <a href={`mailto:${author.email}`} className="text-journal-burgundy hover:underline">
                    {author.email}
                  </a>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded border border-journal-parchment bg-journal-parchment/30 p-6">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-journal-navy">
            Abstract
          </h2>
          <p className="mt-3 font-serif text-sm leading-relaxed text-journal-ink">{article.abstract}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {article.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded bg-journal-navy/10 px-2 py-0.5 font-sans text-xs text-journal-navy"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 font-sans text-xs text-journal-muted md:grid-cols-4">
          <div>
            <dt className="font-semibold uppercase">DOI</dt>
            <dd className="mt-0.5">
              <a
                href={`https://doi.org/${article.doi}`}
                className="text-journal-burgundy hover:underline"
              >
                {article.doi}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase">Received</dt>
            <dd className="mt-0.5">{article.received}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase">Accepted</dt>
            <dd className="mt-0.5">{article.accepted}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase">Published</dt>
            <dd className="mt-0.5">{article.published}</dd>
          </div>
        </dl>
      </header>

      <div className="mt-10">
        <ArticleContent content={article.content} />
      </div>

      <footer className="mt-12 border-t border-journal-parchment pt-8">
        <p className="font-sans text-sm text-journal-muted">
          Cite as: {article.authors.map((a) => a.name).join(", ")} ({article.year}). &quot;{article.title}.&quot;{" "}
          <em>Linguisless</em> {article.volume}({article.issue}): {article.pages}.{" "}
          <a href={`https://doi.org/${article.doi}`} className="text-journal-burgundy hover:underline">
            https://doi.org/{article.doi}
          </a>
        </p>
        <Link
          href="/articles"
          className="mt-4 inline-block font-sans text-sm font-medium text-journal-burgundy hover:underline"
        >
          ← Back to all articles
        </Link>
      </footer>
    </article>
  );
}