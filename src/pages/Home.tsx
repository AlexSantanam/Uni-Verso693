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
        <Container className="relative w-full py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {es ? "Estudio de Ingeniería de Software & Inteligencia Artificial · Chile" : "Software Engineering & Applied AI Studio · Chile"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              {es ? (
                <>
                  Desarrollo de Software a Medida, Apps Móviles, Inteligencia Artificial y Sistemas de <span className="text-gradient-brand">Alta Velocidad en Chile</span>
                </>
              ) : (
                <>
                  Custom Software Engineering, Mobile Apps, Applied AI & High-Speed Cloud Systems in <span className="text-gradient-brand">Chile</span>
                </>
              )}
            </h1>

            {/* Direct Answer Block: Optimized for Google AI Overviews, ChatGPT, Claude and Chilean Decision Makers */}
            <div className="rounded-2xl border border-cyan-500/25 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                {es ? "¿Qué es UNIVERSO693 y qué resuelve?" : "What is UNIVERSO693 and what do we solve?"}
              </p>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {es ? (
                  <>
                    <strong className="text-white">UNIVERSO693 SpA</strong> es una firma chilena de ingeniería de software e inteligencia artificial aplicada fundada en 2013. Diseñamos y programamos <strong className="text-white">aplicaciones web, apps móviles nativas (iOS en Apple App Store y Android en Google Play)</strong>, plataformas SaaS y <strong className="text-cyan-300">sistemas de automatización integral con agentes autónomos de IA</strong> integrados a ERPs, CRMs y flujos operativos de negocio. Construimos tecnología de vanguardia con latencia sub-segundo, arquitectura cloud resiliente y <strong className="text-cyan-300">100% de propiedad del código fuente</strong> entregado al cliente en su Bóveda Soberana (cero costo de licencias cautivas y 0% vendor lock-in). Cada desarrollo cuenta con garantía técnica de 60 días y entrega ágil en 7 a 28 días.
                  </>
                ) : (
                  <>
                    <strong className="text-white">UNIVERSO693 SpA</strong> is an established Chilean software engineering and applied AI firm founded in 2013. We architect and engineer <strong className="text-white">enterprise web platforms, native mobile applications (iOS & Android)</strong>, scalable SaaS products, and <strong className="text-cyan-300">end-to-end cognitive automation systems powered by autonomous AI agents</strong> deeply connected to ERPs, CRMs, and core business workflows. We engineer bleeding-edge cloud architectures with sub-second latency, bank-grade security, and <strong className="text-cyan-300">100% client code ownership</strong> deposited in their Sovereign Vault (zero recurring license lock-ins). Every project includes a 60-day technical warranty and 7-to-28 day agile delivery.
                  </>
                )}
              </p>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{es ? "iOS, Android y Web" : "iOS, Android & Web"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{es ? "Entrega 7-28 días" : "7-28 days delivery"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{es ? "0% vendor lock-in" : "0% vendor lock-in"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{es ? "Garantía 60 días" : "60-day warranty"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink to="/diagnostico-ia">
                {es ? "Agendar Diagnóstico 45 min (EBS 693)" : "Book 45-min Diagnosis (EBS 693)"}
              </ButtonLink>
              <ButtonLink to="/casos" variant="secondary">
                {es ? "Ver casos de éxito con métricas" : "See case studies with metrics"}
              </ButtonLink>
            </div>

            <div className="pt-1">
              <Link to="/contacto" className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white">
                {es ? "¿Prefieres cotizar directo? Escríbenos y un ingeniero te responde en <2 horas" : "Prefer a direct quote? Contact us and an engineer replies in <2 hours"}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
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
