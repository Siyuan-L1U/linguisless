import Link from "next/link";
import { journalInfo } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-journal-navy bg-journal-navy text-journal-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold">Linguisless</h3>
            <p className="mt-1 font-serif text-sm text-journal-cream/60">{journalInfo.subtitle}</p>
            <p className="mt-2 font-sans text-sm text-journal-cream/70">{journalInfo.tagline}</p>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider">Indexing</h3>
            <ul className="mt-2 space-y-1 font-sans text-sm text-journal-cream/70">
              <li>
                <a
                  href={journalInfo.webOfNothingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Web of Nothing™
                </a>
              </li>
              <li>Rubbish Citation Index</li>
              <li>NCR Ranking: Unranked</li>
              <li>Impact Factor: {journalInfo.impactFactor}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <p className="mt-2 font-sans text-sm text-journal-cream/70">
              <a href={`mailto:${journalInfo.editorialEmail}`} className="hover:underline">
                {journalInfo.editorialEmail}
              </a>
              <br />
              Published Everywhere
            </p>
          </div>
        </div>
      </div>
      <BottomBar />
    </footer>
  );
}

function BottomBar() {
  return (
    <div className="border-t border-journal-cream/20 py-4 text-center font-sans text-xs text-journal-cream/60">
      © {new Date().getFullYear()} {journalInfo.publisher}. All rights reserved-ish.
      {" · "}
      <Link href="/about" className="underline hover:text-journal-cream">
        About
      </Link>
      {" · "}
      <Link href="/submit" className="underline hover:text-journal-cream">
        Submit
      </Link>
      {" · "}
      <Link href="/forum" className="underline hover:text-journal-cream">
        Forum
      </Link>
    </div>
  );
}
