import Link from "next/link";
import { journalInfo } from "@/lib/articles";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/issues", label: "Issues" },
  { href: "/articles", label: "Articles" },
  { href: "/submit", label: "Submit" },
  { href: "/forum", label: "Forum" },
];

export default function Header() {
  return (
    <header className="border-b-2 border-journal-navy bg-journal-cream">
      <TopBar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="text-center">
          <Link href="/" className="group inline-block">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-journal-navy md:text-5xl">
              LINGUIS<span className="text-journal-burgundy">LESS</span>
            </h1>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-journal-muted">
              {journalInfo.subtitle}
            </p>
          </Link>
        </div>
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-1 border-t border-journal-parchment pt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 font-sans text-sm font-medium uppercase tracking-wider text-journal-navy transition-colors hover:bg-journal-navy hover:text-journal-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function TopBar() {
  return (
    <div className="bg-journal-navy py-1.5 text-center font-sans text-xs text-journal-cream/80">
      NSSN {journalInfo.nssn} (Online) ·{" "}
      <a
        href={journalInfo.webOfNothingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-journal-cream"
      >
        Web of Nothing
      </a>
      {" · "}
      Open Access · Peer-Reviewed-ish
    </div>
  );
}
