import Link from "next/link";
import Image from "next/image";
import { articles, issues, journalInfo } from "@/lib/articles";

export default function HomePage() {
  const latestIssue = issues[0];

  return (
    <div>
      <section className="border-b border-journal-parchment bg-journal-parchment/40">
        <HeroSection latestIssue={latestIssue} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="border-b-2 border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
              Featured Articles
            </h2>
            <p className="mt-6 font-sans text-sm text-journal-muted">
              No papers published yet.
            </p>
          </div>
          <HomeSidebar />
        </div>
      </section>
    </div>
  );
}

function HeroSection({ latestIssue }: { latestIssue: (typeof issues)[number] }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-journal-burgundy">
            Current Issue · Vol. {latestIssue.volume}, No. {latestIssue.issue} · {latestIssue.published}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-journal-navy md:text-4xl">
            {latestIssue.title}
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-journal-muted">
            {latestIssue.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={`/issues/${latestIssue.volume}-${latestIssue.issue}`}
              className="inline-block bg-journal-navy px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-journal-cream transition-colors hover:bg-journal-burgundy"
            >
              View Issue
            </Link>
            <Link
              href="/submit"
              className="inline-block border-2 border-journal-navy px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-journal-navy transition-colors hover:bg-journal-navy hover:text-journal-cream"
            >
              Submit a Paper
            </Link>
          </div>
        </div>

        {latestIssue.coverImage && (
          <div className="mx-auto w-full max-w-md">
            <Link href={`/issues/${latestIssue.volume}-${latestIssue.issue}`}>
              <div className="overflow-hidden border border-journal-parchment bg-white shadow-lg transition-shadow hover:shadow-xl">
                <Image
                  src={latestIssue.coverImage}
                  alt={`Linguisless Vol. ${latestIssue.volume}, Issue ${latestIssue.issue} cover`}
                  width={800}
                  height={1000}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <p className="mt-2 text-center font-sans text-xs uppercase tracking-wider text-journal-muted">
                Vol. {latestIssue.volume}, Issue {latestIssue.issue} · {latestIssue.published}
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
function HomeSidebar() {
  return (
    <aside className="space-y-8">
      <div className="border border-journal-parchment bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-journal-navy">About the Journal</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-journal-muted">
          {journalInfo.description}
        </p>
        <Link
          href="/about"
          className="mt-4 inline-block font-sans text-sm font-medium text-journal-burgundy hover:underline"
        >
          Learn more →
        </Link>
      </div>

      <div className="border border-journal-parchment bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-journal-navy">Submit</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-journal-muted">
          Submit via{" "}
          <a
            href={journalInfo.webOfNothingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-journal-burgundy hover:underline"
          >
            Web of Nothing
          </a>{" "}
          or email{" "}
          <a href={`mailto:${journalInfo.submitEmail}`} className="text-journal-burgundy hover:underline">
            {journalInfo.submitEmail}
          </a>
        </p>
      </div>

      <div className="border border-journal-parchment bg-white p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-journal-navy">Forum</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-journal-muted">
          Join the discussion. Share hot takes on syntax, phonology, or why your corpus is just tweets.
        </p>
        <Link
          href="/forum"
          className="mt-4 inline-block bg-journal-burgundy px-4 py-2 font-sans text-sm font-medium text-white hover:bg-journal-navy"
        >
          Enter the Forum
        </Link>
      </div>

      <div className="border border-journal-parchment bg-journal-navy p-6 text-journal-cream">
        <h3 className="font-serif text-lg font-bold">Journal Metrics</h3>
        <dl className="mt-4 space-y-2 font-sans text-sm">
          <MetricRow label="Impact Factor" value={journalInfo.impactFactor} />
          <MetricRow label="NCR Ranking" value="Unranked" />
          <MetricRow label="WaterJournals" value="0" />
          <MetricRow label="Articles Published" value={String(articles.length)} />
        </dl>
      </div>
    </aside>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-journal-cream/70">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
