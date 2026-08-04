// Decorative infrastructure-topology graphic for the hero: a cloud
// hub with server/service nodes connected to it, and a few dots
// animating along the connections like traffic on a network. Colors
// read from the theme's CSS variables, so a future palette swap
// needs no changes here.

const CLOUD_CENTER = [380, 320]; // node index 5's old position — now the hub

const NODES = [
  [380, 60],
  [470, 140],
  [300, 150],
  [420, 230],
  [260, 260],
  CLOUD_CENTER,
  [470, 380],
  [320, 420],
  [200, 340],
  [150, 180],
];

const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 4], [2, 3],
  [3, 5], [4, 5], [4, 8], [5, 6], [5, 7],
  [6, 7], [7, 8], [8, 9], [9, 2], [4, 9],
];

const PULSES = [
  { path: "M150,180 L300,150 L420,230 L380,320 L470,380", dur: "7s", begin: "0s" },
  { path: "M380,60 L470,140 L420,230 L380,320 L320,420", dur: "8.5s", begin: "1.4s" },
  { path: "M200,340 L260,260 L380,320 L320,420 L200,340", dur: "9.5s", begin: "2.7s" },
];

function Cloud({ cx, cy }) {
  return (
    <g className="np-cloud" fill="var(--accent)" opacity="0.65">
      <rect x={cx - 45} y={cy - 6} width="90" height="34" rx="17" />
      <circle cx={cx - 28} cy={cy - 12} r="20" />
      <circle cx={cx} cy={cy - 22} r="25" />
      <circle cx={cx + 28} cy={cy - 12} r="18" />
    </g>
  );
}

export default function NetworkGraphic({ className = "" }) {
  return (
    <svg viewBox="0 0 520 520" className={className} aria-hidden="true">
      <defs>
        <filter id="np-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g stroke="var(--border-strong)" strokeWidth="1" opacity="0.5">
        {EDGES.map(([a, b], i) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <g fill="var(--accent)">
        {NODES.map(([x, y], i) =>
          i === 5 ? null : <circle key={i} cx={x} cy={y} r="4" opacity="0.6" />
        )}
      </g>

      <Cloud cx={CLOUD_CENTER[0]} cy={CLOUD_CENTER[1]} />

      <g className="np-pulses" fill="var(--accent)" filter="url(#np-glow)">
        {PULSES.map((p, i) => (
          <circle key={i} r="3.5" opacity="0.95">
            <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite" path={p.path} />
          </circle>
        ))}
      </g>
    </svg>
  );
}