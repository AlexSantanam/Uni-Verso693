import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { siteUiText } from '../data/content';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface LiveAgentDemoProps {
  lang: Language;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const LiveAgentDemo: React.FC<LiveAgentDemoProps> = ({ lang }) => {
  const t = siteUiText[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastLatencyMs, setLastLatencyMs] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Request failed');
      }
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
      setLastLatencyMs(typeof data.latencyMs === 'number' ? data.latencyMs : null);
    } catch {
      setError(t.demoChatError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Chat log */}
      <div ref={scrollRef} className="space-y-3 font-mono text-xs max-h-72 overflow-y-auto pr-1">
        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80 text-zinc-300">
          <div className="text-[10px] text-purple-400 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>AGENT</span>
          </div>
          <p className="leading-relaxed">{t.demoChatGreeting}</p>
        </div>

        {messages.map((m, idx) =>
          m.role === 'user' ? (
            <div key={idx} className="p-3 rounded-lg bg-zinc-800/60 border border-zinc-700/60 text-zinc-100 ml-4">
              <p className="leading-relaxed">{m.content}</p>
            </div>
          ) : (
            <div key={idx} className="p-3.5 rounded-lg bg-purple-950/50 border border-purple-800/60">
              <div className="text-[10px] text-purple-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>AGENT</span>
              </div>
              <p className="leading-relaxed text-zinc-100">{m.content}</p>
            </div>
          )
        )}

        {isLoading && (
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-purple-300 flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{t.demoChatThinking}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.demoChatPlaceholder}
          maxLength={500}
          disabled={isLoading}
          className="flex-1 px-3 py-2.5 rounded-lg bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-xs font-sans disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Live status footer */}
      <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span>{t.demoChatPowered}</span>
        </span>
        {lastLatencyMs !== null && (
          <span className="text-emerald-400 font-semibold font-mono">{lastLatencyMs}ms</span>
        )}
      </div>
    </div>
  );
};
