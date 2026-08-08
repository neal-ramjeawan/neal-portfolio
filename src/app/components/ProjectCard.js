const STATUS_MAP = {
  resolved: {
    label: "Resolved",
    dot: "bg-accent-warm",
    text: "text-accent-warm",
    ring: "border-accent-warm/40",
    glow: "shadow-[0_0_60px_-18px_rgba(242,184,75,0.4)]",
  },
  monitoring: {
    label: "Monitoring",
    dot: "bg-accent",
    text: "text-accent",
    ring: "border-accent/40",
    glow: "shadow-[0_0_60px_-18px_rgba(0,173,181,0.35)]",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-text-faint",
    text: "text-text-dim",
    ring: "",
    glow: "",
  },
};

export default function ProjectCard({ project }) {
  const status = STATUS_MAP[project.status] ?? STATUS_MAP["in-progress"];
  const highlighted = Boolean(status.ring);

  const borderClass = highlighted ? status.ring : "border-border hover:border-border-strong";
  const glowClass = highlighted ? status.glow : "";

  return (
    <article
      id={project.slug}
      className={`card-hover scroll-mt-24 rounded-lg border bg-surface p-6 sm:p-8 ${borderClass} ${glowClass}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
          <span className={status.text}>{status.label}</span>
        </div>
        <a
          href={`https://github.com/${project.repo}`}
          className="font-mono text-xs text-text-dim hover:text-accent-warm transition-colors"
        >
          {project.repo} &rarr;
        </a>
      </div>

      <h3 className="font-mono text-lg sm:text-xl font-semibold text-text mb-5">
        {project.title}
      </h3>

      <dl className="space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-text-faint mb-1">
            Problem
          </dt>
          <dd className="text-text-dim">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-text-faint mb-1">
            Response
          </dt>
          <dd className="text-text-dim">{project.response}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wide text-text-faint mb-1">
            Result
          </dt>
          <dd className="text-text-dim">{project.result}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-2 mt-6">
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