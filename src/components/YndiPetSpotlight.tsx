import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Bot, Gamepad2, HeartPulse, MapPin, QrCode, Siren } from 'lucide-react';
import { useLang } from '../lib/lang';
import { Container, Eyebrow } from './ui';
import yndiMascot from '../../asset/cases/yndi-mascot.webp';
import yndipetLogo from '../../asset/cases/yndipet-logo.webp';

/** Home-page feature block for our own product, YndiPet. */
export const YndiPetSpotlight: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const chips = [
    { icon: HeartPulse, label: es ? 'Ficha clínica y alertas' : 'Clinical record & alerts' },
    { icon: Siren, label: es ? 'SOS de mascotas perdidas' : 'Lost-pet SOS' },
    { icon: QrCode, label: es ? 'Placa QR de emergencia' : 'Emergency QR tag' },
    { icon: Bot, label: es ? 'Asistentes con IA' : 'AI assistants' },
    { icon: MapPin, label: es ? 'Mapa de servicios' : 'Services map' },
    { icon: Gamepad2, label: es ? '6 juegos web' : '6 web games' },
  ];

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#ff2d55]/20 via-[#1a0b1f] to-[#050b13]">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#ff4f6d]/30 blur-[120px]" aria-hidden />
          <div className="absolute -bottom-32 left-1/3 w-[24rem] h-[24rem] rounded-full bg-[#ff8a3d]/20 blur-[120px]" aria-hidden />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            <div className="lg:col-span-7 space-y-7">
              <Eyebrow>{es ? 'Producto propio' : 'Our own product'}</Eyebrow>
              <h2 className="sr-only">YndiPet</h2>
              <img loading="lazy" decoding="async"
                src={yndipetLogo}
                alt="YndiPet — Aquí nos cuidamos"
                className="w-40 sm:w-48 drop-shadow-[0_20px_40px_rgba(255,45,85,0.45)]"
              />
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
                {es
                  ? 'La app de mascotas con inteligencia artificial que diseñamos, construimos y operamos: un hogar digital para tutores, refugios y negocios en Chile.'
                  : 'The AI-powered pet app we design, build and run: a digital home for pet owners, shelters and businesses in Chile.'}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {chips.map((c) => (
                  <span key={c.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                    <c.icon className="w-4 h-4 text-[#ff8aa0]" />
                    {c.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  to="/casos/yndipet"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff2d55] to-[#ff8a3d] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#ff2d55]/30"
                >
                  {es ? 'Ver el caso completo' : 'See the full case'}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://yndipet.com/juegos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-[#ffb0bf]"
                >
                  {es ? 'Jugar con Yndi' : 'Play with Yndi'}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <img loading="lazy" decoding="async"
                src={yndiMascot}
                alt={es ? 'Yndi, la mascota de YndiPet' : 'Yndi, the YndiPet mascot'}
                className="w-72 sm:w-96 drop-shadow-[0_30px_60px_rgba(255,45,85,0.35)]"
                style={{ animation: 'orb-float 7s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
