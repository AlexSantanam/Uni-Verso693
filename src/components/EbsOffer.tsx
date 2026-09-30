import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, MessagesSquare, Receipt } from 'lucide-react';
import { useLang } from '../lib/lang';
import { ebs } from '../data/site';
import { Container, Eyebrow } from './ui';
import { WhatsAppButton } from './WhatsAppButton';
import { CalendlyButton } from './CalendlyButton';

/** Paid entry product: 90-minute strategic diagnosis with an ROI roadmap. */
export const EbsOffer: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';

  const points = [
    {
      icon: Clock3,
      title: es ? '90 minutos, hoja de ruta con ROI' : '90 minutes, an ROI roadmap',
      text: es ? 'Te entregamos un plan concreto y priorizado, no un PowerPoint.' : 'You get a concrete, prioritized plan, not a slide deck.',
    },
    {
      icon: Receipt,
      title: es ? 'Se descuenta de tu proyecto' : 'Credited to your project',
      text: es ? 'Si decides avanzar con nosotros, el monto se abona al proyecto.' : 'If you move forward with us, the fee is credited to the project.',
    },
    {
      icon: MessagesSquare,
      title: es ? 'Directo con quienes construyen' : 'Straight to the builders',
      text: es ? 'Conversas con el equipo que diseña y desarrolla, no con vendedores.' : 'You talk to the team that designs and builds, not to salespeople.',
    },
  ];

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="glow-card reveal rounded-[2.5rem]">
          <div className="relative overflow-hidden rounded-[calc(2.5rem-1px)] bg-[#060a14] p-8 sm:p-12 lg:p-14">
            {/* smaller, fainter aurora than the square card: this card is much wider */}
            <div className="aurora a" style={{ width: '40%', opacity: 0.28 }} aria-hidden />
            <div className="aurora b" style={{ width: '40%', opacity: 0.22 }} aria-hidden />
            <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Eyebrow>{ebs.name}</Eyebrow>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
                  {es ? (
                    <>
                      La <span className="text-gradient-brand">anti-consultoría</span>
                    </>
                  ) : (
                    <>
                      The <span className="text-gradient-brand">anti-consultancy</span>
                    </>
                  )}
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                  {es
                    ? 'Un diagnóstico estratégico para saber exactamente qué automatizar o construir primero, cuánto cuesta y qué retorno esperar.'
                    : 'A strategic diagnosis to know exactly what to automate or build first, what it costs and what return to expect.'}
                </p>
                <div className="space-y-5 pt-2">
                  {points.map((p) => (
                    <div key={p.title} className="flex items-start gap-4">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-500/15 text-cyan-300 flex items-center justify-center">
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{p.title}</h3>
                        <p className="text-sm text-slate-400">{p.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur p-8 text-center space-y-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {es ? 'Diagnóstico estratégico' : 'Strategic diagnosis'}
                  </p>
                  <p className="text-5xl font-black text-white tracking-tight">{ebs.price}</p>
                  <p className="text-sm text-slate-400">
                    {es ? 'Pago único · se descuenta del proyecto' : 'One-off fee · credited to the project'}
                  </p>
                  <Link
                    to="/contacto?interes=ebs"
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-colors"
                  >
                    {es ? 'Agendar mi diagnóstico' : 'Book my diagnosis'}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <CalendlyButton className="w-full" />
                  <WhatsAppButton
                    message={es ? 'Hola, quiero agendar el diagnóstico EBS 693.' : "Hi, I'd like to book the EBS 693 diagnosis."}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
