import React from 'react';
import { CalendarDays } from 'lucide-react';
import { useLang } from '../lib/lang';
import { CALENDLY_URL } from '../data/site';

/** Books the EBS 693 diagnosis (45-minute Google Meet) in Calendly. */
export const CalendlyButton: React.FC<{ className?: string; label?: string }> = ({ className = '', label }) => {
  const { lang } = useLang();
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors ${className}`}
    >
      <CalendarDays className="w-4 h-4 text-cyan-300" />
      {label ?? (lang === 'es' ? 'Agenda tu diagnóstico EBS (45 min)' : 'Book your EBS diagnosis (45 min)')}
    </a>
  );
};
