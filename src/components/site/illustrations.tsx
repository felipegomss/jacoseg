export function WindRidge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={className} aria-hidden="true">
      <g fill="none" stroke="#3a3933" strokeWidth="1">
        <path d="M0 372 L90 352 L170 360 L250 330 L330 334 L420 312 L500 318 L560 306" />
        <path d="M0 396 L110 380 L200 386 L290 362 L380 366 L470 348 L560 344" />
        <path d="M0 416 L130 406 L230 410 L320 394 L420 396 L560 384" />
      </g>
      <path
        d="M0 330 L70 302 L150 310 L200 272 L300 268 L350 244 L440 250 L490 232 L560 236"
        fill="none"
        stroke="#f2b705"
        strokeWidth="1.5"
      />
      <g fill="none" stroke="#edebe4" strokeWidth="1.5" strokeLinecap="round">
        <path d="M230 270 L230 118" />
        <g className="origin-[230px_118px] motion-safe:animate-[spin_14s_linear_infinite]">
          <path d="M230 118 L253.9 52.2" />
          <path d="M230 118 L275 171.6" />
          <path d="M230 118 L161 130.2" />
        </g>
        <path d="M380 246 L380 123" />
        <g className="origin-[380px_123px] motion-safe:animate-[spin_17s_linear_infinite]">
          <path d="M380 123 L432.6 103.8" />
          <path d="M380 123 L370.3 178.2" />
          <path d="M380 123 L337.1 87" />
        </g>
        <path d="M490 233 L490 137" />
        <g className="origin-[490px_137px] motion-safe:animate-[spin_12s_linear_infinite]">
          <path d="M490 137 L521.1 105.9" />
          <path d="M490 137 L501.4 179.5" />
          <path d="M490 137 L447.5 125.6" />
        </g>
      </g>
      <g fill="#edebe4">
        <circle cx="230" cy="118" r="3" />
        <circle cx="380" cy="123" r="2.6" />
        <circle cx="490" cy="137" r="2.2" />
      </g>
    </svg>
  );
}

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
