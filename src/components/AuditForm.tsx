import React, { useState, useEffect } from 'react';
import { Language, AuditFormData } from '../types';
import { siteUiText } from '../data/content';
import { Send, CheckCircle2, Calendar, Sparkles, Clock, ShieldCheck, PhoneCall } from 'lucide-react';

interface AuditFormProps {
  lang: Language;
  selectedPlan: string | null;
}

export const AuditForm: React.FC<AuditFormProps> = ({ lang, selectedPlan }) => {
  const t = siteUiText[lang];

  const [formData, setFormData] = useState<AuditFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    serviceInterest: selectedPlan ? `Plan: ${selectedPlan}` : t.formOption1,
    budget: '$1,000 - $3,000',
    preferredDate: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        serviceInterest: `Plan: ${selectedPlan}`
      }));
    }
  }, [selectedPlan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate real submission network call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      website: '',
      serviceInterest: t.formOption1,
      budget: '$1,000 - $3,000',
      preferredDate: '',
      notes: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Value Prop & Trust */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{lang === 'en' ? 'STRATEGY SESSION' : 'SESIÓN ESTRATÉGICA'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {t.formHeading}
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                {t.formSubheading}
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-purple-900/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/50 text-purple-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'en' ? '30-Min High-Impact Audit' : 'Auditoría de Alto Impacto en 30 Min'}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {lang === 'en' ? 'We map out your manual repetitive processes and show exact automation potential.' : 'Mapeamos tus procesos manuales y mostramos el potencial exacto de automatización.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-purple-900/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/50 text-purple-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'en' ? 'Live Prototype Preview' : 'Prototipo en Vivo en la Sesión'}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {lang === 'en' ? 'Watch an AI Agent trained on sample docs answer real client queries live.' : 'Mira un Agente de IA entrenado responder consultas reales en tiempo real.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-purple-900/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-900/50 text-purple-400 shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {lang === 'en' ? 'Fast Response Time' : 'Respuesta en Menos de 2 Horas'}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {lang === 'en' ? 'Our senior AI engineering team will email or WhatsApp your calendar invite.' : 'Nuestro equipo de ingeniería de IA te enviará la invitación a tu calendario.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact info */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/60 to-black border border-purple-800/40 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                {lang === 'en' ? 'DIRECT AGENCY INQUIRIES' : 'CONTACTO DIRECTO DE AGENCIA'}
              </span>
              <p className="text-sm font-mono text-zinc-200">contact@uni-verso693.ai</p>
              <p className="text-xs text-zinc-400">WhatsApp 24/7: +1 (800) 693-AI-AGENT</p>
            </div>

          </div>

          {/* Right Column: Form or Confirmation */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-zinc-950 border border-purple-800/50 p-6 sm:p-10 shadow-2xl shadow-purple-950/80 glow-purple">
              
              {isSubmitted ? (
                /* Success State Card */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-purple-900/60 border border-purple-500/50 text-purple-300 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-white">{t.formSuccessTitle}</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {t.formSuccessDesc}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black border border-zinc-800 text-xs text-zinc-400 text-left space-y-1 font-mono max-w-sm mx-auto">
                    <div><strong className="text-purple-300">Name:</strong> {formData.fullName}</div>
                    <div><strong className="text-purple-300">Email:</strong> {formData.email}</div>
                    <div><strong className="text-purple-300">Interest:</strong> {formData.serviceInterest}</div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-600/50 text-purple-200 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    {t.formBtnNewRequest}
                  </button>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">{t.formLabelName}</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'Alex Morgan' : 'Carlos Mendoza'}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">{t.formLabelEmail}</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Phone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">{t.formLabelPhone}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                      />
                    </div>

                    {/* Company / Website */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">{t.formLabelCompany}</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Acme SaaS / acme.com"
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                      />
                    </div>

                  </div>

                  {/* Service Interest */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">{t.formLabelInterest}</label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                    >
                      <option value={t.formOption1}>{t.formOption1}</option>
                      <option value={t.formOption2}>{t.formOption2}</option>
                      <option value={t.formOption5}>{t.formOption5}</option>
                      <option value={t.formOption6}>{t.formOption6}</option>
                      <option value={t.formOption3}>{t.formOption3}</option>
                      <option value={t.formOption4}>{t.formOption4}</option>
                      {selectedPlan && <option value={`Plan: ${selectedPlan}`}>{`Plan: ${selectedPlan}`}</option>}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Budget */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">{t.formLabelBudget}</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                      >
                        <option value="Under $1,000">&lt; $1,000 USD</option>
                        <option value="$1,000 - $3,000">$1,000 - $3,000 USD</option>
                        <option value="$3,000 - $10,000">$3,000 - $10,000 USD</option>
                        <option value="$10,000+">$10,000+ USD (Enterprise)</option>
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{t.formLabelDate}</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm"
                      />
                    </div>

                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">{t.formLabelNotes}</label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={lang === 'en' ? 'Describe your main goals or questions...' : 'Describe tus metas principales o preguntas...'}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 focus:border-purple-500 focus:outline-none text-white text-sm resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t.formSubmitting}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.formBtnSubmit}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center">
                    🔒 {lang === 'en' ? '100% confidential. No spam guarantee.' : '100% confidencial. Garantía cero spam.'}
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
