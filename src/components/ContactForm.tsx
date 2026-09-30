import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2 } from 'lucide-react';
import { useLang } from '../lib/lang';
import { interestOptions } from '../data/site';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterest: string;
  budget: string;
  notes: string;
}

const emptyForm = (interest: string): FormData => ({
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  serviceInterest: interest,
  budget: '',
  notes: '',
});

const budgets = [
  { value: '', es: 'Prefiero conversarlo', en: "I'd rather discuss it" },
  { value: '< $3,000', es: 'Menos de USD 3.000', en: 'Under USD 3,000' },
  { value: '$3,000 - $10,000', es: 'USD 3.000 – 10.000', en: 'USD 3,000 – 10,000' },
  { value: '$10,000 - $30,000', es: 'USD 10.000 – 30.000', en: 'USD 10,000 – 30,000' },
  { value: '$30,000+', es: 'Más de USD 30.000', en: 'Over USD 30,000' },
];

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-brand-600/20';

export const ContactForm: React.FC = () => {
  const { lang, tr } = useLang();
  const [params] = useSearchParams();
  // Arriving from the EBS 693 button preselects the diagnosis (last option).
  const initialInterest = params.get('interes') === 'ebs' ? interestOptions[interestOptions.length - 1] : interestOptions[0];
  const [form, setForm] = useState<FormData>(emptyForm(tr(initialInterest)));
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const es = lang === 'es';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setSent(true);
    } catch {
      setError(
        es
          ? 'No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp al +56 9 9038 7414.'
          : 'We could not send your request. Please try again or message us on WhatsApp at +56 9 9038 7414.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[#0a1420]/80 backdrop-blur-md p-10 text-center space-y-5 shadow-xl shadow-slate-900/5">
        <CheckCircle2 className="w-14 h-14 text-cyan-300 mx-auto" />
        <h3 className="text-2xl font-extrabold text-white">{es ? '¡Solicitud recibida!' : 'Request received!'}</h3>
        <p className="text-slate-400 max-w-md mx-auto">
          {es
            ? 'Gracias por escribirnos. Un especialista revisará tu caso y te contactará en menos de 2 horas.'
            : 'Thanks for reaching out. A specialist will review your case and contact you within 2 hours.'}
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm(emptyForm(tr(interestOptions[0])));
          }}
          className="text-sm font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer"
        >
          {es ? 'Enviar otra solicitud' : 'Send another request'}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-[#0a1420]/80 backdrop-blur-md p-6 sm:p-10 space-y-5 shadow-xl shadow-slate-900/5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold text-slate-300">{es ? 'Nombre completo *' : 'Full name *'}</span>
          <input name="fullName" required value={form.fullName} onChange={handleChange} className={inputClass} />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold text-slate-300">{es ? 'Correo corporativo *' : 'Work email *'}</span>
          <input name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold text-slate-300">{es ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}</span>
          <input name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold text-slate-300">{es ? 'Empresa / sitio web' : 'Company / website'}</span>
          <input name="companyName" value={form.companyName} onChange={handleChange} className={inputClass} />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold text-slate-300">{es ? '¿Qué necesitas?' : 'What do you need?'}</span>
          <select name="serviceInterest" value={form.serviceInterest} onChange={handleChange} className={inputClass}>
            {interestOptions.map((o) => (
              <option key={o.es} value={tr(o)}>
                {tr(o)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5 block">
          <span className="text-xs font-bold text-slate-300">{es ? 'Inversión estimada' : 'Estimated investment'}</span>
          <select name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
            {budgets.map((b) => (
              <option key={b.es} value={b.value}>
                {es ? b.es : b.en}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-1.5 block">
        <span className="text-xs font-bold text-slate-300">{es ? 'Cuéntanos sobre tu proyecto' : 'Tell us about your project'}</span>
        <textarea name="notes" rows={4} value={form.notes} onChange={handleChange} className={`${inputClass} resize-none`} />
      </label>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">{error}</div>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold py-4 transition-colors cursor-pointer"
      >
        {submitting ? (
          es ? 'Enviando...' : 'Sending...'
        ) : (
          <>
            <Send className="w-4 h-4" />
            {es ? 'Enviar solicitud' : 'Send request'}
          </>
        )}
      </button>
      <p className="text-[11px] text-slate-400 text-center">
        {es ? 'Tu información es confidencial y no la compartimos con terceros.' : 'Your information is confidential and never shared with third parties.'}
      </p>
    </form>
  );
};
