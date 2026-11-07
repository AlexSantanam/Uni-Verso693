import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Store,
  Utensils,
  TrendingUp,
  KeyRound,
  Coffee,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  ShoppingBag,
  GraduationCap,
  Wrench,
  MessageCircle,
  Compass,
  BadgeCheck,
  ExternalLink,
  MonitorPlay,
  LayoutGrid,
  Calculator,
  Layers,
  Plus,
  Minus,
  Search,
  Car,
  Clock,
  Award,
  CreditCard,
  MapPin,
  Bot,
} from 'lucide-react';
import { Container } from '../components/ui';
import { MultiDeviceMockup } from '../components/MultiDeviceMockup';
import { whatsappLink } from '../data/site';

type ActiveTab = 'inicio' | 'demos' | 'modalidades' | 'simulador';
type BusinessType = 'restaurante' | 'almacen' | 'comercio' | 'profesional' | 'servicios' | 'academia' | 'gestion';
type ModalityType = 'compra' | 'propiedad' | 'socio' | 'arriendo';

interface BusinessConfig {
  id: BusinessType;
  name: string;
  tag: string;
  subtitle: string;
  demoUrl: string;
  image: string;
  icon: React.ReactNode;
  examples: string;
  allowsRevShare: boolean;
  deliverables: string[];
  addons: { name: string; desc: string; price: string }[];
  basePrice: number;
  prices: {
    propiedad: { pie: number; monthly12: number; after12: number; monthly24: number; after24: number };
    socio: { setup: number; baseMonthly: number; revShare: string };
    arriendo: { setup: number; monthly: number };
  };
}

const BUSINESS_TYPES: Record<BusinessType, BusinessConfig> = {
  restaurante: {
    id: 'restaurante',
    name: 'Restaurante, Fuente de Soda, Sushi o Gastrobar',
    tag: 'Carta QR en Mesa + Delivery (Simple o Pro)',
    subtitle: 'Tus clientes escanean el QR en su mesa o piden por Delivery directo a cocina y WhatsApp (estilo OlaClick)',
    demoUrl: '/demos/restaurante/index.html',
    image: '/impulsa/restaurante.jpg',
    icon: <Utensils className="w-5 h-5" />,
    examples: 'Restaurantes, pizzerías, sushi, sangucherías, fuentes de soda, foodtrucks y cafeterías con salón',
    allowsRevShare: true,
    deliverables: [
      'Doble modalidad incluida: Modo Mesa QR en Salón (con botón “Llamar Garzón”) + Modo Delivery/Retiro a WhatsApp',
      'Dos versiones a elección: Versión Simple (pedidos directo a WhatsApp) o Versión Pro (comanda en salón + propina 10% + control de caja)',
      'Generador de códigos QR individuales por mesa listos para imprimir y pegar',
      'App Móvil “Modo Dueño” (PWA $0) para agotar platos en 1 toque, programar horarios y cuadrar ventas del turno',
    ],
    addons: [
      { name: 'Impresora térmica de comandas en cocina', desc: 'Integración directa con tu impresora para que el pedido salga impreso en cocina sin que nadie lo tipee.', price: 'Desde $25.000 habilitación' },
      { name: 'Programa de fidelización con puntos', desc: 'Tus clientes acumulan puntos por compra y los canjean por descuentos o platos gratis.', price: '+$9.900/mes' },
      { name: 'Multi-sucursal', desc: 'Administra varios locales desde un solo panel, con carta y stock independientes por sucursal.', price: '+$14.900/mes por sucursal adicional' },
    ],
    basePrice: 250000,
    prices: {
      propiedad: { pie: 15000, monthly12: 37000, after12: 10000, monthly24: 23000, after24: 10000 },
      socio: { setup: 15000, baseMonthly: 19900, revShare: '5% en pedidos pagados online (0% en salón efectivo)' },
      arriendo: { setup: 15000, monthly: 25000 },
    },
  },
  almacen: {
    id: 'almacen',
    name: 'Almacén de Barrio, Minimarket o Cafetería',
    tag: 'Catálogo & Pedidos WhatsApp',
    subtitle: 'Vitrina digital de ofertas donde tus vecinos arman su pedido y te llega listo al WhatsApp',
    demoUrl: '/demos/almacen/index.html',
    image: '/impulsa/almacen.jpg',
    icon: <Store className="w-5 h-5" />,
    examples: 'Almacenes de barrio, verdulerías, panaderías, bazares, comida casera y reparto local',
    allowsRevShare: false,
    deliverables: [
      'Página rápida con tu historia, ubicación en Google Maps y horarios de atención',
      'Catálogo con comanda automática que llega sumada y detallada a tu WhatsApp',
      'Dominio propio .CL configurado y carga inicial de tus primeros 30 productos',
      'Panel autoadministrable desde tu celular para cambiar precios u ofertas en 10 segundos',
    ],
    addons: [
      { name: 'Control de stock avanzado', desc: 'Alertas automáticas cuando un producto está por agotarse, para que nunca le falles a un cliente.', price: '+$9.900/mes' },
      { name: 'Reparto propio con mapa de despacho', desc: 'Tus repartidores ven las direcciones pendientes en un mapa y marcan la entrega como hecha.', price: '+$9.900/mes' },
      { name: 'Multi-sucursal', desc: 'Un catálogo y panel por cada local, todo desde una sola cuenta.', price: '+$9.900/mes por sucursal adicional' },
    ],
    basePrice: 250000,
    prices: {
      propiedad: { pie: 15000, monthly12: 37000, after12: 10000, monthly24: 23000, after24: 10000 },
      socio: { setup: 15000, baseMonthly: 19900, revShare: 'Solo Cuota Fija (0% comisión)' },
      arriendo: { setup: 15000, monthly: 25000 },
    },
  },
  comercio: {
    id: 'comercio',
    name: 'Tienda Online, Pastelería, Boutique o Ferretería',
    tag: 'E-Commerce & Webpay',
    subtitle: 'Vende 24/7 en todo Chile con carrito, control de stock y pago con tarjetas',
    demoUrl: '/demos/ecommerce/index.html',
    image: '/impulsa/comercio.jpg',
    icon: <ShoppingBag className="w-5 h-5" />,
    examples: 'Tiendas de ropa, pastelerías, artículos de mascotas, ferreterías, distribuidoras',
    allowsRevShare: true,
    deliverables: [
      'Tienda online completa con carrito, cálculo de despacho o retiro en tienda',
      'Pagos integrados con tarjetas de débito y crédito (Webpay / MercadoPago / Flow)',
      'Carga inicial asistida de hasta 60 productos con sus fotos y precios',
      'Panel autoadministrable simple para ajustar stock, precios y productos nuevos cuando quieras',
    ],
    addons: [
      { name: 'Facturación electrónica SII integrada', desc: 'Boletas y facturas electrónicas se emiten solas al cerrar cada venta.', price: '+$14.900/mes' },
      { name: 'Marketing automático', desc: 'Recupera carritos abandonados y envía ofertas automáticas por correo o WhatsApp.', price: '+$12.900/mes' },
      { name: 'Multi-bodega / varios puntos de retiro', desc: 'Controla stock por bodega y permite retiro en más de una dirección.', price: '+$9.900/mes' },
    ],
    basePrice: 285000,
    prices: {
      propiedad: { pie: 15000, monthly12: 42000, after12: 10000, monthly24: 27000, after24: 10000 },
      socio: { setup: 15000, baseMonthly: 22900, revShare: '5% por venta procesada en pasarela' },
      arriendo: { setup: 15000, monthly: 29000 },
    },
  },
  profesional: {
    id: 'profesional',
    name: 'Estudio de Arquitectura, Contadores o Abogados',
    tag: 'Portafolio & Cotizador m²',
    subtitle: 'Presencia de alto estándar con galería de proyectos y pre-cotizador interactivo',
    demoUrl: '/demos/arquitectura/index.html',
    image: '/impulsa/profesional.jpg',
    icon: <Compass className="w-5 h-5" />,
    examples: 'Estudios de arquitectura, constructoras, oficinas contables, estudios jurídicos, ingenierías',
    allowsRevShare: false,
    deliverables: [
      'Sitio web de alto estándar con portafolio filtrable de obras y proyectos (carga inicial incluida)',
      'Calculadora interactiva de presupuesto estimado (por m² y materialidad en UF/CLP)',
      'Agenda integrada para reuniones online o presenciales y correos corporativos',
      'Panel autoadministrable para subir nuevas obras o actualizar valores de referencia',
    ],
    addons: [
      { name: 'Firma digital de documentos', desc: 'Tus clientes firman contratos y propuestas sin imprimir, con validez legal.', price: '+$9.900/mes' },
      { name: 'Portal privado de clientes', desc: 'Cada cliente ve el avance de su proyecto o causa con su propia clave.', price: '+$14.900/mes' },
      { name: 'Integración con software contable', desc: 'Conecta tu cotizador con tu sistema contable para no duplicar datos.', price: '+$12.900/mes' },
    ],
    basePrice: 250000,
    prices: {
      propiedad: { pie: 15000, monthly12: 37000, after12: 10000, monthly24: 23000, after24: 10000 },
      socio: { setup: 15000, baseMonthly: 19900, revShare: 'Solo Cuota Fija (0% comisión)' },
      arriendo: { setup: 15000, monthly: 25000 },
    },
  },
  servicios: {
    id: 'servicios',
    name: 'Centro de Salud, Estética, Barbería o Veterinaria',
    tag: 'Agenda Online & Abonos',
    subtitle: 'Reserva de horas 24/7 con abono previo para eliminar las horas perdidas',
    demoUrl: '/demos/clinica/index.html',
    image: '/impulsa/servicios.jpg',
    icon: <Calendar className="w-5 h-5" />,
    examples: 'Clínicas dentales, centros de estética, kinesiólogos, psicólogos, barberías, veterinarias',
    allowsRevShare: true,
    deliverables: [
      'Agenda online donde el cliente elige profesional, previsión, día y hora sin llamarte',
      'Cobro de abono o consulta por pasarela online (elimina las inasistencias)',
      'Carga inicial de profesionales, aranceles y horarios + panel autoadministrable',
      'Recordatorios automáticos de cita para tus pacientes o clientes',
    ],
    addons: [
      { name: 'Ficha clínica digital', desc: 'Historial de cada paciente o cliente guardado y disponible en cada visita.', price: '+$14.900/mes' },
      { name: 'Recordatorios también por SMS', desc: 'Además del WhatsApp, un SMS de respaldo para quienes no lo leen a tiempo.', price: '+$9.900/mes' },
      { name: 'Multi-sede', desc: 'Varios profesionales o sucursales agendando en paralelo desde el mismo sistema.', price: '+$9.900/mes' },
    ],
    basePrice: 250000,
    prices: {
      propiedad: { pie: 15000, monthly12: 37000, after12: 10000, monthly24: 23000, after24: 10000 },
      socio: { setup: 15000, baseMonthly: 19900, revShare: '5% por reserva pagada online' },
      arriendo: { setup: 15000, monthly: 25000 },
    },
  },
  academia: {
    id: 'academia',
    name: 'Academia, OTEC, Escuela de Oficios o Capacitación',
    tag: 'Campus Moodle Cloud Dedicado & Diplomas',
    subtitle: 'Tu propio campus virtual Moodle para vender cursos, con diplomas PDF y fiscalización SENCE',
    demoUrl: '/demos/academia/index.html',
    image: '/impulsa/academia.jpg',
    icon: <GraduationCap className="w-5 h-5" />,
    examples: 'OTECs, escuelas de oficios, academias técnicas, fundaciones y capacitaciones SENCE',
    allowsRevShare: true,
    deliverables: [
      'Campus Moodle Cloud VPS Dedicado exclusivo (Ubuntu 24.04, Nginx, PostgreSQL y SSL)',
      'Personalización visual institucional completa (colores corporativos, logo y portadas adaptables a celular y PC)',
      'Carga e implementación completa de tus primeros 5 cursos (videos, manuales PDF, bancos de preguntas y evaluaciones)',
      'Registro y mecanismo de asistencia estándar SENCE + Diplomas digitales PDF automáticos con firma y QR',
      '4,5 horas de capacitación y acompañamiento directo a tu equipo docente y administrativo',
      'Propiedad 100% de tu institución desde el Día 1 en Bóveda Digital (código y base de datos con 0% amarres)',
    ],
    addons: [
      { name: 'Docente Virtual con Inteligencia Artificial 24/7 (Tutor Pedagógico RAG)', desc: 'Tutor de IA integrado dentro de las aulas, entrenado exclusivamente con los manuales y normas de tu institución. Tarifa plana protegida (15.000 consultas/mes con tope automático).', price: '+$30.000 + IVA/mes (+ $390.000 setup en compra)' },
      { name: 'Fiscalización SENCE NCh2728 avanzada', desc: 'Control anti-bypass de video, registro de asistencia por lección y exportación normativa lista para auditoría SENCE.', price: '+$29.900/mes' },
      { name: 'Hosting y Streaming de Video Propio VPS', desc: 'Servidor dedicado para streaming sin depender de enlaces externos de YouTube ni marcas de terceros.', price: '+$19.900/mes' },
    ],
    basePrice: 500000,
    prices: {
      propiedad: { pie: 25000, monthly12: 57500, after12: 10000, monthly24: 32500, after24: 10000 },
      socio: { setup: 25000, baseMonthly: 24900, revShare: '7% por matrícula pagada online' },
      arriendo: { setup: 25000, monthly: 35000 },
    },
  },
  gestion: {
    id: 'gestion',
    name: 'Taller Mecánico, Servicio Técnico o Contratista',
    tag: 'Órdenes & Seguimiento Patente',
    subtitle: 'Tus clientes consultan el estado de su vehículo/equipo en vivo y tú ordenas tu taller',
    demoUrl: '/demos/taller/index.html',
    image: '/impulsa/gestion.jpg',
    icon: <Wrench className="w-5 h-5" />,
    examples: 'Talleres mecánicos, servicios técnicos de celulares/PC, imprentas, empresas de mantención',
    allowsRevShare: false,
    deliverables: [
      'Portal donde tu cliente ingresa su Patente o N° de Orden y ve el avance sin llamarte',
      'Aprobación en línea de presupuestos de repuestos y mano de obra',
      'Panel autoadministrable para actualizar estados de bahía en 5 segundos desde el taller',
      'Capacitación inicial a tu equipo y continuidad operativa en servidor dedicado',
    ],
    addons: [
      { name: 'Inventario de repuestos', desc: 'Control de stock de repuestos con alertas cuando algo se está por agotar.', price: '+$9.900/mes' },
      { name: 'Multi-sucursal', desc: 'Varios talleres o sucursales operando desde el mismo sistema.', price: '+$9.900/mes' },
      { name: 'Integración con proveedores de repuestos', desc: 'Consulta precios y disponibilidad de tus proveedores sin salir del sistema.', price: '+$14.900/mes' },
    ],
    basePrice: 500000,
    prices: {
      propiedad: { pie: 25000, monthly12: 57500, after12: 10000, monthly24: 32500, after24: 10000 },
      socio: { setup: 25000, baseMonthly: 24900, revShare: 'Solo Cuota Fija (0% comisión)' },
      arriendo: { setup: 25000, monthly: 35000 },
    },
  },
};

export const ImpulsaPyme: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [selectedBiz, setSelectedBiz] = useState<BusinessType>('almacen');
  const [selectedMod, setSelectedMod] = useState<ModalityType>('propiedad');
  const [leasingMonths, setLeasingMonths] = useState<12 | 24>(24);
  const [includeFormalizacion, setIncludeFormalizacion] = useState<boolean>(false);
  const [includeAsistente, setIncludeAsistente] = useState<boolean>(false);
  const [includeGoogleAds, setIncludeGoogleAds] = useState<boolean>(false);

  const { rubro } = useParams<{ rubro?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const rubroPage: BusinessType | null = rubro && rubro in BUSINESS_TYPES ? (rubro as BusinessType) : null;
  const rubroPageInvalid = Boolean(rubro) && !rubroPage;

  useEffect(() => {
    const navState = location.state as { biz?: BusinessType; tab?: ActiveTab } | null;
    if (navState?.biz) {
      setSelectedBiz(navState.biz);
      if (navState.tab) setActiveTab(navState.tab);
    }
    window.scrollTo(0, 0);
  }, [location.key]);

  const currentBiz = BUSINESS_TYPES[selectedBiz];
  const fmtCLP = (n: number) => '$' + n.toLocaleString('es-CL');
  // Setup Administrativo Empresa en un Día: $19.900 preferencial en plan leasing, $39.000 en otros planes
  const formalizacionCost = selectedMod === 'propiedad' ? 19900 : 39000;
  const asistenteMonthlyCost = includeAsistente ? 14900 : 0;
  // Google Ads no se cobra a ciegas: se dimensiona en la reunión previa con el Ejecutivo según rubro/comuna
  const totalMonthlyAddons = asistenteMonthlyCost;
  const propertyMonthly = leasingMonths === 12 ? currentBiz.prices.propiedad.monthly12 : currentBiz.prices.propiedad.monthly24;
  const propertyAfter = leasingMonths === 12 ? currentBiz.prices.propiedad.after12 : currentBiz.prices.propiedad.after24;

  const handleSelectBiz = (biz: BusinessType) => {
    setSelectedBiz(biz);
    if (!BUSINESS_TYPES[biz].allowsRevShare && selectedMod === 'socio') {
      setSelectedMod('propiedad');
    }
  };

  const switchTab = (tab: ActiveTab, biz?: BusinessType) => {
    if (biz) handleSelectBiz(biz);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppMessage = () => {
    const biz = currentBiz.name;
    let modText = '';
    if (selectedMod === 'compra') {
      modText = `Compra / Venta Contado Llave en Mano (${fmtCLP(currentBiz.basePrice)} + IVA con propiedad 100% inmediata en Bóveda Digital y entrega de código fuente)`;
    } else if (selectedMod === 'propiedad') {
      modText = `Arriendo con Derecho a Compra en ${leasingMonths} cuotas (Habilitación inicial ${fmtCLP(currentBiz.prices.propiedad.pie)} + ${fmtCLP(propertyMonthly + totalMonthlyAddons)}/mes y al mes ${leasingMonths} pasa a ser 100% mío)`;
    } else if (selectedMod === 'socio') {
      modText = `Alianza Socio Impulsa con SEO Profundo Incluido (Habilitación inicial ${fmtCLP(currentBiz.prices.socio.setup)} + base ${fmtCLP(currentBiz.prices.socio.baseMonthly + totalMonthlyAddons)}/mes + ${currentBiz.prices.socio.revShare})`;
    } else {
      modText = `Suscripción Mensual Accesible (Habilitación ${fmtCLP(currentBiz.prices.arriendo.setup)} + ${fmtCLP(currentBiz.prices.arriendo.monthly + totalMonthlyAddons)}/mes sin comisiones)`;
    }
    const formText = includeFormalizacion
      ? `\n• Setup Administrativo Empresa en un Día + e-RUT + NIC.cl + Webpay: *SÍ (+${fmtCLP(formalizacionCost)} CLP)*`
      : '';
    const asistText = includeAsistente
      ? `\n• Bolsa Asistente Digital Mensual (hasta 3 cargas/mes): *SÍ (+$14.900/mes)*`
      : '';
    const adsText =
      selectedMod === 'socio'
        ? `\n• SEO Profundo de Conversión + Posicionamiento Google: *INCLUIDO ($0 extra por ser Socio a % Ventas)*`
        : includeGoogleAds
        ? `\n• Evaluación de Campaña Google Ads & SEO Local: *Quiero revisarlo con mi Ejecutivo en la reunión previa*`
        : '';
    return `¡Hola equipo Impulsa ProPyme (UNIVERSO693)! Estuve viendo las demos y simulando mi proyecto.\n\n• Mi rubro: *${biz}*\n• Modalidad elegida: *${modText}*${formText}${asistText}${adsText}\n\nMe gustaría agendar la reunión breve con mi Ejecutivo Asignado para conversar los detalles antes de contratar.`;
  };

  if (rubroPageInvalid) {
    return <Navigate to="/impulsa-pyme" replace />;
  }

  return (
    <div
      className="bg-[#FAF6F0] text-[#2C2520] min-h-screen flex flex-col justify-between selection:bg-[#FDE68A] selection:text-[#1B4D3E]"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Inyección de Tipografías Cálidas Editoriales (Fraunces + Plus Jakarta Sans) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-human {
          font-family: 'Fraunces', Georgia, serif;
        }
      `}</style>

      <div>
        {/* TOP BAR HUMANA & CERCANA */}
        <div className="bg-[#1B4D3E] text-[#F5EFE6] py-2.5 px-4 text-xs border-b border-[#143B2F]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 font-medium">
              <span className="bg-[#E9C46A] text-[#1B4D3E] font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                ☕ De Persona a Persona · Viña del Mar & Todo Chile
              </span>
              <span className="text-[#F5EFE6]/95">
                Aquí no hablas con robots ni pasas por pasarelas frías: <strong>te asignamos un Ejecutivo humano desde el primer día</strong>.
              </span>
            </div>
            <Link
              to="/"
              className="text-[#E9C46A] hover:text-white underline text-xs inline-flex items-center gap-1 font-semibold"
            >
              Un programa de UNIVERSO693 SpA <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* HEADER CÁLIDO CON NAVEGACIÓN AMABLE */}
        <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E6DEC8] shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
            {/* Logo con calidez artesanal */}
            <button
              type="button"
              onClick={() => switchTab('inicio')}
              className="flex items-center gap-3.5 text-left cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#1B4D3E] text-[#F5EFE6] flex flex-col items-center justify-center leading-none shadow-md border border-[#2D6A4F] group-hover:bg-[#C85A32] transition-colors">
                <Coffee className="w-5 h-5 text-[#E9C46A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-human text-xl sm:text-2xl font-bold tracking-tight text-[#1F1A17]">
                    Impulsa<span className="italic font-normal text-[#C85A32]">ProPyme</span>
                  </span>
                  <span className="hidden xl:inline-block text-[10px] font-bold bg-[#F3E9D2] text-[#7C4D25] border border-[#E2CFA5] px-2.5 py-0.5 rounded-full">
                    Acompañamiento Real
                  </span>
                </div>
                <span className="block text-[11px] text-[#6E6259] font-medium">
                  Hacemos tu página a mano y caminamos junto a tu negocio
                </span>
              </div>
            </button>

            {/* PESTAÑAS DE NAVEGACIÓN CON LENGUAJE HUMANO */}
            <nav className="flex items-center gap-1.5 sm:gap-2 bg-[#F2ECE1] p-1.5 rounded-2xl border border-[#E2D9C5] overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => switchTab('inicio')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'inicio'
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'text-[#4A3F35] hover:bg-white/80 hover:text-[#1B4D3E]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                1. Bienvenida y Rubros
              </button>

              <button
                type="button"
                onClick={() => switchTab('demos')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'demos'
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'text-[#4A3F35] hover:bg-white/80 hover:text-[#1B4D3E]'
                }`}
              >
                <MonitorPlay className="w-4 h-4" />
                2. Mirar Ejemplos Reales
                <span className="bg-[#C85A32] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Interactivo
                </span>
              </button>

              <button
                type="button"
                onClick={() => switchTab('modalidades')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'modalidades'
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'text-[#4A3F35] hover:bg-white/80 hover:text-[#1B4D3E]'
                }`}
              >
                <Layers className="w-4 h-4" />
                3. Cómo Te Acompañamos
              </button>

              <button
                type="button"
                onClick={() => switchTab('simulador')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'simulador'
                    ? 'bg-[#1B4D3E] text-white shadow-xs'
                    : 'text-[#4A3F35] hover:bg-white/80 hover:text-[#1B4D3E]'
                }`}
              >
                <Calculator className="w-4 h-4" />
                4. Simular y Conversar
              </button>
            </nav>

            {/* Botón Conversar con un Ejecutivo */}
            <div className="hidden lg:flex items-center">
              <a
                href={whatsappLink('¡Hola! Estoy visitando Impulsa ProPyme y me gustaría conversar con un ejecutivo sobre mi negocio.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#C85A32] hover:bg-[#B04B25] text-white font-bold text-xs px-4 py-2.5 shadow-sm transition-all"
              >
                <Coffee className="w-4 h-4" />
                Conversar con un Ejecutivo
              </a>
            </div>
          </div>
        </header>

        {/* ===================================================================== */}
        {/* PÁGINA PROPIA POR RUBRO (/impulsa-pyme/:rubro) — CON LINK COMPARTIBLE  */}
        {/* ===================================================================== */}
        {rubroPage && (
          <main className="py-8 sm:py-12">
            <Container>
              <Link
                to="/impulsa-pyme"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D3E] hover:underline mb-5"
              >
                ← Volver a todos los rubros
              </Link>

              <div className="rounded-[28px] bg-white border-2 border-[#E6DEC8] overflow-hidden shadow-sm">
                <div className="p-6 sm:p-9 pb-0">
                  <span className="inline-flex items-center gap-1.5 bg-[#E9C46A] text-[#1F1A17] text-[11px] font-black uppercase px-3 py-1 rounded-full mb-3">
                    {BUSINESS_TYPES[rubroPage].icon}
                    {BUSINESS_TYPES[rubroPage].tag}
                  </span>
                  <h1 className="font-human text-2xl sm:text-4xl font-semibold text-[#1F1A17] leading-tight">{BUSINESS_TYPES[rubroPage].name}</h1>
                </div>

                <div className="p-4 sm:p-8 pt-4">
                  <MultiDeviceMockup
                    demoUrl={BUSINESS_TYPES[rubroPage].demoUrl}
                    title={BUSINESS_TYPES[rubroPage].name}
                    tag={BUSINESS_TYPES[rubroPage].tag}
                    rubroId={rubroPage}
                  />
                </div>

                <div className="px-6 sm:px-9 pb-9 space-y-7">
                  <div>
                    <p className="text-sm sm:text-base text-[#574C43] leading-relaxed">{BUSINESS_TYPES[rubroPage].subtitle}</p>
                    <p className="text-xs text-[#8C7A6B] mt-1.5">
                      <strong>Pensado para:</strong> {BUSINESS_TYPES[rubroPage].examples}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="bg-[#FAF6F0] rounded-2xl border-2 border-[#E6DEC8] p-5">
                      <div className="inline-flex items-center gap-2 bg-[#E3F2EA] text-[#1B4D3E] text-xs font-black px-3 py-1 rounded-full uppercase mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Incluido desde {fmtCLP(BUSINESS_TYPES[rubroPage].prices.arriendo.monthly)}/mes
                      </div>
                      <ul className="space-y-2.5 text-sm text-stone-700">
                        {BUSINESS_TYPES[rubroPage].deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1B4D3E] mt-0.5 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#FFFDF9] rounded-2xl border-2 border-dashed border-[#E2CFA5] p-5">
                      <div className="inline-flex items-center gap-2 bg-[#F3E9D2] text-[#7C4D25] text-xs font-black px-3 py-1 rounded-full uppercase mb-3">
                        <Plus className="w-3.5 h-3.5" />
                        Todo el potencial que le puedes sacar
                      </div>
                      <p className="text-xs text-stone-500 mb-3">
                        Esto es un piso, no un techo. Partes simple y vas sumando a medida que tu negocio crece:
                      </p>
                      <ul className="space-y-3 text-sm">
                        {BUSINESS_TYPES[rubroPage].addons.map((a, i) => (
                          <li key={i} className="flex items-start justify-between gap-3 border-b border-[#E6DEC8] last:border-0 pb-2.5 last:pb-0">
                            <div>
                              <div className="font-bold text-[#1F1A17]">{a.name}</div>
                              <div className="text-xs text-stone-500">{a.desc}</div>
                            </div>
                            <span className="shrink-0 text-xs font-black text-[#C85A32] whitespace-nowrap">{a.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 4 MODALIDADES DE PAGO Y FINANCIAMIENTO TRANSPARENTE: COMPRA PRIMERO */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#1B4D3E]">
                        Transparencia Financiera: Valor de Venta y Modalidades
                      </span>
                      <span className="text-xs text-stone-500">
                        Porcentajes matemáticos e infraestructura integrada
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* 1. COMPRA DIRECTA CONTADO */}
                      <div className="rounded-2xl bg-[#FAF6F0] border-2 border-[#1B4D3E] p-4 relative shadow-sm">
                        <span className="bg-[#1B4D3E] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full absolute -top-2.5 left-4">
                          1. Propiedad Inmediata
                        </span>
                        <div className="text-[11px] font-black uppercase text-[#1B4D3E] mt-1">Compra / Venta Contado</div>
                        <div className="text-xl font-black text-[#1F1A17] mt-1">{fmtCLP(BUSINESS_TYPES[rubroPage].basePrice)} <span className="text-xs font-normal text-stone-500">+ IVA</span></div>
                        <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                          100% código propio en Bóveda Digital desde el Día 1. Sin ataduras ni cobros mensuales obligatorios.
                        </p>
                      </div>

                      {/* 2. LEASING DERECHO A COMPRA */}
                      <div className="rounded-2xl bg-white border border-stone-200 p-4">
                        <div className="text-[11px] font-black uppercase text-stone-500">2. Leasing (24 Cuotas)</div>
                        <div className="text-lg font-black text-[#1F1A17] mt-1">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.propiedad.monthly24)} <span className="text-xs font-normal text-stone-500">+ IVA/mes</span></div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                          (O 12 cuotas de {fmtCLP(BUSINESS_TYPES[rubroPage].prices.propiedad.monthly12)}/mes). Al terminar, es 100% tuyo a costo $0.
                        </p>
                      </div>

                      {/* 3. ARRIENDO PERPETUO (SAAS) */}
                      <div className="rounded-2xl bg-white border border-stone-200 p-4">
                        <div className="text-[11px] font-black uppercase text-stone-500">3. Arriendo Perpetuo (SaaS)</div>
                        <div className="text-lg font-black text-[#1F1A17] mt-1">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.arriendo.monthly)} <span className="text-xs font-normal text-stone-500">+ IVA/mes</span></div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                          + {fmtCLP(BUSINESS_TYPES[rubroPage].prices.arriendo.setup)} habilitación. Hosting, SSL y soporte continuo integrados.
                        </p>
                      </div>

                      {/* 4. SOCIO IMPULSA */}
                      <div className="rounded-2xl bg-white border border-stone-200 p-4">
                        <div className="text-[11px] font-black uppercase text-stone-500">4. Socio Tecnológico</div>
                        <div className="text-lg font-black text-[#1F1A17] mt-1">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.socio.baseMonthly)} <span className="text-xs font-normal text-stone-500">+ IVA/mes</span></div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                          {BUSINESS_TYPES[rubroPage].allowsRevShare ? `+ ${BUSINESS_TYPES[rubroPage].prices.socio.revShare}` : 'Solo cuota fija (0% comisión)'} con SEO profundo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => navigate('/impulsa-pyme', { state: { biz: rubroPage, tab: 'demos' } })}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F3E9D2] hover:bg-[#E8D8B5] text-[#5C3A1B] font-bold text-sm py-3.5 transition-colors cursor-pointer"
                    >
                      <MonitorPlay className="w-4 h-4" />
                      Ver Demo en Vivo
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/impulsa-pyme', { state: { biz: rubroPage, tab: 'simulador' } })}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold text-sm py-3.5 transition-colors cursor-pointer"
                    >
                      <Coffee className="w-4 h-4 text-[#E9C46A]" />
                      Armar mi Plan
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </main>
        )}

        {/* ===================================================================== */}
        {/* PESTAÑA 1: BIENVENIDA HUMANA Y RUBROS                                  */}
        {/* ===================================================================== */}
        {!rubroPage && activeTab === 'inicio' && (
          <main className="py-10 lg:py-14 space-y-16">
            {/* HERO EDITORIAL CÁLIDO Y EMPÁTICO */}
            <Container>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FFFDF9] p-6 sm:p-11 rounded-[32px] border border-[#E6DEC8] shadow-[0_20px_50px_rgba(44,37,32,0.05)] relative overflow-hidden">
                {/* Decoración orgánica cálida */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F5EBE0]/70 blur-3xl pointer-events-none" />

                <div className="lg:col-span-7 space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#F3E9D2] border border-[#E2CFA5] text-[#7C4D25] px-4 py-1.5 rounded-full text-xs font-bold">
                    <Coffee className="w-4 h-4 text-[#C85A32]" />
                    <span>Trato humano, sin letra chica ni tecnicismos enredados</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C85A32]">
                      Sabemos lo que cuesta levantar un negocio en Chile
                    </p>
                    <h1 className="font-human text-3xl sm:text-5xl text-[#1F1A17] leading-[1.12] font-semibold">
                      Tu negocio merece una casa digital{' '}
                      <span className="italic font-normal text-[#1B4D3E]">hecha con cariño</span>,{' '}
                      no una máquina fría que te deje solo.
                    </h1>
                  </div>

                  <p className="text-sm sm:text-base text-[#574C43] leading-relaxed max-w-2xl">
                    La mayoría de los emprendedores no tiene tiempo para aprender a programar ni millones de pesos para pagar una agencia tradicional. Por eso en <strong>Impulsa ProPyme</strong> hacemos las cosas a la antigua en el trato, y a la vanguardia en la tecnología: <strong>nos tomamos un café virtual de 15 minutos contigo, escuchamos tu historia, cargamos tus primeros productos nosotros mismos</strong> y caminamos a tu lado mes a mes.
                  </p>

                  {/* Carta / Promesa del Ejecutivo Asignado */}
                  <div className="bg-[#FAF6F0] rounded-2xl p-5 border-l-4 border-[#C85A32] space-y-2.5 text-xs sm:text-sm text-[#3D342C]">
                    <div className="font-human italic text-base sm:text-lg text-[#1F1A17] font-medium">
                      “Aquí nunca pagas a ciegas en una pasarela sin hablar antes con nosotros.”
                    </div>
                    <p className="text-xs sm:text-sm text-[#574C43] leading-relaxed">
                      Cada emprendedor tiene su propio <strong>Ejecutivo Asignado</strong>. Primero conversamos, vemos juntos qué necesita de verdad tu local, consulta o estudio, y recién cuando te sientas 100% tranquilo y en confianza, ponemos manos a la obra.
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] font-bold text-[#1B4D3E]">
                      <span>✓ Nosotros subimos tu catálogo inicial</span>
                      <span>✓ Panel “Modo Dueño” fácil en tu celular</span>
                      <span>✓ Desde $19.900/mes o 24 cuotas y es tuyo</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3.5 pt-1">
                    <button
                      type="button"
                      onClick={() => switchTab('demos')}
                      className="inline-flex items-center gap-2.5 rounded-2xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold px-6 py-4 text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      <MonitorPlay className="w-4 h-4 text-[#E9C46A]" />
                      Mirar cómo se vería tu negocio (Demos en Vivo)
                    </button>
                    <a
                      href={whatsappLink('¡Hola! Quisiera conversar 15 minutos con un ejecutivo de Impulsa ProPyme para que me oriente con mi negocio.')}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#FFFDF9] hover:bg-[#F3E9D2]/60 text-[#1F1A17] border-2 border-[#D8CBB8] font-bold px-6 py-4 text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      <Coffee className="w-4 h-4 text-[#C85A32]" />
                      Pedir un Café Virtual de 15 min (Gratis)
                    </a>
                  </div>
                </div>

                {/* Collage Humano Derecha (Retratos cálidos de oficios reales) */}
                <div className="lg:col-span-5 space-y-4 relative z-10">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[270px] sm:h-[310px]">
                    <img
                      src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1000&q=85"
                      alt="Dueña de negocio atendiendo con calidez"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17]/85 via-[#1F1A17]/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <span className="bg-[#E9C46A] text-[#1F1A17] font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                        Historias de Barrio y Oficio
                      </span>
                      <p className="font-human text-base sm:text-lg leading-snug">
                        “Yo sé hacer el mejor pan de mi barrio, no programar. Ellos me dejaron todo listo para recibir pedidos en mi WhatsApp.”
                      </p>
                    </div>
                  </div>

                  {/* Tarjeta del Ejecutivo Asignado */}
                  <div className="rounded-3xl bg-[#1B4D3E] text-[#F5EFE6] p-5 shadow-lg border border-[#2D6A4F] flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E9C46A] text-[#1B4D3E] flex items-center justify-center shrink-0 font-human font-bold text-lg">
                      🤝
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#E9C46A]">
                        Tu Propio Ejecutivo Asignado
                      </div>
                      <p className="text-[#F5EFE6]/90 leading-relaxed">
                        Nada de tickets eternos ni bots que no entienden. Tienes el WhatsApp directo de tu ejecutivo en Viña del Mar para ayudarte siempre.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* EL VIAJE HUMANO EN 3 PASOS SENCILLOS */}
            <Container>
              <div className="bg-[#F3ECE1] rounded-[28px] p-6 sm:p-9 border border-[#E2D6C1]">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#C85A32]">
                    Un proceso ameno, claro y sin estrés
                  </span>
                  <h2 className="font-human text-2xl sm:text-3xl text-[#1F1A17] mt-1 font-semibold">
                    ¿Cómo trabajamos contigo paso a paso?
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E6DEC8] space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#C85A32] bg-[#FCEEE8] px-3 py-1 rounded-full">
                      ☕ Paso 1 · Nos Conocemos
                    </div>
                    <h3 className="font-human text-lg font-semibold text-[#1F1A17]">
                      Conversamos 15 minutos sin ningún compromiso
                    </h3>
                    <p className="text-xs text-[#574C43] leading-relaxed">
                      Nos cuentas de tu negocio por teléfono o videollamada. Miramos juntos los ejemplos, resolvemos tus dudas en palabras simples y vemos qué plan te calza mejor.
                    </p>
                  </div>

                  <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E6DEC8] space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1B4D3E] bg-[#E3F2EA] px-3 py-1 rounded-full">
                      🎨 Paso 2 · Lo Armamos por Ti
                    </div>
                    <h3 className="font-human text-lg font-semibold text-[#1F1A17]">
                      Subimos tu logo, tus fotos y tu catálogo inicial
                    </h3>
                    <p className="text-xs text-[#574C43] leading-relaxed">
                      No tienes que pelearte con el computador. Nos mandas tus precios y fotos por WhatsApp y en 24 a 72 horas te entregamos tu portal funcionando con tu marca.
                    </p>
                  </div>

                  <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E6DEC8] space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#9A5B13] bg-[#FEF3C7] px-3 py-1 rounded-full">
                      🌱 Paso 3 · Caminamos Juntos
                    </div>
                    <h3 className="font-human text-lg font-semibold text-[#1F1A17]">
                      Cambias precios en 2 toques o nos pides ayuda
                    </h3>
                    <p className="text-xs text-[#574C43] leading-relaxed">
                      Tu web incluye un <strong>Modo Dueño ($0)</strong> en el celular tan fácil como usar WhatsApp. Y si prefieres no tocar nada, tu ejecutivo sube las ofertas por ti.
                    </p>
                  </div>
                </div>
              </div>
            </Container>

            {/* GRILLA CÁLIDA DE LOS 6 OFICIOS Y RUBROS */}
            <Container>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#C85A32]">
                    Hechos a la medida de cada oficio en Chile
                  </span>
                  <h2 className="font-human text-2xl sm:text-4xl text-[#1F1A17] mt-1 font-semibold">
                    Busca tu rubro y mira cómo cobrará vida tu negocio
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => switchTab('demos')}
                  className="text-xs font-extrabold text-[#1B4D3E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  Explorar el Laboratorio de Ejemplos en Vivo <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(Object.keys(BUSINESS_TYPES) as BusinessType[]).map((key) => {
                  const b = BUSINESS_TYPES[key];
                  return (
                    <div
                      key={key}
                      className="group rounded-[28px] bg-[#FFFDF9] border-2 border-[#E6DEC8] hover:border-[#1B4D3E] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <Link
                        to={`/impulsa-pyme/${key}`}
                        className="text-left block"
                      >
                        <div className="relative h-48 overflow-hidden bg-stone-200">
                          <img
                            src={b.image}
                            alt={b.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute top-3.5 left-3.5 bg-[#FFFDF9]/95 text-[#1F1A17] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs inline-flex items-center gap-1.5">
                            <span className="text-[#C85A32]">{b.icon}</span>
                            {b.tag}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-[#1B4D3E] text-[#F5EFE6] text-[11px] font-bold px-3 py-1 rounded-full shadow">
                            Compra: {fmtCLP(b.basePrice)} + IVA
                          </div>
                        </div>

                        <div className="p-6 pb-3 space-y-2">
                          <h3 className="font-human text-lg font-semibold text-[#1F1A17] leading-snug group-hover:text-[#1B4D3E] transition-colors">{b.name}</h3>
                          <p className="text-xs text-[#574C43] leading-relaxed">{b.subtitle}</p>

                          {/* Precios transparentes: Compra primero, luego alternativas */}
                          <div className="bg-[#FAF6F0] rounded-2xl border border-[#E6DEC8] p-3 space-y-1.5 my-2">
                            <div className="flex items-baseline justify-between">
                              <span className="text-[11px] font-black uppercase text-[#1B4D3E]">1. Compra / Venta:</span>
                              <span className="text-sm font-black text-[#1F1A17]">{fmtCLP(b.basePrice)} <span className="text-[10px] font-normal text-stone-500">+ IVA</span></span>
                            </div>
                            <div className="text-[10px] text-stone-600 flex justify-between border-t border-[#E6DEC8]/60 pt-1">
                              <span>2. Leasing (24 cuotas):</span>
                              <strong className="text-[#1F1A17]">{fmtCLP(b.prices.propiedad.monthly24)}/mes</strong>
                            </div>
                            <div className="text-[10px] text-stone-600 flex justify-between">
                              <span>3. Arriendo Perpetuo (SaaS):</span>
                              <strong className="text-[#1B4D3E]">{fmtCLP(b.prices.arriendo.monthly)}/mes</strong>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#8C7A6B] pt-1">
                            <strong>Pensado para:</strong> {b.examples}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C85A32] pt-1">
                            Ver todo lo que incluye y módulos extra <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>

                      <div className="px-6 pb-6 pt-3 grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => switchTab('demos', key)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#F3E9D2] hover:bg-[#E8D8B5] text-[#5C3A1B] font-bold text-xs py-3 px-3 transition-colors cursor-pointer"
                        >
                          <MonitorPlay className="w-3.5 h-3.5" />
                          Mirar Ejemplo
                        </button>
                        <button
                          type="button"
                          onClick={() => switchTab('simulador', key)}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold text-xs py-3 px-3 transition-colors cursor-pointer"
                        >
                          <Coffee className="w-3.5 h-3.5 text-[#E9C46A]" />
                          Armar mi Plan
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BLOQUE ESTRELLA: "¿TIENES UNA IDEA PERO NO TIENES UN SOCIO? PODEMOS SER TU SOCIO DIGITAL" */}
              <div className="mt-10 rounded-[32px] bg-gradient-to-br from-[#C85A32] via-[#B44B24] to-[#8F3717] text-white p-7 sm:p-10 shadow-xl border-2 border-[#E9C46A]/40 relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="inline-flex items-center gap-2 bg-[#E9C46A] text-[#1F1A17] text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      Incubadora & Co-Fundación Impulsa ProPyme
                    </div>
                    <h3 className="font-human text-2xl sm:text-4xl font-semibold leading-tight">
                      ¿Tienes una buena idea o un oficio potente, pero{' '}
                      <span className="italic font-normal text-[#FDE68A]">no tienes un socio</span>?
                      <span className="block mt-1">Háblanos… ¡Podemos ser tu Socio Digital!</span>
                    </h3>
                    <p className="text-xs sm:text-base text-orange-50/95 leading-relaxed max-w-3xl">
                      Muchas grandes ideas se quedan guardadas en un cajón por no tener un socio que sepa de tecnología, ventas por internet, pasarelas de pago y posicionamiento en Google. <strong>Tú pones el conocimiento del rubro, el producto o los contactos; nosotros ponemos toda la ingeniería digital, la formalización y el motor comercial.</strong>
                    </p>
                    <div className="flex flex-wrap gap-4 pt-1 text-xs font-bold text-[#FDE68A]">
                      <span>✓ Evaluamos tu idea en total confidencialidad</span>
                      <span>✓ Construimos la plataforma juntos</span>
                      <span>✓ Compartimos el riesgo y el crecimiento</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <a
                      href={whatsappLink('¡Hola equipo Impulsa ProPyme! Tengo una idea de negocio / proyecto y estoy buscando un Socio Digital para desarrollarla juntos. ¿Podemos agendar un café virtual para contársela?')}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FFFDF9] hover:bg-[#F3E9D2] text-[#1F1A17] font-extrabold text-xs sm:text-sm px-6 py-4 shadow-lg transition-all text-center"
                    >
                      <Coffee className="w-4 h-4 text-[#C85A32] shrink-0" />
                      Cuéntanos tu Idea (Hablar como Socios) →
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        handleSelectBiz('comercio');
                        setSelectedMod('socio');
                        switchTab('simulador');
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-black/25 hover:bg-black/35 border border-white/30 text-white font-bold text-xs px-5 py-3 transition-all cursor-pointer"
                    >
                      Ver cómo funciona el modelo Socio a % Ventas →
                    </button>
                  </div>
                </div>
              </div>

              {/* LAS 2 HERRAMIENTAS GRATUITAS SEPARADAS (ESCÁNER WEB vs AUDIT-693 OPERACIONAL) */}
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {/* 1. Escáner de Páginas Web */}
                <div className="rounded-3xl bg-[#26211D] text-[#F5EFE6] p-7 border border-[#3D342C] flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#E9C46A] text-[#1F1A17] text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                      Regalo 1 · Escáner Técnico Web
                    </span>
                    <h3 className="font-human text-xl font-semibold">
                      ¿Ya tienes una página web, pero sientes que no te trae clientes?
                    </h3>
                    <p className="text-xs text-[#D6CBBF] leading-relaxed">
                      Revisa gratis tu página actual en 30 segundos y te mostramos en lenguaje sencillo por qué se ve lenta en celulares o por qué no aparece en Google.
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/paginas-web"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F3E9D2] text-[#1F1A17] font-bold text-xs px-5 py-3 transition-all"
                    >
                      Revisar mi Página Actual Gratis →
                    </Link>
                  </div>
                </div>

                {/* 2. Audit-693 (Diagnóstico de Fugas Operacionales) */}
                <div className="rounded-3xl bg-[#1B4D3E] text-[#F5EFE6] p-7 border border-[#2D6A4F] flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#E9C46A] text-[#1B4D3E] text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                      Regalo 2 · Diagnóstico de Tiempo y Orden
                    </span>
                    <h3 className="font-human text-xl font-semibold">
                      ¿Sientes que se te va la vida anotando pedidos en cuadernos o planillas?
                    </h3>
                    <p className="text-xs text-[#F5EFE6]/90 leading-relaxed">
                      Usa nuestra calculadora <strong>Audit-693</strong> para descubrir cuántas horas y plata puedes ahorrar al mes ordenando tu negocio.
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/audit-693"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#E9C46A] hover:bg-[#F4A261] text-[#1F1A17] font-bold text-xs px-5 py-3 transition-all"
                    >
                      Hacer Diagnóstico de mi Negocio →
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </main>
        )}

        {/* ===================================================================== */}
        {/* PESTAÑA 2: GALERÍA DE DEMOS EN VIVO (INTERACTIVA POR RUBRO)            */}
        {/* ===================================================================== */}
        {!rubroPage && activeTab === 'demos' && (
          <main className="py-10 lg:py-12">
            <Container>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-[#F3E9D2] text-[#7C4D25] text-xs font-bold px-3.5 py-1 rounded-full">
                    <MonitorPlay className="w-3.5 h-3.5 text-[#C85A32]" />
                    Vitrina de Ejemplos Interactivos + Panel “Modo Dueño”
                  </span>
                  <h1 className="font-human text-2xl sm:text-4xl font-semibold text-[#1F1A17] mt-2">
                    Explora cómo se verá tu negocio y prueba el botón{' '}
                    <span className="italic font-normal text-[#1B4D3E]">“Modo Dueño”</span>
                  </h1>
                  <p className="text-sm text-[#574C43] mt-1">
                    Elige tu rubro abajo. Dentro de cada ejemplo verás abajo a la izquierda el botón <strong>🔐 Modo Dueño ($0)</strong> para que pruebes cómo cambias precios u ofertas en vivo:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => switchTab('simulador')}
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-bold text-xs sm:text-sm px-5 py-3 shadow-sm cursor-pointer"
                >
                  Armar mi Plan con este Ejemplo <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Selector de Rubro de la Demo */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
                {(Object.keys(BUSINESS_TYPES) as BusinessType[]).map((key) => {
                  const b = BUSINESS_TYPES[key];
                  const active = selectedBiz === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedBiz(key)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B4D3E] bg-[#1B4D3E] text-white shadow-md'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className={active ? 'text-[#E9C46A]' : 'text-[#1B4D3E]'}>{b.icon}</div>
                      <div className="font-black text-xs mt-1.5 leading-tight">{b.tag}</div>
                    </button>
                  );
                })}
              </div>

              {/* VENTANA DE DEMO INTERACTIVA MULTI-DISPOSITIVO (SET 3D: PC + TABLET + CELULAR) */}
              <div className="space-y-4 mb-4">
                <div className="bg-[#F3E9D2] border-2 border-[#E2CFA5] rounded-2xl px-4 sm:px-6 py-2.5 text-xs text-[#7C4D25] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-base">⚠️</span>
                    <span>
                      <strong>Nota para clientes:</strong> Esto es una <u>demo funcional en vivo</u>. Tu sitio final se personalizará al 100% con tu logo, tus colores, tu nombre real, tus propios productos/fotos y tus textos de marca.
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#7C4D25] text-white px-2 py-0.5 rounded shrink-0">
                    Chasis Base Demo
                  </span>
                </div>

                <MultiDeviceMockup
                  demoUrl={currentBiz.demoUrl}
                  title={currentBiz.name}
                  tag={currentBiz.tag}
                  rubroId={currentBiz.id}
                />

                {/* Barra inferior rápida de acción sobre la plantilla */}
                <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm text-stone-700">
                    <span className="font-black text-[#1F1A17]">{currentBiz.name}:</span>{' '}
                    {currentBiz.subtitle} · Incluye carga inicial de tu catálogo y configuración lista para vender.
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    <a
                      href={currentBiz.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border-2 border-stone-300 bg-white hover:bg-stone-100 text-[#1F1A17] font-black px-4 py-2.5 text-xs transition-all"
                    >
                      Abrir en Pestaña Nueva ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => switchTab('simulador', selectedBiz)}
                      className="rounded-xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-black px-5 py-2.5 text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
                    >
                      ¡Quiero un Sitio Así! Simular Cuota (Desde {fmtCLP(currentBiz.prices.arriendo.monthly)}/mes) →
                    </button>
                  </div>
                </div>
              </div>

              {/* INCLUIDO EN LA BASE VS QUÉ PUEDES SUMARLE: EL PRECIO ES UN PISO, NO UN TECHO */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border-2 border-[#E6DEC8] p-6">
                  <div className="inline-flex items-center gap-2 bg-[#E3F2EA] text-[#1B4D3E] text-xs font-black px-3 py-1 rounded-full uppercase mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Incluido desde {fmtCLP(currentBiz.prices.arriendo.monthly)}/mes
                  </div>
                  <ul className="space-y-2.5 text-sm text-stone-700">
                    {currentBiz.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1B4D3E] mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FFFDF9] rounded-3xl border-2 border-dashed border-[#E2CFA5] p-6">
                  <div className="inline-flex items-center gap-2 bg-[#F3E9D2] text-[#7C4D25] text-xs font-black px-3 py-1 rounded-full uppercase mb-3">
                    <Plus className="w-3.5 h-3.5" />
                    Lo puedes personalizar sumando esto
                  </div>
                  <p className="text-xs text-stone-500 mb-3">
                    El precio base es un piso, no un techo: casi cualquier negocio de este rubro puede agregar módulos extra sin cambiar de plataforma.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {currentBiz.addons.map((a, i) => (
                      <li key={i} className="flex items-start justify-between gap-3 border-b border-[#E6DEC8] last:border-0 pb-2.5 last:pb-0">
                        <div>
                          <div className="font-bold text-[#1F1A17]">{a.name}</div>
                          <div className="text-xs text-stone-500">{a.desc}</div>
                        </div>
                        <span className="shrink-0 text-xs font-black text-[#C85A32] whitespace-nowrap">{a.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </main>
        )}

        {/* ===================================================================== */}
        {/* PESTAÑA 3: LAS 3 MODALIDADES + TABLA + EMPRESA EN UN DÍA              */}
        {/* ===================================================================== */}
        {!rubroPage && activeTab === 'modalidades' && (
          <main className="py-10 lg:py-14 space-y-12">
            <Container>
              <div className="max-w-3xl mx-auto text-center space-y-2 mb-8">
                <span className="inline-block bg-[#E3F2EA] text-[#1B4D3E] text-xs font-black px-3.5 py-1 rounded-full uppercase">
                  Transparencia Financiera Sin Letra Chica
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-[#1F1A17]">
                  Valor de Compra Contado y Modalidades de Financiamiento
                </h1>
                <p className="text-stone-600 text-sm sm:text-base">
                  En cada proyecto mostramos primero el <strong>Valor Real de Compra (Propiedad 100% desde el Día 1)</strong> y luego 3 modalidades flexibles para que financies sin descapitalizar tu empresa:
                </p>
              </div>

              {/* BANNER DESTACADO: COMPRA CONTADO LLAVE EN MANO */}
              <div className="bg-[#FAF6F0] rounded-3xl border-3 border-[#1B4D3E] p-6 sm:p-8 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl text-left">
                  <div className="inline-flex items-center gap-2 bg-[#1B4D3E] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    👑 Modalidad Principal · Soberanía Digital Inmediata
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1F1A17]">
                    Compra Directa Llave en Mano (100% Código Propio en Bóveda Digital)
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Si tu empresa cuenta con liquidez y prefiere capitalizar el activo de inmediato, adquieres la plataforma al contado. Te entregamos el repositorio en GitHub, la base de datos exclusiva, la configuración del servidor cloud dedicado y el traspaso del dominio .CL a tu RUT en NIC Chile a costo $0. Cero cobros mensuales obligatorios.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-[#1B4D3E]">
                    <span>✓ Almacén / Catálogo: $450.000 + IVA</span>
                    <span>✓ Campus Moodle OTEC / Gastronomía: $600.000 + IVA</span>
                    <span>✓ E-Commerce / Gestión: $800.000 - $850.000 + IVA</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMod('compra');
                    switchTab('simulador');
                  }}
                  className="shrink-0 rounded-2xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-black text-xs sm:text-sm px-6 py-4 shadow-md transition-all cursor-pointer"
                >
                  Simular Compra Contado →
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* OPCIÓN 1 */}
                <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="bg-[#F3ECE1] text-[#5C3A1B] text-xs font-black px-3 py-1 rounded-full uppercase inline-block">
                      Opción 1 · Cuota Más Liviana
                    </span>
                    <h3 className="text-xl font-black text-[#1F1A17]">
                      Suscripción Mensual Accesible
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Nosotros hacemos la carga inicial y te entregamos un <strong>panel autoadministrable súper fácil</strong> para que subas ofertas o cambies precios tú mismo cuando quieras.
                    </p>
                    <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>Habilitación + Carga inicial:</span>
                        <span className="font-black">Desde $35.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Servidor + Continuidad 24/7:</span>
                        <span className="font-black text-[#5C3A1B]">Desde $19.900 / mes</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-1.5">
                        <span>Posicionamiento en Google:</span>
                        <span className="font-black text-[#1B4D3E]">SEO Técnico Base ($0)</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-1.5 text-[11px] text-stone-600">
                        <span>Modalidad de cobro:</span>
                        <span className="font-bold text-[#1F1A17]">PAT / Débito Automático</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMod('arriendo');
                      switchTab('simulador');
                    }}
                    className="mt-5 w-full rounded-xl bg-[#2C2520] hover:bg-[#1F1A17] text-white font-extrabold py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Simular Suscripción Accesible →
                  </button>
                </div>

                {/* OPCIÓN 2 */}
                <div className="bg-white rounded-3xl border-3 border-[#1B4D3E] p-6 shadow-xl flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-6 bg-[#1B4D3E] text-white text-[10px] font-black uppercase px-3.5 py-0.5 rounded-full">
                    ★ Tu Propio Activo en 24 Cuotas
                  </div>
                  <div className="space-y-3">
                    <span className="bg-[#E3F2EA] text-[#1B4D3E] text-xs font-black px-3 py-1 rounded-full uppercase inline-block">
                      Opción 2 · Derecho a Compra
                    </span>
                    <h3 className="text-xl font-black text-[#1F1A17]">
                      Arriendo con Derecho a Compra (24m)
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Pagas 24 cuotas fijas (con SEO Técnico Base + 1 ajuste asistido al mes) y <strong>al cumplir el mes 24 el software pasa a ser 100% propiedad tuya a costo $0</strong>.
                    </p>
                    <div className="bg-[#E3F2EA] rounded-2xl p-3.5 border border-[#2D6A4F] space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>Habilitación + Carga inicial:</span>
                        <span className="font-black">Desde $29.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>24 cuotas fijas (PAT/Débito):</span>
                        <span className="font-black text-[#1B4D3E]">Desde $29.900 / mes</span>
                      </div>
                      <div className="flex justify-between border-t border-[#2D6A4F] pt-1.5 font-bold text-[#1B4D3E]">
                        <span>Al mes 25 (Ya eres dueño):</span>
                        <span>Desde $14.900 / mes servidor</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMod('propiedad');
                      switchTab('simulador');
                    }}
                    className="mt-5 w-full rounded-xl bg-[#1B4D3E] hover:bg-[#143B2F] text-white font-extrabold py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Simular con Derecho a Compra →
                  </button>
                </div>

                {/* OPCIÓN 3 */}
                <div className="bg-white rounded-3xl border-2 border-[#C85A32] p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="bg-[#FCEEE8] text-[#C85A32] text-xs font-black px-3 py-1 rounded-full uppercase inline-block">
                      Opción 3 · Exclusivo Pago Online + SEO Profundo
                    </span>
                    <h3 className="text-xl font-black text-[#1F1A17]">
                      Alianza Socio Impulsa (% Ventas)
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Exclusivo para negocios con <strong>cobro 100% por pasarela online</strong>. Como ganamos un % cuando tú vendes, <strong>te incluimos SEO Profundo de Conversión sin costo extra</strong> para multiplicar tus ventas.
                    </p>
                    <div className="bg-[#FFFDF9] rounded-2xl p-3.5 border border-[#E2CFA5] space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>Habilitación inicial:</span>
                        <span className="font-black">Desde $45.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Piso mensual servidor:</span>
                        <span className="font-black">Desde $22.900 / mes</span>
                      </div>
                      <div className="flex justify-between border-t border-[#E2CFA5] pt-1.5 font-bold text-[#1B4D3E]">
                        <span>SEO Profundo Conversión:</span>
                        <span>INCLUIDO ($0 extra)</span>
                      </div>
                      <div className="flex justify-between border-t border-[#E2CFA5] pt-1.5 font-bold text-[#8F3717]">
                        <span>Liquidación vía pasarela:</span>
                        <span>5% a 7% automatizado</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectBiz('comercio');
                      setSelectedMod('socio');
                      switchTab('simulador');
                    }}
                    className="mt-5 w-full rounded-xl bg-[#7C4D25] hover:bg-[#5C3A1B] text-white font-extrabold py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Simular Alianza Socio →
                  </button>
                </div>
              </div>

              {/* TABLA COMPARATIVA DE TARIFAS Y MATRIZ MATEMÁTICA */}
              <div className="mt-12 bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="max-w-2xl space-y-2">
                  <span className="bg-[#E3F2EA] text-[#1B4D3E] text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    Transparencia Financiera Sin Letra Chica
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1F1A17]">
                    Tarifas Basadas en Porcentajes Reales e Infraestructura Integrada
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Para que los modelos de arriendo y leasing sean financieramente viables y no terminen costándote dinero, los costos obligatorios de <strong>Hosting, Dominio .CL, Certificado SSL y Soporte Continuo</strong> están completamente integrados en la tarifa mensual sin cobros sorpresa.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-stone-200 bg-stone-50">
                        <th className="py-3 px-4 font-black text-[#1F1A17]">Valor de Lista del Producto</th>
                        <th className="py-3 px-4 font-black text-[#1B4D3E]">Modelo 1: Arriendo Perpetuo (SaaS)</th>
                        <th className="py-3 px-4 font-black text-[#1B4D3E]">Modelo 2: Leasing (12 meses)</th>
                        <th className="py-3 px-4 font-black text-[#1B4D3E]">Modelo 3: Leasing (24 meses)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-150">
                      <tr className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1A17]">
                          $150.000 <span className="text-xs text-stone-500 font-normal">(Starter)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$15.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(Piso mínimo aplicado)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$22.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(Incluye hosting año 1)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$14.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(Incluye hosting años 1 y 2)</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-stone-50/60 transition-colors bg-[#E3F2EA]/30 border-l-4 border-[#1B4D3E]">
                        <td className="py-3.5 px-4 font-bold text-[#1F1A17]">
                          $600.000 <span className="text-xs text-[#1B4D3E] font-bold block">(Campus Moodle OTEC / Gastronomía)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$45.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(Hosting VPS dedicado inc.)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$69.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(~11.5% del valor base)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$39.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(~6.5% del valor base)</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1A17]">
                          $1.000.000 <span className="text-xs text-stone-500 font-normal">(Web Pro / E-Commerce Avanzado)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$45.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(4.5% del valor base)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$115.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(~11.5% del valor)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$65.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(~6.5% del valor)</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1F1A17]">
                          $5.000.000 <span className="text-xs text-stone-500 font-normal">(Software a Medida)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$200.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(4% del valor base)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$550.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(11% del valor)</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="text-[#1F1A17]">$300.000 / mes</strong>
                          <span className="block text-[11px] text-stone-500">(6% del valor)</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div className="space-y-1">
                    <strong className="text-[#1F1A17] block flex items-center gap-1.5">
                      <span>🔑</span> Garantía de Soberanía Post-Leasing:
                    </strong>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Al pagar la última cuota (mes 12 o 24) eres dueño absoluto del código. Si decides quedarte en nuestra infraestructura, solo abonas la renovación anual de hosting y dominio ($90.000/año / ~$7.500/mes), o retiras tus llaves maestras en Bóveda Digital a costo $0.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#1F1A17] block flex items-center gap-1.5">
                      <span>🛡️</span> Administración del Dominio:
                    </strong>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      Durante el arriendo/leasing, el dominio es administrado por UNIVERSO693 para garantizar la continuidad técnica y cumplimiento. Al concluir el período, se traspasa el contacto titular en NIC Chile / registrador directamente al RUT de tu empresa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque Empresa en un Día */}
              <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#1B4D3E] via-[#143B2F] to-[#1B4D3E] text-white p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="bg-[#E9C46A] text-[#143B2F] text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    🪪 Setup Administrativo Formalización + Digitalización
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    ¿Aún no tienes tu empresa creada? Te ayudamos con “Empresa en un Día”
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F5EFE6] leading-relaxed">
                    Te acompañamos paso a paso en videollamada a constituir tu <strong>SpA o EIRL</strong>, activar tu <strong>e-RUT e inicio de actividades en el SII</strong>, inscribir tu dominio <strong>.CL en NIC Chile</strong> y habilitar tu cuenta <strong>Webpay / MercadoPago / Flow</strong>. Valor Convenio preferencial de <strong>+$19.900 CLP</strong> en el plan de 24 cuotas (o +$39.000 en otros planes; tasas externas directas de firma notarial ~$9.000 y NIC.cl $9.950 se abonan directo a tu RUT).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIncludeFormalizacion(true);
                    switchTab('simulador');
                  }}
                  className="shrink-0 rounded-xl bg-[#E9C46A] hover:bg-[#F4A261] text-[#143B2F] font-black text-xs sm:text-sm px-6 py-4 shadow-md cursor-pointer"
                >
                  Incluir Empresa en un Día en mi Simulación →
                </button>
              </div>

              {/* Bloque Socio Digital en Pestaña 3 */}
              <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#C85A32] via-[#B44B24] to-[#8F3717] text-white p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="bg-[#E9C46A] text-[#1F1A17] text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    💡 ¿Tienes una idea potente pero estás solo?
                  </span>
                  <h3 className="font-human text-xl sm:text-2xl font-semibold">
                    ¿Tienes una idea pero no tienes un socio? Háblanos… ¡Podemos ser tu Socio Digital!
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-50/95 leading-relaxed">
                    Tú pones el oficio, el producto o los contactos; nosotros ponemos toda la ingeniería tecnológica, las pasarelas de pago y el posicionamiento SEO profundo en Google para levantar el negocio juntos.
                  </p>
                </div>
                <a
                  href={whatsappLink('¡Hola! Tengo una idea de negocio pero no tengo socio tecnológico. Me gustaría conversar con ustedes para ver si pueden ser mi Socio Digital.')}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-xl bg-[#FFFDF9] hover:bg-[#F3E9D2] text-[#1F1A17] font-black text-xs sm:text-sm px-6 py-4 shadow-md"
                >
                  ☕ Contarnos tu Idea por WhatsApp →
                </a>
              </div>
            </Container>
          </main>
        )}

        {/* ===================================================================== */}
        {/* PESTAÑA 4: SIMULADOR INTERACTIVO EN VIVO                              */}
        {/* ===================================================================== */}
        {!rubroPage && activeTab === 'simulador' && (
          <main className="py-10 lg:py-12">
            <Container>
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Controles Izquierda */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-black text-base sm:text-lg text-[#1F1A17]">
                        1. Selecciona el rubro de tu negocio:
                      </h2>
                      <button
                        type="button"
                        onClick={() => switchTab('demos', selectedBiz)}
                        className="text-xs font-extrabold text-[#1B4D3E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <MonitorPlay className="w-3.5 h-3.5" /> Ver Demo de este rubro
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {(Object.keys(BUSINESS_TYPES) as BusinessType[]).map((key) => {
                        const item = BUSINESS_TYPES[key];
                        const active = selectedBiz === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleSelectBiz(key)}
                            className={`text-left rounded-2xl p-3 border-2 transition-all cursor-pointer ${
                              active
                                ? 'border-[#1B4D3E] bg-[#E3F2EA]'
                                : 'border-stone-200 bg-white hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-extrabold text-xs text-[#1F1A17]">
                              <span className={active ? 'text-[#1B4D3E]' : 'text-stone-500'}>{item.icon}</span>
                              <span>{item.tag}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-1">{item.name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 space-y-4">
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider block">Valor de Adquisición (Precio Lista Contado):</span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-2xl font-black text-[#1F1A17]">{fmtCLP(currentBiz.basePrice)} CLP</span>
                          <span className="text-[11px] text-stone-500 font-medium">(100% código propio en Bóveda Digital)</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right text-[11px] text-stone-600 bg-white sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-stone-200">
                        <span className="font-bold text-[#1B4D3E]">✓ Tarifas Transparentes:</span> % real e infraestructura integrada (hosting + SSL + soporte).
                      </div>
                    </div>

                    <h2 className="font-black text-base sm:text-lg text-[#1F1A17]">
                      2. Elige modalidad de adquisición o financiamiento:
                    </h2>

                    {/* Opción 1: Compra Contado Llave en Mano */}
                    <button
                      type="button"
                      onClick={() => setSelectedMod('compra')}
                      className={`w-full text-left rounded-2xl p-4 border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        selectedMod === 'compra' ? 'border-[#1B4D3E] bg-[#E3F2EA] shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase bg-[#1B4D3E] text-white px-2 py-0.5 rounded-full">
                            1. Propiedad Inmediata
                          </span>
                          <span className="text-xs sm:text-sm font-black text-[#1F1A17]">Compra Contado Llave en Mano</span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-1">
                          Código fuente completo, servidor dedicado y llaves maestras en Bóveda Digital. 0% pagos mensuales obligatorios.
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-xl font-black text-[#1F1A17]">{fmtCLP(currentBiz.basePrice)}</span>
                        <span className="block text-[10px] text-stone-500 font-bold">+ IVA (Pago único)</span>
                      </div>
                    </button>

                    <div className="text-xs font-bold text-stone-500 pt-1">
                      O financia tu plataforma en cuotas mensuales con infraestructura integrada:
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedMod('propiedad')}
                        className={`text-left rounded-2xl p-3.5 border-2 transition-all cursor-pointer ${
                          selectedMod === 'propiedad' ? 'border-[#1B4D3E] bg-[#E3F2EA]' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-[#1B4D3E] block">2. Derecho a Compra</span>
                        <strong className="text-xs sm:text-sm font-black text-[#1F1A17] block">Leasing (12 o 24m)</strong>
                        <span className="text-[10px] text-stone-500 block mt-0.5">Al terminar es 100% tuyo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMod('arriendo')}
                        className={`text-left rounded-2xl p-3.5 border-2 transition-all cursor-pointer ${
                          selectedMod === 'arriendo' ? 'border-[#1B4D3E] bg-[#E3F2EA]' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-[#1B4D3E] block">3. Cuota Más Liviana</span>
                        <strong className="text-xs sm:text-sm font-black text-[#1F1A17] block">Arriendo Perpetuo (SaaS)</strong>
                        <span className="text-[10px] text-stone-500 block mt-0.5">~4.5% del valor / mes</span>
                      </button>

                      <button
                        type="button"
                        disabled={!currentBiz.allowsRevShare}
                        onClick={() => currentBiz.allowsRevShare && setSelectedMod('socio')}
                        className={`text-left rounded-2xl p-3.5 border-2 transition-all ${
                          !currentBiz.allowsRevShare
                            ? 'border-stone-200 bg-stone-100 opacity-60 cursor-not-allowed'
                            : selectedMod === 'socio'
                            ? 'border-[#C85A32] bg-[#FCEEE8] cursor-pointer'
                            : 'border-stone-200 bg-white cursor-pointer'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-[#C85A32] block">
                          {currentBiz.allowsRevShare ? '4. SEO Profundo Incluido' : '4. Solo Cobro Webpay'}
                        </span>
                        <strong className="text-xs sm:text-sm font-black text-[#1F1A17] block">Socio a % Ventas</strong>
                        <span className="text-[10px] text-stone-500 block mt-0.5">Base reducida + rev-share</span>
                      </button>
                    </div>

                    {selectedMod === 'compra' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                            <span>Inversión Setup Llave en Mano:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.basePrice)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} pago único</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-[#F5EFE6] font-bold">Total Inversión de Compra:</span>
                            <span className="font-black text-xl text-[#E9C46A]">
                              {fmtCLP(currentBiz.basePrice + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-[#E9DFC9]">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                              <span>Cuota Mensual Obligatoria:</span>
                              <span className="font-black text-white">$0 CLP / mes</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            {includeGoogleAds && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>📈 + Evaluación Google Ads & SEO Local:</span>
                                <span>En reunión con Ejecutivo ($0)</span>
                              </div>
                            )}
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-[#F5EFE6] text-sm font-bold">Total Cuota Recurrente:</span>
                              <div className="text-right">
                                <span className="text-2xl font-black text-[#E9C46A]">
                                  {fmtCLP(totalMonthlyAddons)}
                                </span>
                                <span className="block text-[11px] text-[#E9DFC9]">
                                  {totalMonthlyAddons > 0 ? '+ IVA/mes (Opcionales contratados)' : '0% pagos mensuales obligatorios'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#143B2F] rounded-2xl p-3.5 border border-[#E9C46A]/30 text-xs text-[#F5EFE6] leading-relaxed">
                          🛡️ <strong>Propiedad 100% Inmediata:</strong> Al contratar en Compra Contado, se te entrega de inmediato el repositorio en GitHub, la base de datos completa y las credenciales maestras en Bóveda Digital (0% dependencias con el proveedor).
                        </div>
                      </div>
                    )}

                    {selectedMod === 'propiedad' && (
                      <div className="bg-[#E3F2EA] rounded-2xl p-3.5 border border-[#1B4D3E]/30 space-y-2 mt-2">
                        <div className="flex items-center justify-between text-xs font-bold text-[#1B4D3E]">
                          <span>Elige el plazo del Leasing:</span>
                          <span className="text-[11px] bg-white px-2.5 py-0.5 rounded-full text-[#143B2F] font-black shadow-xs">
                            {leasingMonths === 12 ? '12 Cuotas (~11.5%/mes)' : '24 Cuotas (~6.5%/mes)'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setLeasingMonths(12)}
                            className={`p-3 rounded-xl text-xs font-black transition-all cursor-pointer text-left ${
                              leasingMonths === 12
                                ? 'bg-[#1B4D3E] text-white shadow-sm'
                                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>12 Meses (1 Año)</span>
                              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">~11.5%</span>
                            </div>
                            <div className="text-sm font-black mt-1">{fmtCLP(currentBiz.prices.propiedad.monthly12)}/mes</div>
                            <div className="text-[10px] font-normal opacity-85 mt-0.5">Incluye hosting y servidor año 1</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setLeasingMonths(24)}
                            className={`p-3 rounded-xl text-xs font-black transition-all cursor-pointer text-left ${
                              leasingMonths === 24
                                ? 'bg-[#1B4D3E] text-white shadow-sm'
                                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>24 Meses (2 Años)</span>
                              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">~6.5%</span>
                            </div>
                            <div className="text-sm font-black mt-1">{fmtCLP(currentBiz.prices.propiedad.monthly24)}/mes</div>
                            <div className="text-[10px] font-normal opacity-85 mt-0.5">Incluye hosting años 1 y 2</div>
                          </button>
                        </div>
                      </div>
                    )}
                    {!currentBiz.allowsRevShare && (
                      <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                        💡 En rubros donde el cliente paga directamente en tu local o por transferencia (<strong>{currentBiz.tag}</strong>), operamos con <strong>Cuota Fija Mensual y 0% de comisión por venta</strong> para que todo lo que vendas sea 100% tuyo sin auditorías de caja.
                      </p>
                    )}
                  </div>

                  {/* Paso 3A: Empresa en un Día */}
                  <div
                    onClick={() => setIncludeFormalizacion(!includeFormalizacion)}
                    className={`rounded-3xl p-5 border-2 transition-all cursor-pointer ${
                      includeFormalizacion ? 'border-[#1B4D3E] bg-[#E3F2EA]' : 'border-[#E2CFA5] bg-[#FFFDF9]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={includeFormalizacion}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 accent-[#1B4D3E] rounded cursor-pointer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase bg-[#1B4D3E] text-white px-2 py-0.5 rounded-full">
                            Opcional 1 · Setup Administrativo
                          </span>
                          <span className="text-xs font-extrabold text-[#1B4D3E]">
                            {selectedMod === 'propiedad'
                              ? '🎁 Valor Convenio 24m: +$19.900 CLP (Normal $39.000)'
                              : '+$39.000 CLP pago único'}
                          </span>
                        </div>
                        <h3 className="font-black text-sm text-[#1F1A17] mt-1">
                          🪪 Acompañamiento “Empresa en un Día” (SpA/EIRL) + e-RUT SII + NIC.cl + Apertura Webpay
                        </h3>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Hacemos todo el trámite contigo en videollamada para que quedes facturando legalmente. (Tasas directas de firma notarial ~$9.000 y NIC.cl $9.950 se abonan directo a tu RUT).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Paso 3B: Bolsa Asistente Digital Mensual (Filtro Anti-Cliente Cacho) */}
                  <div
                    onClick={() => setIncludeAsistente(!includeAsistente)}
                    className={`rounded-3xl p-5 border-2 transition-all cursor-pointer ${
                      includeAsistente ? 'border-[#1B4D3E] bg-[#E3F2EA]' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={includeAsistente}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 accent-[#1B4D3E] rounded cursor-pointer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase bg-[#7C4D25] text-white px-2 py-0.5 rounded-full">
                            Opcional 2 · Delega la Carga Mensual
                          </span>
                          <span className="text-xs font-extrabold text-[#7C4D25]">+$14.900 + IVA / mes</span>
                        </div>
                        <h3 className="font-black text-sm text-[#1F1A17] mt-1">
                          🛠️ Bolsa “Asistente Digital”: Nosotros subimos tus nuevas ofertas, fotos y cambios de precios
                        </h3>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Tu plataforma ya incluye un <strong>panel autoadministrable gratis ($0)</strong> para que edites tus precios cuando quieras. Activa esta bolsa solo si prefieres mandarnos un audio por WhatsApp y que nuestro equipo haga hasta 3 actualizaciones de catálogo al mes por ti.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Paso 3C: SEO Profundo & Motor Google Ads (Diferenciado entre Socio % vs Cuota Fija) */}
                  {selectedMod === 'socio' ? (
                    <div className="rounded-3xl p-5 border-2 border-[#1B4D3E] bg-[#E3F2EA]">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-[#1B4D3E] shrink-0 mt-0.5" />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-[#1B4D3E] text-white px-2.5 py-0.5 rounded-full">
                              Beneficio Exclusivo Socio Impulsa
                            </span>
                            <span className="text-xs font-extrabold text-[#1B4D3E]">
                              🔥 INCLUIDO ($0 costo fijo extra)
                            </span>
                          </div>
                          <h3 className="font-black text-sm text-[#1F1A17] mt-1">
                            📈 SEO Profundo de Conversión + Posicionamiento Activo en Google Incluido
                          </h3>
                          <p className="text-[11px] text-stone-700 mt-0.5">
                            Como en esta modalidad nosotros ganamos un porcentaje solo cuando tú vendes por la pasarela, <strong>invertimos nuestro trabajo de SEO Profundo, arquitectura de palabras clave y optimización de conversión sin cobrarte mensualidad extra</strong>, porque nos conviene a ambos que vendas el máximo posible.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIncludeGoogleAds(!includeGoogleAds)}
                      className={`rounded-3xl p-5 border-2 transition-all cursor-pointer ${
                        includeGoogleAds ? 'border-[#1B4D3E] bg-[#E3F2EA]' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={includeGoogleAds}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 accent-[#1B4D3E] rounded cursor-pointer"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-[#7C4D25] text-white px-2 py-0.5 rounded-full">
                              Opcional 3 · Evaluación con tu Ejecutivo
                            </span>
                            <span className="text-xs font-extrabold text-[#7C4D25]">
                              A medida según tu rubro y comuna (Diagnóstico $0)
                            </span>
                          </div>
                          <h3 className="font-black text-sm text-[#1F1A17] mt-1">
                            📈 Quiero evaluar Campaña Google Ads + SEO Local Avanzado en la reunión previa
                          </h3>
                          <p className="text-[11px] text-stone-600 mt-0.5">
                            Tu plan ya incluye <strong>SEO Técnico Básico ($0)</strong>. No ponemos tarifas a ciegas para publicidad: marca esta casilla y en nuestra reunión previa tu Ejecutivo revisará contigo cuánto cobra Google hoy por clic en tu rubro y ciudad para armar un plan que te sea rentable.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Resumen Derecha */}
                <div className="lg:col-span-5">
                  <div className="rounded-3xl bg-[#1B4D3E] text-white p-6 sm:p-7 shadow-2xl border-4 border-[#E3F2EA] space-y-5">
                    <div className="border-b border-white/15 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="bg-[#E9C46A] text-[#143B2F] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          RESUMEN DE TU SIMULACIÓN
                        </span>
                        <span className="text-xs text-[#E9DFC9] font-bold">
                          Lista: {fmtCLP(currentBiz.basePrice)}
                        </span>
                      </div>
                      <h3 className="text-lg font-black mt-1.5 leading-snug">{currentBiz.name}</h3>
                    </div>

                    {selectedMod === 'compra' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                            <span>Inversión Setup Llave en Mano:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.basePrice)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} pago único</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-[#F5EFE6] font-bold">Total Inversión de Compra:</span>
                            <span className="font-black text-xl text-[#E9C46A]">
                              {fmtCLP(currentBiz.basePrice + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-[#E9DFC9]">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                              <span>Cuota Mensual Obligatoria:</span>
                              <span className="font-black text-white">$0 CLP / mes</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            {includeGoogleAds && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>📈 + Evaluación Google Ads & SEO Local:</span>
                                <span>En reunión con Ejecutivo ($0)</span>
                              </div>
                            )}
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-[#F5EFE6] text-sm font-bold">Total Cuota Recurrente:</span>
                              <div className="text-right">
                                <span className="text-2xl font-black text-[#E9C46A]">
                                  {fmtCLP(totalMonthlyAddons)}
                                </span>
                                <span className="block text-[11px] text-[#E9DFC9]">
                                  {totalMonthlyAddons > 0 ? '+ IVA/mes (Opcionales contratados)' : '0% pagos mensuales obligatorios'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#143B2F] rounded-2xl p-3.5 border border-[#E9C46A]/30 text-xs text-[#F5EFE6] leading-relaxed">
                          🛡️ <strong>Propiedad 100% Inmediata:</strong> Al contratar en Compra Contado, se te entrega de inmediato el repositorio en GitHub, la base de datos completa y las credenciales maestras en Bóveda Digital (0% dependencias con el proveedor).
                        </div>
                      </div>
                    )}

                    {selectedMod === 'propiedad' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                            <span>Habilitación Base + Carga Inicial:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.prices.propiedad.pie)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} (Convenio Leasing)</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-[#F5EFE6] font-bold">Total Pago Inicial (Mes 1):</span>
                            <span className="font-black text-lg text-white">
                              {fmtCLP(currentBiz.prices.propiedad.pie + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-[#E9DFC9]">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                              <span>Cuota Leasing ({leasingMonths}m - Servidor inc.):</span>
                              <span className="font-bold text-white">{fmtCLP(propertyMonthly)} + IVA/mes</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            {includeGoogleAds && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>📈 + Evaluación Google Ads & SEO Local:</span>
                                <span>En reunión con Ejecutivo ($0)</span>
                              </div>
                            )}
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-[#F5EFE6] text-sm font-bold">Total Cuota Mensual ({leasingMonths}m):</span>
                              <div className="text-right">
                                <span className="text-3xl font-black text-[#E9C46A]">
                                  {fmtCLP(propertyMonthly + totalMonthlyAddons)}
                                </span>
                                <span className="block text-[11px] text-[#E9DFC9]">
                                  + IVA / mes {totalMonthlyAddons > 0 ? '(Base + Bolsa Asistente)' : '(Sin cargos ocultos)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#143B2F] rounded-2xl p-3.5 border border-[#E9C46A]/30 text-xs text-[#F5EFE6] leading-relaxed">
                          🔑 <strong>Al mes {leasingMonths} el sistema es 100% propiedad tuya (Costo de traspaso $0)</strong>. Desde el mes {leasingMonths + 1} tu código es tuyo y solo abonas la renovación anual de hosting/dominio <strong>($90.000 al año / ~{fmtCLP(propertyAfter)}/mes)</strong> si te quedas en nuestra nube, o te entregamos las llaves en Bóveda Digital a costo $0.
                        </div>
                      </div>
                    )}

                    {selectedMod === 'arriendo' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                            <span>Habilitación Base + Carga Inicial:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.prices.arriendo.setup)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} pago único</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-[#F5EFE6] font-bold">Total Pago Inicial (Mes 1):</span>
                            <span className="font-black text-lg text-white">
                              {fmtCLP(currentBiz.prices.arriendo.setup + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-[#E9DFC9]">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                              <span>Suscripción Base (SEO Básico + Panel $0):</span>
                              <span className="font-bold text-white">{fmtCLP(currentBiz.prices.arriendo.monthly)} + IVA/mes</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            {includeGoogleAds && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>📈 + Evaluación Google Ads & SEO Local:</span>
                                <span>En reunión con Ejecutivo ($0)</span>
                              </div>
                            )}
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-[#F5EFE6] text-sm font-bold">Total Suscripción Mensual:</span>
                              <div className="text-right">
                                <span className="text-3xl font-black text-[#E9C46A]">
                                  {fmtCLP(currentBiz.prices.arriendo.monthly + totalMonthlyAddons)}
                                </span>
                                <span className="block text-[11px] text-[#E9DFC9]">
                                  + IVA / mes · {totalMonthlyAddons > 0 ? 'Base + Bolsa Asistente' : 'Panel Autoadministrable'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedMod === 'socio' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                            <span>Habilitación Base + Carga Inicial:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.prices.socio.setup)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} pago único</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-[#F5EFE6] font-bold">Total Pago Inicial (Mes 1):</span>
                            <span className="font-black text-lg text-white">
                              {fmtCLP(currentBiz.prices.socio.setup + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-[#E9DFC9]">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-[#F5EFE6]">
                              <span>Piso Servidor Base Mensual:</span>
                              <span className="font-bold text-white">{fmtCLP(currentBiz.prices.socio.baseMonthly)} + IVA/mes</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                              <span>🔥 + SEO Profundo de Conversión:</span>
                              <span>INCLUIDO ($0)</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#E9C46A] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center pt-1 text-sm">
                              <span className="text-[#F5EFE6] font-bold">Total Fijo Mensual:</span>
                              <span className="font-black text-xl text-[#E9C46A]">
                                {fmtCLP(currentBiz.prices.socio.baseMonthly + asistenteMonthlyCost)} + IVA/mes
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center border-t border-white/15 pt-2.5 text-sm">
                            <span className="text-[#F5EFE6]">Liquidación Pasarela Online:</span>
                            <span className="bg-[#E9C46A] text-[#1F1A17] font-black px-2.5 py-0.5 rounded-lg text-xs">
                              {currentBiz.prices.socio.revShare}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cercanía Humana: Reunión Previa con Ejecutivo Asignado antes de contratar */}
                    <div className="bg-[#E9C46A]/15 rounded-2xl p-3.5 border border-[#E9C46A]/40 text-[11px] text-[#F5EFE6] space-y-1">
                      <div className="font-black text-[#E9C46A] uppercase tracking-wider">
                        🤝 Hablas con Personas, No con Máquinas (Ejecutivo Asignado)
                      </div>
                      <p className="leading-relaxed">
                        <strong>Aquí no pagas a ciegas en una pasarela fría:</strong> primero conversas 15 minutos con tu <strong>Ejecutivo Asignado de UNIVERSO693</strong>, quien te explica cada punto en simple, resuelve tus dudas y deja todo claro antes de firmar o transferir un solo peso.
                      </p>
                    </div>

                    {/* Mecanismo de Cobro Recurrente Automatizado (Cero fricción operativa) */}
                    <div className="bg-[#143B2F]/80 rounded-2xl p-3.5 border border-white/15 text-[11px] text-[#F5EFE6] space-y-1">
                      <div className="font-black text-[#E9C46A] uppercase tracking-wider">
                        💳 Activación Scotiabank + Suscripción Mensual PAT/PAC
                      </div>
                      <p className="leading-relaxed">
                        El pago inicial (Mes 1) se abona a <strong>Cuenta Corriente Empresa Scotiabank de UNIVERSO693 SpA</strong> y las cuotas mensuales operan con <strong>Suscripción Automática en Tarjeta Débito, Crédito o Cuenta Bancaria (Flow / Reveniu / Webpay Oneclick)</strong> con Factura SII automática cada mes.
                      </p>
                    </div>

                    {/* Qué incluye tu rubro seleccionado */}
                    <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-[#E9C46A]">
                        ✓ Qué incluye tu plataforma ({currentBiz.tag}):
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#F5EFE6]">
                        {currentBiz.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E9C46A] shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2.5">
                      <a
                        href={whatsappLink(getWhatsAppMessage())}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#E9C46A] hover:bg-[#F4A261] text-[#143B2F] font-black py-4 px-5 text-sm shadow-lg transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Solicitar este Convenio por WhatsApp
                      </a>
                      <a
                        href={`/orden_activacion_propyme.html?rubro=${selectedBiz}&mod=${selectedMod}&formalizacion=${includeFormalizacion ? '1' : '0'}&asistente=${includeAsistente ? '1' : '0'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-extrabold py-3 px-4 text-xs transition-all"
                      >
                        📄 Generar Orden de Activación Imprimible (PDF 1 Pág.) ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </main>
        )}
      </div>

      {/* FOOTER COMPACTO */}
      <footer className="bg-[#1F1A17] text-stone-300 py-8 border-t border-stone-800 text-xs mt-12">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-black text-sm text-white">
                IMPULSA<span className="text-[#E9C46A]">PROPYME</span> · Chile
              </span>
              <span className="text-stone-400 ml-2">
                Una iniciativa de <strong>UNIVERSO693 SpA</strong> (RUT 78.521.951-1 · Viña del Mar).
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-[#E9C46A] hover:underline font-bold">
                Ir a universo693.com →
              </Link>
              <span className="text-stone-400">+56 9 9038 7414</span>
            </div>
          </div>
        </Container>
      </footer>

    </div>
  );
};
