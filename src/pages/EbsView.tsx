import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Background, BackgroundVariant, Controls, Handle, MiniMap, Position, ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AlertTriangle, ArrowRight, Building2, CalendarCheck, Check, CheckCircle2, Cog, Download, FileText, Fuel, Headset, Loader2, Monitor, Package, Phone, PlayCircle, Plus, Radar, Receipt, RotateCcw, Route, Send, Truck, Wallet, Warehouse, Wrench, X, Zap, type LucideIcon } from 'lucide-react';
import { CALENDLY_URL, whatsappLink } from '../data/site';
import { playbookById, computeLeaks, type MetricValue } from '../data/ebsPlaybooks';
import { AnimNum, TimelineModal, WhatIfPanel, type Driver, type TimelineItem } from './ebsParts';
import { CalendarRange } from 'lucide-react';

const EBS_FEE = 197000;

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
  flowBefore: string[];
  flowAfter: string[];
  /** Monthly services this solution needs; its maintenance is their sum. */
  services: { id: string; name: string; monthly: number }[];
  /** Our monthly fee for managing and supporting this solution. */
  supportMonthly: number;
  hoursWeek: number;
  hourlyCost: number;
  automationPct: number;
  recoveryPct: number;
  leakBase: number;
  leakKey: string;
  /** Area of the company map where it hangs. */
  area: string;
  weeks: number;
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
  site: { host: string; summary: string; findings: string[]; primary: string | null; secondary: string | null; logo: string | null } | null;
  opportunities: ViewOpp[];
  choice: string[] | null;
  choiceAdj: Adj | null;
  servicesPaidBy: 'cliente' | 'universo';
  choiceScenario: { key: string; value: number }[] | null;
  whatIf: { playbook: string; metrics: Record<string, { v: number; c: 'real' | 'estimado' | 'supuesto'; label: string; unit: string }> } | null;
  /** Booking link of the kickoff meeting with name and email prefilled; null until it is set in Ajustes. */
  kickoff: string | null;
  /** The company as areas and the flow between them; null in older EBS (they keep the by-stage diagram). */
  map: { nodes: { id: string; label: string; hint: string; icon: string; col: number; row: number; entry?: boolean; inferred?: boolean }[]; edges: [string, string, ('flow' | 'support')?][] } | null;
  /** Public demo with invented data. */
  demo: boolean;
  /** Areas the client added the last time they pressed "Quiero avanzar". */
  choiceAreas?: ExtraArea[];
}

/** An area the client adds to the map because the system missed it; they also place it by dragging. */
interface ExtraArea {
  id: string;
  label: string;
  note: string;
  after: string;
  next: string;
  pain: boolean;
  x: number;
  y: number;
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

/** "Antes y después" of one solution: how the process works today next to how it would work. Steps come from the session, with no invented times. */
const FlowModal = ({ opp, accent, onClose }: { opp: ViewOpp; accent: string; onClose: () => void }) => {
  const [run, setRun] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const lane = (steps: string[], tone: 'before' | 'after', offset: number) => (
    <ol className="space-y-0">
      {steps.map((st, i) => {
        const last = i === steps.length - 1;
        const bad = tone === 'before';
        return (
          <li key={`${run}-${tone}-${i}`} className="relative pl-12 pb-4 last:pb-0" style={{ animation: 'ebsStep .5s ease both', animationDelay: `${(offset + i) * 0.35}s` }}>
            {!last && <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-0.5" style={{ background: bad ? 'rgba(248,113,113,.45)' : 'rgba(52,211,153,.5)' }} />}
            <span
              className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${bad ? 'bg-red-400/20 text-red-200' : 'bg-emerald-400/20 text-emerald-200'}`}
            >
              {i + 1}
            </span>
            <p
              className={`rounded-xl border px-3.5 py-2.5 text-sm leading-snug ${
                bad ? (last ? 'border-red-400/60 bg-red-950/40 font-bold text-red-100' : 'border-red-400/20 bg-red-950/20 text-slate-200') : last ? 'border-emerald-400/60 bg-emerald-950/40 font-bold text-emerald-100' : 'border-emerald-400/20 bg-emerald-950/20 text-slate-200'
              }`}
            >
              {st}
            </p>
          </li>
        );
      })}
    </ol>
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <style>{'@keyframes ebsStep{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'}</style>
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border bg-[#070b16] p-6 sm:p-8" style={{ borderColor: 'color-mix(in srgb, ' + accent + ' 55%, transparent)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>Cómo funciona: antes y después</p>
            <h3 className="mt-1 text-xl font-black leading-snug text-white sm:text-2xl">{opp.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-400/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-red-300">
              <AlertTriangle className="h-3.5 w-3.5" /> Hoy
            </p>
            {lane(opp.flowBefore, 'before', 0)}
          </div>
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-emerald-300">
              <Zap className="h-3.5 w-3.5" /> Con Uni-Verso693
            </p>
            {lane(opp.flowAfter, 'after', opp.flowBefore.length)}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="text-xs text-slate-500">Resumen de cómo opera hoy según lo conversado y de cómo quedaría. Los detalles técnicos se definen en la reunión de inicio.</p>
          <button onClick={() => setRun((r) => r + 1)} className="inline-flex items-center gap-1.5 text-xs font-bold hover:brightness-125 cursor-pointer" style={{ color: accent }}>
            <RotateCcw className="h-3.5 w-3.5" /> Reproducir de nuevo
          </button>
        </div>
      </div>
    </div>
  );
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

const RootNode = ({ data }: { data: { company: string; leakMonth: number; logo: string | null } }) => (
  <div
    className="w-[290px] rounded-2xl border-2 bg-[#0f172a] p-4"
    style={{ borderColor: 'var(--c2)', boxShadow: '0 0 28px color-mix(in srgb, var(--c2) 30%, transparent)' }}
  >
    <div className="flex items-center justify-between gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Hoy</p>
      {data.logo && <img src={data.logo} alt="" className="h-11 w-11 rounded-lg bg-white object-contain p-1" />}
    </div>
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
      className={`h-[248px] w-[290px] cursor-pointer overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 ${
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
        <p className="text-slate-500">Mantención: {opp.monthlyCost > 0 ? `${clp(opp.monthlyCost)}/mes` : 'por definir'}</p>
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

// ---- company map: areas of the business with their leaks (red) and solutions (green) hanging from them ----
const AREA_ICONS: Record<string, LucideIcon> = { plus: Plus, phone: Phone, receipt: Receipt, cog: Cog, package: Package, wallet: Wallet, file: FileText, headset: Headset, route: Route, send: Send, warehouse: Warehouse, truck: Truck, wrench: Wrench, radar: Radar, fuel: Fuel };

const sideHandles = [
  [Position.Top, 't'],
  [Position.Bottom, 'b'],
  [Position.Left, 'l'],
  [Position.Right, 'r'],
] as const;
const MapHandles = () => (
  <>
    {sideHandles.map(([pos, k]) => (
      <React.Fragment key={k}>
        <Handle type="source" position={pos} id={`s${k}`} style={hidden} />
        <Handle type="target" position={pos} id={`t${k}`} style={hidden} />
      </React.Fragment>
    ))}
  </>
);

interface AreaItem {
  opp: ViewOpp;
  on: boolean;
}
const AreaNode = ({ data }: { data: { node: { label: string; hint: string; icon: string; inferred?: boolean }; items: AreaItem[]; selId: string | null; onSel: (id: string) => void; onToggle: (id: string) => void; mine?: boolean; pain?: boolean; onRemove?: () => void } }) => {
  const Icon = AREA_ICONS[data.node.icon] ?? Building2;
  const allOn = data.items.length > 0 && data.items.every((i) => i.on);
  return (
    <div
      className="w-[280px] rounded-2xl border bg-[#0b1220] p-3.5 transition-colors duration-300"
      style={{
        borderColor: data.mine ? '#fbbf24' : allOn ? 'rgba(52,211,153,0.7)' : 'color-mix(in srgb, var(--c2) 55%, transparent)',
        borderStyle: data.mine ? 'dashed' : undefined,
        boxShadow: '0 0 24px color-mix(in srgb, var(--c2) 14%, transparent)',
      }}
    >
      <MapHandles />
      {data.mine && (
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-200">Agregado por ti · arrástralo</span>
          <button onClick={data.onRemove} aria-label="Quitar esta área" className="nodrag nopan cursor-pointer text-slate-500 hover:text-white"><X className="h-4 w-4" /></button>
        </div>
      )}
      {data.node.inferred && <span className="mb-2 inline-block rounded-full border border-slate-500/50 px-2 py-0.5 text-[10px] text-slate-400">por confirmar contigo</span>}
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'color-mix(in srgb, var(--c2) 18%, transparent)', color: 'var(--c2)' }}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-extrabold leading-tight text-white">{data.node.label}</p>
          {data.node.hint && <p className="mt-0.5 text-[12px] leading-snug text-slate-400">{data.node.hint}</p>}
        </div>
      </div>
      {data.mine && data.pain && (
        <p className="mt-3 rounded-xl border border-amber-300/50 bg-amber-300/10 px-2.5 py-2 text-[12px] font-bold text-amber-100">Señalaste: aquí se pierde tiempo o plata</p>
      )}
      {data.items.length > 0 && (
        <div className="mt-3 space-y-2">
          {data.items.map(({ opp, on }) => (
            <div
              key={opp.id}
              role="button"
              tabIndex={0}
              onClick={() => data.onSel(opp.id)}
              onKeyDown={(ev) => ev.key === 'Enter' && data.onSel(opp.id)}
              className={`nodrag nopan flex cursor-pointer items-start gap-2 rounded-xl border px-2.5 py-2 transition-colors duration-300 ${on ? 'border-emerald-400/60 bg-emerald-400/10' : 'border-red-400/50 bg-red-400/10'} ${data.selId === opp.id ? 'ring-2 ring-white/70' : ''}`}
            >
              {on ? <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" /> : <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-pulse text-red-300" />}
              <div className="min-w-0 flex-1">
                <p className={`text-[10px] font-extrabold uppercase tracking-wide ${on ? 'text-emerald-300' : 'text-red-300'}`}>
                  {on ? 'Resuelto con IA' : opp.leakLabel ? `Fuga: ${opp.leakLabel}` : 'Oportunidad'}
                </p>
                <p className="line-clamp-2 text-[12.5px] font-bold leading-snug text-white">{opp.title}</p>
              </div>
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  data.onToggle(opp.id);
                }}
                aria-pressed={on}
                aria-label={on ? 'Quitar esta solución' : 'Activar esta solución'}
                className={`nodrag nopan flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-black ${on ? 'bg-emerald-400 text-emerald-950' : 'bg-red-400/90 text-red-950'}`}
              >
                {on ? <Check className="h-4 w-4" /> : '+'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EntryNode = ({ data }: { data: { company: string; leakMonth: number; logo: string | null; label: string; hint: string } }) => (
  <div className="w-[300px] rounded-2xl border-2 bg-[#0f172a] p-4" style={{ borderColor: 'var(--c2)', boxShadow: '0 0 28px color-mix(in srgb, var(--c2) 30%, transparent)' }}>
    <MapHandles />
    <div className="flex items-center justify-between gap-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{data.label}</p>
      {data.logo && <img src={data.logo} alt="" className="h-11 w-11 rounded-lg bg-white object-contain p-1" />}
    </div>
    <p className="mt-1 text-xl font-black leading-tight text-white">{data.company}</p>
    {data.hint && <p className="text-[12px] text-slate-400">{data.hint}</p>}
    <p className="mt-2 text-[13px] text-slate-400">Se escapan cada mes</p>
    <p className="text-3xl font-black text-red-300">{clp(data.leakMonth)}</p>
  </div>
);

const AddAreaModal = ({ areas, extra, accent, onClose, onAdd }: { areas: { id: string; label: string; entry?: boolean }[]; extra: ExtraArea[]; accent: string; onClose: () => void; onAdd: (a: Omit<ExtraArea, 'x' | 'y'>) => void }) => {
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');
  const [after, setAfter] = useState('');
  const [next, setNext] = useState('');
  const [pain, setPain] = useState(false);
  const options = [...areas, ...extra.map((a) => ({ id: a.id, label: a.label }))];
  const field = 'mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40 [&>option]:bg-[#0b1220]';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Agregar un área">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-white/15 bg-[#0b1220] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-white">Agregar un área que falta</h2>
            <p className="text-xs text-slate-400">Si tu empresa tiene un paso que no aparece, súmalo. Después lo arrastras donde corresponde.</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="cursor-pointer text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <label className="block text-xs font-bold text-slate-300">
          Nombre del área
          <input value={label} onChange={(e) => setLabel(e.target.value)} maxLength={60} placeholder="Ej.: Revisión técnica" className={field} autoFocus />
        </label>
        <label className="block text-xs font-bold text-slate-300">
          ¿Qué pasa ahí? (opcional)
          <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} rows={2} className={field} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-bold text-slate-300">
            Viene después de
            <select value={after} onChange={(e) => setAfter(e.target.value)} className={field}>
              <option value="">—</option>
              {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </label>
          <label className="block text-xs font-bold text-slate-300">
            Y luego pasa a (opcional)
            <select value={next} onChange={(e) => setNext(e.target.value)} className={field}>
              <option value="">—</option>
              {options.filter((o) => !(o as { entry?: boolean }).entry).map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </label>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" checked={pain} onChange={(e) => setPain(e.target.checked)} className="h-4 w-4" />
          Aquí se nos pierde tiempo o plata
        </label>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-slate-300">Cancelar</button>
          <button
            disabled={!label.trim()}
            onClick={() => onAdd({ id: `x${Date.now().toString(36)}`, label: label.trim(), note: note.trim(), after, next, pain })}
            className="cursor-pointer rounded-full px-5 py-2 text-sm font-extrabold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: accent }}
          >
            Agregar al mapa
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = { root: RootNode, stage: StageNode, opp: OppNode, area: AreaNode, entry: EntryNode };

// ---------- page ----------
const Inner = ({ token }: { token: string }) => {
  const [view, setView] = useState<View | null>(null);
  const [error, setError] = useState<{ text: string; expired?: boolean } | null>(null);
  const [on, setOn] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [hint, setHint] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [adj, setAdj] = useState<Adj>({});
  const [flowFor, setFlowFor] = useState<string | null>(null);
  const [scn, setScn] = useState<Record<string, number>>({});
  const [showTimeline, setShowTimeline] = useState(false);
  const [mode, setMode] = useState<'map' | 'stages'>('map');
  const [extra, setExtra] = useState<ExtraArea[]>([]);
  const [adding, setAdding] = useState(false);
  const rf = useReactFlow();

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
          setScn(Object.fromEntries((v.choiceScenario ?? []).map((x) => [x.key, x.value])));
          setSent(true);
        }
        if (v.choiceAreas?.length) setExtra(v.choiceAreas);
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
  // numbers of the business the client can move (the ones behind the leaks): a few drivers from the approach's own formulas
  const sim = useMemo(() => {
    if (!view?.whatIf) return null;
    const pb = playbookById(view.whatIf.playbook);
    const common = new Set(['horasOficina', 'costoHoraOficina', 'ingresosAhora', 'ingresosAntes', 'sueldosMes']);
    // up to two numbers per leak (so every leak can be played with), six in total
    const keys: string[] = [];
    for (const l of pb.leaks.filter((x) => x.kind === 'perdida')) {
      let taken = 0;
      for (const k of l.uses) {
        if (taken >= 2 || keys.length >= 6) break;
        if (common.has(k) || !view.whatIf.metrics[k]) continue;
        if (!keys.includes(k)) keys.push(k);
        taken += 1;
      }
    }
    const base: Record<string, MetricValue> = Object.fromEntries(Object.entries(view.whatIf.metrics).map(([k, m]: [string, { v: number; c: 'real' | 'estimado' | 'supuesto' }]) => [k, { v: m.v, c: m.c }]));
    const moved: Record<string, MetricValue> = { ...base };
    for (const k of keys) if (scn[k] !== undefined) moved[k] = { ...base[k], v: scn[k] };
    const active = keys.some((k) => scn[k] !== undefined && scn[k] !== base[k].v);
    const leaks = computeLeaks(pb, moved).filter((l) => l.kind === 'perdida' && !l.missing.length);
    const drivers: Driver[] = keys.map((k) => ({ key: k, label: pb.metrics.find((m) => m.key === k)?.simLabel ?? view.whatIf!.metrics[k].label, unit: view.whatIf!.metrics[k].unit, original: base[k].v, value: moved[k].v, confidence: base[k].c }));
    return { active, drivers, leakByKey: Object.fromEntries(leaks.map((l) => [l.key, l.monthly])), leakTotal: leaks.reduce((a, l) => a + l.monthly, 0) };
  }, [view, scn]);
  const opps = useMemo(
    () =>
      (view?.opportunities ?? []).map((o) => {
        const base = sim?.active && o.leakKey && sim.leakByKey[o.leakKey] !== undefined ? { ...o, leakBase: sim.leakByKey[o.leakKey] } : o;
        return withAdj(base, adj[o.id]);
      }),
    [view, adj, sim],
  );
  const leakNow = sim?.active && sim.leakTotal > 0 ? sim.leakTotal : (view?.leakMonth ?? 0);
  const setTweak = (id: string, k: 'rec' | 'auto', v: number | undefined) => {
    setSent(false);
    setAdj((cur) => ({ ...cur, [id]: { ...cur[id], [k]: v } }));
  };

  const totals = useMemo(() => {
    const act = opps.filter((o) => on.has(o.id));
    const saving = act.reduce((a, o) => a + o.savingMonth, 0);
    // a service shared by several solutions is paid once
    const once = new Map<string, number>();
    let fixed = 0;
    for (const o of act) {
      if (o.services?.length) {
        for (const sv of o.services) once.set(sv.id, sv.monthly);
        fixed += o.supportMonthly ?? 0;
      } else fixed += o.monthlyCost;
    }
    const toolCost = [...once.values()].reduce((a, n) => a + n, 0) + fixed;
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
      roi12: investment > 0 && saving > 0 ? (net * 12 - investment) / investment : null,
    };
  }, [opps, on]);

  // diagram: Hoy → stage hubs in a row, their opportunities in a column under each hub
  const { nodes, edges } = useMemo(() => {
    if (!view) return { nodes: [], edges: [] };
    const chain = onDark(view.site?.primary, '#22d3ee');
    const CARD_W = 290;
    const GAP = 44;
    const nodes: any[] = [{ id: 'root', type: 'root', position: { x: 0, y: 0 }, data: { company: view.company, leakMonth: leakNow, logo: view.site?.logo ?? null }, draggable: false, selectable: false }];
    const edges: any[] = [];
    const stages = ([1, 2, 3] as const).filter((s) => opps.some((o) => o.stage === s));
    let prev = 'root';
    stages.forEach((st, i) => {
      const x = i * (CARD_W + GAP);
      const list = opps.filter((o) => o.stage === st);
      const hub = `stage-${st}`;
      nodes.push({ id: hub, type: 'stage', position: { x, y: 220 }, data: { stage: st, total: list.length, on: list.filter((o) => on.has(o.id)).length }, draggable: false, selectable: false });
      edges.push({ id: `e-${prev}-${hub}`, source: prev, sourceHandle: prev === 'root' ? undefined : 'r', target: hub, targetHandle: prev === 'root' ? 't' : undefined, type: 'smoothstep', style: { stroke: chain, strokeWidth: 3, opacity: 0.8 } });
      prev = hub;
      list.forEach((o, k) => {
        const active = on.has(o.id);
        nodes.push({ id: o.id, type: 'opp', position: { x, y: 340 + k * 270 }, data: { opp: o, on: active, selected: sel === o.id, onToggle: toggle }, draggable: false });
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
  }, [view, opps, on, sel, toggle, leakNow]);

  // company map: areas on a grid in the order a customer goes through them; leaks and solutions hang inside each area
  const mapGraph = useMemo(() => {
    if (!view?.map) return null;
    const m = view.map;
    const chain = onDark(view.site?.primary, '#22d3ee');
    const ids = new Set(m.nodes.map((n) => n.id));
    const fallback = ids.has('oficina') ? 'oficina' : (m.nodes.find((n) => !n.entry)?.id ?? '');
    const byArea = new Map<string, AreaItem[]>();
    for (const o of opps) {
      const a = ids.has(o.area) && !m.nodes.find((n) => n.id === o.area)?.entry ? o.area : fallback;
      byArea.set(a, [...(byArea.get(a) ?? []), { opp: o, on: on.has(o.id) }]);
    }
    const COLW = 330;
    const GAP = 64;
    const heightOf = (id: string, entry?: boolean) => (entry ? 190 : 78 + (byArea.get(id)?.length ?? 0) * 66 + ((byArea.get(id)?.length ?? 0) > 0 ? 12 : 0));
    const rowIds = Array.from(new Set<number>(m.nodes.map((n) => n.row))).sort((a, b) => a - b);
    const rowY = new Map<number, number>();
    let y = 0;
    for (const r of rowIds) {
      rowY.set(r, y);
      y += Math.max(...m.nodes.filter((n) => n.row === r).map((n) => heightOf(n.id, n.entry))) + GAP;
    }
    const pos = new Map<string, { x: number; y: number; col: number; row: number }>(m.nodes.map((n) => [n.id, { x: n.col * COLW, y: rowY.get(n.row) ?? 0, col: n.col, row: n.row }] as [string, { x: number; y: number; col: number; row: number }]));
    const nodes: any[] = m.nodes.map((n) => {
      const p = pos.get(n.id)!;
      return n.entry
        ? { id: n.id, type: 'entry', position: { x: p.x - 10, y: p.y }, initialWidth: 300, initialHeight: 190, data: { company: view.company, leakMonth: leakNow, logo: view.site?.logo ?? null, label: n.label, hint: n.hint }, draggable: false, selectable: false }
        : { id: n.id, type: 'area', position: { x: p.x, y: p.y }, initialWidth: 280, initialHeight: heightOf(n.id), data: { node: n, items: byArea.get(n.id) ?? [], selId: sel, onSel: setSel, onToggle: toggle }, draggable: false, selectable: false };
    });
    const edges = m.edges
      .filter(([a, b]) => pos.has(a) && pos.has(b))
      .map(([a, b, kind], i) => {
        const pa = pos.get(a)!;
        const pb = pos.get(b)!;
        // leave and arrive on the sides that face each other
        let sh: string, th: string;
        if (pa.row === pb.row) [sh, th] = pb.col > pa.col ? ['sr', 'tl'] : ['sl', 'tr'];
        else [sh, th] = pb.row > pa.row ? ['sb', 'tt'] : ['st', 'tb'];
        const support = kind === 'support';
        // the flow reacts to what is switched on: the more of the areas it joins are solved, the greener and faster it runs
        const state = (id: string) => {
          const it = byArea.get(id) ?? [];
          const solved = it.filter((x) => x.on).length;
          return it.length > 0 && solved === it.length ? 2 : solved > 0 ? 1 : 0;
        };
        const ends = [state(a), state(b)];
        const done = ends.filter((x) => x === 2).length;
        const partial = ends.some((x) => x === 1);
        const level = done === 2 ? 3 : done === 1 ? 2 : partial ? 1 : 0;
        const color = level >= 2 ? (level === 3 ? '#4ade80' : '#34d399') : level === 1 ? '#a3e635' : support ? '#64748b' : chain;
        const seconds = [2.4, 1.2, 0.8, 0.45][level];
        return {
          id: `m${i}-${a}-${b}`,
          source: a,
          target: b,
          sourceHandle: sh,
          targetHandle: th,
          type: 'smoothstep',
          // a support line only moves once something it serves is solved
          animated: !support || level > 0,
          data: { kind: support ? 'support' : 'flow' },
          markerEnd: { type: 'arrowclosed' as const, color, width: 18, height: 18 },
          style: {
            stroke: color,
            strokeWidth: (support ? 2 : 3) + (level === 3 ? 1 : 0),
            strokeDasharray: support && level === 0 ? '6 5' : undefined,
            opacity: support && level === 0 ? 0.8 : 0.95,
            animationDuration: `${seconds}s`,
            transition: 'stroke 0.4s ease, stroke-width 0.4s ease',
          },
        };
      });
    // areas the client added: draggable, joined to the area they come after (and the one they lead to)
    const sidesFor = (a: { x: number; y: number }, b: { x: number; y: number }): [string, string] => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? ['sr', 'tl'] : ['sl', 'tr']) : dy > 0 ? ['sb', 'tt'] : ['st', 'tb'];
    };
    const mineEdge = (id: string, from: string, to: string, a: { x: number; y: number }, b: { x: number; y: number }) => {
      const [sh, th] = sidesFor(a, b);
      return { id, source: from, target: to, sourceHandle: sh, targetHandle: th, type: 'smoothstep', animated: true, data: { kind: 'mine' }, markerEnd: { type: 'arrowclosed' as const, color: '#fbbf24', width: 18, height: 18 }, style: { stroke: '#fbbf24', strokeWidth: 3 } };
    };
    const where = new Map<string, { x: number; y: number }>([...pos.entries()].map(([k, v]) => [k, { x: v.x, y: v.y }] as [string, { x: number; y: number }]));
    for (const a of extra) {
      where.set(a.id, { x: a.x, y: a.y });
      nodes.push({ id: a.id, type: 'area', position: { x: a.x, y: a.y }, initialWidth: 280, initialHeight: 150, draggable: true, selectable: false, data: { node: { label: a.label, hint: a.note, icon: 'plus' }, items: [], selId: null, onSel: setSel, onToggle: toggle, mine: true, pain: a.pain, onRemove: () => setExtra((c) => c.filter((x) => x.id !== a.id)) } });
    }
    for (const a of extra) {
      const here = where.get(a.id)!;
      if (a.after && where.has(a.after)) edges.push(mineEdge(`mine-${a.after}-${a.id}`, a.after, a.id, where.get(a.after)!, here));
      if (a.next && where.has(a.next)) edges.push(mineEdge(`mine-${a.id}-${a.next}`, a.id, a.next, here, where.get(a.next)!));
    }
    return { nodes, edges };
  }, [view, opps, on, sel, toggle, leakNow, extra]);
  const graph = mode === 'map' && mapGraph ? mapGraph : { nodes, edges };

  /** The diagram as the client sees it now (positions, sizes, chips and arrows), so the consultant gets the whole picture. */
  const buildDiagram = () => ({
    nodes: rf.getNodes().map((n: any) => ({
      id: n.id,
      label: n.data?.node?.label ?? n.data?.company ?? '',
      hint: n.data?.node?.hint ?? n.data?.hint ?? '',
      x: n.position.x,
      y: n.position.y,
      w: n.measured?.width ?? n.width ?? 280,
      h: n.measured?.height ?? n.height ?? 120,
      mine: !!n.data?.mine,
      entry: n.type === 'entry',
      chips: [
        ...((n.data?.items ?? []) as AreaItem[]).map((it) => ({ text: it.on ? `Resuelto con IA: ${it.opp.title}` : `${it.opp.leakLabel ? `Fuga: ${it.opp.leakLabel} · ` : ''}${it.opp.title}`, on: it.on })),
        ...(n.data?.mine && n.data?.pain ? [{ text: 'El cliente indica que aquí se pierde tiempo o plata', on: false }] : []),
      ],
    })),
    edges: graph.edges.map((e: any) => ({ from: e.source, to: e.target, kind: e.data?.kind ?? 'flow' })),
  });

  const advance = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/admin?action=ebs-advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ids: [...on],
          adj,
          areas: extra,
          diagram: mode === 'map' && mapGraph ? buildDiagram() : undefined,
          scenario: (sim?.drivers ?? []).filter((d) => d.value !== d.original).map((d) => ({ key: d.key, label: d.label, original: d.original, value: d.value, unit: d.unit })),
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'No pudimos enviar tu elección.');
      setSent(true);
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
  // the booking page opens with name and email filled in and the chosen solutions in the first custom question
  const chosenTitles = opps.filter((o) => on.has(o.id)).map((o) => o.title);
  const kickoffHref = (() => {
    if (view.kickoff) {
      try {
        const u = new URL(view.kickoff);
        u.searchParams.set('a1', ('EBS ' + view.number + ': ' + chosenTitles.join('; ')).slice(0, 400));
        return u.toString();
      } catch {
        /* falls back to WhatsApp */
      }
    }
    return whatsappLink('Hola, soy de ' + view.company + '. Elegimos ' + totals.count + ' solución(es) del EBS ' + view.number + ' y quiero agendar la reunión de inicio y validación de supuestos.');
  })();
  // estimated go-live of what is switched on: weeks per solution (a typical value for its stage when none was set)
  const stageWeeks: Record<number, number> = { 1: 3, 2: 6, 3: 10 };
  const timelineItems: TimelineItem[] = opps
    .filter((o) => on.has(o.id))
    .sort((a, b) => a.stage - b.stage)
    .map((o) => ({ id: o.id, title: o.title, stage: o.stage, weeks: o.weeks > 0 ? o.weeks : stageWeeks[o.stage] ?? 6, estimated: !(o.weeks > 0) }));
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
          <div className="flex justify-between text-slate-400"><dt>Se escapan hoy</dt><dd className="font-bold text-red-300"><AnimNum value={leakNow} format={clp} />/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt>Recuperas</dt><dd className="font-bold text-emerald-300"><AnimNum value={totals.saving} format={clp} />/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt title="Servicios de terceros que se pagan cada mes (WhatsApp, nube, dominio…). Un servicio que usan varias soluciones se cuenta una sola vez.">Mantención mensual</dt><dd>{totals.toolCost > 0 ? `−${clp(totals.toolCost)}/mes` : 'por definir'}</dd></div>
          <div className={`flex justify-between border-t border-white/10 pt-1.5 text-base font-black ${totals.net < 0 ? "text-red-300" : "text-white"}`}><dt>Ahorro neto</dt><dd><AnimNum value={totals.net} format={clp} />/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt>Horas liberadas</dt><dd>{totals.hours} h/mes</dd></div>
          <div className="flex justify-between text-slate-400"><dt>Inversión</dt><dd>{totals.investment > 0 ? clp(totals.investment) : 'por definir'}{totals.pendingPrice && totals.investment > 0 ? ' + por definir' : ''}</dd></div>
          <div className="flex justify-between text-lg font-black text-emerald-300"><dt>Se recupera en</dt><dd>{months(totals.payback)}</dd></div>
          <div className={`flex justify-between text-lg font-black ${totals.roi12 !== null && totals.roi12 < 0 ? "text-red-300" : "text-emerald-300"}`}><dt>Retorno a 12 meses</dt><dd>{totals.roi12 === null ? '—' : <AnimNum value={totals.roi12 * 100} format={(n) => `${Math.round(n)}%`} />}</dd></div>
        </dl>
        {totals.count > 0 && totals.saving <= 0 && (
          <p className="mt-3 rounded-lg bg-cyan-400/10 p-2.5 text-xs leading-relaxed text-cyan-100">
            Lo que activaste hasta ahora sirve para medir y preparar el terreno: no recupera plata por sí solo, pero permite ver los números y habilita a las demás. Activa también las que recuperan dinero para ver el retorno.
          </p>
        )}
        <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
          Cifras estimadas con lo conversado en la sesión. El ahorro neto ya descuenta la mantención mensual: los servicios de terceros (WhatsApp, nube, dominio, APIs de IA) que se pagan todos los meses, contando una sola vez los que comparten varias soluciones. Los porcentajes de recuperación son supuestos que se validan al empezar; el valor del diagnóstico se descuenta del proyecto si decides avanzar.
        </p>
        {sent && view.demo ? (
          <div className="mt-3 space-y-3 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3.5 text-sm">
            <p className="font-bold text-amber-100">Así llegaría tu elección a nuestro equipo.</p>
            <p className="text-xs text-slate-300">Como esto es una demo con datos inventados, no enviamos nada. En tu diagnóstico real armamos este mismo espacio con los números de tu empresa y, al avanzar, te llega el borrador de cotización y puedes agendar la reunión de inicio.</p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-extrabold text-white hover:brightness-110"
              style={{ background: brandGradient }}
            >
              <CalendarCheck className="h-4 w-4 shrink-0" /> <span className="text-center">Agendar mi diagnóstico EBS 693</span>
            </a>
          </div>
        ) : sent ? (
          <div className="mt-3 space-y-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 text-sm">
            <p className="flex items-start gap-2 font-bold text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Recibimos tu elección de {totals.count} {totals.count === 1 ? 'solución' : 'soluciones'}.
            </p>
            <dl className="space-y-1 text-slate-200">
              <div className="flex justify-between"><dt>Ahorro neto estimado</dt><dd className="font-bold text-emerald-300">{clp(totals.net)}/mes</dd></div>
              <div className="flex justify-between"><dt>Inversión</dt><dd>{totals.investment > 0 ? clp(totals.investment) : 'por definir'}</dd></div>
              <div className="flex justify-between"><dt>Mantención mensual</dt><dd>{totals.toolCost > 0 ? `${clp(totals.toolCost)}/mes` : 'por definir'}</dd></div>
              {totals.investment > 0 && (
                <>
                  <div className="flex justify-between text-slate-300"><dt>Diagnóstico EBS 693 (se descuenta)</dt><dd>−{clp(Math.min(EBS_FEE, totals.investment))}</dd></div>
                  <div className="flex justify-between border-t border-white/10 pt-1 text-base font-black text-white"><dt>Inversión neta</dt><dd>{clp(Math.max(0, totals.investment - EBS_FEE))}</dd></div>
                </>
              )}
              {totals.pendingPrice && <p className="text-[11px] text-slate-400">Hay soluciones con precio por definir; se confirma en la reunión.</p>}
            </dl>
            <div className="border-t border-white/10 pt-3">
              <p className="font-bold text-white">Siguiente paso: reunión de inicio y validación de supuestos</p>
              <p className="mt-1 text-xs text-slate-300">Una reunión corta para confirmar el alcance y revisar contigo cada supuesto antes de la cotización formal. El valor del diagnóstico se descuenta del proyecto.</p>
              <a
                href={kickoffHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-sm font-extrabold text-white hover:brightness-110"
                style={{ background: brandGradient }}
              >
                <CalendarCheck className="h-4 w-4 shrink-0" /> <span className="text-center">{view.kickoff ? 'Agendar la reunión de inicio' : 'Coordinar la reunión por WhatsApp'}</span>
              </a>
            </div>
          </div>
        ) : (
          <button
            onClick={advance}
            disabled={!totals.count || sending}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            style={{ background: brandGradient }}
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Quiero avanzar con {totals.count || 'mis'} {totals.count === 1 ? 'solución' : 'soluciones'} <ArrowRight className="h-4 w-4" />
          </button>
        )}
        {error && <p className="mt-2 text-xs text-red-300">{error.text}</p>}
        {totals.count > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <a href={pdfHref} download className="inline-flex items-center gap-1.5 font-bold hover:brightness-125" style={{ color: c2 }}>
              <Download className="h-3.5 w-3.5" /> Descargar propuesta en PDF
            </a>
            <button onClick={() => setShowTimeline(true)} className="inline-flex items-center gap-1.5 font-bold hover:brightness-125 cursor-pointer" style={{ color: c2 }}>
              <CalendarRange className="h-3.5 w-3.5" /> Ver cronograma estimado
            </button>
            <button onClick={() => { setOn(new Set()); setAdj({}); setScn({}); setSent(false); }} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 cursor-pointer">
              <RotateCcw className="h-3 w-3" /> Empezar de nuevo
            </button>
          </div>
        )}
      </section>

      {sim && sim.drivers.length > 0 && (
        <WhatIfPanel
          drivers={sim.drivers}
          accent={c2}
          onChange={(k, v) => {
            setSent(false);
            setScn((cur) => {
              const n = { ...cur };
              if (v === undefined) delete n[k];
              else n[k] = v;
              return n;
            });
          }}
          onReset={() => {
            setSent(false);
            setScn({});
          }}
        />
      )}

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
            <div className="flex justify-between text-slate-400"><dt>Mantención mensual</dt><dd>{selected.monthlyCost > 0 ? `${clp(selected.monthlyCost)}/mes` : 'por definir'}</dd></div>
            {(selected.services.length > 0 || selected.supportMonthly > 0) && (
              <div className="space-y-0.5 pl-3 text-xs text-slate-500">
                {selected.services.length > 0 && (
                  <p className="text-slate-400">
                    Servicios de terceros · {view.servicesPaidBy === 'universo' ? 'los contrata Uni-Verso693 y traspasa el costo' : 'los contratas y pagas tú directo en tus cuentas'}
                  </p>
                )}
                {selected.services.map((sv) => (
                  <p key={sv.id} className="flex justify-between gap-3"><span>{sv.name}</span><span>{sv.monthly > 0 ? `${clp(sv.monthly)}/mes` : 'por definir'}</span></p>
                ))}
                {selected.supportMonthly > 0 && (
                  <p className="flex justify-between gap-3 text-slate-400"><span>Gestión y soporte Uni-Verso693</span><span>{clp(selected.supportMonthly)}/mes</span></p>
                )}
              </div>
            )}
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
          {selected.flowBefore.length > 0 && selected.flowAfter.length > 0 && (
            <button
              onClick={() => setFlowFor(selected.id)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-bold hover:bg-white/5 cursor-pointer"
              style={{ borderColor: 'color-mix(in srgb, var(--c2) 60%, transparent)', color: c2 }}
            >
              <PlayCircle className="h-4 w-4" /> Ver cómo funciona: antes y después
            </button>
          )}
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
      {view.demo && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-b border-amber-300/25 bg-amber-300/10 px-5 py-2 text-center text-sm text-amber-100">
          <span><strong>Demo con datos inventados.</strong> Pruébalo como lo haría tu empresa: activa soluciones, mueve los números y mira el resultado. No se envía nada.</span>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline">Quiero el mío →</a>
        </div>
      )}
      <header className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-white/10 px-5 py-3" style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--c1) 26%, #050912), color-mix(in srgb, var(--c2) 26%, #050912))' }}>
        <p className="font-black text-white">Uni-Verso<span className="text-brand-500">693</span> <span className="text-xs font-bold text-slate-400">EBS 693 interactivo</span></p>
        {view.site?.logo && (
          <span className="flex items-center gap-3 text-slate-400">
            ×
            <img src={view.site.logo} alt={view.company} className="h-10 w-10 rounded-lg bg-white object-contain p-1 shadow-lg" style={{ boxShadow: '0 0 18px color-mix(in srgb, var(--c2) 45%, transparent)' }} />
          </span>
        )}
        <p className="text-sm text-slate-300">Hoja de ruta de <span className="font-extrabold" style={{ color: c2 }}>{view.company}</span></p>
        <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
          {view.loomUrl && (
            <a href={view.loomUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-cyan-300 hover:text-cyan-200">
              <PlayCircle className="h-4 w-4" /> Ver el video explicativo
            </a>
          )}
          {!view.demo && <span>Disponible hasta el {expires}</span>}
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
        <div className={`relative ${narrow ? 'h-[60vh] min-h-[360px] shrink-0' : 'min-w-0 flex-1'}`}>
          {mapGraph && (
            <div className="absolute right-3 top-3 z-10 flex rounded-full border border-white/15 bg-[#0b1220]/90 p-1 text-xs font-bold backdrop-blur">
              {(['map', 'stages'] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setMode(k)}
                  aria-pressed={mode === k}
                  className={`cursor-pointer rounded-full px-3 py-1.5 ${mode === k ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                  style={mode === k ? { background: brandGradient } : undefined}
                >
                  {k === 'map' ? 'Mapa de la empresa' : 'Por etapas'}
                </button>
              ))}
            </div>
          )}
          {mode === 'map' && mapGraph && (
            <button
              onClick={() => setAdding(true)}
              className="absolute left-3 top-3 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-amber-300/50 bg-[#0b1220]/90 px-3.5 py-2 text-xs font-bold text-amber-100 backdrop-blur hover:bg-amber-300/10"
            >
              <Plus className="h-4 w-4" /> ¿Falta un área de tu empresa? Agrégala
            </button>
          )}
          {mode === 'map' && mapGraph && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border border-white/10 bg-[#0b1220]/90 px-4 py-1.5 text-[11px] text-slate-300 backdrop-blur">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" /> Fuga abierta</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" /> Resuelto con IA</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-0 w-5 border-t-2" style={{ borderColor: c2 }} /> Camino del cliente</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-0 w-5 border-t-2 border-dashed border-slate-500" /> Apoya a otra área</span>
            </div>
          )}
          <ReactFlow
            key={mode}
            nodes={graph.nodes}
            edges={graph.edges}
            nodeTypes={nodeTypes as any}
            onNodeClick={(_, n) => n.type === 'opp' && setSel(n.id)}
            onNodeDrag={(_, n) => (n.data as any)?.mine && setExtra((c) => c.map((a) => (a.id === n.id ? { ...a, x: n.position.x, y: n.position.y } : a)))}
            onPaneClick={() => setSel(null)}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            minZoom={0.05}
            maxZoom={2.5}
            nodesDraggable={false}
            nodesConnectable={false}
            proOptions={{ hideAttribution: true }}
            colorMode="dark"
            style={{ background: 'transparent' }}
          >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#1e293b" />
            <Controls showInteractive={false} position="bottom-left" />
            {(view.opportunities.length > 9 || (mode === 'map' && mapGraph)) && (
              <MiniMap
                pannable
                zoomable
                nodeColor={(n: any) => (n.type === 'opp' ? (on.has(n.id) ? '#34d399' : '#f87171') : n.data?.mine ? '#fbbf24' : n.type === 'area' ? (n.data?.items?.length && n.data.items.every((i: AreaItem) => i.on) ? '#34d399' : n.data?.items?.length ? '#f87171' : '#475569') : '#22d3ee')}
                maskColor="rgba(5,9,18,0.7)"
                style={{ background: '#0b1220' }}
              />
            )}
          </ReactFlow>
        </div>
        {panel}
        {adding && view.map && (
          <AddAreaModal
            areas={view.map.nodes}
            extra={extra}
            accent={c2}
            onClose={() => setAdding(false)}
            onAdd={(a) => {
              // dropped below the diagram, under the area it comes after; the client then drags it where it belongs
              const all = rf.getNodes();
              const bottom = Math.max(0, ...all.map((n: any) => n.position.y + (n.measured?.height ?? 160)));
              const anchor = all.find((n: any) => n.id === a.after) as any;
              setExtra((c) => [...c, { ...a, x: anchor?.position.x ?? 0, y: bottom + 90 + c.length * 20 }]);
              setSent(false);
              setAdding(false);
              // show the whole diagram again so the new area is in view
              setTimeout(() => rf.fitView({ padding: 0.12, duration: 400 }), 80);
            }}
          />
        )}
        {flowFor && opps.find((o) => o.id === flowFor) && <FlowModal opp={opps.find((o) => o.id === flowFor)!} accent={c2} onClose={() => setFlowFor(null)} />}
        {showTimeline && <TimelineModal items={timelineItems} accent={c2} onClose={() => setShowTimeline(false)} />}
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
