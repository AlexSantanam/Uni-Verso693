import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, Clock3, Receipt, Video } from 'lucide-react';
import { CALENDLY_URL, ebs } from '../data/site';
import { ebsFaqs, ebsForWho, ebsIncludes, ebsSteps } from '../data/ebs';
import { Container, Eyebrow, SectionHeading } from '../components/ui';
import { ParticleField } from '../components/effects';
import { WhatsAppButton } from '../components/WhatsAppButton';

const BookButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href={CALENDLY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-colors ${className}`}
  >
    <CalendarDays className="w-4 h-4" />
    Agendar mi diagnóstico
    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </a>
);

/** Dedicated landing for the paid EBS 693 diagnosis, so it can rank on its own. */
export const Diagnostico: React.FC = () => (
  <>
    <section className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
      <Container className="relative py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-7">
          <Eyebrow>{ebs.name} · la anti-consultoría</Eyebrow>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
            Diagnóstico de <span className="text-gradient-brand">inteligencia artificial</span> para tu empresa
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            En 45 minutos revisamos tu operación y te entregamos una hoja de ruta priorizada: qué automatizar o construir primero, cuánto cuesta y qué retorno esperar.
          </p>
          <div className="flex flex-wrap gap-3">
            <BookButton />
            <WhatsAppButton message="Hola, quiero consultar por el diagnóstico EBS 693." />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="glow-card rounded-[2rem]">
            <div className="rounded-[calc(2rem-1px)] bg-[#060a14] p-8 space-y-5 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Diagnóstico estratégico</p>
              <p className="text-5xl font-black text-white tracking-tight">{ebs.price}</p>
              <ul className="space-y-3 text-left text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <Clock3 className="w-4 h-4 text-cyan-300" /> Sesión de 45 minutos
                </li>
                <li className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-cyan-300" /> Remota, por Google Meet
                </li>
                <li className="flex items-center gap-3">
                  <Receipt className="w-4 h-4 text-cyan-300" /> Se descuenta del proyecto si avanzas
                </li>
              </ul>
              <BookButton className="w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section className="py-20">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-white">Qué incluye</h2>
          <ul className="space-y-3">
            {ebsIncludes.map((t) => (
              <li key={t} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                <Check className="w-5 h-5 shrink-0 text-cyan-300" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-white">Para quién es</h2>
          <ul className="space-y-3">
            {ebsForWho.map((t) => (
              <li key={t} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                <Check className="w-5 h-5 shrink-0 text-cyan-300" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>

    <section className="py-20 bg-[#070f19] border-y border-white/10">
      <Container className="space-y-12">
        <SectionHeading eyebrow="Cómo funciona" title="De la conversación a un plan que puedes ejecutar" />
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {ebsSteps.map((s, i) => (
            <li key={s.title} className="reveal space-y-3 border-t-2 border-cyan-400/60 pt-5">
              <div className="text-sm font-bold text-cyan-300">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-lg font-extrabold text-white">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>

    <section className="py-20">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4 space-y-5">
          <SectionHeading eyebrow="FAQ" title="Preguntas sobre el diagnóstico" />
          <p className="text-slate-400">
            ¿Prefieres ver ideas antes?{' '}
            <Link to="/audit-693" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Prueba el Audit 693 gratis →
            </Link>
          </p>
        </div>
        <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
          {ebsFaqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white">
                {f.q}
                <span className="text-2xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-slate-400 leading-relaxed max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>

    <section className="bg-ink py-20">
      <Container className="text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Decide con un plan, no con intuición</h2>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">45 minutos para saber exactamente dónde invertir en tecnología y con qué retorno.</p>
        <BookButton />
      </Container>
    </section>
  </>
);
