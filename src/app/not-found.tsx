import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-sans text-sm uppercase tracking-widest text-journal-burgundy">404</p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-journal-navy">Page Not Found</h1>
      <p className="mt-4 font-sans text-sm text-journal-muted">
        This page may have been retracted, never existed, or was lost during peer review.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-journal-navy px-6 py-2.5 font-sans text-sm font-medium text-journal-cream hover:bg-journal-burgundy"
      >
        Return to Journal Home
      </Link>
    </div>
  );
}
