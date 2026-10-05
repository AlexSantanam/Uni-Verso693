import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Background, BackgroundVariant, Controls, Handle, MiniMap, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AlertTriangle, ArrowRight, Check, CheckCircle2, Download, Loader2, Monitor, PlayCircle, RotateCcw, Zap } from 'lucide-react';

// Interactive EBS 693: the page a client opens from a private link (/ebs/<token>, 30 days).
// Every opportunity is a node: red = the leak stays open, green = solved with the proposal.
// The numbers come precomputed from api/admin.ts (action ebs-view); here we only add up what is switched on.

type Confidence = 'real' | 'estimado' | 'supuesto';
interface ViewOpp {
  id: string;
  title: string;
  description: string;
  approach: string;
  stage: 1 | 2 | 3;
  impact: string;
  effort: string;
  assumptions: string;
  hoursSavedMonth: number;
  savingMonth: number;
  monthlyCost: number;
  investment: number;
  hoursWeek: number;
  hourlyCost: number;
  automationPct: number;
  recoveryPct: number;
  leakBase: number;
  leakLabel: string;
  leakMonthly: number;
  confidence: Confidence | null;
}
interface View {
  number: string;
  company: string;
  contact: string;
  sessionDate: string;
  loomUrl: string;
  summary: string;
  approach: string;
  expiresAt: string;
  leakMonth: number;
  cashTrapped: number;
  leaks: { key: string; label: string; kind: 'perdida' | 'caja'; monthly: number; confidence: Confidence; explain: string }[];
  toMeasure: string[];
  site: { host: string; summary: string; findings: string[]; primary: string | null; secondary: string | null } | null;
  opportunities: ViewOpp[];
  choice: string[] | null;
  choiceAdj: Adj | null;
}

/** The client's tweaks to the assumptions of a solution (percentages, 0 to 100). */
type Adj = Record<string, { rec?: number; auto?: number }>;
/** Same formula as the server (savingOf in api/admin.ts): hours freed + share of the leak recovered. */
const withAdj = (o: ViewOpp, a?: { rec?: number; auto?: number }): ViewOpp => {
  const hoursSaved = (o.hoursWeek * 4.33 * (a?.auto ?? o.automationPct)) / 100;
  return { ...o, hoursSavedMonth: Math.round(hoursSaved), savingMonth: Math.round(hoursSaved * o.hourlyCost + (o.leakBase * (a?.rec ?? o.recoveryPct)) / 100) };
};

const clp = (n: number) => `$${Math.round(n).toLocaleString('es-CL')}`;
const months = (m: number | null) => (m === null ? '—' : m < 1 ? 'menos de 1 mes' : `${m.toFixed(1).replace('.', ',')} meses`);
const STAGES: Record<number, { label: string; when: string }> = {
  1: { label: 'Etapa 1 · Victorias rápidas', when: '0 a 30 días' },
  2: { label: 'Etapa 2 · Consolidación', when: '1 a 3 meses' },
  3: { label: 'Etapa 3 · Escala', when: '3 a 6 meses' },
};
const CONF: Record<Confidence, { label: string; cls: string }> = {
  real: { label: 'dato real', cls: 'border-emerald-400/40 text-emerald-300' },
  estimado: { label: 'estimado por el cliente', cls: 'border-cyan-300/40 text-cyan-200' },
  supuesto: { label: 'supuesto a validar', cls: 'border-amber-300/40 text-amber-200' },
};

// brand fusion: our violet next to the client's own color (lightened if it is too dark for this background)
const hslToHex = (h: number, s: number, l: number) => {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return `#${[f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
};
const onDark = (hex: string | null | undefined, fallback: string) => {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return fallback;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const sat = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  const hue = d ? ((max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60 + 360) % 360 : 0;
  return l >= 0.55 ? hex : hslToHex(hue, Math.max(sat, 0.5), 0.62);
};

/** Upper limit of a tweak: three times the original assumption (at least 30%, at most 100%), so a slider can't promise the impossible. */
const sliderMax = (original: number) => Math.min(100, Math.max(30, Math.round(original * 3)));

const SliderRow = ({ label, value, original, accent, onChange }: { label: string; value: number; original: number; accent: string; onChange: (v: number | undefined) => void }) => (
  <label className="block text-xs text-slate-400">
    <span className="flex items-baseline justify-between gap-3">
      <span>{label}</span>
      <span className="text-base font-black text-white">{value}%</span>
    </span>
    <input type="range" min={0} max={sliderMax(original)} step={1} value={Math.min(value, sliderMax(original))} onChange={(e) => onChange(Number(e.target.value))} className="mt-1.5 w-full cursor-pointer" style={{ accentColor: accent }} />
    <span className="flex items-center justify-between text-[11px] text-slate-500">
      <span>Supuesto original: {original}% · máximo {sliderMax(original)}%</span>
      {value !== original && (
        <button type="button" onClick={() => onChange(undefined)} className="font-bold hover:text-white cursor-pointer" style={{ color: accent }}>
          Volver al original
        </button>
      )}
    </span>
  </label>
);

// ---------- nodes ----------
const hidden = { opacity: 0, width: 1, height: 1, border: 0 } as const;

const RootNode = ({ data }: { data: { company: string; leakMonth: number } }) => (
  <div
    className="w-[290px] rounded-2xl border-2 bg-[#0f172a] p-4"
    style={{ borderColor: 'var(--c2)', boxShadow: '0 0 28px color-mix(in srgb, var(--c2) 30%, transparent)' }}
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Hoy</p>
    <p className="mt-1 text-xl font-black leading-tight text-white">{data.company}</p>
    <p className="mt-2 text-[13px] text-slate-400">Se escapan cada mes</p>
    <p className="text-3xl font-black text-red-300">{clp(data.leakMonth)}</p>
    <Handle type="source" position={Position.Bottom} style={hidden} />
  </div>
);

const StageNode = ({ data }: { data: { stage: number; total: number; on: number } }) => (
  <div
    className="w-[290px] rounded-2xl border bg-[#0b1220] px-4 py-3.5"
    style={{ borderColor: 'color-mix(in srgb, var(--c2) 55%, transparent)', borderLeftWidth: 6, borderLeftColor: 'var(--c2)' }}
  >
    <p className="text-base font-extrabold text-white">{STAGES[data.stage].label}</p>
    <p className="text-[13px] text-slate-400">
      {STAGES[data.stage].when} · <span className={data.on ? 'font-bold text-emerald-300' : ''}>{data.on} de {data.total} activadas</span>
    </p>
    <Handle type="target" position={Position.Left} style={hidden} />
    <Handle type="target" position={Position.Top} id="t" style={hidden} />
    <Handle type="source" position={Position.Right} id="r" style={hidden} />
    <Handle type="source" position={Position.Bottom} id="b" style={hidden} />
  </div>
);

const OppNode = ({ data }: { data: { opp: ViewOpp; on: boolean; selected: boolean; onToggle: (id: string) => void } }) => {
  const { opp, on, selected } = data;
  return (
    <div
      className={`h-[224px] w-[290px] cursor-pointer overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 ${
        on ? 'border-emerald-400 bg-[#062018] shadow-lg shadow-emerald-900/40' : 'border-red-400/70 bg-[#0f172a]'
      }`}
      style={selected ? { boxShadow: '0 0 0 3px #050912, 0 0 0 6px var(--c2)' } : undefined}
    >
      <Handle type="target" position={Position.Top} style={hidden} />
      <Handle type="source" position={Position.Bottom} style={hidden} />
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${
            on ? 'bg-emerald-400/15 text-emerald-300' : 'animate-pulse bg-red-400/15 text-red-300'
          }`}
        >
          {on ? <Zap className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          {on ? 'Resuelto con IA' : 'Fuga abierta'}
        </span>
        <span className="text-[11px] text-slate-500">Impacto {opp.impact.toLowerCase()}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-[17px] font-extrabold leading-snug text-white">{opp.title}</p>
      <div className="mt-2.5 space-y-1 text-[13px]">
        <p className={on ? 'text-emerald-300' : 'text-slate-400'}>
          {on ? 'Recupera' : 'Podrías recuperar'} <span className="font-bold">{opp.savingMonth > 0 ? `${clp(opp.savingMonth)}/mes` : 'visibilidad y control'}</span>
        </p>
        <p className="text-slate-500">Inversión: {opp.investment > 0 ? clp(opp.investment) : 'por definir'}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          data.onToggle(opp.id);
        }}
        aria-pressed={on}
        className={`nodrag nopan absolute bottom-4 left-4 right-4 inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-extrabold transition-colors cursor-pointer ${
          on ? 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300' : 'bg-red-400/90 text-red-950 hover:bg-red-300'
        }`}
      >
        {on ? <Check className="h-3.5 w-3.5" /> : null}
        {on ? 'Activado · tocar para quitar' : 'Tocar para activar la solución'}
      </button>
    </div>
  );
};

const nodeTypes = { root: RootNode, stage: StageNode, opp: OppNode };

// ---------- page ----------
const Inner = ({ token }: { token: string }) => {
  const [view, setView] = useState<View | null>(null);
  const [error, setError] = useState<{ text: string; expired?: boolean } | null>(null);
  const [on, setOn] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [hint, setHint] = useState(true);
  const [sendOpen, setSendOpen] = useState(false);
  const [form, setForm] = useState({ name: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [adj, setAdj] = useState<Adj>({});

  useEffect(() => {
    document.title = 'Tu hoja de ruta EBS 693 interactiva | Uni-Verso693';
    fetch(`/api/admin?action=ebs-view&token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw Object.assign(new Error(j.error || 'No pudimos abrir este enlace.'), { expired: j.expired });
        return j.view as View;
      })
      .then((v) => {
        setView(v);
        if (v.choice?.length) {
          setOn(new Set(v.choice));
          setAdj(v.choiceAdj ?? {});
          setSent(true);
        }
      })
      .catch((e) => setError({ text: e.message, expired: e.expired }));
  }, [token]);

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggle = useCallback((id: string) => {
    setSent(false);
    setOn((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // every solution with the client's tweaks applied (the original assumptions when untouched)
  const opps = useMemo(() => (view?.opportunities ?? []).map((o) => withAdj(o, adj[o.id])), [view, adj]);
  const setTweak = (id: string, k: 'rec' | 'auto', v: number | undefined) => {
    setSent(false);
    setAdj((cur) => ({ ...cur, [id]: { ...cur[id], [k]: v } }));
  };

  const totals = useMemo(() => {
    const act = opps.filter((o) => on.has(o.id));
    const saving = act.reduce((a, o) => a + o.savingMonth, 0);
    const toolCost = act.reduce((a, o) => a + o.monthlyCost, 0);
    const investment = act.reduce((a, o) => a + o.investment, 0);
    const net = saving - toolCost;
    return {
      count: act.length,
      hours: act.reduce((a, o) => a + o.hoursSavedMonth, 0),
      saving,
      toolCost,
      net,
      investment,
      pendingPrice: act.some((o) => o.investment <= 0),
      payback: investment > 0 && net > 0 ? investment / net : null,
      roi12: investment > 0 ? (net * 12 - investment) / investment : null,
    };
  }, [opps, on]);

  // diagram: Hoy → stage hubs in a row, their opportunities in a column under each hub
  const { nodes, edges } = useMemo(() => {
    if (!view) return { nodes: [], edges: [] };
    const chain = onDark(view.site?.primary, '#22d3ee');
    const CARD_W = 290;
    const GAP = 44;
    const nodes: any[] = [{ id: 'root', type: 'root', position: { x: 0, y: 0 }, data: { company: view.company, leakMonth: view.leakMonth }, draggable: false, selectable: false }];
    const edges: any[] = [];
    const stages = ([1, 2, 3] as const).filter((s) => opps.some((o) => o.stage === s));
    let prev = 'root';
    stages.forEach((st, i) => {
      const x = i * (CARD_W + GAP);
      const list = opps.filter((o) => o.stage === st);
      const hub = `stage-${st}`;
      nodes.push({ id: hub, type: 'stage', position: { x, y: 190 }, data: { stage: st, total: list.length, on: list.filter((o) => on.has(o.id)).length }, draggable: false, selectable: false });
      edges.push({ id: `e-${prev}-${hub}`, source: prev, sourceHandle: prev === 'root' ? undefined : 'r', target: hub, targetHandle: prev === 'root' ? 't' : undefined, type: 'smoothstep', style: { stroke: chain, strokeWidth: 3, opacity: 0.8 } });
      prev = hub;
      list.forEach((o, k) => {
        const active = on.has(o.id);
        nodes.push({ id: o.id, type: 'opp', position: { x, y: 310 + k * 246 }, data: { opp: o, on: active, selected: sel === o.id, onToggle: toggle }, draggable: false });
        edges.push({
          // a chain down the column (stage → card 1 → card 2 …), so each segment has its own color and none overlap
          id: `e-${k === 0 ? hub : list[k - 1].id}-${o.id}`,
          source: k === 0 ? hub : list[k - 1].id,
          sourceHandle: k === 0 ? 'b' : undefined,
          target: o.id,
          type: 'smoothstep',
          animated: active,
          style: { stroke: active ? '#34d399' : '#f87171', strokeWidth: 2, strokeDasharray: active ? undefined : '6 5' },
        });
      });
    });
    return { nodes, edges };
  }, [view, opps, on, sel, toggle]);

  const advance = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/admin?action=ebs-advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ids: [...on], name: form.name, message: form.message, adj }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'No pudimos enviar tu elección.');
      setSent(true);
      setSendOpen(false);
    } catch (e) {
      setError({ text: (e as Error).message });
    } finally {
      setSending(false);
    }
  };

  if (error && !view)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050912] p-6 text-center">
        <div className="max-w-md space-y-4">
          <p className="text-2xl font-black text-white">{error.expired ? 'Este enlace venció' : 'No pudimos abrir este enlace'}</p>
          <p className="text-slate-400">{error.text}</p>
          <a href="https://universo693.com" className="inline-block font-bold text-cyan-300 hover:text-cyan-200">Ir a universo693.com →</a>
        </div>
      </div>
    );
  if (!view)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050912]">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );

  const selected = opps.find((o) => o.id === sel) ?? null;
  const onIds = [...on];
  const adjParam = onIds.map((id) => `${id}:${adj[id]?.rec ?? ''}:${adj[id]?.auto ?? ''}`).join(';');
  const pdfHref = `/api/admin?action=ebs-view-pdf&token=${encodeURIComponent(token)}&ids=${encodeURIComponent(onIds.join(','))}&adj=${encodeURIComponent(adjParam)}`;
  const tweaked = (id: string) => adj[id]?.rec !== undefined || adj[id]?.auto !== undefined;
  const c1 = '#8b5cf6';
  const c2 = onDark(view.site?.primary, '#22d3ee');
  const brandStyle = { ['--c1' as string]: c1, ['--c2' as string]: c2 } as React.CSSProperties;
  const brandGradient = `linear-gradient(90deg, ${c1}, ${c2})`;
  const expires = new Date(view.expiresAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long' });
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const mailSelf = `mailto:?subject=${encodeURIComponent('Mi hoja de ruta EBS 693 (abrir en el computador)')}&body=${encodeURIComponent(pageUrl)}`;

  const panel = (
    <aside className={`flex flex-col gap-4 overflow-y-auto bg-[#070b16] p-5 ${narrow ? '' : 'h-full w-[400px] shrink-0 border-l border-white/10'}`}>
      {/* live financial impact */}
      <section className="shrink-0 overflow-hidden rounded-2xl border bg-[#0a1424] p-4" style={{ borderColor: 'color-mix(in srgb, var(--c2) 55%, transparent)', boxShadow: '0 0 30px color-mix(in srgb, var(--c2) 14%, transparent)' }}>
        <div className="-mx-4 -mt-4 mb-3 h-1.5" style={{ background: brandGradient }} />
        <h2 className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: c2 }}>Impacto con lo que activaste</h2>
        <p className="mt-1 text-sm text-slate-300">
          <span className="text-2xl font-black text-white">{totals.count}</span> de {view.opportunities.length} soluciones activadas
        </p>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-slate-400"><dt>Se escapan hoy</dt><dd className="font-bold text-red-300">{clp(view.leakMonth)}/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt>Recuperas</dt><dd className="font-bold text-emerald-300">{clp(totals.saving)}/mes</dd></div>
          {totals.toolCost > 0 && <div className="flex justify-between text-slate-400"><dt>Herramientas</dt><dd>−{clp(totals.toolCost)}/mes</dd></div>}
          <div className="flex justify-between border-t border-white/10 pt-1.5 text-base font-black text-white"><dt>Ahorro neto</dt><dd>{clp(totals.net)}/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt>Horas liberadas</dt><dd>{totals.hours} h/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt>Inversión</dt><dd>{totals.investment > 0 ? clp(totals.investment) : 'por definir'}{totals.pendingPrice && totals.investment > 0 ? ' + por definir' : ''}</dd></div>
          <div className="flex justify-between text-lg font-black text-emerald-300"><dt>Se recupera en</dt><dd>{months(totals.payback)}</dd></div>
          <div className="flex justify-between text-lg font-black text-emerald-300"><dt>Retorno a 12 meses</dt><dd>{totals.roi12 === null ? '—' : `${Math.round(totals.roi12 * 100)}%`}</dd></div>
        </dl>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          Cifras estimadas con lo conversado en la sesión. Los porcentajes de recuperación son supuestos que se validan al empezar; el valor del diagnóstico se descuenta del proyecto si decides avanzar.
        </p>
        {sent ? (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Recibimos tu elección. Te contactamos pronto para armar la cotización.
          </p>
        ) : sendOpen ? (
          <div className="mt-3 space-y-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre (opcional)" className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} placeholder="¿Algo que quieras que sepamos? (opcional)" className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60" />
            <div className="flex gap-2">
              <button onClick={advance} disabled={sending} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-700 disabled:opacity-60 cursor-pointer">
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Enviar mi elección
              </button>
              <button onClick={() => setSendOpen(false)} className="rounded-full border border-white/15 px-4 text-sm text-slate-300 cursor-pointer">Cancelar</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setSendOpen(true)}
            disabled={!totals.count}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            style={{ background: brandGradient }}
          >
            Quiero avanzar con {totals.count || 'mis'} {totals.count === 1 ? 'solución' : 'soluciones'} <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {error && <p className="mt-2 text-xs text-red-300">{error.text}</p>}
        {totals.count > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <a href={pdfHref} download className="inline-flex items-center gap-1.5 font-bold hover:brightness-125" style={{ color: c2 }}>
              <Download className="h-3.5 w-3.5" /> Descargar propuesta en PDF
            </a>
            <button onClick={() => { setOn(new Set()); setAdj({}); setSent(false); }} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 cursor-pointer">
              <RotateCcw className="h-3 w-3" /> Empezar de nuevo
            </button>
          </div>
        )}
      </section>

      {selected ? (
        <section className="shrink-0 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: c2 }}>{STAGES[selected.stage].label}</p>
          <h3 className="text-lg font-extrabold leading-snug text-white">{selected.title}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{selected.description}</p>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-slate-300">{selected.approach}</span>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-slate-300">Impacto {selected.impact.toLowerCase()}</span>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-slate-300">Esfuerzo {selected.effort.toLowerCase()}</span>
          </div>
          <dl className="space-y-1.5 border-t border-white/10 pt-3 text-sm">
            {selected.leakLabel && (
              <div>
                <div className="flex justify-between text-slate-400"><dt>Fuga que ataca</dt><dd className="text-red-300">{clp(selected.leakMonthly)}/mes</dd></div>
                <p className="text-xs text-slate-500">{selected.leakLabel}{selected.confidence && <span className={`ml-2 rounded-full border px-1.5 py-px text-[10px] ${CONF[selected.confidence].cls}`}>{CONF[selected.confidence].label}</span>}</p>
              </div>
            )}
            <div className="flex justify-between text-slate-400"><dt>Recuperas</dt><dd className="font-bold text-emerald-300">{selected.savingMonth > 0 ? `${clp(selected.savingMonth)}/mes` : 'visibilidad para decidir'}</dd></div>
            {selected.hoursSavedMonth > 0 && <div className="flex justify-between text-slate-400"><dt>Horas liberadas</dt><dd>{selected.hoursSavedMonth} h/mes</dd></div>}
            {selected.monthlyCost > 0 && <div className="flex justify-between text-slate-400"><dt>Herramientas</dt><dd>{clp(selected.monthlyCost)}/mes</dd></div>}
            <div className="flex justify-between text-slate-400"><dt>Inversión</dt><dd>{selected.investment > 0 ? clp(selected.investment) : 'por definir'}</dd></div>
          </dl>
          {(selected.leakBase > 0 || selected.hoursWeek > 0) && (
            <div className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Ajusta los supuestos y mira cómo cambia el retorno</p>
              {selected.leakBase > 0 && (
                <SliderRow
                  label={`% de la fuga que se recupera${selected.leakLabel ? ` (${selected.leakLabel.toLowerCase()})` : ''}`}
                  value={adj[selected.id]?.rec ?? selected.recoveryPct}
                  original={selected.recoveryPct}
                  accent={c2}
                  onChange={(v) => setTweak(selected.id, 'rec', v)}
                />
              )}
              {selected.hoursWeek > 0 && (
                <SliderRow
                  label={`% de las ${selected.hoursWeek} h/semana que se automatiza`}
                  value={adj[selected.id]?.auto ?? selected.automationPct}
                  original={selected.automationPct}
                  accent={c2}
                  onChange={(v) => setTweak(selected.id, 'auto', v)}
                />
              )}
            </div>
          )}
          {selected.assumptions && <p className="text-xs leading-relaxed text-slate-500"><span className="font-bold text-slate-400">Supuestos:</span> {selected.assumptions}</p>}
          {tweaked(selected.id) && <p className="text-[11px] text-cyan-200">Ajustaste los supuestos de esta solución; el PDF y tu elección usan tus valores.</p>}
          <button
            onClick={() => toggle(selected.id)}
            className={`w-full rounded-full py-2.5 text-sm font-extrabold cursor-pointer ${on.has(selected.id) ? 'bg-emerald-400 text-emerald-950' : 'bg-red-400/90 text-red-950'}`}
          >
            {on.has(selected.id) ? 'Activada · tocar para quitar' : 'Activar esta solución'}
          </button>
        </section>
      ) : (
        <section className="shrink-0 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          {view.summary && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Lo que vimos</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{view.summary}</p>
            </div>
          )}
          {view.leaks.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Dónde se fuga la plata</h3>
              <ul className="mt-2 space-y-2">
                {view.leaks.map((l) => (
                  <li key={l.key} className="text-sm">
                    <div className="flex justify-between gap-3 text-slate-200"><span>{l.label}{l.kind === 'caja' ? ' (plata atrapada)' : ''}</span><span className={l.kind === 'caja' ? 'text-cyan-200' : 'text-red-300'}>{clp(l.monthly)}{l.kind === 'caja' ? '' : '/mes'}</span></div>
                    <span className={`mt-0.5 inline-block rounded-full border px-1.5 py-px text-[10px] ${CONF[l.confidence].cls}`}>{CONF[l.confidence].label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {view.site && view.site.findings.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Tu sitio hoy ({view.site.host})</h3>
              {view.site.summary && <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{view.site.summary}</p>}
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-300">{view.site.findings.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
          {view.toMeasure.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Lo que hoy no sabemos y vamos a medir</h3>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-300">{view.toMeasure.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          )}
          <p className="text-xs text-slate-500">Toca cualquier tarjeta del diagrama para ver su detalle, y el botón de la tarjeta para activar esa solución.</p>
        </section>
      )}
    </aside>
  );

  return (
    <div
      className="flex h-screen min-h-[600px] flex-col text-slate-200"
      style={{
        ...brandStyle,
        background:
          'radial-gradient(900px 420px at 0% 0%, color-mix(in srgb, var(--c1) 22%, transparent), transparent), radial-gradient(900px 420px at 100% 0%, color-mix(in srgb, var(--c2) 24%, transparent), transparent), #050912',
      }}
    >
      <div className="h-1.5 w-full shrink-0" style={{ background: brandGradient }} />
      <header className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3" style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--c1) 26%, #050912), color-mix(in srgb, var(--c2) 26%, #050912))' }}>
        <p className="font-black text-white">Uni-Verso<span className="text-brand-500">693</span> <span className="text-xs font-bold text-slate-400">EBS 693 interactivo</span></p>
        <p className="text-sm text-slate-300">Hoja de ruta de <span className="font-extrabold" style={{ color: c2 }}>{view.company}</span></p>
        {view.site?.primary && (
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-300">
            <span className="h-3 w-3 rounded-full border border-white/30" style={{ background: c1 }} />
            <span className="h-3 w-3 rounded-full border border-white/30" style={{ background: c2 }} />
            hecho con los colores de {view.site.host}
          </span>
        )}
        <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
          {view.loomUrl && (
            <a href={view.loomUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-cyan-300 hover:text-cyan-200">
              <PlayCircle className="h-4 w-4" /> Ver el video explicativo
            </a>
          )}
          <span>Disponible hasta el {expires}</span>
        </div>
      </header>

      {narrow && hint && (
        <div className="flex flex-wrap items-center gap-3 border-b border-amber-300/20 bg-amber-300/10 px-5 py-3 text-sm text-amber-100">
          <Monitor className="h-4 w-4 shrink-0" />
          <span className="flex-1">Esta herramienta se aprovecha mejor en un computador: ahí ves todas las tarjetas con amplitud.</span>
          <a href={mailSelf} className="font-bold underline">Enviarme este link al correo</a>
          <button onClick={() => setHint(false)} className="text-amber-200/70 cursor-pointer" aria-label="Cerrar aviso">✕</button>
        </div>
      )}

      <div className={`flex min-h-0 flex-1 ${narrow ? 'flex-col overflow-y-auto' : ''}`}>
        <div className={narrow ? 'h-[60vh] min-h-[360px] shrink-0' : 'min-w-0 flex-1'}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes as any}
            onNodeClick={(_, n) => n.type === 'opp' && setSel(n.id)}
            onPaneClick={() => setSel(null)}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            minZoom={0.15}
            maxZoom={1.6}
            nodesDraggable={false}
            nodesConnectable={false}
            proOptions={{ hideAttribution: true }}
            colorMode="dark"
            style={{ background: 'transparent' }}
          >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#1e293b" />
            <Controls showInteractive={false} position="bottom-left" />
            {view.opportunities.length > 9 && <MiniMap pannable zoomable nodeColor={(n: any) => (n.type === 'opp' ? (on.has(n.id) ? '#34d399' : '#f87171') : '#475569')} maskColor="rgba(5,9,18,0.7)" style={{ background: '#0b1220' }} />}
          </ReactFlow>
        </div>
        {panel}
      </div>
    </div>
  );
};

export default function EbsView() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    // the token is in the path (/ebs/<token>); read it after hydration
    setToken(window.location.pathname.split('/').filter(Boolean)[1] ?? '');
  }, []);
  if (token === null) return null;
  return (
    <ReactFlowProvider>
      <Inner token={token} />
    </ReactFlowProvider>
  );
}
