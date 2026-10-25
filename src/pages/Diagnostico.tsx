import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowDown, ArrowRight, Calculator, CalendarDays, Check, Clock3, Cpu, FileText, GitCompareArrows, Layers, Lock, MonitorPlay, Receipt, SlidersHorizontal, Sparkles, Target, TrendingUp, Truck, Video, Wallet, Zap } from 'lucide-react';
import { useLang } from '../lib/lang';
import { CALENDLY_URL, ebs, whatsappLink } from '../data/site';
import EbsDemoAnim from '../components/EbsDemoAnim';
import { EbsDiagramAnim, EbsLiveAnim } from '../components/EbsDemoMore';
import { ebsDelivers, ebsFaqs, ebsForWho, ebsIncludes, ebsSteps, ebsTech, ebsVideo } from '../data/ebs';
import { Container, Eyebrow, SectionHeading } from '../components/ui';
import { ParticleField } from '../components/effects';
import { SymptomChecklist, LossCalculator } from '../components/LossTools';

const BookButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang } = useLang();
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-8 py-5 text-base font-extrabold text-white shadow-xl shadow-brand-600/40 transition-colors ${className}`}
    >
      <CalendarDays className="w-5 h-5" />
      {lang === 'es' ? 'Agendar mi diagnóstico EBS 693' : 'Book my EBS 693 diagnosis'}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
};

/** Dedicated landing for the paid EBS 693 diagnosis, so it can rank on its own. */
export const Diagnostico: React.FC = () => {
  const { lang, tr, trList } = useLang();
  const es = lang === 'es';
  const t = (esText: string, enText: string) => (es ? esText : enText);
  const whatsappHref = whatsappLink(t('Hola, quiero consultar por el diagnóstico EBS 693.', 'Hi, I have a question about the EBS 693 diagnosis.'));

  return (
    <>
      <section className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <ParticleField className="absolute inset-0 opacity-40 pointer-events-none" />
        <Container className="relative py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <Eyebrow>
              {ebs.name} · {t('la anti-consultoría', 'the anti-consultancy')}
            </Eyebrow>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
              {es ? (
                <>
                  Un diagnóstico de IA que <span className="text-gradient-brand">no termina en un PDF</span>
                </>
              ) : (
                <>
                  An AI diagnosis that <span className="text-gradient-brand">doesn’t end in a PDF</span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {t(
                'Revisamos tu operación con tus propios números y te entregamos un espacio interactivo privado donde tu equipo activa cada solución y ve, al instante, cuánto se recupera, cuánto cuesta y en cuánto se paga.',
                'We review your operation using your own numbers and give you a private interactive space where your team switches each solution on and instantly sees what it recovers, what it costs and how fast it pays back.',
              )}
            </p>
            {/* the price card holds the single primary CTA; this side offers a different, lighter action */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#calculadora"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors"
              >
                <Calculator className="w-4 h-4 text-cyan-300" />
                {t('Calcula cuánto pierdes', 'Calculate what you’re losing')}
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-400 hover:text-white">
                  {t('¿Dudas? Escríbenos por WhatsApp →', 'Questions? Message us on WhatsApp →')}
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="glow-card rounded-[2rem]">
              <div className="rounded-[calc(2rem-1px)] bg-[#060a14] p-8 space-y-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{t('Diagnóstico estratégico', 'Strategic diagnosis')}</p>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tight whitespace-nowrap">{es ? ebs.price : 'CLP 197,000'}</p>
                <ul className="space-y-3 text-left text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <Clock3 className="w-4 h-4 text-cyan-300" /> {t('Sesión de 45 minutos', '45-minute session')}
                  </li>
                  <li className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-cyan-300" /> {t('Remota, por Google Meet', 'Remote, on Google Meet')}
                  </li>
                  <li className="flex items-center gap-3">
                    <Receipt className="w-4 h-4 text-cyan-300" /> {t('Se descuenta del proyecto si avanzas', 'Credited to the project if you move forward')}
                  </li>
                </ul>
                <BookButton className="w-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Explicación Aterrizada: ¿Qué es el Diagnóstico EBS y para qué le sirve a tu empresa? */}
      <section className="py-20 bg-gradient-to-b from-[#070f19] to-[#040810] border-b border-white/10 relative">
        <Container className="space-y-12">
          <SectionHeading
            center
            eyebrow={t('En palabras simples', 'In plain words')}
            title={t('¿Qué es el Diagnóstico EBS 693 y para qué le sirve a tu empresa?', 'What is the EBS 693 Diagnosis and how does it help your business?')}
            subtitle={t(
              'Pensado para dueños de empresas, transporte, distribución o servicios que quieren modernizarse sin enredarse en tecnicismos.',
              'Designed for business owners, transport, distribution, or services who want to modernize without tech jargon.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center text-xl font-black">
                1
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {t('¿Qué es? Una radiografía, no una venta', 'What is it? An operational x-ray, not a sales pitch')}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t(
                  'No venimos a venderte un software empaquetado que no necesitas ni a llenarte de palabras difíciles. Nos sentamos contigo 45 minutos a revisar cómo opera tu negocio hoy: qué tareas se hacen a mano en Excel o papel (como guías de despacho, cotizaciones, llamadas repetitivas o control de personal) y dónde se te está yendo la plata y el tiempo sin darte cuenta.',
                  'We are not here to sell generic software you do not need or overwhelm you with jargon. We sit down with you for 45 minutes to review your day-to-day operations: what manual spreadsheets or paperwork slow you down (dispatch notes, quotes, repetitive calls, fleet logs) and where hidden leaks are costing you money.'
                )}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-cyan-300 flex items-center justify-center text-xl font-black">
                2
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {t('¿Para qué te sirve? Para no gastar a ciegas', 'What is it for? To stop spending money blindly')}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t(
                  'En vez de gastar $10 o $20 millones en desarrollos que nadie termina usando, el diagnóstico te da números claros: te dice exactamente qué proceso conviene digitalizar primero, cuánto vas a ahorrar al mes y en cuántos meses recuperas la inversión. Sabrás qué hacer ya, qué dejar para después y qué definitivamente no comprar.',
                  'Instead of spending $10k-$20k on software developments that end up abandoned, the diagnosis gives you exact numbers: which process to automate first, how much cash you save every month, and how fast the investment pays for itself. You learn what to build now, what to defer, and what to avoid.'
                )}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-4 hover:border-cyan-400/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl font-black">
                3
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {t('¿Por qué es único? Ves tus números en vivo', 'Why is it unique? Live numbers on your screen')}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t(
                  'Olvida los informes de 80 páginas que nadie lee. Te entregamos un espacio interactivo privado donde puedes mover perillas, simular cuántos camiones, clientes o pedidos tienes, y ver al instante cómo cambia tu rentabilidad. Todo con una garantía: si decides construir la solución con nosotros, el valor del diagnóstico se descuenta al 100%.',
                  'Forget 80-page slide decks that gather digital dust. We hand you a private interactive space where you adjust sliders, simulate truck fleet or order volumes, and watch ROI update live. Best of all: if you build the project with us, the diagnosis fee is 100% credited back to you.'
                )}
              </p>
            </div>
          </div>

          {/* Ejemplo práctico de la vida real */}
          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-[#070f19] to-[#060a14] p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  {t('Ejemplo real y cotidiano', 'Real-world example')}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {t('El caso típico en una empresa de transporte o logística', 'The typical logistics or trucking scenario')}
                </h4>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-1.5 text-xs font-bold text-cyan-300 border border-cyan-400/20">
                <Truck className="w-4 h-4" />
                {t('Flota & Operaciones', 'Fleet & Operations')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {t('El problema que vemos a diario:', 'The problem we see every day:')}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t(
                    'Tienes a 2 o 3 personas respondiendo llamadas y WhatsApps todo el día preguntando "¿dónde viene el chofer?", digitando guías de despacho a mano en planillas Excel hasta tarde, y cobros que se retrasan porque las facturas no coinciden con las entregas.',
                    'You have 2 or 3 staff members answering calls and messages asking "where is the truck?", manually transcribing delivery slips into spreadsheets late into the evening, and delayed customer billing due to paperwork discrepancies.'
                  )}
                </p>
              </div>

              <div className="space-y-3 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  {t('Lo que descubrimos con el Diagnóstico EBS:', 'What the EBS Diagnosis uncovers:')}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t(
                    'Te mostramos exactamente cómo conectar un WhatsApp inteligente con lectura automática de guías: el chofer sube una foto con su celular, el sistema digita la entrega al instante y el cliente se autoatiende en 5 segundos. Te ahorras 60 horas al mes de trabajo manual y aceleras tus cobros en 15 días.',
                    'We map out an automated flow where drivers snap photos of delivery slips, systems parse data instantly into your billing engine, and clients track loads on WhatsApp automatically. You save 60 hours of manual work monthly and speed up billing cycles by 15 days.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-12">
          <SectionHeading center eyebrow={t('Lo que recibes', 'What you get')} title={t('Un diagnóstico que tu equipo puede tocar', 'A diagnosis your team can touch')} />
          <div className="mx-auto max-w-3xl space-y-3">
            <EbsDemoAnim />
          </div>
          <div className="mx-auto max-w-3xl space-y-6">
            <EbsLiveAnim />
            <EbsDiagramAnim />
            <p className="text-center text-xs text-slate-500">{t('Ejemplo ilustrativo con cifras inventadas: no corresponde a ningún cliente.', 'Illustrative example with invented figures: it does not correspond to any client.')}</p>
          </div>
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <p className="text-lg font-bold text-white">{t('Pruébalo tú: es el espacio real, con datos inventados', 'Try it yourself: the real space, with invented data')}</p>
            <p className="text-sm text-slate-400">
              {t(
                'Una empresa de transporte con 200 camiones. Activa soluciones, agrega un área que falte y mira cómo cambia el resultado. No se envía nada.',
                'A transport company with 200 trucks. Switch solutions on, add an area that is missing and watch the result change. Nothing is sent.',
              )}
            </p>
            <a href="/ebs/demo" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-brand-500">
              {t('Probar el espacio interactivo', 'Try the interactive space')} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ebsDelivers.map((d, i) => {
              const Icon = [Target, Layers, MonitorPlay, SlidersHorizontal, GitCompareArrows, FileText][i] ?? Check;
              return (
                <div key={d.title.es} className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-7 space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">{tr(d.title)}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{tr(d.text)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-[#070f19] border-y border-white/10">
        <Container className="space-y-12">
          <SectionHeading center eyebrow={t('La tecnología detrás', 'The technology behind it')} title={t('No es una plantilla: es un sistema', 'It’s not a template: it’s a system')} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ebsTech.map((d, i) => {
              const Icon = [Layers, Calculator, Sparkles, Zap, Wallet, Lock][i] ?? Cpu;
              return (
                <div key={d.title.es} className="reveal rounded-3xl border border-white/10 bg-[#060a14] p-7 space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">{tr(d.title)}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{tr(d.text)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-10">
          <SectionHeading center eyebrow={t('Autodiagnóstico', 'Self-check')} title={t('¿Cuántas de estas pasan en tu empresa?', 'How many of these happen in your company?')} />
          <SymptomChecklist />
        </Container>
      </section>

      <section id="calculadora" className="pb-20 scroll-mt-24">
        <Container className="space-y-10">
          <SectionHeading center eyebrow={t('Calculadora', 'Calculator')} title={t('Cuánto te cuesta hoy el trabajo manual', 'What manual work costs you today')} />
          <LossCalculator />
          <div className="text-center">
            <BookButton />
          </div>
        </Container>
      </section>

      {ebsVideo && (
        <section className="pb-20">
          <Container className="max-w-3xl">
            <video src={ebsVideo.src} poster={ebsVideo.poster} controls playsInline preload="none" className="w-full rounded-3xl border border-white/10" />
          </Container>
        </section>
      )}

      <section className="py-20 bg-[#070f19] border-y border-white/10">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
            <h2 className="text-2xl font-extrabold text-white">{t('Qué incluye', 'What’s included')}</h2>
            <ul className="space-y-3">
              {trList(ebsIncludes).map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                  <Check className="w-5 h-5 shrink-0 text-cyan-300" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
            <h2 className="text-2xl font-extrabold text-white">{t('Para quién es', 'Who it’s for')}</h2>
            <ul className="space-y-3">
              {trList(ebsForWho).map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 leading-relaxed">
                  <Check className="w-5 h-5 shrink-0 text-cyan-300" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="space-y-12">
          <SectionHeading eyebrow={t('Cómo funciona', 'How it works')} title={t('De la conversación a un plan que puedes ejecutar', 'From a conversation to a plan you can execute')} />
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ebsSteps.map((s, i) => (
              <li key={s.title.es} className="reveal space-y-3 border-t-2 border-cyan-400/60 pt-5">
                <div className="text-sm font-bold text-cyan-300">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-extrabold text-white">{tr(s.title)}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{tr(s.text)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4 space-y-5">
            <SectionHeading eyebrow="FAQ" title={t('Preguntas sobre el diagnóstico', 'Questions about the diagnosis')} />
            <p className="text-slate-400">
              {t('¿Prefieres ver ideas antes?', 'Want to see ideas first?')}{' '}
              <Link to="/audit-693" className="font-semibold text-cyan-300 hover:text-cyan-200">
                {t('Prueba el Audit 693 gratis →', 'Try the free Audit 693 →')}
              </Link>
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {ebsFaqs.map((f) => (
              <details key={f.q.es} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white">
                  {tr(f.q)}
                  <span className="text-2xl text-cyan-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-slate-400 leading-relaxed max-w-2xl">{tr(f.a)}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20">
        <Container className="text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{t('Decide con un plan, no con intuición', 'Decide with a plan, not a hunch')}</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {t('45 minutos para saber exactamente dónde invertir en tecnología y con qué retorno.', '45 minutes to know exactly where to invest in technology, and with what return.')}
          </p>
          <BookButton />
        </Container>
      </section>
    </>
  );
};
