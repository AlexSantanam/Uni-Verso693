import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang, type L } from '../lib/lang';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span
    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
      light ? 'text-brand-200' : 'text-cyan-300'
    }`}
  >
    <span className={`h-px w-6 ${light ? 'bg-brand-200' : 'bg-cyan-400'}`} />
    {children}
  </span>
);

export const SectionHeading: React.FC<{
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}> = ({ eyebrow, title, subtitle, center, light }) => (
  <div className={`max-w-3xl space-y-4 reveal ${center ? 'mx-auto text-center' : ''}`}>
    {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-white`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-400'}`}>{subtitle}</p>
    )}
  </div>
);

type ButtonProps = {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost-light';
  className?: string;
};

export const ButtonLink: React.FC<ButtonProps> = ({ to, children, variant = 'primary', className = '' }) => {
  const styles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/25',
    secondary: 'bg-white/[0.04] text-white border border-white/15 hover:border-cyan-400/60',
    'ghost-light': 'bg-white/10 text-white border border-white/25 hover:bg-white/20',
  }[variant];
  return (
    <Link
      to={to}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all ${styles} ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
};

export const PageHero: React.FC<{ eyebrow: L; title: L; subtitle: L }> = ({ eyebrow, title, subtitle }) => {
  const { tr } = useLang();
  return (
    <section className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <Container className="relative py-20 sm:py-28">
        <SectionHeading eyebrow={tr(eyebrow)} title={tr(title)} subtitle={tr(subtitle)} />
      </Container>
    </section>
  );
};

export const CtaBand: React.FC = () => {
  const { lang } = useLang();
  return (
    <section className="bg-ink relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-600/30 blur-[120px]" aria-hidden />
      <Container className="relative py-20 sm:py-24">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            {lang === 'es' ? '¿Tienes un reto que resolver con tecnología?' : 'Have a challenge to solve with technology?'}
          </h2>
          <p className="text-slate-300 text-lg">
            {lang === 'es'
              ? 'Cuéntanos tu caso. Te respondemos en menos de 2 horas con los siguientes pasos.'
              : 'Tell us about your case. We reply within 2 hours with next steps.'}
          </p>
          <ButtonLink to="/contacto" variant="primary">
            {lang === 'es' ? 'Hablemos de tu proyecto' : "Let's talk about your project"}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
};
