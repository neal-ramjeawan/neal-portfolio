// Work history for the About page's Experience timeline. Most recent
// role first. `highlights` is a curated subset of the full CV bullet
// list, not a full copy — the résumé PDF has the complete detail.

export const experience = [
  {
    company: "Infomil Mauritius",
    title: "Software Integration Engineer",
    dates: "Jun 2026 \u2013 Present",
    highlights: [
      "Drove Windows 10/11 migration and enterprise endpoint onboarding across the organization",
      "Implemented application allowlisting with AppLocker and secure device enrollment via Microsoft Intune and Entra ID",
      "Engineered and maintained PKI/PKCS certificate services for device and endpoint certificate deployment",
      "Administer and troubleshoot Windows Server, Active Directory, Group Policy, and RDS farm environments",
      "Designed and supported GLPI infrastructure to improve IT service-management operations",
    ],
    tools: ["Windows 11", "Microsoft Intune", "Entra ID", "AppLocker", "Active Directory", "PKI"],
  },
  {
    company: "Checkout.com",
    title: "Cloud Platform and Infrastructure Engineer",
    dates: "Nov 2020 \u2013 Feb 2026",
    highlights: [
      "Architected and maintained the AWS multi-account foundation using AWS Organizations, automated account vending, and baseline guardrails",
      "Automated Active Directory user and service-account lifecycle workflows using Python, Ansible, and ITSM integrations",
      "Built AWS Lambda automations for resource cleanup, compliance checks, workflow triggers, and governance activities",
      "Engineered and operated hardened Windows and Linux workloads on EC2, aligned with PCI 4.0 requirements",
      "Designed and deployed a Kubernetes-based data-processing workload with secure key management, automated CI/CD delivery, and monitoring",
      "Led AWS cost-optimisation initiatives and managed golden images, certificate lifecycle, and antivirus platforms across AWS and Azure",
    ],
    tools: ["AWS", "Azure", "Terraform", "Ansible", "AWX", "Python", "Kubernetes", "PCI 4.0"],
  },
  {
    company: "Dayforce (formerly Ceridian)",
    title: "Implementation Consultant, Technical Services",
    dates: "Dec 2019 \u2013 Nov 2020",
    highlights: [
      "Developed, customised, and maintained client solutions using DF Link methodology and XML/XSLT, delivering tailored Payroll, HR, and Benefits exports",
      "Gathered and refined technical requirements, led stakeholder review sessions, prioritised delivery work, and resolved implementation issues to support timely project outcomes",
    ],
    tools: ["XML/XSLT", "DF Link"],
  },
];