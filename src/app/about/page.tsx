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
        <p className="mt-4 font-sans text-sm leading-relaxed text-journal-ink">
          Linguisless welcomes submissions exploring language, discourse, semiotics, communication,
          and the increasingly fragile boundary between rigorous scholarship and interpretive
          overreach.
        </p>
        <p className="mt-4 font-sans text-sm font-semibold text-journal-navy">We publish:</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 font-sans text-sm text-journal-ink">
          <li>Satirical and humorously overstated linguistics papers</li>
          <li>Parodies of academic writing, peer review, and theoretical inflation</li>
          <li>Deliberately questionable yet methodologically sophisticated analyses</li>
          <li>
            Research on internet linguistics, meme grammar, fandom discourse, and group chat
            pragmatics
          </li>
          <li>Interdisciplinary work likely to cause mild discomfort to prescriptivists</li>
        </ul>
        <p className="mt-4 font-sans text-sm leading-relaxed text-journal-ink">
          We particularly encourage submissions that are simultaneously insightful, unnecessary,
          and impossible to reviewer-proof.
        </p>
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
