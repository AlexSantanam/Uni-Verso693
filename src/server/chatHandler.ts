import Anthropic from '@anthropic-ai/sdk';

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
