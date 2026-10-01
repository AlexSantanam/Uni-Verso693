import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  Factory,
  GraduationCap,
  HardHat,
  Landmark,
  Pickaxe,
  Scale,
  ShoppingBag,
  Sprout,
  Stethoscope,
  Truck,
  Umbrella,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { useLang, type L } from '../lib/lang';
import { industries, industryCopy } from '../data/industries';

type Group = 'servicios' | 'comercio' | 'industria' | 'finanzas';

const groups: { id: Group | 'all'; label: L }[] = [
  { id: 'all', label: { es: 'Todas', en: 'All' } },
  { id: 'servicios', label: { es: 'Servicios', en: 'Services' } },
  { id: 'comercio', label: { es: 'Comercio y consumo', en: 'Retail and consumer' } },
  { id: 'industria', label: { es: 'Industria y recursos', en: 'Industry and resources' } },
  { id: 'finanzas', label: { es: 'Finanzas', en: 'Finance' } },
];

/** Icon and filter group for each industry page (src/data/industries.ts). */
const meta: Record<string, { group: Group; Icon: LucideIcon }> = {
  'clinicas-y-salud': { group: 'servicios', Icon: Stethoscope },
  'estudios-profesionales': { group: 'servicios', Icon: Scale },
  educacion: { group: 'servicios', Icon: GraduationCap },
  'turismo-y-hoteleria': { group: 'servicios', Icon: BedDouble },
  'retail-y-ecommerce': { group: 'comercio', Icon: ShoppingBag },
  'alimentacion-y-restaurantes': { group: 'comercio', Icon: UtensilsCrossed },
  inmobiliarias: { group: 'comercio', Icon: Building2 },
  mineria: { group: 'industria', Icon: Pickaxe },
  manufactura: { group: 'industria', Icon: Factory },
  agro: { group: 'industria', Icon: Sprout },
  construccion: { group: 'industria', Icon: HardHat },
  'transporte-y-flotas': { group: 'industria', Icon: Truck },
  'banca-y-finanzas': { group: 'finanzas', Icon: Landmark },
  seguros: { group: 'finanzas', Icon: Umbrella },
};

/**
 * "What we build by industry": a filterable grid in the style of an industry showcase.
 * Every card opens a real page with problems, use cases and FAQs, so no category is empty.
 */
export const IndustryGrid: React.FC = () => {
  const { lang, tr } = useLang();
  const es = lang === 'es';
  const [active, setActive] = useState<Group | 'all'>('all');
  const list = industries.filter((i) => active === 'all' || meta[i.slug]?.group === active);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label={es ? 'Filtrar por sector' : 'Filter by sector'}>
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={active === g.id}
            onClick={() => setActive(g.id)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
              active === g.id ? 'border-cyan-400/60 bg-cyan-400/10 text-white' : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'
            }`}
          >
            {tr(g.label)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((base) => {
          const i = industryCopy(base, lang);
          const Icon = meta[i.slug]?.Icon ?? Factory;
          return (
            <Link
              key={i.slug}
              to={`/ia-para/${i.slug}`}
              className="group spotlight relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-600/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60"
                aria-hidden
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                <Icon className="h-6 w-6" />
              </span>
              <div className="relative space-y-2">
                <h3 className="text-lg font-extrabold text-white">{i.name}</h3>
                <ul className="space-y-1 text-sm text-slate-400">
                  {i.useCases.slice(0, 3).map((u) => (
                    <li key={u.title}>• {u.title}</li>
                  ))}
                </ul>
              </div>
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-cyan-300 group-hover:text-cyan-200">
                {es ? 'Conoce más' : 'Learn more'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}

        {/* closes the grid (14 industries + this = 5 full rows of 3) and catches every other sector */}
        {active === 'all' && (
          <Link to="/audit-693" className="group glow-card rounded-3xl">
            <div className="flex h-full flex-col justify-between gap-6 rounded-[calc(1.5rem-1px)] bg-[#060a14] p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-white">{es ? '¿No ves tu industria?' : 'Don’t see your industry?'}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {es
                    ? 'Ingresa tu sitio y nuestra IA te muestra en un minuto 3 oportunidades concretas para tu negocio, sea cual sea tu rubro.'
                    : 'Enter your site and our AI shows you 3 concrete opportunities for your business in a minute, whatever your sector.'}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white transition-colors group-hover:bg-brand-700">
                {es ? 'Analizar mi sitio gratis' : 'Analyse my site for free'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
