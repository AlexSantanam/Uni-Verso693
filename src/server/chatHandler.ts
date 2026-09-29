import Anthropic from '@anthropic-ai/sdk';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

// Real, shared per-IP rate limit backed by Upstash Redis (REST-based, works fine
// from serverless/edge). Unlike an in-memory counter, this is consistent across
// every function instance/region, since they all check the same Redis store.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, '60 s'),
  prefix: 'uniVerso693ChatRatelimit',
});

const getClientKey = (req: Request): string =>
  req.headers.get('x-nf-client-connection-ip') ??
  req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
  'unknown';

const SYSTEM_PROMPT = `You are the live AI agent embedded on the website of Uni-Verso693, a software development company. Uni-Verso693 designs and builds, end-to-end:
- Custom software: SaaS platforms, internal systems, backends, APIs and ERP/CRM integrations
- AI agents and automation (WhatsApp, web, CRM; RAG knowledge bases; Make/n8n workflows)
- Native and cross-platform mobile apps for iOS and Android
- Web, e-commerce and digital product, including UX/UI and brand identity
- Technology consulting and architecture (process audits, roadmaps with estimated ROI)

Real projects you can mention:
- YndiPet (yndipet.com): Uni-Verso693's own pet-care app with AI for Chile — digital medical records, an AI assistant that uses each pet's history, SOS loss alerts, QR identification and microchip registration.
- MEMORA (memora.lat): SaaS for digital memorials of people and pets, with real payments (Flow, Mercado Pago, PayPal), Postgres with row-level security and an Android app on Google Play.
- MELSA: editorial real-estate website for MELSA Gestión Inmobiliaria.

You are yourself a working example of the AI agents Uni-Verso693 builds, so speak with confidence.
Reply in whichever language the visitor writes in (English or Spanish).
Keep replies short and conversational: 2 to 4 sentences, no markdown formatting.
There are no fixed price plans: every project is quoted after a discovery session. For pricing or next steps, invite them to the Contact page (/contacto), where the team replies within 2 hours.
Don't invent facts, clients or figures beyond what is listed here, don't make up details about the visitor's business, and don't discuss anything unrelated to Uni-Verso693's services.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

/**
 * Platform-agnostic handler shared by the Netlify Function (netlify/functions/chat.mts)
 * and the Vercel Edge Function (api/chat.ts) — both call this with the standard
 * Fetch API Request they each receive natively.
 */
export const handleChatRequest = async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { success } = await ratelimit.limit(getClientKey(req));
  if (!success) {
    return jsonResponse(429, { error: 'Too many requests — please slow down and try again in a minute.' });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];

  const messages: ChatMessage[] = incoming
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return jsonResponse(400, { error: 'Last message must be from the user' });
  }

  const client = new Anthropic();

  try {
    const start = Date.now();
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 400,
      output_config: { effort: 'low' },
      system: SYSTEM_PROMPT,
      messages,
    });
    const latencyMs = Date.now() - start;

    const reply = response.content.find((block) => block.type === 'text')?.text ?? '';

    return jsonResponse(200, { reply, latencyMs });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return jsonResponse(429, { error: 'Rate limited, please try again shortly.' });
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('Anthropic auth error — check ANTHROPIC_API_KEY:', error.message);
      return jsonResponse(500, { error: 'Server misconfiguration.' });
    }
    if (error instanceof Anthropic.APIConnectionError) {
      console.error('Anthropic connection error:', error.message);
      return jsonResponse(502, { error: 'Could not reach the AI service.' });
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error:', error.status, error.message);
      return jsonResponse(502, { error: 'AI service error.' });
    }
    console.error('Unexpected error calling Anthropic:', error);
    return jsonResponse(500, { error: 'Unexpected server error.' });
  }
};
