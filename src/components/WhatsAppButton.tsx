import React from 'react';
import { siWhatsapp } from 'simple-icons';
import { useLang } from '../lib/lang';
import { whatsappLink } from '../data/site';

/** Opens a WhatsApp chat with a prefilled message. Renders nothing until WHATSAPP_NUMBER is set. */
export const WhatsAppButton: React.FC<{ message: string; className?: string; label?: string }> = ({
  message,
  className = '',
  label,
}) => {
  const { lang } = useLang();
  const href = whatsappLink(message);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-6 py-3.5 text-sm font-bold text-white transition-colors ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366" aria-hidden>
        <path d={siWhatsapp.path} />
      </svg>
      {label ?? (lang === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp')}
    </a>
  );
};
