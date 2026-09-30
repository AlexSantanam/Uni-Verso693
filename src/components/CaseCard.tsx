import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../lib/lang';
import type { CaseImage, CaseStudy } from '../data/site';
import melsaLogo from '../../asset/Logo-MELSA.webp';
import melsaHero from '../../asset/cases/melsa-hero.webp';
import melsaProjects from '../../asset/cases/melsa-projects.webp';
import melsaSimulator from '../../asset/cases/melsa-simulator.webp';
import memoraLogo from '../../asset/cases/memora-logo.webp';
import memoraHome from '../../asset/cases/memora-home.webp';
import memoraMockup from '../../asset/cases/memora-mockup.webp';
import memoraFamily from '../../asset/cases/memora-family.webp';
import yndiMascot from '../../asset/cases/yndi-mascot.webp';
import yndipetLogo from '../../asset/cases/yndipet-logo.webp';
import yndipetServices from '../../asset/cases/yndipet-services.webp';
import yndipetGames from '../../asset/cases/yndipet-games.webp';
import gameHome from '../../asset/cases/yndipet-game-home.webp';
import gameTrivia from '../../asset/cases/yndipet-game-trivia.webp';

export const caseImages: Record<CaseImage, string> = {
  'memora-home': memoraHome,
  'memora-mockup': memoraMockup,
  'memora-family': memoraFamily,
  'yndipet-services': yndipetServices,
  'yndipet-games': yndipetGames,
  'yndipet-game-home': gameHome,
  'yndipet-game-trivia': gameTrivia,
  'melsa-hero': melsaHero,
  'melsa-projects': melsaProjects,
  'melsa-simulator': melsaSimulator,
};

export const CaseVisual: React.FC<{ item: CaseStudy; tall?: boolean }> = ({ item, tall }) => {
  const h = tall ? 'h-80 sm:h-[28rem]' : 'h-56';

  if (item.visual === 'yndipet') {
    return (
      <div className={`${h} relative overflow-hidden bg-gradient-to-br from-[#3a0a1c] via-[#1a0b1f] to-[#050b13]`}>
        <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full bg-[#ff2d55]/35 blur-[80px]" aria-hidden />
        <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#ff8a3d]/25 blur-[90px]" aria-hidden />
        <div className={`absolute inset-0 flex items-center ${tall ? 'px-10 sm:px-16' : 'px-6'}`}>
          <img loading="lazy" decoding="async"
            src={yndipetLogo}
            alt="YndiPet — Aquí nos cuidamos"
            className={`relative z-10 ${tall ? 'w-48 sm:w-72' : 'w-32'} drop-shadow-[0_20px_40px_rgba(255,45,85,0.45)] transition-transform duration-500 group-hover:scale-105`}
          />
        </div>
        <img loading="lazy" decoding="async"
          src={yndiMascot}
          alt="Yndi, la mascota de YndiPet"
          className={`absolute right-0 bottom-0 ${tall ? 'h-[105%]' : 'h-[112%] -mb-4'} w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2`}
          style={{ animation: 'orb-float 6s ease-in-out infinite' }}
        />
      </div>
    );
  }

  if (item.visual === 'memora') {
    return (
      <div className={`${h} relative overflow-hidden bg-[#f8f5f1] flex items-center justify-center`}>
        {/* soft paper vignette, matching the brand's cream artwork */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(120,100,80,0.12)_100%)]" aria-hidden />
        <img loading="lazy" decoding="async"
          src={memoraLogo}
          alt="MEMORA — Recuerdos para siempre"
          // the source logo is white on transparent; brightness(0.16) renders it in the brand's charcoal
          style={{ filter: 'brightness(0.16)' }}
          className={`relative ${tall ? 'w-96 sm:w-[36rem]' : 'w-80'} px-6 transition-transform duration-500 group-hover:scale-105`}
        />
      </div>
    );
  }

  return (
    <div className={`${h} relative overflow-hidden bg-white flex items-center justify-center`}>
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#1A2E5A] via-[#C5A059] to-[#1A2E5A]" aria-hidden />
      <img loading="lazy" decoding="async"
        src={melsaLogo}
        alt="MELSA Gestión Inmobiliaria"
        className={`${tall ? 'w-80 sm:w-[28rem]' : 'w-60'} px-4 transition-transform duration-500 group-hover:scale-105`}
      />
    </div>
  );
};

export const CaseCard: React.FC<{ item: CaseStudy }> = ({ item }) => {
  const { tr, lang } = useLang();
  return (
    <Link
      to={`/casos/${item.slug}`}
      className="group spotlight reveal flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
    >
      <CaseVisual item={item} />
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
          {tr(item.sector)}
        </div>
        <h3 className="text-lg font-extrabold text-white leading-snug">{tr(item.title)}</h3>
        <div className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-cyan-300">
          {lang === 'es' ? 'Ver caso' : 'View case'}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
};
