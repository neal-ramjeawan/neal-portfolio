// Small monoline icons matching the site's line-art style throughout.
// Each takes a className so size/color are controlled via Tailwind
// (e.g. <CloudIcon className="w-4 h-4 text-accent" />).

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function CloudIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 19a4.5 4.5 0 0 1-.4-8.98 5.5 5.5 0 0 1 10.7-2.14A4.5 4.5 0 0 1 17.5 19h-11Z" />
    </svg>
  );
}

export function ContainerIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="M3 12l9 4.5 9-4.5" />
      <path d="M3 16.5l9 4.5 9-4.5" />
    </svg>
  );
}

export function KeyIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.85 12.15 20 3M17 6l3 3M14 9l2 2" />
    </svg>
  );
}

export function GearIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.97 7.97 0 0 0 0-2l2.1-1.6-2-3.4-2.5 1a8 8 0 0 0-1.7-1L14.9 2h-4l-.4 2.9a8 8 0 0 0-1.7 1l-2.5-1-2 3.4L6.4 10a7.97 7.97 0 0 0 0 2l-2.1 1.6 2 3.4 2.5-1a8 8 0 0 0 1.7 1l.4 2.9h4l.4-2.9a8 8 0 0 0 1.7-1l2.5 1 2-3.4-2.1-1.6Z" />
    </svg>
  );
}

export function GitBranchIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="9" r="2.2" />
      <path d="M6 8.2v7.6M6 8.5c0 4.5 3 5.5 8 5.5M18 11.2V9" />
    </svg>
  );
}

export function PulseIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

export function ServerIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DownloadIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />
    </svg>
  );
}

export function CodeIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16" />
    </svg>
  );
}

export function MailIcon({ className }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

// Maps each skills.js category name to its icon component.
export const skillIcons = {
  "Cloud & IaC": CloudIcon,
  "Containers & Orchestration": ContainerIcon,
  "Identity & Access": KeyIcon,
  "Automation & Config": GearIcon,
  "CI/CD & Supply Chain": GitBranchIcon,
  Observability: PulseIcon,
  "Systems Administration": ServerIcon,
};