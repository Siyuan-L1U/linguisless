import Link from "next/link";
import { editorialBoard, journalInfo } from "@/lib/articles";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">About {journalInfo.name}</h1>
      <p className="mt-1 font-serif text-lg text-journal-muted">{journalInfo.chineseName}</p>

      <div className="mt-8 space-y-6 font-sans text-base leading-relaxed text-journal-ink">
        <p>{journalInfo.description}</p>
        <p>
          Founded in {journalInfo.founded}, <em>Linguisless</em> is indexed on{" "}
          <a
            href={journalInfo.webOfNothingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-journal-burgundy hover:underline"
          >
            Web of Nothing
          </a>
          . Our current impact factor is {journalInfo.impactFactor}. NCR Ranking: Unranked.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
          Editorial Board
        </h2>
        <p className="mt-2 font-sans text-sm text-journal-muted">Just two of us.</p>
        <div className="mt-6 space-y-4">
          {editorialBoard.map((member) => (
            <div key={member.name} className="border-b border-journal-parchment pb-4 last:border-b-0">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-journal-burgundy">
                {member.role}
              </p>
              <p className="mt-1 font-serif text-lg font-bold text-journal-navy">{member.name}</p>
              <p className="font-sans text-sm text-journal-muted">{member.affiliation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded border border-journal-parchment bg-journal-parchment/30 p-6">
        <h2 className="font-serif text-xl font-bold text-journal-navy">Aims & Scope</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm text-journal-ink">
          <li>Satirical and humorous linguistics papers</li>
          <li>Parodies of academic writing and peer review culture</li>
          <li>Deliberately bad but entertaining linguistic &quot;analysis&quot;</li>
          <li>Internet linguistics, meme grammar, and discourse analysis of group chats</li>
          <li>Anything that would make a prescriptivist cry (harmlessly)</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="border-b border-journal-navy pb-2 font-serif text-2xl font-bold text-journal-navy">
          Open Access Policy
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-journal-muted">
          All articles are published under a Creative Commons Attribution 4.0 license (CC BY 4.0).
          Readers may read, share, and cite our nonsense freely. Published Everywhere.
        </p>
      </section>
    </div>
  );
}
