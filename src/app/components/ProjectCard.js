const STATUS_MAP = {
  resolved: {
    label: "Resolved",
    dot: "bg-accent",
    text: "text-accent",
  },
  monitoring: {
    label: "Monitoring",
    dot: "bg-text-dim",
    text: "text-text-dim",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-text-faint",
    text: "text-text-dim",
  },
};

export default function ProjectCard({ project, expanded = true }) {
  const status = STATUS_MAP[project.status] ?? STATUS_MAP["in-progress"];

  return (
    <article
      id={project.slug}
      className="scroll-mt-24 rounded-lg border border-border bg-surface p-6 sm:p-8 transition-colors hover:border-border-strong"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`}
          />
          <span className={status.text}>{status.label}</span>
        </div>

        <a
          href={`https://github.com/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-text-dim transition-colors hover:text-accent"
        >
          {project.repo} &rarr;
        </a>
      </div>

      <h3 className="mb-5 font-mono text-lg font-semibold text-text sm:text-xl">
        {project.title}
      </h3>

      <dl className="space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="mb-1 font-mono text-xs uppercase tracking-wide text-text-faint">
            Problem
          </dt>
          <dd className="text-text-dim">{project.problem}</dd>
        </div>

        {expanded && (
          <>
            <div>
              <dt className="mb-1 font-mono text-xs uppercase tracking-wide text-text-faint">
                Response
              </dt>
              <dd className="text-text-dim">{project.response}</dd>
            </div>

            <div>
              <dt className="mb-1 font-mono text-xs uppercase tracking-wide text-text-faint">
                Result
              </dt>
              <dd className="text-text-dim">{project.result}</dd>
            </div>
          </>
        )}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-text-dim"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}