import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Smartphone,
  Tablet as TabletIcon,
  Monitor,
  Layers,
  Sparkles,
  MousePointerClick,
  CheckCircle2
} from 'lucide-react';

interface MultiDeviceMockupProps {
  demoUrl: string;
  title: string;
  tag: string;
  rubroId: string;
  color?: string;
}

type ViewMode = 'trio' | 'desktop' | 'tablet' | 'mobile';

export const MultiDeviceMockup: React.FC<MultiDeviceMockupProps> = ({
  demoUrl,
  title,
  tag,
  rubroId,
  color = '#15803d',
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('trio');
  const [interactive, setInteractive] = useState<boolean>(false);

  // Refs for responsive scaling
  const desktopRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const [scales, setScales] = useState({
    desktop: 0.5,
    tablet: 0.35,
    phone: 0.35,
  });

  useEffect(() => {
    const updateScales = () => {
      if (desktopRef.current) {
        const w = desktopRef.current.clientWidth;
        setScales((prev) => ({ ...prev, desktop: w / 1280 }));
      }
      if (tabletRef.current) {
        const w = tabletRef.current.clientWidth;
        setScales((prev) => ({ ...prev, tablet: w / 768 }));
      }
      if (phoneRef.current) {
        const w = phoneRef.current.clientWidth;
        setScales((prev) => ({ ...prev, phone: w / 375 }));
      }
    };

    updateScales();
    const ro = new ResizeObserver(updateScales);
    if (desktopRef.current) ro.observe(desktopRef.current);
    if (tabletRef.current) ro.observe(tabletRef.current);
    if (phoneRef.current) ro.observe(phoneRef.current);

    window.addEventListener('resize', updateScales);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScales);
    };
  }, [viewMode]);

  return (
    <div className="w-full rounded-[32px] bg-gradient-to-b from-[#F9FAFB] via-[#F3F4F6] to-[#E5E7EB] border-2 border-stone-200/90 shadow-xl overflow-hidden relative select-none">
      {/* Studio Header Toolbar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-stone-900 flex items-center gap-1.5">
              <span>{title}</span>
              <span className="hidden md:inline-block text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                {tag}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 hidden sm:block">
              Diseño 100% responsivo probado en PC, iPad y Smartphone
            </div>
          </div>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Trio vs Focused Device Tabs */}
          <div className="inline-flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('trio')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'trio'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Ver los 3 dispositivos juntos"
            >
              <Layers className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Set 3D</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Ver solo pantalla de computador"
            >
              <Monitor className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">PC</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('tablet')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'tablet'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Ver solo pantalla de tablet"
            >
              <TabletIcon className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Ver solo pantalla de celular"
            >
              <Smartphone className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Celular</span>
            </button>
          </div>

          {/* Interactive Toggle */}
          <button
            type="button"
            onClick={() => setInteractive(!interactive)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              interactive
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{interactive ? 'Interactivo ACTIVO' : 'Probar Clics'}</span>
          </button>

          {/* Open full window button */}
          <a
            href={demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 bg-[#1B4D3E] hover:bg-[#143B2F] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all"
            title="Abrir este demo en pantalla completa"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Pantalla Completa</span>
          </a>
        </div>
      </div>

      {/* Notice bar if interactive is active */}
      {interactive && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-1.5 text-center text-xs text-emerald-800 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>¡Modo interactivo activado! Puedes navegar, hacer clic en botones y probar el demo dentro de la pantalla.</span>
          <button
            type="button"
            onClick={() => setInteractive(false)}
            className="text-[11px] font-bold text-emerald-900 underline ml-2 cursor-pointer"
          >
            Cerrar modo interactivo
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3D STUDIO SHOWCASE STAGE                                                  */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-8 lg:p-12 min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center relative overflow-hidden">
        {/* Soft studio ambient light backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/90 via-transparent to-stone-200/40 pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: TRIO MULTI-DISPOSITIVO (IDÉNTICO A LA FOTO DE REFERENCIA) */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'trio' && (
          <div className="w-full max-w-5xl relative flex items-end justify-center py-4">
            {/* 1. DESKTOP / iMAC MONITOR (DOMINANTE, CENTRO-IZQUIERDA) */}
            <div className="w-[66%] sm:w-[68%] lg:w-[70%] z-10 flex flex-col items-center">
              {/* Monitor Screen Frame */}
              <div className="w-full bg-[#1A1A1A] rounded-[18px] sm:rounded-[22px] p-2 sm:p-3 pb-0 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-stone-800 relative">
                {/* Top Bezel Camera */}
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mx-auto mb-1.5 ring-1 ring-white/10" />

                {/* Desktop Display Surface */}
                <div
                  ref={desktopRef}
                  className="w-full aspect-[16/10] bg-stone-900 rounded-t-lg sm:rounded-t-xl overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Desktop`}
                    className={`w-[1280px] h-[800px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.desktop})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center group"
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                        Clic para interactuar
                      </div>
                    </div>
                  )}
                </div>

                {/* iMac Lower Aluminum Chin Bar with subtle branding */}
                <div className="h-6 sm:h-9 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-b-lg sm:rounded-b-xl flex items-center justify-center border-t border-white/60 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-500/60 shadow-sm" />
                </div>
              </div>

              {/* iMac Tapered Metallic Stand */}
              <div className="w-16 sm:w-24 h-7 sm:h-11 bg-gradient-to-b from-[#CBD5E1] via-[#94A3B8] to-[#64748B] shadow-inner" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
              {/* Stand Base Plate */}
              <div className="w-36 sm:w-52 h-2 sm:h-2.5 bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#94A3B8] rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />
              {/* Soft studio contact shadow on floor */}
              <div className="w-48 sm:w-72 h-3 bg-black/25 blur-md rounded-full mt-1" />
            </div>

            {/* 2. TABLET / iPAD (DE PIE A LA DERECHA, TRASLAPADO) */}
            <div className="absolute right-[5%] sm:right-[7%] lg:right-[10%] bottom-6 sm:bottom-8 w-[28%] sm:w-[27%] lg:w-[25%] z-20 flex flex-col items-center">
              <div className="w-full bg-[#18181B] rounded-[18px] sm:rounded-[24px] p-2 sm:p-2.5 shadow-[0_25px_50px_rgba(0,0,0,0.35)] border border-stone-700/80 ring-1 ring-white/10 relative">
                {/* Tablet Top Camera */}
                <div className="w-1.5 h-1.5 rounded-full bg-stone-700 mx-auto mb-1 ring-1 ring-white/10" />

                {/* Tablet Screen Surface */}
                <div
                  ref={tabletRef}
                  className="w-full aspect-[3/4] bg-stone-900 rounded-[12px] sm:rounded-[16px] overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Tablet`}
                    className={`w-[768px] h-[1024px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.tablet})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                    />
                  )}
                </div>
              </div>
              {/* Tablet Base Shadow */}
              <div className="w-full h-3 bg-black/35 blur-md rounded-full mt-1" />
            </div>

            {/* 3. SMARTPHONE / iPHONE (EN PRIMER PLANO AL FRENTE DE LA TABLET) */}
            <div className="absolute right-[0%] sm:right-[1%] lg:right-[3%] bottom-0 w-[19%] sm:w-[18%] lg:w-[17%] min-w-[95px] max-w-[170px] z-30 flex flex-col items-center">
              <div className="w-full bg-[#0A0A0A] rounded-[22px] sm:rounded-[32px] p-1.5 sm:p-2 shadow-[0_30px_60px_rgba(0,0,0,0.45)] border-2 border-stone-700 ring-1 ring-white/20 relative">
                {/* iPhone Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-2 sm:h-2.5 bg-black rounded-full z-40 border border-stone-800" />

                {/* Phone Screen Surface */}
                <div
                  ref={phoneRef}
                  className="w-full aspect-[9/19.5] bg-stone-900 rounded-[16px] sm:rounded-[24px] overflow-hidden relative shadow-inner"
                >
                  <iframe
                    src={demoUrl}
                    title={`${title} - Móvil`}
                    className={`w-[375px] h-[812px] border-0 origin-top-left ${
                      interactive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: `scale(${scales.phone})`,
                    }}
                  />
                  {!interactive && (
                    <div
                      onClick={() => setInteractive(true)}
                      className="absolute inset-0 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                    />
                  )}

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-0.5 sm:h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
                </div>
              </div>
              {/* Phone Base Shadow */}
              <div className="w-full h-3.5 bg-black/45 blur-md rounded-full mt-1" />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: SOLO DESKTOP                                          */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'desktop' && (
          <div className="w-full max-w-4xl flex flex-col items-center py-2">
            <div className="w-full bg-[#1A1A1A] rounded-[22px] p-3 pb-0 shadow-2xl border border-stone-800">
              <div className="w-2 h-2 rounded-full bg-stone-700 mx-auto mb-2" />
              <div
                ref={desktopRef}
                className="w-full aspect-[16/10] bg-stone-900 rounded-t-xl overflow-hidden relative shadow-inner"
              >
                <iframe
                  src={demoUrl}
                  title={`${title} - Desktop`}
                  className={`w-[1280px] h-[800px] border-0 origin-top-left ${
                    interactive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    transform: `scale(${scales.desktop})`,
                  }}
                />
              </div>
              <div className="h-8 bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] rounded-b-xl flex items-center justify-center border-t border-white/60">
                <div className="w-3 h-3 rounded-full bg-stone-500/60" />
              </div>
            </div>
            <div className="w-28 h-10 bg-gradient-to-b from-[#CBD5E1] via-[#94A3B8] to-[#64748B]" style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} />
            <div className="w-60 h-2.5 bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#94A3B8] rounded-full shadow-lg" />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: SOLO TABLET                                           */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'tablet' && (
          <div className="w-full max-w-md flex flex-col items-center py-2">
            <div className="w-full bg-[#18181B] rounded-[28px] p-3 shadow-2xl border border-stone-700">
              <div className="w-2 h-2 rounded-full bg-stone-700 mx-auto mb-2" />
              <div
                ref={tabletRef}
                className="w-full aspect-[3/4] bg-stone-900 rounded-[20px] overflow-hidden relative shadow-inner"
              >
                <iframe
                  src={demoUrl}
                  title={`${title} - Tablet`}
                  className={`w-[768px] h-[1024px] border-0 origin-top-left ${
                    interactive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    transform: `scale(${scales.tablet})`,
                  }}
                />
              </div>
            </div>
            <div className="w-48 h-3 bg-black/30 blur-md rounded-full mt-2" />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: SOLO CELULAR                                          */}
        {/* ------------------------------------------------------------- */}
        {viewMode === 'mobile' && (
          <div className="w-full max-w-xs flex flex-col items-center py-2">
            <div className="w-full bg-[#0A0A0A] rounded-[38px] p-2.5 shadow-2xl border-2 border-stone-700 ring-1 ring-white/20 relative">
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 border border-stone-800" />
              <div
                ref={phoneRef}
                className="w-full aspect-[9/19.5] bg-stone-900 rounded-[28px] overflow-hidden relative shadow-inner"
              >
                <iframe
                  src={demoUrl}
                  title={`${title} - Móvil`}
                  className={`w-[375px] h-[812px] border-0 origin-top-left ${
                    interactive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                  style={{
                    transform: `scale(${scales.phone})`,
                  }}
                />
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
              </div>
            </div>
            <div className="w-36 h-3 bg-black/40 blur-md rounded-full mt-2" />
          </div>
        )}
      </div>

      {/* Footer Features Bar */}
      <div className="bg-white/90 border-t border-stone-200/80 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-bold text-stone-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Adaptable a cualquier pantalla
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span className="text-stone-500 hidden sm:inline">
            Carga ultrarrápida &lt; 1 seg en 4G/5G
          </span>
          <span className="hidden md:inline text-stone-300">•</span>
          <span className="text-stone-500 hidden md:inline">
            Integrado con WhatsApp & Webpay
          </span>
        </div>

        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-black text-[#15803d] hover:text-[#166534] hover:underline cursor-pointer"
        >
          Probar con carrito y modo dueño ↗
        </a>
      </div>
    </div>
  );
};
