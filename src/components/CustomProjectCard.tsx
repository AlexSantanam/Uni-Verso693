import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLang } from '../lib/lang';

const ideas = {
  es: [
    'Un CRM a medida para mi equipo de ventas',
    'Un bot de WhatsApp que agende citas',
    'Una app para que mis clientes paguen en línea',
    'Un panel con los datos de mi negocio en tiempo real',
    'Automatizar la facturación y los reportes',
    'Un portal de clientes con su historial',
  ],
  en: [
    'A custom CRM for my sales team',
    'A WhatsApp bot that books appointments',
    'An app so my customers can pay online',
    'A real-time dashboard for my business',
    'Automate invoicing and reports',
    'A customer portal with their history',
  ],
};

/** Types out, holds, then deletes each idea in turn. */
const useTypewriter = (lines: string[]) => {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLineIdx(0);
    setText('');
    setDeleting(false);
  }, [lines]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(lines[0]);
      return;
    }
    const full = lines[lineIdx % lines.length];
    let delay = deleting ? 22 : 45;
    if (!deleting && text === full) delay = 1800;
    const id = window.setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setLineIdx((i) => i + 1);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, lineIdx, lines]);

  return text;
};

/** "Don't see what you need?" card: rotating glow border, aurora and typed ideas. */
export const CustomProjectCard: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const typed = useTypewriter(ideas[lang]);

  return (
    <Link to="/contacto" className="group glow-card reveal rounded-3xl">
      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#060a14] p-8 flex flex-col gap-6">
        {/* aurora */}
        <div className="aurora a" aria-hidden />
        <div className="aurora b" aria-hidden />
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />

        <div className="relative space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-200">
            <Sparkles className="w-3.5 h-3.5" />
            {es ? 'A tu medida' : 'Made for you'}
          </span>
          <h3 className="text-2xl font-extrabold text-white leading-tight">
            {es ? '¿No ves lo que buscas?' : "Don't see what you need?"}
          </h3>
          <p className="text-sm text-slate-400">
            {es ? 'Si lo puedes imaginar, lo podemos construir.' : 'If you can imagine it, we can build it.'}
          </p>
        </div>

        {/* typed idea, terminal style */}
        <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur px-4 py-3 font-mono text-[13px] text-slate-200 min-h-[4.5rem]">
          <div className="flex gap-1.5 mb-2" aria-hidden>
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-cyan-300">{es ? 'necesito' : 'i need'} &gt; </span>
          <span>{typed}</span>
          <span className="typing-caret" aria-hidden />
        </div>

        <span className="relative mt-auto inline-flex items-center gap-2 self-start rounded-full bg-white text-ink px-5 py-2.5 text-sm font-bold transition-all group-hover:bg-cyan-300 group-hover:gap-3">
          {es ? 'Cuéntanos tu caso' : 'Tell us your case'}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};
