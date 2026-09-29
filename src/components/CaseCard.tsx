import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../lib/lang';
import type { CaseStudy } from '../data/site';
import memoraScreenshot from '../../asset/Memora-Screenshot.png';
import melsaLogo from '../../asset/Logo-MELSA.jpg';

export const CaseVisual: React.FC<{ item: CaseStudy; tall?: boolean }> = ({ item, tall }) => {
  const h = tall ? 'h-72 sm:h-96' : 'h-56';
  if (item.image === 'memora') {
    return (
      <div className={`${h} overflow-hidden bg-white/5`}>
        <img src={memoraScreenshot} alt={`${item.client} — memora.lat`} className="w-full h-auto object-cover object-top" />
      </div>
    );
  }
  if (item.image === 'melsa') {
    return (
      <div className={`${h} flex items-center justify-center`} style={{ backgroundImage: 'linear-gradient(135deg, #0F2042 0%, #1A3462 100%)' }}>
        <div className="text-center space-y-3">
          <img src={melsaLogo} alt="MELSA" className="w-14 h-14 rounded-lg object-cover mx-auto" />
          <p className="font-serif italic text-xl" style={{ color: '#DFC287' }}>Timeless Luxury Living</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`${h} flex items-center justify-center bg-gradient-to-br from-brand-900 via-brand-700 to-cyan-500`}>
      <span className="text-3xl font-black text-white tracking-tight">{item.client}</span>
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
