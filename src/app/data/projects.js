// Deployment log — portfolio projects, framed as resolved/ongoing changes.
// status: "resolved" | "monitoring" | "in-progress"
//   resolved     → shipped, tested, CI green
//   monitoring   → substantial pieces confirmed working, still expanding
//   in-progress  → actively being built

export const projects = [
  {
    slug: "legacy-bank-ha-migration",
    title: "Legacy bank app \u2192 zero-downtime Kubernetes",
    status: "resolved",
    featured: true,
    problem:
      "A legacy Flask + SQLite banking app ran as a single process \u2014 one crash, one bad deploy, or one bad request meant total downtime, with no health checks, no observability, and no security hardening in place.",
    response:
      "Re-platformed it onto Flask + PostgreSQL with gunicorn and dedicated /healthz, /readyz, and /metrics endpoints, then deployed to Kubernetes with pod anti-affinity, PodDisruptionBudgets, rolling updates, NetworkPolicy, TLS via cert-manager, and pod security hardening \u2014 packaged in a Helm chart and delivered through Argo CD, with CI running lint, pytest, Trivy, CodeQL, kubeconform, and a kind smoke test on every push.",
    result:
      "Chaos-tested it myself: random pod kills and a 300-request rolling update both completed with zero failed requests, and node drains re-targeted traffic cleanly. Wrote up the real bugs hit along the way in a full case-study report.",
    stack: ["Kubernetes", "Helm", "Argo CD", "PostgreSQL", "cert-manager", "Trivy", "CodeQL", "GitHub Actions"],
    repo: "neal-ramjeawan/legacy-bank-ha-migration",
    diagram: "bankMigration",
  },
  {
    slug: "greendale-keystone",
    title: "Greendale Keystone \u2014 an identity platform from a laptop",
    status: "monitoring",
    featured: true,
    problem:
      "Wanted to demonstrate enterprise-grade identity, secrets management, and self-service operations \u2014 the kind of stack a bank actually runs \u2014 without a datacenter, on an 8GB M1 laptop.",
    response:
      "Built a Docker Compose stack gated behind profiles: Samba4 Active Directory, CoreDNS, WireGuard VPN, HashiCorp Vault, Traefik, and a Prometheus + Grafana + Loki observability stack. On top of it, automated a real operational workflow \u2014 a Slack slash command that verifies a TOTP code, pulls a service credential from Vault at request time, resets the user's password over LDAPS, and writes a structured audit entry that shows up in Grafana seconds later.",
    result:
      "All seven stack profiles run end to end, and the password-reset workflow has been tested start to finish against a live AD account with a verifiable audit trail. CI runs Compose validation, YAML lint, and secret scanning on every push.",
    stack: ["Active Directory", "HashiCorp Vault", "Prometheus", "Grafana", "Loki", "Terraform", "Ansible", "Docker Compose"],
    repo: "neal-ramjeawan/greendale-keystone",
    diagram: "greendaleKeystone",
  },
  {
    slug: "patch-compliance-dashboard",
    title: "Patch compliance, without a database to babysit",
    status: "resolved",
    featured: true,
    problem:
      "Needed real-time visibility into fleet patch compliance without standing up and maintaining a database server or paying for always-on compute.",
    response:
      "Used AWS Systems Manager Patch Manager as the system of record, with EventBridge triggering Lambda functions that write compliance state into DynamoDB \u2014 chosen over RDS specifically to avoid VPC and idle-cost overhead \u2014 and a Streamlit dashboard on Streamlit Community Cloud reading it back out.",
    result:
      "A fully serverless, pay-per-event compliance dashboard, pushed to GitHub with passing CI (unit tests, ruff, terraform fmt) and a recruiter-facing README and case study.",
    stack: ["AWS Systems Manager", "Lambda", "EventBridge", "DynamoDB", "Streamlit", "Terraform"],
    repo: "neal-ramjeawan/patch-compliance-dashboard",
    diagram: "patchCompliance",
  },
  {
    slug: "awx-ansible-lab",
    title: "AWX (Ansible Tower) lab on minikube",
    status: "resolved",
    featured: false,
    problem:
      "Wanted hands-on depth with Ansible at the platform level, not just playbooks run from a laptop.",
    response:
      "Stood up AWX on minikube with GitHub-integrated playbook storage and CI wired through GitHub Actions.",
    result:
      "Packaged as a complete, self-contained repo \u2014 clone it and the lab comes up on its own.",
    stack: ["AWX", "Ansible", "Kubernetes", "minikube", "GitHub Actions"],
    repo: "neal-ramjeawan/awx-ansible-lab",
  },
  {
    slug: "aws-transfer-family-app",
    title: "Self-service user management for AWS Transfer Family",
    status: "monitoring",
    featured: false,
    problem:
      "AWS Transfer Family (SFTP) users are usually managed by hand \u2014 slow and error-prone once you're past a handful of accounts.",
    response:
      "Built a Streamlit front end over a FastAPI backend using boto3, deployed to Kubernetes with IRSA for IAM authentication, and LocalStack for testing the whole thing without touching a real AWS bill.",
    result:
      "A working CI/CD pipeline \u2014 ruff, pytest, Docker build to GHCR, and kubectl deploy \u2014 takes a change from commit to cluster automatically.",
    stack: ["Streamlit", "FastAPI", "boto3", "Kubernetes", "IRSA", "LocalStack"],
    repo: "neal-ramjeawan/aws-transfer-family-app",
  },
  {
    slug: "keycloak-iam-demo",
    title: "Keycloak, eight phases deep",
    status: "in-progress",
    featured: false,
    problem:
      "Most Keycloak tutorials stop at \u201clog in with SSO.\u201d Real IAM work is federation, brokering, and fine-grained authorization across multiple realms.",
    response:
      "Structured as eight progressive phases: deployment, machine-to-machine auth, fine-grained authorization, OpenLDAP federation, identity brokering, multi-realm architecture, Terraform-managed identity config, and Admin REST API scripting.",
    result:
      "Runs entirely on a local Kubernetes setup \u2014 each phase builds on the last, so the repo doubles as a walkthrough of how enterprise identity gets assembled.",
    stack: ["Keycloak", "OpenLDAP", "Terraform", "Kubernetes"],
    repo: "neal-ramjeawan/keycloak-iam-demo",
  },
  {
    slug: "k8s-openshift-troubleshooting-labs",
    title: "Broken on purpose: Kubernetes & OpenShift troubleshooting labs",
    status: "in-progress",
    featured: false,
    problem:
      "Reading about Kubernetes failure modes isn't the same as diagnosing one under pressure.",
    response:
      "Built two lab repos \u2014 k8s-troubleshooting-lab and openshift-lab \u2014 each with intentionally broken manifests, runbooks, and automated break/verify scripts across five modules, running on minikube and the Red Hat Developer Sandbox respectively.",
    result:
      "A repeatable way to practice \u2014 and demonstrate \u2014 real incident diagnosis instead of just describing it.",
    stack: ["Kubernetes", "OpenShift", "minikube", "Bash"],
    repo: "neal-ramjeawan/k8s-troubleshooting-lab",
  },
  {
    slug: "identity-automation-platform",
    title: "A Python platform for IAM automation",
    status: "in-progress",
    featured: false,
    problem:
      "Wanted a portfolio piece that reads like production platform code, not a one-off script.",
    response:
      "Built a Python-based IAM automation platform with a validation layer, audit logging, and a workflow engine that persists state and recovers cleanly from a crash mid-run.",
    result:
      "Test coverage and CI/CD concepts are built in from the start; API and UI phases are planned next.",
    stack: ["Python", "IAM", "Workflow automation", "CI/CD"],
    repo: "neal-ramjeawan/identity-automation-platform",
  },
  {
    slug: "mauritius-info-hub",
    title: "A public information dashboard for Mauritius",
    status: "in-progress",
    featured: false,
    problem:
      "Official alerts \u2014 weather, power cuts, water interruptions, road closures \u2014 are scattered across separate government sites with no single place to check them.",
    response:
      "Designed a Next.js/FastAPI/PostgreSQL platform that scrapes and normalizes alerts from the Mauritius Meteorological Services, the CEB, and the CWA into a single alerts table, with a phased roadmap toward community submissions and, later, AI-assisted search.",
    result:
      "V1 scaffold built end to end \u2014 schema, scrapers, API routers, and dashboard frontend \u2014 running on an entirely free-tier stack.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Web scraping"],
    repo: "neal-ramjeawan/mauritius-info-hub",
  },
  {
    slug: "zwazo",
    title: "Zwazo \u2014 a Mauritius-only trivia site",
    status: "in-progress",
    featured: false,
    problem:
      "Wanted a lighter, product-flavored project alongside the infrastructure-heavy ones \u2014 something that shows front-end craft, not just backend plumbing.",
    response:
      "Built a trivia site scoped entirely to Mauritius \u2014 history, geography, culture \u2014 with 150+ questions spread across eight categories, in React, Vite, and Tailwind.",
    result:
      "A fast, responsive, self-contained site, ready to package into its own repo.",
    stack: ["React", "Vite", "Tailwind CSS"],
    repo: "neal-ramjeawan/do-you-know-mauritius",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);