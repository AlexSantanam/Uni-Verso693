import React from 'react';
import { Clock, Mail, ShieldCheck } from 'lucide-react';
import { useLang } from '../lib/lang';
import { CONTACT_EMAIL } from '../data/site';
import { Container, Eyebrow } from '../components/ui';
import { ContactForm } from '../components/ContactForm';

export const Contact: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const points = [
    {
      icon: Clock,
      title: es ? 'Respuesta en menos de 2 horas' : 'Reply within 2 hours',
      text: es ? 'Un especialista revisa tu caso y te propone los siguientes pasos.' : 'A specialist reviews your case and proposes next steps.',
    },
    {
      icon: ShieldCheck,
      title: es ? 'Confidencialidad' : 'Confidentiality',
      text: es ? 'Tu información se usa solo para responder tu solicitud.' : 'Your information is only used to answer your request.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#070f19] min-h-[70vh]">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <Container className="relative py-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
        <div className="lg:col-span-5 space-y-8">
          <Eyebrow>{es ? 'Contacto' : 'Contact'}</Eyebrow>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.05]">
            {es ? 'Conversemos sobre tu proyecto' : "Let's talk about your project"}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            {es
              ? 'Cuéntanos qué quieres lograr. Te ayudamos a definir el alcance y el mejor camino para llegar.'
              : 'Tell us what you want to achieve. We help you define scope and the best path to get there.'}
          </p>
          <div className="space-y-5">
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-500/10 text-cyan-300 flex items-center justify-center">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-slate-400">{p.text}</p>
                </div>
              </div>
            ))}
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 font-bold text-white hover:text-cyan-300">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-500/10 text-cyan-300 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};
