import React from 'react';
import { Language } from '../types';
import { siteUiText } from '../data/content';
import { Sparkles, ArrowRight, Play, CheckCircle2, Activity } from 'lucide-react';
import { LiveAgentDemo } from './LiveAgentDemo';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = siteUiText[lang];

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-radial-purple">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wider uppercase shadow-lg shadow-purple-900/20">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Mandatory Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              <span className="block text-white">{t.heroTitle}</span>
              <span className="block mt-2 text-gradient-purple">
                Uni-Verso693
              </span>
            </h1>

            {/* Mandatory Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-300 font-normal max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 w-full text-sm font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{lang === 'en' ? 'Automated Lead Qualification & CRM' : 'Calificación de Prospectos y CRM'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{lang === 'en' ? 'Viral AI Avatars & Scripting' : 'Avatares de IA y Guiones Virales'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{lang === 'en' ? 'Zero Hallucination RAG Docs' : 'Respuestas Precisas con RAG'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{lang === 'en' ? 'WhatsApp & Web Integration' : 'Integración WhatsApp y Web'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3 w-full sm:w-auto">
              {/* Primary Contact CTA */}
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 group"
              >
                <span>{t.heroCtaPrimary}</span>
                <ArrowRight className="w-5 h-5 text-purple-200 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#portfolio"
                onClick={handleScrollToPortfolio}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-purple-800/50 text-zinc-200 font-semibold text-base transition-colors"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span>{t.heroCtaSecondary}</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className="w-full pt-8 border-t border-purple-900/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="text-2xl font-black text-white tracking-tight">{t.stat1Val}</div>
                <div className="text-xs text-zinc-400 font-medium">{t.stat1Label}</div>
              </div>
              <div>
                <div className="text-2xl font-black text-purple-400 tracking-tight">{t.stat2Val}</div>
                <div className="text-xs text-zinc-400 font-medium">{t.stat2Label}</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white tracking-tight">{t.stat3Val}</div>
                <div className="text-xs text-zinc-400 font-medium">{t.stat3Label}</div>
              </div>
              <div>
                <div className="text-2xl font-black text-purple-400 tracking-tight">{t.stat4Val}</div>
                <div className="text-xs text-zinc-400 font-medium">{t.stat4Label}</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Demo Widget */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-zinc-950/90 border border-purple-800/50 p-6 shadow-2xl shadow-purple-950/60 glow-purple">
              
              {/* Header bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono font-semibold text-zinc-300 ml-2">
                    {t.demoCardTitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>24/7 LIVE</span>
                </div>
              </div>

              {/* Live AI Agent Chat Widget — real Claude API calls via Netlify Function */}
              <LiveAgentDemo lang={lang} />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
