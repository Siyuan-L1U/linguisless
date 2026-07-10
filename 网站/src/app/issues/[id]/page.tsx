import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByIssue, issues } from "@/lib/articles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return issues.map((i) => ({ id: `${i.volume}-${i.issue}` }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const [vol, iss] = id.split("-").map(Number);
  const issue = issues.find((i) => i.volume === vol && i.issue === iss);
  if (!issue) return { title: "Issue Not Found" };
  return {
    title: `Vol. ${issue.volume}, No. ${issue.issue}: ${issue.title}`,
  };
}

export default async function IssuePage({ params }: PageProps) {
  const { id } = await params;
  const [vol, iss] = id.split("-").map(Number);
  const issue = issues.find((i) => i.volume === vol && i.issue === iss);
  if (!issue) notFound();

  const issueArticles = getArticlesByIssue(vol, iss);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/issues" className="font-sans text-sm text-journal-burgundy hover:underline">
        ← All issues
      </Link>

      {issue.coverImage && (
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-sm overflow-hidden border border-journal-parchment bg-white shadow-lg">
            <Image
              src={issue.coverImage}
              alt={`Linguisless Vol. ${issue.volume}, Issue ${issue.issue} cover`}
              width={800}
              height={1000}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      )}

      <header className="mt-6 border-b-2 border-journal-navy pb-6">
        <p className="font-sans text-sm uppercase tracking-wider text-journal-muted">
          Volume {issue.volume} · Issue {issue.issue} · {issue.year}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-journal-navy">{issue.title}</h1>
        <p className="mt-3 font-sans text-base text-journal-muted">{issue.description}</p>
        <p className="mt-2 font-sans text-sm text-journal-muted">Published: {issue.published}</p>
      </header>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-bold text-journal-navy">
          Table of Contents ({issueArticles.length} articles)
        </h2>
        {issueArticles.length === 0 ? (
          <p className="mt-4 font-sans text-sm text-journal-muted">
            This issue is forthcoming. Submit your nonsense today.
          </p>
        ) : (
          <div className="mt-4">
            {issueArticles.map((article) => (
              <ArticleCard key={article.id} article={article} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
