import { useEffect, useState, type ReactNode } from 'react';

const CYCLE = 20;
const SCENE = 5;

/** Animates one attribute from `from` to `to` between two moments of the 20 s loop (and holds it). */
function A({ attr, from, to, start, end }: { attr: string; from: number | string; to: number | string; start: number; end: number }) {
  return (
    <animate
      attributeName={attr}
      values={`${from};${from};${to};${to}`}
      keyTimes={`0;${start / CYCLE};${end / CYCLE};1`}
      dur={`${CYCLE}s`}
      repeatCount="indefinite"
    />
  );
}

/** A whole scene: visible only during its own 5 seconds. */
function Scene({ i, still, children }: { i: number; still: boolean; children: ReactNode }) {
  const a = (i * SCENE) / CYCLE;
  const b = ((i + 1) * SCENE) / CYCLE;
  const f = 0.012;
  const times = i === 0 ? `0;${b - f};${b};1` : i === 3 ? `0;${a};${a + f};1` : `0;${a};${a + f};${b - f};${b};1`;
  const vals = i === 0 ? '1;1;0;0' : i === 3 ? '0;0;1;1' : '0;0;1;1;0;0';
  return (
    <g opacity={still ? (i === 2 ? 1 : 0) : i === 0 ? 1 : 0}>
      {!still && <animate attributeName="opacity" values={vals} keyTimes={times} dur={`${CYCLE}s`} repeatCount="indefinite" />}
      {children}
    </g>
  );
}

const money = (n: string) => <tspan fontWeight={800}>{n}</tspan>;

/** Looping SVG that shows what the EBS 693 does. All figures are invented (an example, not a client). */
export default function EbsDemoAnim() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    try {
      setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch {
      /* keep animated */
    }
  }, []);

  const titles = ['1 · Partimos de tus números', '2 · Calculamos las fugas', '3 · Tu equipo activa soluciones', '4 · Simula y decide'];
  const stepOf = (n: number) => n * SCENE;

  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="Animación de ejemplo: se parte de los números del negocio, se calculan las fugas de dinero, el equipo activa soluciones y el retorno se recalcula en pantalla."
      className="w-full h-auto rounded-3xl border border-white/10 bg-[#060a14]"
      fontFamily="Inter, system-ui, sans-serif"
    >
      <defs>
        <linearGradient id="ebsg" x1="0" x2="1">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* window */}
      <rect x="0" y="0" width="640" height="34" fill="#0d1424" />
      <circle cx="18" cy="17" r="5" fill="#ff5f57" />
      <circle cx="36" cy="17" r="5" fill="#febc2e" />
      <circle cx="54" cy="17" r="5" fill="#28c840" />
      <rect x="150" y="8" width="340" height="18" rx="9" fill="#060a14" />
      <text x="320" y="21" textAnchor="middle" fontSize="10" fill="#7e8aa3">universo693.com/ebs/tu-empresa-…</text>

      {/* step title */}
      {titles.map((t, i) => (
        <text key={t} x="320" y="68" textAnchor="middle" fontSize="16" fontWeight={800} fill="#fff" opacity={still ? (i === 2 ? 1 : 0) : i === 0 ? 1 : 0}>
          {t}
          {!still && (
            <animate
              attributeName="opacity"
              values={i === 0 ? '1;1;0;0' : i === 3 ? '0;0;1;1' : '0;0;1;1;0;0'}
              keyTimes={
                i === 0
                  ? `0;${(stepOf(1) - 0.2) / CYCLE};${stepOf(1) / CYCLE};1`
                  : i === 3
                    ? `0;${stepOf(3) / CYCLE};${(stepOf(3) + 0.2) / CYCLE};1`
                    : `0;${stepOf(i) / CYCLE};${(stepOf(i) + 0.2) / CYCLE};${(stepOf(i + 1) - 0.2) / CYCLE};${stepOf(i + 1) / CYCLE};1`
              }
              dur={`${CYCLE}s`}
              repeatCount="indefinite"
            />
          )}
        </text>
      ))}

      {/* 1 · numbers */}
      <Scene i={0} still={still}>
        {[
          ['Cotizaciones al mes', '120', 'dato real', '#34d399'],
          ['Tasa de cierre', '18 %', 'estimado por ti', '#fbbf24'],
          ['Ticket promedio', '$450.000', 'supuesto a validar', '#f87171'],
        ].map(([label, val, tag, c], k) => (
          <g key={label} transform={`translate(70 ${110 + k * 66})`} opacity={0}>
            {!still && <A attr="opacity" from={0} to={1} start={0.3 + k * 1.1} end={0.8 + k * 1.1} />}
            <rect width="500" height="50" rx="12" fill="#0d1424" stroke="#ffffff1a" />
            <text x="20" y="31" fontSize="14" fill="#cbd5e1">{label}</text>
            <text x="300" y="31" fontSize="16" fontWeight={800} fill="#fff" textAnchor="end">{val}</text>
            <rect x="325" y="14" width="150" height="22" rx="11" fill={c} opacity="0.16" />
            <text x="400" y="29" fontSize="11" fontWeight={700} fill={c} textAnchor="middle">{tag}</text>
          </g>
        ))}
        <text x="320" y="330" textAnchor="middle" fontSize="12" fill="#7e8aa3">Cada número queda marcado según cuánto puedes confiar en él.</text>
      </Scene>

      {/* 2 · leaks */}
      <Scene i={1} still={still}>
        {[
          ['Cotizaciones sin seguimiento', 300, '$2,4 M / mes'],
          ['Horas manuales repetidas', 220, '$1,6 M / mes'],
          ['Respuestas fuera de horario', 140, '$0,9 M / mes'],
        ].map(([label, w, val], k) => (
          <g key={String(label)} transform={`translate(70 ${108 + k * 68})`}>
            <text x="0" y="14" fontSize="13" fill="#cbd5e1">{label}</text>
            <rect y="24" width="500" height="18" rx="9" fill="#0d1424" />
            <rect y="24" width={still ? Number(w) : 0} height="18" rx="9" fill="url(#ebsg)">
              {!still && <A attr="width" from={0} to={Number(w)} start={SCENE + 0.4 + k * 0.9} end={SCENE + 1.6 + k * 0.9} />}
            </rect>
            <text x="500" y="14" fontSize="13" fill="#f87171" textAnchor="end" opacity={still ? 1 : 0}>
              {money(String(val))}
              {!still && <A attr="opacity" from={0} to={1} start={SCENE + 1.4 + k * 0.9} end={SCENE + 1.8 + k * 0.9} />}
            </text>
          </g>
        ))}
        <text x="320" y="330" textAnchor="middle" fontSize="12" fill="#7e8aa3">Fórmulas por industria, alimentadas con tus datos.</text>
      </Scene>

      {/* 3 · switches */}
      <Scene i={2} still={still}>
        {['Seguimiento automático por WhatsApp', 'Cotizador y registro de ventas', 'Asistente de atención 24/7'].map((label, k) => (
          <g key={label} transform={`translate(70 ${100 + k * 58})`}>
            <rect width="500" height="46" rx="12" fill="#0d1424" stroke="#ffffff1a" />
            <text x="20" y="28" fontSize="13" fill="#e2e8f0">{label}</text>
            <rect x="436" y="12" width="44" height="22" rx="11" fill="#334155">
              {!still && <A attr="fill" from="#334155" to="#34d399" start={2 * SCENE + 0.6 + k * 1} end={2 * SCENE + 0.8 + k * 1} />}
            </rect>
            {still && <rect x="436" y="12" width="44" height="22" rx="11" fill="#34d399" />}
            <circle cx={still ? 469 : 447} cy="23" r="8" fill="#fff">
              {!still && <A attr="cx" from={447} to={469} start={2 * SCENE + 0.6 + k * 1} end={2 * SCENE + 0.8 + k * 1} />}
            </circle>
          </g>
        ))}
        <g transform="translate(70 285)">
          <rect width="500" height="52" rx="12" fill="#0d1424" stroke="#34d39955" />
          <text x="20" y="22" fontSize="11" fill="#7e8aa3">AHORRO MENSUAL ESTIMADO</text>
          <rect x="20" y="31" width="460" height="10" rx="5" fill="#1e293b" />
          <rect x="20" y="31" width={still ? 400 : 0} height="10" rx="5" fill="#34d399">
            {!still && <A attr="width" from={0} to={400} start={2 * SCENE + 0.6} end={2 * SCENE + 3.6} />}
          </rect>
        </g>
      </Scene>

      {/* 4 · simulator */}
      <Scene i={3} still={still}>
        <g transform="translate(70 100)">
          <text y="12" fontSize="12" fill="#cbd5e1">Si cierras más cotizaciones…</text>
          <rect y="24" width="500" height="6" rx="3" fill="#1e293b" />
          <rect y="24" width={still ? 250 : 120} height="6" rx="3" fill="url(#ebsg)">
            {!still && <A attr="width" from={120} to={330} start={3 * SCENE + 0.6} end={3 * SCENE + 3.4} />}
          </rect>
          <circle cx={still ? 250 : 120} cy="27" r="9" fill="#fff">
            {!still && <A attr="cx" from={120} to={330} start={3 * SCENE + 0.6} end={3 * SCENE + 3.4} />}
          </circle>
        </g>
        <g transform="translate(70 160)">
          <rect width="500" height="150" rx="14" fill="#0d1424" stroke="#ffffff1a" />
          <polyline
            points="30,120 110,112 190,98 270,78 350,56 430,36 470,26"
            fill="none"
            stroke="url(#ebsg)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={still ? 0 : 1}
          >
            {!still && <A attr="stroke-dashoffset" from={1} to={0} start={3 * SCENE + 0.5} end={3 * SCENE + 3.5} />}
          </polyline>
          <text x="28" y="24" fontSize="11" fill="#7e8aa3">RETORNO A 12 MESES</text>
          <text x="472" y="140" fontSize="11" fill="#7e8aa3" textAnchor="end">Se recalcula al mover cada número</text>
        </g>
        <text x="320" y="345" textAnchor="middle" fontSize="12" fill="#7e8aa3">Sin esperar otro documento: decides con la pantalla.</text>
      </Scene>

      {/* progress */}
      <rect x="70" y="364" width="500" height="3" rx="1.5" fill="#1e293b" />
      <rect x="70" y="364" width={still ? 500 : 0} height="3" rx="1.5" fill="url(#ebsg)">
        {!still && <animate attributeName="width" values="0;500" dur={`${CYCLE}s`} repeatCount="indefinite" />}
      </rect>
    </svg>
  );
}
