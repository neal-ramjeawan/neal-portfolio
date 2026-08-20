import ProjectCard from "../components/ProjectCard";
import StaggerReveal from "../components/StaggerReveal";
import { projects } from "../data/projects";

export const metadata = {
  title: "Projects",
  description:
    "The full project log: Cloud Platform and DevOps portfolio projects, with the problem, the response, and the result for each.",
};

export default function Projects() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
        Project Log
      </p>
      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-text mb-4">
        Every project, start to finish
      </h1>
      <p className="text-text-dim max-w-2xl mb-12 leading-relaxed">
        Each entry below is a real build: the problem it started from, what I
        actually did about it, and how I know it works. Status reflects how far
        along each one is &mdash; resolved means shipped and tested, monitoring
        means the core is proven and still expanding, in progress means it&apos;s
        actively being built.
      </p>

      <StaggerReveal className="space-y-6" stagger={80}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </StaggerReveal>
    </main>
  );
}