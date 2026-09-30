import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { useLang } from '../lib/lang';
import { cases, process, services, stats, faqs } from '../data/site';
import { ButtonLink, Container, CtaBand, SectionHeading } from '../components/ui';
import { ServiceBadge, ServiceIcon } from '../components/ServiceIcon';
import { CaseCard } from '../components/CaseCard';
import { ParticleField } from '../components/effects';
import { PlasmaVideo } from '../components/PlasmaVideo';
import { YndiPetSpotlight } from '../components/YndiPetSpotlight';
import { CustomProjectCard } from '../components/CustomProjectCard';
import { GlobalReach } from '../components/GlobalReach';
import { TechMarquee } from '../components/TechMarquee';
import { EbsOffer } from '../components/EbsOffer';

export const Home: React.FC = () => {
  const { lang, tr, trList } = useLang();
  const es = lang === 'es';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#02060c] min-h-[88vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(14,116,144,0.18),transparent_60%)]" aria-hidden />
        <ParticleField className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050b13] to-transparent" aria-hidden />
        <Container className="relative w-full py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs font-bold text-cyan-200">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
              {es ? "Esto está pasando…" : "This is happening…"}
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-white">
              {es ? (
                <>
                  Software e IA para que <span className="text-gradient-brand">domines el mañana</span>
                </>
              ) : (
                <>
                  Software and AI so you can <span className="text-gradient-brand">own tomorrow</span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
              {es
                ? "Diseñamos y construimos plataformas a medida, agentes de IA, aplicaciones móviles y productos digitales que impulsan a empresas en crecimiento."
                : "We design and build custom platforms, AI agents, mobile apps and digital products that drive growing companies forward."}
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/contacto">{es ? "Hablemos de tu proyecto" : "Let's talk about your project"}</ButtonLink>
              <ButtonLink to="/casos" variant="secondary">
                {es ? "Ver casos de éxito" : "See case studies"}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <PlasmaVideo className="w-[min(92vw,30rem)] lg:w-[120%] max-w-[38rem]" />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-[#070f19]">
        <Container className="py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.value} className="space-y-1">
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">{s.value}</div>
              <div className="text-sm text-slate-400">{tr(s.label)}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* Services */}
      <section className="py-24 sm:py-32">
        <Container className="space-y-14">
          <SectionHeading
            eyebrow={es ? 'Servicios' : 'Services'}
            title={es ? 'Todo lo que tu producto necesita, en un solo equipo' : 'Everything your product needs, in one team'}
            subtitle={
              es
                ? 'Desde la estrategia hasta la puesta en producción y la evolución continua.'
                : 'From strategy to production launch and continuous evolution.'
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/servicios/${s.slug}`}
                className="group spotlight reveal rounded-3xl border border-white/10 bg-white/[0.04] p-8 space-y-5 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-cyan-300 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <ServiceIcon name={s.icon} />
                </div>
                {s.badge && <ServiceBadge label={tr(s.badge)} />}
                <h3 className="text-xl font-extrabold text-white">{tr(s.title)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{tr(s.tagline)}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300">
                  {es ? 'Conocer más' : 'Learn more'}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
            <CustomProjectCard />
          </div>
        </Container>
      </section>

      <EbsOffer />

      <YndiPetSpotlight />

      {/* Cases */}
      <section className="py-24 sm:py-32 bg-[#070f19] border-y border-white/10">
        <Container className="space-y-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={es ? 'Casos de éxito' : 'Case studies'}
              title={es ? 'Proyectos que ya están en producción' : 'Projects already in production'}
            />
            <ButtonLink to="/casos" variant="secondary">
              {es ? 'Ver todos' : 'View all'}
            </ButtonLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 sm:py-32">
        <Container className="space-y-14">
          <SectionHeading
            eyebrow={es ? 'Cómo trabajamos' : 'How we work'}
            title={es ? 'Un proceso claro, de la idea a producción' : 'A clear process, from idea to production'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="spotlight reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4">
                <div className="text-5xl font-black text-brand-200">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-extrabold text-white">{tr(p.title)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{tr(p.text)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TechMarquee />

      <GlobalReach />

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title={es ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            />
          </div>
          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white">
                  {tr(f.q)}
                  <span className="text-2xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-slate-400 leading-relaxed max-w-2xl">{tr(f.a)}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
};

/** Small helper list used by other pages. */
export const CheckList: React.FC<{ items: string[]; light?: boolean }> = ({ items, light }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className={`flex items-start gap-3 text-sm leading-relaxed ${light ? 'text-slate-300' : 'text-slate-300'}`}>
        <Check className="w-5 h-5 shrink-0 text-cyan-300" />
        {item}
      </li>
    ))}
  </ul>
);
