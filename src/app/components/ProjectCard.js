import { architectureDiagrams } from "./diagrams";

const STATUS_MAP = {
  resolved: { label: "Resolved", dot: "bg-accent", text: "text-accent" },
  monitoring: { label: "Monitoring", dot: "bg-text-dim", text: "text-text-dim" },
  "in-progress": { label: "In progress", dot: "bg-text-faint", text: "text-text-dim" },
};

export default function ProjectCard({ project, expanded = true }) {
  const status = STATUS_MAP[project.status] ?? STATUS_MAP["in-progress"];
  const Diagram = expanded && project.diagram ? architectureDiagrams[project.diagram] : null;

  return (
    <article
      id={project.slug}
      className="card-hover scroll-mt-24 rounded-lg border border-border bg-surface p-6 sm:p-8 hover:border-border-strong"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
          <span className={status.text}>{status.label}</span>
        </div>
        <a
          href={`https://github.com/${project.repo}`}
          className="font-mono text-xs text-text-dim hover:text-accent transition-colors"
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
        {expanded && (
          <>
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
          </>
        )}
      </dl>

      {Diagram && (
        <div className="mt-6 rounded-lg border border-border bg-bg-elevated p-4 overflow-x-auto">
          <Diagram className="h-auto min-w-[480px] w-full" />
        </div>
      )}

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