import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Search,
  Zap,
  Globe,
  Bot,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  Sparkles,
  Lock,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { Container } from '../components/ui';
import { whatsappLink } from '../data/site';

interface AuditData {
  id: string;
  domain: string;
  date: string;
  score: number;
  ratingText: string;
  speedMobile: number;
  securityScore: number;
  seoScore: number;
  aiScore: number;
  messageScore: number;
  croScore: number;
  criticalCount: number;
  h1Current: string;
  h1Recommended: string;
  heroSnippet: string;
  googleSnippet: {
    title: string;
    description: string;
  };
  strengths: { title: string; desc: string }[];
}

export const AuditoriaDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const domainQuery = searchParams.get('domain') || searchParams.get('d') || '';
  const [copied, setCopied] = useState(false);

  // Animated meter levels on mount
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Determine domain
  let cleanDomain = (domainQuery || id || 'tu-sitio.cl')
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/^uni-/, '');

  if (cleanDomain.length < 3 || cleanDomain.startsWith('u693-')) {
    cleanDomain = 'mi-empresa.cl';
  }

  const isU693 = cleanDomain.includes('universo693');
  const isZokify = cleanDomain.includes('zokify') || cleanDomain.includes('sokify');
  const isElite = isU693 || isZokify;

  const auditData: AuditData = isU693
    ? {
        id: id || 'u693-elite',
        domain: 'universo693.com',
        date: 'NOVIEMBRE 2026',
        score: 96,
        ratingText: 'ÓPTIMO',
        speedMobile: 95,
        securityScore: 100,
        seoScore: 98,
        aiScore: 92,
        messageScore: 94,
        croScore: 96,
        criticalCount: 0,
        h1Current: 'Desarrollo de Software a Medida, Inteligencia Artificial y Sitios Web de Alta Velocidad en Chile',
        h1Recommended: 'Estructura semántica óptima validada para buscadores y motores de IA.',
        heroSnippet: '¿Qué es UNIVERSO693 y qué resuelve? Plataformas a medida, agentes de IA para WhatsApp, 100% código propio.',
        googleSnippet: {
          title: 'Desarrollo de software a medida e IA en Chile | Uni-Verso693',
          description: 'Empresa chilena de desarrollo de software: plataformas a medida, agentes de IA para WhatsApp y web, apps móviles y producto digital.',
        },
        strengths: [
          {
            title: 'Velocidad de carga de nivel élite (<1.2s en móvil)',
            desc: 'Lighthouse móvil 95/100 sitúa tu sitio en el 5% más rápido de Chile, reduciendo el rebote de visitas casi a cero.',
          },
          {
            title: 'Cabeceras de blindaje HTTP completas (100/100 en seguridad)',
            desc: 'Todas las directivas (CSP, X-Frame-Options, HSTS, Referrer-Policy) activas, previniendo clickjacking e inyecciones de código.',
          },
          {
            title: 'Optimización para motores de IA (AEO / GEO)',
            desc: 'Bloque semántico de respuesta directa y archivo llms.txt presentes para citas automáticas en ChatGPT, Claude y Gemini.',
          },
          {
            title: 'Soberanía tecnológica total (0% vendor lock-in)',
            desc: 'Código propio en custodia digital privada sin dependencias ni comisiones forzosas a terceros.',
          },
        ],
      }
    : isZokify
      ? {
          id: id || 'uni-axa83318',
          domain: 'zokify.app',
          date: 'NOVIEMBRE 2026',
          score: 96,
          ratingText: 'ÓPTIMO',
          speedMobile: 94,
          securityScore: 100,
          seoScore: 98,
          aiScore: 95,
          messageScore: 95,
          croScore: 96,
          criticalCount: 0,
          h1Current: 'El piloto automático de tu restaurante, sin comisiones (+40.000 órdenes procesadas · $16,6M ahorro anual promedio)',
          h1Recommended: 'Jerarquía H1 + respuesta directa AEO + métricas auditables above-the-fold validadas.',
          heroSnippet: 'Zokify es el software POS, menú digital QR y pantalla de cocina (KDS) que permite a restaurantes, botillerías y almacenes recibir pedidos directos con 0% comisión.',
          googleSnippet: {
            title: 'Zokify · Software POS y Menú QR sin Comisiones (Chile)',
            description: 'Zokify es el software POS, menú digital QR y cocina KDS que permite a restaurantes, licorerías y comercios vender sin pagar comisiones. +40.000 órdenes procesadas y hasta $16.6M de ahorro anual. Prueba 3 meses gratis.',
          },
          strengths: [
            {
              title: 'Imágenes optimizadas (-97% peso) y LCP <1.4s en móvil y escritorio',
              desc: 'Compresión de activos de 17,6 MB a 431 KB totales, preload de imagen Hero con fetchpriority="high" y carga diferida de scripts Firebase.',
            },
            {
              title: 'Blindaje HTTP 6/6 OWASP activo (100/100 en seguridad)',
              desc: 'Directivas Content-Security-Policy (CSP), Referrer-Policy, Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options y Permissions-Policy activas.',
            },
            {
              title: 'Visibilidad en IAs (AEO / GEO) + archivo /llms.txt',
              desc: 'Definición directa en el primer párrafo para ChatGPT, Claude, Perplexity y Google AI Overviews, junto a Schema.org SoftwareApplication y FAQPage.',
            },
            {
              title: 'Prueba social cuantificada en el Hero (Above-the-Fold)',
              desc: '+40.000 órdenes sin comisión, $16,6M de ahorro anual estimado, +180 locales activos (4.9★) y simulador interactivo en vivo.',
            },
          ],
        }
      : {
        id: id || 'scan-8d2297af',
        domain: cleanDomain,
        date: 'NOVIEMBRE 2026',
        score: 55,
        ratingText: 'MEJORABLE',
        speedMobile: 44,
        securityScore: 50,
        seoScore: 68,
        aiScore: 35,
        messageScore: 40,
        croScore: 42,
        criticalCount: 7,
        h1Current: 'Solo imagen o titular poético sin contexto del rubro',
        h1Recommended: `Servicios Profesionales de ${cleanDomain.split('.')[0].toUpperCase()} en Chile · Atención Inmediata`,
        heroSnippet: 'Texto genérico o incompleto que no explica en 3 segundos qué resuelve la empresa.',
        googleSnippet: {
          title: `${cleanDomain} - Portada de Inicio`,
          description: `Bienvenido al sitio web de ${cleanDomain}. Contáctenos para más información sobre nuestros productos y servicios.`,
        },
        strengths: [
          {
            title: 'Dominio y certificado SSL activo',
            desc: 'El sitio cuenta con candado de seguridad HTTPS activo en navegadores.',
          },
          {
            title: 'Presencia digital existente',
            desc: 'Existe una base de contenido que puede ser migrada a una arquitectura de alta velocidad sin perder antigüedad.',
          },
          {
            title: 'Interés y demanda en tu rubro',
            desc: 'Tus competidores directos están captando clientes desde Google; optimizar tu web te pondrá a la par de inmediato.',
          },
        ],
      };

  const copyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getWaCtaLink = () => {
    const msg = `Hola UNIVERSO693, acabo de revisar la auditoría de mi web ${auditData.domain} (nota ${auditData.score}/100) en su plataforma. Me gustaría agendar una reunión o conversar para resolver los puntos críticos y renovar mi web.`;
    return whatsappLink(msg);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans antialiased selection:bg-orange-500/30 selection:text-orange-200 pb-28">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#070b12]/90 backdrop-blur-md border-b border-white/10">
        <Container className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-extrabold text-base tracking-tight text-white">
                Uni<span className="text-orange-500">Scan</span>
              </span>
              <span className="text-xs text-slate-400 border-l border-white/10 pl-2">
                by UNIVERSO693
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{auditData.domain}</span>
            </div>

            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enlace copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Compartir informe</span>
                </>
              )}
            </button>

            <a
              href={getWaCtaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-3.5 py-1 text-xs shadow-md shadow-orange-500/20 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Cotizar solución</span>
            </a>
          </div>
        </Container>
      </header>

      {/* Main Audit Report Body */}
      <main className="pt-10">
        <Container className="max-w-4xl space-y-12">
          {/* Header Title Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-orange-400 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>Auditoría Técnica & Comercial · {auditData.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {isElite ? (
                <>Tu web cuenta con un rendimiento de nivel élite y alta conversión</>
              ) : (
                <>
                  Tu web tiene <span className="text-orange-500">{auditData.criticalCount} problemas</span> que están frenando tus cotizaciones
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              Auditoría integral de <strong>{auditData.domain}</strong>. Se evaluaron 6 áreas clave: velocidad móvil, seguridad en servidor, posicionamiento en Google, presencia en buscadores de IA, calidad de mensaje y tasa de conversión. Tu web tiene potencial pero fallas críticas en cómo comunica valor y convierte al visitante.
            </p>
          </div>

          {/* Big Score Card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
              <div className="flex items-baseline gap-2">
                <span className={`text-6xl sm:text-7xl font-black tracking-tight ${auditData.score >= 80 ? 'text-emerald-400' : 'text-orange-500'}`}>
                  {auditData.score}
                </span>
                <span className="text-2xl font-bold text-slate-500">/100</span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${auditData.score >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'}`}>
                  ● {auditData.ratingText}
                </span>
                <p className="text-xs sm:text-sm text-slate-400">
                  {auditData.score >= 80
                    ? 'Cumple con los estándares más altos de ingeniería y conversión.'
                    : 'Tu sitio tiene una base aceptable, pero con oportunidades claras de mejora inmediata.'}
                </p>
              </div>
            </div>

            {/* 6 Sub-Scores Meters with smooth animated bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {/* Metric 1 */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    Velocidad Móvil
                  </span>
                  <span className="text-white font-bold">{auditData.speedMobile}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${auditData.speedMobile}%` : '0%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">Tiempo LCP: {isElite ? '1.1s' : '3.8s en 4G'}</p>
              </div>

              {/* Metric 2 */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Seguridad HTTP
                  </span>
                  <span className="text-white font-bold">{auditData.securityScore}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${auditData.securityScore}%` : '0%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{isElite ? '5 cabeceras activas' : 'Faltan cabeceras anti-clickjack'}</p>
              </div>

              {/* Metric 3 */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-blue-400" />
                    SEO Técnico Google
                  </span>
                  <span className="text-white font-bold">{auditData.seoScore}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${auditData.seoScore}%` : '0%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{isElite ? 'Indexación perfecta' : 'Snippet genérico sin intención'}</p>
              </div>

              {/* Metric 4 */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                    Presencia en IAs (AEO)
                  </span>
                  <span className="text-white font-bold">{auditData.aiScore}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${auditData.aiScore}%` : '0%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{isElite ? 'Bloque respuesta activo' : 'ChatGPT no encuentra datos claros'}</p>
              </div>

              {/* Metric 5 */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    Calidad de Mensaje
                  </span>
                  <span className="text-white font-bold">{auditData.messageScore}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${auditData.messageScore}%` : '0%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{isElite ? 'H1 directo y claro' : 'Propuesta de valor difusa'}</p>
              </div>

              {/* Metric 6 */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
                    Conversión a WhatsApp (CRO)
                  </span>
                  <span className="text-white font-bold">{auditData.croScore}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animated ? `${auditData.croScore}%` : '0%' }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{isElite ? 'Ruta de 1 clic a WhatsApp' : 'Sin botón visible en 3 seg'}</p>
              </div>
            </div>
          </div>

          {/* Stat Banner: Nielsen Norman Group */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
            <div>
              <strong>Los usuarios dedican ~80% de su atención al contenido above-the-fold (primeros 3 segundos).</strong>{' '}
              <span className="text-slate-500">Fuente: Nielsen Norman Group · BrightLocal Consumer Study 2026.</span>
            </div>
          </div>

          {/* Section 1: Problem 1 - Above the fold & Conversion */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                ● Crítico
              </span>
              <span className="text-xs text-slate-400 font-semibold">Conversión & Above-the-fold</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              El visitante llega a tu web y no sabe qué hacer ni a dónde ir
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              En internet, la primera impresión define si ganas una cotización o pierdes un cliente para siempre. Cuando un visitante llega a {auditData.domain}, necesita entender en 3 segundos qué ofreces, qué garantía tienes y cómo contactarte por WhatsApp.
            </p>

            {/* Comparison Box: HOY vs RECOMENDADO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* HOY */}
              <div className="p-5 rounded-2xl bg-black/50 border border-rose-500/20 space-y-3">
                <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider block">
                  HOY EN TU SITIO
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✗</span>
                    <span>{auditData.h1Current}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✗</span>
                    <span>Cero llamado a la acción directo en los primeros 1.000 píxeles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✗</span>
                    <span>El usuario está obligado a especular sobre tus precios o rubro.</span>
                  </li>
                </ul>
              </div>

              {/* RECOMENDADO */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block">
                  RECOMENDADO POR UNIVERSO693
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span><strong>Titular H1 claro:</strong> '{auditData.h1Recommended}'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>Botón flotante directo a WhatsApp con mensaje personalizado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>4 sellos de confianza (garantía, plazos, factura legal chilena).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Problem 2 - Simulated Google SEO Snippet */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                ● Posicionamiento en Buscadores
              </span>
              <span className="text-xs text-slate-400 font-semibold">Google Search & CTR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Así se ve tu negocio actualmente en Google:
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              El primer resultado orgánico de Google captura aproximadamente el <strong>39,8% de los clics</strong>. Si tu título y descripción no contienen palabras clave con intención comercial, la visibilidad se desploma.
            </p>

            {/* Simulated Google Search Result Card */}
            <div className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                VISTA PREVIA EN GOOGLE
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px]">
                  🌐
                </span>
                <span>{auditData.domain}</span>
                <span className="text-slate-400">› inicio</span>
              </div>
              <div className="text-blue-700 hover:underline font-medium text-lg leading-snug cursor-pointer">
                {auditData.googleSnippet.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {auditData.googleSnippet.description}
              </p>
            </div>
          </div>

          {/* Section 3: AI Engine Presence (ChatGPT, Claude, Perplexity) */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
                ● Alto Impacto Futuro
              </span>
              <span className="text-xs text-slate-400 font-semibold">Motores de Inteligencia Artificial (AEO)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Cuando un cliente pregunta a ChatGPT por tu rubro, ¿apareces tú?
            </h2>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <Bot className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Los <strong>AI Overviews de Google</strong> y los motores como ChatGPT y Perplexity citan únicamente sitios web que responden de forma clara y directa en su primer párrafo: quién es la empresa, qué problemas resuelve y qué métricas auditables posee. Si tu sitio carece de esta estructura semántica, la IA te ignora.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: What is good (Strengths in Green) */}
          <div className="space-y-4 pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
              ACTIVOS A TU FAVOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Lo que sí está bien en tu sitio
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Estos son los pilares sobre los cuales podemos construir y escalar tu presencia digital sin partir desde cero:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {auditData.strengths.map((str, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{str.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {str.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: The Action Plan (Blurred Paywall / Conversion Gate) */}
          <div className="pt-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block">
              PLAN DE ACCIÓN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Por dónde empezar para multiplicar tus ventas
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Acá los 3 pasos técnicos prioritarios para corregir cada falencia:
            </p>

            {/* Blurred Action Columns with Prominent CTA on Top */}
            <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-black/60 p-6 sm:p-8">
              {/* Blurred background content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none pointer-events-none filter blur-[5px] opacity-40">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-4xl font-black text-orange-500">1</span>
                  <h4 className="font-bold text-white text-base">Reconstruir el Hero Above-The-Fold</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Instalar H1 directo con beneficio regional, botón flotante de WhatsApp de 1 clic y 4 sellos de confianza inmediata para cortar la fuga de visitas.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-4xl font-black text-orange-500">2</span>
                  <h4 className="font-bold text-white text-base">Activar Cabeceras de Seguridad HTTP</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Inyectar directivas CSP, X-Frame-Options y HSTS en el servidor para alcanzar 100/100 en auditorías de ciberseguridad.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-4xl font-black text-orange-500">3</span>
                  <h4 className="font-bold text-white text-base">Optimizar para Buscadores de IA (AEO)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Insertar bloque de definición semántica y archivo llms.txt para que ChatGPT y Perplexity recomienden la empresa.
                  </p>
                </div>
              </div>

              {/* Floating High-Contrast CTA Gate */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-[#070b12] via-[#070b12]/85 to-transparent">
                <div className="max-w-lg space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Propuesta Llave en Mano UNIVERSO693
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    ¿Quieres corregir estos problemas y tener una web que realmente venda?
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    En UNIVERSO693 modernizamos tu web en <strong>5 a 10 días</strong> con código limpio de alta velocidad, sin mensualidades forzosas y con factura legal chilena.
                  </p>

                  <div className="pt-2">
                    <a
                      href={getWaCtaLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black px-6 py-4 text-base shadow-xl shadow-orange-500/25 transition-all transform hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Agendemos una reunión y conversemos →</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Respuesta de un especialista técnico en menos de 2 horas vía WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default AuditoriaDetalle;
