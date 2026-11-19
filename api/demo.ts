import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
  }
} catch (e) {
  console.warn('Redis init bypassed in demo API', e);
}

export interface DemoPayload {
  slug: string;
  nombre: string;
  rubro: string;
  telefono: string;
  comuna: string;
  foto?: string;
  urlOriginal?: string;
  createdAt: string;
}

const cleanPhone = (raw: string) => {
  const digits = raw.replace(/[^0-9]/g, '');
  if (digits.startsWith('56') && digits.length >= 11) return digits;
  if (digits.length === 9) return `56${digits}`;
  return digits;
};

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 50);
};

async function extractWithGroq(text: string): Promise<{ nombre?: string; rubro?: string; telefono?: string; comuna?: string; rut?: string } | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  try {
    const prompt = `Eres un extractor de datos comerciales para contratistas, transportistas y pymes en Chile.
Analiza la siguiente información (extraída de un anuncio de Marketplace, Facebook, Instagram, Google Maps, web o texto copiado de un prospecto) y devuelve ÚNICAMENTE un objeto JSON válido con este formato:
{
  "nombre": "Nombre de la empresa o contratista (ej: 'VIAJES ESPECIALES', 'Transportes San Bernardo', 'Maquinarias Gonzalez', 'Fletes Don Carlos', 'Maestranza El Roble')",
  "rubro": "maquinaria" | "transporte" | "transporte_pasajeros" | "maestranza" | "construccion" | "seguridad",
  "telefono": "Teléfono chileno limpio con formato 569XXXXXXXX (ej: 56991234567)",
  "comuna": "Comuna o ciudad en Chile (ej: Quilpué, Lampa, Colina, San Bernardo, Melipilla, Viña del Mar, Rancagua)"
}

Si habla de viajes especiales, vans, traslado de personal, aeropuerto, paseos de curso, turismo, matrimonios, traslados privados o pasajeros, rubro es 'transporte_pasajeros'.
Si habla de camiones, fletes de carga, ramplas, distribución, tolvas o mudanzas, rubro es 'transporte'.
Si habla de retroexcavadoras, excavadoras, tolvas o movimiento de tierras, rubro es 'maquinaria'.
Si habla de soldadura, estructuras metálicas, galpones o calderería, rubro es 'maestranza'.
Si habla de radier, hormigón, obras civiles o remodelaciones, rubro es 'construccion'.
Si habla de guardias, vigilancia, cámaras o conserjería, rubro es 'seguridad'.

Texto a procesar:
"""
${text.slice(0, 3000)}
"""`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      }),
      signal: AbortSignal.timeout(6000)
    });

    if (!res.ok) return null;
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    console.warn('Groq extraction fallback:', err);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Obtener demo por slug O servir HTML dinámico con OpenGraph personalizado para WhatsApp/Meta/Twitter
  if (req.method === 'GET') {
    const isHtmlRequest = (req.headers.accept || '').includes('text/html') || 
                          Boolean(req.query.e || req.query.empresa || req.query.r || req.query.rubro || !req.query.slug);

    if (isHtmlRequest) {
      let rawUrl = req.url || '';
      if (rawUrl.includes('%3F') || rawUrl.includes('%3f')) {
        rawUrl = rawUrl.replace(/%3[Ff]/g, '?');
      }
      let extraParams: URLSearchParams | null = null;
      if (rawUrl.includes('?')) {
        try {
          extraParams = new URLSearchParams(rawUrl.split('?')[1]);
        } catch {}
      }

      const empresa = (
        req.query.e || req.query.empresa || extraParams?.get('e') || extraParams?.get('empresa') || ''
      ).toString().trim();
      const rubro = (
        req.query.r || req.query.rubro || extraParams?.get('r') || extraParams?.get('rubro') || 'maquinaria'
      ).toString().trim().toLowerCase();
      const comuna = (
        req.query.c || req.query.comuna || extraParams?.get('c') || extraParams?.get('comuna') || ''
      ).toString().trim();
      const customFoto = (
        req.query.f || req.query.foto || extraParams?.get('f') || extraParams?.get('foto') || ''
      ).toString().trim();

      const RUBRO_INFO: Record<string, { title: string; image: string; desc: string }> = {
        maquinaria: {
          title: 'Arriendo de Maquinaria Pesada & Movimiento de Tierras',
          image: 'https://universo693.com/assets/maquinaria/hero-maquinaria-pesada.jpg',
          desc: 'Catálogo móvil para cotizaciones directas a WhatsApp.'
        },
        camion_pluma: {
          title: 'Arriendo de Camión Pluma, Grúa Móvil & Izaje',
          image: 'https://universo693.com/assets/camion_pluma/hero-camion-pluma.jpg',
          desc: 'Catálogo móvil para cotizaciones directas a WhatsApp.'
        },
        transporte_pasajeros: {
          title: 'Transporte Privado de Pasajeros, Vans & Personal',
          image: 'https://universo693.com/assets/pasajeros/hero-transporte-pasajeros.jpg',
          desc: 'Flota de vans ejecutivas y minibuses para cotizar en 1 clic directo a WhatsApp.'
        },
        transporte: {
          title: 'Transporte de Carga & Fletes',
          image: 'https://universo693.com/assets/transporte/hero-transporte-carga.jpg',
          desc: 'Flota de camiones y logística para cotizaciones directas.'
        },
        maestranza: {
          title: 'Taller de Maestranza, Estructuras & Soldadura',
          image: 'https://universo693.com/assets/maestranza/hero-maestranza-soldadura.jpg',
          desc: 'Catálogo técnico de fabricación y montaje industrial.'
        },
        construccion: {
          title: 'Construcción & Obras Civiles',
          image: 'https://universo693.com/assets/construccion/hero-construccion-obras.jpg',
          desc: 'Catálogo de obras y presupuestos directos.'
        },
        seguridad: {
          title: 'Seguridad Privada & Vigilancia OS-10',
          image: 'https://universo693.com/assets/seguridad/hero-seguridad-vigilancia.jpg',
          desc: 'Propuestas de seguridad y vigilancia en terreno.'
        }
      };

      // Tarjeta base institucional de Uni-Verso 693 para WhatsApp / Meta / Redes Sociales
      const baseTitle = 'Uni-Verso693 | Desarrollo de software, IA y Plataformas SaaS';
      const baseDesc = 'Desarrollo de software a medida, agentes de IA y apps móviles para empresas.';
      const baseImage = 'https://universo693.com/og-image.jpg';

      let html = '';
      try {
        const fs = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'dist', 'demo', 'index.html');
        if (fs.existsSync(filePath)) {
          html = fs.readFileSync(filePath, 'utf8');
        } else {
          const rootPath = path.join(process.cwd(), 'dist', 'index.html');
          if (fs.existsSync(rootPath)) {
            html = fs.readFileSync(rootPath, 'utf8');
          }
        }
      } catch (e) {
        console.warn('Could not read HTML from dist:', e);
      }

      if (html) {
        const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeTitle = esc(baseTitle);
        const safeDesc = esc(baseDesc);

        html = html
          .replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
          .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${safeTitle}" />`)
          .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${safeDesc}" />`)
          .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${baseImage}" />`)
          .replace(/<meta property="og:image:secure_url" content="[^"]*" \/>/, `<meta property="og:image:secure_url" content="${baseImage}" />`)
          .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${safeTitle}" />`)
          .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${safeDesc}" />`)
          .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${baseImage}" />`)
          .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="index, follow, max-image-preview:large" />');

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=3600');
        return res.status(200).send(html);
      }
    }

    const slug = (req.query.slug || req.query.id) as string;
    if (!slug) {
      return res.status(400).json({ error: 'Falta el parámetro slug' });
    }

    if (redis) {
      try {
        const stored = await redis.get<DemoPayload>(`u693:demo:${slug}`);
        if (stored) {
          return res.status(200).json({ success: true, demo: stored });
        }
      } catch (err) {
        console.warn('Error reading from Redis:', err);
      }
    }

    return res.status(404).json({ error: 'Demo no encontrada en caché' });
  }

  // POST: Generar nueva demo personalizada o extraer desde enlace/texto
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { url, rawInput, extractOnly, nombre, rubro, telefono, comuna, foto } = body;

      const inputUrlOrText = (url || rawInput || '').trim();

      let parsedNombre = (nombre || '').trim();
      let parsedRubro = (rubro || 'maquinaria').trim().toLowerCase();
      let parsedTelefono = cleanPhone(telefono || '');
      let parsedComuna = (comuna || '').trim();
      let parsedFoto = (foto || '').trim();
      let parsedRut = (body.rut || '').trim();

      // Si viene una URL o texto crudo, procesar extracción inteligente
      if (inputUrlOrText && (!parsedNombre || !parsedTelefono || extractOnly)) {
        let extractedContext = inputUrlOrText;

        // Limpiar URL si viene duplicada
        let targetUrl = inputUrlOrText;
        const matchUrl = inputUrlOrText.match(/(https?:\/\/[^\s"'<>]+)/i);
        if (matchUrl) {
          let singleUrl = matchUrl[1];
          const secondHttp = singleUrl.indexOf('http', 7);
          if (secondHttp !== -1) {
            singleUrl = singleUrl.substring(0, secondHttp);
          }
          targetUrl = singleUrl;
        }

        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          try {
            // Si es Facebook Marketplace, usar endpoint móvil que no exige login
            let fetchUrl = targetUrl;
            let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
            if (targetUrl.includes('facebook.com')) {
              fetchUrl = targetUrl.replace('www.facebook.com', 'm.facebook.com');
              ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1';
            }

            const resp = await fetch(fetchUrl, {
              headers: {
                'User-Agent': ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
              },
              signal: AbortSignal.timeout(6000)
            });

            if (resp.ok) {
              const html = await resp.text();
              const ogTitle = html.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);
              const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
              const ogDesc = html.match(/<meta property=["']og:description["'] content=["']([^"']+)["']/i);
              const metaDesc = html.match(/<meta name=["']description["'] content=["']([^"']+)["']/i);
              const ogImage = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);

              if (ogImage?.[1] && !ogImage[1].includes('favicon')) {
                parsedFoto = ogImage[1].replace(/&amp;/g, '&');
              }

              const cleanOgDesc = (ogDesc?.[1] || metaDesc?.[1] || '').replace(/&#x[0-9a-f]+;/gi, ' ');

              extractedContext = `URL: ${targetUrl}\n` +
                `Título: ${ogTitle?.[1] || titleMatch?.[1] || ''}\n` +
                `Descripción: ${cleanOgDesc}\n` +
                `Texto página: ${html.replace(/<[^>]+>/g, ' ').slice(0, 2000)}`;
            }
          } catch (fetchErr) {
            console.warn('Direct fetch failed, relying on URL path context:', fetchErr);
          }
        }

        // Ejecutar extracción con IA (Groq ultra-rápido)
        const aiExtracted = await extractWithGroq(extractedContext);
        if (aiExtracted) {
          if (!parsedNombre && aiExtracted.nombre) parsedNombre = aiExtracted.nombre;
          if ((!rubro || rubro === 'maquinaria') && aiExtracted.rubro) parsedRubro = aiExtracted.rubro;
          if (!parsedTelefono && aiExtracted.telefono) parsedTelefono = cleanPhone(aiExtracted.telefono);
          if (!parsedComuna && aiExtracted.comuna) parsedComuna = aiExtracted.comuna;
          if (!parsedRut && aiExtracted.rut) parsedRut = aiExtracted.rut;
        }

        // Si solo se pidió extraer datos para rellenar formulario en UI:
        if (extractOnly) {
          return res.status(200).json({
            success: true,
            extracted: {
              nombre: parsedNombre,
              rubro: parsedRubro,
              telefono: parsedTelefono,
              comuna: parsedComuna,
              rut: parsedRut,
              foto: parsedFoto
            }
          });
        }
      }

      if (!parsedNombre) {
        parsedNombre = 'Maquinarias & Faenas en Terreno';
      }

      const baseSlug = slugify(parsedNombre);
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const slug = `${baseSlug}-${randomSuffix}`;

      const demoData: DemoPayload = {
        slug,
        nombre: parsedNombre,
        rubro: parsedRubro,
        telefono: parsedTelefono || '56944194618',
        comuna: parsedComuna,
        foto: parsedFoto,
        urlOriginal: url || undefined,
        createdAt: new Date().toISOString()
      };

      // Guardar en Redis por 30 días si está disponible
      if (redis) {
        try {
          await redis.set(`u693:demo:${slug}`, demoData, { ex: 60 * 60 * 24 * 30 });
        } catch (saveErr) {
          console.warn('Error saving demo to Redis:', saveErr);
        }
      }

      // Generar enlaces listos
      const queryParams = new URLSearchParams({
        e: parsedNombre,
        r: parsedRubro,
        t: parsedTelefono || '56944194618',
        c: parsedComuna
      });
      if (parsedFoto) queryParams.set('f', parsedFoto);
      if (parsedRut) queryParams.set('rut', parsedRut);

      const demoUrl = `https://universo693.com/demo?${queryParams.toString()}`;
      const demoSlugUrl = `https://universo693.com/demo/${slug}`;

      // Redactar el Copy de WhatsApp para prospectar
      const whatsappPitch = `Hola ${parsedNombre}, buen día. Alexis por acá de UniVerso 693.

Vi su contacto buscando arriendo de maquinaria en ${parsedComuna}. Noté que quienes buscan máquinas en Google desde el celular no encuentran una página directa de ustedes para cotizar rápido, y terminan llamando a la competencia.

Les armé una vista previa de cómo quedaría su catálogo en el celular para recibir cotizaciones en 1 clic directo a su WhatsApp:
👉 ${demoUrl}

*(Ojo: es solo una maqueta de referencia para que vea la idea; las fotos, textos, logo y servicios se adaptan 100% a su empresa y a su gusto).*

Se las dejamos 100% instalada hoy mismo con su propio dominio .CL, su flota y su teléfono por $85.000 pago único (sin mensualidades obligatorias).

¿Le damos una mirada y se las dejamos lista hoy? Saludos!`;

      const whatsappDirectLink = parsedTelefono
        ? `https://wa.me/${parsedTelefono}?text=${encodeURIComponent(whatsappPitch)}`
        : null;

      return res.status(200).json({
        success: true,
        slug,
        nombre: parsedNombre,
        rubro: parsedRubro,
        telefono: parsedTelefono,
        comuna: parsedComuna,
        demoUrl,
        demoSlugUrl,
        whatsappPitch,
        whatsappDirectLink
      });
    } catch (err: any) {
      console.error('Error generating demo:', err);
      return res.status(500).json({ error: 'Error al generar demo', details: err?.message });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
