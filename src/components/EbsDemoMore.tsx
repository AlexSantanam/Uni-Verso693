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

/** Diagram: red leaks turn green as solutions are switched on, then the camera zooms out to the whole company. */
export function EbsDiagramAnim() {
  const still = useStill();
  const leaks = ['Cotizaciones sin seguimiento', 'Horas manuales repetidas', 'Respuestas fuera de horario'];
  const sols = ['Seguimiento por WhatsApp', 'Cotizador y registro', 'Asistente 24/7'];
  const ys = [90, 170, 250];
  const t0 = (k: number) => 1 + k * 1.4;
  const RED = '#f87171';
  const GREEN = '#34d399';
  const S = 0.27;
  const ZS = 5.2;
  const ZE = 8.2;
  // the rest of the company: more clusters around the first one (a mix of solved and open leaks)
  const clusters: { dx: number; dy: number; c: string[] }[] = [];
  const offs = [[-620, -300], [0, -300], [620, -300], [-620, 0], [620, 0], [-620, 300], [0, 300], [620, 300]];
  offs.forEach(([dx, dy], n) => clusters.push({ dx, dy, c: [0, 1, 2].map((r) => ((n + r) % 3 === 0 ? RED : GREEN)) }));
  const fade = (from: number, to: number) => (still ? to : from);
  return (
    <Frame label="Animación de ejemplo: en el diagrama interactivo las fugas en rojo pasan a verde al activar cada solución, y luego la vista se aleja para mostrar el diagrama completo de la empresa.">
      <g clipPath="url(#ebsclip)">
        <defs>
          <clipPath id="ebsclip">
            <rect x="0" y="34" width="640" height="346" />
          </clipPath>
        </defs>
        <g transform={still ? `translate(${320 * (1 - S)} ${205 * (1 - S)}) scale(${S})` : undefined}>
          {!still && (
            <>
              <animateTransform attributeName="transform" type="translate" values={`0 0;0 0;${320 * (1 - S)} ${205 * (1 - S)};${320 * (1 - S)} ${205 * (1 - S)}`} keyTimes={`0;${ZS / CYCLE};${ZE / CYCLE};1`} dur={`${CYCLE}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" additive="sum" values={`1;1;${S};${S}`} keyTimes={`0;${ZS / CYCLE};${ZE / CYCLE};1`} dur={`${CYCLE}s`} repeatCount="indefinite" />
            </>
          )}
          {/* the rest of the company */}
          <g opacity={fade(0, 1)}>
            <A still={still} attr="opacity" from={0} to={1} start={ZS} end={ZE} />
            {clusters.map((cl, i) => (
              <g key={i} transform={`translate(${cl.dx} ${cl.dy})`}>
                {ys.map((y, r) => (
                  <g key={r}>
                    <rect x="30" y={y} width="210" height="50" rx="12" fill="#0d1424" stroke={cl.c[r]} />
                    <rect x="46" y={y + 18} width={90 + ((i * 17 + r * 31) % 70)} height="8" rx="4" fill="#334155" />
                    <line x1="240" y1={y + 25} x2="400" y2={y + 25} strokeWidth="3" strokeLinecap="round" stroke={cl.c[r]} />
                    <rect x="400" y={y} width="210" height="50" rx="12" fill={cl.c[r] === GREEN ? '#34d39922' : '#0d1424'} stroke={cl.c[r] === GREEN ? GREEN : '#334155'} />
                    <rect x="416" y={y + 18} width={80 + ((i * 23 + r * 13) % 80)} height="8" rx="4" fill="#334155" />
                  </g>
                ))}
              </g>
            ))}
          </g>
          {/* the first cluster, the one that changes */}
          {ys.map((y, k) => (
            <g key={k}>
              <rect x="30" y={y} width="210" height="50" rx="12" fill="#0d1424" stroke={still ? GREEN : RED}>
                <A still={still} attr="stroke" from={RED} to={GREEN} start={t0(k)} end={t0(k) + 0.4} />
              </rect>
              <text x="46" y={y + 30} fontSize="12" fill="#e2e8f0">{leaks[k]}</text>
              <line x1="240" y1={y + 25} x2="400" y2={y + 25} strokeWidth="3" strokeLinecap="round" stroke={still ? GREEN : '#334155'}>
                <A still={still} attr="stroke" from="#334155" to={GREEN} start={t0(k)} end={t0(k) + 0.4} />
              </line>
              <rect x="400" y={y} width="210" height="50" rx="12" fill={still ? '#34d39922' : '#0d1424'} stroke={still ? GREEN : '#334155'}>
                <A still={still} attr="stroke" from="#334155" to={GREEN} start={t0(k)} end={t0(k) + 0.4} />
                <A still={still} attr="fill" from="#0d1424" to="#34d39922" start={t0(k)} end={t0(k) + 0.4} />
              </rect>
              <text x="416" y={y + 30} fontSize="12" fill="#e2e8f0">{sols[k]}</text>
            </g>
          ))}
        </g>
      </g>

      {/* captions (outside the zoom) */}
      <text x="320" y="62" textAnchor="middle" fontSize="15" fontWeight={800} fill="#fff" opacity={fade(1, 0)}>
        Activas una solución y la fuga pasa de rojo a verde
        <A still={still} attr="opacity" from={1} to={0} start={ZS} end={ZS + 0.6} />
      </text>
      <text x="320" y="62" textAnchor="middle" fontSize="15" fontWeight={800} fill="#fff" opacity={fade(0, 1)}>
        Y ves el diagrama completo de tu empresa
        <A still={still} attr="opacity" from={0} to={1} start={ZE - 0.8} end={ZE} />
      </text>
      <g transform="translate(30 330)" opacity={fade(1, 0)}>
        <A still={still} attr="opacity" from={1} to={0} start={ZS} end={ZS + 0.6} />
        <rect width="580" height="36" rx="12" fill="#0d1424" stroke="#ffffff1a" />
        <text x="16" y="15" fontSize="9" fill="#7e8aa3">AHORRO MENSUAL</text>
        <rect x="16" y="21" width="300" height="8" rx="4" fill="#1e293b" />
        <rect x="16" y="21" width={still ? 300 : 0} height="8" rx="4" fill="url(#ebsg2)">
          {!still && <animate attributeName="width" values="0;0;100;100;200;200;300;300" keyTimes={`0;${t0(0) / CYCLE};${(t0(0) + 0.6) / CYCLE};${t0(1) / CYCLE};${(t0(1) + 0.6) / CYCLE};${t0(2) / CYCLE};${(t0(2) + 0.6) / CYCLE};1`} dur={`${CYCLE}s`} repeatCount="indefinite" />}
        </rect>
        <text x="564" y="25" textAnchor="end" fontSize="11" fontWeight={700} fill="#fff">Retorno y plazo se recalculan al instante</text>
      </g>
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
