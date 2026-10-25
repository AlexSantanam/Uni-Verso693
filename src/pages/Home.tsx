import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, KeyRound, ShieldCheck } from 'lucide-react';
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
                  Software e IA que eliminan el <span className="text-gradient-brand">trabajo manual</span> de tu empresa
                </>
              ) : (
                <>
                  Software and AI that remove <span className="text-gradient-brand">manual work</span> from your business
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
            <Link to="/diagnostico-ia" className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
              {es ? "¿No sabes por dónde partir? Diagnóstico EBS 693: 45 minutos y una hoja de ruta con ROI" : "Not sure where to start? EBS 693 diagnosis: 45 minutes and an ROI roadmap"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
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

      {/* Soberanía Tecnológica / Bóveda Digital */}
      <section className="py-20 bg-gradient-to-b from-[#02060c] via-[#040e1b] to-[#02060c] border-y border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <Container className="relative">
          <div className="rounded-3xl border border-cyan-400/30 bg-[#071322]/80 backdrop-blur-xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl shadow-cyan-500/5">
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold text-cyan-200">
                <ShieldCheck className="w-4 h-4 text-cyan-300" />
                {es ? 'Compromiso Ético Uni-Verso693' : 'Uni-Verso693 Ethical Standard'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {es ? (
                  <>Garantía de Cero Secuestro Tecnológico: <span className="text-gradient-brand">Tu Bóveda Digital</span></>
                ) : (
                  <>Zero Vendor Lock-in Guarantee: <span className="text-gradient-brand">Your Sovereign Vault</span></>
                )}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {es
                  ? 'A diferencia de las agencias tradicionales que retienen tus contraseñas y servidores para amarrarte, en Uni-Verso693 garantizamos tu independencia: cada cliente recibe acceso permanente a su Bóveda Digital con el 100% de sus credenciales, bases de datos y accesos desde el primer día a costo $0.'
                  : 'Unlike agencies that hold your credentials hostage to lock you in, at Uni-Verso693 we guarantee your technological independence: every client gets 24/7 access to their Sovereign Vault with 100% of their keys, databases, and infrastructure at zero cost.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-cyan-300 font-bold text-sm mb-1">{es ? '🔑 100% Accesos' : '🔑 100% Control'}</div>
                  <div className="text-xs text-slate-400">{es ? 'Servidores, DNS, BD y Superadmin.' : 'Servers, DNS, DB & Superadmin.'}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-cyan-300 font-bold text-sm mb-1">{es ? '🛡️ Cero Amarres' : '🛡️ Zero Lock-in'}</div>
                  <div className="text-xs text-slate-400">{es ? 'Libre de migrar cuando tú decidas.' : 'Free to migrate whenever you want.'}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-cyan-300 font-bold text-sm mb-1">{es ? '📦 Respaldo JSON' : '📦 JSON Backup'}</div>
                  <div className="text-xs text-slate-400">{es ? 'Exportable con 1 clic para custodia.' : '1-click export for offline custody.'}</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4 rounded-2xl border border-white/10 bg-[#050b14] p-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                <KeyRound className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">{es ? 'Portal Bóveda Cliente' : 'Client Vault Portal'}</h3>
              <p className="text-xs text-slate-400">
                {es ? 'Ingresa con tu correo y contraseña corporativa para revisar o respaldar tus accesos.' : 'Log in with your corporate email to review or backup your credentials.'}
              </p>
              <Link
                to="/boveda"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-500 px-6 py-3 text-sm font-bold text-white transition-all shadow-lg shadow-cyan-500/20"
              >
                {es ? 'Acceder a la Bóveda' : 'Enter Vault'}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

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
