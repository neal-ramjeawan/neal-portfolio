import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-faint">
        <div className="flex items-center gap-2">
          <span className="status-dot" />
          <span>All systems operational</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/projects" className="hover:text-text-dim transition-colors">
            projects
          </Link>
          <Link href="/about" className="hover:text-text-dim transition-colors">
            about
          </Link>
          <Link href="/contact" className="hover:text-text-dim transition-colors">
            contact
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Neal Ramjeawan</p>
      </div>
    </footer>
  );
}