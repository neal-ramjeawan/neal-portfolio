// Component groups for the "system status" skills grid.
// Each group mirrors how a real service map would be organized —
// by function, not alphabetically.

export const skillGroups = [
  {
    name: "Cloud & IaC",
    items: ["AWS", "Azure", "Terraform", "OpenTofu"],
  },
  {
    name: "Containers & Orchestration",
    items: ["Docker", "Kubernetes", "Helm", "Argo CD"],
  },
  {
    name: "Identity & Access",
    items: ["Active Directory", "Keycloak", "Vault", "IAM"],
  },
  {
    name: "Automation & Config",
    items: ["Ansible", "AWX", "Python", "Bash / PowerShell"],
  },
  {
    name: "CI/CD & Supply Chain",
    items: ["GitHub Actions", "Trivy", "CodeQL"],
  },
  {
    name: "Observability",
    items: ["Prometheus", "Grafana", "Loki"],
  },
  {
    name: "Systems Administration",
    items: ["Linux", "Windows Server", "DNS / Networking"],
  },
];