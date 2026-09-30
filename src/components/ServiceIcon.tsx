import React from 'react';
import { Code2, Bot, Smartphone, Globe, Compass, Zap } from 'lucide-react';
import type { Service } from '../data/site';

const icons = { Code2, Bot, Smartphone, Globe, Compass };

export const ServiceIcon: React.FC<{ name: Service['icon']; className?: string }> = ({ name, className = 'w-6 h-6' }) => {
  const Icon = icons[name];
  return <Icon className={className} />;
};

/** Short promise shown on a service (e.g. "Deploy en 7 días"). */
export const ServiceBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
    <Zap className="w-3.5 h-3.5" />
    {label}
  </span>
);
