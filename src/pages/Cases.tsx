import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLang } from '../lib/lang';
import { cases } from '../data/site';
import { ButtonLink, Container, CtaBand, Eyebrow, PageHero, SectionHeading } from '../components/ui';
import { CaseCard, CaseVisual, caseImages } from '../components/CaseCard';
import { IndustryGrid } from '../components/IndustryGrid';
import { industries } from '../data/industries';
import { CheckList } from './Home';

export const Cases: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  // only facts we can back up: founding year, live featured cases, industry pages, where we work
  const stats = [
    { value: '2013', label: es ? 'Construyendo software desde' : 'Building software since' },
    { value: String(cases.length), label: es ? 'Casos destacados en producción' : 'Featured cases in production' },
    { value: String(industries.length), label: es ? 'Industrias con soluciones' : 'Industries with solutions' },
    { value: es ? 'Chile + mundo' : 'Chile + world', label: es ? 'Trabajo remoto, en español e inglés' : 'Remote work, in Spanish and English' },
  ];

  return (
    <>
      <PageHero
        eyebrow={{ es: 'Casos de éxito', en: 'Case studies' }}
        title={{ es: 'Convertimos desafíos en productos que funcionan', en: 'We turn challenges into products that work' }}
        subtitle={{
          es: 'Casos reales que puedes visitar, y las soluciones que diseñamos para cada industria.',
          en: 'Real cases you can visit, and the solutions we design for each industry.',
        }}
      />

      <section className="border-b border-white/5 bg-white/[0.02]">
        <Container className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-gradient-brand">{s.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-400">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={es ? 'Casos destacados' : 'Featured cases'}
            title={es ? 'Productos reales, en producción' : 'Real products, live in production'}
            subtitle={es ? 'Proyectos que diseñamos, construimos y hoy están funcionando.' : 'Projects we designed and built, running today.'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/5 bg-[#070f19] py-20">
        <Container className="space-y-12">
          <SectionHeading
            center
            eyebrow={es ? 'Soluciones por industria' : 'Solutions by industry'}
            title={es ? 'Lo que construimos por industria' : 'What we build by industry'}
            subtitle={
              es
                ? 'Cada sector tiene sus propios cuellos de botella. Conoce los problemas típicos de tu industria y cómo los resolvemos con software a medida e IA.'
                : 'Every sector has its own bottlenecks. See the typical problems in your industry and how we solve them with custom software and AI.'
            }
          />
          <IndustryGrid />
        </Container>
      </section>

      <CtaBand />
    </>
  );
};

export const CaseDetail: React.FC = () => {
  const { slug } = useParams();
  const { lang, tr, trList } = useLang();
  const item = cases.find((c) => c.slug === slug);
  if (!item) return <Navigate to="/casos" replace />;
  const es = lang === 'es';

  return (
    <>
      <section className="bg-[#070f19] border-b border-white/10">
        <Container className="py-16 sm:py-20 space-y-6">
          <Link to="/casos" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" />
            {es ? 'Todos los casos' : 'All cases'}
          </Link>
          <Eyebrow>{tr(item.sector)}</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.05]">{tr(item.title)}</h1>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-bold text-slate-400">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 hover:text-cyan-200"
              >
                {item.url.replace('https://', '')}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {item.links?.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-cyan-200"
              >
                {tr(l.label)}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-14">
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <CaseVisual item={item} tall />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-3">
              <Eyebrow>{es ? 'El reto' : 'The challenge'}</Eyebrow>
              <p className="text-slate-300 leading-relaxed">{tr(item.challenge)}</p>
            </div>
            <div className="space-y-3">
              <Eyebrow>{es ? 'La solución' : 'The solution'}</Eyebrow>
              <p className="text-slate-300 leading-relaxed">{tr(item.solution)}</p>
            </div>
            <div className="space-y-3">
              <Eyebrow>{es ? 'El resultado' : 'The result'}</Eyebrow>
              <CheckList items={trList(item.results)} />
            </div>
          </div>

          {item.features && (
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{es ? 'Qué construimos' : 'What we built'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {item.features.map((f) => (
                  <div key={f.title.es} className="spotlight reveal rounded-3xl border border-white/10 bg-white/[0.03] p-7 space-y-4">
                    <h3 className="text-lg font-extrabold text-white">{tr(f.title)}</h3>
                    <CheckList items={trList(f.items)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.gallery && (
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{es ? 'Galería' : 'Gallery'}</h2>
              <div className={`grid grid-cols-1 gap-5 ${item.gallery.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {item.gallery.map((g) => (
                  <figure key={g.image} className="reveal group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
                    <div className="aspect-[4/3] overflow-hidden bg-black">
                      <img
                        src={caseImages[g.image]}
                        alt={tr(g.caption)}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="px-5 py-4 text-sm font-semibold text-slate-300">{tr(g.caption)}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          <ButtonLink to="/contacto">{es ? 'Quiero algo así' : 'I want something like this'}</ButtonLink>
        </Container>
      </section>
      <CtaBand />
    </>
  );
};
