import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../lib/lang';
import { services } from '../data/site';
import { Container, CtaBand, PageHero } from '../components/ui';
import { ServiceIcon } from '../components/ServiceIcon';

export const Services: React.FC = () => {
  const { tr, lang } = useLang();
  return (
    <>
      <PageHero
        eyebrow={{ es: 'Servicios', en: 'Services' }}
        title={{ es: 'Software, IA y producto digital de punta a punta', en: 'Software, AI and digital product, end to end' }}
        subtitle={{
          es: 'Cinco líneas de servicio que cubren desde la estrategia hasta la operación de tu producto.',
          en: 'Five service lines covering everything from strategy to running your product.',
        }}
      />
      <section className="py-20">
        <Container className="space-y-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/servicios/${s.slug}`}
              className="group spotlight reveal grid grid-cols-1 md:grid-cols-12 gap-6 rounded-3xl border border-white/10 p-8 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
            >
              <div className="md:col-span-1">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-cyan-300 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <ServiceIcon name={s.icon} />
                </div>
              </div>
              <div className="md:col-span-5 space-y-2">
                <h2 className="text-2xl font-extrabold text-white">{tr(s.title)}</h2>
                <p className="text-sm font-semibold text-cyan-300">{tr(s.tagline)}</p>
              </div>
              <p className="md:col-span-5 text-slate-400 leading-relaxed">{tr(s.description)}</p>
              <div className="md:col-span-1 flex md:justify-end items-start">
                <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-300" aria-label={lang === 'es' ? 'Ver detalle' : 'View detail'} />
              </div>
            </Link>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
};
