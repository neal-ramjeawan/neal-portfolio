import { contact } from "../data/contact";

export const metadata = {
  title: "Contact — Neal Ramjeawan",
  description: "Get in touch with Neal Ramjeawan.",
};

const CHANNELS = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    label: "GitHub",
    value: contact.github.replace("https://", ""),
    href: contact.github,
  },
  {
    label: "LinkedIn",
    value: contact.linkedin.replace("https://", ""),
    href: contact.linkedin,
  },
];

export default function Contact() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-text-faint mb-2">
        Contact
      </p>
      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-text mb-4">
        Let&apos;s talk
      </h1>
      <p className="text-text-dim leading-relaxed mb-10">
        Open to Cloud Engineer, DevOps, and SRE / Systems Engineer roles. The
        fastest way to reach me is email.
      </p>

      <div className="space-y-3">
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 hover:border-border-strong hover:bg-surface-hover transition-colors group"
          >
            <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
              {c.label}
            </span>
            <span className="font-mono text-sm text-text group-hover:text-accent transition-colors">
              {c.value}
            </span>
          </a>
        ))}

        <a
          href={contact.resumeHref}
          className="flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 hover:border-border-strong hover:bg-surface-hover transition-colors group"
        >
          <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
            R&eacute;sum&eacute;
          </span>
          <span className="font-mono text-sm text-text group-hover:text-accent transition-colors">
            Download PDF
          </span>
        </a>
      </div>
    </main>
  );
}