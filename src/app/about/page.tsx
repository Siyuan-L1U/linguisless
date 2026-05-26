import { editorialBoard, journalInfo } from "@/lib/articles";

export const metadata = {
  title: "About",
};

const disciplines = [
  "corpus linguistics",
  "computational linguistics",
  "discourse analysis",
  "sociolinguistics",
  "internet linguistics",
  "multimodal communication",
  "AI-mediated interaction",
  "semiotics",
  "digital humanities",
  "and other fields whose boundaries became unstable sometime around 2018",
];

const encouragedSubmissions = [
  "statistically sophisticated analyses of culturally insignificant phenomena",
  "corpus studies based on alarmingly specific datasets",
  "papers containing at least one diagram nobody can fully explain anymore",
  "multimodal analyses involving arrows, circles, and theoretical confidence",
  "NLP papers whose model architecture occupies more pages than the literature review",
  "discourse analyses of platforms that may not exist by the time the article is published",
  "interdisciplinary work likely to cause mild discomfort to at least one reviewer",
];

const acceptedTypes = [
  "empirical studies",
  "theoretical discussions",
  "methodological reflections",
  "pilot studies",
  "negative results",
  "and papers written entirely out of spite toward Reviewer #2",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">About Linguisless</h1>
      <p className="mt-1 font-serif text-lg italic text-journal-muted">
        A Journal of Linguistics, Probably
      </p>

      <div className="mt-8 space-y-6 font-sans text-base leading-relaxed text-journal-ink">
        <p>
          Linguisless is an independent journal dedicated to the study of language in all its forms,
          including spoken, written, multimodal, computational, memetic, algorithmically generated,
          accidentally translated, and emotionally regrettable forms of communication.
        </p>
        <p>
          Founded in {journalInfo.founded}, Linguisless is indexed by the{" "}
          <a
            href={journalInfo.webOfNothingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-journal-burgundy hover:underline"
          >
            Web of Nothing
          </a>{" "}
          and currently maintains an impact factor best described as &ldquo;emergent.&rdquo;
        </p>
        <p>We publish research situated across linguistics and adjacent disciplines, including:</p>
        <ul className="list-disc space-y-1 pl-5">
          {disciplines.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <section className="mt-12">
        <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
          Editorial Board
        </h2>
        <p className="mt-2 font-sans text-sm text-journal-muted">
          Small enough for efficient communication.
          <br />
          Large enough for internal disagreement.
        </p>
        <div className="mt-6 space-y-6">
          {editorialBoard.map((member) => (
            <div key={member.name} className="border-b border-journal-parchment pb-4 last:border-b-0">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-journal-burgundy">
                {member.role}
              </h3>
              <p className="mt-1 font-serif text-lg font-bold text-journal-navy">{member.name}</p>
              <p className="font-sans text-sm text-journal-muted">{member.affiliation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded border border-journal-parchment bg-journal-parchment/30 p-6">
        <h2 className="font-serif text-2xl font-bold text-journal-navy">Aims &amp; Scope</h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-journal-ink">
          Linguisless welcomes submissions exploring language, discourse, communication, annotation
          practices, interpretive overreach, and the increasingly fragile boundary between rigorous
          scholarship and opening twenty-seven ELAN files simultaneously.
        </p>
        <p className="mt-4 font-sans text-sm font-semibold text-journal-navy">
          We particularly encourage:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5 font-sans text-sm text-journal-ink">
          {encouragedSubmissions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 font-sans text-sm leading-relaxed text-journal-ink">
          We accept {acceptedTypes.join(", ")}.
        </p>
        <p className="mt-4 font-sans text-sm font-semibold text-journal-navy">
          Submissions should ideally be:
        </p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 font-sans text-sm text-journal-ink">
          <li>technically sound,</li>
          <li>conceptually ambitious,</li>
          <li>and at least slightly unnecessary.</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
          Open Access Policy
        </h2>
        <div className="mt-4 space-y-4 font-sans text-sm leading-relaxed text-journal-muted">
          <p>
            All articles are published under a Creative Commons Attribution 4.0 license (CC BY 4.0).
          </p>
          <p>
            Readers may read, share, cite, and misinterpret our publications freely.
          </p>
          <p>
            Knowledge should be open access.
            <br />
            Annotation guidelines, unfortunately, remain 47 pages long.
          </p>
        </div>
      </section>
    </div>
  );
}
