import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Download, Loader2, Lock, RotateCcw, Sparkles, X } from 'lucide-react';
import { useLang } from '../lib/lang';
import { Container, Eyebrow } from '../components/ui';
import { ParticleField } from '../components/effects';

// ---------- free (Express) ----------
interface FreeReport {
  business_summary: string;
  industry: string;
  opportunities: { title: string; why: string }[];
}

// ---------- paid (AUDIT 693 PRO) ----------
interface ProReport {
  executive_summary: string;
  competitors: { name: string; url: string }[];
  opportunities: { title: string; area: string; impact: string }[];
}
interface OrderStatus {
  status: 'pending' | 'paid' | 'generating' | 'ready' | 'failed';
  site: string;
  email: string;
  report?: ProReport;
  manualCost?: { monthly: number; yearly: number } | null;
  currency: 'CLP' | 'USD';
  error?: string;
}

const PRO_NAME = 'AUDIT 693 PRO';
const PRO_TAGLINE = 'Informe de Fugas de Dinero';

const steps = ['Leyendo tu sitio…', 'Entendiendo tu negocio…', 'Buscando oportunidades de IA…', 'Preparando el resultado…'];

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';

const money = (n: number, c: 'CLP' | 'USD') => (c === 'CLP' ? `$${Math.round(n).toLocaleString('es-CL')}` : `USD ${Math.round(n).toLocaleString('en-US')}`);

const Field: React.FC<{ label: string; children: React.ReactNode; hint?: string }> = ({ label, children, hint }) => (
  <label className="space-y-1.5 block">
    <span className="text-xs font-bold text-slate-300">{label}</span>
    {children}
    {hint && <span className="block text-[11px] text-slate-500">{hint}</span>}
  </label>
);

const comparison: { label: string; free: boolean | string; pro: boolean | string }[] = [
  { label: 'Oportunidades de IA', free: '3, en una línea', pro: '8 a 10, priorizadas' },
  { label: 'Páginas de tu sitio analizadas', free: 'Portada', pro: 'Hasta 7' },
  { label: 'Tu sitio como canal de venta', free: false, pro: true },
  { label: 'Análisis de tu competencia', free: false, pro: true },
  { label: 'Costo del trabajo manual con tus datos', free: false, pro: true },
  { label: 'Impacto y esfuerzo de cada oportunidad', free: false, pro: true },
  { label: 'Informe PDF en tu correo', free: false, pro: true },
];

const Cell: React.FC<{ v: boolean | string }> = ({ v }) =>
  typeof v === 'string' ? (
    <span className="text-sm text-slate-200">{v}</span>
  ) : v ? (
    <Check className="w-5 h-5 text-emerald-300 mx-auto" aria-label="Incluido" />
  ) : (
    <X className="w-5 h-5 text-slate-600 mx-auto" aria-label="No incluido" />
  );

/** Order page after checkout: /audit-693?pedido=…&k=… */
const OrderView: React.FC<{ order: string; k: string }> = ({ order, k }) => {
  const [data, setData] = useState<OrderStatus | null>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let stop = false;
    let tries = 0;
    const tick = async () => {
      tries++;
      try {
        const res = await fetch('/api/pro?action=confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order, k }),
        });
        if (res.status === 404) {
          setGone(true);
          return;
        }
        const d = (await res.json()) as OrderStatus;
        if (!stop) setData(d);
        if (d.status === 'ready') return;
      } catch {
        /* keep polling */
      }
      if (!stop && tries < 120) window.setTimeout(tick, 6000);
    };
    tick();
    return () => {
      stop = true;
    };
  }, [order, k]);

  const host = data ? new URL(/^https?:/.test(data.site) ? data.site : `https://${data.site}`).hostname : '';
  const pdfHref = `/api/pro?action=pdf&order=${encodeURIComponent(order)}&k=${encodeURIComponent(k)}`;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <Eyebrow>
            {PRO_NAME} · {PRO_TAGLINE}
          </Eyebrow>
          {gone ? (
            <p className="text-lg text-slate-300">
              No encontramos este pedido. Si pagaste, escríbenos a contacto@universo693.com y lo resolvemos.
            </p>
          ) : !data ? (
            <p className="inline-flex items-center gap-3 text-lg text-slate-300">
              <Loader2 className="w-5 h-5 animate-spin" /> Revisando tu pedido…
            </p>
          ) : data.status === 'pending' ? (
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Esperando la confirmación del pago</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Apenas el medio de pago confirme, empezamos a preparar tu informe. Si pagaste por transferencia puede tardar unos minutos. Puedes dejar esta página abierta.
              </p>
              <p className="inline-flex items-center gap-3 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" /> Revisando…
              </p>
              <p className="text-sm text-slate-500">
                ¿Cancelaste el pago? <Link to="/audit-693#pro" className="text-cyan-300 hover:text-cyan-200">Volver a intentarlo</Link>.
              </p>
            </div>
          ) : data.status === 'ready' && data.report ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> Tu informe está listo
                </p>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                  Dónde pierde plata <span className="text-gradient-brand">{host}</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed">{data.report.executive_summary}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={pdfHref} className="inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-bold text-white">
                    <Download className="w-5 h-5" /> Descargar mi informe PDF
                  </a>
                </div>
                <p className="text-sm text-slate-500">También te lo enviamos a {data.email}.</p>
              </div>
              {data.manualCost && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center space-y-2">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Costo del trabajo manual, según tus datos</p>
                  <p className="text-4xl sm:text-5xl font-black text-gradient-brand">{money(data.manualCost.monthly, data.currency)} al mes</p>
                  <p className="text-slate-300">{money(data.manualCost.yearly, data.currency)} al año</p>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
                  <h2 className="font-extrabold text-white">{data.report.opportunities.length} oportunidades</h2>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {data.report.opportunities.slice(0, 5).map((o) => (
                      <li key={o.title}>• {o.title}</li>
                    ))}
                    {data.report.opportunities.length > 5 && <li className="text-slate-500">y más en el PDF…</li>}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
                  <h2 className="font-extrabold text-white">Tu competencia</h2>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {data.report.competitors.length ? data.report.competitors.map((c) => <li key={c.name}>• {c.name}</li>) : <li>Detalle en el PDF.</li>}
                  </ul>
                </div>
              </div>
              <div className="glow-card rounded-[2rem]">
                <div className="rounded-[calc(2rem-1px)] bg-[#060a14] p-8 space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    Este informe te mostró <span className="text-brand-500">DÓNDE</span> pierdes plata. Con el EBS 693 definimos cómo{' '}
                    <span className="text-cyan-300">RECUPERARLA</span> y lo implementamos contigo.
                  </h2>
                  <p className="text-lg text-slate-300">¿Partimos esta semana?</p>
                  <Link to="/diagnostico-ia" className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-extrabold text-white">
                    Agendar mi diagnóstico EBS 693
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ) : data.status === 'failed' ? (
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Estamos reintentando tu informe</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Tu pago está confirmado, pero la generación tuvo un problema. Lo estamos reintentando y el equipo ya fue avisado. Si no lo recibes en tu correo ({data.email}) en la próxima hora, te contactamos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Pago confirmado. Estamos preparando tu informe</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Estamos leyendo tu sitio, investigando tu competencia y priorizando oportunidades. Toma entre 2 y 4 minutos. Te llegará también a {data.email}.
              </p>
              <p className="inline-flex items-center gap-3 text-slate-300">
                <Loader2 className="w-5 h-5 animate-spin" /> Preparando…
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

type Providers = { mercadopago: boolean; paypal: boolean; priceClp: number; priceUsd: string };

export const Audit: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const [order, setOrder] = useState<{ order: string; k: string } | null>(null);
  const [form, setForm] = useState({ url: '', fullName: '', email: '', company: '', website: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; report: FreeReport } | null>(null);

  const [pro, setPro] = useState({ location: '', teamSize: '', manualHours: '', hourlyCost: '', mainPain: '', tools: '', competitors: '' });
  const [providers, setProviders] = useState<Providers | null>(null);
  const [paying, setPaying] = useState<null | 'mercadopago' | 'paypal'>(null);
  const [proError, setProError] = useState<string | null>(null);
  const proRef = useRef<HTMLElement>(null);

  // read the order from the URL after hydration (the prerendered page has no query string)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const id = q.get('pedido');
    const k = q.get('k');
    if (id && k) setOrder({ order: id, k });
    fetch('/api/pro?action=config')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setProviders(d))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 5000);
    return () => window.clearInterval(id);
  }, [loading]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onPro = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setPro((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'No pudimos completar el análisis.');
      setResult(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos completar el análisis.');
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (provider: 'mercadopago' | 'paypal') => {
    const formEl = proRef.current?.querySelector('form');
    if (formEl && !formEl.reportValidity()) return;
    setPaying(provider);
    setProError(null);
    try {
      const res = await fetch('/api/pro?action=checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...pro, provider }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.redirect) throw new Error(data?.error || 'No pudimos iniciar el pago.');
      window.location.href = data.redirect;
    } catch (err) {
      setProError(err instanceof Error ? err.message : 'No pudimos iniciar el pago.');
      setPaying(null);
    }
  };

  const goPro = () => {
    setResult(null);
    window.setTimeout(() => proRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  if (order) return <OrderView order={order.order} k={order.k} />;

  if (result) {
    const { report } = result;
    const host = new URL(result.url).hostname;
    return (
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            <header className="space-y-4">
              <Eyebrow>Audit 693 · gratis</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                3 oportunidades de IA para <span className="text-gradient-brand">{host}</span>
              </h1>
              <p className="text-sm font-semibold text-cyan-300">{report.industry}</p>
              <p className="text-lg text-slate-300 leading-relaxed">{report.business_summary}</p>
            </header>

            <ol className="space-y-4">
              {report.opportunities.map((o, i) => (
                <li key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-2">
                  <h2 className="text-xl font-extrabold text-white">
                    <span className="text-brand-500">{String(i + 1).padStart(2, '0')}</span> {o.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed">{o.why}</p>
                </li>
              ))}
            </ol>

            <div className="glow-card rounded-[2rem]">
              <div className="rounded-[calc(2rem-1px)] bg-[#060a14] p-8 space-y-5">
                <Eyebrow>
                  {PRO_NAME} · {PRO_TAGLINE}
                </Eyebrow>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Esto es solo la superficie. ¿Quieres saber dónde pierdes plata?</h2>
                <p className="text-slate-400 leading-relaxed">
                  El informe PRO revisa hasta 7 páginas de tu sitio, analiza a tu competencia, calcula el costo de tu trabajo manual con tus datos y prioriza 8 a 10 oportunidades. Lo recibes en PDF.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={goPro} className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-extrabold text-white cursor-pointer">
                    Quiero mi informe PRO · $19.990
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button onClick={() => setResult(null)} className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white cursor-pointer">
                    <RotateCcw className="w-4 h-4" /> Analizar otro sitio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const priceClp = `$${(providers?.priceClp ?? 19990).toLocaleString('es-CL')}`;
  const priceUsd = `USD ${Number(providers?.priceUsd ?? '21').toFixed(0)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-[#070f19] min-h-[80vh]">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
        <Container className="relative py-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-6 space-y-7">
            <Eyebrow>{es ? 'Audit 693 · gratis' : 'Audit 693 · free'}</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Descubre <span className="text-gradient-brand">3 oportunidades de IA</span> para tu empresa
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Ingresa tu sitio web y nuestra IA lo lee en menos de un minuto. Verás en pantalla tres oportunidades concretas para tu negocio.
            </p>
            <p className="text-slate-400">
              ¿Quieres el análisis completo, con tu competencia y en PDF?{' '}
              <a href="#pro" className="font-semibold text-cyan-300 hover:text-cyan-200">
                Conoce el {PRO_NAME} →
              </a>
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#0a1420]/80 backdrop-blur-md p-6 sm:p-10 space-y-5 shadow-xl shadow-black/30">
              <Field label="Sitio web de tu empresa *">
                <input name="url" required value={form.url} onChange={onChange} placeholder="tuempresa.cl" disabled={loading} className={inputClass} inputMode="url" />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nombre *">
                  <input name="fullName" required value={form.fullName} onChange={onChange} disabled={loading} className={inputClass} />
                </Field>
                <Field label="Correo *">
                  <input name="email" type="email" required value={form.email} onChange={onChange} disabled={loading} className={inputClass} />
                </Field>
              </div>
              <Field label="Empresa">
                <input name="company" value={form.company} onChange={onChange} disabled={loading} className={inputClass} />
              </Field>
              {/* honeypot: hidden from people, filled by bots */}
              <input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              {error && <div className="rounded-xl bg-red-950/40 border border-red-800/50 p-3 text-sm text-red-300">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-bold py-4 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {steps[step]}
                  </>
                ) : (
                  <>
                    Analizar mi sitio gratis
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                {loading ? 'Toma unos 20 segundos. No cierres esta página.' : 'Gratis. Tu información es confidencial y no la compartimos con terceros.'}
              </p>
            </form>
          </div>
        </Container>
      </section>

      <section id="pro" ref={proRef} className="py-20 sm:py-28 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <Eyebrow>{PRO_NAME}</Eyebrow>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
              {PRO_TAGLINE}: descubre <span className="text-gradient-brand">dónde pierdes plata</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Un informe en PDF que revisa tu sitio a fondo, analiza a tu competencia y calcula con tus propios datos cuánto te cuesta el trabajo manual. Por {priceClp} CLP ({priceUsd} fuera de Chile).
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full min-w-[480px] text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-sm">
                  <th className="p-4 font-bold text-slate-400" />
                  <th className="p-4 text-center font-bold text-slate-300">Gratis</th>
                  <th className="p-4 text-center font-extrabold text-white">
                    PRO <span className="block text-xs font-bold text-cyan-300">{priceClp}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-sm text-slate-300">{row.label}</td>
                    <td className="p-4 text-center">
                      <Cell v={row.free} />
                    </td>
                    <td className="p-4 text-center bg-brand-600/5">
                      <Cell v={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#0a1420]/80 p-6 sm:p-10 space-y-5"
          >
            <h3 className="text-xl font-extrabold text-white">Cuéntanos de tu empresa</h3>
            <p className="text-sm text-slate-400">Con estos datos el informe habla de tu negocio real, no de uno genérico.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Sitio web de tu empresa *">
                <input name="url" required value={form.url} onChange={onChange} placeholder="tuempresa.cl" className={inputClass} inputMode="url" />
              </Field>
              <Field label="Empresa">
                <input name="company" value={form.company} onChange={onChange} className={inputClass} />
              </Field>
              <Field label="Nombre *">
                <input name="fullName" required value={form.fullName} onChange={onChange} className={inputClass} />
              </Field>
              <Field label="Correo (ahí llega el PDF) *">
                <input name="email" type="email" required value={form.email} onChange={onChange} className={inputClass} />
              </Field>
              <Field label="¿Dónde vendes? *" hint="Ciudad y país. Lo usamos para buscar a tu competencia.">
                <input name="location" required value={pro.location} onChange={onPro} placeholder="Santiago, Chile" className={inputClass} />
              </Field>
              <Field label="Tamaño del equipo">
                <select name="teamSize" value={pro.teamSize} onChange={onPro} className={`${inputClass} [&>option]:bg-[#0a1420]`}>
                  <option value="">Selecciona…</option>
                  {['1-5 personas', '6-20 personas', '21-50 personas', '51-200 personas', 'Más de 200'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label="Horas a la semana en tareas manuales o repetitivas">
                <input name="manualHours" type="number" min={0} max={2000} value={pro.manualHours} onChange={onPro} placeholder="20" className={inputClass} />
              </Field>
              <Field label="Costo aproximado de una hora de trabajo" hint="En la moneda con que pagas (CLP o USD).">
                <input name="hourlyCost" type="number" min={0} value={pro.hourlyCost} onChange={onPro} placeholder="8000" className={inputClass} />
              </Field>
            </div>
            <Field label="¿Cuál es el problema que más te quita tiempo o ventas hoy?">
              <textarea name="mainPain" rows={3} value={pro.mainPain} onChange={onPro} className={inputClass} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Herramientas que usan hoy">
                <input name="tools" value={pro.tools} onChange={onPro} placeholder="Planillas, WhatsApp, ERP…" className={inputClass} />
              </Field>
              <Field label="Competidores que conoces (opcional)">
                <input name="competitors" value={pro.competitors} onChange={onPro} placeholder="empresa1.cl, empresa2.com" className={inputClass} />
              </Field>
            </div>

            {proError && <div className="rounded-xl bg-red-950/40 border border-red-800/50 p-3 text-sm text-red-300">{proError}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => checkout('mercadopago')}
                disabled={!!paying || (providers !== null && !providers.mercadopago)}
                className="inline-flex flex-col items-center justify-center rounded-2xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-4 text-white cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 font-extrabold">
                  {paying === 'mercadopago' && <Loader2 className="w-4 h-4 animate-spin" />}
                  Pagar {priceClp} CLP
                </span>
                <span className="text-xs text-white/80">
                  {providers && !providers.mercadopago ? 'Muy pronto' : 'Mercado Pago · tarjetas, débito y transferencia · Chile'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => checkout('paypal')}
                disabled={!!paying || (providers !== null && !providers.paypal)}
                className="inline-flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-4 text-white cursor-pointer"
              >
                <span className="inline-flex items-center gap-2 font-extrabold">
                  {paying === 'paypal' && <Loader2 className="w-4 h-4 animate-spin" />}
                  Pay {priceUsd}
                </span>
                <span className="text-xs text-slate-400">{providers && !providers.paypal ? 'Coming soon' : 'PayPal · outside Chile'}</span>
              </button>
            </div>
            <p className="inline-flex items-start gap-2 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-px" />
              Pago seguro en Mercado Pago o PayPal: no vemos ni guardamos los datos de tu tarjeta. El informe llega a tu correo entre 2 y 4 minutos después del pago. Es un servicio distinto del diagnóstico EBS 693.
            </p>
            <input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          </form>

          <p className="mt-10 text-center text-slate-400">
            <Sparkles className="inline w-4 h-4 text-cyan-300 mr-1" />
            ¿Prefieres hablar directo con el equipo?{' '}
            <Link to="/diagnostico-ia" className="font-semibold text-cyan-300 hover:text-cyan-200">
              Diagnóstico EBS 693 →
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
};
