import Link from "next/link";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24 sm:py-32 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-text-faint mb-8">
        <span className="inline-block h-2 w-2 rounded-full bg-text-faint" />
        404 &middot; Not Found
      </div>

      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-text mb-4">
        This route isn&apos;t deployed
      </h1>

      <p className="text-text-dim leading-relaxed mb-10">
        Whatever you were looking for doesn&apos;t exist at this address &mdash;
        moved, renamed, or never shipped. Everything that&apos;s actually live is
        linked from the pages below.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-accent-warm px-5 py-2.5 font-mono text-sm font-medium text-bg hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
        <Link
          href="/projects"
          className="rounded-md border border-border-strong px-5 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
        >
          View deployment log
        </Link>
      </div>
    </main>
  );
}