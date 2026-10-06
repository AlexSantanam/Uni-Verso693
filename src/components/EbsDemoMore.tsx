import { useEffect, useState, type ReactNode } from 'react';

const CYCLE = 12;

const useStill = () => {
  const [still, setStill] = useState(false);
  useEffect(() => {
    try {
      setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch {
      /* keep animated */
    }
  }, []);
  return still;
};

/** Animates an attribute between two moments of the loop and holds it. With reduced motion nothing is rendered (the static value is the final one). */
function A({ still, attr, from, to, start, end }: { still: boolean; attr: string; from: number | string; to: number | string; start: number; end: number }) {
  if (still) return null;
  return <animate attributeName={attr} values={`${from};${from};${to};${to}`} keyTimes={`0;${start / CYCLE};${end / CYCLE};1`} dur={`${CYCLE}s`} repeatCount="indefinite" />;
}

const Frame = ({ label, children }: { label: string; children: ReactNode }) => (
  <svg viewBox="0 0 640 380" role="img" aria-label={label} className="w-full h-auto rounded-3xl border border-white/10 bg-[#060a14]" fontFamily="Inter, system-ui, sans-serif">
    <defs>
      <linearGradient id="ebsg2" x1="0" x2="1">
        <stop offset="0" stopColor="#7c5cff" />
        <stop offset="1" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="640" height="34" fill="#0d1424" />
    <circle cx="18" cy="17" r="5" fill="#ff5f57" />
    <circle cx="36" cy="17" r="5" fill="#febc2e" />
    <circle cx="54" cy="17" r="5" fill="#28c840" />
    <rect x="150" y="8" width="340" height="18" rx="9" fill="#060a14" />
    <text x="320" y="21" textAnchor="middle" fontSize="10" fill="#7e8aa3">universo693.com/ebs/tu-empresa-…</text>
    {children}
  </svg>
);

/**
 * Diagram: a replica of the interactive page. The company map on the left (areas in the order a customer goes through
 * them, leaks in red), the impact panel on the right. A cursor clicks the solutions one by one: the leak turns green,
 * the flow speeds up, the numbers change, and the camera finally zooms out to the whole company.
 */
export function EbsDiagramAnim() {
  const still = useStill();
  const C = 18;
  const RED = '#f87171';
  const GREEN = '#34d399';
  const CYAN = '#22d3ee';
  const S = 0.3;
  const ZS = 13.2;
  const ZE = 16.2;
  const W = 128;
  const X = [14, 166, 318];
  const nodes = [
    { x: X[0], y: 108, label: 'Secretaría', hint: 'Toma pedidos', chip: { cap: 'Oportunidad', title: 'Asistente WhatsApp', t: 3.6 } },
    { x: X[1], y: 108, label: 'Cotización', hint: 'Precio por ruta', chip: null },
    { x: X[2], y: 108, label: 'Planificador', hint: 'Qué camión sale', chip: { cap: 'Fuga: retornos vacíos', title: 'Cargas de retorno', t: 6.1 } },
    { x: X[2], y: 222, label: 'Carga en bodega', hint: 'Carga y esperas', chip: { cap: 'Fuga: esperas en carga', title: 'Control de esperas', t: 8.6 } },
    { x: X[1], y: 222, label: 'Flota y choferes', hint: 'Camiones en ruta', chip: null },
    { x: X[0], y: 222, label: 'Cobranza', hint: 'Factura y cobra', chip: { cap: 'Oportunidad', title: 'Cobranza automática', t: 11.1 } },
  ];
  const edges = [
    { d: 'M234 100 V104 H78 V108', head: '74,102 82,102 78,108', t: 3.6 },
    { d: 'M142 128 H166', head: '161,124 167,128 161,132', t: 3.6 },
    { d: 'M294 128 H318', head: '313,124 319,128 313,132', t: 6.1 },
    { d: 'M382 186 V222', head: '378,216 386,216 382,222', t: 6.1 },
    { d: 'M318 242 H294', head: '299,238 293,242 299,246', t: 8.6 },
    { d: 'M166 242 H142', head: '147,238 141,242 147,246', t: 11.1 },
  ];
  const lv = [0, 3.6, 6.1, 8.6, 11.1, C];
  const an = (attr: string, from: number | string, to: number | string, start: number, end: number) =>
    still ? null : <animate attributeName={attr} values={`${from};${from};${to};${to}`} keyTimes={`0;${start / C};${end / C};1`} dur={`${C}s`} repeatCount="indefinite" />;
  const flowing = (speed: string) => (still ? null : <animate attributeName="stroke-dashoffset" from="0" to="-10" dur={speed} repeatCount="indefinite" />);
  const fade = (visible: number) => (still ? visible : 0);
  // a group visible only while `L` solutions are on
  const levelAnim = (L: number) => {
    if (still) return null;
    const a = lv[L];
    const b = lv[L + 1];
    const e = 0.15;
    if (L === 0) return <animate attributeName="opacity" values="1;1;0;0" keyTimes={`0;${(b - e) / C};${b / C};1`} dur={`${C}s`} repeatCount="indefinite" />;
    if (L === 4) return <animate attributeName="opacity" values="0;0;1;1" keyTimes={`0;${a / C};${(a + e) / C};1`} dur={`${C}s`} repeatCount="indefinite" />;
    return <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={`0;${a / C};${(a + e) / C};${(b - e) / C};${b / C};1`} dur={`${C}s`} repeatCount="indefinite" />;
  };
  const levelOpacity = (L: number) => (still ? (L === 4 ? 1 : 0) : L === 0 ? 1 : 0);

  const recup = ['$0', '$6,2 M', '$17,5 M', '$29,0 M', '$39,7 M'];
  const payback = ['—', '3,4 meses', '2,6 meses', '2,3 meses', '2,1 meses'];
  const roi = ['—', '210 %', '330 %', '390 %', '482 %'];

  // the rest of the company: more groups of areas around the first one
  const offs = [[-468, -290], [0, -290], [468, -290], [-468, 0], [468, 0], [-468, 290], [0, 290], [468, 290]];
  const cluster = (dx: number, dy: number, n: number) => (
    <g key={`${dx}:${dy}`} transform={`translate(${dx} ${dy})`}>
      {nodes.map((nd, i) => {
        const open = (n + i) % 3 === 0;
        return <rect key={i} x={nd.x} y={nd.y} width={W} height={nd.chip ? 78 : 44} rx="9" fill={open ? '#0d1424' : '#0a1f1a'} stroke={open ? RED : GREEN} />;
      })}
      {edges.slice(1).map((e, i) => <path key={i} d={e.d} fill="none" stroke={(n + i) % 3 === 0 ? CYAN : GREEN} strokeWidth="3" />)}
    </g>
  );

  // the cursor: clicks the "+" of each red card, then leaves
  const click = nodes.filter((n) => n.chip).map((n) => ({ x: n.x + W - 17, y: n.y + 55, t: n.chip!.t }));
  const waypoints = [{ x: 330, y: 318, t: 0.6 }, ...click.flatMap((c) => [{ x: c.x, y: c.y, t: c.t - 0.7 }, { x: c.x, y: c.y, t: c.t + 0.1 }]), { x: 330, y: 318, t: 12.8 }];
  const cursorValues = ['330 318', ...waypoints.map((w) => `${w.x} ${w.y}`), '330 318'].join(';');
  const cursorTimes = [0, ...waypoints.map((w) => w.t / C), 1].join(';');

  return (
    <Frame label="Animación de ejemplo: el mapa de una empresa en la página interactiva. Un cursor activa las soluciones una a una, las fugas en rojo pasan a verde, el flujo se acelera, el panel de impacto cambia sus cifras y la vista se aleja para mostrar la empresa completa.">
      <defs>
        <clipPath id="ebsclip3">
          <rect x="0" y="34" width="450" height="300" />
        </clipPath>
        <linearGradient id="ebsg3" x1="0" x2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* canvas */}
      <rect x="0" y="34" width="450" height="300" fill="#070b16" />
      <g clipPath="url(#ebsclip3)">
        <g transform={still ? `translate(${230 * (1 - S)} ${185 * (1 - S)}) scale(${S})` : undefined}>
          {!still && (
            <>
              <animateTransform attributeName="transform" type="translate" values={`0 0;0 0;${230 * (1 - S)} ${185 * (1 - S)};${230 * (1 - S)} ${185 * (1 - S)}`} keyTimes={`0;${ZS / C};${ZE / C};1`} dur={`${C}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" additive="sum" values={`1;1;${S};${S}`} keyTimes={`0;${ZS / C};${ZE / C};1`} dur={`${C}s`} repeatCount="indefinite" />
            </>
          )}
          <g opacity={fade(1)}>
            {an('opacity', 0, 1, ZS, ZE)}
            {offs.map(([dx, dy], i) => cluster(dx, dy, i))}
          </g>
          {/* entry: the customer calls or visits, and the total that leaks */}
          <rect x="170" y="58" width={W} height="42" rx="9" fill="#0f172a" stroke={CYAN} strokeWidth="1.8" />
          <text x="180" y="71" fontSize="6" fontWeight={700} fill="#94a3b8" letterSpacing="1">TUS CLIENTES</text>
          <text x="180" y="83" fontSize="9.5" fontWeight={800} fill="#fff">Transportes Demo</text>
          <text x="180" y="95" fontSize="8.5" fontWeight={800} fill={RED}>$328 M se escapan al mes</text>
          {/* flow: slow cyan until solved, then green and fast */}
          {edges.map((e, i) => (
            <g key={i}>
              <path d={e.d} fill="none" stroke={CYAN} strokeWidth="2.6" strokeDasharray="6 4" opacity={still ? 0 : 1}>
                {flowing('2.4s')}
                {an('opacity', 1, 0, e.t, e.t + 0.4)}
              </path>
              <polygon points={e.head} fill={CYAN} opacity={still ? 0 : 1}>{an('opacity', 1, 0, e.t, e.t + 0.4)}</polygon>
              <path d={e.d} fill="none" stroke={GREEN} strokeWidth="3" strokeDasharray="6 4" opacity={fade(1)}>
                {flowing('0.5s')}
                {an('opacity', 0, 1, e.t, e.t + 0.4)}
              </path>
              <polygon points={e.head} fill={GREEN} opacity={fade(1)}>{an('opacity', 0, 1, e.t, e.t + 0.4)}</polygon>
            </g>
          ))}
          {/* areas */}
          {nodes.map((nd, i) => (
            <g key={i}>
              <rect x={nd.x} y={nd.y} width={W} height={nd.chip ? 78 : 44} rx="9" fill="#0b1220" stroke={still ? GREEN : CYAN} strokeWidth="1.3" strokeOpacity="0.8" />
              <rect x={nd.x + 8} y={nd.y + 8} width="20" height="20" rx="6" fill="#22d3ee" fillOpacity="0.16" />
              <rect x={nd.x + 13} y={nd.y + 14} width="10" height="2.4" rx="1.2" fill={CYAN} />
              <rect x={nd.x + 13} y={nd.y + 19} width="7" height="2.4" rx="1.2" fill={CYAN} />
              <text x={nd.x + 34} y={nd.y + 18} fontSize="10" fontWeight={800} fill="#fff">{nd.label}</text>
              <text x={nd.x + 34} y={nd.y + 28} fontSize="6.6" fill="#94a3b8">{nd.hint}</text>
              {nd.chip && (
                <>
                  <g opacity={fade(0)}>
                    {an('opacity', 0, 1, 1.6 + i * 0.12, 2.2 + i * 0.12)}
                    {an('opacity', 1, 0, nd.chip.t, nd.chip.t + 0.4)}
                    <rect x={nd.x + 6} y={nd.y + 38} width={W - 12} height="34" rx="7" fill="#f8717118" stroke={RED} strokeOpacity="0.55" />
                    <text x={nd.x + 13} y={nd.y + 50} fontSize="5.6" fontWeight={800} fill="#fca5a5" letterSpacing="0.4">{nd.chip.cap.toUpperCase()}</text>
                    <text x={nd.x + 13} y={nd.y + 63} fontSize="8.6" fontWeight={800} fill="#fff">{nd.chip.title}</text>
                    <circle cx={nd.x + W - 17} cy={nd.y + 55} r="8" fill="#f87171" />
                    <text x={nd.x + W - 17} y={nd.y + 59} textAnchor="middle" fontSize="11" fontWeight={900} fill="#450a0a">+</text>
                  </g>
                  <g opacity={fade(1)}>
                    {an('opacity', 0, 1, nd.chip.t, nd.chip.t + 0.4)}
                    <rect x={nd.x + 6} y={nd.y + 38} width={W - 12} height="34" rx="7" fill="#34d39918" stroke={GREEN} strokeOpacity="0.6" />
                    <text x={nd.x + 13} y={nd.y + 50} fontSize="5.6" fontWeight={800} fill="#6ee7b7" letterSpacing="0.4">RESUELTO CON IA</text>
                    <text x={nd.x + 13} y={nd.y + 63} fontSize="8.6" fontWeight={800} fill="#fff">{nd.chip.title}</text>
                    <circle cx={nd.x + W - 17} cy={nd.y + 55} r="8" fill="#34d399" />
                    <path d={`M${nd.x + W - 21} ${nd.y + 55} l3 3 l5 -6`} fill="none" stroke="#052e1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </>
              )}
            </g>
          ))}
        </g>
      </g>

      {/* canvas controls, as on the page */}
      <rect x="10" y="40" width="148" height="16" rx="8" fill="#0b1220" stroke="#fbbf24" strokeOpacity="0.6" />
      <text x="84" y="51" textAnchor="middle" fontSize="6.8" fontWeight={700} fill="#fde68a">+ ¿Falta un área? Agrégala</text>
      <rect x="296" y="40" width="148" height="16" rx="8" fill="#0b1220" stroke="#ffffff22" />
      <rect x="298" y="42" width="90" height="12" rx="6" fill="url(#ebsg3)" />
      <text x="343" y="51" textAnchor="middle" fontSize="6.8" fontWeight={700} fill="#fff">Mapa de la empresa</text>
      <text x="416" y="51" textAnchor="middle" fontSize="6.8" fontWeight={700} fill="#94a3b8">Por etapas</text>
      <g transform="translate(50 318)">
        <rect width="350" height="16" rx="8" fill="#0b1220" stroke="#ffffff1a" />
        <circle cx="16" cy="8" r="3" fill={RED} /><text x="23" y="10.5" fontSize="6.4" fill="#cbd5e1">Fuga abierta</text>
        <circle cx="86" cy="8" r="3" fill={GREEN} /><text x="93" y="10.5" fontSize="6.4" fill="#cbd5e1">Resuelto con IA</text>
        <rect x="176" y="7" width="14" height="2" fill={CYAN} /><text x="194" y="10.5" fontSize="6.4" fill="#cbd5e1">Camino del cliente</text>
        <rect x="268" y="7" width="3" height="2" fill="#64748b" /><rect x="274" y="7" width="3" height="2" fill="#64748b" /><rect x="280" y="7" width="3" height="2" fill="#64748b" /><text x="288" y="10.5" fontSize="6.4" fill="#cbd5e1">Apoya a otra área</text>
      </g>

      {/* impact panel */}
      <rect x="458" y="42" width="176" height="284" rx="11" fill="#0a1424" stroke={CYAN} strokeOpacity="0.5" />
      <rect x="458" y="42" width="176" height="3" rx="1.5" fill="url(#ebsg3)" />
      <text x="470" y="62" fontSize="6.6" fontWeight={800} fill={CYAN} letterSpacing="1">IMPACTO CON LO QUE ACTIVASTE</text>
      {[0, 1, 2, 3, 4].map((L) => (
        <g key={L} opacity={levelOpacity(L)}>
          {levelAnim(L)}
          <text x="470" y="88" fontSize="19" fontWeight={900} fill="#fff">{L}</text>
          <text x="486" y="87" fontSize="8" fill="#94a3b8">de 4 soluciones activadas</text>
          <text x="470" y="132" fontSize="8.5" fill="#94a3b8">Recuperas</text>
          <text x="622" y="132" textAnchor="end" fontSize="9" fontWeight={800} fill={GREEN}>{recup[L]}/mes</text>
          <text x="470" y="196" fontSize="11" fontWeight={900} fill={GREEN}>Se recupera en</text>
          <text x="622" y="196" textAnchor="end" fontSize="11" fontWeight={900} fill={GREEN}>{payback[L]}</text>
          <text x="470" y="218" fontSize="11" fontWeight={900} fill={GREEN}>Retorno a 12 meses</text>
          <text x="622" y="218" textAnchor="end" fontSize="11" fontWeight={900} fill={GREEN}>{roi[L]}</text>
          <rect x="470" y="276" width="152" height="28" rx="14" fill="url(#ebsg3)" opacity={L === 0 ? 0.4 : 1} />
          <text x="546" y="293" textAnchor="middle" fontSize="7.8" fontWeight={800} fill="#fff">{L === 0 ? 'Quiero avanzar con mis soluciones' : `Quiero avanzar con ${L} solución${L > 1 ? 'es' : ''}`}</text>
        </g>
      ))}
      <text x="470" y="110" fontSize="8.5" fill="#94a3b8">Se escapan hoy</text>
      <text x="622" y="110" textAnchor="end" fontSize="9" fontWeight={800} fill={RED}>$328 M/mes</text>
      <line x1="470" y1="150" x2="622" y2="150" stroke="#ffffff1a" />
      <text x="470" y="170" fontSize="8.5" fill="#94a3b8">Mantención mensual</text>
      <text x="622" y="170" textAnchor="end" fontSize="9" fill="#cbd5e1">−$2,4 M/mes</text>
      <text x="470" y="244" fontSize="6.2" fill="#64748b">Cifras de ejemplo: el valor del diagnóstico</text>
      <text x="470" y="253" fontSize="6.2" fill="#64748b">se descuenta del proyecto si avanzas.</text>

      {/* cursor and click ripples */}
      {!still && (
        <>
          <g>
            <animateTransform attributeName="transform" type="translate" values={cursorValues} keyTimes={cursorTimes} dur={`${C}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;1;0;0" keyTimes={`0;${12.2 / C};${12.9 / C};1`} dur={`${C}s`} repeatCount="indefinite" />
            <polygon points="0,0 0,14 3.8,10.8 6.6,16.6 9.2,15.4 6.4,9.6 11,9.4" fill="#fff" stroke="#0b1220" strokeWidth="1" />
          </g>
          {click.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="0" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0">
              <animate attributeName="r" values="0;0;13;13" keyTimes={`0;${(c.t - 0.25) / C};${(c.t + 0.35) / C};1`} dur={`${C}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes={`0;${(c.t - 0.25) / C};${(c.t - 0.2) / C};${(c.t + 0.35) / C};1`} dur={`${C}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </>
      )}

      {/* captions under the canvas */}
      <rect x="0" y="334" width="640" height="46" fill="#060a14" />
      {[
        { text: 'El mapa de tu empresa, en el orden en que pasa un cliente', a: 0, b: 3.4 },
        { text: 'Activas una solución: la fuga pasa a verde, el flujo se acelera y el impacto se recalcula', a: 3.4, b: 12.8 },
        { text: 'Y ves tu empresa completa', a: 12.8, b: C },
      ].map((c, i) => (
        <text key={i} x="320" y="362" textAnchor="middle" fontSize="12.5" fontWeight={800} fill="#fff" opacity={still ? (i === 1 ? 1 : 0) : i === 0 ? 1 : 0}>
          {c.text}
          {!still && (
            <animate
              attributeName="opacity"
              values={i === 0 ? '1;1;0;0' : i === 2 ? '0;0;1;1' : '0;0;1;1;0;0'}
              keyTimes={i === 0 ? `0;${(c.b - 0.3) / C};${c.b / C};1` : i === 2 ? `0;${c.a / C};${(c.a + 0.3) / C};1` : `0;${c.a / C};${(c.a + 0.3) / C};${(c.b - 0.3) / C};${c.b / C};1`}
              dur={`${C}s`}
              repeatCount="indefinite"
            />
          )}
        </text>
      ))}
    </Frame>
  );
}

/** Real-time answers: each answer typed during the conversation feeds the calculation. */
export function EbsLiveAnim() {
  const still = useStill();
  const rows: [string, string, number, string][] = [
    ['¿Cuántas cotizaciones envían al mes?', '120', 120, '#34d399'],
    ['¿Cuántas se cierran?', '18 %', 90, '#fbbf24'],
    ['¿Ticket promedio?', '$450.000', 200, '#f87171'],
  ];
  const t0 = (k: number) => 1 + k * 3.2;
  return (
    <Frame label="Animación de ejemplo: mientras se conversa, cada respuesta se escribe en su campo y el cálculo de las fugas se actualiza en tiempo real.">
      <text x="320" y="62" textAnchor="middle" fontSize="15" fontWeight={800} fill="#fff">Respondes y el cálculo se actualiza en vivo</text>
      <text x="40" y="92" fontSize="10" fill="#7e8aa3">LA CONVERSACIÓN</text>
      <text x="360" y="92" fontSize="10" fill="#7e8aa3">FUGAS CALCULADAS</text>
      {rows.map(([q, a, , c], k) => (
        <g key={q} transform={`translate(30 ${104 + k * 62})`}>
          <rect width="300" height="52" rx="12" fill="#0d1424" stroke="#ffffff1a" />
          <text x="14" y="20" fontSize="11" fill="#94a3b8">{q}</text>
          <text x="14" y="40" fontSize="15" fontWeight={800} fill="#fff" opacity={still ? 1 : 0}>
            {a}
            <A still={still} attr="opacity" from={0} to={1} start={t0(k)} end={t0(k) + 0.5} />
          </text>
          <rect x="226" y="30" width="62" height="16" rx="8" fill={c} opacity="0.18" />
          <text x="257" y="42" fontSize="9" fontWeight={700} fill={c} textAnchor="middle">
            {k === 0 ? 'real' : k === 1 ? 'estimado' : 'supuesto'}
          </text>
        </g>
      ))}
      {/* result panel */}
      <g transform="translate(350 104)">
        <rect width="260" height="176" rx="14" fill="#0d1424" stroke="#34d39944" />
        {[
          ['Sin seguimiento', 150],
          ['Horas manuales', 110],
          ['Fuera de horario', 70],
        ].map(([l, w], k) => (
          <g key={String(l)} transform={`translate(18 ${22 + k * 44})`}>
            <text fontSize="11" fill="#cbd5e1">{l}</text>
            <rect y="8" width="224" height="10" rx="5" fill="#1e293b" />
            <rect y="8" width={still ? Number(w) : 0} height="10" rx="5" fill="url(#ebsg2)">
              <A still={still} attr="width" from={0} to={Number(w)} start={t0(k) + 0.5} end={t0(k) + 1.5} />
            </rect>
          </g>
        ))}
        <text x="18" y="164" fontSize="11" fill="#7e8aa3">Cada respuesta mueve el resultado</text>
      </g>
      <text x="320" y="318" textAnchor="middle" fontSize="12" fill="#7e8aa3">Lo que aún no se sabe queda como “por medir” dentro del plan.</text>
      <rect x="70" y="364" width="500" height="3" rx="1.5" fill="#1e293b" />
      <rect x="70" y="364" width={still ? 500 : 0} height="3" rx="1.5" fill="url(#ebsg2)">
        {!still && <animate attributeName="width" values="0;500" dur={`${CYCLE}s`} repeatCount="indefinite" />}
      </rect>
    </Frame>
  );
}
