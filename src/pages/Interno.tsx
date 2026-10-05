import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  FileText,
  Inbox,
  Link2,
  Loader2,
  LogOut,
  Mail,
  Plus,
  Save,
  Send,
  Sparkles,
  Target,
  Settings as SettingsIcon,
  Trash2,
  Package,
  Receipt,
  RefreshCw,
} from 'lucide-react';
import { PLAYBOOKS, playbookById, computeLeaks, documentsEmail, suggestionsFor, type ComputedLeak, type Confidence, type Metric } from '../data/ebsPlaybooks';

// Internal workspace (/interno). Spanish only, not indexed, not linked from the site.
// Everything goes through api/admin.ts with a bearer token saved in this browser.

type Unit = 'proyecto' | 'mes' | 'hora' | 'unidad';
type LeadStatus = 'nuevo' | 'contactado' | 'cotizado' | 'descartado';
type QuoteStatus = 'borrador' | 'enviada' | 'aceptada' | 'rechazada';

interface Lead {
  id: string;
  source: 'contacto' | 'audit' | 'audit-pro';
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  url?: string;
  interest?: string;
  budget?: string;
  notes?: string;
  paid?: boolean;
  status: LeadStatus;
  quoteId?: string;
}
interface Module {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  unit: Unit;
}
interface Settings {
  legalName: string;
  brand: string;
  rut: string;
  email: string;
  phone: string;
  website: string;
  validDays: number;
  paymentTerms: string;
  notes: string;
  ivaRate: number;
  devHourRate: number;
  maintenancePct: number;
  kickoffUrl: string;
}
interface QuoteItem {
  name: string;
  description: string;
  qty: number;
  unitPrice: number;
  unit: Unit;
}
interface Quote {
  id?: string;
  number?: string;
  status?: QuoteStatus;
  createdAt?: string;
  updatedAt?: string;
  sentAt?: string;
  leadId?: string;
  client: { name: string; company: string; email: string; rut: string; phone: string; giro?: string; address?: string; comuna?: string };
  invoice?: Invoice;
  title: string;
  currency: 'CLP' | 'USD';
  applyIva: boolean;
  discountPct: number;
  items: QuoteItem[];
  validDays: number;
  paymentTerms: string;
  notes: string;
}

/** Same codes as api/admin.ts `DocTipo`; 0 = comprobante de venta (internal, non-tax). */
type DocTipo = 0 | 33 | 34 | 39 | 41 | 52 | 56 | 61;
const DOC_LABEL: Record<DocTipo, string> = {
  33: 'Factura electrónica',
  34: 'Factura exenta',
  39: 'Boleta electrónica',
  41: 'Boleta exenta',
  52: 'Guía de despacho',
  56: 'Nota de débito',
  61: 'Nota de crédito',
  0: 'Comprobante de venta',
};

interface Invoice {
  id?: string;
  env: 'dev' | 'production' | 'interno';
  tipo: DocTipo;
  folio: number;
  number?: string;
  currency?: 'CLP' | 'USD';
  token: string;
  fecha: string;
  total: number;
  status?: string;
  warning?: string;
}

const TOKEN_KEY = 'u693AdminToken';
const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
const writeToken = (t: string | null) => {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* session only */
  }
};

class AuthError extends Error {}

/** Authenticated API call used by every view. */
type Api = <T>(action: string, opts?: { body?: unknown; query?: Record<string, string> }) => Promise<T>;

const call = async <T,>(action: string, opts: { body?: unknown; query?: Record<string, string>; token?: string | null } = {}): Promise<T> => {
  const qs = new URLSearchParams({ action, ...(opts.query ?? {}) }).toString();
  const res = await fetch(`/api/admin?${qs}`, {
    method: opts.body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}) },
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && action !== 'login') throw new AuthError(data?.error || 'Sesión vencida.');
  if (!res.ok) throw new Error(data?.error || 'Error inesperado.');
  return data as T;
};

const clp = (n: number) => `$${Math.round(n).toLocaleString('es-CL')}`;
const fmt = (n: number, c: 'CLP' | 'USD') => (c === 'CLP' ? clp(n) : `USD ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
const when = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' }) : '';

// ---------- Chilean RUT: format while typing (12.345.678-9) and check the verifier digit ----------
const rutClean = (v: string) => v.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
const formatRut = (v: string) => {
  const c = rutClean(v);
  if (c.length < 2) return c;
  const body = c.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${body}-${c.slice(-1)}`;
};
/** Módulo 11: the last character must match the body. */
const validRut = (v: string) => {
  const c = rutClean(v);
  if (c.length < 8 || !/^\d+[0-9K]$/.test(c)) return false;
  let sum = 0;
  let mul = 2;
  for (let i = c.length - 2; i >= 0; i--) {
    sum += Number(c[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const dv = 11 - (sum % 11);
  return c.slice(-1) === (dv === 11 ? '0' : dv === 10 ? 'K' : String(dv));
};
const RutInput = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const bad = rutClean(value).length >= 8 && !validRut(value);
  return (
    <div className="space-y-1">
      <input
        value={value}
        onChange={(e) => onChange(formatRut(e.target.value))}
        placeholder="RUT (ej. 76.123.456-7)"
        autoComplete="off"
        className={`${input} ${bad ? 'border-red-400/60' : ''}`}
      />
      {bad && <p className="text-xs text-red-300">RUT inválido: el dígito verificador no coincide.</p>}
    </div>
  );
};

/** Downloads an issued invoice's PDF (the API needs the bearer token, so no plain link). */
const downloadInvoicePdf = async (token: string, inv: Pick<Invoice, 'id' | 'tipo' | 'folio' | 'env' | 'number'>) => {
  const res = await fetch(`/api/admin?action=invoice-pdf&id=${encodeURIComponent(inv.id ?? '')}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('No se pudo descargar el documento.');
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement('a');
  a.href = url;
  a.download = inv.tipo === 0 ? `${inv.number ?? `comprobante-${inv.folio}`}.pdf` : `dte-${inv.tipo}-${inv.folio}${inv.env === 'dev' ? '-PRUEBA' : ''}.pdf`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

/** Data checks shared by quote and direct invoices (same as api/admin.ts `sourceProblems`). */
const sourceProblems = (c: Quote['client'], items: QuoteItem[]) => {
  const p: string[] = [];
  if (!validRut(c.rut)) p.push('RUT del cliente válido');
  if (!(c.company || c.name)) p.push('razón social');
  if (!c.giro) p.push('giro');
  if (!c.address) p.push('dirección');
  if (!c.comuna) p.push('comuna');
  if (!items.length || items.some((i) => i.unitPrice <= 0 || i.qty <= 0)) p.push('ítems con precio');
  return p;
};

/** Same checks as api/admin.ts `invoiceProblems`. */
const invoiceProblems = (q: Quote) => {
  const p: string[] = [];
  if (q.status !== 'aceptada') p.push('marcar la cotización como aceptada');
  if (q.currency !== 'CLP') p.push('moneda CLP');
  if (!validRut(q.client.rut)) p.push('RUT del cliente válido');
  if (!(q.client.company || q.client.name)) p.push('razón social');
  if (!q.client.giro) p.push('giro');
  if (!q.client.address) p.push('dirección');
  if (!q.client.comuna) p.push('comuna');
  if (!q.items.length || q.items.some((i) => i.unitPrice <= 0 || i.qty <= 0)) p.push('ítems con precio');
  return p;
};

/** Same math as api/admin.ts `totals`. */
const totals = (q: Pick<Quote, 'items' | 'discountPct' | 'applyIva'>, ivaRate: number) => {
  const line = (i: QuoteItem) => i.qty * i.unitPrice;
  const calc = (net: number) => {
    const discount = Math.round((net * q.discountPct) / 100);
    const base = net - discount;
    const iva = q.applyIva ? Math.round(base * ivaRate) : 0;
    return { net, discount, base, iva, total: base + iva };
  };
  return {
    oneOff: calc(q.items.filter((i) => i.unit !== 'mes').reduce((a, i) => a + line(i), 0)),
    monthly: calc(q.items.filter((i) => i.unit === 'mes').reduce((a, i) => a + line(i), 0)),
  };
};

const input =
  'w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';
const selectSm = 'rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-600 [&>option]:bg-[#0a1420]';
const btn = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
const btnPrimary = `${btn} bg-brand-600 hover:bg-brand-700 text-white`;
const btnGhost = `${btn} border border-white/15 bg-white/5 hover:bg-white/10 text-white`;

const SOURCE_LABEL: Record<Lead['source'], string> = { contacto: 'Formulario', audit: 'Audit gratis', 'audit-pro': 'Audit PRO' };
const LEAD_COLORS: Record<LeadStatus, string> = {
  nuevo: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/30',
  contactado: 'bg-amber-300/15 text-amber-200 border-amber-300/30',
  cotizado: 'bg-brand-500/20 text-brand-100 border-brand-500/40',
  descartado: 'bg-white/5 text-slate-400 border-white/15',
};
const QUOTE_COLORS: Record<QuoteStatus, string> = {
  borrador: 'bg-white/5 text-slate-300 border-white/15',
  enviada: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/30',
  aceptada: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
  rechazada: 'bg-red-400/10 text-red-300 border-red-400/30',
};

const Badge = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${className}`}>{children}</span>
);

// ---------------------------------------------------------------- login
const Login = ({ onToken }: { onToken: (t: string) => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { token } = await call<{ token: string }>('login', { body: { password } });
      writeToken(token);
      onToken(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo ingresar.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Uni-Verso693</p>
          <h1 className="text-2xl font-black text-white">Espacio interno</h1>
        </div>
        <input type="password" autoFocus autoComplete="current-password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={busy || !password} className={`${btnPrimary} w-full py-3`}>
          {busy && <Loader2 className="w-4 h-4 animate-spin" />} Ingresar
        </button>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------- leads
const Leads = ({
  api,
  onQuote,
  onOpenQuote,
  onAudit,
  onEbs,
}: {
  api: Api;
  onQuote: (lead: Lead) => void;
  onOpenQuote: (id: string) => void;
  onAudit: (lead: Lead) => void;
  onEbs: (lead: Lead) => void;
}) => {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [filter, setFilter] = useState<LeadStatus | 'todos'>('todos');
  const [open, setOpen] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ leads: Lead[] }>('leads').then((d) => setLeads(d.leads)).catch((e) => setError(e.message));
  }, [api]);

  const setStatus = async (lead: Lead, status: LeadStatus) => {
    const { lead: updated } = await api<{ lead: Lead }>('lead-status', { body: { id: lead.id, status } });
    setLeads((ls) => ls?.map((l) => (l.id === updated.id ? updated : l)) ?? null);
  };

  if (error) return <p className="text-red-300">{error}</p>;
  if (!leads) return <Loader2 className="w-5 h-5 animate-spin text-slate-400" />;
  const list = leads.filter((l) => filter === 'todos' || l.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(['todos', 'nuevo', 'contactado', 'cotizado', 'descartado'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`${btn} ${filter === f ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'} capitalize`}>
            {f} <span className="text-xs text-slate-500">{f === 'todos' ? leads.length : leads.filter((l) => l.status === f).length}</span>
          </button>
        ))}
      </div>
      {list.length === 0 && <p className="text-slate-400">No hay solicitudes {filter !== 'todos' ? `en "${filter}"` : 'todavía'}. Aparecen aquí cuando alguien usa el formulario, el Audit gratis o el Audit PRO.</p>}
      <ul className="space-y-3">
        {list.map((l) => (
          <li key={l.id} className="rounded-xl border border-white/10 bg-white/[0.03]">
            <button onClick={() => setOpen(open === l.id ? null : l.id)} className="w-full flex flex-wrap items-center gap-3 p-4 text-left cursor-pointer">
              <Badge className={LEAD_COLORS[l.status]}>{l.status}</Badge>
              <span className="font-bold text-white">{l.name}</span>
              {l.company && <span className="text-sm text-slate-400">· {l.company}</span>}
              <span className="text-xs text-slate-500">{SOURCE_LABEL[l.source]}</span>
              {l.source === 'audit-pro' && <Badge className={l.paid ? QUOTE_COLORS.aceptada : QUOTE_COLORS.borrador}>{l.paid ? 'pagado' : 'pago pendiente'}</Badge>}
              <span className="ml-auto text-xs text-slate-500">{when(l.createdAt)}</span>
            </button>
            {open === l.id && (
              <div className="border-t border-white/10 p-4 space-y-4 text-sm">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-slate-300">
                  <div><dt className="text-xs text-slate-500">Correo</dt><dd><a href={`mailto:${l.email}`} className="text-cyan-300 hover:text-cyan-200">{l.email}</a></dd></div>
                  {l.phone && <div><dt className="text-xs text-slate-500">Teléfono</dt><dd><a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200">{l.phone}</a></dd></div>}
                  {l.url && <div><dt className="text-xs text-slate-500">Sitio</dt><dd><a href={l.url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 break-all">{l.url}</a></dd></div>}
                  {l.interest && <div><dt className="text-xs text-slate-500">Interés</dt><dd>{l.interest}</dd></div>}
                  {l.budget && <div><dt className="text-xs text-slate-500">Presupuesto</dt><dd>{l.budget}</dd></div>}
                </dl>
                {l.notes && <p className="whitespace-pre-line text-slate-400 leading-relaxed">{l.notes}</p>}
                <div className="flex flex-wrap items-center gap-2">
                  {l.quoteId ? (
                    <button onClick={() => onOpenQuote(l.quoteId!)} className={btnPrimary}><FileText className="w-4 h-4" /> Ver cotización</button>
                  ) : (
                    <button onClick={() => onQuote(l)} className={btnPrimary}><FileText className="w-4 h-4" /> Cotizar</button>
                  )}
                  <button onClick={() => onEbs(l)} className={btnGhost}><Target className="w-4 h-4" /> Iniciar EBS</button>
                  <button onClick={() => onAudit(l)} className={btnGhost}><Sparkles className="w-4 h-4" /> Audit PRO gratis</button>
                  <select value={l.status} onChange={(e) => setStatus(l, e.target.value as LeadStatus)} className={selectSm}>
                    {(['nuevo', 'contactado', 'cotizado', 'descartado'] as const).map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---------------------------------------------------------------- quote editor
const emptyQuote = (s: Settings, lead?: Lead): Quote => ({
  leadId: lead?.id,
  client: { name: lead?.name ?? '', company: lead?.company ?? '', email: lead?.email ?? '', rut: '', phone: lead?.phone ?? '' },
  title: lead?.interest ?? '',
  currency: 'CLP',
  applyIva: true,
  discountPct: 0,
  items: [],
  validDays: s.validDays,
  paymentTerms: s.paymentTerms,
  notes: s.notes,
});

const QuoteEditor = ({
  api,
  initial,
  catalog,
  settings,
  token,
  onBack,
}: { api: Api; initial: Quote; catalog: Module[]; settings: Settings; token: string; onBack: () => void }) => {
  const [q, setQ] = useState<Quote>(initial);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [sendTo, setSendTo] = useState(initial.client.email);
  const [sendMsg, setSendMsg] = useState('');

  const update = (patch: Partial<Quote>) => {
    setQ((cur) => ({ ...cur, ...patch }));
    setDirty(true);
  };
  const setClient = (k: keyof Quote['client'], v: string) => update({ client: { ...q.client, [k]: v } });
  const setItem = (idx: number, patch: Partial<QuoteItem>) => update({ items: q.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });
  const addModule = (m: Module) =>
    update({ items: [...q.items, { name: m.name, description: m.description, qty: 1, unitPrice: q.currency === 'CLP' ? m.price : 0, unit: m.unit }] });
  const addBlank = () => update({ items: [...q.items, { name: 'Ítem a medida', description: '', qty: 1, unitPrice: 0, unit: 'proyecto' }] });

  const t = totals(q, settings.ivaRate);
  const missingPrice = q.items.some((i) => i.unitPrice <= 0);
  const byCategory = useMemo(() => {
    const m = new Map<string, Module[]>();
    catalog.forEach((mod) => m.set(mod.category, [...(m.get(mod.category) ?? []), mod]));
    return [...m.entries()];
  }, [catalog]);

  const save = async () => {
    setBusy('save');
    setMsg(null);
    try {
      const { quote } = await api<{ quote: Quote }>('quote-save', { body: q });
      setQ(quote);
      setDirty(false);
      setMsg({ ok: true, text: `Guardada como ${quote.number}.` });
      return quote;
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
      return null;
    } finally {
      setBusy(null);
    }
  };
  const ensureSaved = async () => (dirty || !q.id ? await save() : q);

  const downloadPdf = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('pdf');
    try {
      const res = await fetch(`/api/admin?action=quote-pdf&id=${encodeURIComponent(saved.id)}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('No se pudo generar el PDF.');
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement('a');
      a.href = url;
      a.download = `${saved.number}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const send = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('send');
    try {
      const { quote } = await api<{ quote: Quote }>('quote-send', { body: { id: saved.id, to: sendTo, message: sendMsg } });
      setQ(quote);
      setSendOpen(false);
      setMsg({ ok: true, text: `Enviada a ${sendTo}. Te llegó una copia oculta.` });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const [invoiceEnv, setInvoiceEnv] = useState<'dev' | 'production' | null>(null);
  useEffect(() => {
    api<{ env: 'dev' | 'production' }>('invoice-config').then((d) => setInvoiceEnv(d.env)).catch(() => undefined);
  }, [api]);
  const invoiceMissing = invoiceProblems(q);

  const issueInvoice = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    const label = invoiceEnv === 'production' ? 'una FACTURA REAL ante el SII (no se puede deshacer; solo se anula con nota de crédito)' : 'una factura de PRUEBA sin validez tributaria';
    if (!window.confirm(`Vas a emitir ${label} por ${fmt(totals(saved, settings.ivaRate).oneOff.total + totals(saved, settings.ivaRate).monthly.total, 'CLP')}. ¿Continuar?`)) return;
    setBusy('invoice');
    setMsg(null);
    try {
      const { quote } = await api<{ quote: Quote }>('invoice-issue', { body: { id: saved.id } });
      setQ(quote);
      setMsg({ ok: true, text: `Factura emitida: folio ${quote.invoice?.folio}.` });
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  };
  const refreshInvoice = async () => {
    if (!q.invoice?.id) return;
    setBusy('invoice-status');
    try {
      const { invoice } = await api<{ invoice: Invoice }>('invoice-status', { body: { id: q.invoice.id } });
      setQ((cur) => ({ ...cur, invoice: { ...cur.invoice!, status: invoice.status } }));
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  };
  const downloadInvoice = async () => {
    if (!q.invoice?.id) return;
    setBusy('invoice-pdf');
    try {
      await downloadInvoicePdf(token, q.invoice);
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const setStatus = async (status: QuoteStatus) => {
    // not saved yet: keep it locally, it goes out with the first save
    if (!q.id || dirty) {
      update({ status });
      return;
    }
    const { quote } = await api<{ quote: Quote }>('quote-status', { body: { id: q.id, status } });
    setQ(quote);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onBack} className={`${btn} text-slate-400 hover:text-white px-0`}><ArrowLeft className="w-4 h-4" /> Cotizaciones</button>
        <h2 className="text-xl font-black text-white">{q.number ?? 'Nueva cotización'}</h2>
        <label className="inline-flex items-center gap-2 text-xs text-slate-500">
          Estado
          <select value={q.status ?? 'borrador'} onChange={(e) => setStatus(e.target.value as QuoteStatus)} className={selectSm}>
            {(['borrador', 'enviada', 'aceptada', 'rechazada'] as const).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {q.sentAt && <span className="text-xs text-slate-500">Enviada {when(q.sentAt)}</span>}
        <div className="ml-auto flex flex-wrap gap-2">
          <button onClick={save} disabled={!!busy} className={btnGhost}>{busy === 'save' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Guardar{dirty ? ' *' : ''}</button>
          <button onClick={downloadPdf} disabled={!!busy || !q.items.length} className={btnGhost}>{busy === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} PDF</button>
          <button onClick={() => setSendOpen(true)} disabled={!!busy || !q.items.length} className={btnPrimary}><Send className="w-4 h-4" /> Enviar</button>
        </div>
      </div>
      {msg && <p className={`text-sm ${msg.ok ? 'text-emerald-300' : 'text-red-300'}`}>{msg.text}</p>}

      {sendOpen && (
        <div className="rounded-xl border border-brand-500/40 bg-brand-600/10 p-5 space-y-3">
          <p className="font-bold text-white">Enviar la cotización por correo, con el PDF adjunto</p>
          <input value={sendTo} onChange={(e) => setSendTo(e.target.value)} placeholder="correo@cliente.cl" className={input} />
          <textarea rows={4} value={sendMsg} onChange={(e) => setSendMsg(e.target.value)} placeholder={`Mensaje (opcional). Si lo dejas vacío: "Hola ${q.client.name || '…'}, adjuntamos la cotización…"`} className={input} />
          {missingPrice && <p className="text-sm text-amber-200">Hay ítems con precio 0: complétalos antes de enviar.</p>}
          <div className="flex gap-2">
            <button onClick={send} disabled={!!busy || missingPrice || !sendTo} className={btnPrimary}>{busy === 'send' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />} Enviar ahora</button>
            <button onClick={() => setSendOpen(false)} className={btnGhost}>Cancelar</button>
          </div>
        </div>
      )}

      {q.items.length > 0 && (
        <section className={`rounded-xl border p-5 space-y-3 ${q.invoice ? 'border-emerald-400/30 bg-emerald-400/5' : 'border-white/10 bg-white/[0.03]'}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Receipt className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-white">Facturación electrónica</h3>
            {(q.invoice?.env ?? invoiceEnv) === 'dev' && <Badge className="bg-amber-300/15 text-amber-200 border-amber-300/30">ambiente de prueba · sin validez tributaria</Badge>}
            {(q.invoice?.env ?? invoiceEnv) === 'production' && <Badge className="bg-red-400/10 text-red-300 border-red-400/30">producción · SII</Badge>}
          </div>
          {q.invoice ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                {DOC_LABEL[q.invoice.tipo]} <b className="text-white">N° {q.invoice.folio}</b> · {q.invoice.fecha} · {fmt(q.invoice.total, 'CLP')}
                {q.invoice.status && <> · Estado SII: <b className="text-white">{q.invoice.status}</b></>}
              </p>
              {q.invoice.warning && <p className="text-xs text-amber-200">Aviso: {q.invoice.warning}</p>}
              <div className="flex flex-wrap gap-2">
                <button onClick={downloadInvoice} disabled={!!busy} className={btnGhost}>{busy === 'invoice-pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Factura PDF</button>
                <button onClick={refreshInvoice} disabled={!!busy} className={btnGhost}>{busy === 'invoice-status' ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />} Consultar estado SII</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {invoiceMissing.length > 0 ? (
                <p className="text-sm text-amber-200">Para emitir falta: {invoiceMissing.join(', ')}.</p>
              ) : (
                <p className="text-sm text-slate-400">
                  Se emitirá una {q.applyIva ? 'factura afecta (33)' : 'factura exenta (34)'} con el detalle, el descuento y los totales de esta cotización.
                </p>
              )}
              <button onClick={issueInvoice} disabled={!!busy || invoiceMissing.length > 0} className={btnPrimary}>
                {busy === 'invoice' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Receipt className="w-4 h-4" />} Emitir factura{invoiceEnv === 'dev' ? ' (prueba)' : ''}
              </button>
            </div>
          )}
        </section>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Cliente</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={q.client.name} onChange={(e) => setClient('name', e.target.value)} placeholder="Nombre de contacto" className={input} />
              <input value={q.client.company} onChange={(e) => setClient('company', e.target.value)} placeholder="Empresa" className={input} />
              <input value={q.client.email} onChange={(e) => setClient('email', e.target.value)} placeholder="Correo" className={input} />
              <input value={q.client.phone} onChange={(e) => setClient('phone', e.target.value)} placeholder="Teléfono" className={input} />
              <RutInput value={q.client.rut} onChange={(v) => setClient('rut', v)} />
              <input value={q.title} onChange={(e) => update({ title: e.target.value })} placeholder="Título: ej. Agente de IA para WhatsApp" className={input} />
            </div>
            <p className="text-xs text-slate-500">Para facturar además se necesitan:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input value={q.client.giro ?? ''} onChange={(e) => setClient('giro', e.target.value)} placeholder="Giro" className={input} />
              <input value={q.client.address ?? ''} onChange={(e) => setClient('address', e.target.value)} placeholder="Dirección" className={input} />
              <input value={q.client.comuna ?? ''} onChange={(e) => setClient('comuna', e.target.value)} placeholder="Comuna" className={input} />
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Detalle</h3>
              <button onClick={addBlank} className={`${btnGhost} ml-auto`}><Plus className="w-4 h-4" /> Ítem a medida</button>
            </div>
            {q.items.length === 0 && <p className="text-sm text-slate-500">Agrega módulos desde el catálogo de la derecha o un ítem a medida.</p>}
            <div className="space-y-3">
              {q.items.map((it, idx) => (
                <div key={idx} className="rounded-lg border border-white/10 p-3 space-y-2">
                  <div className="flex gap-2">
                    <input value={it.name} onChange={(e) => setItem(idx, { name: e.target.value })} className={`${input} font-bold`} />
                    <button onClick={() => update({ items: q.items.filter((_, i) => i !== idx) })} className={`${btnGhost} px-3`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <textarea rows={2} value={it.description} onChange={(e) => setItem(idx, { description: e.target.value })} placeholder="Descripción (aparece en el PDF)" className={input} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center">
                    <label className="text-xs text-slate-500">Cantidad<input type="number" min={0} value={it.qty} onChange={(e) => setItem(idx, { qty: Number(e.target.value) })} className={input} /></label>
                    <label className="text-xs text-slate-500">Precio unitario ({q.currency})<input type="number" min={0} step={q.currency === 'CLP' ? 1000 : 1} value={it.unitPrice} onChange={(e) => setItem(idx, { unitPrice: Number(e.target.value) })} className={`${input} ${it.unitPrice <= 0 ? 'border-amber-300/60' : ''}`} /></label>
                    <label className="text-xs text-slate-500">Unidad
                      <select value={it.unit} onChange={(e) => setItem(idx, { unit: e.target.value as Unit })} className={`${input} [&>option]:bg-[#0a1420]`}>
                        {(['proyecto', 'mes', 'hora', 'unidad'] as const).map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </label>
                    <p className="text-right font-bold text-white">{fmt(it.qty * it.unitPrice, q.currency)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Condiciones</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="text-xs text-slate-500">Moneda
                <select value={q.currency} onChange={(e) => update({ currency: e.target.value as 'CLP' | 'USD', applyIva: e.target.value === 'CLP' })} className={`${input} [&>option]:bg-[#0a1420]`}>
                  <option value="CLP">CLP</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className="text-xs text-slate-500">Descuento %<input type="number" min={0} max={100} value={q.discountPct} onChange={(e) => update({ discountPct: Number(e.target.value) })} className={input} /></label>
              <label className="text-xs text-slate-500">Validez (días)<input type="number" min={1} value={q.validDays} onChange={(e) => update({ validDays: Number(e.target.value) })} className={input} /></label>
              <label className="flex items-center gap-2 pt-5 text-sm text-slate-300"><input type="checkbox" checked={q.applyIva} onChange={(e) => update({ applyIva: e.target.checked })} /> Agregar IVA ({Math.round(settings.ivaRate * 100)}%)</label>
            </div>
            <label className="block text-xs text-slate-500">Condiciones de pago<textarea rows={2} value={q.paymentTerms} onChange={(e) => update({ paymentTerms: e.target.value })} className={input} /></label>
            <label className="block text-xs text-slate-500">Notas<textarea rows={3} value={q.notes} onChange={(e) => update({ notes: e.target.value })} className={input} /></label>
          </section>
        </div>

        <aside className="xl:col-span-4 space-y-6">
          <section className="rounded-xl border border-brand-500/40 bg-[#070b16] p-5 space-y-2 xl:sticky xl:top-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Totales</h3>
            {(['oneOff', 'monthly'] as const).map((k) =>
              t[k].net > 0 || (k === 'oneOff' && t.monthly.net === 0) ? (
                <div key={k} className="space-y-1 text-sm">
                  {t.monthly.net > 0 && <p className="pt-2 text-xs font-bold text-cyan-300">{k === 'oneOff' ? 'Pago único' : 'Mensual'}</p>}
                  <p className="flex justify-between text-slate-400"><span>Subtotal</span><span>{fmt(t[k].net, q.currency)}</span></p>
                  {t[k].discount > 0 && <p className="flex justify-between text-slate-400"><span>Descuento</span><span>-{fmt(t[k].discount, q.currency)}</span></p>}
                  {q.applyIva && <p className="flex justify-between text-slate-400"><span>IVA</span><span>{fmt(t[k].iva, q.currency)}</span></p>}
                  <p className="flex justify-between text-lg font-black text-white"><span>Total{k === 'monthly' ? ' /mes' : ''}</span><span>{fmt(t[k].total, q.currency)}</span></p>
                </div>
              ) : null,
            )}
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Catálogo</h3>
            {byCategory.map(([cat, mods]) => (
              <div key={cat} className="space-y-1.5">
                <p className="text-xs font-bold text-cyan-300">{cat}</p>
                {mods.map((m) => (
                  <button key={m.id} onClick={() => addModule(m)} className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 cursor-pointer">
                    <span className="flex items-center gap-2"><Plus className="w-3.5 h-3.5 text-slate-500" />{m.name}</span>
                    <span className={`shrink-0 text-xs ${m.price > 0 ? 'text-slate-400' : 'text-amber-200'}`}>{m.price > 0 ? `${clp(m.price)}${m.unit === 'proyecto' ? '' : `/${m.unit}`}` : 'sin precio'}</span>
                  </button>
                ))}
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- quotes list
const Quotes = ({ api, settings, onOpen, onNew }: { api: Api; settings: Settings; onOpen: (q: Quote) => void; onNew: () => void }) => {
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    api<{ quotes: Quote[] }>('quotes').then((d) => setQuotes(d.quotes)).catch((e) => setError(e.message));
  }, [api]);

  const duplicate = async (q: Quote) => {
    const { quote } = await api<{ quote: Quote }>('quote-save', { body: { ...q, id: undefined, leadId: undefined, title: `${q.title} (copia)` } });
    onOpen(quote);
  };
  const remove = async (q: Quote) => {
    if (!window.confirm(`¿Borrar ${q.number}? No se puede deshacer.`)) return;
    await api('quote-delete', { body: { id: q.id } });
    setQuotes((qs) => qs?.filter((x) => x.id !== q.id) ?? null);
  };

  if (error) return <p className="text-red-300">{error}</p>;
  if (!quotes) return <Loader2 className="w-5 h-5 animate-spin text-slate-400" />;
  const s = search.toLowerCase();
  const list = quotes.filter((q) => !s || [q.number, q.title, q.client.name, q.client.company, q.client.email].some((v) => v?.toLowerCase().includes(s)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por número, cliente o título" className={`${input} max-w-sm`} />
        <button onClick={onNew} className={`${btnPrimary} ml-auto`}><Plus className="w-4 h-4" /> Nueva cotización</button>
      </div>
      {list.length === 0 && <p className="text-slate-400">{quotes.length ? 'Sin resultados.' : 'Aún no hay cotizaciones.'}</p>}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] text-sm">
          <tbody>
            {list.map((q) => {
              const t = totals(q, settings.ivaRate);
              return (
                <tr key={q.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                  <td className="p-3"><button onClick={() => onOpen(q)} className="font-bold text-white hover:text-cyan-200 cursor-pointer">{q.number}</button></td>
                  <td className="p-3 text-slate-300">{q.client.company || q.client.name}<span className="block text-xs text-slate-500">{q.title}</span></td>
                  <td className="p-3"><Badge className={QUOTE_COLORS[q.status ?? 'borrador']}>{q.status}</Badge>{q.invoice && <span className="block pt-1 text-xs text-emerald-300">Factura {q.invoice.folio}{q.invoice.env === 'dev' ? ' (prueba)' : ''}</span>}</td>
                  <td className="p-3 text-right font-bold text-white">{fmt(t.oneOff.total, q.currency)}{t.monthly.total > 0 && <span className="block text-xs text-slate-400">+ {fmt(t.monthly.total, q.currency)}/mes</span>}</td>
                  <td className="p-3 text-xs text-slate-500">{when(q.updatedAt)}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button onClick={() => duplicate(q)} className={`${btn} text-slate-400 hover:text-white px-2`} aria-label="Duplicar" title="Duplicar"><Copy className="w-4 h-4" /></button>
                    <button onClick={() => remove(q)} className={`${btn} text-slate-400 hover:text-red-300 px-2`} aria-label="Borrar" title="Borrar"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- billing
interface DocRef {
  tipo: 33 | 34 | 39 | 41 | 52 | 56 | 61;
  folio: number;
  fecha: string;
  codRef: 1 | 3;
  razon: string;
}
interface Despacho {
  indTraslado: number;
  patente: string;
  rutTransportista: string;
  rutChofer: string;
  nombreChofer: string;
  dirDestino: string;
  comunaDestino: string;
  fechaSalida: string;
  horaSalida: string;
  fechaLlegada: string;
}
interface InvoiceRecord extends Invoice {
  id: string;
  createdAt: string;
  quoteId?: string;
  quoteNumber?: string;
  client: Quote['client'];
  items: QuoteItem[];
  applyIva: boolean;
  discountPct: number;
  ref?: DocRef;
  despacho?: Despacho;
  notes?: string;
}

const newDraftId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const todayCL = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Santiago' });

/** Document types offered in "Nuevo documento", with a hint for when to use each one. */
const DOC_OPTIONS: { tipo: DocTipo; hint: string }[] = [
  { tipo: 33, hint: 'Venta a empresas en Chile, con IVA.' },
  { tipo: 34, hint: 'Servicios o ventas exentas de IVA.' },
  { tipo: 39, hint: 'Venta a consumidor final; precios con IVA incluido.' },
  { tipo: 41, hint: 'Venta exenta a consumidor final.' },
  { tipo: 61, hint: 'Anula o rebaja un documento ya emitido.' },
  { tipo: 56, hint: 'Aumenta el monto de un documento ya emitido.' },
  { tipo: 52, hint: 'Acompaña el traslado de mercadería.' },
  { tipo: 0, hint: 'No tributario, en CLP o USD: clientes en el extranjero o registro interno.' },
];

const TRASLADOS: [number, string][] = [
  [1, 'Venta'],
  [2, 'Venta por efectuar'],
  [3, 'Consignación'],
  [4, 'Entrega gratuita'],
  [5, 'Traslado interno'],
  [6, 'Otro traslado no venta'],
  [7, 'Devolución'],
];

const isBoleta = (t: DocTipo) => t === 39 || t === 41;
/** Types whose IVA is fixed by the type itself; the rest let you choose. */
const FIXED_IVA: Partial<Record<DocTipo, boolean>> = { 33: true, 34: false, 39: true, 41: false };

/** Same math as api/admin.ts `docTotals` (boletas carry prices with IVA included). */
const docTotals = (tipo: DocTipo, items: QuoteItem[], discountPct: number, applyIva: boolean, ivaRate: number) => {
  const exempt = tipo === 34 || tipo === 41 || (!FIXED_IVA.hasOwnProperty(tipo) && !applyIva);
  const lines = items.reduce((a, i) => a + Math.round(i.qty * i.unitPrice), 0);
  const discount = Math.round((lines * discountPct) / 100);
  const base = lines - discount;
  if (isBoleta(tipo)) {
    const neto = exempt ? 0 : Math.round(base / (1 + ivaRate));
    return { exempt, lines, discount, iva: exempt ? 0 : base - neto, total: base };
  }
  const iva = exempt ? 0 : Math.round(base * ivaRate);
  return { exempt, lines, discount, iva, total: base + iva };
};

/** Same checks as api/admin.ts `sourceProblems`. */
const docProblems = (tipo: DocTipo, c: Quote['client'], items: QuoteItem[], ref: DocRef, despacho: Despacho) => {
  const p: string[] = [];
  if (tipo === 0) {
    if (!(c.company || c.name)) p.push('nombre o empresa del cliente');
  } else if (isBoleta(tipo)) {
    if (c.rut && !validRut(c.rut)) p.push('RUT válido (o déjalo vacío)');
  } else {
    if (!validRut(c.rut)) p.push('RUT del cliente válido');
    if (!(c.company || c.name)) p.push('razón social');
    if (!c.giro) p.push('giro');
    if (!c.address) p.push('dirección');
    if (!c.comuna) p.push('comuna');
  }
  if (tipo === 56 || tipo === 61) {
    if (!ref.folio) p.push('folio del documento que se modifica');
    if (!ref.fecha) p.push('fecha del documento que se modifica');
    if (!ref.razon) p.push('motivo de la nota');
  }
  if (tipo === 52 && !despacho.indTraslado) p.push('tipo de traslado');
  if (!items.length || items.some((i) => i.qty <= 0 || i.unitPrice <= 0)) p.push('ítems con cantidad y precio');
  return p;
};

const docNumber = (inv: Pick<Invoice, 'tipo' | 'folio' | 'number'>) => (inv.tipo === 0 ? inv.number ?? `CV ${inv.folio}` : `N° ${inv.folio}`);

/** New document from scratch: pick the type, fill the parties and the detail, issue. */
const InvoiceEditor = ({
  api,
  catalog,
  settings,
  env,
  token,
  issued: issuedList,
  onDone,
}: {
  api: Api;
  catalog: Module[];
  settings: Settings;
  env: 'dev' | 'production' | null;
  token: string;
  issued: InvoiceRecord[];
  onDone: () => void;
}) => {
  // generated once per form: if "Emitir" is pressed twice, the API returns the same document
  const [draftId] = useState(newDraftId);
  const [tipo, setTipo] = useState<DocTipo>(33);
  const [client, setClient] = useState<Quote['client']>({ name: '', company: '', email: '', rut: '', phone: '', giro: '', address: '', comuna: '' });
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [ivaChoice, setIvaChoice] = useState(true);
  const [discountPct, setDiscountPct] = useState(0);
  const [currency, setCurrency] = useState<'CLP' | 'USD'>('CLP');
  const [notes, setNotes] = useState('');
  const [ref, setRef] = useState<DocRef>({ tipo: 33, folio: 0, fecha: '', codRef: 1, razon: '' });
  const [despacho, setDespacho] = useState<Despacho>({
    indTraslado: 1,
    patente: '',
    rutTransportista: '',
    rutChofer: '',
    nombreChofer: '',
    dirDestino: '',
    comunaDestino: '',
    fechaSalida: todayCL(),
    horaSalida: '',
    fechaLlegada: todayCL(),
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [issued, setIssued] = useState<InvoiceRecord | null>(null);

  const applyIva = FIXED_IVA[tipo] ?? ivaChoice;
  const cur: 'CLP' | 'USD' = tipo === 0 ? currency : 'CLP';
  const t = docTotals(tipo, items, discountPct, applyIva, settings.ivaRate);
  const missing = docProblems(tipo, client, items, ref, despacho);
  const setC = (k: keyof Quote['client'], v: string) => setClient((c) => ({ ...c, [k]: v }));
  const setD = (k: keyof Despacho, v: string | number) => setDespacho((d) => ({ ...d, [k]: v }));
  const setItem = (idx: number, patch: Partial<QuoteItem>) => setItems((its) => its.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const referable = issuedList.filter((i) => i.tipo !== 0 && i.env !== 'interno');

  /** Credit/debit note: pick the document it modifies and copy its receptor (and detail, to annul). */
  const pickRef = (id: string) => {
    const src = referable.find((i) => i.id === id);
    if (!src) return;
    setRef((r) => ({ ...r, tipo: src.tipo as DocRef['tipo'], folio: src.folio, fecha: src.fecha, razon: r.razon || (r.codRef === 1 ? `Anula ${DOC_LABEL[src.tipo].toLowerCase()} N° ${src.folio}` : '') }));
    setClient(src.client);
    setIvaChoice(src.applyIva);
    if (ref.codRef === 1) {
      setItems(src.items);
      setDiscountPct(src.discountPct);
    }
  };

  const emit = async () => {
    const label =
      tipo === 0
        ? `un ${DOC_LABEL[0].toLowerCase()} (documento interno, no tributario)`
        : env === 'production'
          ? `una ${DOC_LABEL[tipo].toUpperCase()} REAL ante el SII (no se puede deshacer)`
          : `una ${DOC_LABEL[tipo].toLowerCase()} de PRUEBA sin validez tributaria`;
    if (!window.confirm(`Vas a emitir ${label} por ${fmt(t.total, cur)}. ¿Continuar?`)) return;
    setBusy(true);
    setMsg(null);
    try {
      const { invoice } = await api<{ invoice: InvoiceRecord }>('invoice-create', {
        body: { draftId, tipo, client, items, applyIva, discountPct, currency: cur, notes, ref, despacho },
      });
      setIssued(invoice);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (issued) {
    return (
      <div className="max-w-2xl space-y-5 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-6">
        <p className="inline-flex items-center gap-2 font-bold text-emerald-300">
          <Receipt className="w-5 h-5" /> Documento emitido
          {issued.env === 'dev' ? ' (prueba, sin validez tributaria)' : issued.env === 'interno' ? ' (interno, no tributario)' : ''}
        </p>
        <p className="text-slate-300">
          {DOC_LABEL[issued.tipo]} <b className="text-white">{docNumber(issued)}</b> · {issued.client.company || issued.client.name || 'Consumidor final'} · {fmt(issued.total, issued.currency ?? 'CLP')}
        </p>
        {issued.warning && <p className="text-xs text-amber-200">Aviso: {issued.warning}</p>}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => downloadInvoicePdf(token, issued).catch((e) => setMsg(e.message))} className={btnGhost}><Download className="w-4 h-4" /> PDF</button>
          <button onClick={onDone} className={btnPrimary}>Volver a Facturación</button>
        </div>
        {msg && <p className="text-sm text-red-300">{msg}</p>}
      </div>
    );
  }

  const envBadge =
    tipo === 0 ? (
      <Badge className="bg-white/5 text-slate-300 border-white/15">documento interno · no tributario</Badge>
    ) : env === 'dev' ? (
      <Badge className="bg-amber-300/15 text-amber-200 border-amber-300/30">ambiente de prueba · sin validez tributaria</Badge>
    ) : env === 'production' ? (
      <Badge className="bg-red-400/10 text-red-300 border-red-400/30">producción · SII</Badge>
    ) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onDone} className={`${btn} text-slate-400 hover:text-white px-0`}><ArrowLeft className="w-4 h-4" /> Facturación</button>
        <h2 className="text-xl font-black text-white">Nuevo documento</h2>
        {envBadge}
        <button onClick={emit} disabled={busy || missing.length > 0} className={`${btnPrimary} ml-auto`}>
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Receipt className="w-4 h-4" />} Emitir {DOC_LABEL[tipo].toLowerCase()}
          {tipo !== 0 && env === 'dev' ? ' (prueba)' : ''}
        </button>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {DOC_OPTIONS.map((o) => (
          <button
            key={o.tipo}
            onClick={() => setTipo(o.tipo)}
            className={`rounded-lg border p-3 text-left cursor-pointer transition-colors ${tipo === o.tipo ? 'border-brand-500 bg-brand-600/15' : 'border-white/10 bg-white/[0.02] hover:border-white/25'}`}
          >
            <span className="block text-sm font-bold text-white">
              {DOC_LABEL[o.tipo]} {o.tipo !== 0 && <span className="text-xs font-normal text-slate-500">({o.tipo})</span>}
            </span>
            <span className="block pt-0.5 text-xs text-slate-400">{o.hint}</span>
          </button>
        ))}
      </section>

      {missing.length > 0 && <p className="text-sm text-amber-200">Para emitir falta: {missing.join(', ')}.</p>}
      {msg && <p className="text-sm text-red-300">{msg}</p>}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          {(tipo === 61 || tipo === 56) && (
            <section className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Documento que se modifica</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-xs text-slate-500">
                  Qué hace esta nota
                  <select value={ref.codRef} onChange={(e) => setRef({ ...ref, codRef: Number(e.target.value) === 1 ? 1 : 3 })} className={`${input} [&>option]:bg-[#0a1420]`}>
                    {tipo === 61 && <option value={1}>Anula el documento completo</option>}
                    <option value={3}>Corrige montos (rebaja o aumento parcial)</option>
                  </select>
                </label>
                {referable.length > 0 && (
                  <label className="text-xs text-slate-500">
                    Elegir de los emitidos
                    <select defaultValue="" onChange={(e) => pickRef(e.target.value)} className={`${input} [&>option]:bg-[#0a1420]`}>
                      <option value="">—</option>
                      {referable.map((i) => (
                        <option key={i.id} value={i.id}>
                          {DOC_LABEL[i.tipo]} N° {i.folio} · {i.client.company || i.client.name || 'Consumidor final'} · {fmt(i.total, 'CLP')}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className="text-xs text-slate-500">
                  Tipo del documento
                  <select value={ref.tipo} onChange={(e) => setRef({ ...ref, tipo: Number(e.target.value) as DocRef['tipo'] })} className={`${input} [&>option]:bg-[#0a1420]`}>
                    {([33, 34, 39, 41, 52, 56, 61] as const).map((x) => <option key={x} value={x}>{DOC_LABEL[x]} ({x})</option>)}
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-xs text-slate-500">Folio<input type="number" min={1} value={ref.folio || ''} onChange={(e) => setRef({ ...ref, folio: Number(e.target.value) })} className={input} /></label>
                  <label className="text-xs text-slate-500">Fecha<input type="date" value={ref.fecha} onChange={(e) => setRef({ ...ref, fecha: e.target.value })} className={input} /></label>
                </div>
              </div>
              <input value={ref.razon} onChange={(e) => setRef({ ...ref, razon: e.target.value })} placeholder="Motivo (sale en el documento). Ej: Anula factura por error en el servicio" className={input} />
              {tipo === 61 && ref.codRef === 1 && <p className="text-xs text-slate-500">Para anular, el detalle y los montos deben ser los mismos del documento original. Al elegirlo de la lista se copian solos.</p>}
            </section>
          )}

          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">{tipo === 0 ? 'Cliente' : 'Receptor'}</h3>
            {isBoleta(tipo) && <p className="text-xs text-slate-500">En boletas los datos del cliente son opcionales. Sin RUT, se emite a "consumidor final".</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tipo === 0 ? (
                <input value={client.rut} onChange={(e) => setC('rut', e.target.value)} placeholder="ID fiscal / Tax ID (opcional)" className={input} />
              ) : (
                <RutInput value={client.rut} onChange={(v) => setC('rut', v)} />
              )}
              <input value={client.company} onChange={(e) => setC('company', e.target.value)} placeholder={tipo === 0 ? 'Empresa o nombre' : 'Razón social'} className={input} />
              {!isBoleta(tipo) && tipo !== 0 && <input value={client.giro ?? ''} onChange={(e) => setC('giro', e.target.value)} placeholder="Giro" className={input} />}
              <input value={client.email} onChange={(e) => setC('email', e.target.value)} placeholder="Correo (opcional)" className={input} />
              <input value={client.address ?? ''} onChange={(e) => setC('address', e.target.value)} placeholder={tipo === 0 ? 'Dirección (opcional)' : 'Dirección'} className={input} />
              <input value={client.comuna ?? ''} onChange={(e) => setC('comuna', e.target.value)} placeholder={tipo === 0 ? 'Ciudad y país (opcional)' : 'Comuna'} className={input} />
            </div>
            {env === 'dev' && tipo !== 0 && (
              <button
                onClick={() => setClient({ name: '', company: 'HOSTY SPA', email: '', rut: '76.430.498-5', phone: '', giro: 'ACTIVIDADES DE CONSULTORIA DE INFORMATICA', address: 'ARTURO PRAT 527', comuna: 'Curicó' })}
                className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 cursor-pointer"
              >
                Usar la empresa de prueba de OpenFactura
              </button>
            )}
          </section>

          {tipo === 52 && (
            <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Traslado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-xs text-slate-500">
                  Tipo de traslado
                  <select value={despacho.indTraslado} onChange={(e) => setD('indTraslado', Number(e.target.value))} className={`${input} [&>option]:bg-[#0a1420]`}>
                    {TRASLADOS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </label>
                <label className="text-xs text-slate-500">Patente del vehículo<input value={despacho.patente} onChange={(e) => setD('patente', e.target.value.toUpperCase())} placeholder="ABCD12" className={input} /></label>
                <label className="text-xs text-slate-500">RUT del transportista<RutInput value={despacho.rutTransportista} onChange={(v) => setD('rutTransportista', v)} /></label>
                <label className="text-xs text-slate-500">RUT del chofer<RutInput value={despacho.rutChofer} onChange={(v) => setD('rutChofer', v)} /></label>
                <label className="text-xs text-slate-500">Nombre del chofer<input value={despacho.nombreChofer} onChange={(e) => setD('nombreChofer', e.target.value)} className={input} /></label>
                <label className="text-xs text-slate-500">Dirección de destino<input value={despacho.dirDestino} onChange={(e) => setD('dirDestino', e.target.value)} className={input} /></label>
                <label className="text-xs text-slate-500">Comuna de destino<input value={despacho.comunaDestino} onChange={(e) => setD('comunaDestino', e.target.value)} className={input} /></label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="text-xs text-slate-500">Salida<input type="date" value={despacho.fechaSalida} onChange={(e) => setD('fechaSalida', e.target.value)} className={input} /></label>
                  <label className="text-xs text-slate-500">Hora<input type="time" value={despacho.horaSalida} onChange={(e) => setD('horaSalida', e.target.value)} className={input} /></label>
                  <label className="text-xs text-slate-500">Llegada<input type="date" value={despacho.fechaLlegada} onChange={(e) => setD('fechaLlegada', e.target.value)} className={input} /></label>
                </div>
              </div>
              <p className="text-xs text-slate-500">Datos de transporte exigidos por la Res. Ex. SII 154/2025. OpenFactura los hace obligatorios desde el 23 de octubre.</p>
            </section>
          )}

          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Detalle</h3>
              <button onClick={() => setItems((its) => [...its, { name: 'Ítem', description: '', qty: 1, unitPrice: 0, unit: 'unidad' }])} className={`${btnGhost} ml-auto`}><Plus className="w-4 h-4" /> Ítem a medida</button>
            </div>
            {items.length === 0 && (
              <p className="text-sm text-slate-500">
                Agrega ítems desde el catálogo o uno a medida. {isBoleta(tipo) ? 'En boletas los precios van con IVA incluido.' : 'Los precios van netos (sin IVA).'}
              </p>
            )}
            {items.map((it, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 p-3 space-y-2">
                <div className="flex gap-2">
                  <input value={it.name} onChange={(e) => setItem(idx, { name: e.target.value })} className={`${input} font-bold`} />
                  <button onClick={() => setItems((its) => its.filter((_, i) => i !== idx))} className={`${btnGhost} px-3`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
                </div>
                <input value={it.description} onChange={(e) => setItem(idx, { description: e.target.value })} placeholder="Descripción (opcional)" className={input} />
                <div className="grid grid-cols-3 gap-2 items-center">
                  <label className="text-xs text-slate-500">Cantidad<input type="number" min={0} value={it.qty} onChange={(e) => setItem(idx, { qty: Number(e.target.value) })} className={input} /></label>
                  <label className="text-xs text-slate-500">
                    {isBoleta(tipo) ? 'Precio con IVA' : cur === 'USD' ? 'Precio (USD)' : 'Precio neto (CLP)'}
                    <input type="number" min={0} step={cur === 'USD' ? 1 : 100} value={it.unitPrice} onChange={(e) => setItem(idx, { unitPrice: Number(e.target.value) })} className={`${input} ${it.unitPrice <= 0 ? 'border-amber-300/60' : ''}`} />
                  </label>
                  <p className="text-right font-bold text-white">{fmt(it.qty * it.unitPrice, cur)}</p>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <label className="text-xs text-slate-500">Descuento %<input type="number" min={0} max={100} value={discountPct} onChange={(e) => setDiscountPct(Number(e.target.value))} className={`${input} w-28`} /></label>
              {FIXED_IVA[tipo] === undefined && (
                <label className="flex items-center gap-2 pt-4 text-sm text-slate-300">
                  <input type="checkbox" checked={ivaChoice} onChange={(e) => setIvaChoice(e.target.checked)} /> {tipo === 0 ? 'Sumar IVA' : 'Afecto a IVA'}
                </label>
              )}
              {tipo === 0 && (
                <label className="text-xs text-slate-500">
                  Moneda
                  <select value={currency} onChange={(e) => setCurrency(e.target.value as 'CLP' | 'USD')} className={`${input} w-28 [&>option]:bg-[#0a1420]`}>
                    <option value="CLP">CLP</option>
                    <option value="USD">USD</option>
                  </select>
                </label>
              )}
            </div>
            {tipo === 0 && <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas (opcional): condiciones, medio de pago, referencia del pedido…" className={input} />}
          </section>
        </div>

        <aside className="xl:col-span-4 space-y-6">
          <section className="rounded-xl border border-brand-500/40 bg-[#070b16] p-5 space-y-1 text-sm">
            <h3 className="pb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Totales</h3>
            <p className="flex justify-between text-slate-400"><span>Subtotal{isBoleta(tipo) ? ' (con IVA)' : ''}</span><span>{fmt(t.lines, cur)}</span></p>
            {discountPct > 0 && <p className="flex justify-between text-slate-400"><span>Descuento</span><span>-{fmt(t.discount, cur)}</span></p>}
            {!t.exempt && <p className="flex justify-between text-slate-400"><span>IVA{isBoleta(tipo) ? ' incluido' : ''}</span><span>{fmt(t.iva, cur)}</span></p>}
            {t.exempt && <p className="flex justify-between text-slate-400"><span>Exento de IVA</span><span>—</span></p>}
            <p className="flex justify-between pt-1 text-lg font-black text-white"><span>Total</span><span>{fmt(t.total, cur)}</span></p>
          </section>
          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-1.5">
            <h3 className="pb-2 text-sm font-bold uppercase tracking-wider text-slate-400">Catálogo</h3>
            {catalog.map((m) => (
              <button
                key={m.id}
                onClick={() =>
                  setItems((its) => [
                    ...its,
                    {
                      name: m.name,
                      description: m.description,
                      qty: 1,
                      // catalog prices are net CLP: boletas need them with IVA, USD needs a manual price
                      unitPrice: cur === 'USD' ? 0 : tipo === 39 ? Math.round(m.price * (1 + settings.ivaRate)) : m.price,
                      unit: m.unit,
                    },
                  ])
                }
                className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-white/5 cursor-pointer"
              >
                <span className="flex items-center gap-2"><Plus className="w-3.5 h-3.5 text-slate-500" />{m.name}</span>
                <span className={`shrink-0 text-xs ${m.price > 0 ? 'text-slate-400' : 'text-amber-200'}`}>{m.price > 0 ? clp(m.price) : 'sin precio'}</span>
              </button>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
};

const Billing = ({
  api,
  token,
  catalog,
  settings,
  onOpenQuote,
}: {
  api: Api;
  token: string;
  catalog: Module[];
  settings: Settings;
  onOpenQuote: (id: string) => void;
}) => {
  const [invoices, setInvoices] = useState<InvoiceRecord[] | null>(null);
  const [ready, setReady] = useState<Quote[]>([]);
  const [env, setEnv] = useState<'dev' | 'production' | null>(null);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<DocTipo | 'todos'>('todos');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    api<{ invoices: InvoiceRecord[] }>('invoices').then((d) => setInvoices(d.invoices)).catch((e) => setError(e.message));
    api<{ quotes: Quote[] }>('quotes').then((d) => setReady(d.quotes.filter((q) => q.status === 'aceptada' && !q.invoice))).catch(() => undefined);
  }, [api]);
  useEffect(() => {
    load();
    api<{ env: 'dev' | 'production' }>('invoice-config').then((d) => setEnv(d.env)).catch(() => undefined);
  }, [api, load]);

  const refresh = async (inv: InvoiceRecord) => {
    setBusy(inv.id);
    try {
      const { invoice } = await api<{ invoice: InvoiceRecord }>('invoice-status', { body: { id: inv.id } });
      setInvoices((list) => list?.map((x) => (x.id === invoice.id ? invoice : x)) ?? null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  if (creating)
    return (
      <InvoiceEditor
        api={api}
        catalog={catalog}
        settings={settings}
        env={env}
        token={token}
        issued={invoices ?? []}
        onDone={() => {
          setCreating(false);
          load();
        }}
      />
    );
  if (!invoices && !error) return <Loader2 className="w-5 h-5 animate-spin text-slate-400" />;
  const types = Array.from(new Set<DocTipo>((invoices ?? []).map((i) => i.tipo)));
  const list = (invoices ?? []).filter((i) => filter === 'todos' || i.tipo === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Receipt className="w-5 h-5 text-emerald-300" />
        <h2 className="text-lg font-black text-white">Facturación electrónica</h2>
        {env === 'dev' && <Badge className="bg-amber-300/15 text-amber-200 border-amber-300/30">ambiente de prueba · sin validez tributaria</Badge>}
        {env === 'production' && <Badge className="bg-red-400/10 text-red-300 border-red-400/30">producción · SII</Badge>}
        <button onClick={() => setCreating(true)} className={`${btnPrimary} ml-auto`}><Plus className="w-4 h-4" /> Nuevo documento</button>
      </div>
      <p className="text-sm text-slate-400">
        Facturas, boletas, notas de crédito y débito, guías de despacho y comprobantes de venta (no tributarios, en CLP o USD). Se crean desde cero con{' '}
        <b className="text-slate-200">Nuevo documento</b> o desde una cotización aceptada. Todos quedan listados aquí.
      </p>
      {error && <p className="text-sm text-red-300">{error}</p>}

      {ready.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Cotizaciones aceptadas, listas para facturar</h3>
          {ready.map((q) => (
            <button key={q.id} onClick={() => onOpenQuote(q.id!)} className="w-full flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left hover:border-brand-500/50 cursor-pointer">
              <span className="font-bold text-white">{q.number}</span>
              <span className="text-slate-300">{q.client.company || q.client.name}</span>
              <span className="ml-auto text-sm text-cyan-300">Abrir y facturar →</span>
            </button>
          ))}
        </section>
      )}

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="mr-2 text-sm font-bold uppercase tracking-wider text-slate-400">Documentos emitidos</h3>
          {types.length > 1 &&
            (['todos', ...types] as (DocTipo | 'todos')[]).map((f) => (
              <button key={String(f)} onClick={() => setFilter(f)} className={`${btn} py-1 text-xs ${filter === f ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'}`}>
                {f === 'todos' ? 'Todos' : DOC_LABEL[f]}
              </button>
            ))}
        </div>
        {!list.length ? (
          <p className="text-slate-400">Aún no hay documentos{env === 'dev' ? ' de prueba' : ''}.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[820px] text-sm">
              <tbody>
                {list.map((inv) => (
                  <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                    <td className="p-3 font-bold text-white">
                      {DOC_LABEL[inv.tipo]} {docNumber(inv)}
                      {inv.env === 'dev' && <span className="block text-xs font-normal text-amber-200">prueba</span>}
                      {inv.env === 'interno' && <span className="block text-xs font-normal text-slate-400">no tributario</span>}
                      {inv.ref && <span className="block text-xs font-normal text-cyan-300">sobre {DOC_LABEL[inv.ref.tipo].toLowerCase()} N° {inv.ref.folio}</span>}
                    </td>
                    <td className="p-3 text-slate-300">
                      {inv.client.company || inv.client.name || 'Consumidor final'}
                      <span className="block text-xs text-slate-500">{inv.client.rut}</span>
                    </td>
                    <td className="p-3 text-xs">
                      {inv.quoteId ? (
                        <button onClick={() => onOpenQuote(inv.quoteId!)} className="font-semibold text-cyan-300 hover:text-cyan-200 cursor-pointer">{inv.quoteNumber ?? 'cotización'} →</button>
                      ) : (
                        <span className="text-slate-500">directo</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-400">{inv.fecha}</td>
                    <td className="p-3 text-slate-400">{inv.env === 'interno' ? '—' : inv.status ?? '—'}</td>
                    <td className="p-3 text-right font-bold text-white">{fmt(inv.total, inv.currency ?? 'CLP')}</td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <button onClick={() => downloadInvoicePdf(token, inv).catch((e) => setError(e.message))} className={`${btn} text-slate-400 hover:text-white px-2`} title="PDF" aria-label="PDF"><Download className="w-4 h-4" /></button>
                      {inv.env !== 'interno' && (
                        <button onClick={() => refresh(inv)} disabled={busy === inv.id} className={`${btn} text-slate-400 hover:text-white px-2`} title="Consultar estado SII" aria-label="Consultar estado SII">
                          {busy === inv.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------- audit pro (free, internal)
interface InternalAudit {
  id: string;
  key: string;
  status: 'pending' | 'paid' | 'generating' | 'ready' | 'failed';
  createdAt: string;
  site: string;
  name: string;
  company: string;
  email: string;
  sendToClient: boolean;
  reason?: string;
  lang: 'es' | 'en';
  error?: string;
  attempts: number;
}

/** Prefill for a free AUDIT 693 PRO (e.g. from a lead). */
interface AuditPrefill {
  url?: string;
  fullName?: string;
  email?: string;
  company?: string;
}

/** Calls api/pro.ts admin actions with the same session token. */
const proCall = async <T,>(token: string, action: string, body?: unknown): Promise<T> => {
  const res = await fetch(`/api/pro?action=${action}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) throw new AuthError(data?.error || 'Sesión vencida.');
  if (!res.ok) throw new Error(data?.error || 'Error inesperado.');
  return data as T;
};

const AUDIT_STATUS: Record<InternalAudit['status'], { label: string; cls: string }> = {
  pending: { label: 'pendiente', cls: QUOTE_COLORS.borrador },
  paid: { label: 'en cola', cls: QUOTE_COLORS.borrador },
  generating: { label: 'generando…', cls: QUOTE_COLORS.enviada },
  ready: { label: 'listo', cls: QUOTE_COLORS.aceptada },
  failed: { label: 'falló', cls: QUOTE_COLORS.rechazada },
};

const AuditPro = ({ token, prefill, onLogout }: { token: string; prefill: AuditPrefill | null; onLogout: () => void }) => {
  const empty = { url: '', fullName: '', email: '', company: '', location: '', teamSize: '', manualHours: '', hourlyCost: '', mainPain: '', tools: '', competitors: '', reason: '' };
  const [form, setForm] = useState({ ...empty, ...(prefill ?? {}) });
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [sendToClient, setSendToClient] = useState(true);
  const [list, setList] = useState<InternalAudit[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const guard = useCallback(
    async <T,>(fn: () => Promise<T>) => {
      try {
        return await fn();
      } catch (e) {
        if (e instanceof AuthError) onLogout();
        throw e;
      }
    },
    [onLogout],
  );
  const load = useCallback(() => {
    guard(() => proCall<{ orders: InternalAudit[] }>(token, 'admin-list'))
      .then((d) => setList(d.orders))
      .catch((e) => setMsg({ ok: false, text: e.message }));
  }, [token, guard]);
  useEffect(load, [load]);

  // refresh while a report is being generated (2 to 4 minutes)
  const working = list?.some((o) => o.status === 'paid' || o.status === 'generating');
  useEffect(() => {
    if (!working) return;
    const id = window.setInterval(load, 8000);
    return () => window.clearInterval(id);
  }, [working, load]);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const missing = [
    !form.url && 'sitio web',
    !form.fullName && 'nombre',
    !form.location && 'dónde vende',
    sendToClient && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && 'correo válido (o desmarca el envío)',
  ].filter(Boolean) as string[];

  const submit = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await guard(() => proCall(token, 'admin-create', { ...form, lang, sendToClient }));
      setMsg({ ok: true, text: `Generando el informe de ${form.url}. Toma entre 2 y 4 minutos${sendToClient ? `; llegará a ${form.email}` : ''}. Te llega una copia.` });
      setForm(empty);
      load();
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  const retry = async (o: InternalAudit) => {
    await guard(() => proCall(token, 'admin-retry', { id: o.id })).catch((e) => setMsg({ ok: false, text: e.message }));
    load();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-lg font-black text-white">AUDIT 693 PRO sin costo</h2>
        <p className="text-sm text-slate-400">
          Mismo informe que la versión pagada: análisis del sitio, competencia, costo del trabajo manual y oportunidades, en PDF. Úsalo para regalarlo a un prospecto o incluirlo dentro de un servicio. Cada informe usa la API de IA, así que tiene un costo de uso para ti.
        </p>
      </div>

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={form.url} onChange={set('url')} placeholder="Sitio web del cliente *" className={input} inputMode="url" />
          <input value={form.company} onChange={set('company')} placeholder="Empresa" className={input} />
          <input value={form.fullName} onChange={set('fullName')} placeholder="Nombre del contacto *" className={input} />
          <input value={form.email} onChange={set('email')} placeholder={sendToClient ? 'Correo del cliente *' : 'Correo del cliente (opcional)'} className={input} />
          <input value={form.location} onChange={set('location')} placeholder="Dónde vende: ciudad y país *" className={input} />
          <select value={form.teamSize} onChange={set('teamSize')} className={`${input} [&>option]:bg-[#0a1420]`}>
            <option value="">Tamaño del equipo</option>
            {['1-5 personas', '6-20 personas', '21-50 personas', '51-200 personas', 'Más de 200'].map((o) => <option key={o}>{o}</option>)}
          </select>
          <input type="number" min={0} value={form.manualHours} onChange={set('manualHours')} placeholder="Horas/semana en tareas manuales" className={input} />
          <input type="number" min={0} value={form.hourlyCost} onChange={set('hourlyCost')} placeholder="Costo de una hora de trabajo (CLP)" className={input} />
        </div>
        <textarea rows={2} value={form.mainPain} onChange={set('mainPain')} placeholder="Problema principal que le quita tiempo o ventas" className={input} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={form.tools} onChange={set('tools')} placeholder="Herramientas que usa hoy" className={input} />
          <input value={form.competitors} onChange={set('competitors')} placeholder="Competidores conocidos (opcional)" className={input} />
          <input value={form.reason} onChange={set('reason')} placeholder="Motivo interno (ej. incluido en proyecto X, regalo a prospecto)" className={`${input} sm:col-span-2`} />
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={sendToClient} onChange={(e) => setSendToClient(e.target.checked)} /> Enviar el informe al cliente por correo
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            Idioma
            <select value={lang} onChange={(e) => setLang(e.target.value as 'es' | 'en')} className={selectSm}>
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </label>
          <button onClick={submit} disabled={busy || missing.length > 0} className={`${btnPrimary} ml-auto`}>
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generar informe
          </button>
        </div>
        {missing.length > 0 && <p className="text-xs text-amber-200">Falta: {missing.join(', ')}.</p>}
        {msg && <p className={`text-sm ${msg.ok ? 'text-emerald-300' : 'text-red-300'}`}>{msg.text}</p>}
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Informes emitidos sin costo</h3>
        {!list ? (
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        ) : list.length === 0 ? (
          <p className="text-slate-400">Aún no has emitido informes.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[720px] text-sm">
              <tbody>
                {list.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                    <td className="p-3">
                      <span className="font-bold text-white">{o.company || o.name}</span>
                      <span className="block text-xs text-slate-500 break-all">{o.site}</span>
                    </td>
                    <td className="p-3 text-xs text-slate-400">
                      {o.sendToClient ? `Enviado a ${o.email}` : 'Solo para ti'}
                      {o.reason && <span className="block text-slate-500">{o.reason}</span>}
                    </td>
                    <td className="p-3">
                      <Badge className={AUDIT_STATUS[o.status].cls}>{AUDIT_STATUS[o.status].label}</Badge>
                      {o.status === 'failed' && o.error && <span className="block pt-1 text-xs text-red-300">{o.error}</span>}
                    </td>
                    <td className="p-3 text-xs text-slate-500">{when(o.createdAt)}</td>
                    <td className="p-3 text-right whitespace-nowrap">
                      {o.status === 'ready' && (
                        <a href={`/api/pro?action=pdf&order=${o.id}&k=${encodeURIComponent(o.key)}`} className={`${btn} text-cyan-300 hover:text-cyan-200`}>
                          <Download className="w-4 h-4" /> PDF
                        </a>
                      )}
                      {o.status === 'failed' && (
                        <button onClick={() => retry(o)} className={`${btn} text-slate-300 hover:text-white`}><RefreshCw className="w-4 h-4" /> Reintentar</button>
                      )}
                      {(o.status === 'paid' || o.status === 'generating') && <Loader2 className="inline w-4 h-4 animate-spin text-slate-400" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

// ---------------------------------------------------------------- EBS 693
type EbsApproach = 'A medida' | 'Herramienta existente' | 'Combinación';
type Level3 = 'Alto' | 'Medio' | 'Bajo';
interface EbsProcess {
  id: string;
  name: string;
  area: string;
  hoursWeek: number;
  people: number;
  hourlyCost: number;
  tools: string;
  pain: string;
}
interface EbsOpportunity {
  id: string;
  title: string;
  description: string;
  approach: EbsApproach;
  hoursWeek: number;
  hourlyCost: number;
  automationPct: number;
  /** % of the target leak (leakKey) this opportunity recovers; legacy sessions: % of the sales leak. */
  salesRecoveryPct: number;
  leakKey?: string;
  investment: number;
  monthlyCost: number;
  impact: Level3;
  effort: Level3;
  stage: 1 | 2 | 3;
  assumptions: string;
  selected: boolean;
  investmentSource?: string;
  /** Steps of the process today and with the solution ("Antes y después" in the interactive EBS). */
  flowBefore?: string[];
  flowAfter?: string[];
  /** Estimated weeks until it is live (feeds the timeline of the interactive EBS). */
  weeks?: number;
}
interface EbsSiteAudit {
  url: string;
  summary: string;
  findings: string[];
  signals: string;
  colors: { primary: string | null; secondary: string | null; source: string };
  logo?: { data: string; mime: string; src: string };
  at: string;
}
interface EbsShare {
  token: string;
  publishedAt?: string;
  expiresAt: string;
  views: number;
  viewedAt?: string;
  lastViewedAt?: string;
  choice?: { ids: string[]; message: string; name: string; at: string; adj?: Record<string, { rec?: number; auto?: number }> };
  quoteId?: string;
  quoteNumber?: string;
}
type EbsMetric = { v: number; c: Confidence; label: string; unit: string };
interface EbsSession {
  id?: string;
  number?: string;
  status?: 'en curso' | 'entregado';
  createdAt?: string;
  updatedAt?: string;
  deliveredAt?: string;
  sessionDate: string;
  leadId?: string;
  quoteId?: string;
  loomUrl: string;
  client: { name: string; company: string; email: string; phone: string; url: string; industry: string; teamSize: string };
  context: { goals: string; budget: string; constraints: string; tools: string; notes: string };
  sales: { lostClientsMonth: number; avgTicket: number };
  leaks: { title: string; detail: string }[];
  processes: EbsProcess[];
  opportunities: EbsOpportunity[];
  summary: string;
  approach: string;
  nextSteps: string[];
  pendingQuestions: string[];
  playbook?: string;
  playbookName?: string;
  playbookFocus?: string;
  metrics?: Record<string, EbsMetric>;
  /** Answers written during the live session, keyed by the question text. */
  answers?: Record<string, string>;
  computedLeaks?: ComputedLeak[];
  toMeasure?: string[];
}

const uid = () => Math.random().toString(36).slice(2, 10);

const emptyEbs = (lead?: Lead): EbsSession => ({
  sessionDate: todayCL(),
  leadId: lead?.id,
  loomUrl: '',
  client: { name: lead?.name ?? '', company: lead?.company ?? '', email: lead?.email ?? '', phone: lead?.phone ?? '', url: lead?.url ?? '', industry: '', teamSize: '' },
  context: { goals: '', budget: lead?.budget ?? '', constraints: '', tools: '', notes: lead?.notes ? `Solicitud original:\n${lead.notes}\n\n` : '' },
  sales: { lostClientsMonth: 0, avgTicket: 0 },
  leaks: [],
  processes: [],
  opportunities: [],
  summary: '',
  approach: '',
  nextSteps: [],
  pendingQuestions: [],
  playbook: 'general',
  metrics: {},
  answers: {},
  computedLeaks: [],
  toMeasure: [],
});

/** Monthly amount of the leak an opportunity targets (legacy sessions: the sales leak). */
const targetLeak = (e: Pick<EbsSession, 'sales' | 'computedLeaks'>, key?: string) =>
  key ? (e.computedLeaks ?? []).find((l) => l.key === key && l.kind === 'perdida')?.monthly ?? 0 : e.sales.lostClientsMonth * e.sales.avgTicket;

/** Same math as api/admin.ts `oppCalc` / `ebsTotals`. */
const oppCalc = (o: EbsOpportunity, e: Pick<EbsSession, 'sales' | 'computedLeaks'>) => {
  const hoursSavedMonth = (o.hoursWeek * 4.33 * o.automationPct) / 100;
  const savingMonth = Math.round(hoursSavedMonth * o.hourlyCost + (targetLeak(e, o.leakKey) * o.salesRecoveryPct) / 100);
  const netMonth = savingMonth - o.monthlyCost;
  return {
    hoursSavedMonth,
    savingMonth,
    netMonth,
    paybackMonths: o.investment > 0 && netMonth > 0 ? o.investment / netMonth : null,
    roi12: o.investment > 0 && savingMonth > 0 ? (netMonth * 12 - o.investment) / o.investment : null,
  };
};
const ebsTotals = (e: EbsSession) => {
  const leak = e.sales.lostClientsMonth * e.sales.avgTicket;
  const computed = e.computedLeaks ?? [];
  const lossComputed = computed.filter((l) => l.kind === 'perdida').reduce((a, l) => a + l.monthly, 0);
  const cashTrapped = computed.filter((l) => l.kind === 'caja').reduce((a, l) => a + l.monthly, 0);
  const sel = e.opportunities.filter((o) => o.selected);
  const investment = sel.reduce((a, o) => a + o.investment, 0);
  const savingMonth = sel.reduce((a, o) => a + oppCalc(o, e).savingMonth, 0);
  const monthlyCost = sel.reduce((a, o) => a + o.monthlyCost, 0);
  const netMonth = savingMonth - monthlyCost;
  const manualCostMonth = e.processes.reduce((a, p) => a + p.hoursWeek * 4.33 * p.hourlyCost, 0);
  return {
    leak,
    manualCostMonth,
    cashTrapped,
    leakMonth: lossComputed > 0 ? lossComputed : manualCostMonth + leak,
    investment,
    savingMonth,
    monthlyCost,
    netMonth,
    paybackMonths: investment > 0 && netMonth > 0 ? investment / netMonth : null,
    roi12: investment > 0 && savingMonth > 0 ? (netMonth * 12 - investment) / investment : null,
  };
};
const months = (m: number | null) => (m === null ? '—' : m < 1 ? '< 1 mes' : `${m.toFixed(1).replace('.', ',')} meses`);
const pct = (r: number | null) => (r === null ? '—' : `${Math.round(r * 100)}%`);

const CONF_STYLE: Record<Confidence, string> = {
  real: 'text-emerald-300 border-emerald-400/40',
  estimado: 'text-cyan-200 border-cyan-300/40',
  supuesto: 'text-amber-200 border-amber-300/40',
};
const UNIT_HINT: Record<Metric['unit'], string> = { n: 'cantidad', clp: 'CLP', pct: '%', h: 'horas', dias: 'días' };

const NumIn = ({ value, onChange, placeholder, step, className = '' }: { value: number; onChange: (n: number) => void; placeholder?: string; step?: number; className?: string }) => (
  <input type="number" min={0} step={step ?? 1} value={value || ''} onChange={(e) => onChange(Number(e.target.value))} placeholder={placeholder} className={`${input} ${className}`} />
);

const EbsEditor = ({ api, token, initial, onBack, onOpenQuote }: { api: Api; token: string; initial: EbsSession; onBack: () => void; onOpenQuote: (id: string) => void }) => {
  const [e, setE] = useState<EbsSession>(initial);
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>(initial.id ? 'saved' : 'idle');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [newProc, setNewProc] = useState({ name: '', hoursWeek: 0, hourlyCost: 0, pain: '' });
  const procRow = useRef<HTMLDivElement>(null);
  const [openProc, setOpenProc] = useState<string | null>(null);
  const [sendOpen, setSendOpen] = useState(false);
  const [sendTo, setSendTo] = useState(initial.client.email);
  const [sendMsg, setSendMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState<EbsShare | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [audit, setAudit] = useState<EbsSiteAudit | null>(null);
  const [auditDirty, setAuditDirty] = useState(false);
  const pb = playbookById(e.playbook);
  const computedLeaks = useMemo(() => computeLeaks(pb, e.metrics ?? {}), [pb, e.metrics]);
  const latest = useRef(e);
  // the leaks are recomputed here and travel with every save, so the server and the PDF don't need the formulas
  latest.current = { ...e, computedLeaks, playbookName: pb.name, playbookFocus: pb.focus };

  const patch = (fn: (cur: EbsSession) => EbsSession) => {
    setE((cur) => fn(cur));
    setDirty(true);
  };
  const setClient = (k: keyof EbsSession['client'], v: string) => patch((c) => ({ ...c, client: { ...c.client, [k]: v } }));
  const setCtx = (k: keyof EbsSession['context'], v: string) => patch((c) => ({ ...c, context: { ...c.context, [k]: v } }));
  const setProc = (id: string, p: Partial<EbsProcess>) => patch((c) => ({ ...c, processes: c.processes.map((x) => (x.id === id ? { ...x, ...p } : x)) }));
  const setOpp = (id: string, p: Partial<EbsOpportunity>) => patch((c) => ({ ...c, opportunities: c.opportunities.map((x) => (x.id === id ? { ...x, ...p } : x)) }));
  const setMetric = (m: Metric, p: Partial<EbsMetric>) =>
    patch((c) => {
      const cur = c.metrics?.[m.key] ?? { v: 0, c: m.assumption ? 'supuesto' : 'estimado', label: m.label, unit: m.unit };
      return { ...c, metrics: { ...c.metrics, [m.key]: { ...cur, ...p, label: m.label, unit: m.unit } } };
    });
  const sugg = suggestionsFor(pb.id);
  // an example only fills the name (and the pain, for the PDF); hours and cost stay open for the consultant
  const pickSuggestedProc = (sp: { name: string; pain: string }) => {
    setNewProc((n) => ({ ...n, name: sp.name, hoursWeek: 0, pain: sp.pain }));
    window.setTimeout(() => procRow.current?.querySelectorAll('input')[1]?.focus(), 0);
  };
  const setAnswer = (q: string, a: string) => patch((c) => ({ ...c, answers: { ...c.answers, [q]: a } }));
  const metricDef = (k: string) => pb.metrics.find((m) => m.key === k);
  const copyDocs = async () => {
    await navigator.clipboard.writeText(documentsEmail(pb, e.client.name, e.client.company, 'Uni-Verso693 · universo693.com'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const save = useCallback(async () => {
    setSaveState('saving');
    try {
      const { session } = await api<{ session: EbsSession }>('ebs-save', { body: latest.current });
      // keep what was typed while saving; only adopt the server ids and number
      setE((cur) => ({ ...cur, id: session.id, number: session.number, status: session.status, createdAt: session.createdAt }));
      setDirty(false);
      setSaveState('saved');
      setSavedAt(new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      return session;
    } catch (err) {
      setSaveState('error');
      setMsg({ ok: false, text: (err as Error).message });
      return null;
    }
  }, [api]);

  // autosave 2 seconds after the last keystroke
  useEffect(() => {
    if (!dirty) return;
    const t = window.setTimeout(save, 2000);
    return () => window.clearTimeout(t);
  }, [dirty, e, save]);

  // warn before closing the tab with unsaved changes
  useEffect(() => {
    const h = (ev: BeforeUnloadEvent) => {
      if (dirty) ev.preventDefault();
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const ensureSaved = async () => (dirty || !e.id ? await save() : e);

  const addProc = () => {
    if (!newProc.name.trim()) return;
    patch((c) => ({ ...c, processes: [...c.processes, { id: uid(), name: newProc.name.trim(), area: '', hoursWeek: newProc.hoursWeek, people: 0, hourlyCost: newProc.hourlyCost, tools: '', pain: newProc.pain }] }));
    setNewProc({ name: '', hoursWeek: 0, hourlyCost: newProc.hourlyCost, pain: '' });
  };

  const generate = async () => {
    if (e.opportunities.length && !window.confirm('Esto reemplaza las oportunidades, el resumen, el enfoque y los próximos pasos actuales por una nueva propuesta. Las notas, procesos y fugas se mantienen. ¿Continuar?')) return;
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('draft');
    setMsg(null);
    try {
      const { session } = await api<{ session: EbsSession }>('ebs-draft', { body: { id: saved.id } });
      setE(session);
      setDirty(false);
      setMsg({ ok: true, text: 'Propuesta generada. Revísala y ajusta los números antes de enviar.' });
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const generateFlows = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('flows');
    setMsg(null);
    try {
      const d = await api<{ flows: Record<string, { before: string[]; after: string[] }> }>('ebs-flows', { body: { id: saved.id } });
      const n = Object.keys(d.flows).length;
      patch((c) => ({ ...c, opportunities: c.opportunities.map((o) => (d.flows[o.id] ? { ...o, flowBefore: d.flows[o.id].before, flowAfter: d.flows[o.id].after } : o)) }));
      setMsg({ ok: true, text: n ? `Flujos "antes y después" generados para ${n} oportunidades. Revísalos y, si ya compartiste el link, publica los cambios.` : 'Todas las oportunidades seleccionadas ya tienen su flujo.' });
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const downloadPdf = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('pdf');
    try {
      const res = await fetch(`/api/admin?action=ebs-pdf&id=${encodeURIComponent(saved.id)}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('No se pudo generar el PDF.');
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement('a');
      a.href = url;
      a.download = `${saved.number ?? 'EBS'}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const send = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('send');
    try {
      const { session } = await api<{ session: EbsSession }>('ebs-send', { body: { id: saved.id, to: sendTo, message: sendMsg } });
      setE((cur) => ({ ...cur, status: session.status, deliveredAt: session.deliveredAt }));
      setSendOpen(false);
      setMsg({ ok: true, text: `Enviado a ${sendTo}. Te llegó una copia oculta.` });
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const toQuote = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('quote');
    try {
      const { quote } = await api<{ quote: { id: string; number: string } }>('ebs-to-quote', { body: { id: saved.id } });
      setE((cur) => ({ ...cur, quoteId: quote.id }));
      setMsg({ ok: true, text: `Cotización ${quote.number} creada en borrador.` });
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };

  const loadShare = useCallback(async () => {
    if (!e.id) return;
    try {
      const d = await api<{ share: EbsShare | null; url: string | null }>('ebs-share-status', { body: { id: e.id } });
      setShare(d.share);
      setShareUrl(d.url ?? '');
    } catch {
      /* the panel just stays empty */
    }
  }, [api, e.id]);
  useEffect(() => {
    loadShare();
  }, [loadShare]);

  useEffect(() => {
    if (!e.id) return;
    api<{ audit: EbsSiteAudit | null }>('ebs-audit-get', { body: { id: e.id } })
      .then((d) => setAudit(d.audit))
      .catch(() => undefined);
  }, [api, e.id]);

  const runAudit = async () => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('audit');
    setMsg(null);
    try {
      const d = await api<{ audit: EbsSiteAudit }>('ebs-audit', { body: { id: saved.id } });
      setAudit(d.audit);
      setAuditDirty(false);
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };
  const saveAudit = async () => {
    if (!audit || !e.id) return;
    setBusy('audit');
    try {
      const d = await api<{ audit: EbsSiteAudit }>('ebs-audit-save', {
        body: { id: e.id, summary: audit.summary, findings: audit.findings, primary: audit.colors.primary, secondary: audit.colors.secondary },
      });
      setAudit(d.audit);
      setAuditDirty(false);
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };
  const [logoUrl, setLogoUrl] = useState('');
  const changeLogo = async (extra: { logoUrl?: string; removeLogo?: boolean }) => {
    if (!audit || !e.id) return;
    setBusy('audit');
    setMsg(null);
    try {
      const d = await api<{ audit: EbsSiteAudit }>('ebs-audit-save', {
        body: { id: e.id, summary: audit.summary, findings: audit.findings, primary: audit.colors.primary, secondary: audit.colors.secondary, ...extra },
      });
      setAudit(d.audit);
      setLogoUrl('');
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };
  const patchAudit = (fn: (a: EbsSiteAudit) => EbsSiteAudit) => {
    setAudit((a) => (a ? fn(a) : a));
    setAuditDirty(true);
  };

  const shareAction = async (extra: Record<string, unknown> = {}) => {
    const saved = await ensureSaved();
    if (!saved?.id) return;
    setBusy('share');
    setMsg(null);
    try {
      const d = await api<{ share: EbsShare | null; url?: string }>('ebs-share', { body: { id: saved.id, ...extra } });
      setShare(d.share);
      setShareUrl(d.url ?? '');
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  };
  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  const applyChoice = () => {
    const ids = share?.choice?.ids ?? [];
    patch((c) => ({ ...c, opportunities: c.opportunities.map((o) => ({ ...o, selected: ids.includes(o.id) })) }));
  };

  const t = ebsTotals(latest.current);
  const sel = e.opportunities.filter((o) => o.selected);
  // metrics no question asks for: assumptions the consultant sets (e.g. value of a return load)
  const unasked = pb.metrics.filter((m) => !pb.blocks.some((b) => b.questions.some((q) => q.metrics?.includes(m.key))));
  const metricRow = (m: Metric) => {
    const val = e.metrics?.[m.key];
    const conf: Confidence = val?.c ?? (m.assumption ? 'supuesto' : 'estimado');
    return (
      <div key={m.key} className="grid grid-cols-12 items-center gap-2">
        <span className="col-span-12 text-xs text-slate-400 sm:col-span-5">{m.label} <span className="text-slate-600">({UNIT_HINT[m.unit]})</span></span>
        <NumIn value={val?.v ?? 0} step={m.unit === 'clp' ? 1000 : 1} onChange={(n) => setMetric(m, { v: m.unit === 'pct' ? Math.min(100, n) : n, c: conf })} className="col-span-7 sm:col-span-4" />
        <select value={conf} onChange={(ev) => setMetric(m, { c: ev.target.value as Confidence, v: val?.v ?? 0 })} className={`${input} col-span-5 sm:col-span-3 text-xs [&>option]:bg-[#0a1420] ${CONF_STYLE[conf]}`}>
          <option value="real">real (documento)</option>
          <option value="estimado">estimado (lo dice)</option>
          <option value="supuesto">supuesto (nuestro)</option>
        </select>
      </div>
    );
  };
  const section ='rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4';
  const h = 'text-sm font-bold uppercase tracking-wider text-slate-400';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={onBack} className={`${btn} text-slate-400 hover:text-white px-0`}><ArrowLeft className="w-4 h-4" /> EBS 693</button>
        <h2 className="text-xl font-black text-white">{e.number ?? 'Nuevo EBS'}</h2>
        <Badge className={e.status === 'entregado' ? QUOTE_COLORS.aceptada : QUOTE_COLORS.enviada}>{e.status ?? 'en curso'}</Badge>
        <span className={`text-xs ${saveState === 'error' ? 'text-red-300' : 'text-slate-500'}`}>
          {saveState === 'saving' ? 'Guardando…' : saveState === 'error' ? 'Error al guardar' : dirty ? 'Cambios sin guardar' : savedAt ? `Guardado ${savedAt}` : e.id ? 'Guardado' : ''}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <button onClick={() => save()} disabled={!!busy} className={btnGhost}><Save className="w-4 h-4" /> Guardar</button>
          <button onClick={() => setShareOpen(!shareOpen)} disabled={!!busy || !sel.length} className={btnGhost}><Link2 className="w-4 h-4" /> Link interactivo{share?.choice ? ' •' : ''}</button>
          <button onClick={downloadPdf} disabled={!!busy || !sel.length} className={btnGhost}>{busy === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} PDF</button>
          {e.quoteId ? (
            <button onClick={() => onOpenQuote(e.quoteId!)} className={btnGhost}><FileText className="w-4 h-4" /> Ver cotización</button>
          ) : (
            <button onClick={toQuote} disabled={!!busy || !sel.length} className={btnGhost}>{busy === 'quote' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} Crear cotización</button>
          )}
          <button onClick={() => setSendOpen(true)} disabled={!!busy || !sel.length} className={btnPrimary}><Send className="w-4 h-4" /> Enviar al cliente</button>
        </div>
      </div>
      {msg && <p className={`text-sm ${msg.ok ? 'text-emerald-300' : 'text-red-300'}`}>{msg.text}</p>}

      {(shareOpen || share?.choice) && (
        <div className="rounded-xl border border-cyan-300/30 bg-cyan-300/5 p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-bold text-white">Versión interactiva para el cliente</p>
            {share?.publishedAt && <span className="text-xs text-cyan-200">Versión publicada {when(share.publishedAt)}</span>}
            {share && <span className="text-xs text-slate-400">Vence {when(share.expiresAt)} · {share.views} {share.views === 1 ? 'visita' : 'visitas'}{share.lastViewedAt ? ` · última ${when(share.lastViewedAt)}` : ''}</span>}
            <button onClick={loadShare} className={`${btn} ml-auto text-slate-400 hover:text-white px-2`}><RefreshCw className="w-4 h-4" /> Actualizar</button>
          </div>
          {!share ? (
            <>
              <p className="text-sm text-slate-400">Crea un enlace privado (30 días) con el diagrama donde el cliente activa cada oportunidad y ve cambiar el ahorro y el retorno. Muestra solo las oportunidades marcadas. El cliente ve la versión que publicas: si después cambias algo, usa "Publicar cambios". Recomiéndale abrirlo en un computador.</p>
              <button onClick={() => shareAction()} disabled={!!busy} className={btnPrimary}>{busy === 'share' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />} Crear enlace</button>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                <input readOnly value={shareUrl} onFocus={(ev) => ev.currentTarget.select()} className={`${input} flex-1 min-w-[260px] font-mono text-xs`} />
                <button onClick={copyLink} className={btnGhost}><Copy className="w-4 h-4" /> {linkCopied ? 'Copiado' : 'Copiar'}</button>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}><FileText className="w-4 h-4" /> Verlo como cliente</a>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button onClick={() => shareAction({ refresh: true })} disabled={!!busy} className={`${btn} text-cyan-200 hover:text-white px-2`}>Publicar cambios (el cliente ve la versión nueva)</button>
                <button onClick={() => shareAction()} disabled={!!busy} className={`${btn} text-slate-400 hover:text-white px-2`}>Renovar 30 días</button>
                <button onClick={() => window.confirm('El enlace actual dejará de funcionar. ¿Revocar?') && shareAction({ revoke: true })} disabled={!!busy} className={`${btn} text-slate-400 hover:text-red-300 px-2`}>Revocar enlace</button>
                <span className="px-2 py-2 text-slate-500">El correo con "Enviar al cliente" incluye este enlace automáticamente.</span>
              </div>
            </>
          )}
          {share?.choice && (
            <div className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-4 space-y-2">
              <p className="font-bold text-emerald-200">{share.choice.name || 'El cliente'} quiere avanzar ({when(share.choice.at)})</p>
              <ul className="list-disc pl-5 text-sm text-slate-200">{e.opportunities.filter((o) => share.choice!.ids.includes(o.id)).map((o) => <li key={o.id}>{o.title}</li>)}</ul>
              {share.choice.message && <p className="text-sm text-slate-300">“{share.choice.message}”</p>}
              <div className="flex flex-wrap gap-2">
                {share.quoteId && <button onClick={() => onOpenQuote(share.quoteId!)} className={btnGhost}><FileText className="w-4 h-4" /> Ver cotización {share.quoteNumber} (borrador)</button>}
                <button onClick={applyChoice} className={btnGhost}><Check className="w-4 h-4" /> Dejar marcadas solo estas en el EBS</button>
              </div>
            </div>
          )}
        </div>
      )}

      {sendOpen && (
        <div className="rounded-xl border border-brand-500/40 bg-brand-600/10 p-5 space-y-3">
          <p className="font-bold text-white">Enviar la hoja de ruta con el PDF adjunto{e.loomUrl ? ' y el botón al video' : ''}</p>
          {!e.loomUrl && <p className="text-sm text-amber-200">Aún no agregas el link del Loom (sección Entrega). Puedes enviarlo igual.</p>}
          <input value={sendTo} onChange={(ev) => setSendTo(ev.target.value)} placeholder="correo@cliente.cl" className={input} />
          <textarea rows={4} value={sendMsg} onChange={(ev) => setSendMsg(ev.target.value)} placeholder={`Mensaje (opcional). Si lo dejas vacío: "Hola ${e.client.name || '…'}, te comparto la hoja de ruta del diagnóstico EBS 693…"`} className={input} />
          <div className="flex gap-2">
            <button onClick={send} disabled={!!busy || !sendTo} className={btnPrimary}>{busy === 'send' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />} Enviar ahora</button>
            <button onClick={() => setSendOpen(false)} className={btnGhost}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <section className={section}>
            <h3 className={h}>Cliente</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={e.client.company} onChange={(ev) => setClient('company', ev.target.value)} placeholder="Empresa" className={input} />
              <input value={e.client.name} onChange={(ev) => setClient('name', ev.target.value)} placeholder="Nombre de contacto" className={input} />
              <input value={e.client.email} onChange={(ev) => setClient('email', ev.target.value)} placeholder="Correo" className={input} />
              <input value={e.client.phone} onChange={(ev) => setClient('phone', ev.target.value)} placeholder="Teléfono" className={input} />
              <input value={e.client.url} onChange={(ev) => setClient('url', ev.target.value)} placeholder="Sitio web" className={input} />
              <input value={e.client.industry} onChange={(ev) => setClient('industry', ev.target.value)} placeholder="Rubro" className={input} />
              <input value={e.client.teamSize} onChange={(ev) => setClient('teamSize', ev.target.value)} placeholder="Tamaño del equipo" className={input} />
              <label className="text-xs text-slate-500">Fecha de la sesión<input type="date" value={e.sessionDate} onChange={(ev) => patch((c) => ({ ...c, sessionDate: ev.target.value }))} className={input} /></label>
              <label className="text-xs text-slate-500 sm:col-span-2">
                Enfoque del rubro (cambia las preguntas, los números y las fugas que se calculan)
                <select
                  value={pb.id}
                  onChange={(ev) => {
                    const next = playbookById(ev.target.value);
                    const keep = new Set(next.metrics.map((m) => m.key));
                    patch((c) => ({
                      ...c,
                      playbook: next.id,
                      client: { ...c.client, industry: c.client.industry || (next.id === 'general' ? '' : next.name) },
                      // numbers that also exist in the new approach survive the switch
                      metrics: Object.fromEntries(Object.entries(c.metrics ?? {}).filter(([k]) => keep.has(k))),
                      opportunities: c.opportunities.map((o) => (o.leakKey && !next.leaks.some((l) => l.key === o.leakKey) ? { ...o, leakKey: undefined } : o)),
                    }));
                  }}
                  className={`${input} [&>option]:bg-[#0a1420]`}
                >
                  {PLAYBOOKS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </label>
            </div>
          </section>

          <section className={section}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className={h}>Audit del sitio del cliente</h3>
              <button onClick={runAudit} disabled={!!busy || !e.client.url.trim()} className={`${btnGhost} ml-auto`}>
                {busy === 'audit' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} {audit ? 'Volver a analizar' : 'Analizar su sitio'}
              </button>
            </div>
            {!audit ? (
              <p className="text-sm text-slate-500">
                {e.client.url.trim()
                  ? 'Lee el sitio del cliente (unos 10 segundos) y saca hallazgos de cómo capta y atiende clientes, más los colores de su marca. Entra al PDF, a la versión interactiva y a la propuesta con IA.'
                  : 'Escribe el sitio web del cliente (sección Cliente) para poder analizarlo.'}
              </p>
            ) : (
              <>
                <p className="text-xs text-slate-500">Analizado: {audit.url} · {audit.signals}</p>
                <label className="block text-xs text-slate-500">
                  Resumen
                  <textarea rows={2} value={audit.summary} onChange={(ev) => patchAudit((a) => ({ ...a, summary: ev.target.value }))} className={input} />
                </label>
                <label className="block text-xs text-slate-500">
                  Hallazgos (uno por línea; revísalos antes de mostrarlos al cliente)
                  <textarea rows={5} value={audit.findings.join('\n')} onChange={(ev) => patchAudit((a) => ({ ...a, findings: ev.target.value.split('\n') }))} className={input} />
                </label>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span>Colores de su marca (se funden con los nuestros):</span>
                  {(['primary', 'secondary'] as const).map((k) => (
                    <label key={k} className="inline-flex items-center gap-2">
                      {k === 'primary' ? 'principal' : 'secundario'}
                      <input
                        type="color"
                        value={audit.colors[k] ?? '#7c3aed'}
                        onChange={(ev) => patchAudit((a) => ({ ...a, colors: { ...a.colors, [k]: ev.target.value } }))}
                        className="h-8 w-10 cursor-pointer rounded border border-white/15 bg-transparent"
                      />
                      {!audit.colors[k] && <span className="text-slate-600">no detectado</span>}
                    </label>
                  ))}
                  {auditDirty && <button onClick={saveAudit} disabled={!!busy} className={btnPrimary}><Save className="w-4 h-4" /> Guardar cambios</button>}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Logo del cliente (aparece en su espacio y en el PDF):</span>
                  {audit.logo ? <img src={audit.logo.data} alt="Logo" className="h-10 w-10 rounded-lg bg-white object-contain p-1" /> : <span className="text-slate-600">no se encontró</span>}
                  <input value={logoUrl} onChange={(ev) => setLogoUrl(ev.target.value)} placeholder="https://…/logo.png (opcional, para cambiarlo)" className={`${input} max-w-sm text-xs`} />
                  <button onClick={() => changeLogo({ logoUrl })} disabled={!!busy || !logoUrl.trim()} className={btnGhost}>Usar este logo</button>
                  {audit.logo && <button onClick={() => changeLogo({ removeLogo: true })} disabled={!!busy} className={`${btn} text-slate-500 hover:text-red-300`}>Quitar</button>}
                </div>
              </>
            )}
          </section>

          <section className={section}>
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className={h}>Sesión en vivo · {pb.name}</h3>
              <span className="text-xs text-slate-500">{pb.blocks.reduce((a, b) => a + b.minutes, 0)} min · si no sabe, usa la pregunta de respaldo o déjalo vacío: queda como "por medir"</span>
            </div>
            {pb.blocks.map((b, bi) => (
              <div key={b.title} className="space-y-3 rounded-lg border border-white/10 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">{bi + 1}. {b.title} <span className="font-normal text-slate-500">· {b.minutes} min</span></p>
                {b.questions.map((q) => (
                  <div key={q.q} className="space-y-1.5">
                    <p className="text-sm text-white">{q.q}</p>
                    {q.fallback && <p className="text-xs text-slate-500">Si no sabe: {q.fallback}</p>}
                    <textarea
                      rows={2}
                      value={e.answers?.[q.q] ?? ''}
                      onChange={(ev) => setAnswer(q.q, ev.target.value)}
                      placeholder="Respuesta del cliente (con sus palabras)…"
                      className={`${input} text-[13px] leading-relaxed`}
                    />
                    {q.metrics?.map((k) => {
                      const m = metricDef(k);
                      return m ? metricRow(m) : null;
                    })}
                  </div>
                ))}
              </div>
            ))}
            {unasked.length > 0 && (
              <div className="space-y-2 rounded-lg border border-amber-300/20 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-200">Supuestos para calcular (los propones tú)</p>
                {unasked.map(metricRow)}
              </div>
            )}
          </section>

          <section className={section}>
            <h3 className={h}>Notas de la sesión</h3>
            <p className="text-xs text-slate-500">Escribe libremente mientras hablas: se guarda solo cada 2 segundos. La IA usa estas notas para redactar la propuesta.</p>
            <textarea rows={12} value={e.context.notes} onChange={(ev) => setCtx('notes', ev.target.value)} placeholder="Lo que cuenta el cliente, frases textuales, cifras que menciona, dolores, ideas…" className={`${input} font-mono text-[13px] leading-relaxed`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <textarea rows={2} value={e.context.goals} onChange={(ev) => setCtx('goals', ev.target.value)} placeholder="Objetivos a 6-12 meses" className={input} />
              <textarea rows={2} value={e.context.constraints} onChange={(ev) => setCtx('constraints', ev.target.value)} placeholder="Restricciones: plazos, sistemas, datos sensibles…" className={input} />
              <input value={e.context.budget} onChange={(ev) => setCtx('budget', ev.target.value)} placeholder="Presupuesto o rango" className={input} />
              <input value={e.context.tools} onChange={(ev) => setCtx('tools', ev.target.value)} placeholder="Herramientas que usan hoy" className={input} />
            </div>
          </section>

          <section className={section}>
            <h3 className={h}>Procesos <span className="normal-case font-normal tracking-normal text-slate-500">· detalle opcional, para tareas que no cubre el enfoque</span></h3>
            <div ref={procRow} className="grid grid-cols-12 gap-2">
              <input value={newProc.name} onChange={(ev) => setNewProc({ ...newProc, name: ev.target.value })} onKeyDown={(ev) => ev.key === 'Enter' && addProc()} placeholder="Proceso (ej. Confirmar citas)" className={`${input} col-span-12 sm:col-span-6`} />
              <NumIn value={newProc.hoursWeek} onChange={(n) => setNewProc({ ...newProc, hoursWeek: n })} placeholder="h/semana" className="col-span-4 sm:col-span-2" />
              <NumIn value={newProc.hourlyCost} onChange={(n) => setNewProc({ ...newProc, hourlyCost: n })} placeholder="$/hora" step={500} className="col-span-4 sm:col-span-2" />
              <button onClick={addProc} className={`${btnGhost} col-span-4 sm:col-span-2`}><Plus className="w-4 h-4" /> Agregar</button>
            </div>
            {e.processes.length === 0 && <p className="text-sm text-slate-500">Agrega cada tarea repetitiva que mencione el cliente. Enter para agregar rápido; los detalles se completan después.</p>}
            {sugg.processes.some((sp) => !e.processes.some((p) => p.name === sp.name)) && (
              <div className="space-y-1.5">
                <p className="text-xs text-slate-500">Procesos típicos de {pb.name.toLowerCase()} (un clic rellena el nombre arriba; tú completas las horas y el valor hora y das Agregar):</p>
                <div className="flex flex-wrap gap-2">
                  {sugg.processes.filter((sp) => !e.processes.some((p) => p.name === sp.name)).map((sp) => (
                    <button key={sp.name} onClick={() => pickSuggestedProc(sp)} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300 hover:border-cyan-300/50 hover:text-white cursor-pointer">+ {sp.name}</button>
                  ))}
                </div>
              </div>
            )}
            {e.processes.map((p) => (
              <div key={p.id} className="rounded-lg border border-white/10">
                <div className="flex flex-wrap items-center gap-3 p-3">
                  <button onClick={() => setOpenProc(openProc === p.id ? null : p.id)} className="font-bold text-white text-left cursor-pointer">{p.name}</button>
                  <span className="text-xs text-slate-400">{p.hoursWeek} h/sem · {clp(p.hourlyCost)}/h</span>
                  <span className="ml-auto text-sm font-bold text-brand-100">{clp(p.hoursWeek * 4.33 * p.hourlyCost)}/mes</span>
                  <button onClick={() => patch((c) => ({ ...c, processes: c.processes.filter((x) => x.id !== p.id) }))} className={`${btn} px-2 text-slate-500 hover:text-red-300`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
                </div>
                {openProc === p.id && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-white/10 p-3">
                    <input value={p.name} onChange={(ev) => setProc(p.id, { name: ev.target.value })} placeholder="Nombre" className={input} />
                    <input value={p.area} onChange={(ev) => setProc(p.id, { area: ev.target.value })} placeholder="Área (ventas, recepción…)" className={input} />
                    <label className="text-xs text-slate-500">Horas por semana<NumIn value={p.hoursWeek} onChange={(n) => setProc(p.id, { hoursWeek: n })} /></label>
                    <label className="text-xs text-slate-500">Personas<NumIn value={p.people} onChange={(n) => setProc(p.id, { people: n })} /></label>
                    <label className="text-xs text-slate-500">Costo de una hora (CLP)<NumIn value={p.hourlyCost} step={500} onChange={(n) => setProc(p.id, { hourlyCost: n })} /></label>
                    <input value={p.tools} onChange={(ev) => setProc(p.id, { tools: ev.target.value })} placeholder="Herramientas actuales" className={input} />
                    <textarea rows={2} value={p.pain} onChange={(ev) => setProc(p.id, { pain: ev.target.value })} placeholder="Qué duele de este proceso" className={`${input} sm:col-span-2`} />
                  </div>
                )}
              </div>
            ))}
          </section>

          {t.leak > 0 && <section className={section}>
            <h3 className={h}>Ventas que se escapan (EBS anterior a los enfoques)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <label className="text-xs text-slate-500">Clientes o prospectos perdidos al mes<NumIn value={e.sales.lostClientsMonth} onChange={(n) => patch((c) => ({ ...c, sales: { ...c.sales, lostClientsMonth: n } }))} /></label>
              <label className="text-xs text-slate-500">Ticket promedio (CLP)<NumIn value={e.sales.avgTicket} step={1000} onChange={(n) => patch((c) => ({ ...c, sales: { ...c.sales, avgTicket: n } }))} /></label>
              <p className="pb-2 text-right text-lg font-black text-white">{clp(t.leak)}<span className="text-xs font-normal text-slate-400">/mes</span></p>
            </div>
          </section>}

          <section className={section}>
            <div className="flex items-center gap-3">
              <h3 className={h}>Fugas en palabras del cliente</h3>
              <button onClick={() => patch((c) => ({ ...c, leaks: [...c.leaks, { title: '', detail: '' }] }))} className={`${btnGhost} ml-auto`}><Plus className="w-4 h-4" /> Fuga</button>
            </div>
            {e.leaks.length === 0 && <p className="text-sm text-slate-500">Las 3 fugas principales, en palabras del cliente. Si las dejas vacías, la IA las propone al generar.</p>}
            {sugg.leaks.some((sl) => !e.leaks.some((l) => l.title === sl.title)) && (
              <div className="space-y-1.5">
                <p className="text-xs text-slate-500">Fugas típicas de {pb.name.toLowerCase()} (un clic las agrega; edita el texto con las palabras del cliente):</p>
                <div className="flex flex-wrap gap-2">
                  {sugg.leaks.filter((sl) => !e.leaks.some((l) => l.title === sl.title)).map((sl) => (
                    <button key={sl.title} onClick={() => patch((c) => ({ ...c, leaks: [...c.leaks, sl] }))} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300 hover:border-cyan-300/50 hover:text-white cursor-pointer">+ {sl.title}</button>
                  ))}
                </div>
              </div>
            )}
            {e.leaks.map((l, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <input value={l.title} onChange={(ev) => patch((c) => ({ ...c, leaks: c.leaks.map((x, j) => (j === i ? { ...x, title: ev.target.value } : x)) }))} placeholder="Fuga" className={`${input} col-span-12 sm:col-span-4 font-bold`} />
                <input value={l.detail} onChange={(ev) => patch((c) => ({ ...c, leaks: c.leaks.map((x, j) => (j === i ? { ...x, detail: ev.target.value } : x)) }))} placeholder="Dónde y por qué se pierde plata" className={`${input} col-span-10 sm:col-span-7`} />
                <button onClick={() => patch((c) => ({ ...c, leaks: c.leaks.filter((_, j) => j !== i) }))} className={`${btnGhost} col-span-2 sm:col-span-1 px-2`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-brand-500/40 bg-brand-600/10 p-5 flex flex-wrap items-center gap-4">
            <div className="space-y-1">
              <p className="font-bold text-white">Propuesta con IA</p>
              <p className="text-sm text-slate-400">Redacta oportunidades, enfoque, supuestos, inversión y etapas a partir de tus notas, los números del rubro y las fugas calculadas. Después lo ajustas todo.</p>
            </div>
            <button onClick={generate} disabled={!!busy || (!e.context.notes.trim() && !e.processes.length && !Object.keys(e.metrics ?? {}).length && !Object.values(e.answers ?? {}).some(Boolean))} className={`${btnPrimary} ml-auto`}>
              {busy === 'draft' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} {busy === 'draft' ? 'Generando (1-2 min)…' : e.opportunities.length ? 'Regenerar' : 'Generar con IA'}
            </button>
          </section>

          {e.pendingQuestions.length > 0 && (
            <section className="rounded-xl border border-amber-300/30 bg-amber-300/5 p-5 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200">Datos por confirmar con el cliente</h3>
              <p className="text-xs text-slate-400">
                Son dudas que la IA detectó. Cuando el cliente responda, anota el dato donde corresponde (Sesión en vivo para números y respuestas, Procesos para horas y costos) y quita la pregunta con la papelera. No salen en el PDF: son solo para ti. Regenera la propuesta después para que use los datos nuevos.
              </p>
              {e.pendingQuestions.map((q, i) => (
                <div key={i} className="flex gap-2">
                  <input value={q} onChange={(ev) => patch((c) => ({ ...c, pendingQuestions: c.pendingQuestions.map((x, j) => (j === i ? ev.target.value : x)) }))} className={`${input} text-sm`} />
                  <button onClick={() => patch((c) => ({ ...c, pendingQuestions: c.pendingQuestions.filter((_, j) => j !== i) }))} className={`${btnGhost} px-3`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </section>
          )}

          {(e.toMeasure?.length || e.opportunities.length > 0) && (
            <section className={section}>
              <h3 className={h}>Lo que hoy no sabemos y vamos a medir</h3>
              <p className="text-xs text-slate-500">Son datos que el cliente hoy no tiene y que conviene empezar a medir (por ejemplo: cuánto deja cada camión). Es una sección honesta del PDF: le dice qué cosas desconoce y que ver esos números es parte del plan. La IA la propone según lo que falte; la editas aquí, uno por línea. Si la dejas vacía, no se muestra.</p>
              <textarea rows={4} value={(e.toMeasure ?? []).join('\n')} onChange={(ev) => patch((c) => ({ ...c, toMeasure: ev.target.value.split('\n') }))} className={input} />
            </section>
          )}

          <section className={section}>
            <div className="flex items-center gap-3">
              <h3 className={h}>Oportunidades y ROI</h3>
              {e.opportunities.some((o) => o.selected && !(o.flowBefore?.length && o.flowAfter?.length)) && (
                <button onClick={generateFlows} disabled={!!busy} className={btnGhost} title='Pasos "hoy" y "con la solución" que el cliente ve en "Ver cómo funciona"'>
                  {busy === 'flows' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Generar antes y después
                </button>
              )}
              <button
                onClick={() => patch((c) => ({ ...c, opportunities: [...c.opportunities, { id: uid(), title: 'Nueva oportunidad', description: '', approach: 'A medida', hoursWeek: 0, hourlyCost: 0, automationPct: 0, salesRecoveryPct: 0, investment: 0, monthlyCost: 0, impact: 'Medio', effort: 'Medio', stage: 2, assumptions: '', selected: true, investmentSource: 'manual' }] }))}
                className={`${btnGhost} ml-auto`}
              >
                <Plus className="w-4 h-4" /> Oportunidad
              </button>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Cada oportunidad es algo concreto a construir. Su ahorro mensual suma dos cosas: (1) las horas que libera = horas por semana del proceso × % automatizable × costo de la hora, y (2) la plata que recupera = el monto mensual de la fuga que ataca × el % que recupera. Los porcentajes son supuestos tuyos, no datos del cliente. A eso se le resta el costo mensual de herramientas, y con la inversión sale la recuperación en meses y el ROI a 12 meses. Solo cuentan las marcadas con el visto; las demás quedan fuera del PDF.
            </p>
            {e.opportunities.length === 0 && <p className="text-sm text-slate-500">Genera la propuesta con IA o agrégalas a mano.</p>}
            {e.opportunities.map((o) => {
              const c = oppCalc(o, latest.current);
              return (
                <div key={o.id} className={`rounded-lg border p-4 space-y-3 ${o.selected ? 'border-white/15' : 'border-white/5 opacity-60'}`}>
                  <div className="flex gap-2 items-center">
                    <input type="checkbox" checked={o.selected} onChange={(ev) => setOpp(o.id, { selected: ev.target.checked })} title="Incluir en la hoja de ruta" />
                    <input value={o.title} onChange={(ev) => setOpp(o.id, { title: ev.target.value })} className={`${input} font-bold`} />
                    <button onClick={() => patch((cur) => ({ ...cur, opportunities: cur.opportunities.filter((x) => x.id !== o.id) }))} className={`${btnGhost} px-3`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <textarea rows={2} value={o.description} onChange={(ev) => setOpp(o.id, { description: ev.target.value })} placeholder="Qué se hará y qué cambia" className={input} />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <label className="text-xs text-slate-500">Enfoque
                      <select value={o.approach} onChange={(ev) => setOpp(o.id, { approach: ev.target.value as EbsApproach })} className={`${input} [&>option]:bg-[#0a1420]`}>
                        {(['A medida', 'Herramienta existente', 'Combinación'] as const).map((x) => <option key={x}>{x}</option>)}
                      </select>
                    </label>
                    <label className="text-xs text-slate-500">Etapa
                      <select value={o.stage} onChange={(ev) => setOpp(o.id, { stage: Number(ev.target.value) as 1 | 2 | 3 })} className={`${input} [&>option]:bg-[#0a1420]`}>
                        <option value={1}>1 · 0-30 días</option>
                        <option value={2}>2 · 1-3 meses</option>
                        <option value={3}>3 · 3-6 meses</option>
                      </select>
                    </label>
                    <label className="text-xs text-slate-500">Impacto
                      <select value={o.impact} onChange={(ev) => setOpp(o.id, { impact: ev.target.value as Level3 })} className={`${input} [&>option]:bg-[#0a1420]`}>{(['Alto', 'Medio', 'Bajo'] as const).map((x) => <option key={x}>{x}</option>)}</select>
                    </label>
                    <label className="text-xs text-slate-500">Esfuerzo
                      <select value={o.effort} onChange={(ev) => setOpp(o.id, { effort: ev.target.value as Level3 })} className={`${input} [&>option]:bg-[#0a1420]`}>{(['Bajo', 'Medio', 'Alto'] as const).map((x) => <option key={x}>{x}</option>)}</select>
                    </label>
                    <label className="text-xs text-slate-500">h/semana del proceso<NumIn value={o.hoursWeek} onChange={(n) => setOpp(o.id, { hoursWeek: n })} /></label>
                    <label className="text-xs text-slate-500">$/hora<NumIn value={o.hourlyCost} step={500} onChange={(n) => setOpp(o.id, { hourlyCost: n })} /></label>
                    <label className="text-xs text-amber-200/80">% automatizable (supuesto)<NumIn value={o.automationPct} onChange={(n) => setOpp(o.id, { automationPct: Math.min(100, n) })} /></label>
                    <label className="text-xs text-slate-500 col-span-2">Fuga que ataca
                      <select value={o.leakKey ?? ''} onChange={(ev) => setOpp(o.id, { leakKey: ev.target.value || undefined })} className={`${input} [&>option]:bg-[#0a1420]`}>
                        <option value="">{t.leak > 0 ? 'Ventas que se escapan' : 'Ninguna (solo horas)'}</option>
                        {computedLeaks.filter((l) => l.kind === 'perdida').map((l) => <option key={l.key} value={l.key}>{l.label}{l.monthly ? ` · ${clp(l.monthly)}/mes` : ' · sin calcular'}</option>)}
                      </select>
                    </label>
                    <label className="text-xs text-amber-200/80">% de esa fuga que recupera (supuesto)<NumIn value={o.salesRecoveryPct} onChange={(n) => setOpp(o.id, { salesRecoveryPct: Math.min(100, n) })} /></label>
                    <label className="text-xs text-slate-500">Inversión (CLP)<NumIn value={o.investment} step={50000} onChange={(n) => setOpp(o.id, { investment: n, investmentSource: 'manual' })} className={o.investment <= 0 ? 'border-amber-300/60' : ''} /></label>
                    <label className="text-xs text-slate-500" title="Hosting, APIs, soporte: el gasto que sigue todos los meses">Mantención mensual (CLP)<NumIn value={o.monthlyCost} step={5000} onChange={(n) => setOpp(o.id, { monthlyCost: n })} /></label>
                    <label className="text-xs text-slate-500" title="Semanas hasta tenerla en producción, con un equipo trabajando una solución tras otra">Semanas hasta producción<NumIn value={o.weeks ?? 0} onChange={(n) => setOpp(o.id, { weeks: Math.min(104, Math.round(n)) })} /></label>
                  </div>
                  <input value={o.assumptions} onChange={(ev) => setOpp(o.id, { assumptions: ev.target.value })} placeholder="Supuestos (salen en el PDF)" className={`${input} text-xs`} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="text-xs text-red-200/80">Cómo funciona hoy (un paso por línea)
                      <textarea rows={4} value={(o.flowBefore ?? []).join('\n')} onChange={(ev) => setOpp(o.id, { flowBefore: ev.target.value.split('\n') })} className={`${input} text-xs`} />
                    </label>
                    <label className="text-xs text-emerald-200/80">Cómo funcionaría con la solución
                      <textarea rows={4} value={(o.flowAfter ?? []).join('\n')} onChange={(ev) => setOpp(o.id, { flowAfter: ev.target.value.split('\n') })} className={`${input} text-xs`} />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 rounded-lg bg-white/[0.04] p-3 text-center">
                    <div><p className="text-[10px] uppercase text-slate-500">Horas/mes</p><p className="font-bold text-white">{Math.round(c.hoursSavedMonth)}</p></div>
                    <div><p className="text-[10px] uppercase text-slate-500">Ahorro/mes</p><p className="font-bold text-white">{clp(c.savingMonth)}</p></div>
                    <div><p className="text-[10px] uppercase text-slate-500">Neto/mes</p><p className="font-bold text-white">{clp(c.netMonth)}</p></div>
                    <div><p className="text-[10px] uppercase text-slate-500">Recupera</p><p className="font-bold text-emerald-300">{months(c.paybackMonths)}</p></div>
                    <div><p className="text-[10px] uppercase text-slate-500">ROI 12 m</p><p className="font-bold text-emerald-300">{pct(c.roi12)}</p></div>
                  </div>
                  {o.investmentSource && <p className="text-[11px] text-slate-500">Inversión: {o.investmentSource}</p>}
                </div>
              );
            })}
          </section>

          <section className={section}>
            <h3 className={h}>Textos del informe</h3>
            <label className="block text-xs text-slate-500">Resumen ejecutivo<textarea rows={5} value={e.summary} onChange={(ev) => patch((c) => ({ ...c, summary: ev.target.value }))} className={input} /></label>
            <label className="block text-xs text-slate-500">Enfoque recomendado<textarea rows={3} value={e.approach} onChange={(ev) => patch((c) => ({ ...c, approach: ev.target.value }))} className={input} /></label>
            <label className="block text-xs text-slate-500">
              Próximos pasos (uno por línea)
              <textarea rows={3} value={e.nextSteps.join('\n')} onChange={(ev) => patch((c) => ({ ...c, nextSteps: ev.target.value.split('\n') }))} className={input} />
            </label>
          </section>

          <section className={section}>
            <h3 className={h}>Entrega</h3>
            <label className="block text-xs text-slate-500">
              Link del video de Loom (sale en la portada del PDF, en el cierre y en el correo)
              <input value={e.loomUrl} onChange={(ev) => patch((c) => ({ ...c, loomUrl: ev.target.value.trim() }))} placeholder="https://www.loom.com/share/…" className={`${input} ${e.loomUrl && !/^https:\/\/(www\.)?loom\.com\//i.test(e.loomUrl) ? 'border-red-400/60' : ''}`} />
            </label>
            {e.loomUrl && !/^https:\/\/(www\.)?loom\.com\//i.test(e.loomUrl) && <p className="text-xs text-red-300">Debe ser un link de loom.com.</p>}
            {e.deliveredAt && <p className="text-xs text-emerald-300">Entregado {when(e.deliveredAt)}</p>}
          </section>
        </div>

        <aside className="xl:col-span-4 space-y-6">
          <section className="rounded-xl border border-brand-500/40 bg-[#070b16] p-5 space-y-2 text-sm xl:sticky xl:top-20">
            <h3 className="pb-1 text-sm font-bold uppercase tracking-wider text-slate-400">Números en vivo</h3>
            {computedLeaks.map((l) => (
              <div key={l.key} className={l.kind === 'contexto' ? 'opacity-70' : ''}>
                <p className="flex justify-between gap-2 text-slate-300">
                  <span>{l.label}{l.kind === 'caja' ? ' (caja)' : l.kind === 'contexto' ? ' (contexto)' : ''}</span>
                  {l.missing.length ? <span className="shrink-0 text-xs text-slate-600">por medir</span> : <span className="shrink-0">{clp(l.monthly)}/mes</span>}
                </p>
                {l.missing.length > 0 ? (
                  <p className="text-[11px] text-slate-600">Falta: {l.missing.map((k) => metricDef(k)?.label ?? k).join(', ')}</p>
                ) : (
                  <p className={`text-[11px] ${CONF_STYLE[l.confidence].split(' ')[0]}`}>{l.confidence}</p>
                )}
              </div>
            ))}
            {t.manualCostMonth > 0 && <p className="flex justify-between text-slate-400"><span>Procesos anotados</span><span>{clp(t.manualCostMonth)}/mes</span></p>}
            <p className="flex justify-between text-base font-black text-white"><span>Fuga mensual</span><span>{clp(t.leakMonth)}/mes</span></p>
            {t.cashTrapped > 0 && <p className="flex justify-between font-bold text-cyan-200"><span>Plata atrapada</span><span>{clp(t.cashTrapped)}</span></p>}
            <div className="my-2 border-t border-white/10" />
            <p className="flex justify-between text-slate-400"><span>Inversión ({sel.length} seleccionadas)</span><span>{clp(t.investment)}</span></p>
            <p className="flex justify-between text-slate-400"><span>Ahorro neto</span><span>{clp(t.netMonth)}/mes</span></p>
            <p className="flex justify-between text-lg font-black text-emerald-300"><span>Recuperación</span><span>{months(t.paybackMonths)}</span></p>
            <p className="flex justify-between text-lg font-black text-emerald-300"><span>ROI 12 meses</span><span>{pct(t.roi12)}</span></p>
            <p className="pt-1 text-[11px] text-slate-500">Total a pagar por la implementación: {clp(Math.max(0, t.investment - Math.min(197000, t.investment)))} (descontando el EBS).</p>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Documentos a pedir</h3>
            <ul className="space-y-1 text-xs text-slate-400">{pb.documents.map((d) => <li key={d}>• {d}</li>)}</ul>
            <div className="flex flex-wrap gap-2">
              <button onClick={copyDocs} className={btnGhost}><Copy className="w-4 h-4" /> {copied ? 'Copiado' : 'Copiar correo'}</button>
              {e.client.email && (
                <a
                  href={`mailto:${e.client.email}?subject=${encodeURIComponent(`Documentos para tu hoja de ruta EBS 693`)}&body=${encodeURIComponent(documentsEmail(pb, e.client.name, e.client.company, 'Uni-Verso693 · universo693.com'))}`}
                  className={btnGhost}
                >
                  <Mail className="w-4 h-4" /> Abrir en el correo
                </a>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

const EbsList = ({ api, onOpen, onNew }: { api: Api; onOpen: (e: EbsSession) => void; onNew: () => void }) => {
  const [list, setList] = useState<EbsSession[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(() => {
    api<{ sessions: EbsSession[] }>('ebs-list').then((d) => setList(d.sessions)).catch((e) => setError(e.message));
  }, [api]);
  useEffect(load, [load]);
  const remove = async (e: EbsSession) => {
    if (!window.confirm(`¿Borrar ${e.number}? No se puede deshacer.`)) return;
    await api('ebs-delete', { body: { id: e.id } });
    load();
  };
  if (error) return <p className="text-red-300">{error}</p>;
  if (!list) return <Loader2 className="w-5 h-5 animate-spin text-slate-400" />;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white">Diagnósticos EBS 693</h2>
          <p className="text-sm text-slate-400">Toma notas durante la sesión, genera la propuesta con IA, ajusta el ROI, graba tu Loom y envía la hoja de ruta en PDF.</p>
        </div>
        <button onClick={onNew} className={`${btnPrimary} ml-auto`}><Plus className="w-4 h-4" /> Nuevo EBS</button>
      </div>
      {list.length === 0 ? (
        <p className="text-slate-400">Aún no hay diagnósticos.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[720px] text-sm">
            <tbody>
              {list.map((e) => {
                const t = ebsTotals(e);
                return (
                  <tr key={e.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                    <td className="p-3"><button onClick={() => onOpen(e)} className="font-bold text-white hover:text-cyan-200 cursor-pointer">{e.number}</button></td>
                    <td className="p-3 text-slate-300">{e.client.company || e.client.name || '—'}<span className="block text-xs text-slate-500">{e.sessionDate}</span></td>
                    <td className="p-3"><Badge className={e.status === 'entregado' ? QUOTE_COLORS.aceptada : QUOTE_COLORS.enviada}>{e.status}</Badge></td>
                    <td className="p-3 text-right text-slate-300">Fuga {clp(t.leakMonth)}/mes<span className="block text-xs text-slate-500">ROI 12 m {pct(t.roi12)}</span></td>
                    <td className="p-3 text-right"><button onClick={() => remove(e)} className={`${btn} text-slate-400 hover:text-red-300 px-2`} aria-label="Borrar"><Trash2 className="w-4 h-4" /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------- catalog
const Catalog =({ api, catalog, onSaved }: { api: Api; catalog: Module[]; onSaved: (c: Module[]) => void }) => {
  const [rows, setRows] = useState<Module[]>(catalog);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const set = (idx: number, patch: Partial<Module>) => setRows((r) => r.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
  const save = async () => {
    setBusy(true);
    try {
      const { catalog: saved } = await api<{ catalog: Module[] }>('catalog-save', { body: { catalog: rows } });
      setRows(saved);
      onSaved(saved);
      setMsg('Catálogo guardado.');
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm text-slate-400">Precios netos en CLP (sin IVA). Los módulos en 0 aparecen como "sin precio" y no se pueden enviar hasta completarlos en la cotización.</p>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setRows((r) => [...r, { id: '', category: 'General', name: 'Nuevo módulo', description: '', price: 0, unit: 'proyecto' }])} className={btnGhost}><Plus className="w-4 h-4" /> Módulo</button>
          <button onClick={save} disabled={busy} className={btnPrimary}>{busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Guardar catálogo</button>
        </div>
      </div>
      {msg && <p className="text-sm text-emerald-300">{msg}</p>}
      <div className="space-y-3">
        {rows.map((m, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 rounded-lg border border-white/10 p-3">
            <input value={m.category} onChange={(e) => set(idx, { category: e.target.value })} placeholder="Categoría" className={`${input} md:col-span-2`} />
            <input value={m.name} onChange={(e) => set(idx, { name: e.target.value })} placeholder="Nombre" className={`${input} md:col-span-3 font-bold`} />
            <input value={m.description} onChange={(e) => set(idx, { description: e.target.value })} placeholder="Descripción" className={`${input} md:col-span-4`} />
            <input type="number" min={0} step={1000} value={m.price} onChange={(e) => set(idx, { price: Number(e.target.value) })} className={`${input} md:col-span-1 ${m.price <= 0 ? 'border-amber-300/60' : ''}`} />
            <select value={m.unit} onChange={(e) => set(idx, { unit: e.target.value as Unit })} className={`${input} md:col-span-1 [&>option]:bg-[#0a1420]`}>
              {(['proyecto', 'mes', 'hora', 'unidad'] as const).map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
            <button onClick={() => setRows((r) => r.filter((_, i) => i !== idx))} className={`${btnGhost} md:col-span-1`} aria-label="Quitar"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- settings
const SettingsView = ({ api, settings, onSaved }: { api: Api; settings: Settings; onSaved: (s: Settings) => void }) => {
  const [s, setS] = useState(settings);
  const [msg, setMsg] = useState<string | null>(null);
  const field = (k: keyof Settings, label: string, type = 'text') => (
    <label className="block text-xs text-slate-500">
      {label}
      <input type={type} value={String(s[k])} onChange={(e) => setS({ ...s, [k]: type === 'number' ? Number(e.target.value) : e.target.value })} className={input} />
    </label>
  );
  const save = async () => {
    const { settings: saved } = await api<{ settings: Settings }>('settings-save', { body: s });
    onSaved(saved);
    setS(saved);
    setMsg('Ajustes guardados.');
  };
  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm text-slate-400">Estos datos aparecen en el encabezado y el pie de cada PDF, y son los valores por defecto de cada cotización nueva.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {field('brand', 'Marca')}
        {field('legalName', 'Razón social')}
        {field('rut', 'RUT de la empresa')}
        {field('website', 'Sitio web')}
        {field('email', 'Correo')}
        {field('phone', 'Teléfono')}
        {field('validDays', 'Validez por defecto (días)', 'number')}
        {field('devHourRate', 'Tarifa por hora de desarrollo (CLP), para el EBS', 'number')}
        {field('maintenancePct', 'Mantención mensual (% de la inversión), para el EBS', 'number')}
        {field('kickoffUrl', 'Link de Calendly para la reunión de inicio (el botón tras Quiero avanzar)')}
        <label className="block text-xs text-slate-500">IVA (%)<input type="number" min={0} max={100} value={Math.round(s.ivaRate * 100)} onChange={(e) => setS({ ...s, ivaRate: Number(e.target.value) / 100 })} className={input} /></label>
      </div>
      <label className="block text-xs text-slate-500">Condiciones de pago por defecto<textarea rows={2} value={s.paymentTerms} onChange={(e) => setS({ ...s, paymentTerms: e.target.value })} className={input} /></label>
      <label className="block text-xs text-slate-500">Notas por defecto<textarea rows={3} value={s.notes} onChange={(e) => setS({ ...s, notes: e.target.value })} className={input} /></label>
      <button onClick={save} className={btnPrimary}><Save className="w-4 h-4" /> Guardar ajustes</button>
      {msg && <p className="text-sm text-emerald-300">{msg}</p>}
    </div>
  );
};

// ---------------------------------------------------------------- shell
type Tab = 'solicitudes' | 'ebs' | 'cotizaciones' | 'facturacion' | 'audit' | 'catalogo' | 'ajustes';

// EBS first: it's the main working tool, the rest supports it
const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: 'ebs', label: 'EBS 693', Icon: Target },
  { id: 'solicitudes', label: 'Solicitudes', Icon: Inbox },
  { id: 'cotizaciones', label: 'Cotizaciones', Icon: FileText },
  { id: 'facturacion', label: 'Facturación', Icon: Receipt },
  { id: 'audit', label: 'Audit PRO', Icon: Sparkles },
  { id: 'catalogo', label: 'Catálogo', Icon: Package },
  { id: 'ajustes', label: 'Ajustes', Icon: SettingsIcon },
];

const Workspace = ({ token, onLogout }: { token: string; onLogout: () => void }) => {
  // the tab lives in the URL hash (/interno#ebs), so it can be bookmarked and survives a reload
  const [tab, setTabState] = useState<Tab>(() => {
    const h = (typeof window === 'undefined' ? '' : window.location.hash.slice(1)) as Tab;
    return TABS.some((t) => t.id === h) ? h : 'ebs';
  });
  const setTab = (t: Tab) => {
    setTabState(t);
    history.replaceState(null, '', `#${t}`);
  };
  const [catalog, setCatalog] = useState<Module[] | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [editing, setEditing] = useState<Quote | null>(null);
  const [auditPrefill, setAuditPrefill] = useState<AuditPrefill | null>(null);
  const [ebsEditing, setEbsEditing] = useState<EbsSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  const api = useCallback(
    async <T,>(action: string, opts: { body?: unknown; query?: Record<string, string> } = {}) => {
      try {
        return await call<T>(action, { ...opts, token });
      } catch (e) {
        if (e instanceof AuthError) onLogout();
        throw e;
      }
    },
    [token, onLogout],
  ) as Api;

  useEffect(() => {
    Promise.all([api<{ catalog: Module[] }>('catalog'), api<{ settings: Settings }>('settings')])
      .then(([c, s]) => {
        setCatalog(c.catalog);
        setSettings(s.settings);
      })
      .catch((e) => setError(e.message));
  }, [api]);

  const openQuote = async (id: string) => {
    const { quote } = await api<{ quote: Quote }>('quote', { query: { id } });
    setTab('cotizaciones');
    setEditing(quote);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-[#050912]/90 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center gap-2 py-3">
          <span className="mr-4 font-black text-white">Uni-Verso<span className="text-brand-500">693</span> <span className="text-xs font-bold text-slate-500">interno</span></span>
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setEditing(null);
                setEbsEditing(null);
              }}
              className={`${btn} ${tab === id ? 'bg-white/10 text-white' : id === 'ebs' ? 'text-brand-100 hover:text-white' : 'text-slate-400 hover:text-white'} ${id === 'ebs' ? 'border border-brand-500/50' : ''}`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
          <button onClick={onLogout} className={`${btn} ml-auto text-slate-400 hover:text-white`}><LogOut className="w-4 h-4" /> Salir</button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error ? (
          <p className="text-red-300">{error}</p>
        ) : !catalog || !settings ? (
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        ) : editing ? (
          <React.Fragment key={editing.id ?? 'new'}>
            <QuoteEditor api={api} initial={editing} catalog={catalog} settings={settings} token={token} onBack={() => setEditing(null)} />
          </React.Fragment>
        ) : tab === 'solicitudes' ? (
          <Leads
            api={api}
            onQuote={(lead) => { setTab('cotizaciones'); setEditing(emptyQuote(settings, lead)); }}
            onOpenQuote={openQuote}
            onAudit={(lead) => { setAuditPrefill({ url: lead.url, fullName: lead.name, email: lead.email, company: lead.company }); setTab('audit'); }}
            onEbs={(lead) => { setEbsEditing(emptyEbs(lead)); setTab('ebs'); }}
          />
        ) : tab === 'cotizaciones' ? (
          <Quotes api={api} settings={settings} onOpen={setEditing} onNew={() => setEditing(emptyQuote(settings))} />
        ) : tab === 'facturacion' ? (
          <Billing api={api} token={token} catalog={catalog} settings={settings} onOpenQuote={openQuote} />
        ) : tab === 'ebs' ? (
          ebsEditing ? (
            <React.Fragment key={ebsEditing.id ?? 'new'}>
              <EbsEditor api={api} token={token} initial={ebsEditing} onBack={() => setEbsEditing(null)} onOpenQuote={openQuote} />
            </React.Fragment>
          ) : (
            <EbsList api={api} onOpen={setEbsEditing} onNew={() => setEbsEditing(emptyEbs())} />
          )
        ) : tab === 'audit' ? (
          <React.Fragment key={auditPrefill ? JSON.stringify(auditPrefill) : 'blank'}>
            <AuditPro token={token} prefill={auditPrefill} onLogout={onLogout} />
          </React.Fragment>
        ) : tab === 'catalogo' ? (
          <Catalog api={api} catalog={catalog} onSaved={setCatalog} />
        ) : (
          <SettingsView api={api} settings={settings} onSaved={setSettings} />
        )}
      </main>
    </div>
  );
};

/** /interno — the whole workspace; loaded lazily so the public site doesn't carry it. */
const Interno: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.title = 'Interno · Uni-Verso693';
    setToken(readToken());
    setReady(true);
  }, []);
  const logout = useCallback(() => {
    writeToken(null);
    setToken(null);
  }, []);
  if (!ready) return null;
  return token ? <Workspace token={token} onLogout={logout} /> : <Login onToken={setToken} />;
};

export default Interno;
