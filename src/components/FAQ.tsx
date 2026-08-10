import React, { useState } from 'react';
import { Language } from '../types';
import { faqData, siteUiText } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const t = siteUiText[lang];
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-purple-900/30">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.faqHeading}
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            {t.faqSubheading}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item) => {
            const question = lang === 'en' ? item.questionEn : item.questionEs;
            const answer = lang === 'en' ? item.answerEn : item.answerEs;
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-black border border-purple-900/40 overflow-hidden transition-all duration-200 hover:border-purple-600/50"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-purple-300 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{question}</span>
                  <div className={`p-1.5 rounded-lg bg-purple-950 text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-purple-900' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-zinc-300 text-sm leading-relaxed border-t border-zinc-900/80">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
