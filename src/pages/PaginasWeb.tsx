import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Globe,
  Zap,
  ShieldCheck,
  Search,
  Smartphone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  PhoneCall,
  Clock,
  Code2,
  Mail,
  Send,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Users,
  Laptop,
  ShoppingBag,
  CreditCard,
  Bot,
} from 'lucide-react';
import { Container } from '../components/ui';
import { WHATSAPP_NUMBER, whatsappLink } from '../data/site';

interface AuditResult {
  domain: string;
  email: string;
  phone?: string;
  score: number;
  speedMobile: number;
  seoScore: number;
  securityScore: number;
  issues: { type: 'danger' | 'warning'; title: string; text: string }[];
  positives: string[];
  recommendation: string;
}

export const PaginasWeb: React.FC = () => {
  const navigate = useNavigate();
  const [domainInput, setDomainInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [emailSentNotice, setEmailSentNotice] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domainInput.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const cleanEmail = emailInput.trim();
    if (!cleanDomain || !cleanEmail) return;

    setIsScanning(true);
    setAuditResult(null);
    setEmailSentNotice(false);
    setScanStep(1);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 900);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: `https://${cleanDomain}`,
          domain: cleanDomain,
          email: cleanEmail,
          fullName: cleanDomain,
          phone: phoneInput.trim() || undefined,
          lang: 'es',
        }),
      });

      clearInterval(stepInterval);
      const data = await res.json();

      if (res.ok && data.id) {
        try {
          sessionStorage.setItem(`audit_${data.id}`, JSON.stringify(data));
          sessionStorage.setItem(`audit_domain_${cleanDomain}`, JSON.stringify(data));
        } catch {}

        navigate(`/auditoria/${data.id}?d=${encodeURIComponent(data.domain || cleanDomain)}&e=${encodeURIComponent(cleanEmail)}`);
      } else {
        throw new Error(data.error || 'No pudimos analizar el sitio.');
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.warn('Real scan fallback:', err);
      const uniqueId = `uni-${Math.random().toString(36).substring(2, 10)}`;
      navigate(`/auditoria/${uniqueId}?d=${encodeURIComponent(cleanDomain)}&e=${encodeURIComponent(cleanEmail)}`);
    } finally {
      setIsScanning(false);
    }
  };

  const getWaLinkForAudit = () => {
    if (!auditResult) {
      return whatsappLink('Hola UNIVERSO693, me interesa cotizar una página web para mi negocio.');
    }
    const msg = `Hola UNIVERSO693, acabo de auditar mi web ${auditResult.domain} en su sitio y obtuve nota ${auditResult.score}/100. Mi correo es ${auditResult.email}. Me gustaría conversar para renovar u optimizar mi web con ustedes.`;
    return whatsappLink(msg);
  };

  return (
    <div className="bg-white text-slate-900 font-sans antialiased selection:bg-cyan-100 selection:text-cyan-900">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-xs py-2 px-4 text-center font-medium">
        <span className="inline-flex items-center gap-1.5 text-cyan-300 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Servicio Especial para Empresas y Profesionales en Chile:
        </span>{' '}
        Sitios web que cargan en 1 segundo y convierten visitas en llamadas de WhatsApp. Entrega en 5 a 10 días.
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-bold text-cyan-800 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-cyan-600 fill-cyan-600" />
              <span>Desarrollo Web de Alta Velocidad · Sin Plantillas Lentas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Una página web que carga en 1 segundo y te muestra en Google{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
                antes que tu competencia
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Desarrollamos páginas web y landing pages con <strong>código propio</strong> para pymes, clínicas, restaurantes y empresas de todo Chile. Cero cobros mensuales obligatorios, velocidad de carga garantizada y listas para vender.
            </p>

            {/* Quick trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Entrega en 5 a 10 días</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% código tuyo (sin letras chicas)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Factura exenta o afecta con RUT local</span>
              </div>
            </div>

            {/* Interactive Audit Scanner Box */}
            <div className="pt-8 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 sm:p-8 text-left transition-all">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Search className="w-5 h-5 text-cyan-600" />
                      Audita tu web actual gratis y recibe el informe en tu correo
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Descubre si tu web actual está lenta, mal posicionada o perdiendo cotizaciones.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 font-bold">
                    Escáner en vivo
                  </span>
                </div>

                <form onSubmit={handleScan} className="space-y-3">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tu sitio web (obligatorio):
                      </label>
                      <input
                        type="text"
                        value={domainInput}
                        onChange={(e) => setDomainInput(e.target.value)}
                        placeholder="ejemplo.cl o tuempresa.com"
                        required
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent placeholder:text-slate-400 bg-slate-50/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-cyan-600" />
                          <span>Tu correo electrónico (obligatorio):</span>
                        </label>
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="tu@empresa.cl"
                          required
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent placeholder:text-slate-400 bg-slate-50/50"
                        />
                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                          Te enviaremos el reporte para que puedas compartirlo con tus socios.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tu WhatsApp (opcional):</span>
                        </label>
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="+56 9 1234 5678"
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent placeholder:text-slate-400 bg-slate-50/50"
                        />
                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                          Para avisarte rápidamente cuando el informe esté listo.
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isScanning}
                    className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-6 shadow-md shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-70 text-sm sm:text-base"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analizando tu web y generando informe...</span>
                      </>
                    ) : (
                      <>
                        <span>Analizar mi web gratis y recibir informe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Progress feedback while scanning */}
                {isScanning && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Rastreando {domainInput}...</span>
                      <span>Paso {scanStep} de 3</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-cyan-600 h-full transition-all duration-500"
                        style={{ width: `${(scanStep / 3) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {scanStep === 1 && 'Evaluando velocidad móvil y Core Web Vitals...'}
                      {scanStep === 2 && 'Revisando etiquetas de Google, indexación y presencia en IA...'}
                      {scanStep === 3 && 'Verificando cabeceras de seguridad y botones de conversión...'}
                    </p>
                  </div>
                )}

                {/* Audit Result Box */}
                {auditResult && !isScanning && (
                  <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in duration-300">
                    {/* Email confirmation notice */}
                    {emailSentNotice && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>¡Informe generado con éxito!</strong> Se ha enviado una copia a{' '}
                          <span className="font-semibold underline">{auditResult.email}</span> para que puedas reenviarla a tus socios o equipo de trabajo.
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Auditoría para:</span>
                        <div className="text-xl font-black text-slate-900">{auditResult.domain}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-500">Puntaje Global</span>
                          <div className={`text-3xl font-black ${auditResult.score >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>
                            {auditResult.score}/100
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${auditResult.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>
                          {auditResult.score >= 80 ? 'Óptimo' : 'Mejorable'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Velocidad Móvil</span>
                        <span className="text-lg font-extrabold text-slate-900">{auditResult.speedMobile}/100</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">SEO & Google</span>
                        <span className="text-lg font-extrabold text-slate-900">{auditResult.seoScore}/100</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Seguridad HTTP</span>
                        <span className="text-lg font-extrabold text-slate-900">{auditResult.securityScore}/100</span>
                      </div>
                    </div>

                    {/* Critical Issues */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        Puntos críticos que están frenando tus cotizaciones:
                      </span>
                      {auditResult.issues.map((iss, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm space-y-1">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            {iss.type === 'danger' ? (
                              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            )}
                            <span>{iss.title}</span>
                          </div>
                          <p className="text-slate-600 text-xs pl-3.5 leading-relaxed">{iss.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Strengths */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Activos a tu favor:
                      </span>
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {auditResult.positives.map((pos, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{pos}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-xs sm:text-sm text-cyan-950 leading-relaxed">
                      <strong>Diagnóstico Ejecutivo:</strong> {auditResult.recommendation}
                    </div>

                    <div className="pt-2 space-y-2">
                      <a
                        href={getWaLinkForAudit()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 shadow-md shadow-emerald-600/20 transition-all text-sm sm:text-base"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Conversar por WhatsApp para optimizar esta web</span>
                      </a>
                      <p className="text-center text-[11px] text-slate-500">
                        Un especialista de UNIVERSO693 te responderá en menos de 2 horas con una propuesta a tu medida.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Difference Section (Clean vs WordPress) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">
              ¿Por qué UNIVERSO693?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              La diferencia entre una web lenta y una web que vende
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              La mayoría de las agencias te instalan una plantilla de WordPress pesada con 30 plugins que tardan 5 segundos en cargar y te amarran a mensualidades obligatorias. Nosotros trabajamos distinto:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-cyan-400 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Carga en 1 segundo</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                El 53% de las personas abandona una web si tarda más de 3 segundos en abrir. Nuestras webs están hechas con código ligero de última generación que vuela en cualquier teléfono móvil o red 4G.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-cyan-400 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Cero mensualidades forzosas</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                El código y la web son 100% de tu propiedad. No te cobramos tarifas mensuales de arriendo ni te secuestramos las claves. Si un día quieres cambiar algo, tienes las llaves completas en tu mano.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-cyan-400 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Preparadas para Google e IA</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Incluimos optimización técnica de etiquetas (SEO) y estructura de respuesta para que cuando un cliente busque en Google o pregunte a ChatGPT o Perplexity por tu rubro, tu empresa sea citada.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing / Packages Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="planes">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-black text-cyan-700 uppercase tracking-widest bg-cyan-100/70 px-3.5 py-1 rounded-full border border-cyan-200">
              Precios Transparentes · Cero Letra Chica
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Planes Web Clave en Mano
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Precios claros con IVA incluido, hosting y dominio .CL por 1 año, entrega rápida garantizada y factura formal chilena.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {/* PLAN 1: PLAN START */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Start</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950">$ 150.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Página Web de hasta 4 Secciones de contenido.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 5 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Optimizado para Convertir:</strong> Visitas en Clientes y ventas al instante.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Botón Directo a WhatsApp:</strong> con mensaje personalizado listo para chatear.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Autoadministrable:</strong> fácil y rápido de actualizar sin programar.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> profesional incluido por 1 año completo.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Certificado SSL:</strong> candado de seguridad y velocidad de carga ultrarrápida.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Start ($150.000 IVA Incluido) para mi página web.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>

            {/* PLAN 2: PLAN PRO (MÁS ELEGIDO) */}
            <div className="bg-white rounded-3xl border-2 border-cyan-600 shadow-xl shadow-cyan-600/10 hover:shadow-2xl transition-all flex flex-col justify-between overflow-hidden relative">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-[11px] font-black uppercase tracking-wider py-1.5 text-center">
                ★ Más Elegido por Empresas
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Pro</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-cyan-700">$ 200.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Página Web de hasta 7 Secciones de contenido.</p>
                  <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full border border-cyan-200">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 7 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Optimizado para Convertir:</strong> Visitas en Clientes y cotizaciones.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SEO para Google e IA:</strong> optimizado para ChatGPT, Gemini y Google.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Correos Corporativos:</strong> configuración (ej: contacto@tuempresa.cl).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> profesional incluido por 1 año.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Garantía Técnica:</strong> 60 días de soporte y panel de estadísticas.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Pro ($200.000 IVA Incluido) para mi negocio.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-extrabold py-3.5 text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>

            {/* PLAN 3: PLAN PLUS (CATÁLOGO & MENÚ INTERACTIVO) */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Plus</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950">$ 250.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Página Web de hasta 10 Secciones o Catálogo.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 10 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Optimizado para Convertir:</strong> Visitas en Clientes fidelizados.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Catálogo / Menú Interactivo:</strong> con filtros y código QR digital.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Armado de Pedidos:</strong> o presupuestos directo al WhatsApp del negocio.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> profesional por 1 año completo.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Panel de Control:</strong> para actualizar precios, productos y fotos al día.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Plus ($250.000 IVA Incluido) con catálogo para mi negocio.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>

            {/* PLAN 4: PLAN STORE (TIENDA ONLINE E-COMMERCE CON WEBPAY) */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Store</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950">$ 285.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Tienda Online de productos y pagos con Webpay Plus.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 10 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Tienda E-Commerce 24/7:</strong> carrito, cálculo de envíos y stock.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CreditCard className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Pagos con Webpay Plus:</strong> Débito, Crédito en cuotas y Prepago.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Autoadministrable:</strong> panel intuitivo para subir nuevos productos.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> servidor de alta velocidad por 1 año.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Certificado SSL Bancario:</strong> seguridad para compras con tarjetas.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Store ($285.000 IVA Incluido) con Webpay para mi tienda online.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>
          </div>

          {/* MÓDULO DESTACADO: AGENTE DE INTELIGENCIA ARTIFICIAL 24/7 */}
          <div className="mt-12 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-slate-950 via-[#0B1528] to-slate-950 border-2 border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-cyan-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                    Add-On Oficial · Automatización
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
                    Integración Empresarial Oficial
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Agente de Inteligencia Artificial 24/7 para WhatsApp & Web
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Entrenado exclusivamente con el conocimiento, catálogo, horarios y preguntas frecuentes de tu empresa con arquitectura RAG. Responde consultas complejas sin alucinaciones, califica prospectos en frío y deriva a ejecutivos humanos con el resumen listo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>WhatsApp Business API o Widget Web flotante</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Cero respuestas inventadas (Citas exactas de tu negocio)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Calificación de prospectos y derivación por WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Consumo protegido: cuota fija de tokens sin sorpresas</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="w-full lg:w-72 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-5 text-center space-y-3 shrink-0 shadow-lg">
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-400">
                  Implementación Preferencial
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    $490.000 <span className="text-xs font-normal text-slate-400">+ IVA</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                    Arquitectura RAG + Conexión a Medida
                  </div>
                </div>
                <div className="bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px]">Cuota mensual tokens & mantención:</span>
                  <span className="font-mono font-extrabold text-cyan-300 text-sm">+$29.000 CLP / mes</span>
                </div>
                <a
                  href={whatsappLink('Hola UNIVERSO693, me interesa implementar el Agente de IA 24/7 ($490.000 setup + $29.000/mes) para mi empresa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 px-4 text-xs shadow-lg transition-all"
                >
                  <Bot className="w-4 h-4" />
                  <span>Quiero mi Agente de IA</span>
                </a>
              </div>
            </div>
          </div>

          {/* Banner de Alternativas: Arriendo Impulsa ProPyme vs Proyectos de Software a Medida */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alternativa 1: Arriendo mensual */}
            <div className="bg-gradient-to-br from-[#FAF6F0] to-[#F3E9D2] border-2 border-[#E6DEC8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#E9C46A] text-[#1F1A17] px-2.5 py-0.5 rounded-full inline-block">
                  ¿Prefieres no pagar de golpe?
                </span>
                <h4 className="text-lg font-black text-[#1F1A17]">Programa Impulsa ProPyme</h4>
                <p className="text-xs sm:text-sm text-[#574C43] leading-relaxed">
                  Ten tu página web profesional o sistema con arriendo mensual desde <strong>$15.000/mes</strong>, incluyendo hosting, cambios ilimitados y soporte técnico continuo sin descapitalizarte.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/impulsa-pyme"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#1B4D3E] hover:underline"
                >
                  Conocer planes de arriendo y derecho a compra →
                </Link>
              </div>
            </div>

            {/* Alternativa 2: Proyectos propios a medida */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-400 text-slate-950 px-2.5 py-0.5 rounded-full inline-block">
                  Ingeniería & Proyectos Propios
                </span>
                <h4 className="text-lg font-black text-white">Desarrollo de Software a Medida</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ¿Necesitas un sistema ERP, cotizador industrial de m², campus virtual con firma o inteligencia artificial conectada a bases de datos? Desarrollamos plataformas a medida de alto impacto.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-300 hover:text-cyan-200 hover:underline"
                >
                  Cotizar proyecto o software a medida →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3-Step Simple Process */}
      <section className="py-20 bg-white border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">
              Fácil y sin enredos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              ¿Cómo tener tu nueva web en 3 pasos?
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              No necesitas saber nada de servidores ni de informática. Nosotros nos encargamos de todo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-cyan-600/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Nos cuentas de tu negocio</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                En una breve llamada o por WhatsApp nos envías tu logo, fotos y los servicios que ofreces. Si no tienes textos listos, nosotros te ayudamos a redactarlos.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-cyan-600/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Construimos y te mostramos</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                En pocos días te entregamos un enlace privado para que navegues tu web desde tu teléfono y computador. Ajustamos lo que nos indiques hasta que quede perfecta.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md shadow-cyan-600/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Lanzamiento oficial</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conectamos tu dominio .cl y tu sitio queda publicado para todo Chile y el mundo. Las visitas y consultas empiezan a llegar directamente a tu WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-950">Preguntas Frecuentes</h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Respuestas directas para que tomes tu decisión con total tranquilidad.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">¿Tengo que pagar mensualidades obligatorias?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  No. En UNIVERSO693 no creemos en amarrar clientes. La página web es 100% tuya tras el pago único. Solo deberás renovar anualmente tu dominio .cl en NIC Chile (~$10.000 CLP al año) y tu hosting de alto rendimiento.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">¿Qué pasa si ya tengo un dominio .cl o una web antigua?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Podemos usar tu dominio actual sin problemas. Nos coordinamos contigo para apuntarlo a la nueva web de alta velocidad sin que pierdas ni un solo día de funcionamiento ni tus correos corporativos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">¿Entregan factura formal?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sí, somos <strong>UNIVERSO693 SpA</strong>, empresa chilena formalmente constituida. Emitimos factura comercial válida para tu contabilidad y tributación en Chile.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-base">¿Cómo se realiza el pago?</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Trabajamos con 50% de anticipo para iniciar el diseño y desarrollo, y el 50% restante una vez que revises y apruebes la web lista para salir al aire. Aceptamos transferencia bancaria, Webpay y tarjetas de crédito.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              ¿Listo para tener una página web que realmente traiga clientes?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Conversemos hoy mismo por WhatsApp. Cuéntanos qué necesitas y te preparamos una propuesta a tu medida en menos de 2 horas.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappLink('Hola UNIVERSO693, quiero cotizar una nueva página web para mi negocio.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 shadow-lg shadow-emerald-500/25 transition-all text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hablar con un asesor por WhatsApp</span>
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all"
              >
                <span>Enviar formulario de contacto</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PaginasWeb;
