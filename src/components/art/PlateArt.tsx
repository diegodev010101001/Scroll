const LEAVES = [
  { x: 128, y: 126, rotate: -35 },
  { x: 176, y: 138, rotate: 30 },
  { x: 150, y: 178, rotate: 80 },
];

const DOTS = [
  { x: 150, y: 116, r: 9, fill: "#e2532f" },
  { x: 118, y: 160, r: 8, fill: "#e2532f" },
  { x: 184, y: 172, r: 9, fill: "#e2532f" },
  { x: 152, y: 148, r: 7, fill: "#fff6e0" },
  { x: 170, y: 112, r: 5, fill: "#fff6e0" },
  { x: 126, y: 188, r: 5, fill: "#fff6e0" },
];

/** Plato ilustrado para el ejemplo de restaurante. Decorativo. */
export default function PlateArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" aria-hidden="true" focusable="false">
      <circle cx="150" cy="150" r="142" fill="#f4e9d8" />
      <circle cx="150" cy="150" r="128" fill="none" stroke="#e0cba8" strokeWidth="2" />
      <circle cx="150" cy="150" r="102" fill="#fffaf0" />
      <circle cx="150" cy="150" r="64" fill="#e8b04a" />
      <circle cx="150" cy="150" r="64" fill="none" stroke="#d2952f" strokeWidth="4" strokeDasharray="3 9" />
      {LEAVES.map((leaf) => (
        <ellipse
          key={`${leaf.x}-${leaf.y}`}
          cx={leaf.x}
          cy={leaf.y}
          rx="20"
          ry="9"
          fill="#7fb04a"
          transform={`rotate(${leaf.rotate} ${leaf.x} ${leaf.y})`}
        />
      ))}
      {DOTS.map((dot) => (
        <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.fill} />
      ))}
      <path d="M232 96A34 34 0 0 1 262 150Z" fill="#b9d24a" />
      <path d="M232 96A34 34 0 0 1 262 150" fill="none" stroke="#7fb04a" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
