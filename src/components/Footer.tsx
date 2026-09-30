import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useLang } from '../lib/lang';
import { CONTACT_EMAIL, navItems, services } from '../data/site';
import { Container } from './ui';
import logo from '../../asset/Logo.webp';

export const Footer: React.FC = () => {
  const { lang, tr } = useLang();

  return (
    <footer className="bg-ink text-slate-400">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Uni-Verso693" className="w-10 h-10 rounded-xl object-cover" />
              <span className="font-extrabold text-xl text-white">
                Uni-Verso<span className="text-brand-500">693</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              {lang === 'es'
                ? 'Empresa de desarrollo de software: plataformas a medida, agentes de IA, apps móviles y producto digital para empresas que quieren dominar el mañana.'
                : 'A software development company: custom platforms, AI agents, mobile apps and digital product for companies that want to own tomorrow.'}
            </p>
            {CONTACT_EMAIL && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-200">
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
            )}
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              {lang === 'es' ? 'Servicios' : 'Services'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/servicios/${s.slug}`} className="hover:text-white transition-colors">
                    {tr(s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              {lang === 'es' ? 'Empresa' : 'Company'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navItems
                .filter((i) => i.to !== '/servicios')
                .map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hover:text-white transition-colors">
                      {tr(item.label)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 text-xs text-slate-400">
          © 2026 Universo693 SpA. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </div>
      </Container>
    </footer>
  );
};
