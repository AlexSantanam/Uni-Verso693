import React from 'react';
import { Language } from '../types';
import { pricingPlansData, siteUiText } from '../data/content';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingProps {
  lang: Language;
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ lang, onSelectPlan }) => {
  const t = siteUiText[lang];

  const handlePlanClick = (e: React.MouseEvent, planName: string) => {
    e.preventDefault();
    onSelectPlan(planName);
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
            {lang === 'en' ? 'TRANSPARENT PRICING' : 'PRECIOS TRANSPARENTES'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.pricingHeading}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.pricingSubheading}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlansData.map((plan) => {
            const name = lang === 'en' ? plan.nameEn : plan.nameEs;
            const period = lang === 'en' ? plan.periodEn : plan.periodEs;
            const desc = lang === 'en' ? plan.descriptionEn : plan.descriptionEs;
            const features = lang === 'en' ? plan.featuresEn : plan.featuresEs;
            const cta = lang === 'en' ? plan.ctaEn : plan.ctaEs;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-zinc-950 border-2 border-purple-500 shadow-2xl shadow-purple-900/40 glow-purple scale-[1.02]'
                    : 'bg-zinc-950/80 border border-purple-900/30 hover:border-purple-600/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-extrabold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'MOST POPULAR' : 'MÁS POPULAR'}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Price */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed min-h-[36px]">{desc}</p>
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">{plan.price}</span>
                      <span className="text-xs font-medium text-zinc-400">{period}</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-zinc-900 mb-6" />

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-purple-950 text-purple-400 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan CTA Button */}
                <a
                  href="#contact"
                  onClick={(e) => handlePlanClick(e, name)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-800/40'
                  }`}
                >
                  <span>{cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
