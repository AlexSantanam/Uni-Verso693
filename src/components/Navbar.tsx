import React, { useState } from 'react';
import { Language } from '../types';
import { siteUiText } from '../data/content';
import { Globe, Menu, X, Sparkles, Code } from 'lucide-react';
import logo from '../../asset/Logo.png';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: (newLang: Language) => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageToggle, onOpenExportModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = siteUiText[lang];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-purple-900/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
<div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-950 p-[1px] shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            <div className="w-full h-full bg-black/90 rounded-[11px] flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Uni-Verso693 logo" className="w-full h-full object-cover rounded-[11px] group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Uni-Verso<span className="text-purple-400">693</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">
                AI Agency
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
              {lang === 'en' ? 'AI, Apps & Design' : 'IA, Apps y Diseño'}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, '#services')}
            className="text-sm font-medium text-zinc-300 hover:text-purple-300 transition-colors"
          >
            {t.navServices}
          </a>
          <a
            href="#portfolio"
            onClick={(e) => handleNavClick(e, '#portfolio')}
            className="text-sm font-medium text-zinc-300 hover:text-purple-300 transition-colors"
          >
            {t.navPortfolio}
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, '#pricing')}
            className="text-sm font-medium text-zinc-300 hover:text-purple-300 transition-colors"
          >
            {t.navPricing}
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, '#faq')}
            className="text-sm font-medium text-zinc-300 hover:text-purple-300 transition-colors"
          >
            {t.navFaq}
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-sm font-medium text-zinc-300 hover:text-purple-300 transition-colors"
          >
            {t.navContact}
          </a>
        </nav>

        {/* Desktop Right Actions: Language Switcher + Netlify HTML Export + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Language Selector Toggle Button */}
          <button
            onClick={() => onLanguageToggle(lang === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-purple-800/40 text-xs font-semibold text-zinc-200 hover:border-purple-500 hover:text-purple-300 transition-all duration-200 cursor-pointer"
            title="Switch Language / Cambiar Idioma"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'en' ? 'EN 🇺🇸' : 'ES 🇲🇽'}</span>
            <span className="text-[10px] text-purple-400 font-bold bg-purple-950 px-1.5 py-0.5 rounded">
              {lang === 'en' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* Export Netlify HTML button */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-700/50 text-xs font-medium text-purple-300 hover:bg-purple-900/50 transition-colors cursor-pointer"
            title="Get 1-file HTML for Netlify"
          >
            <Code className="w-3.5 h-3.5 text-purple-400" />
            <span>Netlify HTML</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 animate-pulse"></span>
            <span className="relative flex items-center gap-2 px-4 py-2.5 rounded-[11px] bg-black text-white group-hover:bg-opacity-80 transition-all">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
              <span>{t.btnBookAudit}</span>
            </span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => onLanguageToggle(lang === 'en' ? 'es' : 'en')}
            className="px-2.5 py-1 rounded-md bg-zinc-900 border border-purple-800/40 text-xs font-semibold text-purple-300"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 border-b border-purple-900/50 backdrop-blur-2xl px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="text-zinc-200 hover:text-purple-300"
            >
              {t.navServices}
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, '#portfolio')}
              className="text-zinc-200 hover:text-purple-300"
            >
              {t.navPortfolio}
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
              className="text-zinc-200 hover:text-purple-300"
            >
              {t.navPricing}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
              className="text-zinc-200 hover:text-purple-300"
            >
              {t.navFaq}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-zinc-200 hover:text-purple-300"
            >
              {t.navContact}
            </a>
          </nav>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExportModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-purple-950/60 border border-purple-700/50 text-xs font-semibold text-purple-300"
            >
              <Code className="w-4 h-4" />
              <span>Export HTML for Netlify</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30"
            >
              {t.btnBookAudit}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
