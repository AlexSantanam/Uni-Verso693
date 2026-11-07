import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Globe,
  Bot,
  Layers,
  ArrowRight,
  TrendingUp,
  Percent,
  Server,
  DollarSign,
  HelpCircle,
  Clock,
  Briefcase,
  CheckCircle2
} from 'lucide-react';

interface PresetPlan {
  id: string;
  name: string;
  tag: string;
  basePrice: number;
  sections: string;
  deliveryDays: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

const PRESET_PLANS: PresetPlan[] = [
  {
    id: 'start',
    name: 'Plan Start',
    tag: 'Base Oficial',
    basePrice: 150000,
    sections: 'Hasta 4 Secciones',
    deliveryDays: 5,
    description: 'Página web rápida y optimizada para convertir visitas en clientes vía WhatsApp.',
    features: ['Hasta 4 secciones', 'Botón a WhatsApp directo', 'Autoadministrable', 'Hosting + Dominio .CL (Año 1)', 'SSL de alta velocidad']
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    tag: 'Más Elegido',
    basePrice: 200000,
    sections: 'Hasta 7 Secciones',
    deliveryDays: 7,
    description: 'Presencia corporativa robusta con posicionamiento SEO en Google y ChatGPT.',
    features: ['Hasta 7 secciones', 'SEO para Google e IA', 'Correos corporativos', 'Hosting + Dominio .CL (Año 1)', 'Soporte 30 días'],
    recommended: true
  },
  {
    id: 'plus',
    name: 'Plan Plus',
    tag: 'Catálogo / Menú',
    basePrice: 250000,
    sections: 'Hasta 10 Secciones',
    deliveryDays: 10,
    description: 'Web con catálogo de productos o menú interactivo con código QR digital.',
    features: ['Hasta 10 secciones o Catálogo', 'Filtros y código QR', 'Armado de pedidos a WhatsApp', 'Panel de administración', 'Hosting + Dominio .CL']
  },
  {
    id: 'restaurante-qr',
    name: 'Plataforma Gastronómica QR',
    tag: 'Estilo OlaClick',
    basePrice: 250000,
    sections: 'Carta QR + Cocina KDS',
    deliveryDays: 7,
    description: 'Sistema integral para restaurantes: Menú QR interactivo, pantalla de cocina KDS en vivo y pedidos directos sin comisiones.',
    features: ['Carta digital QR autoadministrable', 'Pantalla de cocina KDS en tiempo real', 'Pedidos directos a WhatsApp', 'Rango delivery con recargo automático', 'Cupones de descuento y CRM']
  },
  {
    id: 'store',
    name: 'Plan Store',
    tag: 'E-Commerce 24/7',
    basePrice: 285000,
    sections: 'Tienda Completa',
    deliveryDays: 10,
    description: 'Tienda online completa con carrito, control de stock y pagos Webpay Plus.',
    features: ['Carrito de compras 24/7', 'Integración Webpay Plus (Débito/Crédito)', 'Cálculo de envíos', 'Panel autoadministrable', 'Hosting SSL Bancario']
  },
  {
    id: 'web-pro',
    name: 'Web Corporativa Pro',
    tag: 'Empresarial',
    basePrice: 1000000,
    sections: 'Portal Corporativo',
    deliveryDays: 15,
    description: 'Plataforma corporativa avanzada con arquitectura a medida y alto tráfico.',
    features: ['Arquitectura personalizada', 'Multi-idioma o portal de clientes', 'Infraestructura cloud dedicada', 'Optimización Core Web Vitals 95+']
  },
  {
    id: 'software',
    name: 'Software a Medida',
    tag: 'ERP / SaaS',
    basePrice: 5000000,
    sections: 'Sistema Completo',
    deliveryDays: 30,
    description: 'Sistema operacional completo, ERP, cotizador industrial o software a medida.',
    features: ['Base de datos relacional', 'Roles y permisos avanzados', 'APIs e integraciones', 'Servidor dedicado cloud', 'Bóveda digital']
  }
];

export const CalculadoraServiciosTab: React.FC = () => {
  // Estado de entrada
  const [selectedPresetId, setSelectedPresetId] = useState<string>('start');
  const [customPrice, setCustomPrice] = useState<number>(150000);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');

  // Plazo de Leasing (3 a 24 meses)
  const [leasingMonths, setLeasingMonths] = useState<number>(12);

  // Opciones de Dominio
  // 'no-domain' = Nosotros registramos en NIC Chile (garantía de retención)
  // 'has-domain' = Cliente ya tiene dominio propio (descuento de $10.000 incentivo)
  const [domainScenario, setDomainScenario] = useState<'no-domain' | 'has-domain'>('no-domain');

  // Módulos adicionales
  const [includeAI, setIncludeAI] = useState<boolean>(false);
  const [includeWebpay, setIncludeWebpay] = useState<boolean>(false);
  const [extraHours, setExtraHours] = useState<number>(0);

  // Mantención Mensual para Venta Directa (% del monto de compra)
  const [includeContadoMaintenance, setIncludeContadoMaintenance] = useState<boolean>(false);
  const [contadoMaintenancePct, setContadoMaintenancePct] = useState<number>(4);

  // Feedback de copiado
  const [copiedType, setCopiedType] = useState<'wsp' | 'email' | null>(null);

  // Precio base activo
  const activeBasePrice = isCustom ? customPrice : (PRESET_PLANS.find(p => p.id === selectedPresetId)?.basePrice || 150000);
  const activePlanName = isCustom 
    ? (projectName || 'Proyecto a Medida') 
    : (PRESET_PLANS.find(p => p.id === selectedPresetId)?.name || 'Plan Start');

  // Descuento por dominio existente
  const domainDiscount = domainScenario === 'has-domain' ? 10000 : 0;

  // Addons setup y mensual
  const aiSetupCost = includeAI ? 490000 : 0;
  const aiMonthlyCost = includeAI ? 29000 : 0;

  const webpaySetupCost = includeWebpay ? 45000 : 0;
  const extraHoursCost = extraHours * 15000;

  // ----------------------------------------------------
  // FÓRMULAS DE FINANCIAMIENTO SEGÚN REGLAS DE NEGOCIO
  // ----------------------------------------------------

  // 1. MODELO 1: ARRIENDO PERPETUO (SaaS / Arriendo Barato)
  // Regla: Escalamiento proporcional y justo según el tamaño del servicio:
  // • Plan Start ($150k): $15.000/mes (Piso mínimo de infraestructura).
  // • Plan Pro ($200k): $20.000/mes (10% valor base).
  // • Plan Plus ($250k): $25.000/mes (10% valor base, catálogo).
  // • Plan Store ($285k): $29.000/mes (10% valor base, transacciones Webpay Plus y e-commerce).
  // • Proyectos corporativos ($1M a $5M): baja suavemente de 4.5% a 4.0%.
  const saasMonthly = useMemo(() => {
    let monthly = 15000;
    if (activeBasePrice <= 300000) {
      // Planes Pyme: 10% del valor base con piso mínimo de $15.000
      monthly = Math.max(15000, Math.round((activeBasePrice * 0.10) / 1000) * 1000);
    } else if (activeBasePrice <= 1000000) {
      // De 300k (10% = 30k) a 1M (4.5% = 45k)
      const t = (activeBasePrice - 300000) / 700000.0;
      const pct = 0.10 * (1 - t) + 0.045 * t;
      monthly = Math.round((activeBasePrice * pct) / 1000) * 1000;
    } else {
      // De 1M (4.5% = 45k) a 5M (4.0% = 200k)
      const t = Math.min(1.0, (activeBasePrice - 1000000) / 4000000.0);
      const pct = 0.045 * (1 - t) + 0.04 * t;
      monthly = Math.round((activeBasePrice * pct) / 1000) * 1000;
    }
    return monthly + aiMonthlyCost;
  }, [activeBasePrice, aiMonthlyCost]);

  const saasSetupInitial = Math.max(0, 15000 - domainDiscount) + aiSetupCost + webpaySetupCost + extraHoursCost;
  const saasFirstMonthTotal = saasSetupInitial + saasMonthly;

  // 2. MODELO 2: ARRIENDO CON DERECHO A COMPRA (LEASING M MESES)
  // Puntos de calibración:
  // $150k: 12m -> $22.000/mes | 24m -> $14.000/mes
  // $1M:   12m -> $115.000/mes | 24m -> $65.000/mes
  // $5M:   12m -> $550.000/mes | 24m -> $300.000/mes
  const leasingMonthly = useMemo(() => {
    const m = leasingMonths;
    let cuota = 22000;

    if (activeBasePrice <= 300000) {
      const ratio = activeBasePrice / 150000.0;
      const c12 = 22000 * ratio;
      cuota = c12 * Math.pow(12.0 / m, 0.65);
    } else if (activeBasePrice <= 1500000) {
      const ratio = activeBasePrice / 1000000.0;
      const c12 = 115000 * ratio;
      cuota = c12 * Math.pow(12.0 / m, 0.82);
    } else {
      const ratio = activeBasePrice / 5000000.0;
      const c12 = 550000 * ratio;
      cuota = c12 * Math.pow(12.0 / m, 0.87);
    }

    const rounded = Math.round(cuota / 1000) * 1000;
    return rounded + aiMonthlyCost;
  }, [activeBasePrice, leasingMonths, aiMonthlyCost]);

  const leasingSetupInitial = Math.max(0, 15000 - domainDiscount) + aiSetupCost + webpaySetupCost + extraHoursCost;
  const leasingFirstMonthTotal = leasingSetupInitial + leasingMonthly;
  const leasingTotalContract = leasingSetupInitial + (leasingMonthly * leasingMonths);

  // 3. MODELO 3: VENTA DIRECTA (CONTADO)
  const contadoBase = activeBasePrice + aiSetupCost + webpaySetupCost + extraHoursCost; // Venta directa siempre mantiene el valor oficial íntegro
  const contadoAnualRenewal = activeBasePrice >= 2000000 ? 90000 : 60000;

  // Mantención mensual opcional para venta directa (% del monto base con piso mínimo $15.000)
  const contadoMaintenanceMonthly = useMemo(() => {
    if (!includeContadoMaintenance) return 0;
    const calc = Math.round((activeBasePrice * (contadoMaintenancePct / 100)) / 1000) * 1000;
    return Math.max(15000, calc);
  }, [includeContadoMaintenance, activeBasePrice, contadoMaintenancePct]);

  // Formateador chileno de moneda
  const clp = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-CL');
  };

  const getPresetSaaS = (price: number) => {
    if (price <= 300000) return Math.max(15000, Math.round((price * 0.10) / 1000) * 1000);
    if (price <= 1000000) {
      const t = (price - 300000) / 700000.0;
      return Math.round((price * (0.10 * (1 - t) + 0.045 * t)) / 1000) * 1000;
    }
    const t = Math.min(1.0, (price - 1000000) / 4000000.0);
    return Math.round((price * (0.045 * (1 - t) + 0.04 * t)) / 1000) * 1000;
  };

  // Generador de textos listos para copiar
  const generateProposalText = (type: 'wsp' | 'email') => {
    const client = clientName.trim() || 'Estimado(a)';
    const project = isCustom ? (projectName.trim() || 'Desarrollo Digital') : activePlanName;

    if (type === 'wsp') {
      return `Hola ${client}, buen día. Te comparto las 3 alternativas comerciales para ${project} con UNIVERSO693:

1️⃣ *ARRIENDO MENSUAL (SaaS Flexible)*
• Habilitación inicial: ${clp(saasSetupInitial)} (0 amarres)
• Mensualidad fija: *${clp(saasMonthly)} / mes* (hosting, dominio y soporte siempre incluidos)
• Ideal para: Cuidar tu flujo de caja mes a mes.

2️⃣ *DERECHO A COMPRA (Leasing a ${leasingMonths} Meses)*
• Habilitación inicial: ${clp(leasingSetupInitial)}
• Cuota mensual: *${clp(leasingMonthly)} / mes* (durante ${leasingMonths} meses)
• Total 1er mes: ${clp(leasingFirstMonthTotal)}
• ✅ *Al mes ${leasingMonths} el sitio y el dominio son 100% de tu empresa a costo $0*.

3️⃣ *COMPRA DIRECTA (Contado)*
• Pago único de compra: *${clp(contadoBase)} IVA Inc.*
• Cuota mensual obligatoria: *$0 / mes*
• Incluye: Hosting cloud + Dominio .CL por el Año 1 y 30 días de soporte post-entrega.
• A partir del Año 2: Renovación de hosting/dominio por solo ${clp(contadoAnualRenewal)}/año (apenas ~$5.000/mes; *NO vuelves a pagar el sitio*).
${includeContadoMaintenance ? `• 🛡️ *Plan de Mantención Técnica Opcional:* ${clp(contadoMaintenanceMonthly)} / mes (${contadoMaintenancePct}% del valor de compra). Incluye monitoreo 24/7, respaldos cloud automáticos, soporte prioritario por WhatsApp y afinamiento.` : ''}
${includeAI ? `\n🤖 *Módulo Agente IA 24/7:* Incluido con setup de $490.000 + IVA y mantención fija de $29.000/mes de tokens.` : ''}
${domainScenario === 'has-domain' ? `\n🌐 *Dominio Propio:* Ya cuentas con dominio, te aplicamos un descuento de -$10.000 en el primer pago y te enviamos la guía DNS.` : `\n🌐 *Dominio:* Gestionamos tu .CL en NIC Chile a costo $0 dentro del plan.`}

¿Cuál de las 3 alternativas se adapta mejor a tu flujo de caja para coordinar la partida?`;
    } else {
      return `Estimado(a) ${client},

Junto con saludar, presentamos a continuación las alternativas comerciales para el proyecto "${project}" con UNIVERSO693 SpA:

══════════════════════════════════════════════════════════════
MODALIDAD 1: ARRIENDO MENSUAL (SaaS FLEXIBLE)
══════════════════════════════════════════════════════════════
• Habilitación inicial: ${clp(saasSetupInitial)} IVA Inc.
• Arriendo Mensual: ${clp(saasMonthly)} / mes IVA Inc.
• Total 1er Mes: ${clp(saasFirstMonthTotal)} IVA Inc.
• Infraestructura: Hosting de alta velocidad, dominio y soporte siempre incluidos.
• Permanencia mínima: 0 meses (cero amarres).

══════════════════════════════════════════════════════════════
MODALIDAD 2: ARRIENDO CON DERECHO A COMPRA (LEASING A ${leasingMonths} MESES)
══════════════════════════════════════════════════════════════
• Habilitación inicial: ${clp(leasingSetupInitial)} IVA Inc.
• Cuota mensual: ${clp(leasingMonthly)} / mes IVA Inc. (${leasingMonths} cuotas fijas).
• Total 1er Mes: ${clp(leasingFirstMonthTotal)} IVA Inc.
• Traspaso de Propiedad: Al cumplir la cuota ${leasingMonths}, el código fuente y la titularidad del dominio pasan a ser 100% propiedad de su empresa a costo $0.

══════════════════════════════════════════════════════════════
MODALIDAD 3: COMPRA DIRECTA (PAGO ÚNICO CONTADO)
══════════════════════════════════════════════════════════════
• Inversión Total: ${clp(contadoBase)} IVA Inc.
• Cuota Mensual Obligatoria: $0 / mes.
• Propiedad: Dueños del código y plataforma desde el Día 1 en Bóveda Digital.
• Infraestructura Año 1: Hosting Cloud + Dominio .CL 100% incluidos.
• Renovación Técnica (Año 2 en adelante): Solo ${clp(contadoAnualRenewal)} al año (apenas ~$5.000/mes; no se vuelve a pagar el desarrollo).
• Garantía y Soporte: 30 días corridos de afinamiento continuo (posteriores a $15.000/hora).
${includeContadoMaintenance ? `• Plan de Mantención Técnica Opcional: ${clp(contadoMaintenanceMonthly)} / mes (${contadoMaintenancePct}% del monto de compra). Cubre monitoreo 24/7 de caídas, respaldos automáticos, soporte prioritario por WhatsApp y mantención preventiva.` : ''}
${includeAI ? `\n• Módulo Agente IA 24/7: Setup de $490.000 + IVA y mantención fija de $29.000/mes de tokens.` : ''}

Emitimos Factura Electrónica formal con IVA según normativa tributaria vigente.

Quedamos a su entera disposición para resolver cualquier consulta y dar inicio al desarrollo.

Atentamente,
UNIVERSO693 SpA
Ingeniería de Software & Agentes de IA`;
    }
  };

  const handleCopy = (type: 'wsp' | 'email') => {
    const text = generateProposalText(type);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-brand-500 to-amber-600 rounded-xl text-white shadow-lg shadow-brand-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                Calculadora Financiera de Servicios
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulador automático de Arriendo SaaS, Leasing (3 a 24 meses) y Venta Contado con porcentajes y pisos de infraestructura oficiales.
              </p>
            </div>
          </div>
        </div>

        {/* Acciones de Copiado Rápido */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy('wsp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
              copiedType === 'wsp'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60'
            }`}
          >
            {copiedType === 'wsp' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedType === 'wsp' ? '¡Copiado para WhatsApp!' : 'Copiar para WhatsApp'}
          </button>
          <button
            type="button"
            onClick={() => handleCopy('email')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md ${
              copiedType === 'email'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            {copiedType === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedType === 'email' ? '¡Copiado para Correo!' : 'Copiar para Correo'}
          </button>
        </div>
      </div>

      {/* Datos del Prospecto (Opcional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Nombre del Cliente / Empresa (Para personalizar):
          </label>
          <input
            type="text"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Ej: Constructora Asvid SpA"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Nombre del Proyecto o Software:
          </label>
          <input
            type="text"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="Ej: Sitio Web Portafolio de Obras"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* 1. SELECCIÓN DE PLAN / SERVICIO BASE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" /> 1. Selecciona el Servicio o Plan Base:
          </span>
          <button
            type="button"
            onClick={() => setIsCustom(!isCustom)}
            className="text-[11px] font-bold text-brand-400 hover:text-brand-300 transition underline cursor-pointer"
          >
            {isCustom ? '← Volver a Planes Predefinidos' : '⚙️ Ingresar Monto Personalizado'}
          </button>
        </div>

        {!isCustom ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PRESET_PLANS.map(plan => {
              const isSelected = selectedPresetId === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPresetId(plan.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-950/40 border-brand-500 shadow-md shadow-brand-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {plan.tag}
                      </span>
                      {plan.recommended && (
                        <span className="text-[9px] font-extrabold text-amber-400">★ TOP</span>
                      )}
                    </div>
                    <div className="font-bold text-xs text-white leading-snug">{plan.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{plan.sections}</div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80">
                    <div className="text-sm font-extrabold text-white">{clp(plan.basePrice)}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex flex-col gap-0.5">
                      <span className="text-emerald-400 font-semibold">Arriendo: {clp(getPresetSaaS(plan.basePrice))}/m</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Valor Base del Software o Desarrollo (CLP IVA Incluido):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">$</span>
                <input
                  type="number"
                  step="10000"
                  value={customPrice}
                  onChange={e => setCustomPrice(Number(e.target.value))}
                  placeholder="Ej: 850000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
            <div className="text-xs text-slate-400 max-w-sm">
              Ingresa el valor total de venta contado. La calculadora deducirá automáticamente el arriendo perpetuo (4% - 4.5%) y las cuotas de leasing de 3 a 24 meses.
            </div>
          </div>
        )}
      </div>

      {/* 2. CONFIGURACIÓN TÉCNICA Y ESCENARIO DE DOMINIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dominio */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-slate-200">Situación del Dominio Web (.CL / .COM):</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition ${
              domainScenario === 'no-domain'
                ? 'bg-sky-950/40 border-sky-600/70 text-sky-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}>
              <input
                type="radio"
                name="domain"
                checked={domainScenario === 'no-domain'}
                onChange={() => setDomainScenario('no-domain')}
                className="mt-0.5"
              />
              <div>
                <strong className="block text-white">Escenario A: Cliente NO tiene dominio</strong>
                <span>Lo registramos en NIC Chile a nombre de la agencia. <strong>Sirve como garantía de pago</strong> hasta que termine el leasing o durante el arriendo.</span>
              </div>
            </label>

            <label className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition ${
              domainScenario === 'has-domain'
                ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}>
              <input
                type="radio"
                name="domain"
                checked={domainScenario === 'has-domain'}
                onChange={() => setDomainScenario('has-domain')}
                className="mt-0.5"
              />
              <div>
                <strong className="block text-white">Escenario B: Cliente YA tiene dominio propio</strong>
                <span>Aplica incentivo de cortesía con <strong>-$10.000 de descuento</strong> en la habilitación inicial de Arriendo/Leasing ($15.000 ➔ $5.000). En Venta Directa el precio se mantiene íntegro oficial.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Add-ons y Módulos */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-slate-200">Módulos Adicionales (Add-ons):</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* IA */}
            <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition ${
              includeAI
                ? 'bg-brand-950/40 border-brand-500 text-brand-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeAI}
                  onChange={e => setIncludeAI(e.target.checked)}
                  className="rounded text-brand-500 focus:ring-0"
                />
                <div>
                  <strong className="text-white flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-brand-400" /> Agente de Atención con IA 24/7
                  </strong>
                  <span className="text-[11px] text-slate-400">Atiende en web y deriva a WhatsApp con ficha técnica</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-xs text-white">+$490.000 + IVA</div>
                <div className="text-[10px] text-brand-400 font-semibold">+ $29.000/mes tokens</div>
              </div>
            </label>

            {/* Webpay */}
            <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition ${
              includeWebpay
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeWebpay}
                  onChange={e => setIncludeWebpay(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-0"
                />
                <div>
                  <strong className="text-white">Pasarela Webpay Plus / Pagos Online</strong>
                  <span className="text-[11px] text-slate-400 block">Integración de tarjetas de débito/crédito</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-xs text-white">+$45.000 setup</div>
              </div>
            </label>

            {/* Horas extras */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-slate-300 text-xs">Bolsa de horas técnicas adicionales ($15.000/hr):</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExtraHours(Math.max(0, extraHours - 1))}
                  className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="text-xs font-bold text-white w-6 text-center">{extraHours}h</span>
                <button
                  type="button"
                  onClick={() => setExtraHours(extraHours + 1)}
                  className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SELECTOR DE PLAZO DE LEASING (3 A 24 MESES) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> 2. Plazo de Financiamiento en Leasing (Derecho a Compra):
            </span>
            <span className="text-[11px] text-slate-400">
              Selecciona entre 3 y 24 meses para calcular la cuota exacta de amortización con hosting incluido.
            </span>
          </div>

          {/* Presets de meses rápidos */}
          <div className="flex items-center gap-1.5">
            {[6, 12, 18, 24].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setLeasingMonths(m)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  leasingMonths === m
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {m} meses
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <input
            type="range"
            min="3"
            max="24"
            step="1"
            value={leasingMonths}
            onChange={e => setLeasingMonths(Number(e.target.value))}
            className="flex-1 accent-cyan-500 cursor-pointer"
          />
          <div className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-200 font-extrabold text-sm shrink-0">
            {leasingMonths} Meses
          </div>
        </div>
      </div>

      {/* 4. RESULTADOS: LAS 3 MODALIDADES COMPARATIVAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* MODALIDAD 1: ARRIENDO PERPETUO */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                1. ARRIENDO MENSUAL (SaaS)
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">0 Amarres</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Suscripción Flexible</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Hosting, dominio y mantenimiento continuo siempre cubiertos.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Habilitación Inicial:</span>
                <strong className="text-slate-200">{clp(saasSetupInitial)}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Primer Mes:</span>
                <strong className="text-white font-bold">{clp(saasFirstMonthTotal)}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Permanencia mínima:</span>
                <strong className="text-emerald-400">0 meses</strong>
              </div>
              {includeAI && (
                <div className="flex justify-between text-brand-300 text-[11px]">
                  <span>Incluye Tokens IA:</span>
                  <strong>+$15.000/mes</strong>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Mensualidad Fija:
            </span>
            <div className="text-2xl font-black text-white">{clp(saasMonthly)}</div>
            <span className="text-[10.5px] text-slate-400 block mt-0.5">
              IVA Incluido &bull; Renovación automática
            </span>
            {activeBasePrice <= 150000 ? (
              <div className="mt-2 text-[10px] bg-slate-950/80 border border-slate-800/80 p-2 rounded-lg text-slate-400">
                💡 <em>Piso mínimo de $15.000/mes aplicado (cubre $7.500 de servidor cloud + $7.500 utilidad neta).</em>
              </div>
            ) : activeBasePrice <= 300000 ? (
              <div className="mt-2 text-[10px] bg-emerald-950/40 border border-emerald-900/60 p-2 rounded-lg text-emerald-300">
                🛒 <em>Arriendo Pyme proporcional (~10% del valor base). Cubre hosting transaccional, soporte continuo y seguridad.</em>
              </div>
            ) : (
              <div className="mt-2 text-[10px] bg-slate-950/80 border border-slate-800/80 p-2 rounded-lg text-slate-400">
                🏢 <em>Tarifa corporativa escalada (4.0% - 4.5% mensual) para plataformas y sistemas de alto tráfico.</em>
              </div>
            )}
          </div>
        </div>

        {/* MODALIDAD 2: LEASING INTERACTIVO */}
        <div className="bg-gradient-to-b from-cyan-950/40 to-slate-900 border-2 border-cyan-500/80 rounded-2xl p-5 flex flex-col justify-between relative shadow-xl shadow-cyan-950/30">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-900 text-cyan-200 border border-cyan-700">
                2. DERECHO A COMPRA
              </span>
              <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                {leasingMonths} Cuotas
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Leasing a {leasingMonths} Meses</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Al mes {leasingMonths} el código y dominio son <strong>100% del cliente a costo $0</strong>.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs border-t border-cyan-800/60">
              <div className="flex justify-between text-slate-300">
                <span>Habilitación Inicial:</span>
                <strong className="text-white">{clp(leasingSetupInitial)}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Primer Mes:</span>
                <strong className="text-cyan-300 font-bold">{clp(leasingFirstMonthTotal)}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hosting en financiamiento:</span>
                <strong className="text-emerald-400">Cubierto Año 1</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Traspaso final (mes {leasingMonths}):</span>
                <strong className="text-emerald-400">$0 (100% suyo)</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-cyan-800/60">
            <span className="text-[10px] text-cyan-300 uppercase tracking-wider block font-semibold">
              Cuota Mensual ({leasingMonths} meses):
            </span>
            <div className="text-2xl font-black text-cyan-200">{clp(leasingMonthly)}</div>
            <span className="text-[10.5px] text-slate-400 block mt-0.5">
              Total contrato: {clp(leasingTotalContract)} IVA Inc.
            </span>
            <div className="mt-2 text-[10px] bg-slate-950/80 border border-cyan-900/60 p-2 rounded-lg text-slate-300">
              🚀 <em>Terminado el mes {leasingMonths}, si decide quedarse en nuestros servidores solo renueva hosting por $60.000/año.</em>
            </div>
          </div>
        </div>

        {/* MODALIDAD 3: COMPRA CONTADO */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                3. VENTA DIRECTA (CONTADO)
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">$0 Cuota</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Propiedad 100% Día 1</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Código fuente, credenciales y dominio entregados de inmediato.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 text-xs border-t border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Cuota Mensual Obligatoria:</span>
                <strong className="text-emerald-400 font-bold">$0 / mes</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Hosting + Dominio .CL:</span>
                <strong className="text-emerald-400">Incluido Año 1 ($0)</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Soporte Garantizado:</span>
                <strong className="text-slate-200">30 días corridos</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Renovación técnica (Año 2+):</span>
                <strong className="text-slate-200">{clp(contadoAnualRenewal)} / año</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Pago Único de Compra:
              </span>
              <div className="text-2xl font-black text-emerald-400">{clp(contadoBase)}</div>
              <span className="text-[10.5px] text-slate-400 block mt-0.5">
                IVA Incluido &bull; Factura electrónica formal
              </span>
            </div>

            {/* COTIZADOR DE MANTENCIÓN MENSUAL OPCIONAL */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-cyan-400" /> Cotizar Mantención Mensual:
                </span>
                <input
                  type="checkbox"
                  checked={includeContadoMaintenance}
                  onChange={e => setIncludeContadoMaintenance(e.target.checked)}
                  className="rounded text-brand-500 focus:ring-0"
                />
              </label>

              {includeContadoMaintenance && (
                <div className="space-y-2 pt-1 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>% del monto compra:</span>
                    <div className="flex items-center gap-1">
                      {[3, 4, 5].map(pct => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setContadoMaintenancePct(pct)}
                          className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition cursor-pointer ${
                            contadoMaintenancePct === pct
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-[11px] text-slate-300 font-medium">Cuota Mantención:</span>
                    <strong className="text-sm font-extrabold text-cyan-300">
                      {clp(contadoMaintenanceMonthly)} <span className="text-[10px] text-slate-400 font-normal">/ mes</span>
                    </strong>
                  </div>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    Respaldos cloud automáticos, monitoreo 24/7, soporte prioritario por WhatsApp y mantención preventiva continua.
                  </p>
                </div>
              )}
            </div>

            <div className="text-[10px] bg-slate-950/80 border border-slate-800/80 p-2 rounded-lg text-slate-400">
              ✨ <em>Horas posteriores a los 30 días sin plan de mantención se cobran a tarifa preferencial de $15.000 / hora.</em>
            </div>
          </div>
        </div>
      </div>

      {/* 5. GUÍA COMERCIAL Y TIPS DE CIERRE PARA EL EQUIPO (ALEXIS & MARTÍN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Playbook Comercial */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-white font-bold">
            <Briefcase className="w-4 h-4 text-brand-400" />
            <span>Guía de Cierre Comercial (Cómo negociar con el cliente):</span>
          </div>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Si el cliente dice "No tengo plata ahora":</strong> Ofrécele el Arriendo SaaS de $15.000/mes o el Leasing a 24 meses (${clp(leasingMonthly)}/mes). Nadie puede decir que no a $500 pesos diarios.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Si el cliente dice "Quiero ser dueño pero en cuotas":</strong> Ofrécele el Leasing a 12 o 24 meses. Explícale que es igual a comprar un auto en leasing: al terminar la última cuota, la titularidad es 100% de él a costo $0.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Si el cliente ya tiene dominio:</strong> Dale los $10.000 de descuento en el primer mes como premio y pídele que solo cree los registros DNS tipo A y CNAME.</span>
            </li>
          </ul>
        </div>

        {/* Reglas Técnicas Innegociables */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Reglas de Oro de Rentabilidad (No negociables):</span>
          </div>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold shrink-0">•</span>
              <span><strong>Piso mínimo de $15.000/mes:</strong> Aunque el plan sea muy barato ($150.000), nunca cobrar menos de $15.000 en arriendo perpetuo porque $7.500 van a infraestructura y los otros $7.500 son la ganancia mínima para que valga la pena.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold shrink-0">•</span>
              <span><strong>La IA siempre cobra $29.000/mes:</strong> Si el cliente pide Agente de IA, NUNCA se regala la mensualidad de tokens porque los modelos de IA y servidores se facturan por consulta.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold shrink-0">•</span>
              <span><strong>Retención del Dominio en NIC Chile:</strong> Si nosotros compramos el dominio, se inscribe a nuestro nombre hasta que el cliente pague la cuota 12 o 24 del leasing. Esa es nuestra mejor garantía anti-impagos.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

