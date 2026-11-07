import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '../lib/lang';
import { services } from '../data/site';
import { ButtonLink, Container, CtaBand, Eyebrow } from '../components/ui';
import { ServiceBadge, ServiceIcon } from '../components/ServiceIcon';
import { CheckList } from './Home';
import { NeonLogoVideo } from '../components/NeonLogoVideo';
import { EbsOffer } from '../components/EbsOffer';
import softwareFlow from '../../asset/software-flow.mp4';
import aiOrb from '../../asset/ai-orb.mp4';
import mobileStreams from '../../asset/mobile-streams.mp4';
import webStreams from '../../asset/web-streams.mp4';
import consultingCore from '../../asset/consulting-core.mp4';

/** Service-specific hero clips (any service without one shows the neon logo); `box` overrides position and size. */
const heroVideos: Record<string, { src: string; poster: string; box?: string }> = {
  'software-a-medida': { src: softwareFlow, poster: '/software-flow-poster.jpg' },
  'agentes-ia': { src: aiOrb, poster: '/ai-orb-poster.jpg', box: 'left-[78%] w-[min(52rem,46vw)]' },
  'apps-moviles': { src: mobileStreams, poster: '/mobile-streams-poster.jpg', box: 'left-[78%] w-[min(52rem,46vw)]' },
  'web-y-producto': { src: webStreams, poster: '/web-streams-poster.jpg', box: 'left-[78%] w-[min(52rem,46vw)]' },
  consultoria: { src: consultingCore, poster: '/consulting-core-poster.jpg', box: 'left-[78%] w-[min(52rem,46vw)]' },
};
const DEFAULT_BOX = 'left-[81.5%] w-[min(39.5rem,34vw)]';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const { lang, tr, trList } = useLang();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/servicios" replace />;
  const es = lang === 'es';

  return (
    <>
      <section className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
        <div className="absolute inset-0 bg-grid" aria-hidden />
      <NeonLogoVideo
        src={heroVideos[service.slug]?.src}
        poster={heroVideos[service.slug]?.poster}
        className={`hidden lg:block absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${heroVideos[service.slug]?.box ?? DEFAULT_BOX}`}
      />
        <Container className="relative py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
          <Link to="/servicios" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-cyan-300">
            <ArrowLeft className="w-4 h-4" />
            {es ? 'Todos los servicios' : 'All services'}
          </Link>
          <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center">
            <ServiceIcon name={service.icon} className="w-7 h-7" />
          </div>
          {service.badge && <ServiceBadge label={tr(service.badge)} />}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.05]">{tr(service.title)}</h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">{tr(service.description)}</p>
          <ButtonLink to="/contacto">{service.cta ? tr(service.cta) : es ? 'Cotizar este servicio' : 'Get a quote'}</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-white/10 p-8 space-y-6">
            <Eyebrow>{es ? 'Qué hacemos' : 'What we do'}</Eyebrow>
            <CheckList items={trList(service.bullets)} />
          </div>
          <div className="rounded-3xl bg-ink p-8 space-y-6">
            <Eyebrow light>{es ? 'Qué recibes' : 'What you get'}</Eyebrow>
            <CheckList light items={trList(service.deliverables)} />
          </div>
        </Container>
      </section>

      {service.slug === 'agentes-ia' && (
        <section className="py-16 bg-gradient-to-b from-[#070f19] to-[#030712] border-t border-cyan-500/20">
          <Container className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60">
                {es ? 'Tarifas Transparentes & Consumo Protegido' : 'Transparent Pricing & Protected Tokens'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {es ? 'Planes de Implementación de Agentes de IA' : 'AI Agent Deployment Plans'}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {es
                  ? 'Sin sorpresas en facturación de tokens: cobro plano mensual con monitoreo técnico y calibración RAG continua.'
                  : 'Zero token billing surprises: flat monthly rate with technical monitoring and continuous RAG fine-tuning.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan 1: Starter PyME */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                      Starter PyME
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 line-through">Ref: $390.000</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {es ? 'Agente WhatsApp o Web' : 'WhatsApp or Web Agent'}
                  </h3>
                  <div className="pt-2">
                    <div className="text-3xl font-black text-white">$120.000 <span className="text-xs font-normal text-slate-400">+ IVA</span></div>
                    <div className="text-xs text-cyan-300 font-mono font-semibold mt-1">
                      {es ? '+ $15.000 CLP/mes tokens & mantención' : '+ $15,000 CLP/mo tokens & maintenance'}
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 pt-3 border-t border-slate-800">
                    <li className="flex items-center gap-2">✓ <span>{es ? '1 Canal: WhatsApp Oficial o Web' : '1 Channel: WhatsApp or Web'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Base de conocimiento RAG (Manuales y FAQs)' : 'RAG Knowledge base (Manuals & FAQs)'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Cero alucinaciones (Citas de fuentes)' : 'Zero hallucinations (Strict citations)'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Derivación inteligente a ejecutivo humano' : 'Smart handoff to human rep'}</span></li>
                  </ul>
                </div>
                <ButtonLink to="/contacto" className="w-full text-center">{es ? 'Contratar Starter' : 'Choose Starter'}</ButtonLink>
              </div>

              {/* Plan 2: Omnicanal Pro */}
              <div className="rounded-3xl bg-gradient-to-b from-[#0d1e38] to-slate-900 border-2 border-cyan-500/60 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                  ★ {es ? 'Más Recomendado' : 'Most Popular'}
                </span>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
                      Omnicanal Pro
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">API + n8n</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {es ? 'WhatsApp + Web + CRM' : 'WhatsApp + Web + CRM'}
                  </h3>
                  <div className="pt-2">
                    <div className="text-3xl font-black text-white">$250.000 <span className="text-xs font-normal text-slate-400">+ IVA</span></div>
                    <div className="text-xs text-cyan-300 font-mono font-semibold mt-1">
                      {es ? '+ $30.000 CLP/mes tokens & mantención' : '+ $30,000 CLP/mo tokens & maintenance'}
                    </div>
                  </div>
                  <ul className="text-xs text-slate-200 space-y-2 pt-3 border-t border-cyan-900/50">
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Doble canal simultáneo (WhatsApp + Web)' : 'Dual channel (WhatsApp + Web)'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Conexión a CRM, Sheets o Base de Datos' : 'Sync to CRM, Sheets or Database'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Calificación automática de prospectos' : 'Automated lead qualification'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Agendamiento autónomo de reuniones' : 'Autonomous calendar booking'}</span></li>
                  </ul>
                </div>
                <ButtonLink to="/contacto" className="w-full text-center">{es ? 'Contratar Omnicanal Pro' : 'Choose Omnichannel Pro'}</ButtonLink>
              </div>

              {/* Plan 3: Enterprise / Tutor Dedicado */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                      Enterprise / Campus
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Dedicado</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {es ? 'Tutor o Agente Especializado' : 'Specialized Agent / Tutor'}
                  </h3>
                  <div className="pt-2">
                    <div className="text-3xl font-black text-white">Desde $490.000 <span className="text-xs font-normal text-slate-400">+ IVA</span></div>
                    <div className="text-xs text-amber-300 font-mono font-semibold mt-1">
                      {es ? 'Infraestructura & Tokens a Medida' : 'Tailored Tokens & Infra'}
                    </div>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 pt-3 border-t border-slate-800">
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Tutor Pedagógico RAG para Campus/Moodle' : 'RAG Pedagogical Tutor for Campus/Moodle'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Conexión a ERP / SQL interno corporativo' : 'Deep ERP / Corporate SQL connection'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'Modelos con Fine-Tuning y embeddings propios' : 'Fine-tuned models & custom embeddings'}</span></li>
                    <li className="flex items-center gap-2">✓ <span>{es ? 'SLA de soporte y monitoreo dedicado' : 'Dedicated SLA and monitoring'}</span></li>
                  </ul>
                </div>
                <ButtonLink to="/contacto" className="w-full text-center">{es ? 'Cotizar Enterprise' : 'Get Enterprise Quote'}</ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      )}

      <EbsOffer />

      <CtaBand />
    </>
  );
};
