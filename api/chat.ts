import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Self-contained on purpose: Vercel's Node.js function bundler failed to trace/include
// a relative import into src/server/ at runtime (ERR_MODULE_NOT_FOUND for
// /var/task/src/server/chatHandler). Keeping the full handler inline here avoids that
// cross-directory bundling issue entirely. netlify/functions/chat.mts keeps using the
// shared src/server/chatHandler.ts, since Netlify's bundler traces it correctly.

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

const SYSTEM_PROMPT = `You are the live AI agent demo embedded on the Uni-Verso693 AI agency homepage. Uni-Verso693 builds 24/7 AI agents, AI short videos/reels, professional landing pages, and graphic design (logos, flyers, vectorization) for businesses.

You ARE the product being demoed: a real, working AI agent, so speak with confidence about what Uni-Verso693 can build for the visitor.
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
      const raw = process.env.ANTHROPIC_API_KEY ?? '';
      console.error('Anthropic auth error — check ANTHROPIC_API_KEY:', error.message);
      console.error(
        `ANTHROPIC_API_KEY diagnostic — length: ${raw.length}, starts: "${raw.slice(0, 14)}", ends: "${raw.slice(-6)}", hasWhitespace: ${/\s/.test(raw)}`
      );
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
