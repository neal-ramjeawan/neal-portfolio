import Link from "next/link";
import { skillGroups } from "../data/skills";
import { skillIcons } from "../components/icons";

export const metadata = {
  title: "About",
  description:
    "Cloud, DevOps, and SRE engineer focused on infrastructure that's automated, observable, and tested against real failure.",
};

const PRINCIPLES = [
  {
    title: "Prove it, don't just build it",
    body: "If a project claims high availability, something in it gets killed on purpose \u2014 a pod, a node, a mid-rollout deploy \u2014 before I call it done.",
  },
  {
    title: "Document the real bugs",
    body: "The interesting part is never the finished diagram. Write-ups cover what actually broke and how it got fixed, not just the end state.",
  },
  {
    title: "Automate the boring path",
    body: "Manual steps are where mistakes and inconsistency creep in \u2014 provisioning, resets, and deploys are built to run themselves.",
  },
];

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
        About
      </p>
      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-text mb-8">
        Neal Ramjeawan
      </h1>

      <div className="space-y-5 text-text-dim leading-relaxed">
        <p>
          I&apos;m a cloud and platform engineer focused on building infrastructure
          that stays up under real conditions &mdash; not just on the happy path.
          Most of what&apos;s on this site is self-directed: labs and platforms I
          built specifically to prove out skills in cloud infrastructure, DevOps
          practice, and site reliability engineering.
        </p>
        <p>
          My main focus areas are AWS and Azure, Kubernetes and container
          orchestration, identity and access management, infrastructure as code,
          and the CI/CD and observability tooling that makes all of it operable
          rather than just deployable.
        </p>
      </div>

      <div className="mt-14">
        <h2 className="font-mono text-xl font-semibold text-text mb-6">How I work</h2>
        <div className="space-y-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="card-hover rounded-lg border border-border bg-surface p-5">
              <h3 className="font-mono text-sm text-accent-warm mb-2">{p.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-mono text-xl font-semibold text-text mb-6">Focus areas</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {skillGroups.map((group) => {
            const Icon = skillIcons[group.name];
            return (
              <div key={group.name} className="card-hover rounded-lg border border-border bg-surface p-4">
                <div className="flex items-center gap-2 mb-1">
                  {Icon && <Icon className="w-4 h-4 text-accent-warm" />}
                  <p className="font-mono text-sm text-text">{group.name}</p>
                </div>
                <p className="text-xs text-text-dim">{group.items.join(" \u00b7 ")}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-md bg-accent-warm px-4 py-2.5 font-mono text-sm font-medium text-bg hover:opacity-90 transition-opacity"
        >
          View the deployment log
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-border-strong px-4 py-2.5 font-mono text-sm text-text hover:bg-surface transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </main>
  );
}