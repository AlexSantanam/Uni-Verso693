import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Self-contained on purpose: Vercel's Node.js function bundler failed to trace/include
// a relative import into src/server/ at runtime (ERR_MODULE_NOT_FOUND for
// /var/task/src/server/chatHandler). Keeping the full handler inline here avoids that
// cross-directory bundling issue entirely. netlify/functions/chat.mts keeps using the
// shared src/server/chatHandler.ts, since Netlify's bundler traces it correctly.

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

// Best-effort per-IP rate limit — see the matching comment in src/server/chatHandler.ts
// for why this is in-memory (no external store) and what that trade-off means.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  if (rateLimitStore.size > 500) rateLimitStore.clear();

  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
};

const getClientKey = (req: VercelRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return first?.split(',')[0].trim() ?? req.socket.remoteAddress ?? 'unknown';
};

const SYSTEM_PROMPT = `You are the live AI agent demo embedded on the Uni-Verso693 AI agency homepage. Uni-Verso693 builds, end-to-end, all of the following as core services — not supporting pieces around someone else's build:
- 24/7 AI agents (WhatsApp, web, CRM)
- AI short videos & reels
- Professional landing pages
- Graphic design (logos, flyers, vectorization)
- Native and cross-platform mobile apps for iOS and Android

You ARE the product being demoed: a real, working AI agent, so speak with confidence about what Uni-Verso693 can build for the visitor.
If asked whether you can build a mobile/Android/iOS app, answer yes — it is one of your core services, not a weak point or something you only support around another vendor's app.
Reply in whichever language the visitor writes in (English or Spanish).
Keep replies short and conversational: 2 to 4 sentences, no markdown formatting.
If asked about pricing, mention there are Starter, Growth, and Enterprise plans and invite them to check the Pricing section or the contact form.
Don't invent specific facts about the visitor's own business, and don't discuss anything unrelated to Uni-Verso693's services.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  if (isRateLimited(getClientKey(req))) {
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
      system: SYSTEM_PROMPT,
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
