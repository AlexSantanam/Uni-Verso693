import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, Building2, CheckCircle2, CreditCard, GraduationCap, Server, ShieldCheck, Sparkles, TrendingUp, Truck, Zap } from 'lucide-react';
import { useLang } from '../lib/lang';
import { cases } from '../data/site';
import { ButtonLink, Container, CtaBand, Eyebrow, PageHero, SectionHeading } from '../components/ui';
import { CaseCard, CaseVisual, caseImages } from '../components/CaseCard';
import { IndustryGrid } from '../components/IndustryGrid';
import { industries } from '../data/industries';
import { CheckList } from './Home';

const enterpriseProjects = [
  {
    icon: GraduationCap,
    badge: { es: 'LMS Soberano', en: 'Sovereign LMS' },
    sector: { es: 'Educación & Capacitación OTEC', en: 'Education & Corporate Training' },
    title: { es: 'Campus Virtual Propio & Cumplimiento SENCE', en: 'Proprietary Virtual Campus & SENCE Compliance' },
    description: {
      es: 'Plataforma PWA de e-learning sin licencias por alumno, con Libro de Clases Digital sincronizado, control de asistencia y diplomas con código QR verificables en tiempo real.',
      en: 'Proprietary PWA LMS with zero per-student fees, synchronized digital class ledger, attendance tracking, and real-time QR-verified diplomas.',
    },
    impact: { es: '+3.000 alumnos capacitados con 100% de trazabilidad', en: '+3,000 students trained with 100% audited traceability' },
    tags: ['React', 'PWA', 'PostgreSQL', 'SENCE NCh 2728', 'QR Verify'],
  },
  {
    icon: Truck,
    badge: { es: 'Logística en Tiempo Real', en: 'Real-Time Logistics' },
    sector: { es: 'Transporte & Distribución', en: 'Transport & Distribution' },
    title: { es: 'Sistema de Despacho & Control de Flota Móvil', en: 'Dispatch System & Mobile Fleet Control' },
    description: {
      es: 'Web App para choferes con digitalización de guías por cámara (OCR), control de entregas con georreferenciación y seguimiento automático para clientes por WhatsApp.',
      en: 'Mobile web app for drivers with in-camera document OCR, geolocated delivery proof, and automated client shipment tracking via WhatsApp.',
    },
    impact: { es: '45 horas/mes ahorradas en digitación manual de guías', en: '45 hours/month saved in manual dispatch paperwork' },
    tags: ['OCR Documental', 'WhatsApp API', 'Geolocalización', 'Node.js'],
  },
  {
    icon: CreditCard,
    badge: { es: 'Fintech & Pagos', en: 'Fintech & Payments' },
    sector: { es: 'E-commerce & Servicios B2B', en: 'E-commerce & B2B Services' },
    title: { es: 'Portal B2B de Cobros & Facturación SII', en: 'B2B Payment Portal & Electronic Invoicing' },
    description: {
      es: 'Integración multipasarela (Webpay Plus, Flow, Mercado Pago) con webhooks tolerantes a fallos, conciliación bancaria diaria y emisión instantánea de DTE tributarios.',
      en: 'Multi-gateway checkout (Webpay Plus, Flow, Mercado Pago) with fault-tolerant webhooks, automated reconciliation, and instant tax invoice generation.',
    },
    impact: { es: '0% de ventas perdidas por caídas de pasarela y conciliación 1:1', en: '0% lost sales to gateway downtime and 100% automated reconciliation' },
    tags: ['Webpay Plus', 'Flow', 'Mercado Pago', 'SII DTE', 'Webhooks'],
  },
  {
    icon: Bot,
    badge: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
    sector: { es: 'Servicios al Cliente & Soporte', en: 'Customer Operations & Support' },
    title: { es: 'Agente Cognitivo RAG para Atención 24/7', en: 'Cognitive RAG Agent for 24/7 Operations' },
    description: {
      es: 'Agente autónomo entrenado con normativas, catálogos y manuales de la empresa. Atiende consultas complejas por WhatsApp y web sin alucinaciones, derivando a ejecutivos.',
      en: 'Autonomous agent grounded on company manuals, catalogs, and policies. Resolves complex questions via WhatsApp with zero hallucinations and human handoff.',
    },
    impact: { es: '78% de consultas resueltas en el primer minuto sin intervención', en: '78% of incoming queries resolved in under 1 minute automatically' },
    tags: ['RAG Vectorial', 'pgvector', 'Meta WhatsApp', 'CRM Sync'],
  },
  {
    icon: Building2,
    badge: { es: 'PropTech', en: 'PropTech' },
    sector: { es: 'Bienes Raíces & Inversión', en: 'Real Estate & Investments' },
    title: { es: 'Portal Inmobiliario & Simulador Financiero en UF', en: 'Real Estate Portal & UF Mortgage Simulator' },
    description: {
      es: 'Buscador avanzado de proyectos, cálculo de plusvalía y simulación de dividendos con tasas bancarias dinámicas. Enrutamiento directo de leads calificados al equipo comercial.',
      en: 'Advanced project directory, capital gain forecasts, and dynamic mortgage calculators in UF. Direct qualified lead routing to sales teams.',
    },
    impact: { es: '+40% en tasa de conversión de visitas a reuniones agendadas', en: '+40% conversion rate from visitors to scheduled advisory calls' },
    tags: ['React', 'Simulador UF', 'CRO Optimization', 'TailwindCSS'],
  },
  {
    icon: Server,
    badge: { es: 'DevOps & Cloud', en: 'DevOps & Cloud' },
    sector: { es: 'Infraestructura & Seguridad', en: 'Infrastructure & Security' },
    title: { es: 'Migración Cloud & Infraestructura Soberana', en: 'Cloud Migration & Sovereign Infrastructure' },
    description: {
      es: 'Modernización y migración de servidores físicos hacia infraestructura cloud (AWS / GCP) contenerizada en Docker, con backups automáticos y entrega de claves en Bóveda Cliente.',
      en: 'Legacy server modernization to containerized cloud architectures (AWS / GCP) with automated daily backups and full vault credential handover.',
    },
    impact: { es: '99.9% uptime continuo y reducción de 35% en costos de servidor', en: '99.9% continuous uptime and 35% reduction in cloud server costs' },
    tags: ['AWS Cloud', 'Docker', 'CI/CD Pipelines', 'Bóveda Digital'],
  },
];

export const Cases: React.FC = () => {
  const { lang, tr } = useLang();
  const es = lang === 'es';
  const stats = [
    { value: '2013', label: es ? 'Construyendo software desde' : 'Building software since' },
    { value: '+50', label: es ? 'Proyectos y despliegues en la nube' : 'Cloud projects & deployments' },
    { value: '14', label: es ? 'Industrias con soluciones activas' : 'Industries with active solutions' },
    { value: '100%', label: es ? 'Código propio y custodia en Bóveda' : 'Proprietary code & Sovereign Vault' },
  ];

  return (
    <>
      <PageHero
        eyebrow={{ es: 'Casos y Desarrollos', en: 'Cases & Developments' }}
        title={{ es: 'Convertimos desafíos de negocio en software que opera y escala', en: 'We turn business challenges into software that operates and scales' }}
        subtitle={{
          es: 'Plataformas interactivas, sistemas corporativos y soluciones a medida diseñadas para empresas en Chile y el mundo.',
          en: 'Interactive platforms, enterprise systems, and custom solutions engineered for companies in Chile and worldwide.',
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

      {/* Casos de Estudio Profundos */}
      <section className="py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow={es ? 'Plataformas interactivas' : 'Interactive platforms'}
            title={es ? 'Casos de estudio en producción' : 'Featured case studies in production'}
            subtitle={es ? 'Plataformas completas que diseñamos, construimos y puedes probar directamente.' : 'Full platforms we designed and built that you can test live.'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <CaseCard key={c.slug} item={c} />
            ))}
          </div>
        </Container>
      </section>

      {/* Portafolio de Sistemas y Desarrollos Implementados */}
      <section className="py-20 bg-[#070f19] border-t border-white/10">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow={es ? 'Portafolio de Soluciones' : 'Solutions Portfolio'}
            title={es ? 'Sistemas y desarrollos corporativos en operación' : 'Enterprise systems & developments in operation'}
            subtitle={
              es
                ? 'Una muestra de plataformas a medida, integraciones de misión crítica e infraestructuras cloud que hemos entregado bajo custodia soberana.'
                : 'A selection of custom platforms, mission-critical integrations, and cloud infrastructure delivered under sovereign custody.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseProjects.map((proj) => {
              const Icon = proj.icon;
              return (
                <div
                  key={proj.title.es}
                  className="spotlight reveal rounded-3xl border border-white/10 bg-white/[0.03] p-7 flex flex-col justify-between space-y-5 transition-all hover:border-cyan-400/40 hover:bg-white/[0.05]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold text-cyan-300">
                        {tr(proj.badge)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-400">{tr(proj.sector)}</p>
                      <h3 className="text-lg font-extrabold text-white leading-snug">{tr(proj.title)}</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {tr(proj.description)}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <span>{tr(proj.impact)}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((t) => (
                        <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
