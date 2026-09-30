import React from 'react';
import { useLang } from '../lib/lang';
import { techStack, type Tech } from '../data/site';
import { Container, SectionHeading } from './ui';

/** Very dark brand colors (Next.js, Vercel…) would vanish on our background. */
const readableColor = (hex: string) => {
  const n = parseInt(hex, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.28 ? '#e2e8f0' : `#${hex}`;
};

const Chip: React.FC<{ tech: Tech }> = ({ tech }) => (
  <span className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-white whitespace-nowrap">
    {tech.icon && (
      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill={readableColor(tech.icon.hex)} aria-hidden>
        <path d={tech.icon.path} />
      </svg>
    )}
    {tech.name}
  </span>
);

/** Infinite logo carousel; two rows scrolling in opposite directions. */
export const TechMarquee: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];

  return (
    <section className="bg-ink py-16 overflow-hidden">
      <Container className="mb-10">
        <SectionHeading
          light
          eyebrow={es ? 'Tecnología' : 'Technology'}
          title={es ? 'Herramientas modernas y probadas' : 'Modern, proven tools'}
        />
      </Container>
      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className={`flex w-max gap-4 ${r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
            {[...row, ...row].map((t, i) => (
              <Chip key={`${t.name}-${i}`} tech={t} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
