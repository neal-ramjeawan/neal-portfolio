import { contact } from "../data/contact";
import CopyButton from "../components/CopyButton";

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
    <main className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,30rem)] gap-14 lg:gap-24 items-start">
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="display-face text-5xl sm:text-7xl font-bold text-text mb-5">
            Let&apos;s talk
          </h1>
          <p className="max-w-md text-lg text-text-dim leading-relaxed">
            Open to Cloud Platform Engineer, DevOps, and SRE roles. The
            fastest way to reach me is email.
          </p>
        </div>

        <div className="border-t border-border">
        {CHANNELS.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-3 border-b border-border px-1 py-5"
          >
            <a
              href={c.href}
              target={c.label === "Email" ? undefined : "_blank"}
              rel={c.label === "Email" ? undefined : "noopener noreferrer"}
              className="flex-1 flex items-center justify-between group"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
                {c.label}
              </span>

              <span className="font-mono text-sm text-text group-hover:text-accent transition-colors">
                {c.value}
              </span>
            </a>

            <CopyButton value={c.value} label={`Copy ${c.label.toLowerCase()}`} />
          </div>
        ))}

        <a
          href={contact.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-b border-border px-1 py-5 group"
        >
          <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
            R&eacute;sum&eacute;
          </span>

          <span className="font-mono text-sm text-text group-hover:text-accent transition-colors">
            Download PDF
          </span>
        </a>
        </div>
      </div>
    </main>
  );
}