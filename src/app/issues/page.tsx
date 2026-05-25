import Link from "next/link";
import { issues } from "@/lib/articles";

export const metadata = {
  title: "Issues",
};

export default function IssuesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">Journal Issues</h1>
      <p className="mt-2 font-sans text-sm text-journal-muted">
        Complete archive of published volumes. All issues are open access, forever, no paywall, no
        guilt.
      </p>

      <div className="mt-10 space-y-6">
        {issues.map((issue) => (
          <Link
            key={`${issue.volume}-${issue.issue}`}
            href={`/issues/${issue.volume}-${issue.issue}`}
            className="block border border-journal-parchment bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-serif text-xl font-bold text-journal-navy">
                Volume {issue.volume}, Issue {issue.issue}
              </h2>
              <span className="font-sans text-sm text-journal-muted">{issue.published}</span>
            </div>
            <p className="mt-1 font-serif text-base italic text-journal-burgundy">{issue.title}</p>
            <p className="mt-2 font-sans text-sm text-journal-muted">{issue.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
