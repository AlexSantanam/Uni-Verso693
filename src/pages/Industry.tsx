import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useLang } from '../lib/lang';
import { industries, industryBySlug, industryCopy } from '../data/industries';
import { Container, Eyebrow, SectionHeading } from '../components/ui';
import { ParticleField } from '../components/effects';
import { NeonLogoVideo } from '../components/NeonLogoVideo';
import construccionClip from '../../asset/ind-construccion.mp4';
import agroClip from '../../asset/ind-agro.mp4';
import manufacturaClip from '../../asset/ind-manufactura.mp4';
import turismoClip from '../../asset/ind-turismo.mp4';
import alimentacionClip from '../../asset/ind-alimentacion.mp4';
import finanzasClip from '../../asset/ind-finanzas.mp4';
import segurosClip from '../../asset/ind-seguros.mp4';
import mineriaClip from '../../asset/ind-mineria.mp4';
import educacionClip from '../../asset/ind-educacion.mp4';
import estudiosClip from '../../asset/ind-estudios.mp4';
import retailClip from '../../asset/ind-retail.mp4';
import inmobiliariasClip from '../../asset/ind-inmobiliarias.mp4';
import saludClip from '../../asset/ind-salud.mp4';
import transporteClip from '../../asset/ind-transporte.mp4';

/** Industry-specific hero clips (any industry without one shows the neon logo). */
const heroVideos: Record<string, { src: string; poster: string }> = {
  construccion: { src: construccionClip, poster: '/ind-construccion-poster.jpg' },
  agro: { src: agroClip, poster: '/ind-agro-poster.jpg' },
  manufactura: { src: manufacturaClip, poster: '/ind-manufactura-poster.jpg' },
  'turismo-y-hoteleria': { src: turismoClip, poster: '/ind-turismo-poster.jpg' },
  'alimentacion-y-restaurantes': { src: alimentacionClip, poster: '/ind-alimentacion-poster.jpg' },
  'banca-y-finanzas': { src: finanzasClip, poster: '/ind-finanzas-poster.jpg' },
  seguros: { src: segurosClip, poster: '/ind-seguros-poster.jpg' },
  mineria: { src: mineriaClip, poster: '/ind-mineria-poster.jpg' },
  educacion: { src: educacionClip, poster: '/ind-educacion-poster.jpg' },
  'estudios-profesionales': { src: estudiosClip, poster: '/ind-estudios-poster.jpg' },
  'retail-y-ecommerce': { src: retailClip, poster: '/ind-retail-poster.jpg' },
  inmobiliarias: { src: inmobiliariasClip, poster: '/ind-inmobiliarias-poster.jpg' },
  'clinicas-y-salud': { src: saludClip, poster: '/ind-salud-poster.jpg' },
  'transporte-y-flotas': { src: transporteClip, poster: '/ind-transporte-poster.jpg' },
};
const VIDEO_BOX = 'left-[78%] w-[min(52rem,46vw)]';
const DEFAULT_BOX = 'left-[81.5%] w-[min(39.5rem,34vw)]';

/** Industry landing (/ia-para/:slug). Not linked from the main menu; see src/data/industries.ts. */
export const Industry: React.FC = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const es = lang === 'es';
  const t = (a: string, b: string) => (es ? a : b);
  const found = slug ? industryBySlug(slug) : undefined;
  if (!found) return <Navigate to="/" replace />;
  const ind = industryCopy(found, lang);
  const others = industries.filter((i) => i.slug !== ind.slug).map((i) => industryCopy(i, lang));

  return (
    <>
      <section className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
        <NeonLogoVideo
          src={heroVideos[ind.slug]?.src}
          poster={heroVideos[ind.slug]?.poster}
          className={`hidden lg:block absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${heroVideos[ind.slug] ? VIDEO_BOX : DEFAULT_BOX}`}
        />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl lg:max-w-[40rem] space-y-7">
            <Eyebrow>
              {t('IA para', 'AI for')} {ind.name.toLowerCase()}
            </Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">{ind.h1}</h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">{ind.intro}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/audit-693"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-extrabold text-white shadow-xl shadow-brand-600/40"
              >
                {t('Analizar mi sitio gratis', 'Analyse my site for free')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/diagnostico-ia" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                {t('Diagnóstico EBS 693 con el equipo →', 'EBS 693 diagnosis with the team →')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading eyebrow={t('Dónde se pierde tiempo y plata', 'Where time and money leak')} title={`${t('Lo que vemos en', 'What we see in')} ${ind.audience}`} />
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
            <SectionHeading eyebrow={t('Qué resuelve la IA', 'What AI solves')} title={t('Casos de uso concretos', 'Concrete use cases')} />
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
              <h2 className="font-extrabold text-white">{t('Qué hay que cuidar', 'What to watch out for')}</h2>
              <p className="text-slate-300 leading-relaxed">{ind.care}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/5 bg-white/[0.02] py-20">
        <Container className="space-y-10">
          <SectionHeading center eyebrow={t('Cómo partir', 'How to start')} title={t('De la idea al sistema funcionando, paso a paso', 'From idea to a working system, step by step')} />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { t: t('Audit 693 gratis', 'Free Audit 693'), d: t('Ingresa tu sitio y ve en un minuto 3 oportunidades de IA para tu empresa.', 'Enter your site and see 3 AI opportunities for your business in a minute.'), to: '/audit-693' },
              { t: 'AUDIT 693 PRO', d: t('Informe de Fugas de Dinero en PDF: tu sitio a fondo, tu competencia y el costo de tu trabajo manual.', 'Money Leak Report as a PDF: your site in depth, your competitors and the cost of your manual work.'), to: '/audit-693#pro' },
              { t: t('Diagnóstico EBS 693', 'EBS 693 diagnosis'), d: t('Sesión de 45 minutos con el equipo: qué implementar primero, cómo y con qué retorno.', 'A 45-minute session with the team: what to implement first, how, and with what return.'), to: '/diagnostico-ia' },
            ].map((s, i) => (
              <li key={s.t}>
                <Link to={s.to} className="group block h-full rounded-3xl border border-white/10 bg-[#060a14] p-7 space-y-3 hover:border-brand-500/50 transition-colors">
                  <span className="text-sm font-black text-brand-500">0{i + 1}</span>
                  <h3 className="text-lg font-extrabold text-white">{s.t}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                    {t('Ver más', 'Learn more')} <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t('Preguntas frecuentes', 'Frequently asked questions')}</h2>
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
                <Sparkles className="w-4 h-4 text-cyan-300" /> {t('IA para otras industrias', 'AI for other industries')}
              </p>
              <div className="flex flex-wrap gap-2">
                {others.map((o) => (
                  <Link key={o.slug} to={`/ia-para/${o.slug}`} className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/50 hover:text-white">
                    {o.name}
                  </Link>
                ))}
                <Link to="/blog/inteligencia-artificial-por-industria-chile" className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-300 hover:border-cyan-400/50 hover:text-white">
                  {t('Guía por industria →', 'Industry guide →')}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
