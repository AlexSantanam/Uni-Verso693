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

interface MaquinaItem {
  linea: string;
  titulo: string;
  descripcion: string;
  foto: string;
  eett: string;
  disponibilidad: string;
  cta: string;
}

export const DemoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  // Parámetros URL dinámicos
  const empresaParam = searchParams.get('empresa') || searchParams.get('e') || '';
  const rubroParam = (searchParams.get('rubro') || searchParams.get('r') || 'maquinaria').toLowerCase();
  const telefonoParam = searchParams.get('tel') || searchParams.get('t') || '+56 9 4419 4618';
  const comunaParam = searchParams.get('comuna') || searchParams.get('c') || 'Valparaíso & Región Metropolitana';
  const rutParam = searchParams.get('rut') || '76.892.411-K';

  // Nombre de la Empresa
  const nombreEmpresa = useMemo(() => {
    if (empresaParam) return empresaParam;
    if (slug) {
      return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    return 'Maquinarias & Movimiento de Tierras SpA';
  }, [empresaParam, slug]);

  const telefonoLimpio = useMemo(() => {
    return telefonoParam.replace(/[^0-9]/g, '') || '56944194618';
  }, [telefonoParam]);

  // Mensaje cuando el cliente de la constructora le cotiza al negocio
  const waLeadMsg = encodeURIComponent(
    `Hola ${nombreEmpresa}, vi su sitio web oficial y necesito cotizar arriendo de maquinaria para una faena en ${comunaParam}. ¿Tienen disponibilidad?`
  );

  // Mensaje cuando el DUEÑO del negocio quiere comprarle la web a UniVerso 693
  const waUniVersoMsg = encodeURIComponent(
    `Hola Alexis, estuve revisando la web corporativa que armaron para "${nombreEmpresa}" en ${comunaParam}. Me interesa activarla con mi propio dominio por $85.000. ¿Cómo coordinamos?`
  );

  // Maquinarias con fotos estilo faena chilena (idéntico a Asvid)
  const flotaMaquinaria: MaquinaItem[] = [
    {
      linea: 'Línea 01 · Excavación',
      titulo: 'Retroexcavadora 4x4 con Balde y Martillo',
      descripcion: 'Apertura de zanjas, excavación de fundaciones, demolición de radieres y carga de tolvas. Operador con certificación y mutual al día.',
      foto: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      eett: 'Tracción 4x4 · Martillo demoledor 450 kg · Balde 0.3 m³',
      disponibilidad: 'Turnos por Hora y Jornada',
      cta: 'Cotizar Retroexcavadora'
    },
    {
      linea: 'Línea 02 · Alto Tonelaje',
      titulo: 'Excavadora de Oruga (14 a 22 Toneladas)',
      descripcion: 'Movimiento masivo de tierras, despeje de parcelas, corte de laderas en roca y excavaciones profundas para fundaciones masivas.',
      foto: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      eett: 'Balde de 1.2 m³ · Orugas de acero · Traslado en cama baja',
      disponibilidad: 'Arriendo con Operador',
      cta: 'Cotizar Excavadora'
    },
    {
      linea: 'Línea 03 · Transporte Faena',
      titulo: 'Camión Tolva 14 m³ para Retiro de Áridos',
      descripcion: 'Retiro de escombros, transporte de material estabilizado, base granular y tierra vegetal directo a faena con descarga hidráulica.',
      foto: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
      eett: 'Capacidad 14 m³ · Tolva reforzada Hardox · Chofer clase A-4/A-5',
      disponibilidad: 'Flota Disponible en Faena',
      cta: 'Cotizar Camión Tolva'
    },
    {
      linea: 'Línea 04 · Movimientos Finos',
      titulo: 'Minicargador Bobcat con Balde Frontal',
      descripcion: 'Nivelación de terrenos en espacios reducidos, radieres industriales, limpieza de pavimentos y carga en galpones interiores.',
      foto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      eett: 'Maniobrabilidad 360° · Balde y horquilla · Despacho rápido',
      disponibilidad: 'Jornada Completa y Media Jornada',
      cta: 'Cotizar Minicargador'
    }
  ];

  const mandantes = [
    { nombre: 'TPS VALPARAÍSO', desc: 'Terminal Pacífico Sur', tag: 'PORTUARIO' },
    { nombre: 'PUERTO VALPARAÍSO', desc: 'Empresa Portuaria EPV', tag: 'INFRAESTRUCTURA' },
    { nombre: 'ENAP REFINERÍAS', desc: 'Refinería Aconcagua Concón', tag: 'PETROQUÍMICA' },
    { nombre: 'PUERTO VENTANAS S.A.', desc: 'Terminal Granelero Quintero', tag: 'GRANEL' },
    { nombre: 'GNL QUINTERO', desc: 'Terminal Regasificación', tag: 'ENERGÍA' },
    { nombre: 'BODEGAS SAN FRANCISCO', desc: 'Centros Logísticos y Galpones', tag: 'LOGÍSTICA' },
    { nombre: 'CODELCO DIVISIÓN VENTANAS', desc: 'Fundición y Refinería', tag: 'MINERÍA' }
  ];

  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(flotaMaquinaria[0].titulo);
  const [comentarioFaena, setComentarioFaena] = useState('');

  const handleEnviarCotizacion = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `*SOLICITUD FORMAL DE COTIZACIÓN — ${nombreEmpresa}*\n` +
      `----------------------------------------\n` +
      `• *Maquinaria Requerida:* ${maquinaSeleccionada}\n` +
      `• *Ubicación de la Faena:* ${comunaParam}\n` +
      `• *Requerimiento Técnico:* ${comentarioFaena || 'Requerimos cotización por hora/jornada con operador'}\n` +
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
      {/* TOP BAR INSTITUCIONAL EN GRIS GRAFITO (ESTILO ASVID)          */}
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
                Maquinaria Pesada & Movimiento de Tierras
              </span>
            </div>
          </div>

          {/* Menú Desktop Sobrio */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold uppercase tracking-wider text-[#2D323C]">
            <a href="#empresa" className="hover:text-[#FF6412] transition-colors py-2">Empresa</a>
            <a href="#flota" className="hover:text-[#FF6412] transition-colors py-2">Flota & Maquinaria</a>
            <a href="#estandares" className="hover:text-[#FF6412] transition-colors py-2">Normativa & Seguridad</a>
            <a href="#contacto" className="hover:text-[#FF6412] transition-colors py-2">Cotizar Faena</a>
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
              <span>Cotizar Maquinaria</span>
            </a>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO CORPORATIVO: FOTO DE FAENA + OVERLAY OSCURO ASVID       */}
      {/* ============================================================ */}
      <section className="relative bg-[#14171C] text-white overflow-hidden py-20 sm:py-28 border-b-4 border-[#FF6412]">
        
        {/* Imagen de fondo de faena con filtro técnico industrial */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1920&q=80"
            alt="Faena pesada"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradiente sobrio institucional */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14171C] via-[#14171C]/90 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Tag superior */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#FF6412]">
              <span className="w-2 h-2 rounded-full bg-[#FF6412]" />
              <span>Flota y Operaciones en {comunaParam}</span>
            </div>

            {/* Título Principal Sobrio */}
            <h1 className="text-3xl sm:text-5xl font-black text-white font-heading uppercase tracking-tight leading-tight">
              Arriendo de Maquinaria Pesada & Movimiento de Tierras
            </h1>

            {/* Bajada Institucional */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              En <strong>{nombreEmpresa}</strong> proveemos maquinaria de alto rendimiento para obras civiles, movimientos de tierra, apertura de zanjas y faenas industriales. Operadores certificados, mantenciones al día y respuesta en terreno.
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

            {/* Trust Badges Inmediatos sobre el pliegue (Estilo Asvid) */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6412] shrink-0" />
                <span><strong>Disponibilidad:</strong> En el Día</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6412] shrink-0" />
                <span><strong>Normativa:</strong> Mutual CChC / APR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6412] shrink-0" />
                <span><strong>Facturación:</strong> Inmediata (SII)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6412] shrink-0" />
                <span><strong>Traslado:</strong> Cama Baja Propia</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* CARRUSEL DE CLIENTES, MANDANTES & TERMINALES (ESTILO ASVID)  */}
      {/* ============================================================ */}
      <section className="py-8 bg-[#F4F5F7] border-b border-[#E2E4E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-widest text-[#FF6412] uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6412] rounded-full inline-block" />
              Operaciones en Faenas Industriales, Portuarias y Civiles
            </span>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold hidden sm:inline">
              Protocolos de Seguridad Rigurosos
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 px-4 max-w-7xl mx-auto scrollbar-none">
          {mandantes.map((m, idx) => (
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
      {/* SECCIÓN: NUESTRA EMPRESA (CORPORATIVO SOBRIO CHILENO)        */}
      {/* ============================================================ */}
      <section id="empresa" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                  Nuestra Empresa
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-[#555555] pt-2">
                <strong>{nombreEmpresa}</strong> es una empresa chilena especializada en arriendo de maquinaria pesada, movimientos de tierra y faenas de apoyo a la construcción e industria en la Región de {comunaParam}.
              </p>

              <p className="text-sm leading-relaxed text-[#555555]">
                Mantenemos una flota moderna y rigurosamente inspeccionada, con personal calificado, exámenes de salud ocupacional al día y cumplimiento estricto de las exigencias de prevención de riesgos (Mutual de Seguridad CChC / AST).
              </p>

              <p className="text-sm leading-relaxed text-[#555555]">
                Atendemos requerimientos tanto para contratistas generales como para particulares y empresas inmobiliarias, garantizando puntualidad en la entrega de equipos y rendimiento efectivo en faena.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#1E2229] font-semibold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412]" />
                  Operadores Calificados con Experiencia
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412]" />
                  Mantención Preventiva en Faena
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6412]" />
                  Facturación Inmediata Afecta o Exenta
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-[#E2E4E8] p-2 bg-[#F4F5F7]">
                <img
                  src="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80"
                  alt="Maquinaria en faena"
                  className="w-full h-80 object-cover"
                />
                <div className="py-3 px-2 text-[12px] text-slate-600 flex justify-between items-center">
                  <span>Operación de maquinaria pesada en terreno</span>
                  <span className="font-bold text-[#FF6412]">{comunaParam}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: FLOTA & MAQUINARIA (FONDOS GRIS HORMIGÓN CON ASVID)  */}
      {/* ============================================================ */}
      <section id="flota" className="py-16 sm:py-20 bg-[#F4F5F7] border-t border-b border-[#E2E4E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                Flota y Maquinaria en Arriendo
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-2xl">
              Equipos de alta confiabilidad mecánica preparados para faenas de excavación, demolición, transporte y despeje en {comunaParam}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flotaMaquinaria.map((maq, index) => {
              const waItemMsg = encodeURIComponent(
                `Hola ${nombreEmpresa}, necesito cotizar: *${maq.titulo}* para una faena en ${comunaParam}. ¿Cuál es la tarifa por hora/jornada?`
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
      {/* SECCIÓN: NORMATIVA, SEGURIDAD & PREVENCIÓN (ESTILO ASVID)     */}
      {/* ============================================================ */}
      <section id="estandares" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <div className="border-b-2 border-[#FF6412] pb-2 inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2229] font-heading uppercase tracking-wide">
                Estándares de Seguridad y Operación
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 max-w-2xl">
              Nuestra operación se rige por estrictos protocolos de prevención de riesgos y control técnico bajo normativa chilena vigente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 border border-[#E2E4E8] bg-[#F8F9FA] space-y-2 border-t-4 border-t-[#FF6412]">
              <span className="text-xs font-bold text-[#FF6412] uppercase block tracking-wider">Prevención de Riesgos</span>
              <h4 className="font-bold text-sm text-[#1E2229] font-heading">Mutual de Seguridad CChC</h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Afiliación activa, charlas de seguridad diarias antes de iniciar posturas y política permanente de Cero Daño.
              </p>
            </div>

            <div className="p-6 border border-[#E2E4E8] bg-[#F8F9FA] space-y-2 border-t-4 border-t-[#1E2229]">
              <span className="text-xs font-bold text-[#FF6412] uppercase block tracking-wider">Personal en Terreno</span>
              <h4 className="font-bold text-sm text-[#1E2229] font-heading">Operadores Calificados</h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Licencias de conducir al día (D y A-4/A-5), exámenes de altura física y acreditación para ingreso a plantas industriales.
              </p>
            </div>

            <div className="p-6 border border-[#E2E4E8] bg-[#F8F9FA] space-y-2 border-t-4 border-t-[#FF6412]">
              <span className="text-xs font-bold text-[#FF6412] uppercase block tracking-wider">Mantenimiento Mecánico</span>
              <h4 className="font-bold text-sm text-[#1E2229] font-heading">Pauta Preventiva Rigurosa</h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Revisión diaria de niveles hidráulicos, engrase de pasadores y control de horas motor para garantizar cero fallas en faena.
              </p>
            </div>

            <div className="p-6 border border-[#E2E4E8] bg-[#F8F9FA] space-y-2 border-t-4 border-t-[#1E2229]">
              <span className="text-xs font-bold text-[#FF6412] uppercase block tracking-wider">Administración & SII</span>
              <h4 className="font-bold text-sm text-[#1E2229] font-heading">Facturación Inmediata</h4>
              <p className="text-xs text-[#555555] leading-relaxed">
                Emisión de Factura Electrónica con detalle de horas o metraje cúbico, estado de pago formal y recepción conforme.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECCIÓN: FORMULARIO DE COTIZACIÓN FORMAL (ESTILO ASVID)       */}
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
              Complete el siguiente formulario para consultar disponibilidad de equipos, cotizar por hora o coordinar visita técnica a faena en {comunaParam}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Formulario Sobrio */}
            <div className="lg:col-span-7">
              <form onSubmit={handleEnviarCotizacion} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#1E2229] uppercase mb-1">Maquinaria o Servicio Requerido *</label>
                    <select
                      value={maquinaSeleccionada}
                      onChange={e => setMaquinaSeleccionada(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E2E4E8] focus:outline-none focus:border-[#FF6412]"
                    >
                      {flotaMaquinaria.map((m, i) => (
                        <option key={i} value={m.titulo}>{m.titulo}</option>
                      ))}
                      <option value="Movimiento de Tierras Integral">Movimiento de Tierras Integral</option>
                      <option value="Arriendo Mensual de Flota">Arriendo Mensual de Flota Completa</option>
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
                    placeholder="Describa el tipo de terreno, metraje aproximado, plazos requeridos o si cuenta con especificaciones técnicas..."
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
                <h3 className="font-bold text-sm text-[#1E2229] uppercase font-heading mb-1 border-b border-slate-100 pb-2">
                  Atención en Terreno & Operaciones
                </h3>

                <div className="space-y-3 text-xs text-[#555555]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#FF6412] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2229] block">Base de Operaciones:</strong>
                      <span>{comunaParam} · Región de Valparaíso y Metropolitana</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#FF6412] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2229] block">Línea Telefónica Directa:</strong>
                      <a href={`tel:${telefonoLimpio}`} className="text-[#FF6412] font-bold hover:underline">
                        {telefonoParam}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#FF6412] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E2229] block">Horario de Despacho & Faena:</strong>
                      <span>Lunes a Sábado de 07:30 a 19:30 hrs · Turnos de emergencia</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#1E2229] hover:bg-[#14171C] text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#FF6412]" />
                    <span>WhatsApp Turnos Inmediatos</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER SOBRIO ASVID + WATERMARK UNIVERSO                     */}
      {/* ============================================================ */}
      <footer className="bg-[#14171C] text-white border-t-4 border-[#FF6412] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1 text-slate-400">
            <p className="text-white font-bold">{nombreEmpresa} · RUT: {rutParam}</p>
            <p>Ingeniería de Faenas, Arriendo de Maquinaria y Movimiento de Tierras en {comunaParam}.</p>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Desarrollado y Gestionado por</span>
            <a
              href={`https://wa.me/56944194618?text=${waUniVersoMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6412] font-bold hover:underline underline-offset-2 flex items-center gap-1"
            >
              <span>UniVerso 693</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* BOTÓN FLOTANTE WHATSAPP (IDÉNTICO A ASVID)                   */}
      {/* ============================================================ */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/30"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </a>
      </div>

    </div>
  );
};
