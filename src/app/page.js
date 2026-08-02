import Link from "next/link";
import UptimeCounter from "./components/UptimeCounter";
import ProjectCard from "./components/ProjectCard";
import { skillGroups } from "./data/skills";
import { featuredProjects, projects } from "./data/projects";
import { contact } from "./data/contact";

const METRICS = [
  { value: "6+", label: "Years of hands-on engineering" },
  { value: String(projects.length), label: "Portfolio projects shipped or in flight" },
  { value: "0 / 500", label: "Failed requests across chaos-tested rollouts" },
  { value: "7", label: "Compose profiles orchestrated in one stack" },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent mb-8">
            <span className="status-dot" />
            All systems operational
          </div>

          <h1 className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-text">
            Neal Ramjeawan
          </h1>

          <p className="mt-4 font-mono text-lg sm:text-xl text-text-dim">
            Cloud Engineer &middot; DevOps &middot; SRE / Systems Engineer
          </p>

          <p className="mt-6 max-w-2xl text-text-dim leading-relaxed">
            I design, automate, and stress-test infrastructure across cloud and
            hybrid environments &mdash; then prove it holds up. Every project below
            has been built, broken on purpose, and fixed before it went on this page.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={contact.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-4 py-2.5 font-mono text-sm font-medium text-bg hover:opacity-90 transition-opacity"
            >
              Download r&eacute;sum&eacute;
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border-strong px-4 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
            >
              GitHub
            </a>

            <Link
              href="/projects"
              className="rounded-md border border-border-strong px-4 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
            >
              View deployment log &rarr;
            </Link>
          </div>

          <div className="mt-10 max-w-xs">
            <UptimeCounter />
          </div>
        </div>
      </section>

      {/* COMPONENTS / SKILLS */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            Components
          </p>
          <h2 className="font-mono text-2xl font-semibold text-text mb-10">
            Everything currently in service
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {skillGroups.map((group) => (
              <div
                key={group.name}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="status-dot" />
                    <span className="font-mono text-sm text-text">
                      {group.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-accent">
                    Operational
                  </span>
                </div>

                <p className="text-sm text-text-dim leading-relaxed">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPLOYMENT LOG (FEATURED PROJECTS) */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            Deployment log
          </p>

          <h2 className="font-mono text-2xl font-semibold text-text mb-10">
            Recent changes
          </h2>

          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/projects"
              className="font-mono text-sm text-accent hover:underline"
            >
              View the full deployment log &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {METRICS.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-3xl font-bold text-text">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-text-dim">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            Get in touch
          </p>

          <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-text mb-4">
            Open to Cloud, DevOps &amp; SRE roles
          </h2>

          <p className="text-text-dim max-w-xl mx-auto mb-8">
            If you need infrastructure that&apos;s automated, observable, and
            holds up under real failure &mdash; let&apos;s talk.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg hover:opacity-90 transition-opacity"
            >
              Email me
            </a>

            <Link
              href="/contact"
              className="rounded-md border border-border-strong px-5 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
            >
              All contact options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}