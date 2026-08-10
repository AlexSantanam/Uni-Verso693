import React from 'react';
import { Language } from '../types';
import { servicesData, siteUiText } from '../data/content';
import { Bot, Video, Zap, Cpu, Layout, PenTool, Check, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  lang: Language;
}

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = siteUiText[lang];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-7 h-7 text-purple-400" />;
      case 'Video':
        return <Video className="w-7 h-7 text-purple-400" />;
      case 'Zap':
        return <Zap className="w-7 h-7 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-purple-400" />;
      case 'Layout':
        return <Layout className="w-7 h-7 text-purple-400" />;
      case 'PenTool':
        return <PenTool className="w-7 h-7 text-purple-400" />;
      default:
        return <Bot className="w-7 h-7 text-purple-400" />;
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
            {lang === 'en' ? 'OUR CAPABILITIES' : 'NUESTRAS CAPACIDADES'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.servicesHeading}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.servicesSubheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => {
            const badge = lang === 'en' ? service.badgeEn : service.badgeEs;
            const title = lang === 'en' ? service.titleEn : service.titleEs;
            const desc = lang === 'en' ? service.descriptionEn : service.descriptionEs;
            const bullets = lang === 'en' ? service.bulletsEn : service.bulletsEs;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-zinc-950/90 border border-purple-900/40 p-8 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/50 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-purple-950/80 border border-purple-600/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-900/50 transition-all duration-300">
                      {getServiceIcon(service.iconName)}
                    </div>
                    {badge && (
                      <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-700/40">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-8 text-sm text-zinc-300">
                    {bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="p-0.5 rounded-full bg-purple-950 text-purple-400 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Link */}
                <div className="pt-4 border-t border-zinc-900">
                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group/link"
                  >
                    <span>{lang === 'en' ? 'Get Started with this Service' : 'Solicitar este Servicio'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
