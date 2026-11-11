import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Store, KeyRound, Smartphone, ShieldCheck } from 'lucide-react';
import { useLang } from '../lib/lang';
import { Container } from './ui';

export const ImpulsaPymeBanner: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';

  return (
    <section className="py-20 bg-gradient-to-b from-[#02060c] via-[#041216] to-[#02060c] border-y border-emerald-500/20 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative">
        <div className="rounded-3xl border border-emerald-500/30 bg-[#061217]/85 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-emerald-950/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                {es ? 'Iniciativa ProPyme Chile · Soluciones Accesibles' : 'Chilean ProPyme Initiative · Accessible Solutions'}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {es ? (
                  <>
                    Programa <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Impulsa ProPyme</span>: Tecnología de clase mundial sin descapitalizarte
                  </>
                ) : (
                  <>
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Impulsa ProPyme</span> Program: World-Class Tech for Small Businesses
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {es
                  ? 'Sabemos lo que cuesta emprender en Chile. Por eso creamos un modelo pensado exclusivamente para PyMEs: plataformas web ultrarrápidas, comercio online con Webpay, cartas QR para gastronomía y sistemas a medida financiados con cuotas accesibles y sin contratos abusivos.'
                  : 'We know how hard building a business is. We designed a program exclusively for SMEs: blazing-fast websites, Webpay e-commerce, QR digital menus, and custom tools with friendly monthly plans and zero lock-in.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 space-y-2">
                  <div className="text-emerald-400 font-extrabold text-sm flex items-center gap-1.5">
                    <Store className="w-4 h-4" />
                    {es ? 'Arriendo Todo Incluido' : 'All-Inclusive Rental'}
                  </div>
                  <div className="text-2xl font-black text-white">{es ? 'Desde $19.900' : 'From $19.900'} <span className="text-xs font-medium text-slate-400">/mes</span></div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {es ? 'Hosting veloz, dominio, certificado SSL, copias de seguridad y soporte continuo sin cobros por hora adicional.' : 'Fast hosting, custom domain, SSL, continuous backups & support included.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5 space-y-2">
                  <div className="text-cyan-300 font-extrabold text-sm flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4" />
                    {es ? 'Derecho a Compra' : 'Lease-to-Own'}
                  </div>
                  <div className="text-2xl font-black text-white">{es ? '24 Cuotas' : '24 Months'} <span className="text-xs font-medium text-emerald-400">100% Tuyo</span></div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {es ? 'Paga mensualmente y al mes 24 te transferimos el 100% de la propiedad del código fuente a tu Bóveda Digital.' : 'Pay monthly and after 24 months receive 100% repository and database ownership.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
                  <div className="text-slate-200 font-extrabold text-sm flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    {es ? '7 Demos Activas' : '7 Active Demos'}
                  </div>
                  <div className="text-2xl font-black text-white">{es ? 'Ver en Vivo' : 'Live Preview'}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {es ? 'Restaurantes con comanda QR, almacenes con pedidos a WhatsApp, tiendas online, clínicas con abonos y talleres.' : 'Restaurants, local markets, shops, clinics with deposits, and auto shops.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/impulsa-pyme"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-7 py-3.5 text-sm font-extrabold text-slate-950 transition-all shadow-lg shadow-emerald-500/25"
                >
                  {es ? 'Conocer Programa Impulsa PyME & Demos' : 'Explore Impulsa PyME & Live Demos'}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/blog/comprar-o-arrendar-pagina-web-pymes-chile"
                  className="text-xs font-semibold text-emerald-300 hover:text-white underline underline-offset-4"
                >
                  {es ? '¿Comprar o arrendar? Lee nuestra guía para PyMEs →' : 'Buy or rent? Read our SME guide →'}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-emerald-500/30 bg-[#081a20] p-6 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {es ? 'Garantías para tu PyME' : 'Guarantees for your Business'}
                </h3>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{es ? 'Sin costos ocultos ni letras chicas en los contratos.' : 'No hidden fees or fine print.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{es ? 'Velocidad de carga sub-1 segundo (Lighthouse 95+).' : 'Sub-1s page load speed.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{es ? 'Integración nativa con Webpay Plus y WhatsApp.' : 'Native Webpay Plus & WhatsApp integration.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{es ? 'Atención directa por ingenieros sin intermediarios.' : 'Direct engineer communication.'}</span>
                  </li>
                </ul>
                <div className="pt-2 border-t border-emerald-500/20 text-center">
                  <Link
                    to="/impulsa-pyme"
                    className="text-xs font-bold text-cyan-300 hover:text-white inline-flex items-center gap-1"
                  >
                    {es ? 'Simula tu cuota y explora tu rubro' : 'Calculate price for your industry'} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

