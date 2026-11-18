import React, { useMemo, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Star,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Truck,
  Wrench,
  Flame,
  Award
} from 'lucide-react';

interface RubroPreset {
  tituloDefault: string;
  subtitulo: string;
  tagline: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  servicios: Array<{
    titulo: string;
    descripcion: string;
    foto: string;
    specs: string[];
    tag: string;
  }>;
  badges: string[];
  reviews: Array<{ nombre: string; texto: string; tiempo: string; estrellas: number }>;
}

const RUBRO_PRESETS: Record<string, RubroPreset> = {
  maquinaria: {
    tituloDefault: 'Arriendo de Maquinaria Pesada & Movimiento de Tierras',
    subtitulo: 'Flota propia de retroexcavadoras, camiones tolva y excavadoras de oruga con operadores calificados y certificación vigente.',
    tagline: 'Maquinaria Pesada & Movimiento de Tierras',
    color: '#F59E0B',
    colorBg: 'bg-amber-500/10',
    colorBorder: 'border-amber-500/30',
    servicios: [
      {
        titulo: 'Retroexcavadora 4x4 con Balde y Martillo',
        descripcion: 'Ideal para excavación de zanjas, fundaciones, demoliciones y carga de escombros. Operador profesional incluido.',
        foto: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
        specs: ['Tracción 4x4', 'Martillo demoledor hidráulico', 'Operador certificado'],
        tag: 'Más Solicitada'
      },
      {
        titulo: 'Excavadora de Oruga (14 a 22 Toneladas)',
        descripcion: 'Movimiento masivo de tierra, despeje de parcelas, cortes en terreno rocoso y obras viales de gran volumen.',
        foto: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
        specs: ['Balde de 1.2 m³', 'Alto rendimiento en terreno difícil', 'Traslado en cama baja'],
        tag: 'Alto Tonelaje'
      },
      {
        titulo: 'Camión Tolva 14 m³ para Faenas',
        descripcion: 'Retiro de áridos, escombros, tierra vegetal y transporte de estabilizado directo a obra con descarga hidráulica.',
        foto: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        specs: ['Capacidad 14 m³', 'Revisión técnica y pesaje al día', 'Chofer clase A-4/A-5'],
        tag: 'Transporte Rápido'
      },
      {
        titulo: 'Minicargador Bobcat con Accesorios',
        descripcion: 'Movimientos en espacios reducidos, nivelación fina de patios, radieres y limpieza de pavimentos urbanos.',
        foto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        specs: ['Maniobrabilidad 360°', 'Balde frontal + horquilla', 'Ideal para interiores de parcela'],
        tag: 'Precisión'
      }
    ],
    badges: ['Operadores con Mutual CChC', 'Facturación Inmediata (SII)', 'Traslado en Cama Baja a Faena', 'Respuesta en < 1 Hora'],
    reviews: [
      { nombre: 'Carlos M. (Contratista General)', texto: 'Excelente servicio. La retroexcavadora llegó puntual a la faena con operador muy prolijo. Cero tiempos muertos.', tiempo: 'Hace 3 días', estrellas: 5 },
      { nombre: 'Gonzalo P. (Inmobiliaria & Parcelas)', texto: 'Hicieron el despeje de 5.000 m² en tiempo récord. Buen precio por hora y factura al día.', tiempo: 'Hace 1 semana', estrellas: 5 },
      { nombre: 'Andrés V. (Ingeniero Residente)', texto: 'Camiones tolva impecables. Muy buena coordinación por WhatsApp para los retiros.', tiempo: 'Hace 2 semanas', estrellas: 5 }
    ]
  },
  fletes: {
    tituloDefault: 'Fletes, Mudanzas & Transporte de Carga Express',
    subtitulo: 'Servicio puntual, seguro y con personal de carga para hogares, oficinas y materiales de construcción.',
    tagline: 'Fletes & Mudanzas Express',
    color: '#06B6D4',
    colorBg: 'bg-cyan-500/10',
    colorBorder: 'border-cyan-500/30',
    servicios: [
      {
        titulo: 'Mudanza Residencial Completa',
        descripcion: 'Traslado seguro de muebles, electrodomésticos y cajas con frazadas protectoras y personal de carga.',
        foto: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=800&q=80',
        specs: ['Camión 3/4 cerrado', 'Cargadores incluidos', 'Frazadas y amarras de seguridad'],
        tag: 'Hogar'
      },
      {
        titulo: 'Flete Express de Materiales & Carga Ligera',
        descripcion: 'Retiro directo en Sodimac, Easy o bodegas con entrega inmediata en obra o domicilio.',
        foto: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        specs: ['Disponibilidad en el día', 'Capacidad 1.5 a 3.5 Ton', 'Seguimiento por WhatsApp'],
        tag: 'Inmediato'
      },
      {
        titulo: 'Transporte Interurbano e Interregional',
        descripcion: 'Rutas express entre comunas y regiones con monitoreo constante y seguro de carga.',
        foto: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
        specs: ['Puntualidad garantizada', 'Chofer con experiencia en carretera', 'Boleta o Factura'],
        tag: 'Larga Distancia'
      }
    ],
    badges: ['Puntualidad Garantizada', 'Cuidado Extremo de Muebles', 'Facturación Inmediata', 'Personal con Experiencia'],
    reviews: [
      { nombre: 'Marcela T.', texto: 'Llegaron a la hora exacta, trataron los muebles con mucho cuidado. 100% recomendados.', tiempo: 'Ayer', estrellas: 5 },
      { nombre: 'Felipe S.', texto: 'Excelente flete, rápido y cobro transparente sin sorpresas al llegar.', tiempo: 'Hace 4 días', estrellas: 5 }
    ]
  },
  clima: {
    tituloDefault: 'Instalación & Mantención de Aire Acondicionado',
    subtitulo: 'Soluciones de climatización residencial, comercial e industrial. Equipos inverter de alta eficiencia y servicio técnico certificado.',
    tagline: 'Climatización & HVAC Certificado',
    color: '#3B82F6',
    colorBg: 'bg-blue-500/10',
    colorBorder: 'border-blue-500/30',
    servicios: [
      {
        titulo: 'Instalación de Aire Acondicionado Split Inverter',
        descripcion: 'Montaje profesional de unidades de 9.000 a 24.000 BTU con bomba de vacío, cañerías aisladas y prueba de rendimiento.',
        foto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
        specs: ['Garantía por instalación de 1 año', 'Bomba de vacío norma SEC', 'Equipos frío/calor'],
        tag: 'Más Pedido'
      },
      {
        titulo: 'Mantención Preventiva y Limpieza Profunda',
        descripcion: 'Desinfección de serpentines con hidrolavadora, recarga de refrigerante R410A/R32 y eliminación de bacterias y hongos.',
        foto: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        specs: ['Ahorro de hasta 30% en energía', 'Aire 100% puro y sin olor', 'Revisión eléctrica'],
        tag: 'Ahorro'
      },
      {
        titulo: 'Climatización Comercial e Industrial',
        descripcion: 'Sistemas cassette, piso-cielo y ductos para oficinas, restaurantes, galpones y locales comerciales.',
        foto: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        specs: ['Cálculo térmico por m²', 'Equipos de alta potencia', 'Contratos de mantención'],
        tag: 'Empresas'
      }
    ],
    badges: ['Técnicos Certificados SEC', 'Garantía Escrita', 'Presupuesto en Terreno sin Costo', 'Factura Exenta o Afecta'],
    reviews: [
      { nombre: 'Rodrigo L. (Las Condes)', texto: 'Instalaron 2 equipos en mi depto en medio día. Limpios, ordenados y los equipos quedaron impecables.', tiempo: 'Hace 2 días', estrellas: 5 },
      { nombre: 'Camila H. (Local Comercial)', texto: 'Nos resolvieron una fuga de gas que otros técnicos no pillaron. Muy profesionales.', tiempo: 'Hace 1 semana', estrellas: 5 }
    ]
  },
  gasfiteria: {
    tituloDefault: 'Gasfitería de Emergencia & Detección de Fugas 24/7',
    subtitulo: 'Atención rápida a domicilio en minutos. Destapes con máquina, reparación de calefonts y gasfitería certificada SEC.',
    tagline: 'Gasfitería & Destapes de Emergencia',
    color: '#10B981',
    colorBg: 'bg-emerald-500/10',
    colorBorder: 'border-emerald-500/30',
    servicios: [
      {
        titulo: 'Destapes con Máquina Eléctrica K-50',
        descripcion: 'Desobstrucción inmediata de alcantarillados, cámaras desgrasadoras, tinas y wc sin romper pisos ni paredes.',
        foto: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
        specs: ['Sonda de alta potencia', 'Solución en menos de 1 hora', 'Garantía del servicio'],
        tag: 'Urgencias'
      },
      {
        titulo: 'Detección Electrónica de Fugas Ocultas',
        descripcion: 'Geófono y ultrasonido para ubicar filtraciones de agua bajo radier o muros sin picar a ciegas.',
        foto: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80',
        specs: ['Precisión milimétrica', 'Informe técnico para seguros', 'Cero roturas innecesarias'],
        tag: 'Tecnología'
      },
      {
        titulo: 'Reparación e Instalación de Calefonts',
        descripcion: 'Calefonts tiro forzado y natural, cambio de membranas, sensores de encendido y mantención de quemadores.',
        foto: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        specs: ['Instalador SEC Clase 3', 'Repuestos originales', 'Prueba de monóxido segura'],
        tag: 'Certificado'
      }
    ],
    badges: ['Atención 24/7 en Terreno', 'Llegada en 45 Minutos', 'Técnicos Certificados SEC', 'Boleta o Factura'],
    reviews: [
      { nombre: 'Patricia V.', texto: 'Me salvaron un domingo en la noche con una filtración en la cocina. Llegaron rapidísimo.', tiempo: 'Hace 2 días', estrellas: 5 },
      { nombre: 'Héctor B.', texto: 'Destaparon la cámara de alcantarillado con máquina en 30 minutos. Muy limpios.', tiempo: 'Hace 5 días', estrellas: 5 }
    ]
  }
};

export const DemoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  // Parámetros URL dinámicos
  const empresaParam = searchParams.get('empresa') || searchParams.get('e') || '';
  const rubroParam = (searchParams.get('rubro') || searchParams.get('r') || 'maquinaria').toLowerCase();
  const telefonoParam = searchParams.get('tel') || searchParams.get('t') || '+56944194618';
  const comunaParam = searchParams.get('comuna') || searchParams.get('c') || 'Valparaíso & Región Metropolitana';
  const fotoParam = searchParams.get('foto') || searchParams.get('f') || '';

  // Deducir datos
  const nombreEmpresa = useMemo(() => {
    if (empresaParam) return empresaParam;
    if (slug) {
      return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    return 'Maquinarias & Servicios Terreno';
  }, [empresaParam, slug]);

  const preset = useMemo(() => {
    if (RUBRO_PRESETS[rubroParam]) return RUBRO_PRESETS[rubroParam];
    if (rubroParam.includes('flete') || rubroParam.includes('muda')) return RUBRO_PRESETS.fletes;
    if (rubroParam.includes('clima') || rubroParam.includes('aire')) return RUBRO_PRESETS.clima;
    if (rubroParam.includes('gasf') || rubroParam.includes('dest')) return RUBRO_PRESETS.gasfiteria;
    return RUBRO_PRESETS.maquinaria;
  }, [rubroParam]);

  const telefonoLimpio = useMemo(() => {
    return telefonoParam.replace(/[^0-9]/g, '') || '56944194618';
  }, [telefonoParam]);

  // Mensaje cuando el cliente final le escribe al negocio del lead
  const waLeadMsg = encodeURIComponent(
    `Hola ${nombreEmpresa}, vi su catálogo en su página web y necesito cotizar un servicio para ${comunaParam}. ¿Tienen disponibilidad?`
  );

  // Mensaje cuando el DUEÑO del negocio quiere comprarle la web a UniVerso 693
  const waUniVersoMsg = encodeURIComponent(
    `Hola Alexis, vi la demo web que prepararon para "${nombreEmpresa}" en ${comunaParam}. Me interesa activarla con mi propio dominio por $85.000. ¿Cómo coordinamos?`
  );

  const [servicioSeleccionado, setServicioSeleccionado] = useState(preset.servicios[0]?.titulo || '');
  const [detalleCotizacion, setDetalleCotizacion] = useState('');

  const handleCotizarPersonalizado = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Hola ${nombreEmpresa}, necesito cotizar: *${servicioSeleccionado}* en *${comunaParam}*. Detalle: ${detalleCotizacion || 'Solicito contacto para coordinar faena'}.`;
    window.open(`https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* ============================================================ */}
      {/* BARRA SUPERIOR DE ACTIVACIÓN (GANCHO DE VENTA DE UNIVERSO)   */}
      {/* ============================================================ */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex h-2.5 w-2.5 rounded-full bg-white animate-ping" />
            <span className="text-xs sm:text-sm font-black tracking-wide uppercase">
              VISTA PREVIA EXCLUSIVA PARA: <span className="underline decoration-white/70 font-extrabold">{nombreEmpresa}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-white/90">
              Web lista para activar con tu dominio .CL por <strong>$85.000 pago único</strong> (o $15.000/mes)
            </span>
            <a
              href={`https://wa.me/56944194618?text=${waUniVersoMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-black hover:bg-slate-900 text-amber-400 font-black text-xs uppercase tracking-wider rounded-md shadow-md transition-transform transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Activar esta Web Hoy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* NAVEGACIÓN DE LA EMPRESA                                      */}
      {/* ============================================================ */}
      <header className="border-b border-slate-800 bg-[#161B22]/90 backdrop-blur-md sticky top-[42px] sm:top-[48px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg">
              {nombreEmpresa.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <strong className="text-base sm:text-lg font-black tracking-tight text-white block leading-tight">
                {nombreEmpresa}
              </strong>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                {preset.tagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${telefonoLimpio}`}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{telefonoParam}</span>
            </a>

            <a
              href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider rounded-md transition-all shadow-md flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Cotizar en 1 Clic</span>
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO SECTION DE ALTO IMPACTO MÓVIL                           */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-800 bg-gradient-to-b from-[#161B22] to-[#0D1117]">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Pill de ubicación y verificación */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Servicio Activo en <strong>{comunaParam}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-400 font-bold">Respuesta Inmediata</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {preset.tituloDefault}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {preset.subtitulo} En <strong>{nombreEmpresa}</strong> aseguramos cumplimiento de plazos, cotización transparente y atención directa en terreno.
            </p>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-black uppercase tracking-wider rounded-lg shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Hablar Directo al WhatsApp</span>
              </a>

              <a
                href={`tel:${telefonoLimpio}`}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white text-sm font-black uppercase tracking-wider rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Llamar: {telefonoParam}</span>
              </a>
            </div>

            {/* Badges de Confianza */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 border-t border-slate-800">
              {preset.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold">{badge}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GRILLA DE SERVICIOS / FLOTA DESTACADA                         */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-1">
              Catálogo & Flota Disponible
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Servicios Destacados de {nombreEmpresa}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Consulta disponibilidad horaria o arriendo por jornada para proyectos en {comunaParam} y sectores aledaños.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {preset.servicios.map((srv, index) => {
            const waSrvMsg = encodeURIComponent(
              `Hola ${nombreEmpresa}, me interesa cotizar: *${srv.titulo}* para una faena en ${comunaParam}. ¿Qué tarifa tienen?`
            );

            return (
              <div
                key={index}
                className="bg-[#161B22] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={srv.foto}
                      alt={srv.titulo}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider rounded border border-amber-400/30">
                      {srv.tag}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {srv.titulo}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {srv.descripcion}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                      {srv.specs.map((sp, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={`https://wa.me/${telefonoLimpio}?text=${waSrvMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-[#25D366] text-white hover:text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 group-hover:bg-[#25D366]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Cotizar este Servicio</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* COTIZADOR RÁPIDO INTERACTIVO                                 */}
      {/* ============================================================ */}
      <section className="py-12 bg-[#161B22] border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest">
                Presupuesto Rápido
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                ¿Necesitas coordinar una faena en {comunaParam}?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Selecciona lo que requieres y te respondemos de inmediato al WhatsApp con tarifas por hora, jornada o arriendo mensual.
              </p>
            </div>

            <form onSubmit={handleCotizarPersonalizado} className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Selecciona la Máquina o Servicio *
                </label>
                <select
                  value={servicioSeleccionado}
                  onChange={e => setServicioSeleccionado(e.target.value)}
                  className="w-full px-4 py-3 bg-[#161B22] border border-slate-700 rounded-lg text-white text-xs font-medium focus:outline-none focus:border-amber-400"
                >
                  {preset.servicios.map((s, i) => (
                    <option key={i} value={s.titulo}>{s.titulo}</option>
                  ))}
                  <option value="Servicio Integral / Otro">Otro requerimiento a medida</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Lugar de la faena o detalle del trabajo
                </label>
                <textarea
                  rows={3}
                  value={detalleCotizacion}
                  onChange={e => setDetalleCotizacion(e.target.value)}
                  placeholder={`Ej: Necesito 2 jornadas de retroexcavadora para zanja en ${comunaParam}...`}
                  className="w-full px-4 py-3 bg-[#161B22] border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enviar Requerimiento Directo a WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OPINIONES / RESEÑAS DE CLIENTES EN TERRENO                   */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Opiniones de Clientes y Contratistas
          </h2>
          <p className="text-xs text-slate-400">
            Calificación 4.9 de 5 en atención, puntualidad y rendimiento operativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preset.reviews.map((rev, i) => (
            <div key={i} className="bg-[#161B22] border border-slate-800 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.estrellas)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500">{rev.tiempo}</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{rev.texto}"
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                  {rev.nombre[0]}
                </div>
                <strong className="text-xs text-white">{rev.nombre}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER CORPORATIVO + WATERMARK DE VENTA                     */}
      {/* ============================================================ */}
      <footer className="border-t border-slate-800 bg-[#0A0D12] py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <strong className="text-slate-200 block text-sm">{nombreEmpresa}</strong>
            <p>Servicios en terreno, arriendo de maquinaria y operaciones en {comunaParam}.</p>
            <p className="text-[11px] text-slate-600">Teléfono oficial de atención: {telefonoParam}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center sm:text-right space-y-1.5 max-w-sm">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              Desarrollado por UniVerso 693
            </span>
            <p className="text-[11px] text-slate-400">
              ¿Quieres una web como esta para tu empresa con tu dominio .CL propio?
            </p>
            <a
              href={`https://wa.me/56944194618?text=${waUniVersoMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 text-xs"
            >
              <span>Activar por $85.000 aquí</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* BOTONES FLOTANTES MÓVILES                                     */}
      {/* ============================================================ */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161B22]/95 backdrop-blur-md border-t border-slate-800 p-3 grid grid-cols-2 gap-2">
        <a
          href={`tel:${telefonoLimpio}`}
          className="py-3 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 border border-slate-700"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Llamar</span>
        </a>

        <a
          href={`https://wa.me/${telefonoLimpio}?text=${waLeadMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-green-500/20"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>

    </div>
  );
};
