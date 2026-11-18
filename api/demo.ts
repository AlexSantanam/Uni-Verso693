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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Obtener demo por slug
  if (req.method === 'GET') {
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

  // POST: Generar nueva demo personalizada
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { url, nombre, rubro, telefono, comuna, foto } = body;

      let parsedNombre = (nombre || '').trim();
      let parsedRubro = (rubro || 'maquinaria').trim().toLowerCase();
      let parsedTelefono = cleanPhone(telefono || '');
      let parsedComuna = (comuna || 'Chile').trim();
      let parsedFoto = (foto || '').trim();

      // Si viene una URL pública (Facebook, Maps, Web), intentamos raspar metadatos básicos
      if (url && !parsedNombre) {
        try {
          const resp = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml'
            },
            signal: AbortSignal.timeout(5000)
          });
          if (resp.ok) {
            const html = await resp.text();
            
            // Extraer título
            const ogTitle = html.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);
            const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
            const foundTitle = ogTitle?.[1] || titleMatch?.[1];
            if (foundTitle) {
              parsedNombre = foundTitle.split('|')[0].split('-')[0].split('•')[0].trim();
            }

            // Extraer imagen si no venía
            if (!parsedFoto) {
              const ogImage = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
              if (ogImage?.[1] && !ogImage[1].includes('favicon')) {
                parsedFoto = ogImage[1];
              }
            }

            // Extraer teléfono si está en el texto
            if (!parsedTelefono) {
              const phoneMatch = html.match(/(\+?56\s?9\s?\d{4}\s?\d{4}|\b9\d{8}\b)/);
              if (phoneMatch) {
                parsedTelefono = cleanPhone(phoneMatch[0]);
              }
            }
          }
        } catch (scrapErr) {
          console.warn('Scraping error (falling back to manual fields):', scrapErr);
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

      const demoUrl = `https://universo693.com/demo?${queryParams.toString()}`;
      const demoSlugUrl = `https://universo693.com/demo/${slug}`;

      // Redactar el Copy de WhatsApp para prospectar
      const whatsappPitch = `Hola ${parsedNombre}, buen día. Alexis por acá de UniVerso 693.

Vi su contacto buscando arriendo de maquinaria en ${parsedComuna}. Noté que quienes buscan máquinas en Google desde el celular no encuentran una página directa de ustedes para cotizar rápido, y terminan llamando a la competencia.

Les armé una vista previa de cómo quedaría su catálogo en el celular para recibir cotizaciones en 1 clic directo a su WhatsApp:
👉 ${demoUrl}

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
