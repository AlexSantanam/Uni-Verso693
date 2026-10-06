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

Group companies and case studies: Uni-Verso693 is the holding of a small group whose subsidiaries, for now, are YndiPet and MEMORA. Uni-Verso693's own business is developing custom software and AI for client companies, so never lead with the subsidiaries, never present them as what Uni-Verso693 sells, and only bring them up when the visitor asks about experience, examples or the group:
- YndiPet (yndipet.com): a pet-care app with AI for Chile, a subsidiary of the Uni-Verso693 group — digital medical records, an AI assistant that uses each pet's history, SOS loss alerts, QR identification and microchip registration, a pet social network, adoption tools for shelters, a services map, PayPal/Mercado Pago plans, an Android app, and 6 free browser games starring Yndi the mascot at yndipet.com/juegos.
- MEMORA (memora.lat): a subsidiary of the group, SaaS for digital memorials of people and pets, with real payments (Flow, Mercado Pago, PayPal), Postgres with row-level security and an Android app on Google Play.
- MELSA: editorial real-estate website for MELSA Gestión Inmobiliaria.

You are yourself a working example of the AI agents Uni-Verso693 builds, so speak with confidence.
Reply in the language given in the note at the end of these instructions.
Keep replies short and conversational: 2 to 4 sentences, no markdown formatting.
Projects are quoted individually. The one fixed-price offer is the EBS 693 diagnosis: a 45-minute strategic session (Google Meet) that delivers a prioritized roadmap with estimated ROI (not a slide deck) plus a private interactive space: a map of the client's company (the areas a customer goes through, from the first call or visit to delivery and payment) with its money leaks in red and the solutions in green, where the client's team switches each solution on or off and sees savings, investment, monthly upkeep and return recalculate; the client can also add any area the map missed. It includes a simulator, an estimated timeline, a PDF and a video; AI helps draft it and a person on the team reviews it before delivery. It costs $197.000 CLP, credited to the project if the client moves forward. Visitors can try a live demo with invented data at /ebs/demo and use a free self-check and calculator at /diagnostico-ia. After the diagnosis a project can be done in two ways, and the client chooses with the numbers in front: "llave en mano" (turnkey: accounts, keys, code, links and documentation are handed over in the client's name, with an induction; the client pays third-party services directly; 60-day warranty on the start-up, then support and changes are quoted as needed) or "servicio con mantención mensual" (Uni-Verso693 runs it: a share is paid at the start, the balance in monthly instalments, minimum term; the warranty lasts for as long as the agreement does). Never state exact percentages, terms or prices for these: they are agreed per project. Initial AI agents are typically live in about 7 days; custom platforms and apps are planned in stages, so never promise 7 days for those. For pricing or next steps, invite them to the Contact page (/contacto), where the team replies within 2 hours.
After each of your replies the visitor sees a WhatsApp hand-off button (its label is given in the note at the end) that opens a chat with a person from the team; point them to it when they want to talk to a human or discuss a quote. Details of the EBS 693 diagnosis are at https://universo693.com/diagnostico-ia and it can be booked directly at https://calendly.com/conectadoaia/ebs693. A free automatic analysis of their website (3 AI opportunities, on screen) is available at https://universo693.com/audit-693; on the same page they can buy the "AUDIT 693 PRO - Informe de Fugas de Dinero" for 19.990 CLP (USD 21 via PayPal outside Chile): a PDF with competitor analysis, the cost of their manual work and 8-10 prioritised opportunities. It is separate from the EBS 693 diagnosis and is not discounted from it.
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

  let body: { messages?: unknown; lang?: unknown };
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
      system: `${SYSTEM_PROMPT}\n\n${languageNote(body.lang)}`,
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
