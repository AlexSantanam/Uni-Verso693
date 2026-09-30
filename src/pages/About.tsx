import React from 'react';
import { useLang } from '../lib/lang';
import { BarChart3, Brain, Clapperboard, Code2, GraduationCap, PenTool, Target } from 'lucide-react';
import { capabilities, credentials, process, stats, values, type Capability } from '../data/site';
import { Container, CtaBand, Eyebrow, PageHero, SectionHeading } from '../components/ui';
import { ParticleField } from '../components/effects';
import { EbsOffer } from '../components/EbsOffer';
import { companyFacts, companyFaqs } from '../data/company';

const capabilityIcons: Record<Capability['icon'], React.FC<{ className?: string }>> = {
  Target,
  Code2,
  Brain,
  BarChart3,
  PenTool,
  Clapperboard,
};

export const About: React.FC = () => {
  const { tr, lang } = useLang();
  const es = lang === 'es';
  return (
    <>
      <PageHero
        eyebrow={{ es: 'Nosotros', en: 'About us' }}
        title={{ es: 'Un equipo que construye software con criterio de producto', en: 'A team that builds software with a product mindset' }}
        subtitle={{
          es: 'Uni-Verso693 diseña, desarrolla y opera soluciones digitales e inteligencia artificial para empresas que quieren crecer con tecnología confiable.',
          en: 'Uni-Verso693 designs, builds and runs digital solutions and artificial intelligence for companies that want to grow on reliable technology.',
        }}
      />

      <section className="py-20">
        <Container className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.value} className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-white">{s.value}</div>
              <div className="text-sm text-slate-400">{tr(s.label)}</div>
            </div>
          ))}
        </Container>
      </section>

      <EbsOffer />

      <section className="py-20 relative overflow-hidden">
        <ParticleField className="absolute inset-0 opacity-30 pointer-events-none" />
        <Container className="relative space-y-12">
          <SectionHeading
            eyebrow={es ? 'Capacidades del equipo' : 'Team capabilities'}
            title={es ? 'Un equipo que une producto, código e IA' : 'A team that brings product, code and AI together'}
            subtitle={
              es
                ? 'Cubrimos el ciclo completo: entender el negocio, diseñar la solución, construirla, automatizarla y medir su impacto.'
                : 'We cover the full cycle: understanding the business, designing the solution, building it, automating it and measuring its impact.'
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c) => {
              const Icon = capabilityIcons[c.icon];
              return (
                <div key={c.icon} className="spotlight reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-cyan-300 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{tr(c.title)}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{tr(c.text)}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {c.tools.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/40 via-[#070f19] to-[#070f19] p-8 sm:p-10">
            <div className="lg:col-span-5 space-y-3">
              <Eyebrow>{es ? 'Visión de negocio' : 'Business mindset'}</Eyebrow>
              <h3 className="text-2xl font-extrabold text-white">
                {es ? 'Un equipo multidisciplinario que entiende tu negocio' : 'A multidisciplinary team that understands your business'}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {es
                  ? 'Reunimos perfiles de producto, desarrollo, datos, diseño e inteligencia artificial con experiencia en gestión, operaciones y procesos comerciales. Por eso hablamos de ventas, márgenes y eficiencia, no solo de tecnología.'
                  : 'We bring together product, engineering, data, design and AI profiles with experience in management, operations and commercial processes. That is why we talk sales, margins and efficiency, not just technology.'}
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <Eyebrow>{es ? 'Formación del equipo' : 'Team credentials'}</Eyebrow>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((c) => (
                  <li key={c.es} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <GraduationCap className="w-4 h-4 mt-0.5 shrink-0 text-cyan-300" />
                    {tr(c)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-[#070f19] border-y border-white/10">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow={es ? 'La empresa' : 'The company'}
              title={es ? 'Datos de Uni-Verso693' : 'Uni-Verso693 at a glance'}
            />
            <dl className="reveal divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
              {companyFacts.map((f) => (
                <div key={f.label.es} className="grid grid-cols-5 gap-4 px-6 py-4">
                  <dt className="col-span-2 text-sm font-semibold text-slate-400">{tr(f.label)}</dt>
                  <dd className="col-span-3 text-sm text-white">{tr(f.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {es ? 'Preguntas frecuentes sobre la empresa' : 'Questions about the company'}
            </h2>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {companyFaqs.map((f) => (
                <details key={f.q.es} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-bold text-white">
                    {tr(f.q)}
                    <span className="text-2xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-slate-400 leading-relaxed">{tr(f.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-[#070f19] border-y border-white/10">
        <Container className="space-y-12">
          <SectionHeading eyebrow={es ? 'Valores' : 'Values'} title={es ? 'Cómo entendemos el trabajo' : 'How we approach the work'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 space-y-3">
                <h3 className="text-xl font-extrabold text-white">{tr(v.title)}</h3>
                <p className="text-slate-400 leading-relaxed">{tr(v.text)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-12">
          <SectionHeading eyebrow={es ? 'Metodología' : 'Method'} title={es ? 'De la idea a producción' : 'From idea to production'} />
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <li key={i} className="space-y-3 border-t-2 border-cyan-400/60 pt-5">
                <div className="text-sm font-bold text-cyan-300">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-extrabold text-white">{tr(p.title)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{tr(p.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBand />
    </>
  );
};
