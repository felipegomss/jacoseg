const TOWNS: { name: string; x: number; y: number; lx: number; ly: number; anchor?: "middle" }[] = [
  { name: "Central", x: 60, y: 110, lx: 70, ly: 114 },
  { name: "Lapão", x: 190, y: 120, lx: 200, ly: 124 },
  { name: "Uibaí", x: 40, y: 230, lx: 50, ly: 234 },
  { name: "Ibipeba", x: 70, y: 300, lx: 80, ly: 304 },
  { name: "Brotas de Macaúbas", x: 130, y: 360, lx: 140, ly: 364 },
  { name: "Morro do Chapéu", x: 230, y: 270, lx: 240, ly: 274 },
  { name: "Campo Formoso", x: 430, y: 80, lx: 440, ly: 84 },
  { name: "Umburanas", x: 320, y: 100, lx: 330, ly: 104 },
  { name: "Ourolândia", x: 340, y: 150, lx: 350, ly: 154 },
  { name: "Várzea Nova", x: 380, y: 320, lx: 390, ly: 324 },
  { name: "Capim Grosso", x: 480, y: 250, lx: 480, ly: 272, anchor: "middle" },
  { name: "Miguel Calmon", x: 450, y: 350, lx: 460, ly: 354 },
];

export function RegionMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 420"
      className={className}
      role="img"
      aria-label="Mapa esquemático das lojas de Jacobina e Irecê e dos municípios atendidos por cada uma"
    >
      <g fontFamily="var(--font-jetbrains), monospace" fontSize="11" fill="#5c5a52" letterSpacing="0.06em">
        <text x="20" y="28">OESTE · IRECÊ</text>
        <text x="540" y="28" textAnchor="end">
          LESTE · JACOBINA
        </text>
      </g>
      <path d="M280 50 L280 390" stroke="#dad6cc" strokeWidth="1" />
      <path d="M150 210 L410 210" stroke="#14130f" strokeWidth="1" />
      <g fill="#8c897e">
        {TOWNS.map((t) => (
          <circle key={t.name} cx={t.x} cy={t.y} r="3" />
        ))}
      </g>
      <g fontFamily="var(--font-sans), sans-serif" fontSize="12" fill="#5c5a52">
        {TOWNS.map((t) => (
          <text key={t.name} x={t.lx} y={t.ly} textAnchor={t.anchor}>
            {t.name}
          </text>
        ))}
      </g>
      <rect x="143" y="203" width="14" height="14" fill="#f2b705" stroke="#14130f" strokeWidth="1.5" />
      <rect x="403" y="203" width="14" height="14" fill="#f2b705" stroke="#14130f" strokeWidth="1.5" />
      <g fontFamily="var(--font-archivo), sans-serif" fontWeight="600" fontSize="18" fill="#14130f" textAnchor="middle">
        <text x="150" y="192">Irecê</text>
        <text x="410" y="192">Jacobina</text>
      </g>
    </svg>
  );
}
