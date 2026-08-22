import type { Context } from '@netlify/functions';
import { handleChatRequest } from '../../src/server/chatHandler';

export default async (req: Request, _context: Context) => handleChatRequest(req);
