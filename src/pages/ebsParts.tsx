import React, { useEffect, useRef, useState } from 'react';
import { CalendarRange, RotateCcw, SlidersHorizontal, X } from 'lucide-react';

// Pieces of the interactive EBS page (src/pages/EbsView.tsx): animated numbers, the "what if" simulator
// and the estimated deployment timeline.

/** A number that glides to its new value, so moving a slider is felt in the totals. */
export const AnimNum = ({ value, format }: { value: number; format: (n: number) => string }) => {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const a = from.current;
    if (a === value) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 450);
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = v;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{format(shown)}</>;
};

export interface Driver {
  key: string;
  label: string;
  unit: string;
  original: number;
  value: number;
  confidence: 'real' | 'estimado' | 'supuesto';
}

export const fmtUnit = (unit: string, n: number) => {
  const r = Math.round(n);
  if (unit === 'clp') return `$${r.toLocaleString('es-CL')}`;
  if (unit === 'pct') return `${r}%`;
  if (unit === 'h') return `${r.toLocaleString('es-CL')} h`;
  if (unit === 'dias') return `${r.toLocaleString('es-CL')} días`;
  return r.toLocaleString('es-CL');
};

const CONF_LABEL = { real: 'dato real', estimado: 'estimado por el cliente', supuesto: 'supuesto a validar' } as const;

/** Slider range for a session number: from half to double, never past 100% for percentages. */
const rangeOf = (d: Driver) => {
  const step = d.unit === 'pct' ? 1 : Math.max(1, Math.round(d.original / 100));
  // the grid is anchored on the session's number, so the slider starts exactly on it
  const down = Math.max(1, Math.ceil((d.original - Math.floor(d.original * 0.5)) / step));
  let lo = d.original - down * step;
  if (lo < 0) lo = d.original % step;
  let hi = d.original + Math.max(1, Math.ceil((Math.max(Math.ceil(d.original * 2), d.original + 1) - d.original) / step)) * step;
  if (d.unit === 'pct') hi = Math.min(100, hi);
  return { lo, hi, step };
};

/** "What if": the client moves the numbers of the business and sees savings and return recalculated. */
export const WhatIfPanel = ({ drivers, accent, onChange, onReset }: { drivers: Driver[]; accent: string; onChange: (key: string, value: number | undefined) => void; onReset: () => void }) => {
  const [open, setOpen] = useState(false);
  const moved = drivers.filter((d) => d.value !== d.original).length;
  return (
    <section className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-2 text-left cursor-pointer" aria-expanded={open}>
        <SlidersHorizontal className="h-4 w-4" style={{ color: accent }} />
        <span className="flex-1 text-sm font-extrabold text-white">Simula tu negocio: ¿y si cambian estos números?</span>
        {moved > 0 && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{moved} ajustado{moved > 1 ? 's' : ''}</span>}
        <span className="text-slate-500">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-3 space-y-4">
          <p className="text-xs leading-relaxed text-slate-400">Estos son los números que conversamos en la sesión. Muévelos y mira cómo cambian lo que recuperas y el retorno. Es una simulación en pantalla.</p>
          {drivers.map((d) => {
            const { lo, hi, step } = rangeOf(d);
            return (
              <label key={d.key} className="block text-xs text-slate-400">
                <span className="flex items-baseline justify-between gap-3">
                  <span>{d.label}</span>
                  <span className="text-base font-black text-white">{fmtUnit(d.unit, d.value)}</span>
                </span>
                <input type="range" min={lo} max={hi} step={step} value={Math.min(hi, Math.max(lo, d.value))} onChange={(e) => onChange(d.key, Number(e.target.value))} className="mt-1.5 w-full cursor-pointer" style={{ accentColor: accent }} />
                <span className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    En la sesión: {fmtUnit(d.unit, d.original)} · {CONF_LABEL[d.confidence]}
                  </span>
                  {d.value !== d.original && (
                    <button type="button" onClick={() => onChange(d.key, undefined)} className="font-bold hover:text-white cursor-pointer" style={{ color: accent }}>
                      Volver al original
                    </button>
                  )}
                </span>
              </label>
            );
          })}
          {moved > 0 && (
            <button onClick={onReset} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 cursor-pointer">
              <RotateCcw className="h-3 w-3" /> Volver a los números de la sesión
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export interface TimelineItem {
  id: string;
  title: string;
  stage: number;
  weeks: number;
  estimated: boolean;
}

const STAGE_COLOR: Record<number, string> = { 1: '#34d399', 2: '#a78bfa', 3: '#38bdf8' };

/** Estimated go-live of what the client switched on: one team, solutions one after another. */
export const TimelineModal = ({ items, accent, onClose }: { items: TimelineItem[]; accent: string; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  let cursor = 0;
  const rows = items.map((it) => {
    const start = cursor;
    cursor += it.weeks;
    return { ...it, start, end: cursor };
  });
  const total = Math.max(1, cursor);
  const tick = total <= 12 ? 1 : total <= 26 ? 2 : 4;
  const ticks: number[] = [];
  for (let w = 0; w <= total; w += tick) ticks.push(w);
  const months = (total / 4.33).toFixed(1).replace('.', ',');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border bg-[#070b16] p-6 sm:p-8" style={{ borderColor: 'color-mix(in srgb, ' + accent + ' 55%, transparent)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>Cronograma estimado de despliegue</p>
            <h3 className="mt-1 text-xl font-black leading-snug text-white sm:text-2xl">
              {rows.length ? `Todo en producción hacia la semana ${total} (≈ ${months} meses)` : 'Activa soluciones para ver el cronograma'}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        {rows.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="relative ml-[220px] h-6 border-b border-white/10">
                {ticks.map((w) => (
                  <span key={w} className={`absolute whitespace-nowrap text-[10px] text-slate-500 ${w === total ? "-translate-x-full" : w === 0 ? "" : "-translate-x-1/2"}`} style={{ left: `${(w / total) * 100}%` }}>
                    {w === 0 ? 'Inicio' : `Sem. ${w}`}
                  </span>
                ))}
              </div>
              <ul className="space-y-2.5 pt-3">
                {rows.map((r) => (
                  <li key={r.id} className="flex items-center gap-3">
                    <p className="w-[208px] shrink-0 text-xs font-bold leading-snug text-slate-200">{r.title}</p>
                    <div className="relative h-8 flex-1 rounded-lg bg-white/[0.04]">
                      <div
                        className="absolute top-0 flex h-8 items-center justify-center rounded-lg px-1 text-[11px] font-extrabold text-black/80"
                        style={{ left: `${(r.start / total) * 100}%`, width: `${Math.max(((r.end - r.start) / total) * 100, 4)}%`, background: STAGE_COLOR[r.stage] ?? accent, transition: 'all .4s' }}
                        title={`Semanas ${r.start + 1} a ${r.end}`}
                      >
                        {r.start + 1}–{r.end}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-slate-400">
                {[1, 2, 3].map((st) => (
                  <span key={st} className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: STAGE_COLOR[st] }} /> Etapa {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <p className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
          <CalendarRange className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Estimación con un equipo trabajando una solución tras otra; no es un compromiso de fechas. Los plazos y el orden se confirman en la reunión de inicio.
            {rows.some((r) => r.estimated) ? ' Las soluciones sin plazo propio usan un valor típico de su etapa.' : ''}
          </span>
        </p>
      </div>
    </div>
  );
};
