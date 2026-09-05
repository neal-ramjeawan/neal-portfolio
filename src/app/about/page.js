import Link from "next/link";
import Image from "next/image";
import { skillGroups } from "../data/skills";
import { experience } from "../data/experience";
import ExperienceCard from "../components/ExperienceCard";
import StaggerReveal from "../components/StaggerReveal";

export const metadata = {
  title: "About",
  description:
    "Cloud Platform / DevOps engineer focused on infrastructure that's automated, observable, and tested against real failure.",
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
    <main className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-14 lg:gap-24 items-start">
        <div>
          <p className="eyebrow mb-4">
            About
          </p>
          <h1 className="display-face text-5xl sm:text-7xl font-bold text-text mb-8">
            Neal Ramjeawan
          </h1>

          <div className="space-y-5 text-text-dim leading-relaxed max-w-2xl">
            <p>
              I&apos;m a Cloud and Platform Engineer focused on building infrastructure
              that stays up under real conditions - not just on the happy path.
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
        </div>

        <div className="flex justify-center lg:pt-10">
          <Image
            src="/portrait.png"
            alt="Neal Ramjeawan"
            width={520}
            height={520}
            className="portrait-image w-full max-w-[20rem]"
          />
        </div>
      </div>

      <div id="experience" className="mt-14 scroll-mt-24">
        <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-6">Experience</h2>
        <StaggerReveal className="space-y-6" stagger={80}>
          {experience.map((role) => (
            <ExperienceCard key={role.company} role={role} />
          ))}
        </StaggerReveal>
      </div>

      <div className="mt-14">
        <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-6">How I work</h2>
        <StaggerReveal className="space-y-4" stagger={80}>
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="border-t border-border bg-transparent py-6 sm:py-8"
            >
              <h3 className="font-mono text-sm text-accent-warm mb-2">{p.title}</h3>
              <p className="text-sm text-text-dim leading-relaxed">{p.body}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>

      <div className="mt-14">
        <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-6">Focus areas</h2>
        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6" stagger={60}>
          {skillGroups.map((group) => {
            return (
              <div
                key={group.name}
                className="skill-item"
              >
                <div className="mb-4">
                  <span className="font-mono text-xs text-accent-dim">{String(skillGroups.indexOf(group) + 1).padStart(2, "0")}</span>
                  <p className="display-face text-xl font-bold text-text leading-none mt-2">{group.name}</p>
                </div>
                <p className="text-sm text-text-dim leading-relaxed">{group.items.join(" \u00b7 ")}</p>
              </div>
            );
          })}
        </StaggerReveal>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-md bg-accent-warm px-4 py-2.5 font-mono text-sm font-medium text-text hover:opacity-90 transition-opacity"
        >
          View the Project Log
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