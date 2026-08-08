import Link from "next/link";
import UptimeCounter from "./components/UptimeCounter";
import ProjectCard from "./components/ProjectCard";
import NetworkGraphic from "./components/NetworkGraphic";
import Reveal from "./components/Reveal";
import CountUp from "./components/CountUp";
import { DownloadIcon, CodeIcon, MailIcon, skillIcons } from "./components/icons";
import { skillGroups } from "./data/skills";
import { featuredProjects, projects } from "./data/projects";
import { contact } from "./data/contact";

const METRICS = [
  { to: 6, suffix: "+", label: "Years of hands-on engineering" },
  { to: projects.length, suffix: "", label: "Portfolio projects shipped or in flight" },
  { to: 500, prefix: "0 / ", label: "Failed requests across chaos-tested rollouts" },
  { to: 7, suffix: "", label: "Compose profiles orchestrated in one stack" },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <NetworkGraphic
          className="animate-fade-in [animation-delay:0.3s] pointer-events-none absolute opacity-25 sm:opacity-35 lg:opacity-100 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[520px] lg:h-[520px] bottom-[-70px] right-[-70px] lg:bottom-auto lg:top-1/2 lg:right-[-40px] lg:-translate-y-1/2"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <h1 className="animate-fade-up font-mono text-4xl sm:text-6xl font-bold tracking-tight text-text">
            Neal Ramjeawan
          </h1>

          <p className="animate-fade-up [animation-delay:0.08s] mt-4 font-mono text-lg sm:text-xl text-text-dim">
            Cloud Engineer &middot; DevOps &middot; SRE / Systems Engineer
          </p>

          <p className="animate-fade-up [animation-delay:0.16s] mt-6 max-w-2xl text-text-dim leading-relaxed">
            I design, automate, and stress-test infrastructure across cloud and
            hybrid environments &mdash; then prove it holds up. Every project below
            has been built, broken on purpose, and fixed before it went on this page.
          </p>

          <div className="animate-fade-up [animation-delay:0.24s] mt-9 flex flex-wrap gap-3">
          <a
              href={contact.resumeHref}
              className="inline-flex items-center gap-2 rounded-md bg-accent-warm px-4 py-2.5 font-mono text-sm font-medium text-bg hover:opacity-90 transition-opacity"
            >
              <DownloadIcon className="w-4 h-4" />
              Download r&eacute;sum&eacute;
            </a>
            <a
              href={contact.github}
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
            >
              <CodeIcon className="w-4 h-4" />
              GitHub
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
            >
              View deployment log &rarr;
            </Link>
          </div>

          <div className="animate-fade-up [animation-delay:0.32s] mt-10 max-w-xs">
            <UptimeCounter />
          </div>
        </div>
        <div className="section-divider" />
      </section>

      {/* COMPONENTS / SKILLS */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            Components
          </p>
          <h2 className="font-mono text-2xl font-semibold text-text mb-10">
            Everything currently in service
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.name];
              return (
                <div
                  key={group.name}
                  className="card-hover rounded-lg border border-accent-warm/25 bg-surface p-5 shadow-[0_0_40px_-20px_rgba(242,184,75,0.35)]"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4 text-accent-warm" />}
                      <span className="status-dot" />
                      <span className="font-mono text-sm text-text">{group.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-accent-warm">Operational</span>
                  </div>
                  <p className="text-sm text-text-dim leading-relaxed">
                    {group.items.join(" \u00b7 ")}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
        <div className="section-divider" />
      </section>

      {/* DEPLOYMENT LOG (FEATURED PROJECTS) */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
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
              className="font-mono text-sm text-accent-warm hover:underline"
            >
              View the full deployment log &rarr;
            </Link>
          </div>
        </Reveal>
        <div className="section-divider" />
      </section>

      {/* METRICS */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {METRICS.map((m) => (
              <div key={m.label}>
                <p className="font-mono text-3xl font-bold text-text">
                  <CountUp to={m.to} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="mt-1 text-sm text-text-dim">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="section-divider" />
      </section>

      {/* CONTACT CTA */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
            Get in touch
          </p>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-text mb-4">
            Open to Cloud, DevOps &amp; SRE roles
          </h2>
          <p className="text-text-dim max-w-xl mx-auto mb-8">
            If you need infrastructure that&apos;s automated, observable, and holds up
            under real failure &mdash; let&apos;s talk.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent-warm px-5 py-2.5 font-mono text-sm font-medium text-bg hover:opacity-90 transition-opacity"
            >
              <MailIcon className="w-4 h-4" />
              Email me
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-border-strong px-5 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
            >
              All contact options
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}