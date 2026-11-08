import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChefHat, Flame, MessageSquare, QrCode, ShieldCheck, Sparkles, Store, UtensilsCrossed, Zap } from 'lucide-react';
import { useLang } from '../lib/lang';
import { Container, Eyebrow } from './ui';
import sokifyLogo from '../../asset/cases/sokify-logo.png';
import sokifyChef from '../../asset/cases/sokify-chef.jpg';

/** Home-page feature block for the Sokify SaaS platform. */
export const SokifySpotlight: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';

  const chips = [
    { icon: QrCode, label: es ? 'Menú QR interactivo' : 'Interactive QR Menu' },
    { icon: UtensilsCrossed, label: es ? 'Comanda KDS en vivo' : 'Live Kitchen KDS' },
    { icon: MessageSquare, label: es ? 'Pedidos WhatsApp & Sofi IA' : 'WhatsApp & Sofi AI Orders' },
    { icon: Zap, label: es ? '0% Comisión por venta' : '0% Sales Commission' },
    { icon: Store, label: es ? 'POS & Control de inventario' : 'POS & Inventory Control' },
    { icon: Flame, label: es ? '3 meses 100% gratis' : '3 months 100% free' },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-violet-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none" />

      <Container>
        <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#120a26] via-[#090e1c] to-[#040812] shadow-2xl shadow-purple-950/40">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-purple-600/20 blur-[130px]" aria-hidden />
          <div className="absolute -bottom-32 left-1/3 w-[26rem] h-[26rem] rounded-full bg-emerald-500/15 blur-[130px]" aria-hidden />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 lg:p-16">
            <div className="lg:col-span-7 space-y-7">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{es ? 'Producto SaaS Destacado' : 'Featured SaaS Platform'}</Eyebrow>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {es ? '3 Meses Gratis · 0% Comisión' : '3 Months Free · 0% Commission'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  loading="lazy"
                  decoding="async"
                  src={sokifyLogo}
                  alt="Sokify — Sistema Operativo Gastronómico Inteligente"
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_15px_35px_rgba(168,85,247,0.45)]"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {es ? (
                  <>
                    El sistema operativo inteligente para <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">restaurantes, bares y cafeterías</span>
                  </>
                ) : (
                  <>
                    The intelligent operating system for <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">restaurants, bars & cafes</span>
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {es
                  ? 'Diseñado y desarrollado por Uni-Verso693: transforma la operación de tu local gastronómico. Menú digital QR de alta conversión, pantalla de cocina (KDS) en tiempo real con alertas sonoras, pedidos directos por WhatsApp, control de caja y copilotaje con IA para vender más.'
                  : 'Designed and engineered by Uni-Verso693: upgrade your culinary business operations. High-conversion QR digital menu, real-time live kitchen display (KDS) with audio alerts, direct WhatsApp ordering, cash registers, and AI copilot to boost your direct sales.'}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {chips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-sm"
                  >
                    <c.icon className="w-4 h-4 text-purple-400" />
                    {c.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://sokify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
                >
                  {es ? 'Ir a Sokify.app (3 Meses Gratis)' : 'Visit Sokify.app (3 Months Free)'}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <Link
                  to="/casos/sokify"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-slate-200 transition-colors"
                >
                  {es ? 'Ver caso de ingeniería' : 'View case study'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-md">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 to-emerald-500 opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/90 shadow-2xl">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={sokifyChef}
                    alt={es ? 'Sokify en operación real' : 'Sokify in real operation'}
                    className="w-full h-80 sm:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e1c] via-[#090e1c]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">{es ? 'Comisiones a intermediarios' : 'Intermediary fees'}</div>
                      <div className="text-xl font-black text-emerald-400">$0 CLP · 0%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">{es ? 'Pedidos mensuales' : 'Monthly orders'}</div>
                      <div className="text-xl font-black text-white">{es ? 'Ilimitados' : 'Unlimited'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
