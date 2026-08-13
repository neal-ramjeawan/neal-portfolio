// Shared card content for one role — used by the About page's timeline
// and the homepage carousel, so both stay in sync automatically.
export default function ExperienceCard({ role }) {
  return (
    <div className="card-hover rounded-lg border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
        <h3 className="font-mono text-base font-semibold text-text">{role.company}</h3>
        <span className="font-mono text-xs text-text-faint whitespace-nowrap">{role.dates}</span>
      </div>
      <p className="font-mono text-sm text-accent-warm mb-3">{role.title}</p>
      <ul className="space-y-1.5 text-sm text-text-dim leading-relaxed list-disc list-inside">
        {role.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-4">
        {role.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-text-dim"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}