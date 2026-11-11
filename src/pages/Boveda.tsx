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
  Key,
  Sparkles,
  ArrowRight,
  Receipt,
  Printer,
  CheckCircle2,
  Clock,
  Building2,
} from 'lucide-react';
import { OnboardingModule } from './Onboarding';

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

export interface VaultInvoice {
  id: string;
  folio: string;
  tipoDte: 'Factura Electrónica (33)' | 'Factura Exenta (34)' | 'Boleta Electrónica (39)' | 'Nota de Crédito (61)';
  concepto: string;
  fechaEmision: string;
  montoNeto: number;
  iva: number;
  montoTotal: number;
  estado: 'pagada' | 'pendiente' | 'anulada';
  pdfDataUrl?: string;
  pdfFileName?: string;
  notas?: string;
}

export interface ClientVaultData {
  id: string;
  clientName: string;
  project: string;
  clientEmail: string;
  updatedAt: string;
  credentials: VaultCredential[];
  invoices?: VaultInvoice[];
}

const ASVID_VAULT: ClientVaultData = {
  id: 'vlt-asvid-spa',
  clientName: 'Ingeniería y Construcción Asvid SpA (RUT: 77.391.792-2)',
  project: 'Plataforma Web Corporativa & Sistema Autoadministrable (Plan Start Oficial)',
  clientEmail: 'contacto.asvid@gmail.com',
  updatedAt: new Date().toISOString(),
  credentials: [
    {
      id: 'cred-asvid-interno',
      category: 'admin',
      title: 'Portal Interno Autoadministrable ("Modo Dueño")',
      url: 'https://asvid-multiservicios.vercel.app/interno',
      username: 'Portal Interno AsviD',
      password: 'asvid2026',
      notes: 'Panel directo para subir fotos de obras desde el celular en 30 segundos, editar WhatsApp corporativo, teléfonos, correo y publicar avisos de faena.',
    },
    {
      id: 'cred-asvid-hosting',
      category: 'servidor',
      title: 'Hosting Cloud Alta Velocidad & SSL Bancario (Vercel CDN)',
      url: 'https://asvid-multiservicios.vercel.app',
      username: 'asvid-multiservicios.vercel.app',
      notes: 'Infraestructura Cloud con certificado SSL TLS 1.3 activo y despliegue continuo.',
    },
    {
      id: 'cred-asvid-github',
      category: 'admin',
      title: 'Repositorio de Código Fuente Soberano (GitHub)',
      url: 'https://github.com/AlexSantanam/asvid-multiservicios',
      username: 'AlexSantanam/asvid-multiservicios',
      notes: 'Propiedad intelectual y código fuente completo sin amarres (HTML5, CSS3 Industrial, JS Autoadministrable, Schema.org Local SEO).',
    },
    {
      id: 'cred-asvid-dominio',
      category: 'dominio',
      title: 'Dominio Oficial NIC Chile (.CL)',
      url: 'https://www.nic.cl',
      username: 'asvidingenieria.cl / asvidspa.cl (Por confirmar inscripción)',
      notes: 'Inscripción oficial por 1 año incluida en Plan Start Oficial a nombre de Asvid SpA.',
    },
  ],
  invoices: [
    {
      id: 'inv-asvid-001',
      folio: 'F-0001',
      tipoDte: 'Factura Electrónica (33)',
      concepto: 'Plan Start Oficial — Diseño y Desarrollo Plataforma Web Corporativa AsviD SpA + Portal Autoadministrable (/interno) + Hosting Cloud 1 Año + Dominio .CL',
      fechaEmision: new Date().toISOString().slice(0, 10),
      montoNeto: 126050,
      iva: 23950,
      montoTotal: 150000,
      estado: 'pagada',
      notas: 'Razón Social: Ingeniería y Construcción Asvid SpA · RUT: 77.391.792-2 · Giro: Obras menores de construcción · Dirección: Los Diamantes #740 Cs2, Lote 2, Concón · DTE: contacto.asvid@gmail.com',
    },
  ],
};

const IGNEO_VAULT: ClientVaultData = {
  id: 'vault-igneo',
  clientName: 'Fundación Cuerpo de Bomberos de Viña del Mar — OTEC Ígneo',
  project: 'Campus Virtual E-Learning SENCE con ClaveÚnica',
  clientEmail: 'contacto@cuerpo-bomberos.cl',
  updatedAt: new Date().toISOString(),
  credentials: [
    {
      id: 'cred-google-matriz',
      category: 'admin',
      title: 'Cuenta Matriz Google / Infraestructura Cloud',
      url: 'https://accounts.google.com',
      username: 'aula.igneo.uv693@gmail.com',
      password: 'Igneo2026',
      notes: 'Cuenta raíz para gestión de servicios cloud, YouTube para videos de lecciones, Google Drive de actas SENCE y vinculación de infraestructura.',
    },
    {
      id: 'cred-dns',
      category: 'dominio',
      title: 'Subdominio Campus Virtual',
      url: 'https://campus.otecigneo.cl',
      username: 'campus.otecigneo.cl (CNAME)',
      notes: 'Apunta a cname.vercel-dns.com para CDN global con SSL TLS 1.3 automático.',
    },
    {
      id: 'cred-sence',
      category: 'api',
      title: 'Web Services SENCE (Integración API)',
      username: 'API Token / Código OTEC',
      notes: 'Conexión telemática para reportes de asistencia y trazabilidad conforme a norma NCh 2728.',
    },
    {
      id: 'cred-segpres',
      category: 'api',
      title: 'ClaveÚnica (Gobierno Digital / Segpres)',
      url: 'https://gobiernodigital.gob.cl',
      username: 'RUT OTEC Ígneo',
      notes: 'Autenticación ciudadana oficial de participantes y relatores.',
    },
    {
      id: 'cred-github',
      category: 'admin',
      title: 'Repositorio de Código Fuente Soberano (GitHub)',
      url: 'https://github.com/aulaigneouv693-wq/aula.Igneo',
      username: 'aulaigneouv693-wq',
      notes: 'Soberanía total: acceso al código fuente completo (React, TypeScript, PWA, Node.js, PostgreSQL).',
    },
    {
      id: 'cred-groq-ai',
      category: 'api',
      title: 'Groq Cloud LPU (Inferencia Ultra Rápida Tutor IA 24/7)',
      url: 'https://console.groq.com',
      tokenOrKey: 'gsk_egxZ...itmK',
      notes: 'Motor de inferencia ultra rápida (~800 tok/s) con Llama 3.3 70B para el Tutor Pedagógico NFPA.',
    },
    {
      id: 'cred-db',
      category: 'bd',
      title: 'Base de Datos Dedicada (PostgreSQL 16)',
      username: 'postgres_igneo_admin',
      notes: 'Instancia cloud dedicada con cifrado en reposo y backups continuos.',
    },
  ],
};

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

  // Selector de pestaña principal (Insumos vs Credenciales vs Facturas Electrónicas)
  const [mainTab, setMainTab] = useState<'insumos' | 'credenciales' | 'facturas'>('credenciales');

  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('u693_vault_token') : null;
  });

  const [vault, setVault] = useState<ClientVaultData | null>(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('u693_vault_client_email');
      if (storedEmail && storedEmail.includes('asvid')) {
        return ASVID_VAULT;
      }
      if (storedEmail && (storedEmail.includes('igneo') || storedEmail.includes('bomberos') || storedEmail === 'contacto@universo693.com')) {
        return IGNEO_VAULT;
      }
    }
    return null;
  });

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
          if (data.vault.id === 'vlt-asvid-spa' || (data.vault.clientEmail && data.vault.clientEmail.includes('asvid'))) {
            setMainTab('credenciales');
          }
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
      setError('Por favor ingresa tu correo institucional y contraseña.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const cleanEmail = email.toLowerCase().trim();
      const cleanPass = password.trim();

      // 1. Intentar primero contra Upstash Redis (/api/admin?action=vault-login) para traer facturas y PDFs en vivo
      try {
        const res = await fetch('/api/admin?action=vault-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.vault) {
            localStorage.setItem('u693_vault_token', data.sessionToken);
            localStorage.setItem('u693_vault_client_email', cleanEmail);
            setSessionToken(data.sessionToken);
            setVault(data.vault);
            if (cleanEmail.includes('asvid') || data.vault.id === 'vlt-asvid-spa') {
              setMainTab('credenciales');
            } else {
              setMainTab('insumos');
            }
            setPassword('');
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback local si el endpoint no responde o aún no se sincroniza
      }

      // 2. Acceso directo institucional para AsviD SpA
      if (
        (cleanEmail.includes('asvid') || cleanEmail === 'contacto.asvid@gmail.com') &&
        (cleanPass === 'Asvid2026!' || cleanPass === 'asvid2026' || cleanPass === 'ASVID2026')
      ) {
        setVault(ASVID_VAULT);
        setMainTab('credenciales');
        if (typeof window !== 'undefined') {
          localStorage.setItem('u693_vault_client_email', cleanEmail);
        }
        setPassword('');
        setLoading(false);
        return;
      }

      // 3. Acceso directo institucional para OTEC Ígneo (Fundación Bomberos Viña del Mar)
      if (
        (cleanEmail.includes('igneo') || cleanEmail.includes('bomberos') || cleanEmail === 'contacto@universo693.com') &&
        (cleanPass === 'Bomberos2026!' || cleanPass === 'Igneo2026!' || cleanPass === 'IGNEO-2026' || cleanPass === 'Igneo#2026')
      ) {
        setVault(IGNEO_VAULT);
        setMainTab('insumos');
        if (typeof window !== 'undefined') {
          localStorage.setItem('u693_vault_client_email', cleanEmail);
          sessionStorage.setItem('u693_vault_auth_igneo', 'true');
        }
        setPassword('');
        setLoading(false);
        return;
      }

      throw new Error('Credenciales inválidas. Verifique su correo institucional y contraseña.');
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la bóveda.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('u693_vault_token');
    localStorage.removeItem('u693_vault_client_key');
    localStorage.removeItem('u693_vault_client_email');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('u693_vault_auth_igneo');
    }
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
      empresaEmisora: 'UNIVERSO693 SpA',
      cliente: vault.clientName,
      proyecto: vault.project,
      fechaExportacion: new Date().toISOString(),
      declaracion: 'Copia maestra de credenciales, documentos tributarios y soberanía tecnológica para el cliente.',
      credenciales: vault.credentials,
      facturas: (vault.invoices || []).map(({ pdfDataUrl, ...rest }) => ({
        ...rest,
        tienePdfAdjunto: Boolean(pdfDataUrl),
      })),
    };
    const blob = new Blob([JSON.stringify(cleanVault, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Boveda-${vault.clientName.replace(/[^a-zA-Z0-9]/g, '_')}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintInvoiceVoucher = (inv: VaultInvoice) => {
    if (!vault) return;
    const w = window.open('', '_blank', 'width=840,height=920');
    if (!w) return;
    const formatClp = (n: number) => '$' + Math.round(n || 0).toLocaleString('es-CL');
    w.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${inv.tipoDte} ${inv.folio} — ${vault.clientName}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 40px; background: #f8fafc; }
          .sheet { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 36px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
          .top { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 24px; margin-bottom: 24px; }
          .brand h1 { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.02em; color: #0f172a; }
          .brand p { margin: 4px 0 0; font-size: 12px; color: #475569; }
          .sii-box { border: 2.5px solid #dc2626; padding: 12px 18px; text-align: center; color: #dc2626; font-weight: 800; border-radius: 6px; min-width: 210px; }
          .sii-box .rut { font-size: 13px; }
          .sii-box .tipo { font-size: 12px; margin: 4px 0; text-transform: uppercase; }
          .sii-box .folio { font-size: 16px; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 12px; margin-bottom: 24px; }
          .meta-grid div strong { display: block; color: #475569; text-transform: uppercase; font-size: 10px; margin-bottom: 2px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
          th { background: #0f172a; color: #fff; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; }
          td { padding: 14px 12px; border-bottom: 1px solid #e2e8f0; }
          .totals { margin-left: auto; width: 260px; font-size: 13px; }
          .totals .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e2e8f0; }
          .totals .row.final { font-size: 16px; font-weight: 900; border-bottom: 2px solid #0f172a; color: #0f172a; padding-top: 10px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; background: #dcfce7; color: #166534; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px dashed #cbd5e1; font-size: 11px; color: #64748b; text-align: center; }
          @media print { body { background: #fff; padding: 0; } .sheet { border: none; box-shadow: none; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="top">
            <div class="brand">
              <h1>UNIVERSO693 SpA</h1>
              <p><strong>RUT Emisor: 78.521.951-1</strong></p>
              <p>Ingeniería de Software, Plataformas Cloud & Soberanía Digital</p>
              <p>Villa Alemana / Viña del Mar, Región de Valparaíso, Chile</p>
              <p>contacto@universo693.com · https://universo693.com</p>
            </div>
            <div class="sii-box">
              <div class="rut">R.U.T.: 78.521.951-1</div>
              <div class="tipo">${inv.tipoDte}</div>
              <div class="folio">FOLIO N° ${inv.folio}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div>
              <strong>Cliente / Razón Social</strong>
              <span>${vault.clientName}</span>
            </div>
            <div>
              <strong>Fecha de Emisión</strong>
              <span>${inv.fechaEmision}</span>
            </div>
            <div>
              <strong>Proyecto Asociado</strong>
              <span>${vault.project}</span>
            </div>
            <div>
              <strong>Estado del Documento</strong>
              <span class="badge">${inv.estado.toUpperCase()}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Descripción / Glosa del Servicio</th>
                <th style="text-align:right; width:130px;">Total Neto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${inv.concepto}</strong>
                  ${inv.notas ? `<div style="margin-top:6px; font-size:11px; color:#64748b;">${inv.notas}</div>` : ''}
                </td>
                <td style="text-align:right; font-weight:700;">${formatClp(inv.montoNeto)}</td>
              </tr>
            </tbody>
          </table>

          <div class="totals">
            <div class="row">
              <span>Monto Neto:</span>
              <strong>${formatClp(inv.montoNeto)}</strong>
            </div>
            <div class="row">
              <span>19% I.V.A.:</span>
              <strong>${formatClp(inv.iva)}</strong>
            </div>
            <div class="row final">
              <span>TOTAL CLP:</span>
              <span>${formatClp(inv.montoTotal)}</span>
            </div>
          </div>

          <div class="footer">
            Respaldo tributario emitido y custodiado en la Bóveda Digital de UNIVERSO693 SpA.<br/>
            <button class="no-print" onclick="window.print()" style="margin-top:14px; padding:8px 18px; background:#0f172a; color:#fff; border:none; border-radius:6px; cursor:pointer; font-weight:700;">Imprimir / Guardar como PDF</button>
          </div>
        </div>
      </body>
      </html>
    `);
    w.document.close();
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
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Acceso a la Bóveda Digital</h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Portal seguro para entrega de insumos iniciales y repositorio soberano de credenciales.
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
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@bomberosvinadelmar.cl"
                    required
                    autoFocus
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Correo oficial asignado para la administración del proyecto.
                  </span>
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
                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-colors"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Provista en la Carta de Requerimientos o por el Área de Ingeniería.
                  </span>
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
                      <span>Ingresar a la Bóveda Digital</span>
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
            {/* Top Navigation Bar: Insumos vs Credenciales vs Facturas Electrónicas */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a1626] border border-white/10 rounded-2xl p-2 shadow-lg">
              <div className="flex flex-wrap items-center gap-2">
                {vault.id === 'vault-igneo' && (
                  <button
                    onClick={() => setMainTab('insumos')}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                      mainTab === 'insumos'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Configuración & Recepción de Insumos</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Fase 1
                    </span>
                  </button>
                )}
                <button
                  onClick={() => setMainTab('credenciales')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    mainTab === 'credenciales' || (mainTab === 'insumos' && vault.id !== 'vault-igneo')
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <KeyRound className="h-4 w-4" />
                  <span>Bóveda de Credenciales & Soberanía</span>
                  <span className="text-xs text-slate-400">({vault.credentials?.length || 0})</span>
                </button>
                <button
                  onClick={() => setMainTab('facturas')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    mainTab === 'facturas'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Receipt className="h-4 w-4" />
                  <span>Facturas Electrónicas & DTE (SII)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {vault.invoices?.length || 0}
                  </span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 px-3 hidden md:flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Gestión Unificada · UNIVERSO693 Bóveda v2.5</span>
              </div>
            </div>

            {mainTab === 'insumos' && vault.id === 'vault-igneo' ? (
              <OnboardingModule slug="igneo" embedded={true} onGoToCredentials={() => setMainTab('credenciales')} />
            ) : mainTab === 'facturas' ? (
              <div className="space-y-6">
                {/* Invoices Header Banner */}
                <div className="bg-gradient-to-r from-[#0b1f1d] via-[#0c2627] to-[#0c1c2e] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-3">
                        <Receipt className="h-3.5 w-3.5" />
                        Repositorio Tributario & Contable (SII)
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Facturas Electrónicas y Documentos Tributarios
                      </h2>
                      <p className="text-sm text-emerald-300 mt-1 font-medium">{vault.clientName}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Custodia permanente de tus documentos tributarios electrónicos (DTE) y comprobantes emitidos por UNIVERSO693 SpA.
                      </p>
                    </div>
                    <div className="text-left sm:text-right bg-white/[0.03] sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-white/5 sm:border-none">
                      <span className="text-xs text-slate-400 block">Documentos Registrados</span>
                      <span className="text-3xl font-black text-emerald-400">{vault.invoices?.length || 0}</span>
                      <span className="text-[11px] text-slate-500 block mt-1">Respaldo SII verificado</span>
                    </div>
                  </div>
                </div>

                {/* Invoices List */}
                {(!vault.invoices || vault.invoices.length === 0) ? (
                  <div className="text-center py-16 bg-[#0c1827] border border-white/10 rounded-3xl">
                    <Receipt className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-white">Aún no hay facturas electrónicas registradas en esta bóveda</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Cuando se emita un documento tributario (DTE) aparecerá aquí con su archivo PDF descargable.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vault.invoices.map((inv) => {
                      const isPaid = inv.estado === 'pagada';
                      const isPending = inv.estado === 'pendiente';
                      return (
                        <div
                          key={inv.id}
                          className="bg-[#0c1827] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-5 sm:p-6 transition-all shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                        >
                          <div className="space-y-2.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                                {inv.folio || 'S/F'}
                              </span>
                              <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                                {inv.tipoDte}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
                                  isPaid
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : isPending
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    : 'bg-red-500/15 text-red-300 border-red-500/30'
                                }`}
                              >
                                {isPaid ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                {inv.estado}
                              </span>
                              <span className="text-xs text-slate-400">
                                Emitida: <strong className="text-slate-200">{inv.fechaEmision}</strong>
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{inv.concepto}</h3>

                            {inv.notas && <p className="text-xs text-slate-400">{inv.notas}</p>}

                            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                              <span>
                                Neto:{' '}
                                <strong className="text-slate-200 font-mono">
                                  ${Math.round(inv.montoNeto || 0).toLocaleString('es-CL')}
                                </strong>
                              </span>
                              <span>
                                IVA (19%):{' '}
                                <strong className="text-slate-200 font-mono">
                                  ${Math.round(inv.iva || 0).toLocaleString('es-CL')}
                                </strong>
                              </span>
                              <span className="text-sm text-emerald-300 font-bold">
                                Total:{' '}
                                <strong className="font-mono">
                                  ${Math.round(inv.montoTotal || 0).toLocaleString('es-CL')} CLP
                                </strong>
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
                            {inv.pdfDataUrl ? (
                              <a
                                href={inv.pdfDataUrl}
                                download={inv.pdfFileName || `Factura_${inv.folio}.pdf`}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition-all"
                              >
                                <Download className="h-4 w-4" />
                                <span>Descargar Factura PDF (SII)</span>
                              </a>
                            ) : (
                              <span className="text-[11px] text-slate-400 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg text-center">
                                PDF original SII pronto disponible
                              </span>
                            )}
                            <button
                              onClick={() => handlePrintInvoiceVoucher(inv)}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
                            >
                              <Printer className="h-3.5 w-3.5 text-cyan-400" />
                              <span>Ver / Imprimir Comprobante Tributario</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
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
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        <p>© 2026 UNIVERSO693 SpA · Villa Alemana / Viña del Mar, Chile</p>
        <p className="text-[11px] text-slate-600 mt-1">
          Infraestructura de Soberanía Tecnológica y Respaldo Continuo de Activos Digitales.
        </p>
      </footer>
    </div>
  );
};

export default Boveda;

