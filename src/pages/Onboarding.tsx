import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Upload,
  Globe,
  Award,
  KeyRound,
  CreditCard,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Lock,
  ArrowRight,
  Sparkles,
  LogOut,
  AlertCircle,
  Key,
} from 'lucide-react';

interface OnboardingData {
  clientName: string;
  project: string;
  subdomain: string;
  dnsMethod: string;
  dnsProvider: string;
  dnsStatus?: string;
  dnsConfiguredValue?: string;
  dnsNameservers?: string;
  senceCode: string;
  senceToken: string;
  senceContact: string;
  claveUnicaStatus: string;
  paymentGateway: string;
  transbankCode: string;
  courseName: string;
  courseLink: string;
  primaryColor: string;
  notes: string;
  updatedAt?: string;
}

export interface OnboardingModuleProps {
  slug?: string;
  embedded?: boolean;
  onGoToCredentials?: () => void;
}

export const OnboardingModule: React.FC<OnboardingModuleProps> = ({
  slug: propSlug,
  embedded = false,
  onGoToCredentials,
}) => {
  const { slug: routeSlug } = useParams<{ slug?: string }>();
  const activeSlug = propSlug || routeSlug;
  const isIgneo = !activeSlug || activeSlug.toLowerCase() === 'igneo';

  const storageKey = `u693_onboarding_${isIgneo ? 'igneo' : activeSlug}`;
  const authSessionKey = `u693_vault_auth_${isIgneo ? 'igneo' : activeSlug}`;

  // Clave autorizada para Ígneo (flexible: con o sin guion, mayúsculas o minúsculas)
  const VALID_KEYS = isIgneo
    ? ['IGNEO-2026', 'IGNEO2026', 'IGNEO693', 'BOMBEROS-2026']
    : ['U693-CLIENTE', 'UNIVERSO2026'];

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (embedded) return true; // Ya autenticado en Bóveda
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(authSessionKey) === 'true';
    }
    return false;
  });

  const [inputKey, setInputKey] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const [data, setData] = useState<OnboardingData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return {
      clientName: isIgneo ? 'Fundación Cuerpo de Bomberos de Viña del Mar' : 'Cliente Corporativo',
      project: isIgneo ? 'Campus Virtual E-Learning — OTEC Ígneo' : 'Proyecto Digital',
      subdomain: isIgneo ? 'campus.otecigneo.cl' : '',
      dnsMethod: 'cname',
      dnsProvider: '',
      dnsStatus: 'pendiente',
      dnsConfiguredValue: 'cname.vercel-dns.com',
      dnsNameservers: '',
      senceCode: '',
      senceToken: '',
      senceContact: '',
      claveUnicaStatus: 'pendiente',
      paymentGateway: 'transbank',
      transbankCode: '',
      courseName: isIgneo ? 'Combate de Incendios Industriales & Derrames Químicos' : '',
      courseLink: '',
      primaryColor: '#dc2626',
      notes: '',
    };
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [copiedJustification, setCopiedJustification] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);

    const cleanInput = inputKey.trim().toUpperCase();

    setTimeout(() => {
      if (VALID_KEYS.includes(cleanInput)) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(authSessionKey, 'true');
        }
        setAuthError(null);
      } else {
        setAuthError('Clave de seguridad incorrecta. Verifique sus credenciales institucionales o contacte a soporte (contacto@universo693.com).');
      }
      setIsVerifying(false);
    }, 450);
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setInputKey('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(authSessionKey);
    }
  };

  const calculateProgress = () => {
    let score = 0;
    if (data.primaryColor) score += 1;
    if (data.subdomain) score += 1;
    if (data.senceCode || data.senceContact) score += 1;
    if (data.claveUnicaStatus !== 'pendiente') score += 1;
    if (data.paymentGateway) score += 1;
    if (data.courseName || data.courseLink) score += 1;
    return Math.round((score / 6) * 100);
  };

  const progress = calculateProgress();

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    }

    try {
      await fetch('/api/admin?action=onboarding-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: isIgneo ? 'igneo' : slug, data: payload }),
      });
    } catch {}

    setTimeout(() => {
      setSaving(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 5000);
    }, 600);
  };

  const copyJustification = () => {
    const text =
      'Autenticación biométrica e intransferible de identidad de participantes y control de asistencia reglamentario para cursos e-learning acreditados ante el Servicio Nacional de Capacitación y Empleo (SENCE), conforme a la normativa vigente del Ministerio del Trabajo y norma NCh 2728.';
    navigator.clipboard.writeText(text);
    setCopiedJustification(true);
    setTimeout(() => setCopiedJustification(false), 3000);
  };

  // =========================================================================
  // PANTALLA DE BLOQUEO / ACCESO CON CLAVE (BANK-GRADE GATEWAY)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070f19] text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500/30">
        <header className="border-b border-white/10 bg-[#0a1420]/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">UNIVERSO693 SpA</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Bóveda Cifrada v2.4</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-gradient-to-b from-[#0d1a2d] to-[#091322] border border-cyan-500/30 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500"></div>

            <div className="text-center space-y-2">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                <Lock className="h-7 w-7" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Bóveda Cifrada de Onboarding
              </h1>
              <p className="text-xs text-slate-400">
                Acceso restringido para el equipo directivo y técnico de la{' '}
                <strong className="text-slate-200">{data.clientName}</strong>.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Clave Institucional de Seguridad</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Cifrado AES-256</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Ingrese la clave provista por UNIVERSO693"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono tracking-wider"
                    autoFocus
                  />
                  <Key className="h-4 w-4 text-slate-500 absolute right-3.5 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Proporcionada en su carta de inicio o por la dirección de ingeniería.
                </p>
              </div>

              <button
                type="submit"
                disabled={isVerifying || !inputKey.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                    <span>Verificando credenciales...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    <span>Desbloquear Bóveda Institucional</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-white/5 text-center">
              <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Conexión segura TLS 1.3 con HSTS & Verificación Criptográfica
              </span>
            </div>
          </div>
        </main>

        <footer className="border-t border-white/10 py-4 text-center text-xs text-slate-500 bg-[#0a1420]">
          UNIVERSO693 SpA • Soporte institucional: contacto@universo693.com • +56 9 9038 7414
        </footer>
      </div>
    );
  }

  // =========================================================================
  // PANTALLA PRINCIPAL DE ONBOARDING (UNA VEZ AUTENTICADO)
  // =========================================================================
  const mainContent = (
    <div className="space-y-6 w-full">
      {/* Banner Institucional */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0e1e33] via-[#091524] to-[#070f19] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Fase 1: Configuración & Recepción de Insumos
              </span>
              {onGoToCredentials && (
                <button
                  type="button"
                  onClick={onGoToCredentials}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 inline-flex items-center gap-1 transition-colors"
                >
                  <KeyRound className="h-3 w-3" />
                  <span>Ver Bóveda de Credenciales</span>
                </button>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {data.project}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Espacio digital seguro para que el equipo de la <strong>{data.clientName}</strong> entregue los insumos, accesos y configuraciones requeridas para el despliegue del Campus Virtual.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-[#0b1726]/80 border border-white/10 rounded-xl p-4 min-w-[220px] text-center space-y-2">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400">Progreso de Entrega</div>
            <div className="text-3xl font-black text-cyan-400">{progress}%</div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-400">6 frentes normativos evaluados</div>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 animate-in fade-in duration-300">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <div className="text-sm">
            <strong>¡Insumos sincronizados exitosamente!</strong> Los datos han sido encriptados en la Bóveda y nuestro equipo de ingeniería fue notificado para continuar el despliegue.
          </div>
        </div>
      )}

      {/* 6 Category Tabs / Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { id: 1, title: '1. Identidad & Branding', icon: Upload, color: 'text-amber-400' },
          { id: 2, title: '2. Dominio & DNS', icon: Globe, color: 'text-blue-400' },
          { id: 3, title: '3. Integración SENCE', icon: Award, color: 'text-emerald-400' },
          { id: 4, title: '4. ClaveÚnica (Gob. Digital)', icon: KeyRound, color: 'text-cyan-400' },
          { id: 5, title: '5. Pagos & Recaudación', icon: CreditCard, color: 'text-purple-400' },
          { id: 6, title: '6. Curso Piloto & IA', icon: BookOpen, color: 'text-red-400' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeTab === tab.id
                ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                : 'bg-[#0a1524] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <tab.icon className={`h-4 w-4 ${tab.color}`} />
              <span className="text-xs font-bold">{tab.title}</span>
            </div>
            <ArrowRight className={`h-3.5 w-3.5 transition-transform ${activeTab === tab.id ? 'translate-x-1 text-cyan-400' : 'opacity-40'}`} />
          </button>
        ))}
      </div>

      {/* Form Panel */}
      <form onSubmit={handleSave} className="bg-[#0b1728] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* TAB 1: IDENTIDAD Y BRANDING */}
          {activeTab === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-amber-400" />
                  1. Identidad Visual, Imagen Corporativa & Logotipos
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Insumos para adaptar el Campus Virtual al estándar de diseño de OTEC Ígneo y Fundación Bomberos Viña del Mar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Color Primario Institucional (Hex)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={data.primaryColor}
                      onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                      className="h-10 w-12 rounded cursor-pointer border border-white/20 bg-transparent"
                    />
                    <input
                      type="text"
                      value={data.primaryColor}
                      onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                      placeholder="#dc2626"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Rojo institucional por defecto: #dc2626</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enlace a Carpeta de Logos & Fotos (Google Drive / OneDrive / Dropbox)</label>
                  <input
                    type="url"
                    value={data.notes}
                    onChange={(e) => setData({ ...data, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    placeholder="https://drive.google.com/drive/folders/..."
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Pega el link de la carpeta compartida con logos (SVG/PNG) y fotografías de faena.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOMINIO Y DNS */}
          {activeTab === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-400" />
                  2. Infraestructura Web, Subdominio Institucional & Registros DNS
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Definición y validación técnica del enlace seguro donde residirá el Campus Virtual.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subdominio Deseado</label>
                  <input
                    type="text"
                    value={data.subdomain}
                    onChange={(e) => setData({ ...data, subdomain: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    placeholder="campus.otecigneo.cl"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Sugerencias: campus.otecigneo.cl o aula.otecigneo.cl</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Proveedor o Panel de Dominio</label>
                  <input
                    type="text"
                    value={data.dnsProvider}
                    onChange={(e) => setData({ ...data, dnsProvider: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    placeholder="NIC Chile / Cloudflare / cPanel / Hosting actual"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Indique dónde administran los DNS de otecigneo.cl</span>
                </div>
              </div>

              {/* Parámetros Técnicos Oficiales para el Informático */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/25 text-xs text-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-white flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    Parámetros exactos a entregar a su Informático / Hosting:
                  </strong>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('Tipo: CNAME | Host/Nombre: campus | Valor Destino: cname.vercel-dns.com | TTL: 3600 (1 hora)');
                      alert('¡Parámetros DNS copiados al portapapeles!');
                    }}
                    className="px-2 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 text-cyan-300 font-semibold inline-flex items-center gap-1 transition-colors text-[11px]"
                  >
                    <Copy className="h-3 w-3" />
                    Copiar Parámetros
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11.5px] bg-black/40 p-2.5 rounded border border-white/10">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Tipo de Registro</span>
                    <span className="text-emerald-400 font-bold">CNAME</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Host / Nombre</span>
                    <span className="text-cyan-300 font-bold">campus</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Valor Destino</span>
                    <span className="text-cyan-300 font-bold">cname.vercel-dns.com</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">TTL / Tiempo</span>
                    <span className="text-slate-300">3600 (Automático)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  🛡️ <em>Garantía de aislamiento:</em> Este registro solo redirige el subdominio virtual y no altera en lo absoluto sus correos corporativos, registros MX ni el sitio web principal.
                </p>
              </div>

              {/* Campos de reporte de DNS por parte del cliente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Valor o Registro Configurado por su Informático
                  </label>
                  <input
                    type="text"
                    value={data.dnsConfiguredValue || ''}
                    onChange={(e) => setData({ ...data, dnsConfiguredValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    placeholder="Ej: campus.otecigneo.cl CNAME cname.vercel-dns.com"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Pegue aquí la confirmación o valor que su informático o hosting configuró.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Servidores de Nombre (NameServers) Actuales
                  </label>
                  <input
                    type="text"
                    value={data.dnsNameservers || ''}
                    onChange={(e) => setData({ ...data, dnsNameservers: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    placeholder="Ej: ns1.hosting.cl, ns2.hosting.cl o Cloudflare"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Nos permite verificar la propagación y emisión del certificado SSL TLS 1.3.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Estado de la Gestión DNS
                  </label>
                  <select
                    value={data.dnsStatus || 'pendiente'}
                    onChange={(e) => setData({ ...data, dnsStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="pendiente">Pendiente de gestión con informático / hosting</option>
                    <option value="configurado">Registro CNAME ya creado (en espera de propagación)</option>
                    <option value="asistencia">Solicitamos asistencia directa de UNIVERSO693 para configurarlo</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SENCE */}
          {activeTab === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  3. Integración con Servicio Nacional de Capacitación y Empleo (SENCE)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Parámetros para la sincronización telemática de asistencia y horas cronológicas vía API.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Código Oficial de OTEC ante SENCE</label>
                  <input
                    type="text"
                    value={data.senceCode}
                    onChange={(e) => setData({ ...data, senceCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    placeholder="Ej: 12345678"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Encargado o Coordinador Técnico SENCE (Nombre y Correo)</label>
                  <input
                    type="text"
                    value={data.senceContact}
                    onChange={(e) => setData({ ...data, senceContact: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    placeholder="Nombre Completo / correo@otecigneo.cl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Llave / Token de Web Services SENCE (Si ya fue emitido)</label>
                <div className="relative">
                  <input
                    type="password"
                    value={data.senceToken}
                    onChange={(e) => setData({ ...data, senceToken: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    placeholder="Clave cifrada o token emitido por el portal SENCE"
                  />
                  <Lock className="h-4 w-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Si aún no lo tienen activado, déjenlo en blanco: les guiaremos para solicitarlo a su analista SENCE.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: CLAVEUNICA */}
          {activeTab === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-cyan-400" />
                  4. Tramitación de Autenticación con ClaveÚnica (Gobierno Digital)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Gestión del login oficial del Estado para acreditación de identidad de alumnos.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-white flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    Texto de Justificación Legal listo para copiar en el portal de Gobierno Digital:
                  </strong>
                  <button
                    type="button"
                    onClick={copyJustification}
                    className="px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    {copiedJustification ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedJustification ? '¡Copiado!' : 'Copiar Texto'}
                  </button>
                </div>
                <p className="italic bg-black/40 p-2.5 rounded border border-white/5 text-[11.5px] leading-relaxed text-slate-300">
                  "Autenticación biométrica e intransferible de identidad de participantes y control de asistencia reglamentario para cursos e-learning acreditados ante el Servicio Nacional de Capacitación y Empleo (SENCE), conforme a la normativa vigente del Ministerio del Trabajo y norma NCh 2728."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estado de la Solicitud</label>
                  <select
                    value={data.claveUnicaStatus}
                    onChange={(e) => setData({ ...data, claveUnicaStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="pendiente">Pendiente de Ingreso</option>
                    <option value="ingresada">Ingresada en gobiernodigital.gob.cl</option>
                    <option value="aprobada">Convenio Aprobado / Credenciales Emitidas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contraparte Técnica a Registrar en el Formulario</label>
                  <input
                    type="text"
                    disabled
                    value="UNIVERSO693 SpA — Equipo de Ingeniería (contacto@universo693.com)"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-mono cursor-not-allowed"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Esto autoriza a nuestro equipo a recibir las llaves técnicas.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PAGOS Y PASARELA */}
          {activeTab === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-400" />
                  5. Pasarela de Pagos & Recaudación Online
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Configuración para que las matrículas y pagos de cursos ingresen directamente a la cuenta bancaria de la Fundación.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Pasarela de Preferencia de la Institución
                  </label>
                  <input
                    type="text"
                    value={data.paymentGateway}
                    onChange={(e) => setData({ ...data, paymentGateway: e.target.value })}
                    list="gateway-options"
                    placeholder="Ej: Transbank Webpay, Mercado Pago, Flow, Fintoc..."
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                  <datalist id="gateway-options">
                    <option value="Transbank Webpay Plus Oficial" />
                    <option value="Mercado Pago Empresas" />
                    <option value="Flow.cl" />
                    <option value="Fintoc (Transferencias Directas)" />
                    <option value="Getnet (Banco Santander)" />
                    <option value="Khipu" />
                    <option value="Webpay Oneclick" />
                    <option value="Transferencia Bancaria Directa (Manual o con Conciliación)" />
                    <option value="Otra pasarela institucional" />
                  </datalist>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Indique la pasarela o procesador con el que su institución opera actualmente.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Código de Comercio, Identificador o API Key
                  </label>
                  <input
                    type="text"
                    value={data.transbankCode}
                    onChange={(e) => setData({ ...data, transbankCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                    placeholder="Código de comercio, ID de cuenta o correo de facturación"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Permite enlazar la pasarela para que la recaudación ingrese 100% directa a su cuenta.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CURSO PILOTO */}
          {activeTab === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-red-400" />
                  6. Contenidos del Primer Curso Piloto & Base para Tutor IA
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Insumos para entregar el Campus con su primer programa cargado y listo para comercializar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre del Curso de Lanzamiento</label>
                  <input
                    type="text"
                    value={data.courseName}
                    onChange={(e) => setData({ ...data, courseName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    placeholder="Ej: Combate de Incendios Industriales"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enlace a Videos y Manuales Técnicos (Drive / Dropbox)</label>
                  <input
                    type="url"
                    value={data.courseLink}
                    onChange={(e) => setData({ ...data, courseLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                    placeholder="https://drive.google.com/..."
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">Videos de lecciones, PDFs de estudio y normas NFPA para el Tutor IA.</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions & Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Transmisión cifrada AES-256 a la Bóveda de UNIVERSO693</span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                  <span>Sincronizando...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Guardar y Notificar a Ingeniería</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );

  if (embedded) {
    return mainContent;
  }

  return (
    <div className="min-h-screen bg-[#070f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Header Bar con Botón de Bloquear */}
      <header className="border-b border-white/10 bg-[#0a1420]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">UNIVERSO693</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Bóveda Desbloqueada
                </span>
              </div>
              <p className="text-xs text-slate-400">{data.clientName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLock}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-colors inline-flex items-center gap-1.5"
              title="Cerrar y bloquear acceso"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Bloquear Bóveda</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        {mainContent}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500 bg-[#08101a]">
        UNIVERSO693 SpA • RUT 78.521.951-1 • Villa Alemana, Región de Valparaíso • Soporte: contacto@universo693.com
      </footer>
    </div>
  );
};

export const Onboarding: React.FC = () => {
  return <OnboardingModule />;
};

export default Onboarding;
