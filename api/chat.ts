import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleChatRequest } from '../src/server/chatHandler';

// Node.js runtime (default here — no `edge` config) because the Anthropic SDK
// pulls in node:fs/node:path internally, which Vercel's Edge runtime rejects.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const webRequest = new Request('https://internal/api/chat', {
    method: req.method,
    headers: { 'content-type': 'application/json' },
    body: req.method === 'POST' ? JSON.stringify(req.body ?? {}) : undefined,
  });

  const webResponse = await handleChatRequest(webRequest);
  const text = await webResponse.text();

  webResponse.headers.forEach((value, key) => res.setHeader(key, value));
  res.status(webResponse.status).send(text);
}
