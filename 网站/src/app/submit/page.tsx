import Link from "next/link";
import { journalInfo } from "@/lib/articles";

export const metadata = {
  title: "Submit a Paper",
};

const publishList = [
  "satirical or suspiciously sincere linguistics papers;",
  "corpus studies based on datasets nobody should realistically have collected;",
  "multimodal analyses containing excessive arrows and circles;",
  "discourse analyses of internet phenomena that disappeared three weeks ago;",
  "theoretical frameworks built primarily out of academic confidence;",
  "fake field reports;",
  "implausible minimal pairs;",
  "syntax trees applied to memes for reasons that become less clear over time;",
  "papers that begin ironically but accidentally discover something insightful.",
];

const doNotPublishList = [
  "actual hate speech or harassment;",
  "targeted attacks on specific living individuals;",
  "content that is merely cruel without being intellectually interesting;",
  "pseudoscience presented sincerely;",
  "AI output generated without at least minimal human suffering;",
  'papers whose only joke is "linguists are weird." We are aware.',
];

const formattingRequirements = [
  "an abstract,",
  "keywords,",
  "numbered section headings,",
  "citations,",
  "references to at least three authors nobody has fully read,",
  "and at least one figure, tree diagram, or IPA transcription that is technically unnecessary but emotionally important.",
];

const peerReviewSteps = [
  "Submission received",
  "Editorial panic",
  "Paper opened during coffee break",
  "Reviewer assignment determined largely by who is currently online",
  "If funny: accepted surprisingly quickly",
  "If unfunny: rejected using professionally vague language",
  "If incomprehensible but confidently written: sent for theoretical review",
  "Publication scheduled for a future issue, unless we become impatient",
];

const forumAlternatives = [
  "gather feedback,",
  "locate co-authors,",
  "receive validation from strangers online,",
  "or discover that someone in 2014 already published something alarmingly similar.",
];

const ethicalPoints = [
  "citing sources when possible,",
  "fabricating data responsibly,",
  "and limiting theoretical inflation to academically survivable levels.",
];

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">Submission Guidelines</h1>
      <p className="mt-2 font-sans text-sm text-journal-muted">
        How to get your linguistic nonsense published in a journal that appears distressingly
        legitimate.
      </p>

      <div className="mt-8 space-y-10 font-sans text-sm leading-relaxed text-journal-ink">
        <section>
          <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
            What We Publish
          </h2>
          <p className="mt-4">
            Linguisless welcomes submissions including, but not limited to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {publishList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">We are particularly interested in work occupying the unstable space between:</p>
          <blockquote className="mt-2 border-l-4 border-journal-burgundy pl-4 italic text-journal-muted">
            &ldquo;this is genuinely clever&rdquo;
          </blockquote>
          <p className="mt-2 text-center font-medium">and</p>
          <blockquote className="mt-2 border-l-4 border-journal-burgundy pl-4 italic text-journal-muted">
            &ldquo;this should probably not exist.&rdquo;
          </blockquote>
        </section>

        <section>
          <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
            What We Do Not Publish
          </h2>
          <p className="mt-4">We do not publish:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {doNotPublishList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
            Peer Review Process
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            {peerReviewSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-6">Average review time currently ranges from:</p>
          <blockquote className="mt-2 border-l-4 border-journal-burgundy pl-4 italic text-journal-muted">
            &ldquo;remarkably efficient&rdquo;
          </blockquote>
          <p className="mt-2 text-center font-medium">to</p>
          <blockquote className="mt-2 border-l-4 border-journal-burgundy pl-4 italic text-journal-muted">
            &ldquo;we forgot.&rdquo;
          </blockquote>
        </section>

        <section>
          <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
            Ethical Statement
          </h2>
          <p className="mt-4">
            Authors are expected to maintain basic academic integrity, including:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {ethicalPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4">
            If your paper accidentally becomes meaningful, please notify the editors immediately.
          </p>
        </section>

        <section className="rounded border-2 border-journal-burgundy bg-journal-parchment/30 p-6">
          <h2 className="font-serif text-2xl font-bold text-journal-navy">How to Submit</h2>
          <p className="mt-3">
            Authors may submit manuscripts through either of the following channels:
          </p>

          <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-wider text-journal-burgundy">
            Web of Nothing
          </h3>
          <p className="mt-2">
            Submit directly through our official journal page on the{" "}
            <a
              href={journalInfo.webOfNothingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-journal-burgundy hover:underline"
            >
              Web of Nothing
            </a>
            .
          </p>

          <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-wider text-journal-burgundy">
            Email Submission
          </h3>
          <p className="mt-2">Send manuscripts to:</p>
          <p className="mt-1">
            <a
              href={`mailto:${journalInfo.submitEmail}`}
              className="text-journal-burgundy hover:underline"
            >
              {journalInfo.submitEmail}
            </a>
          </p>
          <p className="mt-3">
            Subject line:{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">[SUBMISSION] Your Title Here</code>
          </p>

          <p className="mt-6">
            Alternatively, authors may first post unfinished ideas in the forum section{" "}
            <Link
              href="/forum?category=half-formed-ideas"
              className="text-journal-burgundy hover:underline"
            >
              Half-Formed Research Ideas
            </Link>{" "}
            in order to:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {forumAlternatives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-10 border-t border-journal-burgundy/30 pt-8 font-serif text-2xl font-bold text-journal-navy">
            Formatting Requirements
          </h2>
          <p className="mt-4">
            Please format submissions to resemble a real linguistics paper as closely as possible.
          </p>
          <p className="mt-4">Submissions should ideally include:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {formattingRequirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-journal-navy">LaTeX is strongly encouraged.</p>
          <p className="mt-2">Word documents are accepted with quiet disappointment.</p>
          <p className="mt-2">
            PDFs exported incorrectly from Overleaf will be interpreted as methodological commitment.
          </p>
        </section>
      </div>
    </div>
  );
}
