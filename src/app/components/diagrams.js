// Simple architecture diagrams for the featured projects, built from
// the same facts as their case-study text. Orthogonal box-and-line
// style (like a standard cloud architecture diagram), colors read
// from the theme's CSS variables.

function Box({ x, y, w, h, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.2" />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="11.5"
        fill="var(--text)"
      >
        {label}
      </text>
    </g>
  );
}

function Edge({ points, dashed = false, markerId }) {
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--border-strong)"
      strokeWidth="1.5"
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={`url(#${markerId})`}
    />
  );
}

function ArrowMarker({ id }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 Z" fill="var(--border-strong)" />
    </marker>
  );
}

export function BankMigrationDiagram({ className = "" }) {
  return (
    <svg viewBox="0 0 720 200" className={className} aria-label="Architecture diagram: client through ingress, service, pods, and PostgreSQL, with Argo CD syncing the pods">
      <defs><ArrowMarker id="arrow-bank" /></defs>
      <Edge points={[[100, 100], [150, 100]]} markerId="arrow-bank" />
      <Edge points={[[265, 100], [315, 100]]} markerId="arrow-bank" />
      <Edge points={[[405, 100], [455, 100]]} markerId="arrow-bank" />
      <Edge points={[[555, 100], [605, 100]]} markerId="arrow-bank" />
      <Edge points={[[505, 50], [505, 78]]} markerId="arrow-bank" dashed />
      <Box x={10} y={78} w={90} h={44} label="Client" />
      <Box x={150} y={78} w={115} h={44} label="Ingress (TLS)" />
      <Box x={315} y={78} w={90} h={44} label="Service" />
      <Box x={455} y={78} w={100} h={44} label="Pods \u00d73" />
      <Box x={605} y={78} w={100} h={44} label="PostgreSQL" />
      <Box x={455} y={10} w={100} h={40} label="Argo CD" />
    </svg>
  );
}

export function GreendaleKeystoneDiagram({ className = "" }) {
  return (
    <svg viewBox="0 0 620 320" className={className} aria-label="Architecture diagram: Slack command through the reset service, branching to Vault and Active Directory, converging at Loki and Grafana">
      <defs><ArrowMarker id="arrow-greendale" /></defs>
      <Edge points={[[160, 42], [240, 42]]} markerId="arrow-greendale" />
      <Edge points={[[320, 64], [320, 100], [145, 100], [145, 140]]} markerId="arrow-greendale" />
      <Edge points={[[320, 64], [320, 100], [470, 100], [470, 140]]} markerId="arrow-greendale" />
      <Edge points={[[145, 184], [145, 220], [150, 220], [150, 260]]} markerId="arrow-greendale" />
      <Edge points={[[470, 184], [470, 220], [180, 220], [180, 260]]} markerId="arrow-greendale" />
      <Edge points={[[240, 282], [310, 282]]} markerId="arrow-greendale" />
      <Box x={20} y={20} w={140} h={44} label="Slack /reset" />
      <Box x={240} y={20} w={160} h={44} label="Reset Service" />
      <Box x={60} y={140} w={170} h={44} label="Vault (TOTP)" />
      <Box x={390} y={140} w={160} h={44} label="AD-DC (LDAPS)" />
      <Box x={90} y={260} w={150} h={44} label="Loki (audit)" />
      <Box x={310} y={260} w={110} h={44} label="Grafana" />
    </svg>
  );
}

export function PatchComplianceDiagram({ className = "" }) {
  return (
    <svg viewBox="0 0 820 200" className={className} aria-label="Architecture diagram: SSM Patch Manager through EventBridge, Lambda, DynamoDB, to the Streamlit dashboard">
      <defs><ArrowMarker id="arrow-patch" /></defs>
      <Edge points={[[170, 100], [220, 100]]} markerId="arrow-patch" />
      <Edge points={[[350, 100], [400, 100]]} markerId="arrow-patch" />
      <Edge points={[[490, 100], [540, 100]]} markerId="arrow-patch" />
      <Edge points={[[650, 100], [690, 100]]} markerId="arrow-patch" />
      <Box x={10} y={78} w={160} h={44} label="SSM Patch Manager" />
      <Box x={220} y={78} w={130} h={44} label="EventBridge" />
      <Box x={400} y={78} w={90} h={44} label="Lambda" />
      <Box x={540} y={78} w={110} h={44} label="DynamoDB" />
      <Box x={690} y={78} w={120} h={44} label="Streamlit" />
    </svg>
  );
}

export const architectureDiagrams = {
  bankMigration: BankMigrationDiagram,
  greendaleKeystone: GreendaleKeystoneDiagram,
  patchCompliance: PatchComplianceDiagram,
};