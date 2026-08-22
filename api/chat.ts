import { handleChatRequest } from '../src/server/chatHandler';

export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  return handleChatRequest(req);
}
