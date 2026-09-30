import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Download, Loader2, Lock, RotateCcw, Sparkles, X } from 'lucide-react';
import { useLang, type Language } from '../lib/lang';
import { Container, Eyebrow } from '../components/ui';
import { ParticleField } from '../components/effects';
import { auditFaqs } from '../data/audit';

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
const tagline = (lang: Language) => (lang === 'es' ? 'Informe de Fugas de Dinero' : 'Money Leak Report');

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

type Row = { label: [string, string]; free: boolean | [string, string]; pro: boolean | [string, string] };
const comparison: Row[] = [
  { label: ['Oportunidades de IA', 'AI opportunities'], free: ['3, en una línea', '3, one line each'], pro: ['8 a 10, priorizadas', '8 to 10, prioritised'] },
  { label: ['Páginas de tu sitio analizadas', 'Pages of your site analysed'], free: ['Portada', 'Home page'], pro: ['Hasta 7', 'Up to 7'] },
  { label: ['Tu sitio como canal de venta', 'Your site as a sales channel'], free: false, pro: true },
  { label: ['Análisis de tu competencia', 'Competitor analysis'], free: false, pro: true },
  { label: ['Costo del trabajo manual con tus datos', 'Cost of manual work, with your numbers'], free: false, pro: true },
  { label: ['Impacto y esfuerzo de cada oportunidad', 'Impact and effort of each opportunity'], free: false, pro: true },
  { label: ['Informe PDF en tu correo', 'PDF report by email'], free: false, pro: true },
];

const Cell: React.FC<{ v: boolean | [string, string]; es: boolean }> = ({ v, es }) =>
  Array.isArray(v) ? (
    <span className="text-sm text-slate-200">{es ? v[0] : v[1]}</span>
  ) : v ? (
    <Check className="w-5 h-5 text-emerald-300 mx-auto" aria-label={es ? 'Incluido' : 'Included'} />
  ) : (
    <X className="w-5 h-5 text-slate-600 mx-auto" aria-label={es ? 'No incluido' : 'Not included'} />
  );

/** Order page after checkout: /audit-693?pedido=…&k=… */
const OrderView: React.FC<{ order: string; k: string }> = ({ order, k }) => {
  const { lang } = useLang();
  const es = lang === 'es';
  const t = (a: string, b: string) => (es ? a : b);
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
            {PRO_NAME} · {tagline(lang)}
          </Eyebrow>
          {gone ? (
            <p className="text-lg text-slate-300">
              {t(
                'No encontramos este pedido. Si pagaste, escríbenos a contacto@universo693.com y lo resolvemos.',
                'We couldn’t find this order. If you paid, email contacto@universo693.com and we’ll sort it out.',
              )}
            </p>
          ) : !data ? (
            <p className="inline-flex items-center gap-3 text-lg text-slate-300">
              <Loader2 className="w-5 h-5 animate-spin" /> {t('Revisando tu pedido…', 'Checking your order…')}
            </p>
          ) : data.status === 'pending' ? (
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">{t('Esperando la confirmación del pago', 'Waiting for payment confirmation')}</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                {t(
                  'Apenas el medio de pago confirme, empezamos a preparar tu informe. Si pagaste por transferencia puede tardar unos minutos. Puedes dejar esta página abierta.',
                  'As soon as the payment is confirmed we start preparing your report. Some payment methods take a few minutes. You can leave this page open.',
                )}
              </p>
              <p className="inline-flex items-center gap-3 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" /> {t('Revisando…', 'Checking…')}
              </p>
              <p className="text-sm text-slate-500">
                {t('¿Cancelaste el pago?', 'Cancelled the payment?')}{' '}
                <Link to="/audit-693#pro" className="text-cyan-300 hover:text-cyan-200">
                  {t('Volver a intentarlo', 'Try again')}
                </Link>
                .
              </p>
            </div>
          ) : data.status === 'ready' && data.report ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> {t('Tu informe está listo', 'Your report is ready')}
                </p>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                  {t('Dónde pierde plata', 'Where the money leaks at')} <span className="text-gradient-brand">{host}</span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed">{data.report.executive_summary}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={pdfHref} className="inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-bold text-white">
                    <Download className="w-5 h-5" /> {t('Descargar mi informe PDF', 'Download my PDF report')}
                  </a>
                </div>
                <p className="text-sm text-slate-500">
                  {t('También te lo enviamos a', 'We also sent it to')} {data.email}.
                </p>
              </div>
              {data.manualCost && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center space-y-2">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{t('Costo del trabajo manual, según tus datos', 'Cost of manual work, from your numbers')}</p>
                  <p className="text-4xl sm:text-5xl font-black text-gradient-brand">
                    {money(data.manualCost.monthly, data.currency)} {t('al mes', 'per month')}
                  </p>
                  <p className="text-slate-300">
                    {money(data.manualCost.yearly, data.currency)} {t('al año', 'per year')}
                  </p>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
                  <h2 className="font-extrabold text-white">
                    {data.report.opportunities.length} {t('oportunidades', 'opportunities')}
                  </h2>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {data.report.opportunities.slice(0, 5).map((o) => (
                      <li key={o.title}>• {o.title}</li>
                    ))}
                    {data.report.opportunities.length > 5 && <li className="text-slate-500">{t('y más en el PDF…', 'and more in the PDF…')}</li>}
                  </ul>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
                  <h2 className="font-extrabold text-white">{t('Tu competencia', 'Your competitors')}</h2>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    {data.report.competitors.length ? (
                      data.report.competitors.map((c) => <li key={c.name}>• {c.name}</li>)
                    ) : (
                      <li>{t('Detalle en el PDF.', 'Details in the PDF.')}</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="glow-card rounded-[2rem]">
                <div className="rounded-[calc(2rem-1px)] bg-[#060a14] p-8 space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {es ? (
                      <>
                        Este informe te mostró <span className="text-brand-500">DÓNDE</span> pierdes plata. Con el EBS 693 definimos cómo{' '}
                        <span className="text-cyan-300">RECUPERARLA</span> y lo implementamos contigo.
                      </>
                    ) : (
                      <>
                        This report showed you <span className="text-brand-500">WHERE</span> you’re losing money. With EBS 693 we define how to{' '}
                        <span className="text-cyan-300">WIN IT BACK</span> and implement it with you.
                      </>
                    )}
                  </h2>
                  <p className="text-lg text-slate-300">{t('¿Partimos esta semana?', 'Shall we start this week?')}</p>
                  <Link to="/diagnostico-ia" className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-extrabold text-white">
                    {t('Agendar mi diagnóstico EBS 693', 'Book my EBS 693 diagnosis')}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ) : data.status === 'failed' ? (
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">{t('Estamos reintentando tu informe', 'We’re retrying your report')}</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                {es
                  ? `Tu pago está confirmado, pero la generación tuvo un problema. Lo estamos reintentando y el equipo ya fue avisado. Si no lo recibes en tu correo (${data.email}) en la próxima hora, te contactamos.`
                  : `Your payment is confirmed, but generating the report ran into a problem. We’re retrying and the team has been notified. If it doesn’t reach your inbox (${data.email}) within the hour, we’ll contact you.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {t('Pago confirmado. Estamos preparando tu informe', 'Payment confirmed. We’re preparing your report')}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                {es
                  ? `Estamos leyendo tu sitio, investigando tu competencia y priorizando oportunidades. Toma entre 2 y 4 minutos. Te llegará también a ${data.email}.`
                  : `We’re reading your site, researching your competitors and prioritising opportunities. It takes 2 to 4 minutes. It will also be sent to ${data.email}.`}
              </p>
              <p className="inline-flex items-center gap-3 text-slate-300">
                <Loader2 className="w-5 h-5 animate-spin" /> {t('Preparando…', 'Preparing…')}
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
  const { lang, tr } = useLang();
  const es = lang === 'es';
  const t = (a: string, b: string) => (es ? a : b);
  const steps = es
    ? ['Leyendo tu sitio…', 'Entendiendo tu negocio…', 'Buscando oportunidades de IA…', 'Preparando el resultado…']
    : ['Reading your site…', 'Understanding your business…', 'Looking for AI opportunities…', 'Preparing the result…'];
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
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, 3)), 5000);
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
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || t('No pudimos completar el análisis.', 'We couldn’t complete the analysis.'));
      setResult(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('No pudimos completar el análisis.', 'We couldn’t complete the analysis.'));
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
        body: JSON.stringify({ ...form, ...pro, provider, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.redirect) throw new Error(data?.error || t('No pudimos iniciar el pago.', 'We couldn’t start the payment.'));
      window.location.href = data.redirect;
    } catch (err) {
      setProError(err instanceof Error ? err.message : t('No pudimos iniciar el pago.', 'We couldn’t start the payment.'));
      setPaying(null);
    }
  };

  const goPro = () => {
    setResult(null);
    window.setTimeout(() => proRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  if (order) return <OrderView order={order.order} k={order.k} />;

  const priceClp = `$${(providers?.priceClp ?? 19990).toLocaleString('es-CL')}`;
  const priceUsd = `USD ${Number(providers?.priceUsd ?? '21').toFixed(0)}`;
  // the headline price follows the visitor's language: CLP in Spanish, USD in English
  const mainPrice = es ? `${priceClp} CLP` : priceUsd;

  if (result) {
    const { report } = result;
    const host = new URL(result.url).hostname;
    return (
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            <header className="space-y-4">
              <Eyebrow>{t('Audit 693 · gratis', 'Audit 693 · free')}</Eyebrow>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
                {t('3 oportunidades de IA para', '3 AI opportunities for')} <span className="text-gradient-brand">{host}</span>
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
                  {PRO_NAME} · {tagline(lang)}
                </Eyebrow>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {t('Esto es solo la superficie. ¿Quieres saber dónde pierdes plata?', 'This is just the surface. Want to know where you’re losing money?')}
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {t(
                    'El informe PRO revisa hasta 7 páginas de tu sitio, analiza a tu competencia, calcula el costo de tu trabajo manual con tus datos y prioriza 8 a 10 oportunidades. Lo recibes en PDF.',
                    'The PRO report reviews up to 7 pages of your site, analyses your competitors, calculates the cost of your manual work from your own numbers and prioritises 8 to 10 opportunities. Delivered as a PDF.',
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={goPro} className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-4 font-extrabold text-white cursor-pointer">
                    {t('Quiero mi informe PRO', 'Get my PRO report')} · {mainPrice}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button onClick={() => setResult(null)} className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white cursor-pointer">
                    <RotateCcw className="w-4 h-4" /> {t('Analizar otro sitio', 'Analyse another site')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const mpButton = (
    <button
      key="mp"
      type="button"
      onClick={() => checkout('mercadopago')}
      disabled={!!paying || (providers !== null && !providers.mercadopago)}
      className={`inline-flex flex-col items-center justify-center rounded-2xl px-5 py-4 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        es ? 'bg-brand-600 hover:bg-brand-700' : 'border border-white/20 bg-white/5 hover:bg-white/10'
      }`}
    >
      <span className="inline-flex items-center gap-2 font-extrabold">
        {paying === 'mercadopago' && <Loader2 className="w-4 h-4 animate-spin" />}
        {t('Pagar', 'Pay')} {priceClp} CLP
      </span>
      <span className={`text-xs ${es ? 'text-white/80' : 'text-slate-400'}`}>
        {providers && !providers.mercadopago ? t('Muy pronto', 'Coming soon') : t('Mercado Pago · tarjetas y débito · Chile', 'Mercado Pago · cards · Chile')}
      </span>
    </button>
  );
  const paypalButton = (
    <button
      key="pp"
      type="button"
      onClick={() => checkout('paypal')}
      disabled={!!paying || (providers !== null && !providers.paypal)}
      className={`inline-flex flex-col items-center justify-center rounded-2xl px-5 py-4 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        es ? 'border border-white/20 bg-white/5 hover:bg-white/10' : 'bg-brand-600 hover:bg-brand-700'
      }`}
    >
      <span className="inline-flex items-center gap-2 font-extrabold">
        {paying === 'paypal' && <Loader2 className="w-4 h-4 animate-spin" />}
        {t('Pagar', 'Pay')} {priceUsd}
      </span>
      <span className={`text-xs ${es ? 'text-slate-400' : 'text-white/80'}`}>
        {providers && !providers.paypal ? t('Muy pronto', 'Coming soon') : t('PayPal · fuera de Chile', 'PayPal · outside Chile')}
      </span>
    </button>
  );

  return (
    <>
      <section className="relative overflow-hidden bg-[#070f19] min-h-[80vh]">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
        <Container className="relative py-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-6 space-y-7">
            <Eyebrow>{t('Audit 693 · gratis', 'Audit 693 · free')}</Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
              {es ? (
                <>
                  Descubre <span className="text-gradient-brand">3 oportunidades de IA</span> para tu empresa
                </>
              ) : (
                <>
                  Discover <span className="text-gradient-brand">3 AI opportunities</span> for your business
                </>
              )}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {t(
                'Ingresa tu sitio web y nuestra IA lo lee en menos de un minuto. Verás en pantalla tres oportunidades concretas para tu negocio.',
                'Enter your website and our AI reads it in under a minute. You’ll see three concrete opportunities for your business on screen.',
              )}
            </p>
            <p className="text-slate-400">
              {t('¿Quieres el análisis completo, con tu competencia y en PDF?', 'Want the full analysis, with your competitors, as a PDF?')}{' '}
              <a href="#pro" className="font-semibold text-cyan-300 hover:text-cyan-200">
                {t('Conoce el', 'See')} {PRO_NAME} →
              </a>
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#0a1420]/80 backdrop-blur-md p-6 sm:p-10 space-y-5 shadow-xl shadow-black/30">
              <Field label={t('Sitio web de tu empresa *', 'Your company website *')}>
                <input name="url" required value={form.url} onChange={onChange} placeholder={t('tuempresa.cl', 'yourcompany.com')} disabled={loading} className={inputClass} inputMode="url" />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={t('Nombre *', 'Name *')}>
                  <input name="fullName" required value={form.fullName} onChange={onChange} disabled={loading} className={inputClass} />
                </Field>
                <Field label={t('Correo *', 'Email *')}>
                  <input name="email" type="email" required value={form.email} onChange={onChange} disabled={loading} className={inputClass} />
                </Field>
              </div>
              <Field label={t('Empresa', 'Company')}>
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
                    {t('Analizar mi sitio gratis', 'Analyse my site for free')}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                {loading
                  ? t('Toma unos 20 segundos. No cierres esta página.', 'It takes about 20 seconds. Don’t close this page.')
                  : t('Gratis. Tu información es confidencial y no la compartimos con terceros.', 'Free. Your information is confidential and never shared with third parties.')}
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
              {es ? (
                <>
                  Informe de Fugas de Dinero: descubre <span className="text-gradient-brand">dónde pierdes plata</span>
                </>
              ) : (
                <>
                  Money Leak Report: find out <span className="text-gradient-brand">where you’re losing money</span>
                </>
              )}
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              {es
                ? `Un informe en PDF que revisa tu sitio a fondo, analiza a tu competencia y calcula con tus propios datos cuánto te cuesta el trabajo manual. Por ${priceClp} CLP (${priceUsd} fuera de Chile).`
                : `A PDF report that reviews your site in depth, analyses your competitors and uses your own numbers to calculate what manual work costs you. ${priceUsd} (${priceClp} CLP in Chile).`}
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full min-w-[480px] text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-sm">
                  <th className="p-4 font-bold text-slate-400" />
                  <th className="p-4 text-center font-bold text-slate-300">{t('Gratis', 'Free')}</th>
                  <th className="p-4 text-center font-extrabold text-white">
                    PRO <span className="block text-xs font-bold text-cyan-300">{mainPrice}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label[0]} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-sm text-slate-300">{es ? row.label[0] : row.label[1]}</td>
                    <td className="p-4 text-center">
                      <Cell v={row.free} es={es} />
                    </td>
                    <td className="p-4 text-center bg-brand-600/5">
                      <Cell v={row.pro} es={es} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mt-12 max-w-3xl mx-auto rounded-3xl border border-white/10 bg-[#0a1420]/80 p-6 sm:p-10 space-y-5">
            <h3 className="text-xl font-extrabold text-white">{t('Cuéntanos de tu empresa', 'Tell us about your business')}</h3>
            <p className="text-sm text-slate-400">
              {t('Con estos datos el informe habla de tu negocio real, no de uno genérico.', 'With this, the report talks about your actual business, not a generic one.')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={t('Sitio web de tu empresa *', 'Your company website *')}>
                <input name="url" required value={form.url} onChange={onChange} placeholder={t('tuempresa.cl', 'yourcompany.com')} className={inputClass} inputMode="url" />
              </Field>
              <Field label={t('Empresa', 'Company')}>
                <input name="company" value={form.company} onChange={onChange} className={inputClass} />
              </Field>
              <Field label={t('Nombre *', 'Name *')}>
                <input name="fullName" required value={form.fullName} onChange={onChange} className={inputClass} />
              </Field>
              <Field label={t('Correo (ahí llega el PDF) *', 'Email (the PDF goes here) *')}>
                <input name="email" type="email" required value={form.email} onChange={onChange} className={inputClass} />
              </Field>
              <Field label={t('¿Dónde vendes? *', 'Where do you sell? *')} hint={t('Ciudad y país. Lo usamos para buscar a tu competencia.', 'City and country. We use it to find your competitors.')}>
                <input name="location" required value={pro.location} onChange={onPro} placeholder={t('Santiago, Chile', 'Miami, USA')} className={inputClass} />
              </Field>
              <Field label={t('Tamaño del equipo', 'Team size')}>
                <select name="teamSize" value={pro.teamSize} onChange={onPro} className={`${inputClass} [&>option]:bg-[#0a1420]`}>
                  <option value="">{t('Selecciona…', 'Select…')}</option>
                  {(es
                    ? ['1-5 personas', '6-20 personas', '21-50 personas', '51-200 personas', 'Más de 200']
                    : ['1-5 people', '6-20 people', '21-50 people', '51-200 people', 'More than 200']
                  ).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <Field label={t('Horas a la semana en tareas manuales o repetitivas', 'Hours per week on manual or repetitive tasks')}>
                <input name="manualHours" type="number" min={0} max={2000} value={pro.manualHours} onChange={onPro} placeholder="20" className={inputClass} />
              </Field>
              <Field label={t('Costo aproximado de una hora de trabajo', 'Approximate cost of one hour of work')} hint={t('En la moneda con que pagas (CLP o USD).', 'In the currency you pay with (USD or CLP).')}>
                <input name="hourlyCost" type="number" min={0} value={pro.hourlyCost} onChange={onPro} placeholder={es ? '8000' : '25'} className={inputClass} />
              </Field>
            </div>
            <Field label={t('¿Cuál es el problema que más te quita tiempo o ventas hoy?', 'What’s the problem costing you the most time or sales today?')}>
              <textarea name="mainPain" rows={3} value={pro.mainPain} onChange={onPro} className={inputClass} />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={t('Herramientas que usan hoy', 'Tools you use today')}>
                <input name="tools" value={pro.tools} onChange={onPro} placeholder={t('Planillas, WhatsApp, ERP…', 'Spreadsheets, WhatsApp, CRM…')} className={inputClass} />
              </Field>
              <Field label={t('Competidores que conoces (opcional)', 'Competitors you know (optional)')}>
                <input name="competitors" value={pro.competitors} onChange={onPro} placeholder={t('empresa1.cl, empresa2.com', 'company1.com, company2.com')} className={inputClass} />
              </Field>
            </div>

            {proError && <div className="rounded-xl bg-red-950/40 border border-red-800/50 p-3 text-sm text-red-300">{proError}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">{es ? [mpButton, paypalButton] : [paypalButton, mpButton]}</div>
            <p className="inline-flex items-start gap-2 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-px" />
              {t(
                'Pago seguro en Mercado Pago o PayPal: no vemos ni guardamos los datos de tu tarjeta. El informe llega a tu correo entre 2 y 4 minutos después del pago. Es un servicio distinto del diagnóstico EBS 693.',
                'Secure payment with PayPal or Mercado Pago: we never see or store your card details. The report reaches your inbox 2 to 4 minutes after payment. It’s a separate service from the EBS 693 diagnosis.',
              )}
            </p>
            <input name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          </form>

          <p className="mt-10 text-center text-slate-400">
            <Sparkles className="inline w-4 h-4 text-cyan-300 mr-1" />
            {t('¿Prefieres hablar directo con el equipo?', 'Prefer to talk to the team directly?')}{' '}
            <Link to="/diagnostico-ia" className="font-semibold text-cyan-300 hover:text-cyan-200">
              {t('Diagnóstico EBS 693 →', 'EBS 693 diagnosis →')}
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-t border-white/5 py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{t('Preguntas frecuentes sobre el Audit 693', 'Audit 693 FAQ')}</h2>
            <div className="divide-y divide-white/10">
              {auditFaqs.map((f) => (
                <details key={f.q.es} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-bold text-white">
                    {tr(f.q)}
                    <span className="text-2xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-slate-400 leading-relaxed">{tr(f.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
