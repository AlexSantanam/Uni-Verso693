import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ebsSymptoms } from '../data/ebs';

const clp = (n: number) => `$${Math.round(n).toLocaleString('es-CL')}`;

/** Symptom checklist in three areas; the visitor ticks what applies to them. */
export const SymptomChecklist: React.FC = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const total = ebsSymptoms.reduce((a, g) => a + g.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ebsSymptoms.map((g) => (
          <fieldset key={g.area} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <legend className="sr-only">{g.area}</legend>
            <h3 className="text-lg font-extrabold text-white">{g.area}</h3>
            {g.items.map((item) => {
              const key = `${g.area}:${item}`;
              const on = checked.has(key);
              return (
                <label
                  key={key}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm leading-relaxed transition-colors ${
                    on ? 'border-cyan-400/50 bg-cyan-400/10 text-white' : 'border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(key)} />
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      on ? 'border-cyan-300 bg-cyan-300 text-ink' : 'border-white/30'
                    }`}
                    aria-hidden
                  >
                    {on && <Check className="h-3.5 w-3.5" />}
                  </span>
                  {item}
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>
      <p className="text-center text-lg text-slate-300" aria-live="polite">
        {checked.size === 0 ? (
          'Marca lo que pasa en tu empresa.'
        ) : (
          <>
            Marcaste <span className="font-extrabold text-white">{checked.size}</span> de {total}.{' '}
            {checked.size >= 4
              ? 'Hay tiempo y ventas que se están escapando: justo lo que ordena el diagnóstico.'
              : 'Cada una de estas es una oportunidad concreta de automatización.'}
          </>
        )}
      </p>
    </div>
  );
};

const numberInput =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';

/**
 * Cost of manual work with the visitor's own numbers (no invented percentages):
 * weekly hours × hourly cost → monthly and yearly amounts.
 */
export const LossCalculator: React.FC = () => {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(8000);
  const monthly = Math.max(0, hours) * Math.max(0, rate) * 4.33;
  const yearly = monthly * 12;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
      <div className="lg:col-span-6 space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-bold text-slate-300">Horas a la semana que tu equipo dedica a tareas manuales o repetitivas</span>
          <input
            type="number"
            min={0}
            max={2000}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className={numberInput}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-bold text-slate-300">Costo aproximado de una hora de trabajo (CLP)</span>
          <input
            type="number"
            min={0}
            step={500}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className={numberInput}
          />
        </label>
        <p className="text-xs text-slate-500">Los valores iniciales son solo un ejemplo: cámbialos por los de tu empresa.</p>
      </div>
      <div className="lg:col-span-6 text-center space-y-3" aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Hoy ese trabajo manual te cuesta</p>
        <p className="text-5xl sm:text-6xl font-black tracking-tight text-gradient-brand">{clp(monthly)}</p>
        <p className="text-lg text-slate-300">
          al mes · <span className="font-bold text-white">{clp(yearly)}</span> al año
        </p>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          En el diagnóstico identificamos qué parte de ese costo se puede automatizar y en cuánto tiempo se recupera la inversión.
        </p>
      </div>
    </div>
  );
};
