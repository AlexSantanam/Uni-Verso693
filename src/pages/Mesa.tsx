import React, { useEffect, useRef, useState } from 'react';
import {
  Lock,
  Terminal,
  Send,
  Mic,
  MicOff,
  Paperclip,
  Trash2,
  Settings,
  Zap,
  X,
  Volume2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

type Mode = 'roundtable' | 'consensus' | 'debate' | 'antigravity' | 'claude' | 'catalina';

interface Attachment {
  name: string;
  type: string;
  size: number;
  isImage: boolean;
  data: string;
}

interface AgentResponse {
  agent: string;
  name: string;
  role: string;
  color?: string;
  time?: number;
  text: string;
  is_consensus?: boolean;
  is_terminal?: boolean;
  exit_code?: number;
}

interface ChatTurn {
  timestamp?: number;
  time_str?: string;
  mode: string;
  sender?: string;
  query: string;
  attachments?: { name: string; isImage: boolean }[];
  responses: AgentResponse[];
}

const DEFAULT_TUNNEL_URL = '';

const MODES: { id: Mode; label: string }[] = [
  { id: 'roundtable', label: '🎙️ Mesa Redonda' },
  { id: 'consensus', label: '🤝 Consenso' },
  { id: 'debate', label: '⚔️ Debate' },
  { id: 'antigravity', label: '🔵 Antigravity' },
  { id: 'claude', label: '🟠 Claude' },
  { id: 'catalina', label: '🟣 Catalina' },
];

export default function Mesa() {
  const [serverUrl, setServerUrl] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_TUNNEL_URL;
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('api');
    if (fromQuery) {
      localStorage.setItem('war_room_url', fromQuery);
      return fromQuery;
    }
    return localStorage.getItem('war_room_url') || DEFAULT_TUNNEL_URL;
  });
  const [pin, setPin] = useState<string>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('war_room_pin') || '' : ''
  );
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  const [mode, setMode] = useState<Mode>('roundtable');
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDeliberating, setIsDeliberating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Terminal Drawer
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const [termCmd, setTermCmd] = useState<string>('');
  const [termLines, setTermLines] = useState<{ kind: 'cmd' | 'out' | 'err'; text: string }[]>([
    { kind: 'out', text: 'PowerShell listo en F:\\UNI-VERSO693. Ejecuta cualquier comando.' },
  ]);
  const [termBusy, setTermBusy] = useState<boolean>(false);

  // Voice
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const feedEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'AI War Room • Mesa Privada UNI-VERSO693';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      manifestLink.setAttribute('href', '/mesa-manifest.webmanifest');
    }
  }, []);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns, isDeliberating]);

  const cleanBaseUrl = serverUrl.trim().replace(/\/+$/, '');

  const apiFetch = async (path: string, init: RequestInit = {}, overridePin?: string) => {
    const activePin = overridePin !== undefined ? overridePin : pin;
    const headers = new Headers(init.headers || {});
    headers.set('X-WarRoom-Pin', activePin);
    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    const resp = await fetch(`${cleanBaseUrl}${path}`, { ...init, headers });
    if (resp.status === 401) {
      setUnlocked(false);
      throw new Error('PIN incorrecto o sesión expirada.');
    }
    return resp;
  };

  const loadHistory = async (overridePin?: string) => {
    try {
      const resp = await apiFetch('/api/history', { method: 'GET' }, overridePin);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      setTurns(data.history || []);
      setUnlocked(true);
      setAuthError('');
    } catch (e: any) {
      setAuthError(e?.message || 'No se pudo conectar con el servidor War Room.');
    }
  };

  useEffect(() => {
    if (pin) {
      loadHistory(pin);
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    localStorage.setItem('war_room_url', cleanBaseUrl);
    localStorage.setItem('war_room_pin', pin.trim());
    await loadHistory(pin.trim());
  };

  const handleSend = async (customText?: string) => {
    const text = (customText !== undefined ? customText : prompt).trim();
    if ((!text && attachments.length === 0) || isDeliberating) return;

    setErrorMsg('');
    setIsDeliberating(true);
    if (customText === undefined) setPrompt('');
    const currentAtts = [...attachments];
    setAttachments([]);

    try {
      const resp = await apiFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          text,
          mode,
          attachments: currentAtts,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || data.error) {
        throw new Error(data.error || `Error ${resp.status}`);
      }
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTurns((prev) => [
        ...prev,
        {
          time_str: nowStr,
          mode: data.mode || mode,
          query: text,
          attachments: currentAtts.map((a) => ({ name: a.name, isImage: a.isImage })),
          responses: data.responses || [],
        },
      ]);
    } catch (e: any) {
      setErrorMsg(e?.message || 'Error conectando con la Mesa.');
    } finally {
      setIsDeliberating(false);
    }
  };

  const handleRunTerminal = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termCmd.trim();
    if (!cmd || termBusy) return;
    setTermBusy(true);
    setTermCmd('');
    setTermLines((prev) => [...prev, { kind: 'cmd', text: `PS F:\\UNI-VERSO693> ${cmd}` }]);
    try {
      const resp = await apiFetch('/api/terminal/run', {
        method: 'POST',
        body: JSON.stringify({ command: cmd, cwd: 'F:\\UNI-VERSO693' }),
      });
      const data = await resp.json();
      if (data.stdout) setTermLines((prev) => [...prev, { kind: 'out', text: data.stdout }]);
      if (data.stderr) setTermLines((prev) => [...prev, { kind: 'err', text: data.stderr }]);
      if (!data.stdout && !data.stderr) {
        setTermLines((prev) => [
          ...prev,
          { kind: data.exit_code === 0 ? 'out' : 'err', text: `Exit ${data.exit_code} (${data.time}s)` },
        ]);
      }
    } catch (e: any) {
      setTermLines((prev) => [...prev, { kind: 'err', text: e?.message || 'Error de terminal' }]);
    } finally {
      setTermBusy(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm('¿Limpiar el historial de esta sesión?')) return;
    try {
      await apiFetch('/api/clear', { method: 'POST' });
      setTurns([]);
    } catch {}
  };

  const toggleVoice = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Tu navegador no soporta dictado por voz (usa Chrome o Safari).');
      return;
    }
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }
    const rec = new SpeechRec();
    rec.lang = 'es-CL';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setIsRecording(true);
    rec.onresult = (ev: any) => {
      const transcript = ev.results?.[0]?.[0]?.transcript || '';
      if (transcript) setPrompt((p) => (p ? `${p} ${transcript}` : transcript));
    };
    rec.onerror = () => setIsRecording(false);
    rec.onend = () => setIsRecording(false);
    recognitionRef.current = rec;
    rec.start();
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      const isImage = file.type.startsWith('image/');
      reader.onload = (ev) => {
        setAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            type: file.type || 'text/plain',
            size: file.size,
            isImage,
            data: String(ev.target?.result || ''),
          },
        ]);
      };
      if (isImage) reader.readAsDataURL(file);
      else reader.readAsText(file);
    });
    e.target.value = '';
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*`#]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'es-CL';
    window.speechSynthesis.speak(u);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-md bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-white">AI War Room • Uni-Verso693</h1>
              <p className="text-xs text-slate-400">Acceso privado a tu Consejo y Terminal en PC</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">URL del Servidor / Túnel</label>
            <input
              type="url"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder="https://...trycloudflare.com"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Clave Maestra de Acceso</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Ingresa tu clave maestra"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2.5 text-center tracking-widest text-sm font-bold text-white focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          {authError && (
            <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-white hover:opacity-95 transition"
          >
            Conectar con mi PC
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#070b14] text-slate-100">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-800/80 bg-slate-950/90 px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg">⚡</span>
          <div className="truncate">
            <h1 className="text-sm font-extrabold tracking-wide text-white truncate">
              AI WAR ROOM <span className="text-cyan-400">• UNI-VERSO693</span>
            </h1>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Conectado a {cleanBaseUrl.replace(/^https?:\/\//, '')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowTerminal((v) => !v)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition ${
              showTerminal
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> Terminal
          </button>
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            title="Configurar URL/PIN"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400"
            title="Limpiar historial"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Settings Drawer */}
      {showSettings && (
        <div className="shrink-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center gap-3 text-xs">
          <input
            type="url"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            className="flex-1 min-w-[220px] bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 font-mono text-cyan-300"
            placeholder="https://...trycloudflare.com"
          />
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('war_room_url', cleanBaseUrl);
              setShowSettings(false);
              loadHistory();
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-bold"
          >
            Reconectar
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('war_room_pin');
              setUnlocked(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
          >
            Bloquear
          </button>
        </div>
      )}

      {/* Mode Bar */}
      <div className="shrink-0 border-b border-slate-800/60 bg-slate-950/60 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${
              mode === m.id
                ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Chat Feed */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-5">
        {turns.length === 0 && (
          <div className="max-w-xl mx-auto mt-10 text-center space-y-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Soberanía Uni-Verso693</p>
            <h2 className="text-base font-bold text-white">Mesa Redonda lista desde tu dominio</h2>
            <p className="text-xs text-slate-400">
              Consulta a Antigravity, Claude y Catalina, o ejecuta comandos en tu PC en F:\UNI-VERSO693.
            </p>
          </div>
        )}

        {turns.map((t, idx) => {
          const senderLabel =
            t.sender ||
            (t.query?.startsWith('Reporte automático de') || t.query?.includes('(n8n)')
              ? 'n8n / Sistema'
              : 'Alex');
          const isSystemSender = senderLabel !== 'Alex';
          return (
          <div key={idx} className="space-y-3 max-w-5xl mx-auto">
            {/* User / System Bubble */}
            <div className="flex justify-end">
              <div
                className={`max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm border ${
                  isSystemSender
                    ? 'bg-amber-950/35 border-amber-500/30'
                    : 'bg-emerald-950/50 border-emerald-500/30'
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-4 mb-1 text-[11px] font-bold ${
                    isSystemSender ? 'text-amber-300' : 'text-emerald-300'
                  }`}
                >
                  <span>{senderLabel}</span>
                  <span className="text-slate-400 font-normal">{t.time_str}</span>
                </div>
                <p className="whitespace-pre-wrap text-slate-100">{t.query}</p>
              </div>
            </div>

            {/* Agent Responses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(t.responses || []).map((r, rIdx) => {
                const spanFull = r.is_consensus || r.is_terminal || t.responses.length === 1;
                return (
                  <div
                    key={rIdx}
                    className={`rounded-2xl p-3.5 border text-sm space-y-2 ${
                      spanFull ? 'md:col-span-2 lg:col-span-3' : ''
                    } ${
                      r.is_consensus
                        ? 'bg-amber-950/25 border-amber-500/40'
                        : r.is_terminal
                        ? 'bg-slate-950 border-emerald-500/40 font-mono text-xs'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-xs" style={{ color: r.color || '#38bdf8' }}>
                          {r.name}
                        </span>
                        <span className="block text-[10px] text-slate-400">{r.role}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {r.time !== undefined && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {r.time}s
                          </span>
                        )}
                        {!r.is_terminal && (
                          <button
                            type="button"
                            onClick={() => speak(r.text)}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                            title="Escuchar"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-200 leading-relaxed break-words">
                      {r.text}
                    </div>

                    {r.is_consensus && (
                      <div className="pt-2 border-t border-amber-500/20 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleSend('Háganlo ahora mismo: ejecuten el plan acordado punto por punto.')}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-400"
                        >
                          <Zap className="w-3.5 h-3.5" /> Ejecutar Acuerdo
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          );
        })}

        {isDeliberating && (
          <div className="max-w-5xl mx-auto text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-4 py-2.5">
            ⏳ El Consejo está deliberando / ejecutando en tu PC...
          </div>
        )}

        {errorMsg && (
          <div className="max-w-5xl mx-auto text-xs text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-2.5">
            ⚠️ {errorMsg}
          </div>
        )}

        <div ref={feedEndRef} />
      </main>

      {/* Terminal Drawer */}
      {showTerminal && (
        <section className="shrink-0 border-t border-emerald-500/40 bg-[#060911] px-4 py-2.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>💻 PowerShell Remoto (F:\UNI-VERSO693)</span>
            <button type="button" onClick={() => setShowTerminal(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-36 overflow-y-auto font-mono text-[11px] space-y-1 bg-black/50 rounded-lg p-2 border border-slate-800">
            {termLines.map((l, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap break-all ${
                  l.kind === 'cmd' ? 'text-cyan-400 font-bold' : l.kind === 'err' ? 'text-rose-400' : 'text-slate-200'
                }`}
              >
                {l.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleRunTerminal} className="flex gap-2">
            <input
              type="text"
              value={termCmd}
              onChange={(e) => setTermCmd(e.target.value)}
              disabled={termBusy}
              placeholder="Comando PowerShell en F:\UNI-VERSO693..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              disabled={termBusy}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
            >
              Ejecutar
            </button>
          </form>
        </section>
      )}

      {/* Input Footer */}
      <footer className="shrink-0 border-t border-slate-800 bg-slate-950/95 p-3">
        <div className="max-w-5xl mx-auto space-y-2">
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {attachments.map((a, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg"
                >
                  {a.isImage ? '🖼️' : '📄'} {a.name}
                  <button
                    type="button"
                    onClick={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.txt,.py,.js,.ts,.tsx,.json,.md,.csv"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              title="Adjuntar archivo o foto"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2.5 rounded-xl border transition ${
                isRecording
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Dictar por micrófono"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <textarea
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Escribe o dicta tu orden para la Mesa..."
              className="flex-1 resize-none bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              type="button"
              disabled={isDeliberating}
              onClick={() => handleSend()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
