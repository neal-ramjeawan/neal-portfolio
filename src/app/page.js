import Link from "next/link";
import Image from "next/image";
import UptimeCounter from "./components/UptimeCounter";
import ProjectCard from "./components/ProjectCard";
import Reveal from "./components/Reveal";
import StaggerReveal from "./components/StaggerReveal";
import TypewriterRoles from "./components/TypewriterRoles";
import ExperienceCarousel from "./components/ExperienceCarousel";
import { skillGroups } from "./data/skills";
import { featuredProjects } from "./data/projects";
import { experience } from "./data/experience";
import { contact } from "./data/contact";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-36">
          <div className="grid lg:grid-cols-[1fr_18rem] gap-12 items-end">
            <div>
              <p className="animate-fade-up eyebrow mb-5">Cloud platform / DevOps / SRE</p>
              <h1 className="animate-fade-up display-face max-w-5xl text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.98] text-text">
                I build infrastructure that holds up.
              </h1>
              <p className="animate-fade-up [animation-delay:0.08s] mt-7 font-mono text-sm sm:text-base text-accent-dim">
                <TypewriterRoles />
              </p>
              <p className="animate-fade-up [animation-delay:0.16s] mt-8 max-w-2xl text-lg sm:text-xl text-text-dim leading-relaxed">
                I design, automate, and stress-test infrastructure across cloud and
                hybrid environments &mdash; then prove it holds up. Every project
                below has been built, broken on purpose, and fixed before it went on
                this page.
              </p>
              <div className="animate-fade-up [animation-delay:0.24s] mt-9 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
                <a href={contact.resumeHref} className="marker-link">Download r&eacute;sum&eacute;</a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="marker-link">GitHub</a>
                <Link href="/projects" className="marker-link">View deployment log</Link>
              </div>
            </div>
            <div className="animate-fade-up [animation-delay:0.32s] flex flex-col items-center gap-8 lg:-translate-y-32">
              <Image
                src="/portrait.png"
                alt="Neal Ramjeawan"
                width={520}
                height={520}
                priority
                className="portrait-image portrait-entrance w-full max-w-[19rem]"
              />
              <UptimeCounter />
            </div>
          </div>
        </div>

        <div className="section-divider" />
      </section>

      {/* EXPERIENCE */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <p className="eyebrow mb-2">
            Experience
          </p>

          <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-10">
            Where I&apos;ve worked
          </h2>

          <ExperienceCarousel roles={experience} />

          <div className="mt-8 text-center">
            <Link
              href="/about#experience"
              className="marker-link font-mono text-sm"
            >
              Full work history &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="section-divider" />
      </section>

      {/* COMPONENTS / SKILLS */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <p className="eyebrow mb-2">
            Components
          </p>

          <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-10">
            Everything currently in service
          </h2>

          <StaggerReveal className="grid sm:grid-cols-2 gap-x-12" stagger={70}>
            {skillGroups.map((group) => {
              return (
                <div
                  key={group.name}
                  className="skill-item"
                >
                  <div className="mb-4">
                    <span className="font-mono text-xs text-accent-dim">0{skillGroups.indexOf(group) + 1}</span>
                    <h3 className="display-face text-2xl font-bold text-text leading-none mt-2">{group.name}</h3>
                  </div>

                  <p className="text-sm text-text-dim leading-relaxed">
                    {group.items.join(" \u00b7 ")}
                  </p>
                </div>
              );
            })}
          </StaggerReveal>
        </Reveal>

        <div className="section-divider" />
      </section>

      {/* DEPLOYMENT LOG (FEATURED PROJECTS) */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
          <p className="eyebrow mb-2">
            Deployment log
          </p>

          <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-10">
            Recent changes
          </h2>

          <StaggerReveal className="space-y-6" stagger={90}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </StaggerReveal>

          <div className="mt-10">
            <Link
              href="/projects"
              className="marker-link font-mono text-sm"
            >
              View the full deployment log &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="section-divider" />
      </section>

      {/* CONTACT CTA */}
      <section>
        <Reveal className="max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
          <p className="eyebrow mb-2">
            Get in touch
          </p>

          <h2 className="display-face text-4xl sm:text-5xl font-bold text-text mb-4">
            Open to Cloud, DevOps &amp; SRE roles
          </h2>

          <p className="text-text-dim max-w-xl mx-auto mb-8">
            If you need infrastructure that&apos;s automated, observable, and
            holds up under real failure - let&apos;s talk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="marker-link font-mono text-sm"
            >
              Email me
            </a>

            <span className="text-text-faint" aria-hidden="true">|</span>

            <Link
              href="/contact"
              className="marker-link font-mono text-sm"
            >
              All contact options
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}