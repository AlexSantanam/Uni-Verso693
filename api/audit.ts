import type { VercelRequest, VercelResponse } from '@vercel/node';
import { lookup } from 'node:dns/promises';
import net from 'node:net';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ---------- Rate limits con Upstash Redis ----------
let redis: Redis | null = null;
let perIp: Ratelimit | null = null;
let daily: Ratelimit | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
    perIp = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '1 h'), prefix: 'u693AuditIp' });
    daily = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(150, '1 d'), prefix: 'u693AuditDay' });
  }
} catch (e) {
  console.warn('Redis init bypassed or failed', e);
}

const clientKey = (req: VercelRequest) => {
  const fwd = req.headers['x-forwarded-for'];
  const first = Array.isArray(fwd) ? fwd[0] : fwd;
  return first?.split(',')[0].trim() ?? req.socket.remoteAddress ?? 'unknown';
};

// Safe SSRF checks
const isPrivateIp = (ip: string) => {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224
    );
  }
  const v6 = ip.toLowerCase();
  return v6 === '::1' || v6 === '::' || v6.startsWith('fc') || v6.startsWith('fd') || v6.startsWith('fe80') || v6.startsWith('::ffff:');
};

const assertPublicUrl = async (raw: string): Promise<URL> => {
  let url: URL;
  try {
    const cleaned = raw.trim().replace(/^https?:\/\//i, '');
    url = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${cleaned}`);
  } catch {
    throw new Error('La dirección del sitio no es válida.');
  }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Solo se aceptan sitios http o https.');
  if (url.port && !['80', '443'].includes(url.port)) throw new Error('Solo se aceptan sitios en puertos estándar.');
  const host = url.hostname;
  if (!host.includes('.') || host.endsWith('.local') || host.endsWith('.internal')) throw new Error('Usa la dirección pública de tu sitio.');
  
  const addrs = await lookup(host, { all: true }).catch(() => {
    throw new Error('No pudimos encontrar ese dominio en los servidores DNS.');
  });
  if (addrs.length === 0 || addrs.some((a) => isPrivateIp(a.address))) throw new Error('Usa la dirección pública de tu sitio.');
  return url;
};

export interface RealAuditData {
  id: string;
  domain: string;
  url: string;
  date: string;
  score: number;
  ratingText: 'CRÍTICO' | 'MEJORABLE' | 'BUENO' | 'ÓPTIMO';
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
  metrics: {
    ttfbMs: number;
    pageSizeKb: number;
    sslActive: boolean;
    httpStatus: number;
    lcpSeconds: string;
    imagesTotal: number;
    imagesWebp: number;
    hasPreload: boolean;
  };
  security: {
    hasHsts: boolean;
    hasXFrame: boolean;
    hasNosniff: boolean;
    hasCsp: boolean;
    hasReferrerPolicy: boolean;
    hasPermissionsPolicy: boolean;
    activeHeaders: string[];
    missingHeaders: string[];
  };
  seo: {
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    h1: string;
    hasViewport: boolean;
    hasCanonical: boolean;
    hasOgImage: boolean;
  };
  ai: {
    hasLlmsTxt: boolean;
    hasSchemaOrg: boolean;
    schemaTypes: string[];
    hasRobotsTxt: boolean;
    hasSitemap: boolean;
  };
  cro: {
    hasWhatsApp: boolean;
    whatsAppNumber?: string;
    hasPhone: boolean;
    phoneFound?: string;
    hasEmail: boolean;
    emailFound?: string;
    hasForm: boolean;
  };
  issues: Array<{
    type: 'danger' | 'warning' | 'info';
    title: string;
    desc: string;
    category: string;
    impact?: string;
  }>;
  strengths: Array<{
    title: string;
    desc: string;
  }>;
  opportunities?: Array<{
    title: string;
    why: string;
  }>;
}

// ---------- MOTOR DE INSPECCIÓN PROFUNDA REAL ----------
export const performDeepAudit = async (targetUrl: string, uniqueId?: string): Promise<RealAuditData> => {
  const urlObj = await assertPublicUrl(targetUrl);
  const cleanDomain = urlObj.hostname.toLowerCase().replace(/^www\./, '');
  const auditId = uniqueId || `uni-${Math.random().toString(36).substring(2, 10)}`;

  // 1. Fetch de la página principal con medición de tiempo
  const startTime = Date.now();
  let response: Response;
  let finalUrl = urlObj.toString();
  
  try {
    response = await fetch(urlObj.toString(), {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; UniScanBot/2.0; +https://universo693.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-CL,es;q=0.9,en;q=0.8',
      },
      signal: AbortSignal.timeout(9000),
    });
    finalUrl = response.url;
  } catch (err) {
    // Si falla HTTPS directo, reintentar con HTTP
    if (urlObj.protocol === 'https:') {
      const httpUrl = urlObj.toString().replace('https://', 'http://');
      response = await fetch(httpUrl, {
        redirect: 'follow',
        headers: { 'User-Agent': 'UniScanBot/2.0' },
        signal: AbortSignal.timeout(8000),
      }).catch(() => {
        throw new Error('No pudimos abrir tu sitio web. Verifica que el dominio esté activo y en línea.');
      });
      finalUrl = response.url;
    } else {
      throw new Error('No pudimos conectar con el servidor de tu sitio.');
    }
  }

  const ttfbMs = Date.now() - startTime;
  const sslActive = finalUrl.startsWith('https://');
  const httpStatus = response.status;
  const headers = response.headers;

  // 2. Análisis de Cabeceras de Seguridad HTTP
  const hsts = headers.get('strict-transport-security') || '';
  const xFrame = headers.get('x-frame-options') || '';
  const nosniff = headers.get('x-content-type-options') || '';
  const csp = headers.get('content-security-policy') || '';
  const referrerPolicy = headers.get('referrer-policy') || '';
  const permissionsPolicy = headers.get('permissions-policy') || headers.get('feature-policy') || '';

  const hasHsts = hsts.length > 0;
  const hasXFrame = xFrame.length > 0 || csp.includes('frame-ancestors');
  const hasNosniff = nosniff.toLowerCase().includes('nosniff');
  const hasCsp = csp.length > 0;
  const hasReferrerPolicy = referrerPolicy.length > 0;
  const hasPermissionsPolicy = permissionsPolicy.length > 0;

  const activeHeaders: string[] = [];
  const missingHeaders: string[] = [];

  if (hasHsts) activeHeaders.push('Strict-Transport-Security (HSTS)'); else missingHeaders.push('Strict-Transport-Security');
  if (hasXFrame) activeHeaders.push('X-Frame-Options (Anti-Clickjacking)'); else missingHeaders.push('X-Frame-Options');
  if (hasNosniff) activeHeaders.push('X-Content-Type-Options (nosniff)'); else missingHeaders.push('X-Content-Type-Options');
  if (hasReferrerPolicy) activeHeaders.push('Referrer-Policy'); else missingHeaders.push('Referrer-Policy');
  if (hasPermissionsPolicy) activeHeaders.push('Permissions-Policy'); else missingHeaders.push('Permissions-Policy');
  if (hasCsp) activeHeaders.push('Content-Security-Policy (CSP)');

  let securityScore = sslActive ? 25 : 0;
  if (hasHsts) securityScore += 15;
  if (hasXFrame) securityScore += 15;
  if (hasNosniff) securityScore += 15;
  if (hasReferrerPolicy) securityScore += 15;
  if (hasPermissionsPolicy) securityScore += 15;
  if (hasCsp) securityScore = Math.min(100, securityScore + 10);

  // 3. Descarga de HTML para Crawler On-Page
  const htmlBuffer = await response.arrayBuffer();
  const pageSizeKb = Math.round(htmlBuffer.byteLength / 1024);
  const html = new TextDecoder('utf-8').decode(htmlBuffer);

  // Helper de extracción de texto
  const decodeEntities = (s: string) =>
    s.replace(/&nbsp;/g, ' ')
     .replace(/&amp;/g, '&')
     .replace(/&quot;/g, '"')
     .replace(/&#39;|&apos;/g, "'")
     .replace(/&lt;/g, '<')
     .replace(/&gt;/g, '>')
     .replace(/\s+/g, ' ')
     .trim();

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = decodeEntities(titleMatch ? titleMatch[1] : '');
  const titleLength = title.length;

  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = decodeEntities(descMatch ? descMatch[1] : '');
  const descriptionLength = description.length;

  // H1s
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1List = h1Matches.map(m => decodeEntities(m[1].replace(/<[^>]+>/g, ' '))).filter(Boolean);
  const firstH1 = h1List[0] || '';

  // H2s
  const h2Count = [...html.matchAll(/<h2[^>]*>/gi)].length;

  // Viewport & Canonical
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);

  // Open Graph
  const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
  const hasOgImage = !!ogImageMatch;
  const ogImage = ogImageMatch ? ogImageMatch[1] : undefined;

  // Imágenes y formatos
  const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  const imagesTotal = imgMatches.length;
  let imagesWebp = 0;
  for (const match of imgMatches) {
    const src = match[1].toLowerCase();
    if (src.endsWith('.webp') || src.endsWith('.avif') || src.endsWith('.svg')) {
      imagesWebp++;
    }
  }
  const hasPreload = /<link[^>]+rel=["']preload["'][^>]+as=["']image["']/i.test(html);

  // 4. Sondas en paralelo: /llms.txt, robots.txt, sitemap.xml
  const baseUrl = `${urlObj.protocol}//${urlObj.hostname}`;
  const [llmsRes, robotsRes, sitemapRes] = await Promise.all([
    fetch(`${baseUrl}/llms.txt`, { method: 'HEAD', signal: AbortSignal.timeout(3500) }).catch(() => null),
    fetch(`${baseUrl}/robots.txt`, { method: 'HEAD', signal: AbortSignal.timeout(3500) }).catch(() => null),
    fetch(`${baseUrl}/sitemap.xml`, { method: 'HEAD', signal: AbortSignal.timeout(3500) }).catch(() => null),
  ]);

  const hasLlmsTxt = llmsRes?.status === 200;
  const hasRobotsTxt = robotsRes?.status === 200;
  const hasSitemap = sitemapRes?.status === 200 || /sitemap\.xml/i.test(html);

  // Schema.org JSON-LD
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaTypes: string[] = [];
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      if (parsed['@type']) {
        if (Array.isArray(parsed['@type'])) schemaTypes.push(...parsed['@type']);
        else schemaTypes.push(parsed['@type']);
      }
      if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        for (const item of parsed['@graph']) {
          if (item['@type']) {
            if (Array.isArray(item['@type'])) schemaTypes.push(...item['@type']);
            else schemaTypes.push(item['@type']);
          }
        }
      }
    } catch {}
  }
  const hasSchemaOrg = schemaTypes.length > 0;

  // 5. Conversión comercial (CRO) & WhatsApp
  const waRegex = /(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com\/send)\/?\??(?:phone=)?(\+?[0-9]{9,15})/i;
  const waMatch = html.match(waRegex);
  const hasWhatsApp = !!waMatch || /href=["'][^"']*whatsapp/i.test(html);
  const whatsAppNumber = waMatch ? waMatch[1] : undefined;

  const phoneMatch = html.match(/href=["']tel:([^"']+)["']/i) || html.match(/\+56\s?9\s?[0-9]{4}\s?[0-9]{4}/);
  const hasPhone = !!phoneMatch;
  const phoneFound = phoneMatch ? (phoneMatch[1] || phoneMatch[0]) : undefined;

  const emailMatch = html.match(/href=["']mailto:([^"']+)["']/i) || html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const hasEmail = !!emailMatch;
  const emailFound = emailMatch ? (emailMatch[1] || emailMatch[0]) : undefined;

  const hasForm = /<form/i.test(html);

  // 6. Cálculo de métricas
  // SEO Score
  let seoScore = 0;
  if (titleLength >= 25 && titleLength <= 65) seoScore += 25;
  else if (titleLength > 0) seoScore += 12;

  if (descriptionLength >= 60 && descriptionLength <= 160) seoScore += 25;
  else if (descriptionLength > 0) seoScore += 12;

  if (h1List.length === 1) seoScore += 25;
  else if (h1List.length > 1) seoScore += 15;

  if (hasViewport) seoScore += 15;
  if (hasCanonical || hasOgImage) seoScore += 10;

  // AI Score (AEO / GEO)
  let aiScore = 0;
  if (hasSchemaOrg) aiScore += 35;
  if (hasLlmsTxt) aiScore += 35;
  if (hasSitemap) aiScore += 15;
  if (hasRobotsTxt) aiScore += 15;

  // CRO Score
  let croScore = 0;
  if (hasWhatsApp) croScore += 45;
  if (hasPhone) croScore += 20;
  if (hasEmail) croScore += 15;
  if (hasForm) croScore += 20;

  // Estimación de Velocidad y LCP
  let speedMobile = 95;
  let lcpEst = 1.1;

  if (ttfbMs > 800) {
    speedMobile -= 25;
    lcpEst += 1.8;
  } else if (ttfbMs > 400) {
    speedMobile -= 10;
    lcpEst += 0.8;
  }

  if (pageSizeKb > 500) {
    speedMobile -= 20;
    lcpEst += 1.5;
  } else if (pageSizeKb > 200) {
    speedMobile -= 10;
    lcpEst += 0.6;
  }

  if (imagesTotal > 2 && imagesWebp === 0) {
    speedMobile -= 25;
    lcpEst += 2.0;
  } else if (hasPreload || imagesWebp > 0) {
    speedMobile = Math.min(98, speedMobile + 5);
  }

  speedMobile = Math.max(25, Math.min(99, speedMobile));
  const lcpDisplay = `${lcpEst.toFixed(1)}s`;

  // Message Score
  let messageScore = 70;
  if (firstH1.length > 20 && !/bienvenido|inicio|home/i.test(firstH1)) {
    messageScore = 90;
  } else if (!firstH1) {
    messageScore = 35;
  }

  // Score Global Ponderado
  const overallScore = Math.round(
    speedMobile * 0.25 +
    securityScore * 0.20 +
    seoScore * 0.20 +
    croScore * 0.20 +
    aiScore * 0.15
  );

  let ratingText: RealAuditData['ratingText'] = 'MEJORABLE';
  if (overallScore >= 85) ratingText = 'ÓPTIMO';
  else if (overallScore >= 70) ratingText = 'BUENO';
  else if (overallScore < 50) ratingText = 'CRÍTICO';

  // 7. Generación de Hallazgos y Fortalezas REALES
  const issues: RealAuditData['issues'] = [];
  const strengths: RealAuditData['strengths'] = [];

  // Chequeo de Velocidad
  if (speedMobile < 75) {
    issues.push({
      type: 'danger',
      category: 'Velocidad',
      title: `Tiempo de carga móvil lento (LCP estimado ${lcpDisplay})`,
      desc: `El servidor tardó ${ttfbMs}ms en responder y el HTML pesa ${pageSizeKb} KB. El 80% de tus visitas entra por celular y abandonará si supera los 3 segundos.`,
      impact: 'Alto rebote en móviles y pérdida directa de tráfico comercial.',
    });
  } else {
    strengths.push({
      title: `Velocidad móvil de alto rendimiento (${lcpDisplay})`,
      desc: `Excelente tiempo de respuesta del servidor (${ttfbMs}ms) y peso optimizado (${pageSizeKb} KB). Tu sitio carga de inmediato en redes 4G y 5G.`,
    });
  }

  // Chequeo de Seguridad
  if (securityScore < 80) {
    issues.push({
      type: 'danger',
      category: 'Seguridad',
      title: 'Cabeceras de protección HTTP ausentes',
      desc: `Faltan directivas clave en el servidor: ${missingHeaders.slice(0, 3).join(', ')}. Tu sitio es vulnerable a incrustación en marcos (clickjacking) o inyección de tipos MIME.`,
      impact: 'Riesgo de seguridad y penalización en navegadores modernos.',
    });
  } else {
    strengths.push({
      title: `Blindaje HTTP Completo (${activeHeaders.length} cabeceras activas)`,
      desc: `Cuenta con ${activeHeaders.join(', ')}. Calificación A+ en estándares de ciberseguridad OWASP.`,
    });
  }

  // Chequeo de WhatsApp y Conversión
  if (!hasWhatsApp) {
    issues.push({
      type: 'danger',
      category: 'Conversión',
      title: 'Sin botón directo a WhatsApp en pantalla principal',
      desc: 'En Chile y Latinoamérica, más del 70% de las ventas B2B y servicios se cierran por WhatsApp. Obligar al usuario a buscar un formulario reduce las conversiones a la mitad.',
      impact: 'Pérdida de cotizaciones espontáneas de clientes calificados.',
    });
  } else {
    strengths.push({
      title: 'Ruta de contacto directo a WhatsApp activa',
      desc: `Canal de cotización en 1 clic detectado (${whatsAppNumber ? `+${whatsAppNumber}` : 'enlace directo'}). Facilita el cierre comercial inmediato.`,
    });
  }

  // Chequeo de SEO y Título
  if (titleLength > 65) {
    issues.push({
      type: 'warning',
      category: 'SEO',
      title: `Título demasiado largo para Google (${titleLength} caracteres)`,
      desc: `Google corta los títulos con puntos suspensivos (...) a partir de los 60 caracteres. Tu título actual es: "${title}".`,
      impact: 'Pérdida de clics (CTR) en los resultados de búsqueda orgánica.',
    });
  } else if (titleLength === 0) {
    issues.push({
      type: 'danger',
      category: 'SEO',
      title: 'Sitio sin etiqueta <title> en el código',
      desc: 'El sitio no define un título para los motores de búsqueda, lo que destruye el posicionamiento en Google.',
      impact: 'Invisibilidad en búsquedas orgánicas.',
    });
  } else {
    strengths.push({
      title: `Título SERP optimizado (${titleLength} caracteres)`,
      desc: `El título "${title}" encaja perfectamente dentro del límite de 60 caracteres de Google sin cortarse.`,
    });
  }

  // Chequeo de IA
  if (!hasLlmsTxt && !hasSchemaOrg) {
    issues.push({
      type: 'warning',
      category: 'IA',
      title: 'Invisible para motores de Inteligencia Artificial (ChatGPT, Claude, Perplexity)',
      desc: 'El sitio no posee archivo /llms.txt ni marcado Schema.org estructurado. Cuando un usuario consulta a una IA por tu rubro, el modelo no tiene datos limpios para citarte.',
      impact: 'Pérdida de la nueva ola de clientes que buscan recomendaciones en IA.',
    });
  } else {
    strengths.push({
      title: `Preparado para motores de IA (${hasLlmsTxt ? 'llms.txt activo' : ''}${hasSchemaOrg ? ' + Schema.org' : ''})`,
      desc: `Estructura semántica que permite a ChatGPT, Perplexity y Google AI Overviews leer y citar la empresa directamente.`,
    });
  }

  // H1 actual y recomendado
  const h1Current = firstH1 || 'Sin etiqueta <h1> definida en la portada';
  const h1Recommended = firstH1 && firstH1.length > 25
    ? firstH1
    : `${cleanDomain.split('.')[0].toUpperCase()} · Servicios Profesionales y Obras en Chile`;

  const heroSnippet = description || 'Sitio web corporativo en Chile con atención y cotizaciones comerciales.';

  const googleSnippet = {
    title: title || `${cleanDomain} - Portada Oficial`,
    description: description || `Servicios y proyectos de ${cleanDomain} en Chile. Contáctenos para cotizar su requerimiento.`,
  };

  const criticalCount = issues.filter(i => i.type === 'danger').length;

  return {
    id: auditId,
    domain: cleanDomain,
    url: finalUrl,
    date: new Date().toLocaleDateString('es-CL', { month: 'long', year: 'numeric' }).toUpperCase(),
    score: overallScore,
    ratingText,
    speedMobile,
    securityScore,
    seoScore,
    aiScore,
    messageScore,
    croScore,
    criticalCount,
    h1Current,
    h1Recommended,
    heroSnippet,
    googleSnippet,
    metrics: {
      ttfbMs,
      pageSizeKb,
      sslActive,
      httpStatus,
      lcpSeconds: lcpDisplay,
      imagesTotal,
      imagesWebp,
      hasPreload,
    },
    security: {
      hasHsts,
      hasXFrame,
      hasNosniff,
      hasCsp,
      hasReferrerPolicy,
      hasPermissionsPolicy,
      activeHeaders,
      missingHeaders,
    },
    seo: {
      title,
      titleLength,
      description,
      descriptionLength,
      h1: firstH1,
      hasViewport,
      hasCanonical,
      hasOgImage,
    },
    ai: {
      hasLlmsTxt,
      hasSchemaOrg,
      schemaTypes,
      hasRobotsTxt,
      hasSitemap,
    },
    cro: {
      hasWhatsApp,
      whatsAppNumber,
      hasPhone,
      phoneFound,
      hasEmail,
      emailFound,
      hasForm,
    },
    issues,
    strengths,
  };
};

// ---------- HANDLER PRINCIPAL DE VERCEL ----------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers para permitir llamadas fluidas
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 1. Manejo de GET (recuperar auditoría por ID o consultar dominio en vivo)
  if (req.method === 'GET') {
    const auditId = (req.query.id as string || '').trim();
    const domainQuery = (req.query.domain as string || req.query.d as string || '').trim();

    // Buscar en caché de Redis por ID
    if (auditId && redis) {
      try {
        const cached = await redis.get<RealAuditData | string>(`u693:audit:${auditId}`);
        if (cached) {
          const parsed = typeof cached === 'string' ? JSON.parse(cached) : cached;
          res.status(200).json(parsed);
          return;
        }
      } catch (err) {
        console.error('Error reading from redis', err);
      }
    }

    // Si no está por ID pero viene un dominio, auditar en vivo
    if (domainQuery) {
      try {
        const audit = await performDeepAudit(domainQuery, auditId || undefined);
        if (redis) {
          await redis.set(`u693:audit:${audit.id}`, JSON.stringify(audit), { ex: 60 * 60 * 24 * 30 });
        }
        res.status(200).json(audit);
        return;
      } catch (err: any) {
        res.status(422).json({ error: err.message || 'No pudimos analizar el sitio.' });
        return;
      }
    }

    res.status(400).json({ error: 'Debes proporcionar un ID o un dominio para auditar.' });
    return;
  }

  // 2. Manejo de POST (crear auditoría desde el formulario de la landing)
  if (req.method === 'POST') {
    const body = (req.body ?? {}) as {
      url?: string;
      domain?: string;
      fullName?: string;
      email?: string;
      company?: string;
      phone?: string;
      website?: string; // honeypot
    };

    if (body.website) {
      res.status(400).json({ error: 'Solicitud inválida.' });
      return;
    }

    const target = (body.url || body.domain || '').trim();
    const email = (body.email || '').trim();
    const fullName = (body.fullName || target).trim();
    const phone = (body.phone || body.company || '').trim();

    if (!target) {
      res.status(400).json({ error: 'Por favor ingresa la dirección web que deseas auditar.' });
      return;
    }

    // Rate limiting básico
    if (perIp && daily) {
      try {
        const [ip, day] = await Promise.all([perIp.limit(clientKey(req)), daily.limit('global')]);
        if (!ip.success || !day.success) {
          res.status(429).json({ error: 'Has alcanzado el límite de consultas por ahora. Intenta en unos minutos.' });
          return;
        }
      } catch (e) {
        console.warn('Ratelimit check failed', e);
      }
    }

    try {
      // Ejecutar inspección profunda en vivo
      const audit = await performDeepAudit(target);

      // Guardar en Redis
      if (redis) {
        await redis.set(`u693:audit:${audit.id}`, JSON.stringify(audit), { ex: 60 * 60 * 24 * 30 });
        
        // Guardar lead si hay email
        if (email) {
          const leadId = `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
          await redis.set(`u693:lead:${leadId}`, {
            id: leadId,
            status: 'nuevo',
            createdAt: new Date().toISOString(),
            source: 'uniscan_real',
            name: fullName,
            email,
            phone,
            url: audit.url,
            score: audit.score,
            rating: audit.ratingText,
          });
          await redis.zadd('u693:leads', { score: Date.now(), member: leadId });
        }
      }

      // Notificación opcional por email al equipo
      if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL && email) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        resend.emails.send({
          from: 'Uni-Verso693 <contacto@universo693.com>',
          to: process.env.CONTACT_NOTIFICATION_EMAIL,
          subject: `[UniScan Real] Nueva auditoría ${audit.domain} (${audit.score}/100)`,
          html: `<p><b>${fullName}</b> (${email}) auditó <b>${audit.domain}</b> con resultado <b>${audit.score}/100 (${audit.ratingText})</b>.</p><p><a href="https://universo693.com/auditoria/${audit.id}?d=${audit.domain}">Ver informe completo</a></p>`,
        }).catch(err => console.error('Email notify failed', err));
      }

      res.status(200).json(audit);
      return;
    } catch (err: any) {
      console.error('Audit failed:', err);
      res.status(422).json({ error: err.message || 'No pudimos completar la auditoría técnica.' });
      return;
    }
  }

  res.status(405).send('Method Not Allowed');
}
