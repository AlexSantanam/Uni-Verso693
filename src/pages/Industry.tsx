import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { industries, industryBySlug } from '../data/industries';
import { Container, Eyebrow, SectionHeading } from '../components/ui';
import { ParticleField } from '../components/effects';
import { NeonLogoVideo } from '../components/NeonLogoVideo';

/** Industry landing (/ia-para/:slug). Not linked from the main menu; see src/data/industries.ts. */
export const Industry: React.FC = () => {
  const { slug } = useParams();
  const ind = slug ? industryBySlug(slug) : undefined;
  if (!ind) return <Navigate to="/" replace />;
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
        <NeonLogoVideo className="hidden lg:block absolute left-[81.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(39.5rem,34vw)] pointer-events-none" />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl space-y-7">
            <Eyebrow>IA para {ind.name.toLowerCase()}</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">{ind.h1}</h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">{ind.intro}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/audit-693"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-extrabold text-white shadow-xl shadow-brand-600/40"
              >
                Analizar mi sitio gratis
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/diagnostico-ia" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                Diagnóstico EBS 693 con el equipo →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading eyebrow="Dónde se pierde tiempo y plata" title={`Lo que vemos en ${ind.audience}`} />
            <ul className="space-y-3">
              {ind.pains.map((p) => (
                <li key={p} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-slate-300">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-300" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading eyebrow="Qué resuelve la IA" title="Casos de uso concretos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ind.useCases.map((u) => (
                <div key={u.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-2">
                  <h3 className="font-extrabold text-white">{u.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{u.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto flex gap-4 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-7">
            <ShieldCheck className="w-6 h-6 shrink-0 text-cyan-300" />
            <div className="space-y-2">
              <h2 className="font-extrabold text-white">Qué hay que cuidar</h2>
              <p className="text-slate-300 leading-relaxed">{ind.care}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02] py-20">
        <Container className="space-y-10">
          <SectionHeading center eyebrow="Cómo partir" title="De la idea al sistema funcionando, paso a paso" />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { t: 'Audit 693 gratis', d: 'Ingresa tu sitio y ve en un minuto 3 oportunidades de IA para tu empresa.', to: '/audit-693' },
              { t: 'AUDIT 693 PRO', d: 'Informe de Fugas de Dinero en PDF: tu sitio a fondo, tu competencia y el costo de tu trabajo manual.', to: '/audit-693#pro' },
              { t: 'Diagnóstico EBS 693', d: 'Sesión de 45 minutos con el equipo: qué implementar primero, cómo y con qué retorno.', to: '/diagnostico-ia' },
            ].map((s, i) => (
              <li key={s.t}>
                <Link to={s.to} className="group block h-full rounded-3xl border border-white/10 bg-[#060a14] p-7 space-y-3 hover:border-brand-500/50 transition-colors">
                  <span className="text-sm font-black text-brand-500">0{i + 1}</span>
                  <h3 className="text-lg font-extrabold text-white">{s.t}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                    Ver más <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Preguntas frecuentes</h2>
            <div className="divide-y divide-white/10">
              {ind.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-bold text-white">
                    {f.q}
                    <span className="text-2xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-slate-400 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="pt-8 space-y-3">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-300">
                <Sparkles className="w-4 h-4 text-cyan-300" /> IA para otras industrias
              </p>
              <div className="flex flex-wrap gap-2">
                {others.map((o) => (
                  <Link key={o.slug} to={`/ia-para/${o.slug}`} className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/50 hover:text-white">
                    {o.name}
                  </Link>
                ))}
                <Link to="/blog/inteligencia-artificial-por-industria-chile" className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/50 hover:text-white">
                  Guía por industria →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
