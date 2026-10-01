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

      <EbsOffer />

      <CtaBand />
    </>
  );
};
