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
  "nombre": "Nombre de la empresa o contratista (ej: 'Transportes San Bernardo', 'Maquinarias Gonzalez', 'Fletes Don Carlos', 'Maestranza El Roble')",
  "rubro": "maquinaria" | "transporte" | "maestranza" | "construccion" | "seguridad",
  "telefono": "Teléfono chileno limpio con formato 569XXXXXXXX (ej: 56991234567)",
  "comuna": "Comuna o ciudad en Chile (ej: Lampa, Colina, San Bernardo, Melipilla, Viña del Mar, Rancagua)"
}

Si falta el nombre exacto, genera uno formal a partir del rubro y la comuna (ej: 'Arriendo de Maquinaria Lampa' o 'Transportes y Fletes San Bernardo').
Si habla de camiones, fletes, ramplas, distribución o mudanzas, rubro es 'transporte'.
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

        if (inputUrlOrText.startsWith('http://') || inputUrlOrText.startsWith('https://')) {
          try {
            const resp = await fetch(inputUrlOrText, {
              headers: {
                'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php) Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
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
                parsedFoto = ogImage[1];
              }

              extractedContext = `URL: ${inputUrlOrText}\n` +
                `Título: ${ogTitle?.[1] || titleMatch?.[1] || ''}\n` +
                `Descripción: ${ogDesc?.[1] || metaDesc?.[1] || ''}\n` +
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
