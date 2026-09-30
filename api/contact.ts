import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Real, shared per-IP rate limit backed by Upstash Redis — see the matching comment
// in api/chat.ts. Contact submissions are naturally rare, so this is a looser window
// than the chat's (mainly to blunt scripted spam, not slow down real visitors).
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  prefix: 'uniVerso693ContactRatelimit',
});

const getClientKey = (req: VercelRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(',')[0].trim() ?? req.socket.remoteAddress ?? 'unknown';
};

interface ContactPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  serviceInterest?: string;
  budget?: string;
  preferredDate?: string;
  notes?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { success } = await ratelimit.limit(getClientKey(req));
  if (!success) {
    res.status(429).json({ error: 'Too many requests — please try again later.' });
    return;
  }

  const body = (req.body ?? {}) as ContactPayload;
  const fullName = (body.fullName ?? '').trim().slice(0, 200);
  const email = (body.email ?? '').trim().slice(0, 200);
  const phone = (body.phone ?? '').trim().slice(0, 60);

  if (!fullName || !email || !phone) {
    res.status(400).json({ error: 'fullName, email, and phone are required' });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!notifyTo) {
    console.error('CONTACT_NOTIFICATION_EMAIL is not set');
    res.status(500).json({ error: 'Server misconfiguration.' });
    return;
  }

  const fields: [string, string | undefined][] = [
    ['Nombre', fullName],
    ['Email', email],
    ['Teléfono', phone],
    ['Empresa / Sitio', body.companyName?.slice(0, 300)],
    ['Interés', body.serviceInterest?.slice(0, 200)],
    ['Presupuesto', body.budget?.slice(0, 100)],
    ['Fecha preferida', body.preferredDate?.slice(0, 40)],
    ['Notas', body.notes?.slice(0, 2000)],
  ];

  const htmlRows = fields
    .filter(([, value]) => !!value && value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#9333ea;font-weight:bold;white-space:nowrap;">${label}</td><td style="padding:4px 0;">${escapeHtml(value!).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('');

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Uni-Verso693 <contacto@universo693.com>',
      to: notifyTo,
      replyTo: email,
      subject: `[Uni-Verso693] Nueva solicitud de auditoría — ${fullName}`,
      html: `<table style="font-family:sans-serif;font-size:14px;">${htmlRows}</table>`,
    });

    if (error) {
      console.error('Resend error sending contact notification:', error);
      res.status(502).json({ error: 'Could not send your request. Please try again or contact us directly.' });
      return;
    }

    // Best-effort confirmation to the lead — failure here shouldn't fail the request,
    // the business-facing notification above already went through.
    try {
      await resend.emails.send({
        from: 'Uni-Verso693 <contacto@universo693.com>',
        to: email,
        subject: 'Recibimos tu solicitud — Uni-Verso693',
        html: `<p>Hola ${escapeHtml(fullName)},</p><p>Gracias por contactar a Uni-Verso693. Un especialista revisará tu solicitud y se pondrá en contacto contigo dentro de las próximas 2 horas.</p>`,
      });
    } catch (confirmError) {
      console.error('Failed to send lead confirmation email:', confirmError);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Unexpected error sending contact email:', error);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
}
