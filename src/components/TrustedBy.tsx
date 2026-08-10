import React from 'react';
import { Language } from '../types';
import { trustedClientsData, siteUiText } from '../data/content';
import { ShieldCheck } from 'lucide-react';

interface TrustedByProps {
  lang: Language;
}

export const TrustedBy: React.FC<TrustedByProps> = ({ lang }) => {
  const t = siteUiText[lang];

  return (
    <section className="py-16 bg-black border-y border-purple-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.trustedBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {t.trustedHeading}
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t.trustedSubheading}
          </p>
        </div>

        {/* Client Logo Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trustedClientsData.map((client) => (
            <span
              key={client.id}
              className={`text-lg sm:text-xl text-zinc-500 hover:text-purple-300 transition-colors duration-300 cursor-default select-none ${client.styleClass}`}
            >
              {client.name}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};
