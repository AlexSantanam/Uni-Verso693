import React from 'react';
import { useLang } from '../lib/lang';
import { process, stats, values } from '../data/site';
import { Container, CtaBand, PageHero, SectionHeading } from '../components/ui';

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
