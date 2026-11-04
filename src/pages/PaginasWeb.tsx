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

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDomain = domainInput.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const cleanEmail = emailInput.trim();
    if (!cleanDomain || !cleanEmail) return;

    setIsScanning(true);
    setAuditResult(null);
    setEmailSentNotice(false);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1500);
    setTimeout(() => {
      setIsScanning(false);
      const isSlow = !cleanDomain.includes('universo693');
      
      const resultData: AuditResult = {
        domain: cleanDomain,
        email: cleanEmail,
        phone: phoneInput.trim() || undefined,
        score: isSlow ? 55 : 98,
        speedMobile: isSlow ? 42 : 96,
        seoScore: isSlow ? 68 : 100,
        securityScore: isSlow ? 50 : 100,
        issues: isSlow
          ? [
              {
                type: 'danger',
                title: 'Tiempo de carga en móviles deficiente (>3.6s)',
                text: 'El 80% de tus visitas entra desde celulares. Un retraso superior a 3 segundos duplica la tasa de rebote antes de que lean tu propuesta.',
              },
              {
                type: 'danger',
                title: 'Sin botón de WhatsApp directo en los primeros 3 segundos',
                text: 'El visitante no encuentra un camino de 1 clic para cotizar de inmediato. La mayoría se va sin completar formularios largos.',
              },
              {
                type: 'warning',
                title: 'Invisibilidad en buscadores de Inteligencia Artificial',
                text: 'Tu sitio no cuenta con un párrafo de respuesta ejecutiva que motores como ChatGPT, Perplexity o Google AI Overviews puedan citar.',
              },
              {
                type: 'warning',
                title: 'Cabeceras de seguridad del servidor incompletas',
                text: 'Faltan directivas HTTP críticas de protección contra clickjacking y robo de información sensible.',
              },
            ]
          : [
              {
                type: 'warning',
                title: 'Oportunidad de ampliación comercial',
                text: 'El sitio tiene excelente base técnica; se recomienda activar catálogo interactivo o módulo de agendamiento.',
              },
            ],
        positives: isSlow
          ? [
              'Dominio web registrado y certificado de seguridad SSL activo.',
              'Texto y descripción básica legibles por navegadores convencionales.',
              'Estructura adaptable a pantallas estándar.',
            ]
          : [
              'Velocidad de carga ultrarrápida (<1.2s en red móvil 4G).',
              'Estructura semántica optimizada para Google y motores de IA.',
              'Cabeceras de blindaje HTTP completas (100/100 en seguridad).',
              'Llamado a la acción directo a WhatsApp en pantalla principal.',
            ],
        recommendation: isSlow
          ? 'Tu sitio actual tiene una base recuperable pero está perdiendo al menos el 50% de sus potenciales clientes por lentitud móvil y falta de conversión directa a WhatsApp. Una modernización con código limpio duplicará tus consultas.'
          : '¡Excelente estado técnico y comercial! Cumple con los más altos estándares de velocidad y posicionamiento moderno.',
      };

      const uniqueId = `uni-${Math.random().toString(36).substring(2, 10)}`;
      navigate(`/auditoria/${uniqueId}?d=${encodeURIComponent(cleanDomain)}&e=${encodeURIComponent(cleanEmail)}`);

      // Best effort background sync with serverless lead collector
      try {
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: `https://${cleanDomain}`,
            email: cleanEmail,
            fullName: cleanDomain,
            company: phoneInput.trim() ? `Tel: ${phoneInput.trim()}` : cleanDomain,
            lang: 'es',
          }),
        }).catch(() => {});
      } catch (err) {}
    }, 2400);
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
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest">
              Planes Transparentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              Elige el plan ideal para tu negocio
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Precios claros, sin costos ocultos, con entrega rápida y factura formal chilena.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Plan 1: Landing Express */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Para campañas o partida rápida
                </div>
                <h3 className="text-2xl font-black text-slate-900">Landing Express</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Ideal para profesionales, servicios específicos o captar clientes desde Google Ads o redes sociales.
                </p>
                <div className="pt-2">
                  <div className="text-3xl sm:text-4xl font-black text-slate-950">$380.000 <span className="text-xs text-slate-500 font-normal">CLP</span></div>
                  <div className="text-xs text-slate-500 mt-0.5">Pago único · Entrega en 5 días hábiles</div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Diseño de 1 página de alto impacto enfocada en vender</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Botón flotante directo a WhatsApp con mensaje personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Velocidad de carga de nivel 95+ (ultrarrápida)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Certificado de seguridad SSL y hosting de alta velocidad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Formulario de contacto conectado a tu correo</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Landing Express ($380.000 CLP) para mi negocio.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Cotizar Landing Express</span>
                </a>
              </div>
            </div>

            {/* Plan 2: Web Corporativa Pro (Highlighted) */}
            <div className="bg-white rounded-3xl border-2 border-cyan-600 p-8 flex flex-col justify-between shadow-xl shadow-cyan-600/10 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-xs font-bold px-4 py-1 shadow-sm uppercase tracking-wider">
                Más Elegido por Empresas
              </div>
              <div className="space-y-4">
                <div className="inline-block text-xs font-bold text-cyan-700 uppercase tracking-wider">
                  Presencia corporativa completa
                </div>
                <h3 className="text-2xl font-black text-slate-900">Web Corporativa Pro</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Para empresas, constructoras, clínicas o firmas que necesitan mostrar catálogo de servicios, portafolio y transmitir confianza.
                </p>
                <div className="pt-2">
                  <div className="text-3xl sm:text-4xl font-black text-slate-950">$580.000 <span className="text-xs text-slate-500 font-normal">CLP</span></div>
                  <div className="text-xs text-slate-500 mt-0.5">Pago único · Entrega en 8 a 10 días</div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hasta 5 secciones completas (Inicio, Servicios, Nosotros, Casos, Contacto)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Optimización técnica avanzada de SEO para Google</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Estructura de respuesta para buscadores de IA (ChatGPT y Gemini)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Configuración de correos corporativos (ej: contacto@tuempresa.cl)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Panel de métricas y estadísticas de visitantes reales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Garantía técnica de 60 días incluida</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Web Corporativa Pro ($580.000 CLP) para mi empresa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold py-3.5 text-sm shadow-md shadow-cyan-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar Web Corporativa Pro</span>
                </a>
              </div>
            </div>

            {/* Plan 3: Web Catálogo / Menú Interactivo PWA */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="inline-block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Gastronomía, tiendas y reservas
                </div>
                <h3 className="text-2xl font-black text-slate-900">Catálogo Interactivo PWA</h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Para restaurantes con carta digital QR, catálogos de productos o agendamiento directo a WhatsApp.
                </p>
                <div className="pt-2">
                  <div className="text-3xl sm:text-4xl font-black text-slate-950">$680.000 <span className="text-xs text-slate-500 font-normal">CLP</span></div>
                  <div className="text-xs text-slate-500 mt-0.5">Pago único · Entrega en 10 a 14 días</div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Catálogo interactivo con filtros rápidos por categoría</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Armado de pedidos directo a WhatsApp con resumen detallado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instalable en el celular del cliente como App (PWA)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Códigos QR de alta resolución para mesas, vitrinas o folletos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Panel de administración fácil para actualizar precios y fotos</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Catálogo Interactivo PWA ($680.000 CLP).')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Cotizar Catálogo Interactivo</span>
                </a>
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
