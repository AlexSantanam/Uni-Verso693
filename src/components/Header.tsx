import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useLang } from '../lib/lang';
import { navItems, services } from '../data/site';
import { Container } from './ui';
import logo from '../../asset/Logo.webp';

export const Header: React.FC = () => {
  const { lang, setLang, tr } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-300'}`;

  return (
    <header className="sticky top-0 z-50 bg-[#050b13]/80 backdrop-blur-xl border-b border-white/10">
      <Container className="h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Uni-Verso693" className="w-10 h-10 rounded-xl object-cover" />
          <span className="font-extrabold text-xl tracking-tight text-white whitespace-nowrap">
            Uni-Verso<span className="text-brand-500">693</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7 whitespace-nowrap">
          {navItems.map((item) =>
            item.to === '/servicios' ? (
              <div key={item.to} className="relative group">
                <NavLink to={item.to} className={(s) => `${linkClass(s)} inline-flex items-center gap-1 py-7`}>
                  {tr(item.label)}
                  <ChevronDown className="w-3.5 h-3.5" />
                </NavLink>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all absolute left-1/2 -translate-x-1/2 top-full w-80">
                  <div className="rounded-2xl bg-[#0a1420]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 p-2">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/servicios/${s.slug}`}
                        className="block rounded-xl px-4 py-3 hover:bg-brand-500/10 transition-colors"
                      >
                        <span className="block text-sm font-bold text-white">{tr(s.title)}</span>
                        <span className="block text-xs text-slate-400 mt-0.5">{tr(s.tagline)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {tr(item.label)}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden xl:flex items-center gap-3 whitespace-nowrap">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-slate-300 hover:border-ink cursor-pointer"
            aria-label="Switch language / Cambiar idioma"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
          <Link
            to="/contacto"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700 transition-colors"
          >
            {lang === 'es' ? 'Contáctanos' : 'Contact us'}
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-slate-300 cursor-pointer"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-white cursor-pointer"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="xl:hidden border-t border-white/10 bg-[#050b13]">
          <Container className="py-6 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-bold ${isActive ? 'bg-brand-500/10 text-cyan-300' : 'text-white'}`
                }
              >
                {tr(item.label)}
              </NavLink>
            ))}
            <Link to="/contacto" className="mt-4 block rounded-full bg-brand-600 px-5 py-3.5 text-center text-sm font-bold text-white">
              {lang === 'es' ? 'Contáctanos' : 'Contact us'}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
};
