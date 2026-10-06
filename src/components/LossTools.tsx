import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useLang } from '../lib/lang';
import { ebsSymptomMeta, ebsSymptoms } from '../data/ebs';
import { whatsappLink } from '../data/site';

const clp = (n: number) => `$${Math.round(n).toLocaleString('es-CL')}`;

const numberInput =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';

/**
 * Free mini-diagnosis: the visitor ticks what happens to them, types their own number for each,
 * and gets their leaks ordered by cost, the kind of solution for each and a free first step.
 * No invented percentages: every figure comes from what they type.
 */
export const SymptomChecklist: React.FC = () => {
  const { lang, tr } = useLang();
  const es = lang === 'es';
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [values, setValues] = useState<Record<string, number>>({});
  const [rate, setRate] = useState(8000);
  const [copied, setCopied] = useState(false);
  const toggle = (key: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const total = ebsSymptoms.reduce((a, g) => a + g.items.length, 0);

  // ticked symptoms with their meta and monthly cost
  const marked = ebsSymptoms.flatMap((g, gi) =>
    g.items.flatMap((item, ii) => {
      // keyed by the Spanish text so ticks survive a language switch
      const key = `${g.area.es}:${item.es}`;
      if (!checked.has(key)) return [];
      const m = ebsSymptomMeta[gi][ii];
      const v = Math.max(0, values[key] ?? 0);
      const monthly = m.kind === 'hours' ? v * Math.max(0, rate) * 4.33 : m.kind === 'money' ? v : 0;
      return [{ key, item, m, monthly }];
    }),
  );
  const needsRate = marked.some((x) => x.m.kind === 'hours');
  const sum = marked.reduce((a, x) => a + x.monthly, 0);
  const ranked = [...marked].sort((a, b) => b.monthly - a.monthly);

  const summary = () => {
    const lines = ranked.map((x) => `- ${tr(x.item)}${x.monthly > 0 ? ` (${clp(x.monthly)}/${es ? 'mes' : 'month'})` : ''}`);
    return [
      es ? 'Hola, hice el mini-diagnóstico en universo693.com y quiero revisarlo en el diagnóstico EBS 693.' : 'Hi, I did the mini-diagnosis on universo693.com and I want to review it in the EBS 693 diagnosis.',
      ...lines,
      sum > 0 ? (es ? `Total estimado por mí: ${clp(sum)} al mes.` : `My own estimate: ${clp(sum)} per month.`) : '',
    ]
      .filter(Boolean)
      .join('\n');
  };
  const wa = whatsappLink(summary());
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the WhatsApp button still works */
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ebsSymptoms.map((g, gi) => (
          <fieldset key={g.area.es} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <legend className="sr-only">{tr(g.area)}</legend>
            <h3 className="text-lg font-extrabold text-white">{tr(g.area)}</h3>
            {g.items.map((item, ii) => {
              const key = `${g.area.es}:${item.es}`;
              const on = checked.has(key);
              const m = ebsSymptomMeta[gi][ii];
              return (
                <div key={key} className="space-y-2">
                  <label
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
                    {tr(item)}
                  </label>
                  {on && m.kind !== 'none' && m.ask && (
                    <label className="block space-y-1 pl-2">
                      <span className="text-xs font-bold text-slate-400">{tr(m.ask)}</span>
                      <input
                        type="number"
                        min={0}
                        inputMode="numeric"
                        value={values[key] ?? ''}
                        placeholder="0"
                        onChange={(e) => setValues((p) => ({ ...p, [key]: Number(e.target.value) }))}
                        className={`${numberInput} !py-2 !text-base`}
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </fieldset>
        ))}
      </div>

      {marked.length === 0 ? (
        <p className="text-center text-lg text-slate-300" aria-live="polite">
          {es ? 'Marca lo que pasa en tu empresa y escribe tu cifra: armamos tu mapa de fugas al instante.' : 'Tick what happens in your company and type your number: we build your leak map instantly.'}
        </p>
      ) : (
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8" aria-live="polite">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{es ? 'Tu mapa de fugas' : 'Your leak map'}</p>
              <p className="text-sm text-slate-400">
                {es ? 'Marcaste' : 'You ticked'} <span className="font-extrabold text-white">{marked.length}</span> {es ? 'de' : 'of'} {total}
              </p>
            </div>
            {needsRate && (
              <label className="space-y-1">
                <span className="block text-xs font-bold text-slate-400">{es ? 'Costo de una hora de trabajo (CLP)' : 'Cost of one hour of work'}</span>
                <input type="number" min={0} step={500} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={`${numberInput} !w-40 !py-2 !text-base`} />
              </label>
            )}
          </div>

          <ul className="space-y-3">
            {ranked.map((x) => (
              <li key={x.key} className="rounded-2xl border border-white/10 bg-[#060a14] p-4 space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-bold text-white">{tr(x.item)}</p>
                  {x.m.kind === 'none' ? (
                    <span className="text-xs text-slate-500">{es ? 'Sin cifra: se mide en el diagnóstico' : 'No figure: measured in the diagnosis'}</span>
                  ) : x.monthly > 0 ? (
                    <span className="text-lg font-black text-red-300">
                      {clp(x.monthly)} <span className="text-xs font-bold text-slate-500">{es ? '/ mes' : '/ month'}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-amber-300">{es ? 'Escribe tu cifra arriba' : 'Type your figure above'}</span>
                  )}
                </div>
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-cyan-300">{es ? 'Se resuelve con: ' : 'Solved with: '}</span>
                  {tr(x.m.solution)}
                </p>
                <p className="text-sm text-slate-400">
                  <span className="font-bold text-emerald-300">{es ? 'Hazlo gratis hoy: ' : 'Do it free today: '}</span>
                  {tr(x.m.tip)}
                </p>
              </li>
            ))}
          </ul>

          {sum > 0 && (
            <div className="text-center space-y-1">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{es ? 'Total que estimas que se te va' : 'Total you estimate is leaking'}</p>
              <p className="text-4xl sm:text-5xl font-black tracking-tight text-gradient-brand">{clp(sum)}</p>
              <p className="text-slate-300">
                {es ? 'al mes' : 'per month'} · <span className="font-bold text-white">{clp(sum * 12)}</span> {es ? 'al año' : 'per year'}
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {es
                  ? 'Son tus propias cifras, no una promesa de ahorro: en el diagnóstico las validamos y calculamos qué parte se recupera.'
                  : 'These are your own figures, not a savings promise: in the diagnosis we validate them and work out how much is recovered.'}
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-500">
                {es ? 'Llevar este resultado al diagnóstico' : 'Take this result to the diagnosis'}
              </a>
            )}
            <button onClick={copy} className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
              {copied ? (es ? 'Copiado' : 'Copied') : es ? 'Copiar mi resumen' : 'Copy my summary'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

type Task = { name: string; hours: number };

/**
 * Free calculator with the visitor's own numbers: a list of manual tasks with weekly hours.
 * It ranks them by cost (which to automate first), shows the yearly cost and, for a scenario the
 * visitor picks (an assumption, not a promise), how much a solution could cost and still pay back in 12 months.
 */
export const LossCalculator: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const [tasks, setTasks] = useState<Task[]>([
    { name: es ? 'Armar reportes' : 'Building reports', hours: 6 },
    { name: es ? 'Copiar datos entre planillas' : 'Copying data between spreadsheets', hours: 8 },
    { name: es ? 'Responder siempre lo mismo' : 'Answering the same things', hours: 6 },
  ]);
  const [rate, setRate] = useState(8000);
  const [scenario, setScenario] = useState(50);
  const [copied, setCopied] = useState(false);

  const setTask = (i: number, patch: Partial<Task>) => setTasks((p) => p.map((t, k) => (k === i ? { ...t, ...patch } : t)));
  const r = Math.max(0, rate);
  const rows = tasks.map((t, i) => ({ ...t, i, monthly: Math.max(0, t.hours) * r * 4.33 }));
  const totalHours = rows.reduce((a, t) => a + Math.max(0, t.hours), 0);
  const monthly = rows.reduce((a, t) => a + t.monthly, 0);
  const yearly = monthly * 12;
  const days = (totalHours * 52) / 8;
  const ranked = [...rows].filter((t) => t.monthly > 0).sort((a, b) => b.monthly - a.monthly);
  const recovered = monthly * (scenario / 100);

  const summary = () =>
    [
      es ? 'Hola, usé la calculadora de universo693.com y quiero revisar estos números en el diagnóstico EBS 693.' : 'Hi, I used the calculator on universo693.com and I want to review these numbers in the EBS 693 diagnosis.',
      ...ranked.map((t) => `- ${t.name || (es ? 'Tarea' : 'Task')}: ${t.hours} h/${es ? 'semana' : 'week'} (${clp(t.monthly)}/${es ? 'mes' : 'month'})`),
      es ? `Total estimado por mí: ${clp(monthly)} al mes (${totalHours} h/semana a ${clp(r)} la hora).` : `My own estimate: ${clp(monthly)} per month (${totalHours} h/week at ${clp(r)} per hour).`,
    ].join('\n');
  const wa = whatsappLink(summary());
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the WhatsApp button still works */
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
      <div className="lg:col-span-6 space-y-5">
        <p className="text-sm font-bold text-slate-300">{es ? 'Tareas manuales o repetitivas de tu equipo (horas a la semana)' : 'Manual or repetitive tasks of your team (hours per week)'}</p>
        <div className="space-y-3">
          {tasks.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={t.name}
                onChange={(e) => setTask(i, { name: e.target.value })}
                placeholder={es ? 'Nombre de la tarea' : 'Task name'}
                aria-label={es ? 'Nombre de la tarea' : 'Task name'}
                className={`${numberInput} !py-2 !text-base !font-semibold min-w-0 flex-1`}
              />
              <input
                type="number"
                min={0}
                max={2000}
                value={t.hours}
                onChange={(e) => setTask(i, { hours: Number(e.target.value) })}
                aria-label={es ? 'Horas a la semana' : 'Hours per week'}
                className={`${numberInput} !py-2 !text-base !w-20 shrink-0`}
              />
              <span className="text-xs text-slate-500 shrink-0">h</span>
              <button
                onClick={() => setTasks((p) => p.filter((_, k) => k !== i))}
                aria-label={es ? 'Quitar tarea' : 'Remove task'}
                className="cursor-pointer rounded-lg px-2 py-1 text-slate-500 hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
          {tasks.length < 8 && (
            <button onClick={() => setTasks((p) => [...p, { name: '', hours: 0 }])} className="cursor-pointer text-sm font-bold text-cyan-300 hover:text-cyan-200">
              + {es ? 'Agregar otra tarea' : 'Add another task'}
            </button>
          )}
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-bold text-slate-300">{es ? 'Costo aproximado de una hora de trabajo (CLP)' : 'Approximate cost of one hour of work (in your currency)'}</span>
          <input type="number" min={0} step={500} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={numberInput} />
        </label>
        <p className="text-xs text-slate-500">
          {es ? 'Los valores iniciales son solo un ejemplo: cámbialos por los de tu empresa.' : 'The starting values are just an example (in Chilean pesos): replace them with your own.'}
        </p>
      </div>

      <div className="lg:col-span-6 space-y-5" aria-live="polite">
        <div className="text-center space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{es ? 'Hoy ese trabajo manual te cuesta' : 'Today that manual work costs you'}</p>
          <p className="text-5xl sm:text-6xl font-black tracking-tight text-gradient-brand">{clp(monthly)}</p>
          <p className="text-lg text-slate-300">
            {es ? 'al mes' : 'per month'} · <span className="font-bold text-white">{clp(yearly)}</span> {es ? 'al año' : 'per year'}
          </p>
          {days > 0 && (
            <p className="text-sm text-slate-400">
              {es ? 'Son' : 'That is'} <span className="font-bold text-white">{Math.round(days).toLocaleString('es-CL')}</span> {es ? 'jornadas de 8 horas al año.' : '8-hour working days per year.'}
            </p>
          )}
        </div>

        {ranked.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{es ? 'Por dónde empezar (la que más cuesta, primero)' : 'Where to start (the costliest first)'}</p>
            {ranked.map((t, k) => (
              <div key={t.i} className="space-y-1">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-200">
                    {k + 1}. {t.name || (es ? 'Tarea' : 'Task')}
                  </span>
                  <span className="font-bold text-red-300 shrink-0">{clp(t.monthly)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ width: `${(t.monthly / ranked[0].monthly) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {monthly > 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#060a14] p-4 space-y-3">
            <p className="text-sm font-bold text-white">{es ? 'Si automatizaras una parte' : 'If you automated part of it'}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={es ? 'Escenario' : 'Scenario'}>
              {[25, 50, 75].map((p) => (
                <button
                  key={p}
                  onClick={() => setScenario(p)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-bold ${scenario === p ? 'border-cyan-300 bg-cyan-300/15 text-white' : 'border-white/15 text-slate-300 hover:border-white/30'}`}
                >
                  {p} %
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-300">
              {es ? 'Recuperarías' : 'You would recover'} <span className="font-bold text-emerald-300">{clp(recovered)}</span> {es ? 'al mes. Una solución que cueste hasta' : 'per month. A solution costing up to'}{' '}
              <span className="font-bold text-white">{clp(recovered * 12)}</span> {es ? 'se pagaría en 12 meses.' : 'would pay for itself in 12 months.'}
            </p>
            <p className="text-xs text-slate-500">
              {es
                ? 'Es un escenario que eliges tú, no una promesa: cuánto se puede automatizar de verdad lo medimos en el diagnóstico.'
                : 'This is a scenario you pick, not a promise: how much can really be automated is measured in the diagnosis.'}
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          {wa && monthly > 0 && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white hover:bg-brand-500">
              {es ? 'Llevar estos números al diagnóstico' : 'Take these numbers to the diagnosis'}
            </a>
          )}
          {monthly > 0 && (
            <button onClick={copy} className="cursor-pointer rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">
              {copied ? (es ? 'Copiado' : 'Copied') : es ? 'Copiar mi resumen' : 'Copy my summary'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
