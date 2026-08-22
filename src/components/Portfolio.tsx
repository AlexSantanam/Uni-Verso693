import React, { useState } from 'react';
import { Language, VideoPortfolioItem } from '../types';
import { initialPortfolioVideos, landingPageExamplesData, siteUiText } from '../data/content';
import {
  Play, Eye, Settings, Youtube, Check, RefreshCw,
  LayoutTemplate, Star, ArrowUpRight,
  Rocket, ShieldCheck, BarChart3, Search
} from 'lucide-react';
import melsaLogo from '../../asset/Logo-MELSA.jpg';
import memoraScreenshot from '../../asset/Memora-Screenshot.png';

interface PortfolioProps {
  lang: Language;
}

export const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const t = siteUiText[lang];
  const [videos, setVideos] = useState<VideoPortfolioItem[]>(initialPortfolioVideos);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [inputIds, setInputIds] = useState<string[]>(initialPortfolioVideos.map(v => v.youtubeId));
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  // Helper to extract YouTube ID from standard URLs or raw ID string
  const extractYoutubeId = (urlOrId: string): string => {
    const trimmed = urlOrId.trim();
    if (!trimmed) return 'dQw4w9WgXcQ';
    if (trimmed.includes('youtube.com/watch?v=')) {
      const match = trimmed.match(/v=([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) return match[1];
    } else if (trimmed.includes('youtu.be/')) {
      const match = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) return match[1];
    } else if (trimmed.includes('youtube.com/embed/')) {
      const match = trimmed.match(/embed\/([a-zA-Z0-9_-]{11})/);
      if (match && match[1]) return match[1];
    } else if (trimmed.length === 11) {
      return trimmed;
    }
    return trimmed;
  };

  const handleSaveVideoIds = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = videos.map((vid, idx) => ({
      ...vid,
      youtubeId: extractYoutubeId(inputIds[idx] || vid.youtubeId)
    }));
    setVideos(updated);
    setEditModalOpen(false);
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Miniature "browser window" mockups — each rendered with its own layout & palette
  // to visually demonstrate the range of landing page styles we build.
  const renderLandingMockup = (id: string) => {
    if (id === 'memora') {
      // Real screenshot of the live product at memora.lat (not a hand-built mockup).
      return (
        <div className="rounded-t-xl overflow-hidden bg-black">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 border-b border-stone-200">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[9px] text-stone-500 font-mono">memora.lat</span>
          </div>
          <div className="h-44 overflow-hidden">
            <img
              src={memoraScreenshot}
              alt="Captura real de memora.lat"
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </div>
      );
    }
    if (id === 'saas') {
      return (
        <div className="rounded-t-xl overflow-hidden bg-slate-950">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="ml-2 text-[9px] text-slate-500 font-mono">flowstack.io</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white tracking-tight">Flowstack</span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-[8px] font-bold">Start Free</span>
            </div>
            <div className="text-center py-3 space-y-2">
              <p className="text-base font-black bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
                Automate Everything
              </p>
              <p className="text-[8px] text-slate-400">Ship workflows in minutes, not weeks.</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[Rocket, ShieldCheck, BarChart3].map((Icon, i) => (
                <div key={i} className="rounded-md bg-slate-900 border border-slate-800 p-2 flex flex-col items-center gap-1">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[7px] text-slate-400 font-semibold">{['Fast', 'Secure', 'Insights'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // melsa — real navy & gold identity taken from the MELSA Gestión Inmobiliaria brand
    return (
      <div className="rounded-t-xl overflow-hidden" style={{ backgroundColor: '#0F2042' }}>
        <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ backgroundColor: '#0A162D', borderColor: '#1A3462' }}>
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-[9px] text-slate-400 font-mono">melsainmobiliaria.com</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <img src={melsaLogo} alt="MELSA" className="w-4 h-4 rounded-sm object-cover" />
              <span className="text-[10px] font-serif font-bold tracking-[0.15em]" style={{ color: '#DFC287' }}>MELSA</span>
            </div>
            <span className="text-[7px] text-slate-400 font-medium">Gestión Inmobiliaria</span>
          </div>
          <div className="rounded-lg border p-4 text-center space-y-2" style={{ backgroundImage: 'linear-gradient(135deg, #0F2042 0%, #1A3462 100%)', borderColor: 'rgba(197,160,89,0.35)' }}>
            <p className="text-sm font-serif font-bold text-white leading-snug italic" style={{ color: '#DFC287' }}>Timeless Luxury Living</p>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[8px] font-bold" style={{ backgroundColor: '#C5A059', color: '#0F2042' }}>
              Ver Proyectos
            </span>
          </div>
          <div className="rounded-md bg-white/95 p-2 flex items-center gap-2">
            <Search className="w-3 h-3 shrink-0" style={{ color: '#C5A059' }} />
            <div className="flex-1 grid grid-cols-2 gap-1">
              <span className="text-[7px] font-semibold text-slate-600 truncate">Las Condes, Santiago</span>
              <span className="text-[7px] font-semibold text-slate-600 truncate">Preventa / Pozo</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 bg-zinc-950 relative overflow-hidden border-y border-purple-900/30">
      
      {/* Background glow elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              <span>{lang === 'en' ? 'PORTFOLIO & DEMOS' : 'PORTAFOLIO Y DEMOS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.portfolioHeading}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              {t.portfolioSubheading}
            </p>
          </div>

          {/* Button to let user customize YouTube video links easily */}
          <button
            onClick={() => setEditModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700/60 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-semibold transition-colors cursor-pointer shadow-lg"
          >
            <Settings className="w-4 h-4 text-purple-400" />
            <span>{t.portfolioEditBtn}</span>
          </button>
        </div>

        {/* 3 YouTube Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((item, index) => {
            const title = lang === 'en' ? item.titleEn : item.titleEs;
            const category = lang === 'en' ? item.categoryEn : item.categoryEs;
            const desc = lang === 'en' ? item.descriptionEn : item.descriptionEs;

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-black border border-purple-900/40 overflow-hidden hover:border-purple-500/70 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* YouTube Video Container */}
                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                  
                  {/* YouTube iFrame Player */}
                  <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-purple-300 border border-purple-500/40 uppercase tracking-wider">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Video Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5 font-medium text-purple-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{item.views}</span>
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      ID: {item.youtubeId}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Landing Page Style Examples */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
              <LayoutTemplate className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.landingExamplesBadge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.landingExamplesHeading}
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t.landingExamplesSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landingPageExamplesData.map((item) => {
              const title = lang === 'en' ? item.titleEn : item.titleEs;
              const category = lang === 'en' ? item.categoryEn : item.categoryEs;
              const desc = lang === 'en' ? item.descriptionEn : item.descriptionEs;
              const tags = lang === 'en' ? item.tagsEn : item.tagsEs;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl bg-black border border-purple-900/40 overflow-hidden hover:border-purple-500/70 transition-all duration-300 shadow-xl flex flex-col"
                >
                  {/* Mini browser mockup preview */}
                  <div className="relative">
                    {renderLandingMockup(item.id)}
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-bold text-purple-300 border border-purple-500/40 uppercase tracking-wider">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Info content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4 border-t border-purple-900/40">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {title}
                      </h4>
                      <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                        {desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {tags.map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/50 text-[10px] text-purple-300">
                            <Star className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      onClick={handleScrollToContact}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors pt-3 border-t border-zinc-900 group/link"
                    >
                      <span>{t.landingExamplesBtn}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Edit YouTube Videos Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-purple-800/80 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white">
                  {t.portfolioModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-zinc-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              {t.portfolioModalDesc}
            </p>

            <form onSubmit={handleSaveVideoIds} className="space-y-4">
              {videos.map((vid, idx) => (
                <div key={vid.id} className="space-y-1.5">
                  <label className="text-xs font-semibold text-purple-300 flex items-center justify-between">
                    <span>Video #{idx + 1}: {lang === 'en' ? vid.titleEn : vid.titleEs}</span>
                  </label>
                  <input
                    type="text"
                    value={inputIds[idx]}
                    onChange={(e) => {
                      const copy = [...inputIds];
                      copy[idx] = e.target.value;
                      setInputIds(copy);
                    }}
                    placeholder="e.g. dQw4w9WgXcQ or https://youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs font-mono focus:border-purple-500 focus:outline-none"
                  />
                </div>
              ))}

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-semibold hover:bg-zinc-800"
                >
                  {lang === 'en' ? 'Cancel' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Update Videos' : 'Actualizar Videos'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
