const TOWNS: { name: string; x: number; y: number; lx: number; ly: number }[] = [
  { name: "Morro do Chapéu", x: 229, y: 301, lx: 186, ly: 324 },
  { name: "Várzea Nova", x: 269, y: 236, lx: 226, ly: 226 },
  { name: "Ourolândia", x: 244, y: 168, lx: 256, ly: 172 },
  { name: "Umburanas", x: 198, y: 117, lx: 210, ly: 121 },
  { name: "Miguel Calmon", x: 332, y: 274, lx: 292, ly: 296 },
  { name: "Capim Grosso", x: 440, y: 263, lx: 392, ly: 252 },
  { name: "Campo Formoso", x: 383, y: 67, lx: 330, ly: 55 },
  { name: "Ibipeba", x: 73, y: 321, lx: 40, ly: 344 },
  { name: "Uibaí", x: 51, y: 270, lx: 16, ly: 292 },
];

export function RegionMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      className={className}
      role="img"
      aria-label="Mapa esquemático das lojas de Jacobina e Irecê e municípios atendidos"
    >
      <g stroke="#dad6cc" strokeWidth="1" fill="none">
        <circle cx="346" cy="218" r="90" />
        <circle cx="101" cy="245" r="90" />
      </g>
      <path d="M101 245 L229 301 L346 218" fill="none" stroke="#bfbaae" strokeWidth="1" strokeDasharray="4 4" />
      <g fill="#14130f" fontFamily="var(--font-sans), sans-serif" fontSize="13">
        {TOWNS.map((t) => (
          <g key={t.name}>
            <circle cx={t.x} cy={t.y} r="4" />
            <text x={t.lx} y={t.ly}>
              {t.name}
            </text>
          </g>
        ))}
        <rect x="339" y="211" width="14" height="14" fill="#f2b705" stroke="#14130f" strokeWidth="2" />
        <text x="360" y="223" fontWeight="600" fontSize="15">
          Jacobina
        </text>
        <rect x="94" y="238" width="14" height="14" fill="#f2b705" stroke="#14130f" strokeWidth="2" />
        <text x="70" y="228" fontWeight="600" fontSize="15">
          Irecê
        </text>
      </g>
    </svg>
  );
}
