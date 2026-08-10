import React from 'react';
import { Language } from '../types';
import { siteUiText } from '../data/content';
import { Globe, Code, ArrowUp } from 'lucide-react';
import logo from '../../asset/Logo.png';

interface FooterProps {
  lang: Language;
  onLanguageToggle: (lang: Language) => void;
  onOpenExportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onLanguageToggle, onOpenExportModal }) => {
  const t = siteUiText[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-purple-900/40 py-16 text-zinc-400 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Uni-Verso693 logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <span className="font-extrabold text-xl text-white">
                Uni-Verso<span className="text-purple-400">693</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              {t.footerTagline}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onLanguageToggle(lang === 'en' ? 'es' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-purple-800/40 text-xs font-bold text-zinc-300 hover:text-purple-300"
              >
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'en' ? 'EN / ES (Switch)' : 'ES / EN (Cambiar)'}</span>
              </button>

              <button
                onClick={onOpenExportModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-700/50 text-xs font-semibold text-purple-300"
              >
                <Code className="w-3.5 h-3.5 text-purple-400" />
                <span>Netlify Code</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-purple-400">
              {lang === 'en' ? 'Navigation' : 'Navegación'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-purple-300">{t.navServices}</a></li>
              <li><a href="#portfolio" className="hover:text-purple-300">{t.navPortfolio}</a></li>
              <li><a href="#pricing" className="hover:text-purple-300">{t.navPricing}</a></li>
              <li><a href="#faq" className="hover:text-purple-300">{t.navFaq}</a></li>
              <li><a href="#contact" className="hover:text-purple-300">{t.navContact}</a></li>
            </ul>
          </div>

          {/* Column 3: Tech Stack & Netlify status */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-purple-400">
              {lang === 'en' ? 'Deployment & Engine' : 'Despliegue y Motor'}
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              {t.netlifyBannerText}
            </p>
            <div className="p-3 rounded-xl bg-zinc-950 border border-purple-900/30 flex items-center justify-between">
              <span className="font-mono text-[11px] text-zinc-300">Ready for Netlify & Cloud Run</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Uni-Verso693 AI Agency. {t.footerRights}</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
