// Deployment log — portfolio projects, framed as resolved/ongoing changes.
// status: "resolved" | "monitoring" | "in-progress"
//   resolved     → shipped, tested, CI green
//   monitoring   → substantial pieces confirmed working, still expanding
//   in-progress  → actively being built

export const projects = [
  {
    slug: "legacy-bank-ha-migration",
    title: "Legacy bank app → zero-downtime Kubernetes",
    status: "resolved",
    featured: true,
    problem:
      "A legacy Flask + SQLite banking app ran as a single process — one crash, one bad deploy, or one bad request meant total downtime, with no health checks, no observability, and no security hardening in place.",
    response:
      "Re-platformed it onto Flask + PostgreSQL with gunicorn and dedicated /healthz, /readyz, and /metrics endpoints, then deployed to Kubernetes with pod anti-affinity, PodDisruptionBudgets, rolling updates, NetworkPolicy, TLS via cert-manager, and pod security hardening — packaged in a Helm chart and delivered through Argo CD, with CI running lint, pytest, Trivy, CodeQL, kubeconform, and a kind smoke test on every push.",
    result:
      "Chaos-tested it myself: random pod kills and a 300-request rolling update both completed with zero failed requests, and node drains re-targeted traffic cleanly. Wrote up the real bugs hit along the way in a full case-study report.",
    stack: [
      "Kubernetes",
      "Helm",
      "Argo CD",
      "PostgreSQL",
      "cert-manager",
      "Trivy",
      "CodeQL",
      "GitHub Actions",
    ],
    repo: "neal-ramjeawan/legacy-bank-ha-migration",
  },
  {
    slug: "greendale-keystone",
    title: "Greendale Keystone — an identity platform from a laptop",
    status: "monitoring",
    featured: true,
    problem:
      "Wanted to demonstrate enterprise-grade identity, secrets management, and self-service operations — the kind of stack a bank actually runs — without a datacenter, on an 8GB M1 laptop.",
    response:
      "Built a Docker Compose stack gated behind profiles: Samba4 Active Directory, CoreDNS, WireGuard VPN, HashiCorp Vault, Traefik, and a Prometheus + Grafana + Loki observability stack. On top of it, automated a real operational workflow — a Slack slash command that verifies a TOTP code, pulls a service credential from Vault at request time, resets the user's password over LDAPS, and writes a structured audit entry that shows up in Grafana seconds later.",
    result:
      "All seven stack profiles run end to end, and the password-reset workflow has been tested start to finish against a live AD account with a verifiable audit trail. CI runs Compose validation, YAML lint, and secret scanning on every push.",
    stack: [
      "Active Directory",
      "HashiCorp Vault",
      "Prometheus",
      "Grafana",
      "Loki",
      "Terraform",
      "Ansible",
      "Docker Compose",
    ],
    repo: "neal-ramjeawan/greendale-keystone",
  },
  {
    slug: "patch-compliance-dashboard",
    title: "Patch compliance, without a database to babysit",
    status: "resolved",
    featured: true,
    problem:
      "Needed real-time visibility into fleet patch compliance without standing up and maintaining a database server or paying for always-on compute.",
    response:
      "Used AWS Systems Manager Patch Manager as the system of record, with EventBridge triggering Lambda functions that write compliance state into DynamoDB — chosen over RDS specifically to avoid VPC and idle-cost overhead — and a Streamlit dashboard on Streamlit Community Cloud reading it back out.",
    result:
      "A fully serverless, pay-per-event compliance dashboard, pushed to GitHub with passing CI (unit tests, ruff, terraform fmt) and a recruiter-facing README and case study.",
    stack: [
      "AWS Systems Manager",
      "Lambda",
      "EventBridge",
      "DynamoDB",
      "Streamlit",
      "Terraform",
    ],
    repo: "neal-ramjeawan/patch-compliance-dashboard",
  },
  {
    slug: "zwazo",
    title: "Zwazo — a Mauritius-only trivia site",
    status: "resolved",
    featured: true,
    problem:
      "Wanted a lighter, product-flavored project alongside the infrastructure-heavy ones — something that shows front-end craft, not just backend plumbing.",
    response:
      "Built a trivia site scoped entirely to Mauritius — history, geography, culture — with 150+ questions spread across eight categories, in React, Vite, and Tailwind.",
    result:
      "A fast, responsive, self-contained site, ready to package into its own repo. Try it here.",
    demo: "https://do-you-know-mauritius.pages.dev",
    stack: ["React", "Vite", "Tailwind CSS"],
    repo: "neal-ramjeawan/do-you-know-mauritius",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);