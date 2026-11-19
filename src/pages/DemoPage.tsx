import React, { useMemo, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  HardHat,
  Truck,
  Building2,
  FileCheck2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { getRubroConfig, RubroConfig, RubroCard } from '../data/demoRubros';

export const DemoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  // Tolerancia extrema a URLs malformadas o doblemente codificadas (ej: %3F en vez de ?)
  const fullHref = typeof window !== 'undefined' ? window.location.href : '';
  const searchParamsCombined = useMemo(() => {
    const sp = new URLSearchParams(searchParams);
    if (fullHref.includes('?')) {
      const q = fullHref.split('?')[1];
      if (q) {
        new URLSearchParams(q).forEach((v, k) => {
          if (!sp.has(k)) sp.set(k, v);
        });
      }
    } else if (fullHref.includes('%3F') || fullHref.includes('%3f')) {
      const q = fullHref.split(/%3[Ff]/)[1];
      if (q) {
        new URLSearchParams(q).forEach((v, k) => {
          if (!sp.has(k)) sp.set(k, v);
        });
      }
    }
    return sp;
  }, [searchParams, fullHref]);

  const safeDecode = (raw: string) => {
    if (!raw) return '';
    let val = raw;
    try {
      if (val.includes('%')) val = decodeURIComponent(val);
      if (val.includes('%')) val = decodeURIComponent(val);
    } catch {}
    return val.replace(/\+/g, ' ').trim();
  };

  // Parámetros URL dinámicos
  const empresaParam = safeDecode(searchParamsCombined.get('empresa') || searchParamsCombined.get('e') || '');
  const rubroParam = safeDecode(searchParamsCombined.get('rubro') || searchParamsCombined.get('r') || '');
  const telefonoParam = safeDecode(searchParamsCombined.get('tel') || searchParamsCombined.get('t') || '+56 9 4419 4618');
  const comunaParam = safeDecode(searchParamsCombined.get('comuna') || searchParamsCombined.get('c') || 'Valparaíso & Región Metropolitana');
  const rutParam = safeDecode(searchParamsCombined.get('rut') || '76.892.411-K');
  const fotoParam = searchParamsCombined.get('foto') || searchParamsCombined.get('f') || '';

  // Nombre de la Empresa
  const nombreEmpresa = useMemo(() => {
    let raw = empresaParam;
    if (!raw && slug) {
      raw = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    if (!raw || raw.trim().toLowerCase() === 'arriendo' || raw.trim().length < 3) {
      return 'Servicios & Operaciones en Terreno';
    }
    return raw;
  }, [empresaParam, slug]);

  // Rubro configurado dinámicamente con auto-detección
  const rubroConfig: RubroConfig = useMemo(() => {
    return getRubroConfig(rubroParam, nombreEmpresa);
  }, [rubroParam, nombreEmpresa]);

  // Foto de fondo dinámica para el Hero (si viene foto del cliente se usa esa; sino la oficial del rubro)
  const heroBackground = fotoParam || rubroConfig.heroImg;

  const telefonoLimpio = useMemo(() => {
    return telefonoParam.replace(/[^0-9]/g, '') || '56944194618';
  }, [telefonoParam]);

  // Mensaje cuando el cliente del prospecto le cotiza al negocio
  const waLeadMsg = encodeURIComponent(
    rubroConfig.leadMsgTemplate.replace(/{empresa}/g, nombreEmpresa).replace(/{comuna}/g, comunaParam)
  );

  // Mensaje cuando el DUEÑO del negocio quiere comprarle la web a UniVerso 693
  const waUniVersoMsg = encodeURIComponent(
    `Hola Alexis, estuve revisando la web corporativa que armaron para "${nombreEmpresa}" en ${comunaParam}. Me interesa activarla con mi propio dominio por $85.000. ¿Cómo coordinamos?`
  );

  const [servicioSeleccionado, setServicioSeleccionado] = useState(rubroConfig.cards[0]?.titulo || 'Servicio General');
  const [comentarioFaena, setComentarioFaena] = useState('');

  const handleEnviarCotizacion = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `*SOLICITUD FORMAL DE COTIZACIÓN — ${nombreEmpresa}*\n` +
      `----------------------------------------\n` +
      `• *Servicio Requerido:* ${servicioSeleccionado}\n` +
      `• *Ubicación / Comuna:* ${comunaParam}\n` +
      `• *Requerimiento Técnico:* ${comentarioFaena || 'Requerimos cotización formal y tiempos de respuesta'}\n` +
      `----------------------------------------\n` +
      `_Enviado desde el portal web corporativo_`;
    window.open(`https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-[#2D323C] font-sans antialiased selection:bg-[#FF6412] selection:text-white">
      
      {/* ============================================================ */}
      {/* BARRA SUPERIOR EXCLUSIVA UNIVERSO 693 (GANCHO DE VENTA)       */}
      {/* ============================================================ */}
      <div className="bg-[#14171C] text-white border-b-2 border-[#FF6412] py-2 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412] animate-pulse shrink-0" />
            <span>
              <strong>VISTA PREVIA CORPORATIVA:</strong> Esta maqueta está lista para publicarse con el RUT y dominio de <strong className="text-white underline decoration-[#FF6412]">{nombreEmpresa}</strong>.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-slate-400 text-[11px]">
              Activación inmediata con dominio .CL por <strong>$85.000 pago único</strong>
            </span>
            <a
              href={`https://wa.me/56944194618?text=${waUniVersoMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#FF6412] hover:bg-[#E0520A] text-white font-bold uppercase tracking-wider text-[11px] rounded transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              <span>Activar esta Web para Mi Empresa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TOP BAR INSTITUCIONAL EN GRIS GRAFITO                         */}
      {/* ============================================================ */}
      <div className="bg-[#1E2229] text-white text-[12px] border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6412]" />
              <span>Base Operativa: {comunaParam} · Cobertura Regional</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">RUT: {rutParam} · {nombreEmpresa}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${telefonoLimpio}`} className="font-bold text-white hover:text-[#FF6412] transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6412]" />
              <span>{telefonoParam}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CABECERA PRINCIPAL BLANCA (LIMPIA, CORPORATIVA Y FORMAL)     */}
      {/* ============================================================ */}
      <header className="sticky top-[42px] sm:top-[38px] z-40 bg-white border-b border-[#E2E4E8] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Nombre Corporativo sobrio */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#1E2229] border-l-4 border-[#FF6412] flex items-center justify-center text-white font-black text-xl font-heading shadow-xs">
              {nombreEmpresa.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <strong className="text-lg sm:text-xl font-bold tracking-tight text-[#1E2229] font-heading block leading-tight">
                {nombreEmpresa}
              </strong>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                {rubroConfig.rubroSubheader}
              </span>
            </div>
          </div>

          {/* Menú Desktop Sobrio */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold uppercase tracking-wider text-[#2D323C]">
            <a href="#empresa" className="hover:text-[#FF6412] transition-colors py-2">Empresa</a>
            <a href="#servicios" className="hover:text-[#FF6412] transition-colors py-2">Servicios & Flota</a>
            <a href="#estandares" className="hover:text-[#FF6412] transition-colors py-2">Normativa & Calidad</a>
            <a href="#contacto" className="hover:text-[#FF6412] transition-colors py-2">Cotizar Servicio</a>
          </nav>

          {/* Botón Cotizar Naranja */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#FF6412] hover:bg-[#E0520A] text-white text-xs font-bold uppercase tracking-wider transition-all rounded-xs shadow-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Cotizar Directo</span>
            </a>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO CORPORATIVO: FOTO DE FAENA REAL SEGÚN EL RUBRO          */}
      {/* ============================================================ */}
      <section className="relative bg-[#14171C] text-white overflow-hidden py-24 sm:py-32 border-b-4 border-[#FF6412]">
        
        {/* Imagen de fondo de faena real y claramente visible según el rubro */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBackground}
            alt={nombreEmpresa}
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-85"
          />
          {/* Filtro translúcido: oscuro a la izquierda para contraste tipográfico, transparente a la derecha */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(20, 23, 28, 0.90) 0%, rgba(20, 23, 28, 0.70) 50%, rgba(20, 23, 28, 0.25) 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Tag superior dinámico */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#14171C]/85 border-l-4 border-[#FF6412] text-xs font-bold uppercase tracking-widest text-slate-200 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF6412] animate-pulse" />
              <span>{rubroConfig.tagline.replace(/{comuna}/g, comunaParam)}</span>
            </div>

            {/* Título Principal Sobrio */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading uppercase tracking-tight leading-[1.12] drop-shadow-md">
              {nombreEmpresa}
            </h1>

            {/* Bajada Institucional adaptada */}
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              {rubroConfig.bajadaHero.replace(/{comuna}/g, comunaParam).replace(/{empresa}/g, nombreEmpresa)}
            </p>

            {/* Botones de Contacto */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <a
                href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#FF6412] hover:bg-[#E0520A] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Solicitar Cotización Inmediata</span>
              </a>

              <a
                href={`tel:${telefonoLimpio}`}
                className="px-7 py-3.5 bg-[#1E2229]/90 hover:bg-[#1E2229] border border-white/30 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FF6412]" />
                <span>Llamar a Operaciones</span>
              </a>
            </div>

            {/* Trust Badges Inmediatos adaptados al rubro */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 text-xs">
              {rubroConfig.trustBadges.map((badge, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6412] shrink-0" />
                  <span><strong>{badge.label}</strong> {badge.valor}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: FAENAS Y SECTORES DE ATENCIÓN EN TERRENO            */}
      {/* ============================================================ */}
      <section className="py-8 bg-[#F4F5F7] border-b border-[#E2E4E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest text-[#FF6412] uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6412] rounded-full inline-block" />
              {rubroConfig.sectoresTitle}
            </span>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold hidden sm:inline">
              Disponibilidad Inmediata en {comunaParam}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 px-4 max-w-7xl mx-auto scrollbar-none">
          {rubroConfig.sectores.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E4E8] px-5 py-3 rounded-xs flex items-center gap-3 shrink-0 shadow-2xs"
            >
              <div className="w-8 h-8 bg-[#1E2229] rounded-xs flex items-center justify-center text-[#FF6412] font-black text-xs">
                {m.nombre.slice(0, 2)}
              </div>
              <div>
                <strong className="text-xs font-bold text-[#1E2229] block leading-tight">{m.nombre}</strong>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider">{m.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: NUESTRA EMPRESA (ADAPTADA AL RUBRO)                 */}
      {/* ============================================================ */}
      <section id="empresa" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                  {rubroConfig.nombreRubro}
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-[#555555] pt-2">
                En <strong>{nombreEmpresa}</strong> nos especializamos en brindar soluciones de alto estándar técnico y operativo en <strong>{comunaParam}</strong> y cobertura en toda la región.
              </p>

              <p className="text-sm leading-relaxed text-[#555555]">
                {rubroConfig.bajadaHero.replace(/{comuna}/g, comunaParam).replace(/{empresa}/g, nombreEmpresa)}
              </p>

              <p className="text-sm leading-relaxed text-[#555555]">
                Atendemos requerimientos particulares, contratos con constructoras y faenas industriales, garantizando puntualidad, cumplimiento estricto de la normativa legal vigente y facturación electrónica inmediata.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#1E2229] font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412]" />
                  Personal Calificado con Exámenes al Día
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412]" />
                  Mantención Preventiva y Equipos Certificados
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412]" />
                  Facturación Inmediata (SII)
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-[#E2E4E8] p-2 bg-[#F4F5F7]">
                <img
                  src={rubroConfig.cards[1]?.foto || rubroConfig.heroImg}
                  alt={`Operación de ${rubroConfig.nombreRubro}`}
                  className="w-full h-80 object-cover"
                />
                <div className="py-3 px-2 text-[12px] text-slate-600 flex justify-between items-center">
                  <span>Operación y servicios en terreno</span>
                  <span className="font-bold text-[#FF6412]">{comunaParam}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: SERVICIOS & FLOTA                                   */}
      {/* ============================================================ */}
      <section id="servicios" className="py-16 sm:py-20 bg-[#F4F5F7] border-t border-b border-[#E2E4E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                {rubroConfig.serviciosTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-2xl">
              {rubroConfig.serviciosDesc.replace(/{comuna}/g, comunaParam)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rubroConfig.cards.map((maq, index) => {
              const waItemMsg = encodeURIComponent(
                `Hola ${nombreEmpresa}, necesito cotizar: *${maq.titulo}* para una faena en ${comunaParam}. ¿Cuál es la tarifa y disponibilidad?`
              );

              return (
                <div
                  key={index}
                  className="bg-white border border-[#E2E4E8] flex flex-col justify-between hover:border-[#FF6412] transition-colors shadow-2xs"
                >
                  <div>
                    <img
                      src={maq.foto}
                      alt={maq.titulo}
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold text-[#FF6412] uppercase tracking-wider block">
                        {maq.linea}
                      </span>
                      <h3 className="text-base font-bold text-[#1E2229] font-heading leading-tight">
                        {maq.titulo}
                      </h3>
                      <p className="text-xs text-[#555555] leading-relaxed">
                        {maq.descripcion}
                      </p>
                      
                      <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-100 space-y-1">
                        <p><strong>EETT:</strong> {maq.eett}</p>
                        <p className="text-[#FF6412] font-semibold">{maq.disponibilidad}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-4">
                    <a
                      href={`https://wa.me/${telefonoLimpio}?text=${waItemMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#1E2229] hover:text-[#FF6412] transition-colors flex items-center justify-between uppercase tracking-wider pt-3"
                    >
                      <span>{maq.cta}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: NORMATIVA, SEGURIDAD & CALIDAD                      */}
      {/* ============================================================ */}
      <section id="estandares" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                Estándares de Seguridad y Calidad Operativa
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-2xl">
              Nuestra operación se rige por estrictos protocolos de prevención de riesgos y control técnico bajo normativa chilena vigente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rubroConfig.normativas.map((norma, nIdx) => (
              <div
                key={nIdx}
                className={`p-6 border border-[#E2E4E8] bg-[#F8F9FA] space-y-2 border-t-4 ${
                  nIdx % 2 === 0 ? 'border-t-[#FF6412]' : 'border-t-[#1E2229]'
                }`}
              >
                <span className="text-xs font-bold text-[#FF6412] uppercase block tracking-wider">{norma.tag}</span>
                <h4 className="font-bold text-sm text-[#1E2229] font-heading">{norma.titulo}</h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {norma.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: FORMULARIO DE COTIZACIÓN FORMAL                     */}
      {/* ============================================================ */}
      <section id="contacto" className="py-16 sm:py-20 bg-[#F4F5F7] border-t border-b border-[#E2E4E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                Solicitud de Cotización y Visita Técnica
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-2xl">
              Complete el siguiente formulario para consultar disponibilidad de equipos, cotizar tarifas o coordinar visita técnica en {comunaParam}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Formulario Sobrio */}
            <div className="lg:col-span-7">
              <form onSubmit={handleEnviarCotizacion} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#1E2229] uppercase mb-1">Servicio o Equipo Requerido *</label>
                    <select
                      value={servicioSeleccionado}
                      onChange={e => setServicioSeleccionado(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E2E4E8] focus:outline-none focus:border-[#FF6412]"
                    >
                      {rubroConfig.cards.map((m, i) => (
                        <option key={i} value={m.titulo}>{m.titulo}</option>
                      ))}
                      <option value="Servicio Integral Programado">Servicio Integral Programado</option>
                      <option value="Contrato Mensual de Servicios">Contrato Mensual Dedicado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#1E2229] uppercase mb-1">Comuna / Ubicación de Faena *</label>
                    <input
                      type="text"
                      readOnly
                      value={comunaParam}
                      className="w-full px-3.5 py-2.5 bg-slate-100 border border-[#E2E4E8] text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1E2229] uppercase mb-1">Detalle del Requerimiento Técnico *</label>
                  <textarea
                    rows={4}
                    value={comentarioFaena}
                    onChange={e => setComentarioFaena(e.target.value)}
                    placeholder="Describa los requerimientos de la faena, plazos requeridos o especificaciones técnicas..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E2E4E8] focus:outline-none focus:border-[#FF6412]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#FF6412] hover:bg-[#E0520A] text-white font-bold uppercase tracking-wider text-xs transition-colors shadow-sm flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enviar Requerimiento a Operaciones</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Casa Matriz / Datos de Contacto */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-[#E2E4E8] p-6 bg-white space-y-4">
                <h3 className="font-bold text-sm text-[#1E2229] font-heading uppercase tracking-wide border-b border-[#E2E4E8] pb-2">
                  Oficina Técnica & Operaciones
                </h3>
                
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#FF6412] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2229] block">Base Operativa Terreno:</strong>
                      <span>{comunaParam}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#FF6412] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2229] block">Contacto Telefónico Directo:</strong>
                      <a href={`tel:${telefonoLimpio}`} className="hover:text-[#FF6412] font-semibold">
                        {telefonoParam}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#FF6412] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2229] block">Horario de Despacho & Faena:</strong>
                      <span>Lunes a Sábado: 08:00 a 19:00 hrs. (Turnos de emergencia disponibles)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#1E2229] hover:bg-[#2D323C] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FF6412] fill-current" />
                    <span>Contactar Vía WhatsApp Directo</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER CORPORATIVO SOBRIO EN GRIS OSCURO                      */}
      {/* ============================================================ */}
      <footer className="bg-[#14171C] text-white text-xs py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
            
            <div className="space-y-3">
              <strong className="text-base font-bold text-white font-heading block">
                {nombreEmpresa}
              </strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Soluciones integrales de {rubroConfig.nombreRubro.toLowerCase()} con cobertura en {comunaParam} y alrededores.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#FF6412] uppercase tracking-wider block">Servicios</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {rubroConfig.cards.map((c, i) => (
                  <li key={i}>{c.titulo}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#FF6412] uppercase tracking-wider block">Estándares</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>Mutualidad de Seguridad al Día</li>
                <li>Operadores y Técnicos Certificados</li>
                <li>Facturación Electrónica Inmediata (SII)</li>
                <li>Protocolos de Cero Daño en Faena</li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#FF6412] uppercase tracking-wider block">Contacto Terreno</span>
              <p className="text-slate-300 text-[11px]">
                {comunaParam}
              </p>
              <p className="text-[#FF6412] font-bold text-sm pt-1">
                {telefonoParam}
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
            <div>
              © {new Date().getFullYear()} {nombreEmpresa}. Todos los derechos reservados.
            </div>
            <div>
              Desarrollado y Acreditado por <a href="https://universo693.com" className="text-white hover:text-[#FF6412] font-semibold transition-colors">UniVerso 693</a> · Infraestructura ProPyme
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* BOTÓN FLOTANTE WHATSAPP DE COTIZACIÓN RÁPIDA                 */}
      {/* ============================================================ */}
      <a
        href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Cotizar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>

    </div>
  );
};

export default DemoPage;
