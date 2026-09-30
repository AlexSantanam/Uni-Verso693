import React from 'react';
import { CalendarDays } from 'lucide-react';
import { useLang } from '../lib/lang';
import { CALENDLY_URL } from '../data/site';

/** Opens the 30-minute intro call in Calendly. */
export const CalendlyButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang } = useLang();
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors ${className}`}
    >
      <CalendarDays className="w-4 h-4 text-cyan-300" />
      {lang === 'es' ? 'Agenda una llamada de 30 min' : 'Book a 30-min call'}
    </a>
  );
};
