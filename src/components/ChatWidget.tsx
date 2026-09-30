import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Loader2, X, Sparkles } from 'lucide-react';
import { useLang } from '../lib/lang';
import { WhatsAppButton } from './WhatsAppButton';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const text = {
  es: {
    title: 'Agente de IA en vivo',
    greeting: '¡Hola! Soy el agente de IA de Uni-Verso693. Pregúntame por nuestros servicios de software, agentes de IA o apps móviles.',
    placeholder: 'Escribe tu pregunta...',
    thinking: 'Pensando...',
    error: 'Algo salió mal. Intenta de nuevo o usa el formulario de contacto.',
    powered: 'Agente real, impulsado por Claude',
    open: 'Abrir chat',
    handoff: '¿Prefieres seguir con una persona del equipo?',
    handoffButton: 'Continuar por WhatsApp',
    handoffMessage: (q: string) =>
      q ? `Hola, vengo del chat de Uni-Verso693. Mi consulta: "${q}"` : 'Hola, vengo del chat de Uni-Verso693.',
  },
  en: {
    title: 'Live AI agent',
    greeting: "Hi! I'm Uni-Verso693's AI agent. Ask me about our software services, AI agents or mobile apps.",
    placeholder: 'Type your question...',
    thinking: 'Thinking...',
    error: 'Something went wrong. Please try again or use the contact form.',
    powered: 'Real agent, powered by Claude',
    open: 'Open chat',
    handoff: 'Would you rather continue with someone from the team?',
    handoffButton: 'Continue on WhatsApp',
    handoffMessage: (q: string) =>
      q ? `Hi, I'm coming from the Uni-Verso693 chat. My question: "${q}"` : "Hi, I'm coming from the Uni-Verso693 chat.",
  },
};

/** Most recent visitor question, trimmed so the WhatsApp prefill stays short. */
const lastUserQuestion = (messages: ChatMessage[]) => {
  const q = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  return q.length > 200 ? `${q.slice(0, 200)}…` : q;
};

export const ChatWidget: React.FC = () => {
  const { lang } = useLang();
  const t = text[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[calc(100vw-2.5rem)] sm:w-96 rounded-3xl bg-[#0a1420] border border-white/10 shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between bg-ink px-5 py-4">
            <div className="flex items-center gap-2 text-white text-sm font-bold">
              <Sparkles className="w-4 h-4 text-brand-500" />
              {t.title}
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white cursor-pointer" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="space-y-3 p-4 h-80 overflow-y-auto bg-[#070f19] text-sm">
            <div className="rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 p-3 text-slate-300 leading-relaxed">
              {t.greeting}
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-8 rounded-2xl rounded-tr-sm bg-brand-600 text-white p-3 leading-relaxed'
                    : 'mr-8 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 p-3 text-slate-300 leading-relaxed'
                }
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {t.thinking}
              </div>
            )}
            {/* after the agent answers, offer to continue with a person on WhatsApp */}
            {!isLoading && messages[messages.length - 1]?.role === 'assistant' && (
              <div className="pt-1">
                <p className="mb-2 text-xs text-slate-400">{t.handoff}</p>
                <WhatsAppButton
                  message={t.handoffMessage(lastUserQuestion(messages))}
                  label={t.handoffButton}
                  className="w-full py-2.5!"
                />
              </div>
            )}
            {error && <div className="rounded-xl bg-red-950/40 border border-red-800/50 p-3 text-xs text-red-300">{error}</div>}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-white/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              maxLength={500}
              disabled={isLoading}
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white cursor-pointer"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="px-4 pb-3 text-[11px] text-slate-400">{t.powered}</p>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white pl-4 pr-5 py-3.5 text-sm font-bold shadow-xl shadow-brand-600/30 cursor-pointer"
          aria-label={t.open}
        >
          <MessageCircle className="w-5 h-5" />
          {t.open}
        </button>
      )}
    </div>
  );
};
