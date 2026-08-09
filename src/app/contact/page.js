import { contact } from "../data/contact";

export const metadata = {
  title: "Contact",
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
        Open to Cloud Platform Engineer, DevOps, and SRE roles. The
        fastest way to reach me is email.
      </p>

      <div className="space-y-3">
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.label === "Email" ? undefined : "_blank"}
            rel={c.label === "Email" ? undefined : "noopener noreferrer"}
            className="card-hover flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 hover:border-border-strong hover:bg-surface-hover transition-colors group"
          >
            <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
              {c.label}
            </span>

            <span className="font-mono text-sm text-text group-hover:text-accent-warm transition-colors">
              {c.value}
            </span>
          </a>
        ))}

        <a
          href={contact.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="card-hover flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 hover:border-border-strong hover:bg-surface-hover transition-colors group"
        >
          <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
            R&eacute;sum&eacute;
          </span>

          <span className="font-mono text-sm text-text group-hover:text-accent-warm transition-colors">
            Download PDF
          </span>
        </a>
      </div>
    </main>
  );
}