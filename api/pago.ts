import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'node:crypto';
import { Redis } from '@upstash/redis';

const SITE_URL = 'https://universo693.com';

const mpToken = () =>
  process.env.MP_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN;

const mpApi = async (path: string, init?: RequestInit) => {
  const token = mpToken();
  if (!token) throw new Error('MERCADOPAGO_ACCESS_TOKEN no configurado');

  const res = await fetch(`https://api.mercadopago.com${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Mercado Pago ${path} ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  }
  return data as any;
};

// Catálogo oficial de items facturables de Uni-Verso693 & Sokify
export const CATALOG: Record<
  string,
  { id: string; title: string; category: string; amount: number; description: string; frequency?: string; badge?: string }
> = {
  'sokify-mensual': {
    id: 'sokify-mensual',
    title: 'Sokify · Plan Mensual',
    category: 'sokify',
    amount: 15900,
    description: 'Suscripción mensual al Sistema Operativo Gastronómico (Menú QR, KDS, POS, 0% comisión).',
    frequency: 'CLP / mes',
    badge: 'Popular',
  },
  'sokify-anual': {
    id: 'sokify-anual',
    title: 'Sokify · Plan Anual Fundador (64% OFF)',
    category: 'sokify',
    amount: 69000,
    description: '1 año completo de Sokify todo incluido ($5.750/mes con precio congelado).',
    frequency: 'CLP / año',
    badge: 'Ahorro 64%',
  },
  'sokify-anual-ia': {
    id: 'sokify-anual-ia',
    title: 'Sokify · Plan Anual + Copiloto IA WhatsApp',
    category: 'sokify',
    amount: 88900,
    description: '1 año completo de Sokify + Asistente virtual Sofi IA atendiendo pedidos en WhatsApp 24/7.',
    frequency: 'CLP / año',
    badge: 'Pack Completo',
  },
  'sokify-dominio': {
    id: 'sokify-dominio',
    title: 'Sokify Add-on · Dominio Propio + Correos Ilimitados',
    category: 'sokify',
    amount: 6900,
    description: 'Dominio propio (.CL o .COM) con correos corporativos ilimitados configurados para tu local.',
    frequency: 'CLP / mes',
  },
  'sokify-ia-whatsapp': {
    id: 'sokify-ia-whatsapp',
    title: 'Sokify Add-on · Copiloto Sofi IA WhatsApp',
    category: 'sokify',
    amount: 19900,
    description: 'Atención 24/7 y toma de pedidos con IA en tu WhatsApp oficial.',
    frequency: 'CLP / mes',
  },
  'sokify-sii': {
    id: 'sokify-sii',
    title: 'Sokify Add-on · Facturación Electrónica SII Directa',
    category: 'sokify',
    amount: 9900,
    description: 'Emisión automática de boletas y facturas tributarias del SII desde el POS.',
    frequency: 'CLP / mes',
  },
  'ebs-693': {
    id: 'ebs-693',
    title: 'EBS 693 · Diagnóstico Estratégico de IA',
    category: 'universo693',
    amount: 197000,
    description: 'Sesión de 45 minutos con arquitecto senior. Hoja de ruta priorizada y estimación de ROI.',
    frequency: 'Pago único',
  },
  'audit-pro': {
    id: 'audit-pro',
    title: 'AUDIT 693 PRO · Informe de Fugas de Dinero',
    category: 'universo693',
    amount: 19990,
    description: 'Auditoría integral web, análisis de competidores y cálculo de costo manual en PDF.',
    frequency: 'Pago único',
  },
  'impulsa-pyme': {
    id: 'impulsa-pyme',
    title: 'Impulsa PyME · Arriendo Web Todo Incluido',
    category: 'universo693',
    amount: 19900,
    description: 'Sitio web corporativo de alta velocidad, hosting cloud y soporte continuo.',
    frequency: 'CLP / mes',
  },
};

const recordLead = async (lead: Record<string, unknown> & { id: string }) => {
  try {
    const r = Redis.fromEnv();
    await r.set(`u693:lead:${lead.id}`, { status: 'nuevo', createdAt: new Date().toISOString(), ...lead });
    await r.zadd('u693:leads', { score: Date.now(), member: lead.id });
  } catch (err) {
    console.error('Lead record failed', err);
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const action = req.query.action as string | undefined;

  // 1. WEBHOOK DE MERCADO PAGO
  if (action === 'mp-webhook' || req.query['data.id']) {
    try {
      const topic = req.query.topic || req.query.type;
      const paymentId = req.query['data.id'] || req.body?.data?.id || req.query.id;

      if ((topic === 'payment' || req.query['data.id']) && paymentId && mpToken()) {
        const p = await mpApi(`/v1/payments/${encodeURIComponent(String(paymentId))}`);
        if (p?.status === 'approved') {
          try {
            const r = Redis.fromEnv();
            await r.set(`u693:payment:${p.id}`, {
              paymentId: p.id,
              orderId: p.external_reference,
              amount: p.transaction_amount,
              status: p.status,
              payerEmail: p.payer?.email,
              approvedAt: p.date_approved,
            });
          } catch (e) {
            console.error('Error saving payment in Redis', e);
          }
        }
      }
      res.status(200).send('ok');
      return;
    } catch (err) {
      console.error('Webhook processing error', err);
      res.status(200).send('ok');
      return;
    }
  }

  // 2. GET: ESTADO DEL GATEWAY Y CATÁLOGO
  if (req.method === 'GET') {
    res.status(200).json({
      active: Boolean(mpToken()),
      provider: 'mercadopago',
      catalog: CATALOG,
      bankTransfer: {
        accountHolder: 'Universo693 SpA',
        bank: 'Banco Santander / BancoEstado',
        accountType: 'Cuenta Corriente',
        currency: 'CLP',
        contactEmail: 'contacto@universo693.com',
        whatsapp: '+56 9 9038 7414',
      },
    });
    return;
  }

  // 3. POST: CREAR PREFERENCIA DE CHECKOUT MERCADO PAGO
  if (req.method === 'POST') {
    try {
      const b = (req.body ?? {}) as Record<string, any>;
      const itemId = String(b.item || 'sokify-mensual');
      const standardItem = CATALOG[itemId];

      // Monto y título: estándar del catálogo o personalizado
      const isCustom = itemId === 'custom' || !standardItem;
      const title = isCustom ? String(b.title || 'Servicio Profesional Uni-Verso693').slice(0, 120) : standardItem.title;
      const amount = isCustom ? Math.max(1000, Math.round(Number(b.amount) || 10000)) : standardItem.amount;

      const orderId = `u693-${Date.now().toString(36)}-${randomUUID().slice(0, 4)}`;
      const email = String(b.email || '').trim();
      const fullName = String(b.fullName || b.name || 'Cliente').trim();
      const phone = String(b.phone || '').trim();
      const restaurantSlug = String(b.ref || b.restaurantSlug || '').trim();
      const rut = String(b.rut || '').trim();

      if (!mpToken()) {
        res.status(503).json({ error: 'Pasarela Mercado Pago temporalmente no configurada.' });
        return;
      }

      const returnUrl = (status: string) =>
        `${SITE_URL}/pago?status=${status}&orderId=${orderId}&item=${encodeURIComponent(itemId)}${restaurantSlug ? `&ref=${encodeURIComponent(restaurantSlug)}` : ''}`;

      // Crear Preferencia en la API oficial de Mercado Pago
      const pref = await mpApi('/checkout/preferences', {
        method: 'POST',
        headers: { 'x-idempotency-key': orderId },
        body: JSON.stringify({
          items: [
            {
              id: itemId,
              title: title,
              quantity: 1,
              currency_id: 'CLP',
              unit_price: amount,
              description: standardItem ? standardItem.description.slice(0, 250) : `Pago de servicio: ${title}`,
            },
          ],
          payer: {
            name: fullName,
            email: email || 'cliente@universo693.com',
            phone: phone ? { number: phone } : undefined,
          },
          external_reference: orderId,
          back_urls: {
            success: returnUrl('success'),
            pending: returnUrl('pending'),
            failure: returnUrl('failure'),
          },
          auto_return: 'approved',
          notification_url: `${SITE_URL}/api/pago?action=mp-webhook`,
          statement_descriptor: 'UNIVERSO693',
          metadata: {
            restaurantSlug,
            rut,
            itemId,
          },
        }),
      });

      // Registrar lead / intento de pago en el CRM
      await recordLead({
        id: `pay-${orderId}`,
        source: 'checkout-portal',
        name: fullName,
        email: email,
        phone: phone,
        notes: `Checkout: ${title} ($${amount.toLocaleString('es-CL')} CLP) · Ref: ${restaurantSlug || 'N/A'} · RUT: ${rut || 'N/A'}`,
      });

      res.status(200).json({
        ok: true,
        orderId,
        checkoutUrl: pref.init_point,
        sandboxUrl: pref.sandbox_init_point,
      });
      return;
    } catch (err: any) {
      console.error('Error al generar checkout Mercado Pago:', err);
      res.status(500).json({ error: err.message || 'Error procesando preferencia de pago.' });
      return;
    }
  }

  res.status(405).json({ error: 'Método no permitido' });
}
