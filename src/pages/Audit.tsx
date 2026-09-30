import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Loader2, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { useLang } from '../lib/lang';
import { CALENDLY_URL } from '../data/site';
import { Container, Eyebrow } from '../components/ui';
import { ParticleField } from '../components/effects';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface Opportunity {
  title: string;
  problem: string;
  solution: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
  effort: 'Bajo' | 'Medio' | 'Alto';
  first_step: string;
}
interface Report {
  business_summary: string;
  industry: string;
  opportunities: Opportunity[];
  quick_win: string;
  limitations: string;
}

const steps = ['Leyendo tu sitio…', 'Entendiendo tu negocio…', 'Buscando oportunidades de IA…', 'Priorizando por impacto y esfuerzo…', 'Preparando tu informe…'];

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';

const level = (v: string, good: 'Alto' | 'Bajo') =>
  v === good ? 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10' : v === 'Medio' ? 'text-amber-200 border-amber-300/30 bg-amber-300/10' : 'text-slate-300 border-white/15 bg-white/5';

export const Audit: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const [form, setForm] = useState({ url: '', fullName: '', email: '', company: '', website: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; report: Report } | null>(null);

  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 6500);
    return () => window.clearInterval(id);
  }, [loading]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'No pudimos completar la auditoría.');
      setResult(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos completar la auditoría.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const { report } = result;
    const host = new URL(result.url).hostname;
    return (
      <section className="py-16 sm:py-20 print-report">
        <Container>
          <div className="max-w-4xl mx-auto space-y-10">
            <header className="space-y-4">
              <Eyebrow>Audit 693</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                5 oportunidades de IA para <span className="text-gradient-brand">{host}</span>
              </h1>
              <p className="text-sm font-semibold text-cyan-300">{report.industry}</p>
              <p className="text-lg text-slate-300 leading-relaxed">{report.business_summary}</p>
              <div className="no-print flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Analizar otro sitio
                </button>
              </div>
            </header>

            <ol className="space-y-5">
              {report.opportunities.map((o, i) => (
                <li key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 space-y-4 break-inside-avoid">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-xl font-extrabold text-white">
                      <span className="text-brand-500">{String(i + 1).padStart(2, '0')}</span> {o.title}
                    </h2>
                    <div className="flex gap-2 text-xs font-bold">
                      <span className={`rounded-full border px-3 py-1 ${level(o.impact, 'Alto')}`}>Impacto {o.impact.toLowerCase()}</span>
                      <span className={`rounded-full border px-3 py-1 ${level(o.effort, 'Bajo')}`}>Esfuerzo {o.effort.toLowerCase()}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Problema: </span>
                    {o.problem}
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Solución: </span>
                    {o.solution}
                  </p>
                  <p className="text-sm text-cyan-200 leading-relaxed">
                    <span className="font-semibold">Primer paso: </span>
                    {o.first_step}
                  </p>
                </li>
              ))}
            </ol>

            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-7 space-y-2 break-inside-avoid">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                <Zap className="w-4 h-4" /> Victoria rápida
              </p>
              <p className="text-white leading-relaxed">{report.quick_win}</p>
            </div>

            {report.limitations && <p className="text-sm text-slate-500 leading-relaxed">{report.limitations}</p>}

            <div className="no-print glow-card rounded-[2rem]">
              <div className="rounded-[calc(2rem-1px)] bg-[#060a14] p-8 space-y-5">
                <h2 className="text-2xl font-extrabold text-white">¿Quieres saber cuál conviene primero y con qué retorno?</h2>
                <p className="text-slate-400 leading-relaxed">
                  En el diagnóstico EBS 693 revisamos tu operación en 45 minutos y te entregamos una hoja de ruta priorizada con ROI estimado. Te enviamos una copia de este informe a tu correo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-6 py-3.5 text-sm font-bold text-white"
                  >
                    Agendar diagnóstico EBS 693
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <WhatsAppButton message={`Hola, hice el Audit 693 de ${host} y quiero conversar.`} />
                </div>
              </div>
            </div>
            <p className="hidden print:block text-xs text-slate-500">Informe generado por Uni-Verso693 · universo693.com</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#070f19] min-h-[80vh]">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
      <Container className="relative py-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        <div className="lg:col-span-6 space-y-7">
          <Eyebrow>{es ? 'Audit 693 · gratis' : 'Audit 693 · free'}</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
            Descubre <span className="text-gradient-brand">5 oportunidades de IA</span> para tu empresa
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Ingresa tu sitio web y nuestra IA lo analiza: qué hace tu negocio, dónde pierdes tiempo y qué procesos se pueden automatizar. En menos de un minuto recibes un informe con prioridades y primeros pasos.
          </p>
          <ul className="space-y-3 text-slate-300">
            {['Análisis de tu sitio y tu industria', '5 oportunidades con impacto y esfuerzo', 'Primer paso concreto para cada una', 'Informe descargable en PDF y en tu correo'].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#0a1420]/80 backdrop-blur-md p-6 sm:p-10 space-y-5 shadow-xl shadow-black/30">
            <label className="space-y-1.5 block">
              <span className="text-xs font-bold text-slate-300">Sitio web de tu empresa *</span>
              <input name="url" required value={form.url} onChange={onChange} placeholder="tuempresa.cl" disabled={loading} className={inputClass} inputMode="url" />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="space-y-1.5 block">
                <span className="text-xs font-bold text-slate-300">Nombre *</span>
                <input name="fullName" required value={form.fullName} onChange={onChange} disabled={loading} className={inputClass} />
              </label>
              <label className="space-y-1.5 block">
                <span className="text-xs font-bold text-slate-300">Correo *</span>
                <input name="email" type="email" required value={form.email} onChange={onChange} disabled={loading} className={inputClass} />
              </label>
            </div>
            <label className="space-y-1.5 block">
              <span className="text-xs font-bold text-slate-300">Empresa</span>
              <input name="company" value={form.company} onChange={onChange} disabled={loading} className={inputClass} />
            </label>
            {/* honeypot: hidden from people, filled by bots */}
            <input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            {error && <div className="rounded-xl bg-red-950/40 border border-red-800/50 p-3 text-sm text-red-300">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold py-4 transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {steps[step]}
                </>
              ) : (
                <>
                  Analizar mi sitio
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              {loading ? 'Toma entre 20 y 40 segundos. No cierres esta página.' : 'Gratis. Tu información es confidencial y no la compartimos con terceros.'}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
};
