import Link from "next/link";
import { journalInfo } from "@/lib/articles";

export const metadata = {
  title: "Submit a Paper",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">Submission Guidelines</h1>
      <p className="mt-2 font-sans text-sm text-journal-muted">
        How to get your linguistic nonsense into a journal that looks impressively legitimate.
      </p>

      <div className="mt-8 space-y-8 font-sans text-sm leading-relaxed text-journal-ink">
        <section className="rounded border-2 border-journal-burgundy bg-journal-parchment/30 p-6">
          <h2 className="font-serif text-xl font-bold text-journal-navy">How to Submit</h2>
          <p className="mt-3">
            You may submit your paper through either of the following channels:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            <li>
              <strong>Web of Nothing</strong> — submit directly on our{" "}
              <a
                href={journalInfo.webOfNothingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-journal-burgundy hover:underline"
              >
                Web of Nothing journal page
              </a>
            </li>
            <li>
              <strong>Email</strong> — send your submission to{" "}
              <a
                href={`mailto:${journalInfo.submitEmail}`}
                className="text-journal-burgundy hover:underline"
              >
                {journalInfo.submitEmail}
              </a>{" "}
              with the subject line:{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-xs">[SUBMISSION] Your Title Here</code>
            </li>
          </ul>
          <p className="mt-4 text-journal-muted">
            Alternatively, pitch your idea in the{" "}
            <Link href="/forum" className="text-journal-burgundy hover:underline">
              Forum
            </Link>{" "}
            under &quot;Submission Ideas&quot; and gather co-authors first.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-journal-navy">What We Publish</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Humorous and satirical linguistics papers</li>
            <li>Parodies of serious academic writing (syntax trees for memes, etc.)</li>
            <li>Fake field reports, bogus minimal pairs, and corpus studies of Twitter</li>
            <li>Content in the spirit of <em>Annals of Improbable Research</em> or linguistics Twitter</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-journal-navy">What We Don&apos;t Publish</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Actual hate speech or harassment</li>
            <li>Content mocking specific living individuals</li>
            <li>Papers that are just mean without being funny</li>
            <li>Real pseudoscience presented sincerely (we have standards, barely)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-journal-navy">Formatting</h2>
          <p className="mt-3">
            Please format your submission to look as much like a real linguistics paper as possible.
            Include an abstract, keywords, section headings, fake references, and at least one
            unnecessary tree diagram or IPA transcription. LaTeX encouraged; Word tolerated with
            visible disappointment.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-journal-navy">Peer Review Process</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Submission received</li>
            <li>Editor reads it during coffee break</li>
            <li>If funny: accepted within the hour</li>
            <li>If not funny: rejected with a generic &quot;does not meet our standards&quot; email</li>
            <li>Publication scheduled for next issue (or immediately, if we&apos;re bored)</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
