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
type ModalityType = 'propiedad' | 'socio' | 'arriendo';

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
  prices: {
    propiedad: { pie: number; monthly24: number; after24: number };
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
    prices: {
      propiedad: { pie: 35000, monthly24: 34900, after24: 15900 },
      socio: { setup: 39000, baseMonthly: 22900, revShare: '5% en pedidos pagados online (0% en salón efectivo)' },
      arriendo: { setup: 39000, monthly: 24900 },
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
    prices: {
      propiedad: { pie: 29000, monthly24: 29900, after24: 14900 },
      socio: { setup: 35000, baseMonthly: 19900, revShare: 'Solo Cuota Fija (0% comisión)' },
      arriendo: { setup: 35000, monthly: 19900 },
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
    prices: {
      propiedad: { pie: 45000, monthly24: 44900, after24: 18900 },
      socio: { setup: 49000, baseMonthly: 24900, revShare: '6% por venta procesada en pasarela' },
      arriendo: { setup: 49000, monthly: 32900 },
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
    prices: {
      propiedad: { pie: 39000, monthly24: 39900, after24: 16900 },
      socio: { setup: 45000, baseMonthly: 22900, revShare: 'Solo Cuota Fija (0% comisión)' },
      arriendo: { setup: 45000, monthly: 29900 },
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
    prices: {
      propiedad: { pie: 29000, monthly24: 29900, after24: 14900 },
      socio: { setup: 35000, baseMonthly: 19900, revShare: '5% por reserva pagada online' },
      arriendo: { setup: 35000, monthly: 19900 },
    },
  },
  academia: {
    id: 'academia',
    name: 'Academia, OTEC, Escuela de Oficios o Capacitación',
    tag: 'Aula Virtual & Diplomas',
    subtitle: 'Tu propio campus virtual para vender cursos con pruebas y diplomas PDF',
    demoUrl: '/demos/academia/index.html',
    image: '/impulsa/academia.jpg',
    icon: <GraduationCap className="w-5 h-5" />,
    examples: 'OTECs, profesores independientes, academias de idiomas, repostería o capacitación técnica',
    allowsRevShare: true,
    deliverables: [
      'Campus virtual propio con acceso para alumnos desde celular, tablet o computador',
      'Nosotros subimos tus primeros cursos (videos alojados vía link de YouTube/Vimeo, manuales PDF y cuestionarios)',
      'Emisión automática de certificado/diploma PDF con firma y validación QR',
      'Matrícula pagada en línea con activación automática del alumno',
    ],
    addons: [
      { name: 'Fiscalización SENCE NCh2728 completa', desc: 'Control anti-bypass de video, registro de asistencia y reportería lista para auditoría SENCE.', price: '+$29.900/mes' },
      { name: 'Asistente Virtual IA 24/7 para alumnos', desc: 'Responde dudas frecuentes de tus alumnos por WhatsApp a cualquier hora, sin que tú tengas que estar ahí.', price: '+$14.900/mes' },
      { name: 'Hosting de video propio', desc: 'Tus videos quedan en servidor propio en vez de depender de un link externo de YouTube.', price: '+$19.900/mes' },
    ],
    prices: {
      propiedad: { pie: 49000, monthly24: 49900, after24: 19900 },
      socio: { setup: 55000, baseMonthly: 27900, revShare: '7% por matrícula pagada online' },
      arriendo: { setup: 55000, monthly: 39900 },
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
    prices: {
      propiedad: { pie: 45000, monthly24: 46900, after24: 18900 },
      socio: { setup: 49000, baseMonthly: 34900, revShare: 'Solo Cuota Fija (0% comisión)' },
      arriendo: { setup: 49000, monthly: 34900 },
    },
  },
};

export const ImpulsaPyme: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [selectedBiz, setSelectedBiz] = useState<BusinessType>('almacen');
  const [selectedMod, setSelectedMod] = useState<ModalityType>('propiedad');
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
  // Setup Administrativo Empresa en un Día: $19.900 preferencial en plan 24 cuotas, $39.000 en otros planes
  const formalizacionCost = selectedMod === 'propiedad' ? 19900 : 39000;
  const asistenteMonthlyCost = includeAsistente ? 14900 : 0;
  // Google Ads no se cobra a ciegas: se dimensiona en la reunión previa con el Ejecutivo según rubro/comuna
  const totalMonthlyAddons = asistenteMonthlyCost;

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
    if (selectedMod === 'propiedad') {
      modText = `Arriendo con Derecho a Compra en 24 cuotas (Habilitación inicial ${fmtCLP(currentBiz.prices.propiedad.pie)} + ${fmtCLP(currentBiz.prices.propiedad.monthly24 + totalMonthlyAddons)}/mes y al mes 24 pasa a ser 100% mío)`;
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
              <span className="text-emerald-50/95">
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
                            <CheckCircle2 className="w-4 h-4 text-[#15803d] mt-0.5 shrink-0" />
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

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                      <div className="text-[11px] font-black uppercase text-stone-500">Suscripción Accesible</div>
                      <div className="text-lg font-black text-[#0f172a]">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.arriendo.monthly)}/mes</div>
                      <div className="text-[11px] text-stone-500">+ {fmtCLP(BUSINESS_TYPES[rubroPage].prices.arriendo.setup)} habilitación</div>
                    </div>
                    <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                      <div className="text-[11px] font-black uppercase text-stone-500">Derecho a Compra (24m)</div>
                      <div className="text-lg font-black text-[#0f172a]">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.propiedad.monthly24)}/mes</div>
                      <div className="text-[11px] text-stone-500">y al mes 24 es 100% tuyo</div>
                    </div>
                    {BUSINESS_TYPES[rubroPage].allowsRevShare ? (
                      <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                        <div className="text-[11px] font-black uppercase text-stone-500">Socio a % Ventas</div>
                        <div className="text-lg font-black text-[#0f172a]">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.socio.baseMonthly)}/mes</div>
                        <div className="text-[11px] text-stone-500">+ {BUSINESS_TYPES[rubroPage].prices.socio.revShare}</div>
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4">
                        <div className="text-[11px] font-black uppercase text-stone-500">Alianza Impulsa</div>
                        <div className="text-lg font-black text-[#0f172a]">{fmtCLP(BUSINESS_TYPES[rubroPage].prices.socio.baseMonthly)}/mes</div>
                        <div className="text-[11px] text-stone-500">{BUSINESS_TYPES[rubroPage].prices.socio.revShare}</div>
                      </div>
                    )}
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
                      <p className="text-emerald-50/90 leading-relaxed">
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
                            Desde {fmtCLP(b.prices.arriendo.monthly)}/mes
                          </div>
                        </div>

                        <div className="p-6 pb-3 space-y-2">
                          <h3 className="font-human text-lg font-semibold text-[#1F1A17] leading-snug group-hover:text-[#1B4D3E] transition-colors">{b.name}</h3>
                          <p className="text-xs text-[#574C43] leading-relaxed">{b.subtitle}</p>
                          <p className="text-[11px] text-[#8C7A6B] pt-1">
                            <strong>Pensado para:</strong> {b.examples}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C85A32] pt-1">
                            Ver todo lo que incluye y puedes sumarle <ArrowRight className="w-3 h-3" />
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
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
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
                          ? 'border-[#15803d] bg-[#14532d] text-white shadow-md'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className={active ? 'text-[#4ade80]' : 'text-[#15803d]'}>{b.icon}</div>
                      <div className="font-black text-xs mt-1.5 leading-tight">{b.tag}</div>
                    </button>
                  );
                })}
              </div>

              {/* VENTANA DE DEMO INTERACTIVA MULTI-DISPOSITIVO (SET 3D: PC + TABLET + CELULAR) */}
              <div className="space-y-4 mb-4">
                <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl px-4 sm:px-6 py-2.5 text-xs text-[#92400E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-base">⚠️</span>
                    <span>
                      <strong>Nota para clientes:</strong> Esto es una <u>demo funcional en vivo</u>. Tu sitio final se personalizará al 100% con tu logo, tus colores, tu nombre real, tus propios productos/fotos y tus textos de marca.
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#F59E0B] text-black px-2 py-0.5 rounded shrink-0">
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
                    <span className="font-black text-slate-900">{currentBiz.name}:</span>{' '}
                    {currentBiz.subtitle} · Incluye carga inicial de tu catálogo y configuración lista para vender.
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    <a
                      href={currentBiz.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border-2 border-stone-300 bg-white hover:bg-stone-100 text-slate-900 font-black px-4 py-2.5 text-xs transition-all"
                    >
                      Abrir en Pestaña Nueva ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => switchTab('simulador', selectedBiz)}
                      className="rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-black px-5 py-2.5 text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
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
                        <CheckCircle2 className="w-4 h-4 text-[#15803d] mt-0.5 shrink-0" />
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
              <div className="max-w-3xl mx-auto text-center space-y-2 mb-10">
                <span className="inline-block bg-[#dcfce7] text-[#14532d] text-xs font-black px-3.5 py-1 rounded-full uppercase">
                  Pioneros en Chile en Leasing Tecnológico ProPyme
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-[#0f172a]">
                  Tres formas transparentes de financiar tu plataforma
                </h1>
                <p className="text-stone-600 text-sm sm:text-base">
                  Todas incluyen habilitación inicial accesible, carga de tus primeros contenidos y servidor dedicado:
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* OPCIÓN 1 */}
                <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="bg-sky-100 text-sky-900 text-xs font-black px-3 py-1 rounded-full uppercase inline-block">
                      Opción 1 · Cuota Más Liviana
                    </span>
                    <h3 className="text-xl font-black text-[#0f172a]">
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
                        <span className="font-black text-sky-700">Desde $19.900 / mes</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-1.5">
                        <span>Posicionamiento en Google:</span>
                        <span className="font-black text-[#15803d]">SEO Técnico Base ($0)</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-200 pt-1.5 text-[11px] text-stone-600">
                        <span>Modalidad de cobro:</span>
                        <span className="font-bold text-slate-900">PAT / Débito Automático</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMod('arriendo');
                      switchTab('simulador');
                    }}
                    className="mt-5 w-full rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Simular Suscripción Accesible →
                  </button>
                </div>

                {/* OPCIÓN 2 */}
                <div className="bg-white rounded-3xl border-3 border-[#15803d] p-6 shadow-xl flex flex-col justify-between relative">
                  <div className="absolute -top-3 left-6 bg-[#15803d] text-white text-[10px] font-black uppercase px-3.5 py-0.5 rounded-full">
                    ★ Tu Propio Activo en 24 Cuotas
                  </div>
                  <div className="space-y-3">
                    <span className="bg-[#dcfce7] text-[#14532d] text-xs font-black px-3 py-1 rounded-full uppercase inline-block">
                      Opción 2 · Derecho a Compra
                    </span>
                    <h3 className="text-xl font-black text-[#0f172a]">
                      Arriendo con Derecho a Compra (24m)
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Pagas 24 cuotas fijas (con SEO Técnico Base + 1 ajuste asistido al mes) y <strong>al cumplir el mes 24 el software pasa a ser 100% propiedad tuya a costo $0</strong>.
                    </p>
                    <div className="bg-[#f0fdf4] rounded-2xl p-3.5 border border-[#86efac] space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>Habilitación + Carga inicial:</span>
                        <span className="font-black">Desde $29.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>24 cuotas fijas (PAT/Débito):</span>
                        <span className="font-black text-[#15803d]">Desde $29.900 / mes</span>
                      </div>
                      <div className="flex justify-between border-t border-[#86efac] pt-1.5 font-bold text-[#14532d]">
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
                    className="mt-5 w-full rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-extrabold py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Simular con Derecho a Compra →
                  </button>
                </div>

                {/* OPCIÓN 3 */}
                <div className="bg-white rounded-3xl border-2 border-amber-400 p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase inline-block">
                      Opción 3 · Exclusivo Pago Online + SEO Profundo
                    </span>
                    <h3 className="text-xl font-black text-[#0f172a]">
                      Alianza Socio Impulsa (% Ventas)
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Exclusivo para negocios con <strong>cobro 100% por pasarela online</strong>. Como ganamos un % cuando tú vendes, <strong>te incluimos SEO Profundo de Conversión sin costo extra</strong> para multiplicar tus ventas.
                    </p>
                    <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-300 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span>Habilitación inicial:</span>
                        <span className="font-black">Desde $45.000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Piso mensual servidor:</span>
                        <span className="font-black">Desde $22.900 / mes</span>
                      </div>
                      <div className="flex justify-between border-t border-amber-300 pt-1.5 font-bold text-[#15803d]">
                        <span>SEO Profundo Conversión:</span>
                        <span>INCLUIDO ($0 extra)</span>
                      </div>
                      <div className="flex justify-between border-t border-amber-300 pt-1.5 font-bold text-[#b45309]">
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
                    className="mt-5 w-full rounded-xl bg-[#b45309] hover:bg-[#92400e] text-white font-extrabold py-3 text-xs sm:text-sm cursor-pointer"
                  >
                    Simular Alianza Socio →
                  </button>
                </div>
              </div>

              {/* Bloque Empresa en un Día */}
              <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#14532d] via-[#166534] to-[#14532d] text-white p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="bg-[#4ade80] text-[#052e16] text-[10px] font-black uppercase px-3 py-1 rounded-full">
                    🪪 Setup Administrativo Formalización + Digitalización
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">
                    ¿Aún no tienes tu empresa creada? Te ayudamos con “Empresa en un Día”
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    Te acompañamos paso a paso en videollamada a constituir tu <strong>SpA o EIRL</strong>, activar tu <strong>e-RUT e inicio de actividades en el SII</strong>, inscribir tu dominio <strong>.CL en NIC Chile</strong> y habilitar tu cuenta <strong>Webpay / MercadoPago / Flow</strong>. Valor Convenio preferencial de <strong>+$19.900 CLP</strong> en el plan de 24 cuotas (o +$39.000 en otros planes; tasas externas directas de firma notarial ~$9.000 y NIC.cl $9.950 se abonan directo a tu RUT).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIncludeFormalizacion(true);
                    switchTab('simulador');
                  }}
                  className="shrink-0 rounded-xl bg-[#4ade80] hover:bg-[#22c55e] text-[#052e16] font-black text-xs sm:text-sm px-6 py-4 shadow-md cursor-pointer"
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
                      <h2 className="font-black text-base sm:text-lg text-[#0f172a]">
                        1. Selecciona el rubro de tu negocio:
                      </h2>
                      <button
                        type="button"
                        onClick={() => switchTab('demos', selectedBiz)}
                        className="text-xs font-extrabold text-[#15803d] hover:underline inline-flex items-center gap-1 cursor-pointer"
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
                                ? 'border-[#15803d] bg-[#f0fdf4]'
                                : 'border-stone-200 bg-white hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-extrabold text-xs text-[#0f172a]">
                              <span className={active ? 'text-[#15803d]' : 'text-stone-500'}>{item.icon}</span>
                              <span>{item.tag}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-1">{item.name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 space-y-3">
                    <h2 className="font-black text-base sm:text-lg text-[#0f172a]">
                      2. Elige cómo quieres pagarlo:
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedMod('propiedad')}
                        className={`text-left rounded-2xl p-3.5 border-2 transition-all cursor-pointer ${
                          selectedMod === 'propiedad' ? 'border-[#15803d] bg-[#f0fdf4]' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-[#15803d] block">Derecho a Compra</span>
                        <strong className="text-xs sm:text-sm font-black text-stone-900 block">24 Cuotas y es Tuyo</strong>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedMod('arriendo')}
                        className={`text-left rounded-2xl p-3.5 border-2 transition-all cursor-pointer ${
                          selectedMod === 'arriendo' ? 'border-sky-600 bg-sky-50' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-sky-700 block">Cuota Liviana</span>
                        <strong className="text-xs sm:text-sm font-black text-stone-900 block">Suscripción Accesible</strong>
                      </button>

                      <button
                        type="button"
                        disabled={!currentBiz.allowsRevShare}
                        onClick={() => currentBiz.allowsRevShare && setSelectedMod('socio')}
                        className={`text-left rounded-2xl p-3.5 border-2 transition-all ${
                          !currentBiz.allowsRevShare
                            ? 'border-stone-200 bg-stone-100 opacity-60 cursor-not-allowed'
                            : selectedMod === 'socio'
                            ? 'border-[#b45309] bg-amber-50 cursor-pointer'
                            : 'border-stone-200 bg-white cursor-pointer'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase text-[#b45309] block">
                          {currentBiz.allowsRevShare ? 'SEO Profundo Incluido' : 'Solo Cobro Webpay'}
                        </span>
                        <strong className="text-xs sm:text-sm font-black text-stone-900 block">Socio a % Ventas</strong>
                      </button>
                    </div>
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
                      includeFormalizacion ? 'border-[#15803d] bg-[#f0fdf4]' : 'border-amber-300 bg-[#fffbeb]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={includeFormalizacion}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 accent-[#15803d] rounded cursor-pointer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase bg-[#14532d] text-white px-2 py-0.5 rounded-full">
                            Opcional 1 · Setup Administrativo
                          </span>
                          <span className="text-xs font-extrabold text-[#15803d]">
                            {selectedMod === 'propiedad'
                              ? '🎁 Valor Convenio 24m: +$19.900 CLP (Normal $39.000)'
                              : '+$39.000 CLP pago único'}
                          </span>
                        </div>
                        <h3 className="font-black text-sm text-[#0f172a] mt-1">
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
                      includeAsistente ? 'border-[#15803d] bg-[#f0fdf4]' : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={includeAsistente}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 accent-[#15803d] rounded cursor-pointer"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase bg-sky-900 text-white px-2 py-0.5 rounded-full">
                            Opcional 2 · Delega la Carga Mensual
                          </span>
                          <span className="text-xs font-extrabold text-sky-800">+$14.900 + IVA / mes</span>
                        </div>
                        <h3 className="font-black text-sm text-[#0f172a] mt-1">
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
                    <div className="rounded-3xl p-5 border-2 border-[#15803d] bg-[#f0fdf4]">
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-[#15803d] text-white px-2.5 py-0.5 rounded-full">
                              Beneficio Exclusivo Socio Impulsa
                            </span>
                            <span className="text-xs font-extrabold text-[#15803d]">
                              🔥 INCLUIDO ($0 costo fijo extra)
                            </span>
                          </div>
                          <h3 className="font-black text-sm text-[#0f172a] mt-1">
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
                        includeGoogleAds ? 'border-[#15803d] bg-[#f0fdf4]' : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={includeGoogleAds}
                          onChange={() => {}}
                          className="mt-1 w-4 h-4 accent-[#15803d] rounded cursor-pointer"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase bg-amber-800 text-white px-2 py-0.5 rounded-full">
                              Opcional 3 · Evaluación con tu Ejecutivo
                            </span>
                            <span className="text-xs font-extrabold text-amber-900">
                              A medida según tu rubro y comuna (Diagnóstico $0)
                            </span>
                          </div>
                          <h3 className="font-black text-sm text-[#0f172a] mt-1">
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
                  <div className="rounded-3xl bg-[#14532d] text-white p-6 sm:p-7 shadow-2xl border-4 border-[#dcfce7] space-y-5">
                    <div className="border-b border-white/15 pb-3">
                      <span className="bg-[#4ade80] text-[#052e16] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                        RESUMEN DE TU SIMULACIÓN
                      </span>
                      <h3 className="text-lg font-black mt-1.5 leading-snug">{currentBiz.name}</h3>
                    </div>

                    {selectedMod === 'propiedad' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-emerald-100">
                            <span>Habilitación Base + Carga Inicial:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.prices.propiedad.pie)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} (Convenio 24m)</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-emerald-100 font-bold">Total Pago Inicial (Mes 1):</span>
                            <span className="font-black text-lg text-white">
                              {fmtCLP(currentBiz.prices.propiedad.pie + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-emerald-200">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-emerald-100">
                              <span>Cuota Base (Servidor + SEO Básico + 1 ajuste):</span>
                              <span className="font-bold text-white">{fmtCLP(currentBiz.prices.propiedad.monthly24)} + IVA/mes</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            {includeGoogleAds && (
                              <div className="flex justify-between items-center text-xs text-amber-300 font-bold">
                                <span>📈 + Evaluación Google Ads & SEO Local:</span>
                                <span>En reunión con Ejecutivo ($0)</span>
                              </div>
                            )}
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-emerald-100 text-sm font-bold">Total Cuota Mensual (24m):</span>
                              <div className="text-right">
                                <span className="text-3xl font-black text-[#4ade80]">
                                  {fmtCLP(currentBiz.prices.propiedad.monthly24 + totalMonthlyAddons)}
                                </span>
                                <span className="block text-[11px] text-emerald-200">
                                  + IVA / mes {totalMonthlyAddons > 0 ? '(Base + Bolsa Asistente)' : '(Sin cargos adicionales)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#052e16] rounded-2xl p-3.5 border border-[#4ade80]/30 text-xs text-emerald-100">
                          🔑 <strong>Al mes 24 el sistema es 100% propiedad tuya (Costo de traspaso $0)</strong> y desde el mes 25 tu pago baja a solo <strong>{fmtCLP(currentBiz.prices.propiedad.after24)} + IVA/mes</strong> por el servidor.
                        </div>
                      </div>
                    )}

                    {selectedMod === 'arriendo' && (
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs text-emerald-100">
                            <span>Habilitación Base + Carga Inicial:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.prices.arriendo.setup)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} pago único</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-emerald-100 font-bold">Total Pago Inicial (Mes 1):</span>
                            <span className="font-black text-lg text-white">
                              {fmtCLP(currentBiz.prices.arriendo.setup + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-emerald-200">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-emerald-100">
                              <span>Suscripción Base (SEO Básico + Panel $0):</span>
                              <span className="font-bold text-white">{fmtCLP(currentBiz.prices.arriendo.monthly)} + IVA/mes</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            {includeGoogleAds && (
                              <div className="flex justify-between items-center text-xs text-amber-300 font-bold">
                                <span>📈 + Evaluación Google Ads & SEO Local:</span>
                                <span>En reunión con Ejecutivo ($0)</span>
                              </div>
                            )}
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-emerald-100 text-sm font-bold">Total Suscripción Mensual:</span>
                              <div className="text-right">
                                <span className="text-3xl font-black text-[#4ade80]">
                                  {fmtCLP(currentBiz.prices.arriendo.monthly + totalMonthlyAddons)}
                                </span>
                                <span className="block text-[11px] text-emerald-200">
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
                          <div className="flex justify-between items-center text-xs text-emerald-100">
                            <span>Habilitación Base + Carga Inicial:</span>
                            <span className="font-bold text-white">{fmtCLP(currentBiz.prices.socio.setup)} + IVA</span>
                          </div>
                          {includeFormalizacion && (
                            <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                              <span>+ Setup Empresa en 1 Día + Webpay:</span>
                              <span>+{fmtCLP(formalizacionCost)} pago único</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-sm border-t border-white/15 pt-2">
                            <span className="text-emerald-100 font-bold">Total Pago Inicial (Mes 1):</span>
                            <span className="font-black text-lg text-white">
                              {fmtCLP(currentBiz.prices.socio.setup + (includeFormalizacion ? formalizacionCost : 0))}{' '}
                              <span className="text-xs font-normal text-emerald-200">+ IVA</span>
                            </span>
                          </div>

                          <div className="border-t border-white/20 pt-2.5 mt-2 space-y-1.5">
                            <div className="flex justify-between items-center text-xs text-emerald-100">
                              <span>Piso Servidor Base Mensual:</span>
                              <span className="font-bold text-white">{fmtCLP(currentBiz.prices.socio.baseMonthly)} + IVA/mes</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                              <span>🔥 + SEO Profundo de Conversión:</span>
                              <span>INCLUIDO ($0)</span>
                            </div>
                            {includeAsistente && (
                              <div className="flex justify-between items-center text-xs text-[#4ade80] font-bold">
                                <span>🛠️ + Bolsa Asistente Digital (3 cargas/mes):</span>
                                <span>+{fmtCLP(asistenteMonthlyCost)} + IVA/mes</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center pt-1 text-sm">
                              <span className="text-emerald-100 font-bold">Total Fijo Mensual:</span>
                              <span className="font-black text-xl text-[#4ade80]">
                                {fmtCLP(currentBiz.prices.socio.baseMonthly + asistenteMonthlyCost)} + IVA/mes
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center border-t border-white/15 pt-2.5 text-sm">
                            <span className="text-emerald-100">Liquidación Pasarela Online:</span>
                            <span className="bg-[#f59e0b] text-slate-950 font-black px-2.5 py-0.5 rounded-lg text-xs">
                              {currentBiz.prices.socio.revShare}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cercanía Humana: Reunión Previa con Ejecutivo Asignado antes de contratar */}
                    <div className="bg-amber-400/15 rounded-2xl p-3.5 border border-amber-300/40 text-[11px] text-amber-50 space-y-1">
                      <div className="font-black text-amber-300 uppercase tracking-wider">
                        🤝 Hablas con Personas, No con Máquinas (Ejecutivo Asignado)
                      </div>
                      <p className="leading-relaxed">
                        <strong>Aquí no pagas a ciegas en una pasarela fría:</strong> primero conversas 15 minutos con tu <strong>Ejecutivo Asignado de UNIVERSO693</strong>, quien te explica cada punto en simple, resuelve tus dudas y deja todo claro antes de firmar o transferir un solo peso.
                      </p>
                    </div>

                    {/* Mecanismo de Cobro Recurrente Automatizado (Cero fricción operativa) */}
                    <div className="bg-[#052e16]/80 rounded-2xl p-3.5 border border-white/15 text-[11px] text-emerald-100 space-y-1">
                      <div className="font-black text-[#4ade80] uppercase tracking-wider">
                        💳 Activación Scotiabank + Suscripción Mensual PAT/PAC
                      </div>
                      <p className="leading-relaxed">
                        El pago inicial (Mes 1) se abona a <strong>Cuenta Corriente Empresa Scotiabank de UNIVERSO693 SpA</strong> y las cuotas mensuales operan con <strong>Suscripción Automática en Tarjeta Débito, Crédito o Cuenta Bancaria (Flow / Reveniu / Webpay Oneclick)</strong> con Factura SII automática cada mes.
                      </p>
                    </div>

                    {/* Qué incluye tu rubro seleccionado */}
                    <div className="bg-white/10 rounded-2xl p-4 space-y-2">
                      <div className="text-[11px] font-black uppercase tracking-wider text-[#4ade80]">
                        ✓ Qué incluye tu plataforma ({currentBiz.tag}):
                      </div>
                      <ul className="space-y-1.5 text-xs text-emerald-50">
                        {currentBiz.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80] shrink-0 mt-0.5" />
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
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#4ade80] hover:bg-[#22c55e] text-[#052e16] font-black py-4 px-5 text-sm shadow-lg transition-all"
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
      <footer className="bg-[#0f172a] text-stone-300 py-8 border-t border-stone-800 text-xs mt-12">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-black text-sm text-white">
                IMPULSA<span className="text-[#4ade80]">PROPYME</span> · Chile
              </span>
              <span className="text-stone-400 ml-2">
                Una iniciativa de <strong>UNIVERSO693 SpA</strong> (RUT 78.521.951-1 · Viña del Mar).
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-emerald-300 hover:underline font-bold">
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
