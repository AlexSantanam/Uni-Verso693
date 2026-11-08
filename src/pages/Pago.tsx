import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  HelpCircle,
  Loader2,
  Lock,
  MessageSquare,
  QrCode,
  ShieldCheck,
  Sparkles,
  Store,
  UtensilsCrossed,
  XCircle,
} from 'lucide-react';
import { useLang } from '../lib/lang';
import { Container, Eyebrow } from '../components/ui';

interface PresetItem {
  id: string;
  title: string;
  category: 'sokify' | 'universo693';
  amount: number;
  amountUsd: number;
  description: string;
  frequency: string;
  badge?: string;
  icon: string;
}

const ITEMS: PresetItem[] = [
  {
    id: 'sokify-mensual',
    title: 'Sokify · Plan Mensual',
    category: 'sokify',
    amount: 15900,
    amountUsd: 16,
    description: 'Sistema Operativo Gastronómico (Menú QR, KDS Cocina, POS y pedidos ilimitados).',
    frequency: 'CLP / mes ($16 USD)',
    badge: 'Popular',
    icon: '🍽️',
  },
  {
    id: 'sokify-anual',
    title: 'Sokify · Plan Anual Fundador',
    category: 'sokify',
    amount: 69000,
    amountUsd: 69,
    description: '1 año completo de Sokify todo incluido. Equivale a solo $5.750 CLP / $5.75 USD al mes.',
    frequency: 'CLP / año ($69 USD)',
    badge: 'Ahorro 64%',
    icon: '💎',
  },
  {
    id: 'sokify-anual-ia',
    title: 'Sokify · Anual + Copiloto IA WhatsApp',
    category: 'sokify',
    amount: 88900,
    amountUsd: 89,
    description: '1 año de sistema completo + Copiloto Sofi IA 24/7 atendiendo tu WhatsApp.',
    frequency: 'CLP / año ($89 USD)',
    badge: 'Pack Completo',
    icon: '🤖',
  },
  {
    id: 'sokify-dominio',
    title: 'Dominio Propio + Correos Ilimitados',
    category: 'sokify',
    amount: 6900,
    amountUsd: 7,
    description: 'Dominio propio (.CL, .COM, etc.) y casillas corporativas ilimitadas para tu local.',
    frequency: 'CLP / mes ($7 USD)',
    icon: '🌐',
  },
  {
    id: 'sokify-ia-whatsapp',
    title: 'Copiloto Sofi IA WhatsApp',
    category: 'sokify',
    amount: 19900,
    amountUsd: 20,
    description: 'Atención 24/7 y toma de pedidos con inteligencia artificial en tu WhatsApp oficial.',
    frequency: 'CLP / mes ($20 USD)',
    icon: '🤖',
  },
  {
    id: 'sokify-sii',
    title: 'Facturación Electrónica Directa',
    category: 'sokify',
    amount: 9900,
    amountUsd: 10,
    description: 'Emisión automática de boletas y facturas tributarias desde el punto de venta.',
    frequency: 'CLP / mes ($10 USD)',
    icon: '🧾',
  },
  {
    id: 'ebs-693',
    title: 'Diagnóstico EBS 693',
    category: 'universo693',
    amount: 197000,
    amountUsd: 197,
    description: 'Sesión estratégica de 45 min con arquitecto senior. Hoja de ruta técnica y ROI.',
    frequency: 'Pago único ($197 USD)',
    icon: '🧠',
  },
  {
    id: 'audit-pro',
    title: 'AUDIT 693 PRO',
    category: 'universo693',
    amount: 19990,
    amountUsd: 21,
    description: 'Informe de Fugas de Dinero, análisis de competencia y costos manuales en PDF.',
    frequency: 'Pago único ($21 USD)',
    icon: '📊',
  },
  {
    id: 'impulsa-pyme',
    title: 'Impulsa PyME · Sitio Web Todo Incluido',
    category: 'universo693',
    amount: 19900,
    amountUsd: 20,
    description: 'Sitio web corporativo de alta velocidad con hosting en la nube y mantención.',
    frequency: 'CLP / mes ($20 USD)',
    icon: '🌱',
  },
];

export const Pago: React.FC = () => {
  const { lang, setLang } = useLang();
  const [params] = useSearchParams();

  // Sincronizar idioma si viene en la URL (?lang=en) o detectar inglés
  useEffect(() => {
    const langParam = params.get('lang');
    if (langParam === 'en' || langParam === 'es') {
      setLang(langParam as 'en' | 'es');
    } else {
      const navLang = (navigator.language || '').toLowerCase();
      if (navLang.startsWith('en')) {
        setLang('en');
      }
    }
  }, [params, setLang]);

  const es = lang === 'es';

  // Estados de la URL
  const initialItemId = params.get('item') || 'sokify-mensual';
  const initialRef = params.get('ref') || '';
  const initialAmount = params.get('amount') ? parseInt(params.get('amount') || '0', 10) : 0;
  const initialName = params.get('clientName') || params.get('name') || '';
  const initialEmail = params.get('clientEmail') || params.get('email') || '';
  const initialPhone = params.get('clientPhone') || params.get('phone') || '';
  const initialRut = params.get('rut') || '';
  const initialCurrency = params.get('currency');
  const initialMethodParam = params.get('method');
  const isPaypalInitial = initialMethodParam === 'paypal' || initialCurrency === 'USD';
  const initialMethod = initialMethodParam === 'transferencia' ? 'transferencia' : isPaypalInitial ? 'paypal' : 'mercadopago';
  const statusParam = params.get('status');
  const orderIdParam = params.get('orderId');

  // Estado del formulario
  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialAmount > 0 ? 'custom' : ITEMS.some((i) => i.id === initialItemId) ? initialItemId : 'sokify-mensual'
  );
  const [customTitle, setCustomTitle] = useState<string>('Abono de Servicio Uni-Verso693');
  const [customAmount, setCustomAmount] = useState<number>(initialAmount || 50000);

  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'paypal' | 'transferencia'>(initialMethod);

  // Autodetección de ubicación geográfica para visitantes internacionales
  useEffect(() => {
    if (params.get('method') || params.get('currency')) return;
    try {
      const tz = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';
      if (tz && !tz.includes('Santiago') && !tz.includes('Easter') && !tz.includes('Chile')) {
        setPaymentMethod('paypal');
      }
    } catch (e) {
      // Ignorar fallback silencioso
    }
  }, [params]);

  const [fullName, setFullName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [phone, setPhone] = useState<string>(initialPhone);
  const [rut, setRut] = useState<string>(initialRut);
  const [restaurantSlug, setRestaurantSlug] = useState<string>(initialRef);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);

  // Calcular item actual y monto
  const currentItem = ITEMS.find((i) => i.id === selectedItemId);
  const isCustom = selectedItemId === 'custom' || !currentItem;
  const finalTitle = isCustom ? customTitle : currentItem.title;
  const finalAmount = isCustom ? customAmount : currentItem.amount;
  const finalAmountUsd = isCustom
    ? Math.max(1, Math.round(finalAmount / 950))
    : (currentItem?.amountUsd || Math.max(1, Math.round(finalAmount / 950)));

  const handleCopyBankDetails = () => {
    const text = `UNIVERSO693 SpA
RUT: 77.834.693-1
Banco Santander
Cuenta Corriente: 84729104
Email: contacto@universo693.com
Asunto: Pago ${finalTitle} (${restaurantSlug || 'Web'})`;

    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes('@')) {
      setErrorMsg(es ? 'Ingresa un correo electrónico válido para enviarte el comprobante.' : 'Please enter a valid email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: paymentMethod === 'paypal' ? 'paypal' : 'mercadopago',
          item: selectedItemId,
          title: finalTitle,
          amount: finalAmount,
          amountUsd: finalAmountUsd,
          fullName: fullName || 'Cliente',
          email,
          phone,
          rut,
          restaurantSlug,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || 'No se pudo generar la orden de pago.');
      }

      // Redirigir al checkout oficial (Mercado Pago o PayPal)
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error conectando con la pasarela.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-16 sm:py-24 relative overflow-hidden">
      {/* Glows de fondo */}
      <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      <Container className="relative max-w-5xl space-y-10">
        {/* BANNER DE RETORNO SI SE COMPLETÓ EL PAGO */}
        {statusParam === 'success' && (
          <div className="p-6 rounded-3xl bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100 shadow-2xl flex flex-col sm:flex-row items-center gap-4 animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 shrink-0" />
            <div className="space-y-1 text-center sm:text-left flex-1">
              <h3 className="text-xl font-black text-white">¡Pago Aprobado con Éxito!</h3>
              <p className="text-sm text-emerald-200">
                Tu transacción ({orderIdParam || 'ID'}) ha sido confirmada por Mercado Pago. Recibirás tu comprobante tributario en tu correo electrónico.
              </p>
            </div>
            {restaurantSlug ? (
              <a
                href={`https://sokify.app/panel.html?r=${encodeURIComponent(restaurantSlug)}`}
                className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition"
              >
                Volver a mi Panel Sokify &rarr;
              </a>
            ) : (
              <Link to="/" className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition">
                Ir al Inicio
              </Link>
            )}
          </div>
        )}

        {statusParam === 'failure' && (
          <div className="p-6 rounded-3xl bg-red-950/80 border-2 border-red-500 text-red-100 shadow-2xl flex items-center gap-4 animate-in fade-in">
            <XCircle className="w-10 h-10 text-red-400 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">El pago no pudo completarse</h3>
              <p className="text-xs text-red-200">La transacción fue rechazada o cancelada en Mercado Pago. Puedes intentar nuevamente con otro medio de pago o transferencia bancaria.</p>
            </div>
          </div>
        )}

        {/* ENCABEZADO PRINCIPAL */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold text-cyan-200">
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            {es ? 'Portal Seguro de Pagos · Uni-Verso693 & Sokify' : 'Secure Payment Portal · Uni-Verso693 & Sokify'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {es ? (
              <>
                Paga de forma rápida y segura con{' '}
                <span className="text-gradient-brand">
                  {paymentMethod === 'paypal' ? 'PayPal USD' : paymentMethod === 'transferencia' ? 'Transferencia Bancaria' : 'Mercado Pago'}
                </span>
              </>
            ) : (
              <>
                Fast and secure checkout with{' '}
                <span className="text-gradient-brand">
                  {paymentMethod === 'paypal' ? 'PayPal USD' : paymentMethod === 'transferencia' ? 'Bank Transfer' : 'Mercado Pago'}
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {paymentMethod === 'paypal'
              ? (es ? 'Aceptamos pagos internacionales en Dólares (USD) con saldo PayPal o tarjetas de crédito/débito de cualquier país.' : 'We accept international payments in USD with PayPal or credit/debit cards from anywhere in the world.')
              : es
              ? 'Tarjetas de crédito en cuotas, tarjetas de débito, Webpay Plus y saldo Mercado Pago sin comisiones adicionales. Factura electrónica válida.'
              : 'Credit cards in installments, debit cards, Webpay Plus, and Mercado Pago account balance. Official tax invoices provided.'}
          </p>
        </div>

        {/* CONTENEDOR PRINCIPAL: SELECTOR Y FORMULARIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMNA IZQUIERDA: SELECTOR DE SERVICIO / PLAN */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>📦</span>
                <span>Selecciona el plan o servicio a pagar:</span>
              </h3>
            </div>

            {/* SECCIÓN SOKIFY */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                Plataforma Gastronómica Sokify
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                {ITEMS.filter((i) => i.category === 'sokify').map((item) => {
                  const isSel = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSel
                          ? 'border-purple-500 bg-purple-950/30 shadow-lg shadow-purple-900/20'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xl">{item.icon}</span>
                          {item.badge && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-tight">{item.description}</p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-white/5 flex items-baseline justify-between">
                        <span className="text-lg font-black font-mono text-emerald-400">
                          {paymentMethod === 'paypal' ? `$${item.amountUsd} USD` : `$${item.amount.toLocaleString('es-CL')}`}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {paymentMethod === 'paypal' ? (item.frequency.includes('/ año') ? '/ año' : '/ mes') : item.frequency}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN UNIVERSO693 */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Servicios de Ingeniería & Diagnóstico Uni-Verso693
              </span>
              <div className="grid sm:grid-cols-2 gap-3">
                {ITEMS.filter((i) => i.category === 'universo693').map((item) => {
                  const isSel = selectedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItemId(item.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSel
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-900/20'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <span className="text-xl">{item.icon}</span>
                        <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-tight">{item.description}</p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-white/5 flex items-baseline justify-between">
                        <span className="text-lg font-black font-mono text-cyan-300">
                          {paymentMethod === 'paypal' ? `$${item.amountUsd} USD` : `$${item.amount.toLocaleString('es-CL')}`}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {paymentMethod === 'paypal' ? (item.frequency.includes('/ mes') ? '/ mes' : 'Pago único') : item.frequency}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Opción Personalizada */}
                <div
                  onClick={() => setSelectedItemId('custom')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedItemId === 'custom'
                      ? 'border-amber-400 bg-amber-950/30 shadow-lg shadow-amber-900/20'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="text-xl">✍️</span>
                    <h4 className="text-xs font-bold text-white">Monto Personalizado / Abono</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">Paga una cotización específica o cuota acordada con el equipo.</p>
                  </div>
                  <div className="pt-3 mt-2 border-t border-white/5 text-[11px] font-mono text-amber-300 font-bold">
                    Ingresar monto libre &rarr;
                  </div>
                </div>
              </div>
            </div>

            {/* Si eligió personalizado, inputs para definir título y monto */}
            {isCustom && (
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3 animate-in fade-in">
                <span className="text-xs font-bold text-amber-300 block">Detalles del Pago Personalizado:</span>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">Concepto / Glosa:</label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Ej: Cuota 1 Desarrollo App"
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Monto en CLP ($):</label>
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Math.max(1000, parseInt(e.target.value || '0', 10)))}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: CHECKOUT Y FORMULARIO */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b1220] to-[#060b14] p-6 sm:p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Resumen a pagar</span>
                  <h3 className="text-base font-black text-white">{finalTitle}</h3>
                </div>
                <div className="text-right">
                  {paymentMethod === 'paypal' ? (
                    <>
                      <span className="text-2xl font-black font-mono text-blue-400">${finalAmountUsd} USD</span>
                      <span className="text-[10px] font-mono text-slate-400 block">~${finalAmount.toLocaleString('es-CL')} CLP</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-black font-mono text-emerald-400">${finalAmount.toLocaleString('es-CL')}</span>
                      <span className="text-[10px] font-mono text-slate-400 block">CLP (~${finalAmountUsd} USD)</span>
                    </>
                  )}
                </div>
              </div>

              {/* TABS DE MÉTODO DE PAGO (MERCADO PAGO · PAYPAL · TRANSFERENCIA) */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'mercadopago' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Mercado Pago</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'paypal' ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="font-mono font-bold">🅿️</span>
                  <span className="truncate">PayPal USD</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`py-2 px-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'transferencia' ? 'bg-emerald-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🏦</span>
                  <span className="truncate">Transferencia</span>
                </button>
              </div>

              {/* CASO A & B: CHECKOUT ONLINE (MERCADO PAGO O PAYPAL) */}
              {paymentMethod === 'mercadopago' || paymentMethod === 'paypal' ? (
                <form onSubmit={handleCheckout} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Nombre o Razón Social *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Juan Pérez / Resto Bar SpA"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Teléfono / WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">RUT / Tax ID (opcional)</label>
                      <input
                        type="text"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        placeholder="RUT o Identificador Fiscal"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Local / Ref (opcional)</label>
                      <input
                        type="text"
                        value={restaurantSlug}
                        onChange={(e) => setRestaurantSlug(e.target.value)}
                        placeholder="slug o nombre local"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  {errorMsg && <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs font-medium">{errorMsg}</div>}

                  {paymentMethod === 'paypal' ? (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Conectando con PayPal...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-white" />
                          <span>Pagar con PayPal (${finalAmountUsd} USD) &rarr;</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Conectando con Mercado Pago...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-slate-950" />
                          <span>Pagar con Mercado Pago (${finalAmount.toLocaleString('es-CL')} CLP) &rarr;</span>
                        </>
                      )}
                    </button>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span>🔒 Cifrado TLS 256-bit</span>
                    <span>·</span>
                    <span>Tarjetas Visa, Mastercard, AMEX</span>
                    <span>·</span>
                    {paymentMethod === 'paypal' ? (
                      <span className="text-blue-400 font-bold">PayPal Global en USD</span>
                    ) : (
                      <span>Webpay Plus & Débito</span>
                    )}
                  </div>
                </form>
              ) : (
                /* CASO B: TRANSFERENCIA BANCARIA DIRECTA */
                <div className="space-y-4 text-xs animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-slate-300">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="font-bold text-white">Datos Bancarios Oficiales</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">0% COMISIÓN</span>
                    </div>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-400">Razón Social:</span> <strong className="text-white">UNIVERSO693 SpA</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">RUT:</span> <strong className="text-white">77.834.693-1</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Banco:</span> <strong className="text-white">Banco Santander Chile</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Tipo de Cuenta:</span> <strong className="text-white">Cuenta Corriente</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">N° de Cuenta:</span> <strong className="text-white">84729104</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Correo Comprobantes:</span> <strong className="text-cyan-300">contacto@universo693.com</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Monto exacto:</span>{' '}
                        <strong className="text-emerald-400">${finalAmount.toLocaleString('es-CL')} CLP</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyBankDetails}
                      className="w-full py-3 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Copy className="w-4 h-4 text-cyan-300" />
                      <span>{copiedBank ? '✓ ¡Datos Copiados al Portapapeles!' : 'Copiar Datos Bancarios'}</span>
                    </button>

                    <a
                      href={`https://wa.me/56990387414?text=${encodeURIComponent(
                        `Hola Uni-Verso693, acabo de transferir $${finalAmount.toLocaleString('es-CL')} CLP por "${finalTitle}" (${restaurantSlug || 'Ref Web'}). Adjunto comprobante:`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enviar Comprobante por WhatsApp &rarr;</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* TRUST BADGE */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Facturación Inmediata & Garantía Técnica</span>
              </div>
              <p>
                Cada pago cuenta con emisión de factura electrónica exenta o afecta emitida por <strong>UNIVERSO693 SpA</strong> y garantía de activación inmediata en menos de 2 horas.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Pago;
