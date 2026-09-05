const STATUS_MAP = {
  resolved: {
    label: "Resolved",
    text: "text-accent-dim",
  },
  monitoring: {
    label: "Monitoring",
    text: "text-accent-dim",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-text-faint",
    text: "text-text-dim",
  },
};

export default function ProjectCard({ project }) {
  const status = STATUS_MAP[project.status] ?? STATUS_MAP["in-progress"];

  return (
    <article
      id={project.slug}
      className="scroll-mt-24 border-t border-border bg-transparent py-8 sm:py-10 md:grid md:grid-cols-[11rem_1fr] md:gap-x-10"
    >
      {/* STATUS + REPOSITORY */}
      <div className="mb-6 md:mb-0">
        <p className="font-mono text-sm uppercase tracking-wide text-text-faint">Project</p>
        <p className={`mt-2 font-mono text-sm ${status.text}`}>{status.label}</p>

        <a
          href={`https://github.com/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-start gap-1 font-mono text-sm text-text-dim hover:text-accent-warm transition-colors"
        >
          <span>{project.repo}</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </a>
      </div>

      <div className="md:col-span-1">
        {/* TITLE */}
        <h3 className="display-face text-3xl sm:text-4xl font-bold text-text mb-6">
          {project.title}
        </h3>

      {/* PROJECT DETAILS */}
      <dl className="space-y-5 text-base leading-relaxed">
        <div>
          <dt className="font-mono text-sm uppercase tracking-wide text-text-faint mb-1">
            Problem
          </dt>
          <dd className="text-text-dim">{project.problem}</dd>
        </div>

        <div>
          <dt className="font-mono text-sm uppercase tracking-wide text-text-faint mb-1">
            Response
          </dt>
          <dd className="text-text-dim">{project.response}</dd>
        </div>

        <div>
          <dt className="font-mono text-sm uppercase tracking-wide text-text-faint mb-1">
            Result
          </dt>
          <dd className="text-text-dim">{project.result}</dd>
        </div>
      </dl>

      {/* LIVE DEMO */}
      {project.demo && (
        <div className="mt-6">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent-warm px-3.5 py-2 font-mono text-xs font-medium text-text hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            View live demo &rarr;
          </a>
        </div>
      )}

        {/* TECHNOLOGY STACK */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-7">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-xs text-text-dim">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}