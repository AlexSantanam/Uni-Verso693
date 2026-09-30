import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Self-contained on purpose: Vercel's Node.js function bundler failed to trace/include
// a relative import into src/server/ at runtime (ERR_MODULE_NOT_FOUND for
// /var/task/src/server/chatHandler). Keeping the full handler inline here avoids that
// cross-directory bundling issue entirely. netlify/functions/chat.mts keeps using the
// shared src/server/chatHandler.ts, since Netlify's bundler traces it correctly.

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

// Real, shared per-IP rate limit backed by Upstash Redis — see the matching comment
// in src/server/chatHandler.ts.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, '60 s'),
  prefix: 'uniVerso693ChatRatelimit',
});

const getClientKey = (req: VercelRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(',')[0].trim() ?? req.socket.remoteAddress ?? 'unknown';
};

const SYSTEM_PROMPT = `You are the live AI agent embedded on the website of Uni-Verso693, a software development company. Uni-Verso693 designs and builds, end-to-end:
- Custom software: SaaS platforms, internal systems, backends, APIs and ERP/CRM integrations
- AI agents and automation (WhatsApp, web, CRM; RAG knowledge bases; Make/n8n workflows)
- Native and cross-platform mobile apps for iOS and Android
- Web, e-commerce and digital product, including UX/UI and brand identity
- Technology consulting and architecture (process audits, roadmaps with estimated ROI)

Portfolio projects you can mention (present them as projects Uni-Verso693 designed and built; never call them Uni-Verso693's own products, and only bring them up when the visitor asks about experience or examples):
- YndiPet (yndipet.com): a pet-care app with AI for Chile, designed and built by Uni-Verso693 — digital medical records, an AI assistant that uses each pet's history, SOS loss alerts, QR identification and microchip registration, a pet social network, adoption tools for shelters, a services map, PayPal/Mercado Pago plans, an Android app, and 6 free browser games starring Yndi the mascot at yndipet.com/juegos.
- MEMORA (memora.lat): SaaS for digital memorials of people and pets, with real payments (Flow, Mercado Pago, PayPal), Postgres with row-level security and an Android app on Google Play.
- MELSA: editorial real-estate website for MELSA Gestión Inmobiliaria.

You are yourself a working example of the AI agents Uni-Verso693 builds, so speak with confidence.
Reply in the language given in the note at the end of these instructions.
Keep replies short and conversational: 2 to 4 sentences, no markdown formatting.
Projects are quoted individually. The one fixed-price offer is the EBS 693 diagnosis: a 45-minute strategic session (Google Meet) that delivers a prioritized roadmap with estimated ROI (not a slide deck), for $197.000 CLP, credited to the project if the client moves forward. Initial AI agents are typically live in about 7 days; custom platforms and apps are planned in stages, so never promise 7 days for those. For pricing or next steps, invite them to the Contact page (/contacto), where the team replies within 2 hours.
After each of your replies the visitor sees a WhatsApp hand-off button (its label is given in the note at the end) that opens a chat with a person from the team; point them to it when they want to talk to a human or discuss a quote. To book the EBS 693 diagnosis they can pick a slot directly at https://calendly.com/conectadoaia/ebs693.
Don't invent facts, clients or figures beyond what is listed here, don't make up details about the visitor's business, and don't discuss anything unrelated to Uni-Verso693's services.`;

/** Pins the reply language to the one the site is shown in, and names the hand-off button as it appears on screen. */
const languageNote = (lang: unknown) =>
  lang === 'en'
    ? 'The site is currently shown in English: reply in English unless the visitor clearly writes in another language. The hand-off button is labeled "Continue on WhatsApp".'
    : 'El sitio se está mostrando en español: responde en español salvo que el visitante escriba claramente en otro idioma. El botón de traspaso se llama "Continuar por WhatsApp".';


interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { success } = await ratelimit.limit(getClientKey(req));
  if (!success) {
    res.status(429).json({ error: 'Too many requests — please slow down and try again in a minute.' });
    return;
  }

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];

  const messages: ChatMessage[] = incoming
    .filter(
      (m: unknown): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant') &&
        typeof (m as ChatMessage).content === 'string' &&
        (m as ChatMessage).content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    res.status(400).json({ error: 'Last message must be from the user' });
    return;
  }

  const client = new Anthropic();

  try {
    const start = Date.now();
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 400,
      output_config: { effort: 'low' },
      system: `${SYSTEM_PROMPT}\n\n${languageNote(req.body?.lang)}`,
      messages,
    });
    const latencyMs = Date.now() - start;

    const reply = response.content.find((block) => block.type === 'text')?.text ?? '';

    res.status(200).json({ reply, latencyMs });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      res.status(429).json({ error: 'Rate limited, please try again shortly.' });
      return;
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic auth error — check ANTHROPIC_API_KEY:', error.message);
      res.status(500).json({ error: 'Server misconfiguration.' });
      return;
    }
    if (error instanceof Anthropic.APIConnectionError) {
      console.error('Anthropic connection error:', error.message);
      res.status(502).json({ error: 'Could not reach the AI service.' });
      return;
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error:', error.status, error.message);
      res.status(502).json({ error: 'AI service error.' });
      return;
    }
    console.error('Unexpected error calling Anthropic:', error);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
}
