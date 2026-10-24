import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Copy,
  Check,
  Eye,
  EyeOff,
  Download,
  LogOut,
  ExternalLink,
  Search,
  Lock,
  Server,
  Globe,
  Database,
  Cpu,
  UserCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';

export type VaultCategory = 'dominio' | 'servidor' | 'bd' | 'admin' | 'api' | 'otro';

export interface VaultCredential {
  id: string;
  category: VaultCategory;
  title: string;
  url?: string;
  username: string;
  password?: string;
  tokenOrKey?: string;
  notes?: string;
}

export interface ClientVaultData {
  id: string;
  clientName: string;
  project: string;
  clientEmail: string;
  updatedAt: string;
  credentials: VaultCredential[];
}

const CATEGORY_META: Record<VaultCategory, { label: string; icon: React.FC<{ className?: string }>; color: string; badge: string }> = {
  dominio: { label: 'Dominios & DNS', icon: Globe, color: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
  servidor: { label: 'Servidores & Cloud', icon: Server, color: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  bd: { label: 'Bases de Datos', icon: Database, color: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  admin: { label: 'Superadministrador', icon: UserCheck, color: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  api: { label: 'APIs & Integraciones', icon: Cpu, color: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
  otro: { label: 'Otros Accesos', icon: KeyRound, color: 'text-slate-400', badge: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
};

export const Boveda: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('u693_vault_token') : null;
  });
  const [vault, setVault] = useState<ClientVaultData | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [search, setSearch] = useState('');
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Auto-fetch vault if sessionToken exists
  useEffect(() => {
    if (!sessionToken) return;
    let cancel = false;
    const fetchVault = async () => {
      try {
        const res = await fetch('/api/admin?action=vault-client-view', {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        if (!res.ok) {
          throw new Error('Sesión expirada');
        }
        const data = await res.json();
        if (!cancel && data.vault) {
          setVault(data.vault);
        }
      } catch {
        if (!cancel) {
          localStorage.removeItem('u693_vault_token');
          setSessionToken(null);
          setVault(null);
        }
      }
    };
    fetchVault();
    return () => {
      cancel = true;
    };
  }, [sessionToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin?action=vault-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Credenciales inválidas.');
      }
      localStorage.setItem('u693_vault_token', data.sessionToken);
      setSessionToken(data.sessionToken);
      setVault(data.vault);
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la bóveda.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('u693_vault_token');
    setSessionToken(null);
    setVault(null);
    setEmail('');
    setPassword('');
  };

  const togglePassword = (id: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleDownloadBackup = () => {
    if (!vault) return;
    const cleanVault = {
      empresaEmisora: 'UNIVERSO693 SpA (RUT 78.521.951-1)',
      cliente: vault.clientName,
      proyecto: vault.project,
      fechaExportacion: new Date().toISOString(),
      declaracion: 'Copia maestra de credenciales y soberanía tecnológica para el cliente.',
      credenciales: vault.credentials,
    };
    const blob = new Blob([JSON.stringify(cleanVault, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Boveda-${vault.clientName.replace(/[^a-zA-Z0-9]/g, '_')}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredCredentials = useMemo(() => {
    if (!vault) return [];
    return (vault.credentials || []).filter((c) => {
      const matchesCategory = activeCategory === 'todos' || c.category === activeCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        (c.notes && c.notes.toLowerCase().includes(q)) ||
        (c.url && c.url.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [vault, activeCategory, search]);

  return (
    <div className="min-h-screen bg-[#070f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0a1420]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">UNIVERSO693</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Bóveda Digital
                </span>
              </div>
              <p className="text-xs text-slate-400">Portal de Soberanía Tecnológica & Credenciales</p>
            </div>
          </div>

          {vault && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadBackup}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                title="Descargar copia JSON de seguridad"
              >
                <Download className="h-3.5 w-3.5 text-cyan-400" />
                Respaldo Completo
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col">
        {!vault ? (
          /* Login Card */
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-[#0c1827] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4 shadow-inner">
                  <Lock className="h-7 w-7" />
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Acceso a tu Bóveda</h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Ingresa con el correo y contraseña asignados para tu proyecto.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Correo Registrado
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@igneo.cl"
                    required
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Contraseña Maestra
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Validando credenciales...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="h-4 w-4" />
                      <span>Ingresar a la Bóveda</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Soberanía Digital Garantizada · Cero Secuestro Tecnológico</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Si no tienes tus accesos, contacta a tu director de proyectos en contacto@universo693.com
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Vault Dashboard */
          <div className="space-y-6">
            {/* Client Banner */}
            <div className="bg-gradient-to-r from-[#0c1c2e] via-[#0d2238] to-[#0c1c2e] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Bóveda Activa & Verificada
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{vault.clientName}</h1>
                  <p className="text-sm text-cyan-300 mt-1 font-medium">{vault.project}</p>
                  <p className="text-xs text-slate-400 mt-1">Usuario autorizado: {vault.clientEmail}</p>
                </div>
                <div className="text-left sm:text-right bg-white/[0.03] sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-white/5 sm:border-none">
                  <span className="text-xs text-slate-400 block">Total de Activos y Accesos</span>
                  <span className="text-3xl font-black text-white">{vault.credentials?.length || 0}</span>
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Última actualización: {vault.updatedAt ? new Date(vault.updatedAt).toLocaleDateString('es-CL') : 'Reciente'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <span>🔐 Todas las contraseñas e infraestructura pertenecen exclusivamente a la institución titular.</span>
                <button
                  onClick={handleDownloadBackup}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <Download className="h-3.5 w-3.5" />
                  Descargar Respaldo JSON de Emergencia
                </button>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setActiveCategory('todos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === 'todos'
                      ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Todos ({vault.credentials?.length || 0})
                </button>
                {(Object.keys(CATEGORY_META) as VaultCategory[]).map((cat) => {
                  const count = (vault.credentials || []).filter((c) => c.category === cat).length;
                  if (count === 0) return null;
                  const meta = CATEGORY_META[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                        activeCategory === cat
                          ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <meta.icon className="h-3.5 w-3.5" />
                      {meta.label} ({count})
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar credencial o servicio..."
                  className="w-full pl-9 pr-4 py-1.5 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Credentials Grid */}
            {filteredCredentials.length === 0 ? (
              <div className="text-center py-16 bg-[#0c1827] border border-white/10 rounded-3xl">
                <KeyRound className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                <p className="text-sm font-semibold text-white">No se encontraron credenciales</p>
                <p className="text-xs text-slate-400 mt-1">Prueba cambiando el filtro o término de búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCredentials.map((cred) => {
                  const meta = CATEGORY_META[cred.category] || CATEGORY_META.otro;
                  const isPasswordRevealed = revealedPasswords[cred.id];
                  const Icon = meta.icon;

                  return (
                    <div
                      key={cred.id}
                      className="bg-[#0c1827] border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 transition-all shadow-md flex flex-col justify-between gap-4"
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-white leading-snug">{cred.title}</h3>
                              {cred.url && (
                                <a
                                  href={cred.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                                >
                                  {cred.url.replace(/^https?:\/\//, '')}
                                  <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${meta.badge}`}>
                            {meta.label}
                          </span>
                        </div>

                        {/* Card Data Fields */}
                        <div className="space-y-2 mt-4 text-xs">
                          {/* Username / Email */}
                          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Usuario / Correo</span>
                              <span className="font-mono text-slate-200 truncate block">{cred.username || '—'}</span>
                            </div>
                            {cred.username && (
                              <button
                                onClick={() => copyToClipboard(cred.username, `${cred.id}-user`)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors shrink-0"
                                title="Copiar usuario"
                              >
                                {copiedKey === `${cred.id}-user` ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Password */}
                          {cred.password && (
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Contraseña</span>
                                <span className="font-mono text-slate-200 block truncate">
                                  {isPasswordRevealed ? cred.password : '••••••••••••••••'}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => togglePassword(cred.id)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                                  title={isPasswordRevealed ? 'Ocultar' : 'Mostrar'}
                                >
                                  {isPasswordRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                                <button
                                  onClick={() => copyToClipboard(cred.password!, `${cred.id}-pass`)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                                  title="Copiar contraseña"
                                >
                                  {copiedKey === `${cred.id}-pass` ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Token or Key */}
                          {cred.tokenOrKey && (
                            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Token / Llave de API</span>
                                <span className="font-mono text-cyan-300 block truncate">
                                  {isPasswordRevealed ? cred.tokenOrKey : '••••••••••••••••••••••••'}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => togglePassword(cred.id)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                                  title={isPasswordRevealed ? 'Ocultar' : 'Mostrar'}
                                >
                                  {isPasswordRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                                <button
                                  onClick={() => copyToClipboard(cred.tokenOrKey!, `${cred.id}-token`)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                                  title="Copiar token"
                                >
                                  {copiedKey === `${cred.id}-token` ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notes / Instructions */}
                      {cred.notes && (
                        <div className="text-[11px] text-slate-400 bg-black/20 p-2 rounded-lg border border-white/5 mt-1">
                          <span className="font-semibold text-slate-300">Nota:</span> {cred.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        <p>© 2026 UNIVERSO693 SpA · RUT 78.521.951-1 · Villa Alemana / Viña del Mar, Chile</p>
        <p className="text-[11px] text-slate-600 mt-1">
          Infraestructura de Soberanía Tecnológica y Respaldo Continuo de Activos Digitales.
        </p>
      </footer>
    </div>
  );
};

export default Boveda;

